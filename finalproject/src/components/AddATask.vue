<template>
  <div class="addatask">
    <button class="primary" @click="addNewTask">Add Task</button>
    <button class="primary" @click="fetchTasks">Refresh</button>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import taskStore from '@/store/task';

export default {
  name: 'AddATask',
  methods: {
    ...mapActions(taskStore, ['fetchTasks']),
    addNewTask() {
      this.$router.push({ path: '/task' });
    },
  },
};
</script>
