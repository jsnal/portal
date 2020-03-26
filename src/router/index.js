import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'jasonlong',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  // {
  //   path: '/resume',
  //   name: 'resume',
  //   // component: () => import('../views/About.vue'),
  //   data: () => ({ pdf }),
  // },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('../views/Notes.vue'),
  },
  {
    path: '/notes/:category/**',
    name: 'notesdisplay',
    component: () => import('../views/NotesDisplay.vue'),
  },
  {
    path: '/projects/:project',
    name: 'projects',
    component: () => import('../views/Projects.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
