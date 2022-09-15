<template>
  <div class="home">
    <h1>Home</h1>

    <TaskList/>
    <AddATask/>
  </div>
</template>

<script>
import TaskList from '../components/TaskList.vue';
import AddATask from '../components/AddATask.vue';

export default {
  name: 'HomeView',
  components: { TaskList, AddATask },
};
</script>
