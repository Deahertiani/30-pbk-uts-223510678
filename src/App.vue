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
        <!-- Fitur Todos -->
        <h2>Todos</h2>
        <!-- Placeholder untuk implementasi fitur Todos -->
      </div>
      <div v-else-if="activeMenu === 'posts'">
        <!-- Fitur Postingan -->
        <h2>Postingan</h2>
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="selectedUser">
          <div v-for="post in filteredPosts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
        </div>
        <div v-else>
          <p>Silakan pilih pengguna untuk melihat postingan mereka.</p>
        </div>
      </div>
    </main>
  </div>

  <div class="background">
    <div class="container">
      <div class="todo-app">
        <h2>Daftar Kegiatan</h2>
        <div class="row">
          <input type="text" v-model="newTask" placeholder="Tulis Kegiatan">
          <button @click="addTask">Tambahkan Kegiatan</button>
        </div>
        <div class="filters">
          <button @click="hideCompleted = !hideCompleted" class="button-74">
            {{ hideCompleted ? 'Show' : 'Hide' }}
          </button>
        </div>
        <ul>
          <li v-for="(task, index) in filteredTodos" :key="task.id" :class="{ checked: task.checked }" @click="toggleTask(task)">
            <span>{{ task.text }}</span>
            <span @click.stop="removeTask(task)">&#xd7;</span>
            <span @click.stop="editTask(task)">✎</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted, watch } from 'vue';
const newTask = ref('');
const tasks = ref([]);
const hideCompleted = ref(false);
const muted = ref(false);
const volume = ref(1);
const filteredTodos = computed(() => {
  return hideCompleted.value
    ? tasks.value.filter((task) => !task.checked)
    : tasks.value;
});
const activeMenu = ref('todos');
const users = ref([]);
const posts = ref([]);
const selectedUser = ref(null);

const showTodos = () => {
  activeMenu.value = 'todos';
};

const showPosts = () => {
  activeMenu.value = 'posts';
};

onMounted(() => {
  // Ambil data user dari API
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      users.value = data;
    });

  // Ambil data postingan dari API
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      posts.value = data;
    });
});

const filteredPosts = computed(() => {
  // Filter postingan berdasarkan user yang dipilih
  return posts.value.filter(post => post.userId === parseInt(selectedUser.value));
});

function addTask() {
  if (newTask.value.trim() === '') {
    alert("Isi terlebih dahulu!");
  } else {
    tasks.value.unshift({ id: Date.now(), text: newTask.value, checked: false });
    newTask.value = '';
    saveData();
  }
}

function toggleTask(task) {
  task.checked = !task.checked; 
  saveData();
}

function removeTask(task) {
  const index = tasks.value.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
    saveData();
  }
}

function editTask(task) {
  const newText = prompt("Edit task:", task.text);
  if (newText !== null) {
    task.text = newText;
    saveData();
  }
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

function loadData() {
  const savedTasks = localStorage.getItem("tasks");
  tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
}
loadData();
</script>

<style scoped>
.background {
  background-image: linear-gradient(120deg, rgb(162, 0, 255), rgb(255, 0, 255), rgb(255, 0, 140));
}
.container {
  width: 100%;
  min-height: 100vh;
  padding: 10px;
  margin-top: -10px;
  margin-left: -10px;
  margin-bottom: -10px;
}
.todo-app {
  width: 100%;
  max-width: 300px;
  background: #ff6fff;
  margin: 20px auto 30px;
  padding: 10px 30px 70px;
}
.todo-app h2 {
  text-align: left;
  color: #ffffff;
  margin-bottom: 20px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffffe7;
  padding-left: 10px;
  border-radius: 10px;
}
input {
  flex: auto; /* Ubah flex: 1 menjadi flex: auto */
  border: none;
  outline: none;
  background: transparent;
  padding: 10px;
  font-size: 10px;
  font-weight: 400px;
  color: #000000;
}
.row button {
  outline: none;
  padding: 10px 10px;
  background: #ff00b3;
  color: #fff;
  font-size: 10px;
  cursor: pointer;
}
.row button:hover {
  background: #ff5ec9;
}
ul {
  padding: 0;
}

ul li {
  list-style: none;
  font-size: 16px; /* Increased font size for better readability */
  padding: 15px;
  border-radius: 5px;
  background-color: #0b0b0b; /* Added background color for contrast */
  margin-bottom: 5px; /* Added margin bottom for spacing between items */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: background-color 0.3s ease; /* Smooth transition on hover */
  
}

ul li:hover {
  background-color: #f3f3f3; /* Lighter background on hover */
}

ul li.checked {
  color: rgb(175, 175, 175);
  text-decoration: line-through;
}

ul li span {
  font-size: 18px; /* Increased font size for better visibility */
  cursor: pointer;
}

ul li span:hover {
  background: #ff00ea44;
}

.filters {
  display: flex;
  justify-content: right;
  padding-top: 2vh;
}
.filters button {
  width: 1000px;
}
.button-74 {
  background-color: #ff00b3;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-weight: 200;
  font-size: 14px;
  padding: 0 14px;
  line-height: 25px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button-74:hover {
  background-color: #ff5ec9;
}
.button-74:active {
  transform: translate(2px, 2px);
}
@media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
}
</style>
