<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="vortex-breadcrumbs">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        
        <a v-if="index === 0" :href="item.link || '#'" class="breadcrumb-link is-home">
          <span v-if="item.icon" class="material-icons breadcrumb-icon">{{ item.icon }}</span>
          <span v-else>{{ item.label }}</span>
        </a>

        <div v-else class="breadcrumb-step">
          <span class="material-icons separator-icon">chevron_right</span>
          
          <span v-if="index === items.length - 1" class="breadcrumb-current">
            {{ item.label }}
          </span>
          
          <a v-else :href="item.link || '#'" class="breadcrumb-link">
            {{ item.label }}
          </a>
        </div>
        
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.vortex-breadcrumbs {
  display: flex;
}

.breadcrumb-list {
  display: inline-flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
}

.breadcrumb-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
}

.breadcrumb-link:hover {
  color: var(--color-text-white);
}

.breadcrumb-icon {
  font-size: 1rem;
  margin-right: 0.25rem;
}

.breadcrumb-step {
  display: flex;
  align-items: center;
  margin-left: 0.25rem;
}

.separator-icon {
  color: #475569;
  font-size: 1.125rem;
}

.breadcrumb-current {
  margin-left: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary);
}
</style>