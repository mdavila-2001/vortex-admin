<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  title: String
})

const emit = defineEmits(['update:isOpen'])
const dialogRef = ref(null)

// Escuchar los cambios para abrir o cerrar el <dialog> nativo
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    dialogRef.value?.showModal()
  } else {
    dialogRef.value?.close()
  }
})

const closeModal = () => {
  emit('update:isOpen', false)
}
</script>

<template>
  <dialog 
    ref="dialogRef" 
    class="vortex-modal"
    @cancel.prevent="closeModal" 
  >
    <div v-if="isOpen" class="modal-wrapper animate-fade-in-up">
      <div class="modal-header">
        <h3 class="modal-title">{{ title }}</h3>
        <button @click="closeModal" class="close-btn" title="Cerrar">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
/* El <dialog> por defecto tiene estilos feos, los reseteamos */
.vortex-modal {
  padding: 0;
  border: none;
  background: transparent;
  max-width: 900px;
  width: 90%;
  border-radius: var(--radius-xl);
  outline: none;
}

/* El fondo oscuro difuminado que pone el <dialog> nativo */
.vortex-modal::backdrop {
  background: rgba(15, 23, 42, 0.7); /* Deep slate semi-transparente */
  backdrop-filter: blur(4px);
}

.modal-wrapper {
  background: rgba(30, 41, 59, 0.85); /* Glass panel */
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border-radius: inherit;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.25rem;
  display: flex;
  transition: all 0.2s;
}
.close-btn:hover { background: rgba(255, 255, 255, 0.1); color: white; }

.modal-body { padding: 2rem; }

/* Animación que venía en tu HTML */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>