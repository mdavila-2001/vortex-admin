<script setup>
</script>

<template>
  <div class="vortex-card">
    <slot />
  </div>
</template>

<style scoped>
.vortex-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>