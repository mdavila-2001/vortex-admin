<script setup>
defineProps({
  headers: {
    type: Array,
    required: true // Ej: [{ key: 'id', label: 'Transaction ID', align: 'left' }, ...]
  }
})
</script>

<template>
  <div class="vortex-table-container">
    <div class="table-scroll-area custom-scrollbar">
      <table class="vortex-table">
        <thead>
          <tr>
            <th v-for="col in headers" :key="col.key" :class="`align-${col.align || 'left'}`">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <slot /> </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.vortex-table-container {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg); /* xl en el HTML */
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.table-scroll-area {
  overflow-x: auto;
  width: 100%;
}

.vortex-table {
  width: 100%;
  text-align: left;
  font-size: 0.875rem;
  border-collapse: collapse;
}

.vortex-table th {
  padding: 1rem 1.5rem; /* px-6 py-4 */
  font-weight: 600;
  color: var(--color-text-white);
  background-color: var(--color-table-header);
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.align-left { text-align: left; }
.align-right { text-align: right; }
.align-center { text-align: center; }
</style>