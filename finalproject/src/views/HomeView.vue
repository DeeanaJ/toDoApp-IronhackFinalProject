<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import taskStore from '@/store/task';

export default {
  name: 'HomeView',
  computed: {
    ...mapState(taskStore, ['task']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'newTask']),
  },
  created() {
    this.fetchTasks();
    // new task
  },
};
</script>
