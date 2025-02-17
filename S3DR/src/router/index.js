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
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
    },
    {
      path: '/impresiones',
      name: 'impresiones',
      component: () => import('../views/Impresiones.vue'),
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
