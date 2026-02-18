<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(val)
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  },
  block: Boolean,
  disabled: Boolean,
  loading: Boolean
})
</script>

<template>
  <button 
    class="vortex-btn" 
    :class="[`variant-${variant}`, `size-${size}`, { 'is-block': block, 'is-loading': loading }]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="spinner"></span>
    
    <slot />
  </button>
</template>

<style scoped>
/* 1. ESTILOS BASE (Estructura) */
.vortex-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  position: relative;
  overflow: hidden;
}

.vortex-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none !important;
}

.is-block {
  width: 100%;
  display: flex;
}

.size-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}
.size-md {
  padding: 0.625rem 1.25rem; 
  font-size: 0.875rem; 
}
.size-lg {
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
}

.variant-primary {
  background-color: var(--color-primary);
  color: var(--color-text-white);
  box-shadow: 0 4px 6px -1px rgba(25, 120, 229, 0.1), 0 2px 4px -1px rgba(25, 120, 229, 0.06);
}
.variant-primary:not(:disabled):hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 0 15px rgba(25, 120, 229, 0.5);
}
.variant-primary:not(:disabled):active {
  transform: scale(0.98);
  box-shadow: none;
}

.variant-secondary {
  background-color: var(--color-secondary);
  color: var(--color-text-white);
  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06);
}
.variant-secondary:not(:disabled):hover {
  background-color: var(--color-secondary-hover);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
}

.variant-outline {
  background-color: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.variant-outline:not(:disabled):hover {
  background-color: rgba(25, 120, 229, 0.1);
}

.variant-ghost {
  background-color: transparent;
  color: var(--color-text-muted);
}
.variant-ghost:not(:disabled):hover {
  color: var(--color-text-white);
  background-color: rgba(255, 255, 255, 0.05);
}

.variant-danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.variant-danger:not(:disabled):hover {
  background-color: var(--color-danger);
  color: white;
}

.spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>