<script setup>
import { ref } from 'vue'
import BaseButton from '../components/core/BaseButton.vue'
import BaseInput from '../components/core/BaseInput.vue'
import BaseCard from '../components/core/BaseCard.vue'
import BaseBadge from '../components/core/BaseBadge.vue'
import BaseAlert from '../components/core/BaseAlert.vue'
import BaseTable from '../components/core/BaseTable.vue'
import BaseTabs from '../components/core/BaseTabs.vue'
import BaseBreadcrumbs from '../components/core/BaseBreadcrumbs.vue'
import BasePagination from '../components/core/BasePagination.vue'

// Variables reactivas para probar los inputs
const email = ref('')
const password = ref('')
const search = ref('')
const tableHeaders = [
  { key: 'id', label: 'Transaction ID' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount', align: 'right' },
  { key: 'status', label: 'Status' }
]

const activeTab1 = ref('tab1')
const tabsData = [
  { id: 'tab1', label: 'Overview' },
  { id: 'tab2', label: 'Transactions' },
  { id: 'tab3', label: 'Settings' }
]

const activeTab2 = ref('daily')
const pillTabsData = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' }
]

const breadcrumbData = [
  { label: 'Home', icon: 'home', link: '#' },
  { label: 'Finance', link: '#' },
  { label: 'Invoices', link: '#' },
  { label: 'INV-2023-001' }
]
</script>

<template>
  <div class="sandbox-container">
    
    <header class="sandbox-header">
      <h1 class="title">🧪 Vortex UI Sandbox</h1>
      <p class="subtitle">Auditoría de Componentes Base (CSS Puro)</p>
    </header>

    <main class="grid-layout">
      
      <section class="section">
        <h2 class="section-title">1. Botones (BaseButton)</h2>
        
        <BaseCard class="card-demo">
          <div class="row">
            <span class="label">Primary:</span>
            <BaseButton>Confirm Transaction</BaseButton>
            <BaseButton disabled>Disabled</BaseButton>
            <BaseButton :loading="true">Processing...</BaseButton>
          </div>

          <div class="row">
            <span class="label">Secondary:</span>
            <BaseButton variant="secondary">Approve Order</BaseButton>
            <BaseButton variant="secondary" disabled>Approve</BaseButton>
          </div>

          <div class="row">
            <span class="label">Outline/Ghost:</span>
            <BaseButton variant="outline">Export Data</BaseButton>
            <BaseButton variant="ghost">Cancel</BaseButton>
            <BaseButton variant="danger">Delete</BaseButton>
          </div>
          
          <div class="row">
            <span class="label">Sizes:</span>
            <BaseButton size="sm">Small</BaseButton>
            <BaseButton size="md">Medium</BaseButton>
            <BaseButton size="lg">Large Action</BaseButton>
          </div>
        </BaseCard>
      </section>

      <section class="section">
        <h2 class="section-title">2. Entradas (BaseInput)</h2>
        
        <BaseCard class="card-demo">
          <div class="col">
            <BaseInput 
              label="Email Address" 
              placeholder="name@company.com" 
              v-model="email"
            />
            
            <BaseInput 
              label="Search (Con Icono)" 
              placeholder="Search transactions..." 
              icon="search"
              v-model="search"
            />

            <BaseInput 
              label="Password (Error State)" 
              type="password"
              placeholder="••••••••" 
              error="La contraseña es muy corta"
              v-model="password"
            />
          </div>
        </BaseCard>
      </section>

      <section class="section">
        <h2 class="section-title">3. Contexto Real: Login</h2>
        
        <div class="login-wrapper">
          <BaseCard>
            <div class="login-header">
              <span class="material-icons logo-icon">blur_on</span>
              <h3>Welcome Back</h3>
              <p>Enter your credentials to access Vortex.</p>
            </div>

            <form class="login-form" @submit.prevent>
              <BaseInput label="Email" placeholder="admin@vortex.com" />
              <BaseInput label="Password" type="password" placeholder="••••••" />
              
              <div class="actions">
                <BaseButton block size="lg">Sign In</BaseButton>
                <BaseButton block variant="ghost" size="sm">Forgot Password?</BaseButton>
              </div>
            </form>
          </BaseCard>
        </div>
      </section>

    </main>
  </div>
  <div class="sandbox-container">
    <section class="section">
      <h2 class="section-title">4. Status Badges</h2>
      <BaseCard class="card-demo">
        <div class="row">
          <span class="label">Sólidos:</span>
          <BaseBadge variant="success" icon>Success</BaseBadge>
          <BaseBadge variant="warning" icon>Warning</BaseBadge>
          <BaseBadge variant="danger" icon>Critical</BaseBadge>
          <BaseBadge variant="primary">Processing</BaseBadge>
          <BaseBadge variant="offline">Offline</BaseBadge>
        </div>
        <div class="row">
          <span class="label">Outline:</span>
          <BaseBadge variant="success" outline>Verified <span class="material-icons" style="font-size:12px">check</span></BaseBadge>
          <BaseBadge variant="info" outline>Info <span class="material-icons" style="font-size:12px">info</span></BaseBadge>
        </div>
      </BaseCard>
    </section>

    <section class="section">
      <h2 class="section-title">5. Alertas</h2>
      <div class="col" style="max-width: 100%;">
        <BaseAlert variant="info" title="System Update">
          Scheduled maintenance will occur tonight at 02:00 AM UTC.
        </BaseAlert>
        <BaseAlert variant="success" title="Export Completed">
          Your data export is ready for download.
        </BaseAlert>
        <BaseAlert variant="warning" title="License Expiring">
          Your Pro license expires in 3 days. <a href="#">Renew now</a>.
        </BaseAlert>
        <BaseAlert variant="danger" title="Connection Failed">
          Unable to connect to the database. Please check your network settings.
        </BaseAlert>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">6. Tablas de Datos</h2>
      <BaseTable :headers="tableHeaders">
        <tr class="vortex-tr">
          <td class="vortex-td font-mono">TRX-8992-ALPHA</td>
          <td class="vortex-td text-muted">Oct 24, 2023</td>
          <td class="vortex-td text-right">$12,450.00</td>
          <td class="vortex-td"><BaseBadge variant="success">Completed</BaseBadge></td>
        </tr>
        <tr class="vortex-tr is-selected">
          <td class="vortex-td font-mono text-primary">TRX-8993-BETA</td>
          <td class="vortex-td text-muted">Oct 24, 2023</td>
          <td class="vortex-td text-right">$3,200.00</td>
          <td class="vortex-td"><BaseBadge variant="warning">Pending</BaseBadge></td>
        </tr>
        <tr class="vortex-tr is-error">
          <td class="vortex-td font-mono text-danger">TRX-8994-ERR</td>
          <td class="vortex-td text-muted">Oct 23, 2023</td>
          <td class="vortex-td text-right text-danger">Failed</td>
          <td class="vortex-td"><BaseBadge variant="danger">Failed</BaseBadge></td>
        </tr>
      </BaseTable>
    </section>
    <section class="section">
      <h2 class="section-title">7. Breadcrumbs</h2>
      <BaseCard>
        <BaseBreadcrumbs :items="breadcrumbData" />
      </BaseCard>
    </section>

    <section class="section">
      <h2 class="section-title">8. Tabs Systems</h2>
      <div class="grid-layout">
        <BaseCard>
          <span class="label mb-4 block">Underline Style:</span>
          <BaseTabs :tabs="tabsData" v-model="activeTab1" variant="underline" />
        </BaseCard>
        
        <BaseCard>
          <span class="label mb-4 block">Pill Style:</span>
          <BaseTabs :tabs="pillTabsData" v-model="activeTab2" variant="pill" />
        </BaseCard>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">9. Pagination</h2>
      <BaseCard class="flex justify-center">
        <BasePagination />
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
/* Estilos solo para organizar el Sandbox (No son parte del sistema de diseño) */
.sandbox-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--color-text-white);
}

.sandbox-header {
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.title { font-size: 2rem; font-weight: 700; color: var(--color-text-white); }
.subtitle { color: var(--color-text-muted); }

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.section-title {
  margin-bottom: 1rem;
  color: var(--color-primary);
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Filas y Columnas de demostración */
.card-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  border-bottom: 1px dashed var(--color-border);
}

.row:last-child { border-bottom: none; }

.col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}

.label {
  min-width: 100px;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.login-wrapper { max-width: 400px; margin: 0 auto; }
.login-header { text-align: center; margin-bottom: 2rem; }
.login-header h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
.login-header p { color: var(--color-text-muted); font-size: 0.9rem; }
.logo-icon { 
  font-size: 3rem; 
  color: var(--color-primary); 
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(25, 120, 229, 0.4); 
}
.login-form { display: flex; flex-direction: column; gap: 1rem; }
.actions { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }

@media (min-width: 768px) {
  .grid-layout { grid-template-columns: repeat(2, 1fr); }
  .section:last-child { grid-column: span 2; }
}

.vortex-tr {
  border-bottom: 1px solid var(--color-border-subtle);
  transition: background-color 0.2s;
}
.vortex-tr:hover { background-color: var(--color-row-hover); }

.vortex-td {
  padding: 1rem 1.5rem;
  color: var(--color-text-white);
}

.text-muted { color: var(--color-text-muted); }
.text-right { text-align: right; }
.font-mono { font-family: monospace; }
.text-primary { color: var(--color-primary); }
.text-danger { color: var(--color-danger); }

/* Filas con estados especiales (replicando los bordes del HTML) */
.is-selected {
  background-color: rgba(25, 120, 229, 0.1);
  border-left: 2px solid var(--color-primary);
}
.is-error {
  background-color: var(--color-danger-bg);
  border-left: 2px solid var(--color-danger);
}
.is-error:hover { background-color: rgba(239, 68, 68, 0.15); }
</style>