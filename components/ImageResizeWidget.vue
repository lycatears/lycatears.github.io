<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const MAX_SIDE = 8192
const MAX_PIXELS = 32_000_000

const originalImage = ref<HTMLImageElement | null>(null)
const originalWidth = ref(0)
const originalHeight = ref(0)
const targetWidth = ref<number | string>('')
const targetHeight = ref<number | string>('')
const sourceUrl = ref('')
const resultUrl = ref('')
const resultWidth = ref(0)
const resultHeight = ref(0)
const fileName = ref('resized-image.png')
const errorMessage = ref('')
const processing = ref(false)
let requestId = 0

const previewUrl = computed(() => resultUrl.value || sourceUrl.value)
const sizeError = computed(() => {
  if (!originalImage.value)
    return ''
  const width = Number(targetWidth.value)
  const height = Number(targetHeight.value)
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1)
    return '宽度和高度都必须是大于 0 的整数。'
  if (width > MAX_SIDE || height > MAX_SIDE || width * height > MAX_PIXELS)
    return '目标尺寸不能超过单边 8192 像素、总计 3200 万像素。'
  return ''
})

function releaseSource() {
  if (sourceUrl.value)
    URL.revokeObjectURL(sourceUrl.value)
  sourceUrl.value = ''
}

function releaseResult() {
  if (resultUrl.value)
    URL.revokeObjectURL(resultUrl.value)
  resultUrl.value = ''
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file)
    return

  const currentRequest = ++requestId
  originalImage.value = null
  originalWidth.value = 0
  originalHeight.value = 0
  processing.value = false
  errorMessage.value = ''
  releaseResult()
  releaseSource()

  if (!file.type.startsWith('image/')) {
    errorMessage.value = '请选择图片文件。'
    input.value = ''
    return
  }

  const url = URL.createObjectURL(file)
  sourceUrl.value = url
  const image = new Image()
  image.onload = () => {
    if (currentRequest !== requestId)
      return
    originalImage.value = image
    originalWidth.value = image.naturalWidth
    originalHeight.value = image.naturalHeight
    targetWidth.value = image.naturalWidth
    targetHeight.value = image.naturalHeight
    fileName.value = `${file.name.replace(/\.[^.]+$/, '')}-resized.png`
  }
  image.onerror = () => {
    if (currentRequest !== requestId)
      return
    releaseSource()
    errorMessage.value = '无法读取这张图片，请选择其他图片。'
  }
  image.src = url
}

function resizeImage() {
  if (!originalImage.value || sizeError.value || processing.value)
    return

  const width = Number(targetWidth.value)
  const height = Number(targetHeight.value)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) {
    errorMessage.value = '浏览器无法创建图片画布，请尝试较小的尺寸。'
    return
  }

  errorMessage.value = ''
  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(originalImage.value, 0, 0, width, height)
  processing.value = true
  const currentRequest = ++requestId
  canvas.toBlob((blob) => {
    if (currentRequest !== requestId)
      return
    processing.value = false
    if (!blob) {
      errorMessage.value = '图片处理失败，请尝试较小的尺寸。'
      return
    }
    releaseResult()
    resultUrl.value = URL.createObjectURL(blob)
    resultWidth.value = width
    resultHeight.value = height
  }, 'image/png')
}

function saveImage() {
  if (!resultUrl.value)
    return
  const link = document.createElement('a')
  link.href = resultUrl.value
  link.download = fileName.value
  link.click()
}

watch([targetWidth, targetHeight], () => {
  ++requestId
  processing.value = false
  releaseResult()
})

onBeforeUnmount(() => {
  ++requestId
  releaseResult()
  releaseSource()
})
</script>

<template>
  <div class="image-resize">
    <p class="privacy-note">图片只会在您的浏览器中处理，不会上传到服务器。</p>

    <div class="param-row">
      <label class="param-label" for="resize-file">选择图片</label>
      <input id="resize-file" class="file-input" type="file" accept="image/*" @change="handleFileChange">
    </div>

    <template v-if="originalImage">
      <p class="current-size">当前分辨率：{{ originalWidth }} × {{ originalHeight }} 像素</p>
      <div class="param-row">
        <label class="param-label" for="resize-width">目标宽度</label>
        <input id="resize-width" v-model.number="targetWidth" class="param-input" type="number" min="1" :max="MAX_SIDE" step="1">
        <span class="unit">像素</span>
      </div>
      <div class="param-row">
        <label class="param-label" for="resize-height">目标高度</label>
        <input id="resize-height" v-model.number="targetHeight" class="param-input" type="number" min="1" :max="MAX_SIDE" step="1">
        <span class="unit">像素</span>
      </div>
      <p v-if="sizeError" class="param-error">{{ sizeError }}</p>
      <button class="action-btn" type="button" :disabled="!!sizeError || processing" @click="resizeImage">
        {{ processing ? '处理中…' : '缩放' }}
      </button>
    </template>

    <p v-if="errorMessage" class="param-error" role="alert">{{ errorMessage }}</p>

    <div v-if="originalImage && previewUrl" class="result-area">
      <p class="preview-size">预览：{{ resultUrl ? resultWidth : originalWidth }} × {{ resultUrl ? resultHeight : originalHeight }} 像素</p>
      <img class="preview-image" :src="previewUrl" :alt="resultUrl ? '缩放后的图片预览' : '原图预览'">
      <button v-if="resultUrl" class="action-btn" type="button" @click="saveImage">保存</button>
    </div>
  </div>
</template>

<style scoped>
.image-resize { width: 100%; }
.privacy-note { margin: 0 0 1.25rem; color: var(--va-c-text-2); font-size: .9rem; }
.param-row { display: flex; align-items: center; gap: .75rem; margin-bottom: .85rem; }
.param-label { flex: 0 0 5rem; color: var(--va-c-text-1); font-size: .9rem; }
.param-input { flex: 1; min-width: 0; padding: .4rem .6rem; border: 1px solid var(--va-c-bg-mute); border-radius: 6px; background: var(--va-c-bg); color: var(--va-c-text-1); font-size: .9rem; outline: none; }
.param-input:focus { border-color: var(--va-c-primary, #ffcce6); }
.file-input { max-width: 100%; color: var(--va-c-text-1); }
.unit, .current-size, .preview-size { color: var(--va-c-text-2); font-size: .9rem; }
.unit { flex: 0 0 2rem; }
.current-size { margin: .25rem 0 1rem; }
.param-error { margin: 0 0 1rem; color: #e74c3c; font-size: .85rem; }
.action-btn { padding: .6rem 1.2rem; border: none; border-radius: 8px; background: var(--va-c-primary, #ffcce6); color: #fff; font-size: 1rem; font-weight: 600; cursor: pointer; transition: opacity .2s; }
.action-btn:hover { opacity: .85; }
.action-btn:disabled { opacity: .5; cursor: not-allowed; }
.result-area { margin-top: 1.5rem; }
.preview-size { margin: 0 0 .75rem; }
.preview-image { display: block; max-width: 100%; max-height: 70vh; margin-bottom: .75rem; border: 1px solid var(--va-c-bg-mute); border-radius: 8px; }
@media (max-width: 480px) { .param-row { flex-wrap: wrap; } .param-label { flex-basis: 100%; } }
</style>
