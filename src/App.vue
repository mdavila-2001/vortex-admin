<script setup>
import { ref, onMounted } from 'vue'
import { auth } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import SandBox from './views/SandBox.vue'
import LoginView from './modules/auth/LoginView.vue'
import Layout from './components/layout/Layout.vue'

const isAuthReady = ref(false)
const user = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    isAuthReady.value = true
  })
})
</script>

<template>
  <div v-if="!isAuthReady" class="auth-loading">
    <div class="spinner"></div>
  </div>

  <LoginView v-else-if="!user" />

  <Layout v-else>
    <router-view />
  </Layout>
  <!-- <SandBox /> -->
</template>

<style scoped>
.auth-loading {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-body);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
