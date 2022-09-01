<template>
 <div class="app">
    <section class=""
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
const todos = ref([]);
const name = ref('');
const input_content = ref('');
const input_category = ref(null);

const todos_asc = computed(() => todos.value.sort((a,b) => {
  return b.createdAt - b.createdAt
}));

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
