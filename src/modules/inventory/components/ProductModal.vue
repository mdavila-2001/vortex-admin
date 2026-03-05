<script setup>
import { ref, computed } from 'vue'
import BaseModal from '../../../components/core/BaseModal.vue'
import BaseInput from '../../../components/core/BaseInput.vue'
import BaseSelect from '../../../components/core/BaseSelect.vue'
import BaseButton from '../../../components/core/BaseButton.vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['update:isOpen', 'save'])

const errors = ref({})

const product = ref({
  name: '',
  sku: '',
  category: '',
  price: null,
  stock: null,
  min_stock_alert: 5,
  description: ''
})

const imageFile = ref(null)
const imagePreview = ref(null)

const triggerFileInput = () => {
  document.getElementById('file-upload').click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const isFormValid = computed(() => {
  return (
    product.value.name.trim() !== '' &&
    product.value.sku.trim() !== '' &&
    product.value.category !== '' &&
    product.value.price !== null && product.value.price !== '' &&
    product.value.stock !== null && product.value.stock !== '' &&
    product.value.min_stock_alert !== null && product.value.min_stock_alert !== ''
  )
})

const handleSave = () => {
  errors.value = {}
  let hasError = false
  
  if (!product.value.name) {
    errors.value.name = 'El nombre es requerido'
    hasError = true
  }
  if (!product.value.sku) {
    errors.value.sku = 'El SKU es requerido'
    hasError = true
  }
  if (!product.value.category) {
    errors.value.category = 'La categoría es requerida'
    hasError = true
  }
  if (product.value.price === null || product.value.price === '') {
    errors.value.price = 'El precio es requerido'
    hasError = true
  }
  if (product.value.stock === null || product.value.stock === '') {
    errors.value.stock = 'El stock es requerido'
    hasError = true
  }
  if (product.value.min_stock_alert === null || product.value.min_stock_alert === '') {
    errors.value.min_stock_alert = 'La alerta de stock es requerida'
    hasError = true
  }

  if (hasError) return

  emit('save', { data: product.value, image: imageFile.value })
}
</script>

<template>
  <BaseModal 
    :isOpen="isOpen" 
    @update:isOpen="emit('update:isOpen', $event)"
    title="Agregar Nuevo Producto"
  >
    <form @submit.prevent="handleSave" class="modal-form">
      
      <div class="form-layout">
        <div class="col-image">
          <label class="input-label">Imagen del Producto</label>
          
          <div class="image-dropzone" @click="triggerFileInput">
            <img 
              v-if="imagePreview" 
              :src="imagePreview" 
              class="image-preview" 
            />
            
            <div class="dropzone-overlay" :class="{ 'has-image': imagePreview }"></div>
            
            <div class="dropzone-content" :class="{ 'has-image': imagePreview }">
              <div class="upload-icon-box">
                <span class="material-symbols-outlined text-primary upload-icon">cloud_upload</span>
              </div>
              <span class="upload-title">Clic para subir</span>
              <span class="upload-subtitle">PNG, JPG hasta 2MB</span>
            </div>

            <input id="file-upload" type="file" accept="image/*" class="hidden-input" @change="handleFileChange" />
          </div>
        </div>

        <div class="col-fields">
          
          <div class="input-group">
            <BaseInput 
              v-model="product.name" 
              label="Nombre del Producto" 
              placeholder="Ej: Taladro Bosch 500W"
              :error="errors.name"
            />
          </div>
          
          <div class="fields-row">
            <div class="input-group">
              <BaseInput 
                v-model="product.sku" 
                label="SKU / Código" 
                placeholder="VOR-0001" 
                class="uppercase-input"
                :error="errors.sku"
                actionIcon="autorenew"
                actionTitle="Generar Automático"
              />
            </div>
            
            <div class="input-group">
              <BaseSelect 
                v-model="product.category"
                label="Categoría"
                :options="[
                  { value: 'herramientas', label: 'Herramientas' },
                  { value: 'materiales', label: 'Materiales' },
                  { value: 'servicios', label: 'Servicios' }
                ]"
                :error="errors.category"
              />
            </div>
          </div>

          <div class="fields-row">
            <div class="input-group relative">
              <BaseInput 
                v-model="product.price" 
                type="number" 
                label="Precio (BOB)" 
                placeholder="0.00" 
                class="price-prefix-padding"
                :error="errors.price"
              />
              <span class="prefix-symbol" style="top: 38px;">Bs.</span>
            </div>
            
            <div class="input-group">
              <BaseInput 
                v-model="product.stock" 
                type="number" 
                label="Stock Inicial" 
                placeholder="0"
                :error="errors.stock"
              />
            </div>
          </div>

          <div class="fields-row">
            <div class="input-group">
              <BaseInput 
                v-model="product.min_stock_alert" 
                type="number" 
                label="Alerta Min. Stock" 
                placeholder="5"
                :error="errors.min_stock_alert"
              />
            </div>
            <div></div> <!-- Empty div to keep the layout in the left column on desktop -->
          </div>

          <div class="input-group">
            <label class="input-label" style="font-size: 0.875rem; font-weight: 500; color: var(--color-text-muted);">Descripción</label>
            <textarea v-model="product.description" rows="2" class="textarea" placeholder="Escribe los detalles aquí..."></textarea>
          </div>

        </div>
      </div>

      <div class="form-actions">
        <BaseButton variant="ghost" @click="emit('update:isOpen', false)">
          Cancelar
        </BaseButton>
        <BaseButton variant="secondary" @click="handleSave" :disabled="!isFormValid">
          <span class="material-symbols-outlined" style="font-size: 18px;">save</span>
          Guardar Producto
        </BaseButton>
      </div>
      
    </form>
  </BaseModal>
</template>

<style scoped>
/* =========================================
   LAYOUT DEL FORMULARIO
   ========================================= */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .form-layout { flex-direction: row; }
  .col-image { width: 33.333%; }
  .col-fields { width: 66.666%; display: flex; flex-direction: column; gap: 1.25rem; }
}

.fields-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .fields-row { grid-template-columns: 1fr 1fr; }
}

/* =========================================
   ZONA DE IMAGEN (DROPZONE)
   ========================================= */
.image-dropzone {
  aspect-ratio: 1 / 1;
  width: 100%;
  border: 2px dashed var(--color-border); /* border-slate-600 */
  border-radius: var(--radius-lg); /* rounded-xl */
  background-color: var(--color-table-header);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.image-dropzone:hover {
  background-color: var(--color-row-hover);
  border-color: var(--color-primary); /* primary/50 */
}

.image-preview {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.dropzone-overlay {
  position: absolute;
  inset: 0;
  background-color: var(--color-bg-surface);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 2;
}

.image-dropzone:hover .dropzone-overlay.has-image { opacity: 1; }

.dropzone-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  transition: opacity 0.2s;
}

.dropzone-content.has-image { opacity: 0; }
.image-dropzone:hover .dropzone-content.has-image { opacity: 1; }

.upload-icon-box {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-bg-input); /* slate-800 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  transition: transform 0.2s;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--color-border);
}

.image-dropzone:hover .upload-icon-box { transform: scale(1.1); }
.upload-icon { font-size: 1.5rem; color: var(--color-primary); }

.upload-title { font-size: 0.875rem; font-weight: 500; color: var(--color-text-main); }
.upload-subtitle { font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.25rem; }

.hidden-input { display: none; }
.relative { position: relative; }

/* Ajustes especiales para BaseInputs en este componente */
:deep(.uppercase-input .vortex-input) {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-right: 2.5rem; /* Espacio par el botón */
}
:deep(.price-prefix-padding .vortex-input) {
  padding-left: 2.5rem;
}

/* =========================================
   INPUTS DE VIDRIO Y OTROS COMPONENTES
   ========================================= */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem; /* Para móviles si se apila */
}
@media (min-width: 768px) { .input-group { margin-bottom: 0; } }

.textarea { 
  width: 100%;
  background-color: var(--color-bg-input);
  border: 1px solid var(--color-border-subtle);
  color: var(--color-text-main);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;
  resize: none; 
}
.textarea:focus {
  background-color: var(--color-bg-surface);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(25, 120, 229, 0.2);
}
.textarea::placeholder { color: var(--color-text-muted); }



.prefix-symbol {
  position: absolute;
  left: 1rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 500;
}
.glass-input.has-prefix { padding-left: 2.5rem; }

/* =========================================
   BOTONES DEL FOOTER
   ========================================= */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border-subtle);
}


</style>