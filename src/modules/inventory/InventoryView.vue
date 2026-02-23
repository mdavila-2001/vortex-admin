<script setup>
import { ref, computed } from 'vue'
import BaseButton from '../../components/core/BaseButton.vue'
import BaseInput from '../../components/core/BaseInput.vue'
import BaseTable from '../../components/core/BaseTable.vue'
import BaseBadge from '../../components/core/BaseBadge.vue'

// 1. IMPORTAMOS NUESTRO NUEVO MODAL
import ProductModal from './components/ProductModal.vue'

// 2. ESTADO PARA CONTROLAR SI EL MODAL ESTÁ ABIERTO O CERRADO
const isModalOpen = ref(false)

// Estado de la búsqueda
const searchQuery = ref('')

// Configuración de las columnas de la tabla
const tableHeaders = [
  { key: 'sku', label: 'SKU / Código' },
  { key: 'name', label: 'Producto' },
  { key: 'price', label: 'Precio (BOB)', align: 'right' },
  { key: 'stock', label: 'Stock Actual', align: 'center' },
  { key: 'status', label: 'Estado', align: 'center' },
  { key: 'actions', label: 'Acciones', align: 'right' }
]

// Datos de prueba (Mock Data) simulando la ferretería
const products = ref([
  { id: '1', sku: 'TLD-001', name: 'Taladro Bosch 500W', price: 850.00, stock: 15, min_stock: 5, is_service: false },
  { id: '2', sku: 'BRC-010', name: 'Broca de Acero 1/4', price: 15.50, stock: 120, min_stock: 20, is_service: false },
  { id: '3', sku: 'CMT-050', name: 'Cemento Fancesa 50kg', price: 55.00, stock: 3, min_stock: 50, is_service: false },
  { id: '4', sku: 'SRV-001', name: 'Servicio de Flete (Camioneta)', price: 100.00, stock: null, min_stock: 0, is_service: true }
])

// Lógica visual para las etiquetas (Badges)
const getStockBadge = (product) => {
  if (product.is_service) return { variant: 'info', text: 'Servicio' }
  if (product.stock <= 0) return { variant: 'danger', text: 'Sin Stock' }
  if (product.stock <= product.min_stock) return { variant: 'warning', text: 'Stock Bajo' }
  return { variant: 'success', text: 'Óptimo' }
}

// 3. FUNCIÓN QUE SE EJECUTA CUANDO EL MODAL DICE "GUARDAR"
const handleSaveProduct = (payload) => {
  console.log("Datos recibidos del formulario:", payload.data)
  console.log("Imagen recibida:", payload.image)
  
  // Por ahora, solo cerramos el modal. 
  // ¡Aquí es donde luego conectaremos Firebase!
  isModalOpen.value = false
  
  alert("Producto listo para guardar (Revisa la consola F12)")
}
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

    <div class="table-wrapper">
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
            Bs. {{ item.price.toFixed(2) }}
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
/* (Mantén los mismos estilos que ya tenías en InventoryView.vue) */
.inventory-container { display: flex; flex-direction: column; gap: 1.5rem; height: 100%; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; }
.page-title { font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 0.25rem; }
.page-subtitle { color: #94a3b8; font-size: 0.875rem; }
.toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; background-color: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: var(--radius-lg); }
.search-box { flex: 1; max-width: 400px; }
.table-wrapper { background-color: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); overflow: hidden; }
.vortex-tr { border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background-color 0.2s; }
.vortex-tr:hover { background-color: rgba(255, 255, 255, 0.02); }
.vortex-td { padding: 1rem 1.5rem; vertical-align: middle; }
.product-info { display: flex; flex-direction: column; }
.text-danger { color: #ef4444; }
.text-slate-400 { color: #94a3b8; }
.text-slate-500 { color: #64748b; }
.text-slate-600 { color: #475569; }
.action-buttons { display: flex; justify-content: flex-end; gap: 0.5rem; }
.icon-btn { background: transparent; border: none; color: #64748b; cursor: pointer; padding: 0.25rem; border-radius: 0.25rem; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.icon-btn .material-symbols-outlined { font-size: 1.25rem; }
.hover-primary:hover { color: var(--color-primary); background-color: rgba(25, 120, 229, 0.1); }
.hover-danger:hover { color: #ef4444; background-color: rgba(239, 68, 68, 0.1); }
</style>