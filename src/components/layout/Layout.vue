<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'

const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="layout-wrapper">
    <Sidebar :isOpen="sidebarOpen" @close="closeSidebar" />

    <main class="layout-main">
      <div class="main-bg-image"></div>
      <div class="main-bg-overlay"></div>
      
      <div class="glow-orb orb-primary"></div>
      <div class="glow-orb orb-purple"></div>

      <div class="content-wrapper">
        
        <header class="top-header">
          <!-- Botón hamburguesa (solo móvil) -->
          <button class="hamburger-btn" @click="toggleSidebar">
            <span class="material-symbols-outlined">menu</span>
          </button>

          <div class="breadcrumbs">
            <span class="material-symbols-outlined text-slate-500 text-sm">home</span>
            <span class="separator">/</span>
            <span class="current-path">Vortex</span>
          </div>
        </header>

        <div class="scrollable-area">
          <router-view></router-view>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--color-bg-body);
}

/* Área Central */
.layout-main {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  /* En móvil ocupa todo el ancho */
  width: 100%;
}

/* El fondo con la imagen oscura */
.main-bg-image {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.main-bg-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(17, 24, 33, 0.9);
  z-index: 1;
}

/* Luces decorativas de fondo */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: screen;
}
.orb-primary {
  top: 50%; left: 33%;
  width: 500px; height: 500px;
  background-color: rgba(25, 120, 229, 0.15);
  filter: blur(120px);
}
.orb-purple {
  bottom: 0; right: 0;
  width: 600px; height: 600px;
  background-color: rgba(147, 51, 234, 0.08);
  filter: blur(120px);
}

/* Contenedor del contenido real */
.content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Cabecera Superior (Top Bar) */
.top-header {
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background-color: rgba(17, 24, 33, 0.5);
  backdrop-filter: blur(4px);
}

@media (min-width: 768px) {
  .top-header {
    padding: 0 2rem;
  }
}

/* Botón Hamburguesa */
.hamburger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}
.hamburger-btn:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}
.hamburger-btn .material-symbols-outlined {
  font-size: 1.375rem;
}

/* Ocultar hamburguesa en desktop */
@media (min-width: 768px) {
  .hamburger-btn {
    display: none;
  }
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}
.separator { color: #475569; }
.current-path { color: white; font-weight: 500; }

/* Área de scroll para el contenido inyectado */
.scrollable-area {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
@media (min-width: 640px) {
  .scrollable-area { padding: 1.5rem; }
}
@media (min-width: 1024px) {
  .scrollable-area { padding: 2rem; }
}
</style>