<script setup>
import { ref } from 'vue'
import { auth } from '../../services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

// Estado del formulario
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

// Función de Login a Firebase
const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Por favor, ingresa correo y contraseña."
    return
  }

  try {
    loading.value = true
    errorMessage.value = '' // Limpiar errores previos
    
    // 🔥 La llamada real a Firebase
    await signInWithEmailAndPassword(auth, email.value, password.value)
    
    // Si pasa de aquí, App.vue detectará el usuario y mostrará el Dashboard automáticamente.
    console.log("¡Login exitoso!")
    
  } catch (error) {
    console.error("Error de login:", error.code)
    // Traducción de errores comunes de Firebase
    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage.value = 'Correo o contraseña incorrectos.'
        break
      case 'auth/invalid-email':
        errorMessage.value = 'El formato del correo es inválido.'
        break
      case 'auth/too-many-requests':
        errorMessage.value = 'Demasiados intentos. Intenta más tarde.'
        break
      default:
        errorMessage.value = 'Ocurrió un error al intentar iniciar sesión.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-layout">
    <div class="brand-section">
      <div class="brand-bg">
        <img 
          alt="Abstract dark financial graphic" 
          class="brand-bg-image" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3LqMstQHlpsnbWAn3cpxVM3Kv2C88VWP49B-wczcbHym93lrRDWXC6HNZOjlXnWjmxQdHq4IOHsjfbmXgBsTUpl2ii795N5JpsqAjiv9_SuDpQhoQL2XUGQQJjek8I5gmWGZkKPkmoIcy_t_DjTo3QpaOBzRb5wvq7kRmnS4d1J-xI6g0nBpCrhO5TGtvm7MohYRNd4A7s3vd3sIwbriA001zEgNKNXMHHfLLDfXTLWGvi1GoXV3JRWv6AmHswdn_Ah5rlbffM-o"
        />
        <div class="brand-bg-overlay"></div>
      </div>
      
      <!-- Logo arriba -->
      <div class="brand-header">
        <div class="logo-box">
          <svg viewBox="0 0 100 100" class="logo-svg">
            <polygon fill="#205090" points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"></polygon>
            <polygon fill="#4cc291" points="50,5 95,27.5 95,50 5,50 5,27.5"></polygon>
            <path d="M35,40 L50,65 L65,40" fill="none" stroke="white" stroke-width="8"></path>
          </svg>
        </div>
        <span class="brand-name">Vortex</span>
      </div>

      <!-- Contenido hero abajo -->
      <div class="brand-content">
        <div class="badge">
          <span class="badge-dot"></span>
          <span>Fintech ERP Solutions</span>
        </div>
        <h1 class="hero-title">
          La inteligencia <br/>
          <span class="text-gradient">financiera</span> 
          de tu negocio.
        </h1>
        <p class="hero-text">
          Vortex centraliza tu contabilidad, inventarios y ventas en una plataforma robusta y sencilla para usar.
        </p>
      </div>
      
      <div class="glow-orb orb-primary"></div>
      <div class="glow-orb orb-accent"></div>
    </div>

    <!-- ============================================================
         LADO DERECHO: FORMULARIO
         ============================================================ -->
    <div class="form-section">
      <div class="form-container">
        
        <!-- Logo + Marca encima del formulario -->
        <div class="form-logo-header">
          <div class="form-logo-icon">
            <svg viewBox="0 0 100 100" class="logo-svg-form">
              <polygon fill="#205090" points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"></polygon>
              <polygon fill="#4cc291" points="50,5 95,27.5 95,50 5,50 5,27.5"></polygon>
              <path d="M30,40 L50,70 L70,40" fill="none" stroke="white" stroke-linecap="round" stroke-width="10"></path>
            </svg>
          </div>
          <div>
            <span class="form-logo-name">Vortex</span>
            <span class="form-logo-sub">El centro inteligente de tu negocio</span>
          </div>
        </div>

        <div class="form-header">
          <h2 class="form-title">Bienvenido de nuevo</h2>
          <p class="form-subtitle">Ingresa las credenciales de tu empresa para continuar.</p>
        </div>

        <div v-if="errorMessage" class="error-alert">
          <span class="material-symbols-outlined error-icon">error</span>
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          
          <div class="input-group">
            <label for="email">Correo Electrónico</label>
            <div class="input-wrapper">
              <span class="material-symbols-outlined input-icon">mail</span>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                placeholder="usuario@empresa.com" 
                
                class="vortex-input"
                :disabled="loading"
              />
            </div>
          </div>

          <div class="input-group">
            <div class="password-header">
              <label for="password">Contraseña</label>
              <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>
            <div class="input-wrapper">
              <span class="material-symbols-outlined input-icon">lock</span>
              <input 
                id="password" 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••••••" 
                class="vortex-input has-toggle"
                :disabled="loading"
              />
              <button 
                type="button" 
                class="toggle-password" 
                @click="showPassword = !showPassword"
              >
                <span class="material-symbols-outlined">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else class="material-symbols-outlined btn-icon">arrow_forward</span>
            {{ loading ? 'Verificando...' : 'Ingresar al Sistema' }}
          </button>
          
        </form>

        <div class="form-footer">
          <!-- <div class="footer-row">
            <div class="security-badge">
              <span class="material-symbols-outlined text-accent" style="font-variation-settings: 'FILL' 1;">verified_user</span>
              <span>Conexión Segura SSL de 256-bits</span>
            </div>
            <div class="footer-links">
              <a href="#">Soporte</a>
              <a href="#">Privacidad</a>
            </div>
          </div> -->
          <p class="copyright">© 2026 VORTEX ERP. TECNOLOGÍA FINANCIERA PARA TODOS.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.login-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-bg-body);
  overflow: hidden;
}

.brand-section {
  position: relative;
  display: none; /* Oculto en móviles */
  width: 50%;
  background-color: #020617; /* slate-950 */
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

@media (min-width: 768px) {
  .brand-section { display: flex; width: 42%; }
}
@media (min-width: 1024px) {
  .brand-section { width: 50%; }
}

/* Imagen de fondo */
.brand-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.brand-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
  mix-blend-mode: luminosity;
}
.brand-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top right, #111821, rgba(32, 80, 144, 0.4), rgba(76, 194, 145, 0.1));
}

.brand-header, .brand-content {
  position: relative;
  z-index: 10;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-box {
  width: 2.5rem;
  height: 2.5rem;
}
.logo-svg { width: 100%; height: 100%; filter: drop-shadow(0 10px 8px rgba(0,0,0,0.5)); }

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.025em;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  padding: 0.375rem 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--color-secondary);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: white;
  margin-bottom: 1.5rem;
}

@media (min-width: 1024px) {
  .hero-title { font-size: 3rem; }
}

.text-gradient {
  background: linear-gradient(to right, var(--color-secondary), var(--color-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-text {
  font-size: 1.125rem;
  color: #94a3b8;
  font-weight: 300;
  line-height: 1.6;
  max-width: 400px;
}

/* Efectos de luz traseros */
.glow-orb {
  position: absolute;
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 1;
}
.orb-primary { top: 25%; left: -3rem; background-color: rgba(25, 120, 229, 0.2); }
.orb-accent { bottom: 25%; right: -3rem; background-color: rgba(76, 194, 145, 0.1); }

/* ==========================================================================
   LADO DERECHO: FORMULARIO
   ========================================================================== */
.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: var(--color-bg-body);
  overflow-y: auto;
}

@media (min-width: 640px) {
  .form-section { padding: 3rem; }
}

/* Fondo para móviles */
@media (max-width: 767px) {
  .form-section {
    background: var(--color-bg-body);
  }
  .form-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(25, 120, 229, 0.1), transparent);
    opacity: 0.5;
    z-index: -1;
  }
}

.form-container {
  width: 100%;
  max-width: 28rem;
  padding: 1rem 0;
}

/* Logo + Marca Header del Form */
.form-logo-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.form-logo-icon {
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
  filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.25));
}

.logo-svg-form {
  width: 100%;
  height: 100%;
}

.form-logo-name {
  display: block;
  font-size: 1.875rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.form-logo-sub {
  display: block;
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--color-secondary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.form-header { margin-bottom: 2rem; }
.form-title { font-size: 1.875rem; font-weight: 700; color: white; margin-bottom: 0.5rem; }
.form-subtitle { color: var(--color-text-muted); font-size: 0.875rem; }

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #cbd5e1;
  margin-bottom: 0.375rem;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.375rem;
}
.password-header label { margin-bottom: 0; }

.forgot-link {
  font-size: 0.875rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.forgot-link:hover { color: white; }

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  color: #64748b;
  font-size: 1.25rem;
  transition: color 0.2s;
  pointer-events: none;
}

.input-wrapper:focus-within .input-icon {
  color: var(--color-primary);
}

.vortex-input {
  width: 100%;
  background-color: rgba(30, 41, 59, 0.3);
  border: 1px solid rgba(51, 65, 85, 0.5);
  color: white;
  border-radius: var(--radius-lg);
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  font-family: inherit;
  font-size: 0.875rem;
  transition: all 0.15s;
  outline: none;
}

.vortex-input.has-toggle {
  padding-right: 2.5rem;
}

.vortex-input::placeholder {
  color: #475569;
}

.vortex-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(25, 120, 229, 0.2);
}

.vortex-input:disabled { opacity: 0.5; cursor: not-allowed; }

.toggle-password {
  position: absolute;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
}
.toggle-password .material-symbols-outlined { font-size: 1.25rem; }
.toggle-password:hover { color: #cbd5e1; }

.submit-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.875rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 700;
  font-size: 0.875rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(25, 120, 229, 0.2);
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2563eb;
  box-shadow: 0 10px 15px -3px rgba(25, 120, 229, 0.4);
}

.submit-btn:active:not(:disabled) { transform: scale(0.98); }
.submit-btn:disabled { opacity: 0.7; cursor: wait; }

.btn-icon {
  position: absolute;
  left: 0.75rem;
  font-size: 1.25rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.submit-btn:hover .btn-icon { opacity: 1; }

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Alertas de Error */
.error-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--color-danger);
  padding: 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}
.error-icon { font-size: 1.25rem; }

/* Footer */
.form-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.footer-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 640px) {
  .footer-row {
    flex-direction: row;
    justify-content: space-between;
  }
}

.security-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(15, 23, 42, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(51, 65, 85, 0.5);
  font-size: 0.75rem;
  font-weight: 500;
  color: #94a3b8;
}
.text-accent { color: var(--color-secondary); font-size: 0.875rem; }

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.footer-links a {
  font-size: 0.75rem;
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: var(--color-primary);
}

.copyright {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.625rem;
  color: #475569;
  letter-spacing: 0.05em;
  font-weight: 500;
}

@media (min-width: 640px) {
  .copyright { text-align: left; }
}
</style>