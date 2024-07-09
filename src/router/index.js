import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CriteriosGeneralesView from '../views/CriteriosGeneralesView.vue'
import SubvencionesView from '../views/SubvencionesView.vue'
import SubvencionesDataView from '../views/SubvencionesDataView.vue'
import EmpresasView from '../views/EmpresasView.vue'
import EmpresasDataView from '../views/EmpresasDataView.vue'
import ProjectDataView from '../views/ProjectDataView.vue'

import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cgen',
      name: 'cgen',
      component: CriteriosGeneralesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/sview',
      name: 'sview',
      component: SubvencionesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/sdata',
      name: 'sdata',
      component: SubvencionesDataView,
      meta: { requiresAuth: true }
    },
    {
      path: '/eview',
      name: 'eview',
      component: EmpresasView,
      meta: { requiresAuth: true }
    },
    {
      path: '/edata',
      name: 'edata',
      component: EmpresasDataView,
      meta: { requiresAuth: true }
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView
    },
    {
      path: '/pdata',
      name: 'pdata',
      component: ProjectDataView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Esta ruta requiere autenticación
    if (!isAuthenticated()) {
      // Si no está autenticado, redirige a la página de login
      next('/login')
    } else {
      next() // Si está autenticado, permite la navegación
    }
  } else {
    next() // Asegúrate de llamar siempre a next()!
  }
})

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  const token = localStorage.getItem('evalia_token') // o donde sea que almacenes el token
  return !!token // Retorna true si el token existe, false si no
}

export default router
