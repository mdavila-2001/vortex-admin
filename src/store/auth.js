import { reactive } from 'vue'
import { db } from '../services/firebase'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'

/** Mapa de roles internos → etiquetas en español */
const ROLE_LABELS = {
    ADMIN: 'Administrador',
    SELLER: 'Vendedor',
    OWNER: 'Dueño',
    MANAGER: 'Gerente',
    SYSTEM_ADMIN: 'Administrador del Sistema'
}

function buildFullName({ first_name, middle_name, last_name, mother_last_name }) {
    return [first_name, middle_name, last_name, mother_last_name]
        .filter(Boolean)
        .join(' ')
}

export const useAuthStore = reactive({
    user: null,
    company: null,
    loading: false,

    async loadUserProfile(uid) {
        this.loading = true

        try {
            let userData = null
            let companyData = null
            let companyId = null

            const companiesSnap = await getDocs(collection(db, 'companies'))

            for (const companyDoc of companiesSnap.docs) {
                const userDocRef = doc(db, 'companies', companyDoc.id, 'users', uid)
                const userSnap = await getDoc(userDocRef)

                if (userSnap.exists()) {
                    userData = userSnap.data()
                    companyData = companyDoc.data()
                    companyId = companyDoc.id
                    break
                }
            }

            if (!userData) {
                const sysAdminSnap = await getDoc(doc(db, 'system_admins', uid))
                if (sysAdminSnap.exists()) {
                    userData = sysAdminSnap.data()
                }
            }

            if (!userData) {
                console.warn('No se encontró perfil para el UID:', uid)
                this.user = { name: 'Usuario', role: 'N/A', roleLabel: 'Sin Rol' }
                this.company = { name: 'Vortex ERP' }
                return
            }

            this.user = {
                uid,
                name: buildFullName(userData),
                email: userData.email || '',
                role: userData.role || '',
                roleLabel: ROLE_LABELS[userData.role] || userData.role || 'Sin Rol',
                imageUrl: userData.image_url || null,
                companyId: companyId || null,
                warehouseId: userData.warehouse_id || null,
                isSystemAdmin: !companyId
            }

            if (companyData) {
                this.company = {
                    id: companyId,
                    name: companyData.name || 'Vortex ERP',
                    imageUrl: companyData.image_url || null,
                    nit: companyData.nit || '',
                    plan: companyData.plan || '',
                    settings: companyData.settings || {}
                }
            } else {
                this.company = { name: 'Vortex ERP' }
            }

            console.log('Perfil cargado:', this.user.name, '|', this.user.roleLabel, '| Empresa:', this.company.name)
        } catch (error) {
            console.error('Error al cargar perfil de usuario:', error)
            this.user = { name: 'Usuario', role: 'N/A', roleLabel: 'Sin Rol' }
            this.company = { name: 'Vortex ERP' }
        } finally {
            this.loading = false
        }
    },

    clear() {
        this.user = null
        this.company = null
        this.loading = false
    }
})
