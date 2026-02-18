<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'underline',
    validator: (val) => ['underline', 'pill'].includes(val)
  }
})

const emit = defineEmits(['update:modelValue'])

const selectTab = (id) => {
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="vortex-tabs-container">
    <ul v-if="variant === 'underline'" class="tabs-underline">
      <li v-for="tab in tabs" :key="tab.id" class="tab-item">
        <button 
          class="tab-btn-underline" 
          :class="{ 'is-active': modelValue === tab.id }"
          @click="selectTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <div v-else class="tabs-pill-wrapper">
      <div class="tabs-pill">
        <button 
          v-for="tab in tabs" :key="tab.id"
          class="tab-btn-pill"
          :class="{ 'is-active': modelValue === tab.id }"
          @click="selectTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vortex-tabs-container {
  width: 100%;
}

.tabs-underline {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab-btn-underline {
  display: inline-block;
  padding: 1rem;
  border: none;
  background: transparent;
  border-bottom: 2px solid transparent;
  color: var(--color-text-muted);
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0.5rem;
}

.tab-btn-underline:hover {
  color: var(--color-text-white);
  border-bottom-color: rgba(255, 255, 255, 0.2);
}

.tab-btn-underline.is-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tabs-pill-wrapper {
  display: flex;
}

.tabs-pill {
  display: inline-flex;
  padding: 0.25rem;
  background-color: var(--color-surface-light);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.tab-btn-pill {
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-family);
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn-pill:hover {
  color: var(--color-text-white);
}

.tab-btn-pill.is-active {
  background-color: var(--color-primary);
  color: var(--color-text-white);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>