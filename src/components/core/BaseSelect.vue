<script setup>
import { useId, computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  options: {
    type: Array,
    required: true,
    // Expects array of objects: [{ value: 'id', label: 'Display text' }, ...]
  },
  placeholder: {
    type: String,
    default: 'Seleccionar...'
  },
  icon: String,
  error: String,
  id: String,
  required: { type: Boolean, default: false }
})

defineEmits(['update:modelValue'])

const uniqueId = useId()
const selectId = computed(() => props.id || uniqueId)
</script>

<template>
  <div class="vortex-input-group">
    <label v-if="label" :for="selectId" class="input-label">{{ label }}</label>
    
    <div class="input-wrapper" :class="{ 'has-error': error }">
      <span v-if="icon" class="material-icons input-icon">{{ icon }}</span>
      
      <select 
        :id="selectId"
        :value="modelValue"
        :required="required"
        @change="$emit('update:modelValue', $event.target.value)"
        class="vortex-input select-input"
        :class="{ 'with-icon': icon, 'is-placeholder': !modelValue }"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option 
          v-for="(option, index) in options" 
          :key="index" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <!-- Custom arrow for the select -->
      <span class="material-symbols-outlined select-arrow">expand_more</span>
    </div>

    <p v-if="error" class="error-msg">{{ error }}</p>
  </div>
</template>

<style scoped>
.vortex-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
}

.input-label {
    text-align: start;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-muted, #cbd5e1);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.vortex-input {
  width: 100%;
  background-color: var(--color-bg-input, var(--color-surface-light));
  border: 1px solid var(--color-border-subtle, var(--color-border));
  color: var(--color-text-main, var(--color-text-white));
  border-radius: var(--radius-md);
  padding: 0.625rem;
  font-family: inherit;
  font-size: 0.875rem;
  transition: all 0.2s;
  outline: none;
  cursor: pointer;
}

/* Esconder la flecha nativa */
.select-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem; /* Espacio para nuestro ícono de flecha personalizado */
}

/* Estilo para las opciones nativas en navegadores que lo soporten */
.select-input option {
  background-color: var(--color-bg-surface);
  color: var(--color-text-main);
}

/* Color de placeholder cuando no hay nada seleccionado */
.select-input.is-placeholder {
  color: var(--color-text-muted, #64748b);
}

.vortex-input:focus {
  background-color: var(--color-bg-surface);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(25, 120, 229, 0.2); 
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  color: var(--color-text-muted, #64748b);
  font-size: 1.2rem;
  pointer-events: none;
}
.vortex-input.with-icon {
  padding-left: 2.5rem;
}

.select-arrow {
  position: absolute;
  right: 0.75rem;
  color: var(--color-text-muted, #64748b);
  font-size: 1.25rem;
  pointer-events: none; /* Que los clics pasen a través del ícono al select */
}

.input-wrapper.has-error .vortex-input {
  border-color: var(--color-danger);
  background-color: var(--color-danger-bg, rgba(239, 68, 68, 0.05));
}
.error-msg {
  font-size: 0.75rem;
  color: var(--color-danger);
}
</style>
