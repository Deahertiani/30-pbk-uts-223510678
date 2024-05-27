<template>
  <div id="app">
    <!-- Header -->
    <header>
      <nav>
        <ul>
          <li @click="showTodos">Todos</li>
          <li @click="showPosts">Posts</li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <div v-if="activeMenu === 'todos'">
        <Todos />
      </div>
      <div v-else-if="activeMenu === 'posts'">
        <Posts />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

const activeMenu = ref('todos');

const showTodos = () => {
  activeMenu.value = 'todos';
};

const showPosts = () => {
  activeMenu.value = 'posts';
};
</script>

<style scoped>
/* Your CSS for App component */
</style>
