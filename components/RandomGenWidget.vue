<script setup lang="ts">
import { ref, computed } from 'vue'

// Current tab state
type Tab = 'integer' | 'decimal' | 'decimal_norm'
const activeTab = ref<Tab>('integer')

// Integer parameters
const intMin = ref(0)
const intMax = ref(100)
const intCount = ref(5)

// Decimal-Norm parameters
const mean = ref(0)
const std = ref(1)
const decNormCount = ref(5)

// Decimal parameters
const decCount = ref(5)

// Results
const results = ref<number[]>([])

// Validation
const intCountError = computed(() => {
  const v = intCount.value
  if (v < 0) return '数量不能小于 0'
  if (v > 1000) return '数量不能超过 1000'
  return ''
})

const intRangeError = computed(() => {
  if (intMin.value > intMax.value) return '最小值不能大于最大值'
  return ''
})

const decCountError = computed(() => {
  const v = decCount.value
  if (v < 0) return '数量不能小于 0'
  if (v > 1000) return '数量不能超过 1000'
  return ''
})

const decNormStdError = computed(() => {
  const stdv = std.value
  if (stdv <= 0) {
    return '标准差必须大于 0。'
  }
  return ''
})

const canGenerate = computed(() => {
  if (activeTab.value === 'integer') {
    return !intCountError.value && !intRangeError.value
  } else if (activeTab.value === 'decimal') {
    return !decCountError.value
  } else {
    return !decNormStdError.value && !decCountError.value
  }
})

function generate() {
  if (!canGenerate.value) return

  if (activeTab.value === 'integer') {
    const min = intMin.value
    const max = intMax.value
    const count = intCount.value
    const arr: number[] = []
    for (let i = 0; i < count; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min)
    }
    results.value = arr
  } else if (activeTab.value === 'decimal') {
    const count = decCount.value
    const arr: number[] = []
    for (let i = 0; i < count; i++) {
      arr.push(Math.random())
    }
    results.value = arr
  } else {
    const meanv = mean.value
    const stdv = std.value
    const count = decNormCount.value
    const arr: number[] = []

    for (let i = 0; i < count; i++) {
      const u1 = Math.random()
      const u2 = Math.random()
      const standard = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
      arr.push(standard * stdv + meanv);
    }
    results.value = arr
  }
}

function displayResults() {
  return results.value.join(', ')
}

async function copyResults() {
  try {
    await navigator.clipboard.writeText(displayResults())
  } catch {
    // fallback
  }
}
</script>

<template>
  <div class="random-gen">
    <div class="tab-bar" flex="~" role="tablist">
      <button role="tab" class="tab-item" :class="{ active: activeTab === 'integer' }" @click="activeTab = 'integer'">
        整数
      </button>
      <button role="tab" class="tab-item" :class="{ active: activeTab === 'decimal' }" @click="activeTab = 'decimal'">
        小数
      </button>
      <button role="tab" class="tab-item" :class="{ active: activeTab === 'decimal_norm' }"
        @click="activeTab = 'decimal_norm'">
        小数（正态分布）
      </button>
    </div>

    <div v-if="activeTab === 'integer'" class="params">
      <div class="param-row">
        <label class="param-label">最小值</label>
        <input v-model.number="intMin" type="number" class="param-input" placeholder="0">
      </div>
      <div class="param-row">
        <label class="param-label">最大值</label>
        <input v-model.number="intMax" type="number" class="param-input" placeholder="100">
      </div>
      <div v-if="intRangeError" class="param-error">{{ intRangeError }}</div>
      <div class="param-row">
        <label class="param-label">生成数量</label>
        <input v-model.number="intCount" type="number" class="param-input" min="0" max="1000" placeholder="5">
      </div>
      <div v-if="intCountError" class="param-error">{{ intCountError }}</div>
    </div>

    <div v-if="activeTab === 'decimal'" class="params">
      <p class="param-desc">生成 [0, 1] 区间均匀分布的随机小数</p>
      <div class="param-row">
        <label class="param-label">生成数量</label>
        <input v-model.number="decCount" type="number" class="param-input" min="0" max="1000" placeholder="5">
      </div>
      <div v-if="decCountError" class="param-error">{{ decCountError }}</div>
    </div>

    <div v-if="activeTab === 'decimal_norm'" class="params">
      <div class="param-row">
        <label class="param-label">均值</label>
        <input v-model.number="mean" type="number" class="param-input" placeholder="0">
      </div>
      <div class="param-row">
        <label class="param-label">标准差</label>
        <input v-model.number="std" type="number" class="param-input" placeholder="1">
      </div>
      <div v-if="decNormStdError" class="param-error">{{ decNormStdError }}</div>
      <div class="param-row">
        <label class="param-label">生成数量</label>
        <input v-model.number="decNormCount" type="number" class="param-input" min="0" max="1000" placeholder="5">
      </div>
      <div v-if="decCountError" class="param-error">{{ decCountError }}</div>
    </div>

    <button class="generate-btn" :disabled="!canGenerate" @click="generate">
      生成随机数
    </button>

    <div v-if="results.length > 0" class="result-area">
      <div class="result-box">
        {{ displayResults() }}
      </div>
      <button class="copy-btn" @click="copyResults">
        复制
      </button>
    </div>
  </div>
</template>

<style scoped>
.random-gen {
  width: 100%;
}

.tab-bar {
  display: flex;
  border-bottom: 2px solid var(--va-c-bg-mute);
  margin-bottom: 1.5rem;
}

.tab-item {
  flex: 1;
  padding: 0.6rem 1rem;
  border: none;
  background: transparent;
  color: var(--va-c-text-2);
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab-item.active {
  color: var(--va-c-primary, #ffcce6);
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--va-c-primary, #ffcce6);
}

.params {
  margin-bottom: 1rem;
}

.param-desc {
  color: var(--va-c-text-2);
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.param-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.param-label {
  flex-shrink: 0;
  width: 5rem;
  font-size: 0.9rem;
  color: var(--va-c-text-1);
}

.param-input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--va-c-bg-mute);
  border-radius: 6px;
  background: var(--va-c-bg);
  color: var(--va-c-text-1);
  font-size: 0.9rem;
  font-family: var(--va-font-mono);
  outline: none;
  transition: border-color 0.2s;
}

.param-input:focus {
  border-color: var(--va-c-primary, #ffcce6);
}

.param-error {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  margin-left: 5.75rem;
}

.generate-btn {
  width: 100%;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: var(--va-c-primary, #ffcce6);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.generate-btn:hover {
  opacity: 0.85;
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.result-area {
  margin-top: 1.5rem;
}

.result-box {
  min-height: 3rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--va-c-bg-mute);
  border-radius: 8px;
  background: var(--va-c-bg-alt);
  color: var(--va-c-text-1);
  font-family: var(--va-font-mono);
  font-size: 0.9rem;
  word-break: break-all;
  line-height: 1.6;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.75rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--va-c-bg-mute);
  border-radius: 6px;
  background: var(--va-c-bg);
  color: var(--va-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  border-color: var(--va-c-primary, #ffcce6);
  color: var(--va-c-primary, #ffcce6);
}
</style>
