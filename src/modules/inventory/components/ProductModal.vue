<script setup>
import { ref } from 'vue'
import BaseModal from '../../../components/core/BaseModal.vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['update:isOpen', 'save'])

// Variables del formulario
const product = ref({
  name: '',
  sku: '',
  category: '',
  price: null,
  stock: null,
  description: ''
})

const imageFile = ref(null)
const imagePreview = ref(null)

// Simular click en el input de archivo oculto
const triggerFileInput = () => {
  document.getElementById('file-upload').click()
}

// Pre-visualizar la imagen antes de subirla a Firebase
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSave = () => {
  // Aquí enviaremos los datos a InventoryView para que haga la lógica de Firebase
  emit('save', { data: product.value, image: imageFile.value })
}
</script>

<template>
  <BaseModal 
    :isOpen="isOpen" 
    @update:isOpen="emit('update:isOpen', $event)"
    title="Agregar Nuevo Producto"
  >
    <form @submit.prevent="handleSave" class="flex flex-col gap-6">
      
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/3 flex flex-col gap-4">
          <label class="text-sm font-medium text-slate-300">Imagen del Producto</label>
          
          <div 
            @click="triggerFileInput"
            class="aspect-square w-full rounded-xl border-2 border-dashed border-slate-600 bg-white/5 hover:bg-white/10 hover:border-primary transition-all cursor-pointer flex flex-col items-center justify-center group relative overflow-hidden"
          >
            <img 
              v-if="imagePreview" 
              :src="imagePreview" 
              class="absolute inset-0 w-full h-full object-cover z-0"
            />
            
            <div class="absolute inset-0 bg-background-dark/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            
            <div class="flex flex-col items-center justify-center relative z-20 p-4 text-center" :class="{ 'opacity-0 group-hover:opacity-100': imagePreview }">
              <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg border border-slate-600">
                <span class="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
              </div>
              <span class="text-sm font-medium text-slate-200">Clic para subir</span>
              <span class="text-xs text-slate-500 mt-1">PNG, JPG hasta 2MB</span>
            </div>

            <input 
              id="file-upload" 
              type="file" 
              accept="image/*" 
              class="hidden" 
              @change="handleFileChange"
            />
          </div>
        </div>

        <div class="w-full md:w-2/3 flex flex-col gap-5">
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-300">Nombre del Producto</label>
            <input v-model="product.name" type="text" class="glass-input w-full rounded-lg px-4 py-3 text-sm" placeholder="Ej: Taladro Bosch 500W" required />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-slate-300">SKU / Código</label>
              <div class="relative flex items-center">
                <input v-model="product.sku" type="text" class="glass-input w-full rounded-lg pl-4 pr-12 py-3 text-sm uppercase tracking-wide" placeholder="VOR-0001" required />
                <button type="button" class="absolute right-2 p-1.5 text-slate-400 hover:text-primary transition-colors">
                  <span class="material-symbols-outlined text-[20px]">autorenew</span>
                </button>
              </div>
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-slate-300">Categoría</label>
              <select v-model="product.category" class="glass-input w-full rounded-lg px-4 py-3 text-sm appearance-none cursor-pointer" required>
                <option value="" disabled class="bg-slate-800">Seleccionar...</option>
                <option value="herramientas" class="bg-slate-800">Herramientas</option>
                <option value="materiales" class="bg-slate-800">Materiales</option>
                <option value="servicios" class="bg-slate-800">Servicios</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-slate-300">Precio (BOB)</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Bs.</span>
                <input v-model="product.price" type="number" step="0.01" class="glass-input w-full rounded-lg pl-10 pr-4 py-3 text-sm" placeholder="0.00" required />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-slate-300">Stock Inicial</label>
              <input v-model="product.stock" type="number" class="glass-input w-full rounded-lg px-4 py-3 text-sm" placeholder="0" required />
            </div>
          </div>

        </div>
      </div>

      <div class="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-white/10">
        <button 
          type="button" 
          @click="emit('update:isOpen', false)"
          class="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-900 bg-[#34d399] hover:bg-[#10b981] transition-colors shadow-lg flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">save</span>
          Guardar Producto
        </button>
      </div>
      
    </form>
  </BaseModal>
</template>

<style scoped>
/* Estilos extraídos de tu HTML para los inputs */
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
  transition: all 0.2s ease;
  outline: none;
}
.glass-input:focus {
  background: rgba(15, 23, 42, 0.8);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(25, 120, 229, 0.2);
}
</style>