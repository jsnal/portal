import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue'),
  },
  {
    path: '/projects/:project',
    name: 'Project',
    component: () => import('../views/Project.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('../views/PageNotFound.vue'),
  }
];

export default createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
});
