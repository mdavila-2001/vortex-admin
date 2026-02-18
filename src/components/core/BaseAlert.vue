<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (val) => ['success', 'warning', 'danger', 'info'].includes(val)
  },
  title: String
})

const iconName = computed(() => {
  const icons = {
    info: 'info',
    success: 'check_circle',
    warning: 'warning',
    danger: 'dangerous'
  }
  return icons[props.variant]
})
</script>

<template>
  <div class="vortex-alert" :class="`alert-${variant}`">
    <span class="material-icons alert-icon">{{ iconName }}</span>
    <div class="alert-content">
      <h4 v-if="title" class="alert-title">{{ title }}</h4>
      <div class="alert-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vortex-alert {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-family: var(--font-family);
  gap: 0.75rem;
}

.alert-icon {
  margin-top: 0.125rem;
  font-size: 1.25rem;
}

.alert-content {
  flex: 1;
  text-align: start;
}

.alert-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.alert-body {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
.alert-body :deep(a) { color: inherit; text-decoration: underline; }
.alert-body :deep(a:hover) { opacity: 0.8; }

.alert-info { background-color: var(--color-info-bg); border-color: rgba(59, 130, 246, 0.2); color: var(--color-info); }
.alert-info .alert-title, .alert-info .alert-icon { color: var(--color-info); }

.alert-success { background-color: var(--color-success-bg); border-color: rgba(16, 185, 129, 0.2); color: var(--color-success); }
.alert-success .alert-title, .alert-success .alert-icon { color: var(--color-success); }

.alert-warning { background-color: var(--color-warning-bg); border-color: rgba(245, 158, 11, 0.2); color: var(--color-warning); }
.alert-warning .alert-title, .alert-warning .alert-icon { color: var(--color-warning); }

.alert-danger { background-color: var(--color-danger-bg); border-color: rgba(239, 68, 68, 0.2); color: var(--color-danger); }
.alert-danger .alert-title, .alert-danger .alert-icon { color: var(--color-danger); }
</style>