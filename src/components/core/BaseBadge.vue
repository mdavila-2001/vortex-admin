<script setup>
defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (val) => ['success', 'warning', 'danger', 'info', 'primary', 'offline'].includes(val)
  },
  icon: {
    type: Boolean,
    default: false // Si es true, muestra un puntito de color
  },
  outline: {
    type: Boolean,
    default: false // Variante con borde
  }
})
</script>

<template>
  <span 
    class="vortex-badge" 
    :class="[`badge-${variant}`, { 'is-outline': outline }]"
  >
    <span v-if="icon" class="badge-dot"></span>
    <slot />
  </span>
</template>

<style scoped>
.vortex-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem; /* py-0.5 px-2.5 */
  border-radius: var(--radius-full);
  font-size: 0.75rem; /* text-xs */
  font-weight: 500;
  font-family: var(--font-family);
  border: 1px solid transparent; /* Para la variante outline */
}

.badge-dot {
  width: 0.375rem; /* 6px */
  height: 0.375rem;
  border-radius: 50%;
  margin-right: 0.375rem;
  background-color: currentColor; /* Hereda el color del texto de la insignia */
}

/* Variantes Sólidas (Subtle Default) */
.badge-success { background-color: var(--color-success-bg); color: var(--color-success); border-color: rgba(16, 185, 129, 0.2); }
.badge-warning { background-color: var(--color-warning-bg); color: var(--color-warning); border-color: rgba(245, 158, 11, 0.2); }
.badge-danger { background-color: var(--color-danger-bg); color: var(--color-danger); border-color: rgba(239, 68, 68, 0.2); }
.badge-info { background-color: var(--color-info-bg); color: var(--color-info); border-color: rgba(59, 130, 246, 0.2); }
.badge-primary { background-color: rgba(25, 120, 229, 0.1); color: var(--color-primary); border-color: rgba(25, 120, 229, 0.2); }
.badge-offline { background-color: var(--color-surface-light); color: var(--color-text-muted); border-color: var(--color-border); }

/* Variante Outline */
.vortex-badge.is-outline {
  background-color: transparent;
  border-radius: var(--radius-sm); /* rounded normal, no full */
  padding: 0.125rem 0.5rem;
}
.is-outline.badge-success { border-color: rgba(16, 185, 129, 0.3); }
.is-outline.badge-info { border-color: rgba(59, 130, 246, 0.3); }
</style>