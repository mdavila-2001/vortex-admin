<script setup>
import { auth } from '../../services/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
  await signOut(auth)
  router.push('/') // o cambiar a '/login' cuando exista
}
</script>

<template>
  <div style="color: white; padding: 2rem;">
    <h1>🎉 ¡Bienvenido al Sistema!</h1>
    <p>Estás viendo el Dashboard. La ruta es "/".</p>

    <button @click="handleLogout" class="logout-btn">
      🚪 Cerrar Sesión
    </button>
  </div>
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