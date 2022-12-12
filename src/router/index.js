import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import("../views/Resume.vue"),
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
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes,
});
