// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Todos from '../components/Todos.vue';
import Posts from '../components/Posts.vue';
import MemoriView from '../components/MemoriView.vue'
import MemoriesRinciView from '../components/MemoriesRinciView.vue' 

const routes = [
  {
    path: '/',
    name: '/home',
    component: Home,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/albums',
    name: 'albums',
    component: MemoriView
  },
  {
    path: '/albums/:albumId', // Tambahkan rute dengan parameter dinamis
    name: 'album-detail',
    component: MemoriesRinciView
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
