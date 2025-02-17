import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../views/Contact.vue'),
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/Productos.vue'),
    },
    {
      path: '/personalizar',
      name: 'personalizar',
      component: () => import('../views/Personalizar.vue'),
    },
    {
      path: '/precio',
      name: 'precio',
      component: () => import('../views/Precio.vue'),
    },
  ],
});

export default router;
