<template>
  <div id="app">
    <!-- Header -->
    <header>
      <nav>
        <ul>
          
          <li><router-link to="/">Dea Hertiani</router-link></li>
          <li><router-link to="/todos">Todos</router-link></li>
          <li><router-link to="/posts">Posts</router-link></li>
          <li><router-link to="/albums">Albums</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  color: #333;
}

/* App Container */
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header Styles */
header {
  background-color: #e32e52;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header nav ul {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
}

header nav ul li {
  margin: 0 15px;
}

header nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s;
}

header nav ul li a:hover {
  color: #660000;
}
</style>

