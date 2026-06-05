---
title: 神秘妙妙工具
---

<script setup>
// import { useRouter } from 'vue-router'

// const router = useRouter()

const tools = [
  {
    name: '随机数生成',
    desc: '生成均匀分布、正态分布的随机整数或小数',
    path: '/tools/random-gen/',
    icon: '🎲',
  },
]
</script>

<div class="tools-grid">
  <div
    v-for="tool in tools"
    :key="tool.path"
    class="tool-card"
    @click="router.push(tool.path)"
  >
    <span class="tool-icon">{{ tool.icon }}</span>
    <div class="tool-info">
      <h3 class="tool-name">{{ tool.name }}</h3>
      <p class="tool-desc">{{ tool.desc }}</p>
    </div>
  </div>
</div>

<style scoped>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.tool-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  border: 1px solid var(--va-c-bg-mute);
  border-radius: 10px;
  background: var(--va-c-bg-light);
  cursor: pointer;
  transition: all 0.25s;
}

.tool-card:hover {
  border-color: var(--va-c-primary, #ffcce6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
}

.tool-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.tool-name {
  margin: 0 0 0.2rem;
  font-size: 1.05rem;
  font-weight: 600;
}

.tool-desc {
  margin: 0;
  font-size: 0.85rem;
  color: var(--va-c-text-2);
}
</style>
