<template>
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
import { ref, computed, onMounted } from 'vue';

const newTask = ref('');
const tasks = ref([]);
const hideCompleted = ref(false);

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? tasks.value.filter((task) => !task.checked)
    : tasks.value;
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
  background: linear-gradient(to right, maroon, silver);
  width: 100%;
  min-height: 100vh;
  padding: 10px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-app {
  width: 100%;
  max-width: 300px;
  background: white, red;
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
  flex: auto;
  border: none;
  outline: none;
  background: transparent;
  padding: 10px;
  font-size: 10px;
  font-weight: 400px;
  color:  black;
}

.row button {
  outline: none;
  padding: 10px 10px;
  background:  maroon;
  color: #fff;
  font-size: 10px;
  cursor: pointer;
}

.row button:hover {
  background:  maroon;
}

ul {
  padding: 0;
}

ul li {
  list-style: none;
  font-size: 16px;
  padding: 15px;
  border-radius: 5px;
  background-color:  maroon;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: background-color 0.3s ease;
}

ul li:hover {
  background-color: #f3f3f3;
}

ul li.checked {
  color: rgb(175, 175, 175);
  text-decoration: line-through;
}

ul li span {
  font-size: 18px;
  cursor: pointer;
}

ul li span:hover {
  background: #ff00ea44;
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
  background-color:  maroon;
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
  background-color: silver;
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
