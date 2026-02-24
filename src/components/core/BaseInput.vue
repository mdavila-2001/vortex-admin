<script setup>
import { useId, computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  icon: String,
  error: String,
  id: String,
  required: { type: Boolean, default: false },
  actionIcon: String,
  actionTitle: String
})

defineEmits(['update:modelValue', 'action-click'])

const uniqueId = useId()
const inputId = computed(() => props.id || uniqueId)
</script>

<template>
  <div class="vortex-input-group">
    <label v-if="label" :for="inputId" class="input-label">{{ label }}</label>
    
    <div class="input-wrapper" :class="{ 'has-error': error }">
      <span v-if="icon" class="material-icons input-icon">{{ icon }}</span>
      
      <input 
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        @input="$emit('update:modelValue', $event.target.value)"
        class="vortex-input"
        :class="{ 'with-icon': icon, 'with-action': actionIcon }"
      />
      
      <button 
        v-if="actionIcon" 
        type="button" 
        class="action-btn" 
        :title="actionTitle"
        @click="$emit('action-click')"
      >
        <span class="material-symbols-outlined">{{ actionIcon }}</span>
      </button>
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
    color: #cbd5e1;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.vortex-input {
  width: 100%;
  background-color: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-text-white);
  border-radius: var(--radius-md);
  padding: 0.625rem;
  font-family: inherit;
  font-size: 0.875rem;
  transition: all 0.2s;
  outline: none;
}

.vortex-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(25, 120, 229, 0.2); 
}

.vortex-input::placeholder {
  color: #64748b;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  color: #64748b;
  font-size: 1.2rem;
  pointer-events: none;
}
.vortex-input.with-icon {
  padding-left: 2.5rem;
}

.input-wrapper.has-error .vortex-input {
  border-color: var(--color-danger);
  background-color: rgba(239, 68, 68, 0.05);
}
.error-msg {
  font-size: 0.75rem;
  color: var(--color-danger);
}

.vortex-input.with-action {
  padding-right: 2.5rem; /* Make room for the action button */
}

.action-btn {
  position: absolute;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: var(--color-text-muted, #64748b);
  padding: 0.25rem;
  border-radius: var(--radius-sm, 0.25rem);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover { 
  color: var(--color-primary); 
  background-color: rgba(25, 120, 229, 0.1); 
}
</style>