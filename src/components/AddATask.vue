<template>
  <div class="nes-field is-inline addatask">
    <label for="taskinput">
      <input
        type="text"
        id="taskinput"
        name="taskinput"
        class="nes-input"
        placeholder="Task name"
        v-model="title"
      />
    </label>
    <button type="button" class="nes-btn is-primary" @click="addNewTask">
      + Create task
    </button>
    <button type="button" class="nes-btn" @click="fetchTasks">Refresh</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import userStore from '@/store/user';
import taskStore from '@/store/task';

export default {
  name: 'AddATask',
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'newTask']),
    addNewTask() {
      const info = {
        title: this.title,
        user_id: this.user.id,
      };
      this.newTask(info.title, info.user_id);
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
