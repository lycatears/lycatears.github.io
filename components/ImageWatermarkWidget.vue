<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const watermarkText = ref('水印')
const fontSize = ref(36)
const color = ref('#ffffff')
// 透明度 0 表示完全不透明，100 表示完全透明。
const transparency = ref(0)
const rotation = ref(0)
const originalImage = ref<HTMLImageElement | null>(null)
const previewUrl = ref('')
const fileName = ref('watermarked-image.png')
const errorMessage = ref('')

const canProcess = computed(() => !!originalImage.value && !!watermarkText.value.trim())

function releasePreview() {
  if (previewUrl.value)
    URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = ''
}

function drawWatermark() {
  if (!canProcess.value || !originalImage.value)
    return

  const image = originalImage.value
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const context = canvas.getContext('2d')
  if (!context)
    return

  context.drawImage(image, 0, 0)
  context.save()
  context.globalAlpha = (100 - transparency.value) / 100
  context.fillStyle = color.value
  context.font = `${fontSize.value}px sans-serif`
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.translate(canvas.width / 2, canvas.height / 2)
  context.rotate((rotation.value * Math.PI) / 180)
  context.fillText(watermarkText.value.trim(), 0, 0)
  context.restore()

  canvas.toBlob((blob) => {
    if (!blob)
      return
    releasePreview()
    previewUrl.value = URL.createObjectURL(blob)
  }, 'image/png')
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  errorMessage.value = ''
  if (!file)
    return
  if (!file.type.startsWith('image/')) {
    errorMessage.value = '请选择图片文件。'
    input.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    const image = new Image()
    image.onload = () => {
      originalImage.value = image
      fileName.value = `${file.name.replace(/\.[^.]+$/, '')}-watermark.png`
      drawWatermark()
    }
    image.onerror = () => { errorMessage.value = '无法读取这张图片。' }
    image.src = reader.result as string
  }
  reader.onerror = () => { errorMessage.value = '读取图片时发生错误。' }
  reader.readAsDataURL(file)
}

function saveImage() {
  if (!previewUrl.value)
    return
  const link = document.createElement('a')
  link.href = previewUrl.value
  link.download = fileName.value
  link.click()
}

watch([watermarkText, fontSize, color, transparency, rotation], drawWatermark)
onBeforeUnmount(releasePreview)
</script>

<template>
  <div class="image-watermark">
    <p class="privacy-note">图片只会在您的浏览器中处理，不会上传到服务器。</p>

    <div class="param-row">
      <label class="param-label" for="watermark-file">选择图片</label>
      <input id="watermark-file" class="file-input" type="file" accept="image/*" @change="handleFileChange">
    </div>
    <div class="param-row">
      <label class="param-label" for="watermark-text">水印文字</label>
      <input id="watermark-text" v-model="watermarkText" class="param-input" type="text" maxlength="100" placeholder="输入水印文字">
    </div>
    <div class="param-row">
      <label class="param-label" for="watermark-size">字号</label>
      <input id="watermark-size" v-model.number="fontSize" class="param-input" type="number" min="1" max="1000">
    </div>
    <div class="param-row">
      <label class="param-label" for="watermark-color">颜色</label>
      <input id="watermark-color" v-model="color" class="color-input" type="color">
    </div>
    <div class="param-row">
      <label class="param-label" for="watermark-transparency">透明度</label>
      <input id="watermark-transparency" v-model.number="transparency" class="range-input" type="range" min="0" max="100">
      <output>{{ transparency }}%</output>
    </div>
    <div class="param-row">
      <label class="param-label" for="watermark-rotation">旋转角度</label>
      <input id="watermark-rotation" v-model.number="rotation" class="range-input" type="range" min="0" max="360">
      <output>{{ rotation }}°</output>
    </div>

    <p v-if="errorMessage" class="param-error">{{ errorMessage }}</p>

    <div v-if="previewUrl" class="result-area">
      <img class="preview-image" :src="previewUrl" alt="添加水印后的图片预览">
      <button class="save-btn" type="button" @click="saveImage">保存</button>
    </div>
  </div>
</template>

<style scoped>
.image-watermark { width: 100%; }
.privacy-note { margin: 0 0 1.25rem; color: var(--va-c-text-2); font-size: .9rem; }
.param-row { display: flex; align-items: center; gap: .75rem; margin-bottom: .85rem; }
.param-label { flex: 0 0 5rem; color: var(--va-c-text-1); font-size: .9rem; }
.param-input { flex: 1; min-width: 0; padding: .4rem .6rem; border: 1px solid var(--va-c-bg-mute); border-radius: 6px; background: var(--va-c-bg); color: var(--va-c-text-1); font-size: .9rem; outline: none; }
.param-input:focus { border-color: var(--va-c-primary, #ffcce6); }
.file-input { max-width: 100%; color: var(--va-c-text-1); }
.color-input { width: 3rem; height: 2rem; padding: .15rem; border: 1px solid var(--va-c-bg-mute); border-radius: 6px; background: var(--va-c-bg); }
.range-input { flex: 1; min-width: 0; accent-color: var(--va-c-primary, #ffcce6); }
output { min-width: 3.5rem; color: var(--va-c-text-2); font-family: var(--va-font-mono); font-size: .85rem; }
.param-error { margin: 0 0 1rem 5.75rem; color: #e74c3c; font-size: .85rem; }
.result-area { margin-top: 1.5rem; }
.preview-image { display: block; max-width: 100%; max-height: 70vh; margin-bottom: .75rem; border: 1px solid var(--va-c-bg-mute); border-radius: 8px; }
.save-btn { padding: .6rem 1.2rem; border: none; border-radius: 8px; background: var(--va-c-primary, #ffcce6); color: #fff; font-size: 1rem; font-weight: 600; cursor: pointer; transition: opacity .2s; }
.save-btn:hover { opacity: .85; }
@media (max-width: 480px) { .param-row { align-items: flex-start; flex-wrap: wrap; } .param-label { flex-basis: 100%; } .param-input, .range-input { flex-basis: calc(100% - 4.25rem); } .param-error { margin-left: 0; } }
</style>
