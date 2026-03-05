<script setup>
import { ref, computed, onMounted } from 'vue'
// Componentes UI
import BaseButton from '../../components/core/BaseButton.vue'
import BaseInput from '../../components/core/BaseInput.vue'
import BaseTable from '../../components/core/BaseTable.vue'
import BaseBadge from '../../components/core/BaseBadge.vue'
import ProductModal from './components/ProductModal.vue'

// Firebase
import { db } from '../../services/firebase'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuthStore } from '../../store/auth'

const isModalOpen = ref(false)
const searchQuery = ref('')
const isLoading = ref(false)
const isSaving = ref(false)

const products = ref([])

const tableHeaders = [
  { key: 'sku', label: 'SKU / Código' },
  { key: 'name', label: 'Producto' },
  { key: 'price', label: 'Precio (BOB)', align: 'right' },
  { key: 'stock', label: 'Stock Actual', align: 'center' },
  { key: 'status', label: 'Estado', align: 'center' },
  { key: 'actions', label: 'Acciones', align: 'right' }
]

// 1. CARGAR PRODUCTOS
const fetchProducts = async () => {
  if (!useAuthStore.user?.company_id) return
  
  isLoading.value = true
  try {
    const productsRef = collection(db, `companies/${useAuthStore.user.company_id}/products`)
    const snapshot = await getDocs(productsRef)
    
    products.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Error al cargar productos:", error)
  } finally {
    isLoading.value = false
  }
}

// 2. GUARDAR PRODUCTO + CLOUDINARY
const handleSaveProduct = async (payload) => {
  isSaving.value = true
  try {
    const companyId = useAuthStore.user?.company_id
    if (!companyId) throw new Error("No se encontró la empresa del usuario")

    let imageUrl = null

    // A) SUBIR IMAGEN A CLOUDINARY (Si el usuario seleccionó una)
    if (payload.image) {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      
      // Preparamos el "paquete" para enviar a Cloudinary
      const formData = new FormData()
      formData.append('file', payload.image)
      formData.append('upload_preset', uploadPreset)

      console.log("Subiendo imagen a Cloudinary...")
      const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      })

      if (!cloudinaryResponse.ok) {
        throw new Error("Error al subir la imagen a Cloudinary")
      }

      const cloudinaryData = await cloudinaryResponse.json()
      imageUrl = cloudinaryData.secure_url // ¡Aquí está nuestro link público!
      console.log("Imagen subida con éxito:", imageUrl)
    }

    // B) GUARDAR EN FIRESTORE
    const newProduct = {
      name: payload.data.name,
      sku: payload.data.sku.toUpperCase(),
      category: payload.data.category,
      price: Number(payload.data.price),
      stock: Number(payload.data.stock) || 0,
      description: payload.data.description || '',
      image_url: imageUrl, // Guardamos el link de Cloudinary (o null)
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    }

    console.log("Guardando en Firestore...", newProduct)
    const productsRef = collection(db, `companies/${companyId}/products`)
    const docRef = await addDoc(productsRef, newProduct)

    // C) ACTUALIZAR LA TABLA VISUALMENTE
    products.value.push({
      id: docRef.id,
      ...newProduct
    })

    isModalOpen.value = false
    alert("¡Producto creado con éxito!")

  } catch (error) {
    console.error("Error en el proceso:", error)
    alert("Hubo un error al guardar el producto. Revisa la consola.")
  } finally {
    isSaving.value = false
  }
}

// Helper visual para la tabla
const getStockBadge = (product) => {
  if (product.category === 'servicios') return { variant: 'info', text: 'Servicio' }
  if (product.stock <= 0) return { variant: 'danger', text: 'Sin Stock' }
  if (product.stock <= 5) return { variant: 'warning', text: 'Stock Bajo' }
  return { variant: 'success', text: 'Óptimo' }
}

onMounted(() => {
  // Esperamos un poco para asegurar que Auth haya cargado (opcional, dependiendo de tu App.vue)
  setTimeout(() => fetchProducts(), 500)
})
</script>

<template>
  <div class="inventory-container">
    
    <header class="page-header">
      <div>
        <h1 class="page-title">Inventario y Catálogo</h1>
        <p class="page-subtitle">Gestiona tus productos, servicios y niveles de stock.</p>
      </div>
      <div class="header-actions">
        <BaseButton size="md" @click="isModalOpen = true">
          <span class="material-symbols-outlined mr-2" style="font-size: 18px;">add</span>
          Nuevo Producto
        </BaseButton>
      </div>
    </header>

    <div class="toolbar">
      <div class="search-box">
        <BaseInput 
          v-model="searchQuery" 
          placeholder="Buscar por nombre o SKU..." 
        />
      </div>
      <div class="filters">
        <BaseButton variant="outline" size="sm">
          <span class="material-symbols-outlined mr-2" style="font-size: 16px;">filter_list</span>
          Filtros
        </BaseButton>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <span class="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="empty-state">
      <div class="empty-state-icon">
        <span class="material-symbols-outlined">inventory_2</span>
      </div>
      <h3 class="empty-state-title">Aún no tienes productos</h3>
      <p class="empty-state-desc">Agrega tu primer producto o servicio para empezar a gestionar tu inventario.</p>
      <BaseButton size="md" @click="isModalOpen = true" class="mt-4">
        <span class="material-symbols-outlined mr-2" style="font-size: 18px;">add</span>
        Nuevo Producto
      </BaseButton>
    </div>

    <div v-else class="table-wrapper">
      <BaseTable :headers="tableHeaders">
        <tr v-for="item in products" :key="item.id" class="vortex-tr">
          <td class="vortex-td font-mono text-slate-400">{{ item.sku }}</td>
          
          <td class="vortex-td">
            <div class="product-info">
              <span class="font-medium text-white">{{ item.name }}</span>
              <span v-if="item.is_service" class="text-xs text-slate-500">Servicio</span>
              <span v-else class="text-xs text-slate-500">Producto Físico</span>
            </div>
          </td>
          
          <td class="vortex-td text-right font-medium text-white">
            Bs. {{ item.price_sale ? item.price_sale.toFixed(2) : '0.00' }}
          </td>
          
          <td class="vortex-td text-center">
            <span v-if="item.is_service" class="text-slate-600">--</span>
            <span v-else :class="{ 'text-danger font-bold': item.stock <= item.min_stock, 'text-white': item.stock > item.min_stock }">
              {{ item.stock }}
            </span>
          </td>
          
          <td class="vortex-td text-center">
            <BaseBadge :variant="getStockBadge(item).variant">
              {{ getStockBadge(item).text }}
            </BaseBadge>
          </td>
          
          <td class="vortex-td text-right">
            <div class="action-buttons">
              <button class="icon-btn hover-primary" title="Editar">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button class="icon-btn hover-danger" title="Eliminar">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </td>
        </tr>
      </BaseTable>
    </div>

    <ProductModal 
      v-model:isOpen="isModalOpen" 
      @save="handleSaveProduct"
    />

  </div>
</template>

<style scoped>
.inventory-container { display: flex; flex-direction: column; gap: 1.5rem; height: 100%; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; }
.page-title { font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 0.25rem; }
.page-subtitle { color: var(--color-text-muted); font-size: 0.875rem; }
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  text-align: center;
  margin-top: 1rem;
  border: 1px solid var(--color-border-subtle);
  padding: 1rem;
  border-radius: var(--radius-lg);
}
.search-box { flex: 1; max-width: 400px; }
.table-wrapper { background-color: var(--color-table-header); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); overflow: hidden; }
.vortex-tr { border-bottom: 1px solid var(--color-border-subtle); transition: background-color 0.2s; }
.vortex-tr:hover { background-color: var(--color-row-hover); }
.vortex-td { padding: 1rem 1.5rem; vertical-align: middle; }
.product-info { display: flex; flex-direction: column; }
.text-danger { color: var(--color-danger); }
.text-slate-400 { color: var(--color-text-muted); }
.text-slate-500 { color: var(--color-text-muted); }
.text-slate-600 { color: var(--color-border); }
.action-buttons { display: flex; justify-content: flex-end; gap: 0.5rem; }
.icon-btn { background: transparent; border: none; color: var(--color-text-muted); cursor: pointer; padding: 0.25rem; border-radius: var(--radius-sm); transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.icon-btn .material-symbols-outlined { font-size: 1.25rem; }
.hover-primary:hover { color: var(--color-primary); background-color: var(--color-primary-bg); }
.hover-danger:hover { color: var(--color-danger); background-color: var(--color-danger-bg); }

/* Empty State Styles */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  height: 100%;
  
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  text-align: center;
  margin-top: 1rem;
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  
  /* Glassmorphism icon background */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--color-text-muted);
}

.empty-state-icon .material-symbols-outlined {
  font-size: 32px;
}

.empty-state-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.empty-state-desc {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  max-width: 400px;
  margin-bottom: 1rem;
}
</style>