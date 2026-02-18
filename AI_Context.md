# 🧠 AI CONTEXT: SaaS CIV (Project Antigravity)

## 1. Identidad del Proyecto
- **Nombre:** SaaS CIV Empresarial.
- **Contexto:** Bolivia 2026 (Gobierno Rodrigo Paz, auge de créditos y formalización).
- **Objetivo:** ERP MVP para Pymes (Gestión Operativa).
- **Alcance MVP:** Inventarios (PEPS), Ventas (POS), Tesorería (Caja) y Contabilidad Gerencial.
- **Exclusiones:** Sin Facturación SIAT en fase 1.

## 2. Tech Stack (Estricto - Sin Excepciones)
- **Frontend:** Vue 3 (Composition API `<script setup>`) + Vite.
- **Package Manager:** **YARN** (Strict Mode). `npm` y `pnpm` prohibidos.
- **Styling:** **100% CSS PURO**.
  - Arquitectura: `variables.css` (Tokens) + `global.css` (Base) + `<style scoped>` (Componentes).
  - Frameworks CSS: ❌ Prohibido Tailwind para componentes lógicos.
- **Backend:** Firebase (Firestore + Auth).
- **Gráficos:** ApexCharts (`vue3-apexcharts`).
- **Imágenes:** Cloudinary (Unsigned Uploads).

## 3. Arquitectura de Datos (Firestore Schema)
### Nivel Sistema
- `system_admins`: Superusuarios del SaaS (Tú).

### Nivel Tenant (`companies/{companyId}`)
- `users`: Roles (`ADMIN`, `SELLER`).
- `warehouses`: Sucursales físicas.
- `products`: Catálogo público (Nombre, Precio Venta, Stock Visible).
- `inventory_costs`: **[SEGURIDAD]** Colección separada. Solo Admins leen `unit_cost` y `supplier_price`.
- `inventory_layers`: Capas PEPS (Lote, Fecha Ingreso, Costo).
- `sales`: Cabecera de venta (Cliente, Totales).
- `cash_accounts`: Cajas y Bancos.
- `cash_movements`: Arqueos y flujo de dinero.

## 4. Matriz de Roles & Seguridad
- **ADMIN (Dueño):**
  - Acceso Total: Costos, Utilidades, Reportes, Configuración.
  - Sidebar: Dashboard, Ventas, Inventario, Tesorería, Reportes, Ajustes.
- **SELLER (Vendedor/Cajero):**
  - Acceso Limitado: Solo Vender y Cerrar *su* Caja.
  - **Ceguera de Datos:** NO puede leer `inventory_costs` ni `inventory_layers`.
  - Sidebar: POS (Punto de Venta), Mis Ventas, Mi Caja.

## 5. Sistema de Diseño (Glassmorphism)
- **Tokens (`variables.css`):**
  - `--color-brand-blue`: `#0047AB` (Identidad/Admin).
  - `--color-brand-mint`: `#98FF98` (Acción/Éxito).
  - `--glass-bg`: `rgba(255, 255, 255, 0.6)`.
  - `--glass-blur`: `blur(12px)`.
- **Regla de UX:** Interfaz limpia. Textos oscuros (`#1F2937`) sobre vidrio para legibilidad.

## 6. Reglas de Desarrollo
1. **Separación de Poderes:** El Frontend debe validar `user.role` para mostrar/ocultar menús.
2. **Pureza:** CSS siempre Scoped. Variables siempre desde `:root`.
3. **Optimización:** Imágenes siempre vía Cloudinary con parámetros de tamaño.