<script setup>
import { auth } from '../../services/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import BaseModal from '../../components/core/BaseModal.vue'
import BaseButton from '../../components/core/BaseButton.vue'

const router = useRouter()
const isLogoutModalOpen = ref(false)

const handleLogoutClick = () => {
  isLogoutModalOpen.value = true
}

const handleConfirmLogout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error("Error al salir:", error)
  } finally {
    isLogoutModalOpen.value = false
  }
}
</script>

<template>
  <div style="color: white; padding: 2rem;">
    <h1>🎉 ¡Bienvenido al Sistema!</h1>
    <p>Estás viendo el Dashboard. La ruta es "/".</p>

    <button @click="handleLogoutClick" class="logout-btn">
      🚪 Cerrar Sesión
    </button>
  </div>

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
.logout-btn {
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #ef4444;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.logout-btn:hover {
  background-color: #dc2626;
}
</style>