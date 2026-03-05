<script setup>
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { auth } from '../../services/firebase'
import { signOut } from 'firebase/auth'
import { useAuthStore } from '../../store/auth'
import { ref } from 'vue'

import BaseModal from '../core/BaseModal.vue'
import BaseButton from '../core/BaseButton.vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])

const router = useRouter()
const route = useRoute()

// Cerrar sidebar al cambiar de ruta (solo relevante en móvil)
watch(() => route.path, () => {
  emit('close')
})

const isLogoutModalOpen = ref(false)

const handleLogoutClick = () => {
  isLogoutModalOpen.value = true
}

const handleConfirmLogout = async () => {
  try {
    await signOut(auth)
    // El onAuthStateChanged en App.vue o auth.js ya se encarga de limpiar el estado
    // y aquí forzamos la redirección
    router.push('/')
  } catch (error) {
    console.error("Error al salir:", error)
  } finally {
    isLogoutModalOpen.value = false
  }
}
</script>

<template>
  <!-- Backdrop oscuro (solo móvil) -->
  <Transition name="backdrop">
    <div
      v-if="isOpen"
      class="sidebar-backdrop"
      @click="emit('close')"
    ></div>
  </Transition>

  <Transition name="slide">
    <aside
      v-if="isOpen"
      class="vortex-sidebar mobile-sidebar"
    >
      <div class="sidebar-content">
        <div class="logo-area">
          <div class="logo-icon">
            <span class="material-symbols-outlined text-white">storm</span>
          </div>
          <div class="logo-text">
            <h1>{{ useAuthStore.company?.name || 'Vortice ERP' }}</h1>
            <span>Enterprise</span>
          </div>
          <!-- Botón cerrar en móvil -->
          <button class="close-btn" @click="emit('close')">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav class="nav-menu">
          <p class="nav-title">Main Menu</p>
          
          <router-link to="/" class="nav-item">
            <span class="material-symbols-outlined nav-icon">dashboard</span>
            <span class="nav-label">Dashboard</span>
          </router-link>

          <router-link to="/inventory" class="nav-item">
            <span class="material-symbols-outlined nav-icon">inventory_2</span>
            <span class="nav-label">Inventario</span>
          </router-link>

          <router-link to="/crm" class="nav-item">
            <span class="material-symbols-outlined nav-icon">group</span>
            <span class="nav-label">CRM</span>
          </router-link>

          <router-link to="/seed" class="nav-item">
            <span class="material-symbols-outlined nav-icon">cannabis</span>
            <span class="nav-label">Seed</span>
          </router-link>

          <p class="nav-title mt-top">Sistema</p>
          
          <router-link to="/settings" class="nav-item">
            <span class="material-symbols-outlined nav-icon">settings</span>
            <span class="nav-label">Configuración</span>
          </router-link>
        </nav>

        <div class="user-profile-mini">
          <button class="user-btn" @click="handleLogoutClick" title="Cerrar Sesión">
            <div class="avatar-box">
              <span class="material-symbols-outlined text-slate-400">person</span>
              <div class="status-dot"></div>
            </div>
            <div class="user-info">
              <span class="user-name">{{ useAuthStore.user?.first_name || 'Usuario' }}</span>
              <span class="user-role">{{ useAuthStore.user?.roleLabel || 'Sin Rol' }}</span>
            </div>
            <span class="material-symbols-outlined logout-icon">logout</span>
          </button>
        </div>
      </div>
    </aside>
  </Transition>

  <!-- Sidebar desktop (siempre visible en ≥ 768px) -->
  <aside class="vortex-sidebar desktop-sidebar">
    <div class="sidebar-content">
      <div class="logo-area">
        <div class="logo-icon">
          <span class="material-symbols-outlined text-white">storm</span>
        </div>
        <div class="logo-text">
          <h1>{{ useAuthStore.company?.name || 'Vortex ERP' }}</h1>
          <span>Enterprise</span>
        </div>
      </div>

      <nav class="nav-menu">
        <p class="nav-title">Main Menu</p>
        
        <router-link to="/" class="nav-item">
          <span class="material-symbols-outlined nav-icon">dashboard</span>
          <span class="nav-label">Dashboard</span>
        </router-link>

        <router-link to="/inventory" class="nav-item">
          <span class="material-symbols-outlined nav-icon">inventory_2</span>
          <span class="nav-label">Inventario</span>
        </router-link>

        <router-link to="/crm" class="nav-item">
          <span class="material-symbols-outlined nav-icon">group</span>
          <span class="nav-label">CRM</span>
        </router-link>

        <router-link to="/seed" class="nav-item">
          <span class="material-symbols-outlined nav-icon">cannabis</span>
          <span class="nav-label">Seed</span>
        </router-link>

        <p class="nav-title mt-top">Sistema</p>
        
        <router-link to="/settings" class="nav-item">
          <span class="material-symbols-outlined nav-icon">settings</span>
          <span class="nav-label">Configuración</span>
        </router-link>
      </nav>

      <div class="user-profile-mini">
        <button class="user-btn" @click="handleLogoutClick" title="Cerrar Sesión">
          <div class="avatar-box">
            <span class="material-symbols-outlined text-slate-400">person</span>
            <div class="status-dot"></div>
          </div>
          <div class="user-info">
            <span class="user-name">{{ useAuthStore.user?.name || 'Usuario' }}</span>
            <span class="user-role">{{ useAuthStore.user?.roleLabel || 'Sin Rol' }}</span>
          </div>
          <span class="material-symbols-outlined logout-icon">logout</span>
        </button>
      </div>
    </div>
  </aside>

  <!-- Modal de Confirmación de Cierre de Sesión -->
  <BaseModal 
    v-model:isOpen="isLogoutModalOpen" 
    title="Cerrar Sesión"
  >
    <div style="padding: 1rem 0; color: white;">
      <p>¿Estás seguro que deseas cerrar la sesión actual?</p>
      
      <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
        <BaseButton variant="ghost" @click="isLogoutModalOpen = false">
          Cancelar
        </BaseButton>
        <BaseButton variant="danger" @click="handleConfirmLogout">
          Sí, Cerrar Sesión
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
/* ============================
   SIDEBAR BASE
   ============================ */
.vortex-sidebar {
  width: 16rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: #0f172a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 20;
  height: 100vh;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ============================
   DESKTOP: sidebar siempre visible ≥ 768px
   ============================ */
.desktop-sidebar {
  display: none;
}
@media (min-width: 768px) {
  .desktop-sidebar {
    display: flex;
  }
}

/* ============================
   MOBILE: sidebar overlay < 768px
   ============================ */
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5);
}
@media (min-width: 768px) {
  .mobile-sidebar {
    display: none !important;
  }
}

/* Backdrop */
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 40;
}
@media (min-width: 768px) {
  .sidebar-backdrop {
    display: none !important;
  }
}

/* Botón cerrar (X) dentro del sidebar móvil */
.close-btn {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.close-btn:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

/* ============================
   TRANSITIONS
   ============================ */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* ============================
   ESTILOS COMPARTIDOS
   ============================ */

/* LOGO */
.logo-area {
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  gap: 0.75rem;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: linear-gradient(to bottom right, var(--color-primary), #2563eb);
  box-shadow: 0 10px 15px -3px rgba(25, 120, 229, 0.2);
}

.logo-icon .material-symbols-outlined { font-size: 1.25rem; }

.logo-text { display: flex; flex-direction: column; }
.logo-text h1 { color: white; font-size: 1rem; font-weight: 700; letter-spacing: -0.025em; line-height: 1; margin: 0; }
.logo-text span { color: #64748b; font-size: 0.625rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin-top: 2px; }

/* NAVEGACIÓN */
.nav-menu {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Scrollbar para el Sidebar */
.nav-menu::-webkit-scrollbar { width: 4px; }
.nav-menu::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
.nav-menu::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
.nav-menu::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

.nav-title {
  padding: 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}
.mt-top { margin-top: 1.5rem; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.nav-icon { font-size: 1.375rem; }
.nav-label { font-size: 0.875rem; font-weight: 500; }

.nav-item:hover {
  color: white;
  background-color: rgba(30, 41, 59, 0.5);
}

/* Estado Activo */
.router-link-active {
  background-color: rgba(25, 120, 229, 0.1);
  color: var(--color-primary);
  border-color: rgba(25, 120, 229, 0.2);
}
.router-link-active .nav-icon { color: var(--color-primary); }

/* PERFIL DE USUARIO */
.user-profile-mini {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.user-btn:hover { background-color: rgba(30, 41, 59, 0.5); }
.user-btn:hover .user-name { color: var(--color-primary); }
.user-btn:hover .logout-icon { opacity: 1; transform: translateX(0); }

.avatar-box {
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: #334155;
  border: 1px solid #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.625rem;
  height: 0.625rem;
  background-color: #22c55e;
  border: 2px solid #0f172a;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.user-name { font-size: 0.875rem; font-weight: 500; color: white; transition: color 0.2s; }
.user-role { font-size: 0.75rem; color: #64748b; }

.logout-icon {
  margin-left: auto;
  font-size: 1.25rem;
  color: #ef4444;
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.2s;
}
</style>