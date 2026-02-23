<script setup>
import { ref } from 'vue'
import { auth, db } from '../../services/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, collection } from 'firebase/firestore'

const loading = ref(false)
const message = ref('')
const error = ref('')

// Credenciales de prueba (¡Anótalas!)
const testEmail = 'admin@vortex.com'
const testPassword = '12345678'

const runSeed = async () => {
  loading.value = true
  message.value = ''
  error.value = ''

  try {
    const timestamp = new Date().toISOString()

    // 1. Crear el usuario en Firebase Auth (La llave de acceso)
    message.value = 'Creando usuario en Auth...'
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword)
    const uid = userCredential.user.uid

    // 2. Generar un ID para la Empresa
    const companyRef = doc(collection(db, 'companies'))
    const companyId = companyRef.id

    // 3. Crear el documento de la Empresa
    message.value = 'Creando Empresa...'
    await setDoc(companyRef, {
      name: 'Vortex Demo S.R.L.',
      nit: '1029384756',
      plan: 'PRO',
      settings: {
        currency: 'BOB',
        inventory_method: 'PEPS'
      },
      image_url: null,
      created_at: timestamp,
      updated_at: timestamp,
      deleted_at: null
    })

    // 4. Crear el Almacén / Sucursal
    message.value = 'Creando Almacén...'
    const warehouseRef = doc(collection(db, `companies/${companyId}/warehouses`))
    await setDoc(warehouseRef, {
      code: 'ALM-001',
      name: 'Almacén Central',
      address: 'Av. Banzer 4to Anillo',
      type: 'MAIN',
      is_active: true,
      created_at: timestamp,
      updated_at: timestamp,
      deleted_at: null
    })

    // 5. Crear la Caja Principal (Account)
    message.value = 'Creando Caja Principal...'
    const accountRef = doc(collection(db, `companies/${companyId}/accounts`))
    await setDoc(accountRef, {
      name: 'Caja Registradora Principal',
      type: 'CASH',
      currency: 'BOB',
      balance: 0,
      is_active: true,
      created_at: timestamp,
      updated_at: timestamp,
      deleted_at: null
    })

    // 6. Crear el perfil del Usuario dentro de la empresa
    message.value = 'Vinculando Usuario a Empresa...'
    const userRef = doc(db, `companies/${companyId}/users`, uid)
    await setDoc(userRef, {
      company_id: companyId,
      warehouse_id: warehouseRef.id, // Lo asignamos al almacén que acabamos de crear
      email: testEmail,
      first_name: 'Super',
      last_name: 'Admin',
      role: 'ADMIN',
      image_url: null,
      is_active: true,
      created_at: timestamp,
      updated_at: timestamp,
      deleted_at: null
    })

    message.value = '¡BASE DE DATOS INICIALIZADA CON ÉXITO! 🎉'

  } catch (err) {
    console.error(err)
    if (err.code === 'auth/email-already-in-use') {
      error.value = 'El usuario ya existe. Ve al Login e inicia sesión.'
    } else {
      error.value = 'Error: ' + err.message
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="seed-container">
    <div class="seed-card">
      <h2>🌱 Inicializar Base de Datos</h2>
      <p>Este script creará la estructura inicial para que puedas probar el MVP.</p>
      
      <div class="credentials">
        <strong>Credenciales que se crearán:</strong>
        <ul>
          <li><strong>Usuario:</strong> {{ testEmail }}</li>
          <li><strong>Clave:</strong> {{ testPassword }}</li>
        </ul>
      </div>

      <button @click="runSeed" :disabled="loading" class="seed-btn">
        {{ loading ? 'Trabajando...' : '¡Ejecutar Seed Ahora!' }}
      </button>

      <div v-if="message" class="msg success">{{ message }}</div>
      <div v-if="error" class="msg error">{{ error }}</div>

      <div v-if="message.includes('ÉXITO')" class="action-link">
        <router-link to="/">Ir al Login para probar</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.seed-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #111821;
  color: white;
  font-family: 'Inter', sans-serif;
}
.seed-card {
  background: #1a222c;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #334155;
  max-width: 500px;
  width: 100%;
}
h2 { color: #4cc291; margin-bottom: 1rem; }
.credentials {
  background: rgba(255,255,255,0.05);
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  font-family: monospace;
}
.seed-btn {
  width: 100%;
  padding: 1rem;
  background-color: #1978e5;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
.seed-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.msg { margin-top: 1rem; padding: 1rem; border-radius: 8px; text-align: center; font-weight: bold; }
.success { background-color: rgba(76, 194, 145, 0.15); color: #6ee7b7; border: 1px solid #4cc291; }
.error { background-color: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid #ef4444; }
.action-link { margin-top: 1.5rem; text-align: center; }
.action-link a { color: #1978e5; text-decoration: none; font-weight: bold; }
</style>