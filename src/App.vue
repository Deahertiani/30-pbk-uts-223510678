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
            {{ task.text }}
            <span @click.stop="removeTask(task)">&#xd7;</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
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
  .background{
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
  .todo-app h2{
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
    flex: 1;
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

  .row button:hover{
    background: #ff5ec9;
  }
  
  ul li {
    list-style: none;
    font-size: 19px;
    padding: 10px 8px 2px 30px;
    user-select: none;
    cursor: pointer;
    position: relative;
    color: #300128;
  }
  
  ul li::before {
    content: '';
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 10%;
    background-image: url(./assets/unchecked.png);
    background-size: cover;
    background-position: center;
    top: 18px;
    left: 5px;
  }
  
  ul li.checked {
    color: rgb(175, 175, 175);
    text-decoration: line-through;
  }
  
  ul li.checked::before {
    background-image: url(assets/checked.png);
  }
  
  ul li span {
    position: absolute;
    right: 0;
    top: 18px;
    width: 15px;
    height: 15px;
    font-size: 22px;
    color: #ff00c8;
    line-height: 15px;
    text-align: center;
  }
  
  ul li span:hover {
    background: #ff00ea44;
  }
  
  .filters{
  display: flex;
  justify-content: right;
  padding-top: 2vh;
    
  }
  
  .filters button{
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