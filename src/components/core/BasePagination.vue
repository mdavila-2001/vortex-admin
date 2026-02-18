<script setup>
</script>

<template>
  <div class="vortex-pagination">
    <nav aria-label="Page navigation">
      <ul class="pagination-list">
        <li>
          <button class="page-btn btn-prev">
            <span class="material-icons page-icon">chevron_left</span>
          </button>
        </li>
        
        <li><button class="page-btn is-active">1</button></li>
        <li><button class="page-btn">2</button></li>
        <li><button class="page-btn">3</button></li>
        
        <li>
          <button class="page-btn btn-next">
            <span class="material-icons page-icon">chevron_right</span>
          </button>
        </li>
      </ul>
    </nav>
    <div class="pagination-info">
      Showing 1-10 of 124
    </div>
  </div>
</template>

<style scoped>
.vortex-pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.pagination-list {
  display: inline-flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: var(--color-surface-light);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.page-btn {
  display: block;
  padding: 0.5rem 0.75rem;
  line-height: 1.25;
  background: transparent;
  border: none;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  font-family: var(--font-family);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-list li:last-child .page-btn { border-right: none; }

.page-btn:hover:not(.is-active) {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text-white);
}

.page-btn.is-active {
  background-color: var(--color-primary);
  color: var(--color-text-white);
  font-weight: 500;
}

.page-icon { font-size: 0.875rem; }

.pagination-info {
  font-size: 0.75rem;
  color: #64748b;
  font-family: monospace;
}
</style>