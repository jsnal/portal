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
  // {
  //   path: '/resume',
  //   name: 'resume',
  //   // component: () => import('../views/About.vue'),
  //   data: () => ({ pdf }),
  // },
  // {
  //   path: '/music',
  //   name: 'music',
  //   component: () => import('../views/Music.vue'),
  // },
  {
    path: '/notes',
    name: 'notesHome',
    component: () => import('../views/notes/NotesHome.vue'),
  },
  {
    path: '/notes/:note',
    name: 'note',
    component: () => import('../views/notes/Note.vue'),
    props: true,
  },
  {
    path: '/tags',
    name: 'tagsHome',
    component: () => import('../views/notes/TagsHome.vue'),
  },
  {
    path: '/tags/:tag',
    name: 'tag',
    component: () => import('../views/notes/Tag.vue'),
    props: true,
  },
  {
    path: '/projects',
    name: 'projectsHome',
    component: () => import('../views/projects/ProjectsHome.vue'),
  },
  {
    path: '/projects/:project',
    name: 'project',
    component: () => import('../views/projects/Project.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
