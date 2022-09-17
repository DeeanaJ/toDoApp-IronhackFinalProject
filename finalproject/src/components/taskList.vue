<template>
  <table>
    <tr>
      <th v-for="column in tableCols" :key="column.key">{{ column.title }}</th>
    </tr>

    <tr v-for="task in tasks" :key="task.id">
      <td>{{ task.title }}</td>
      <td>{{ task.inserted_at }}</td>
    </tr>
  </table>
</template>

<script>

import { mapState, mapActions } from 'pinia';
import taskStore from '../store/task';
import userStore from '../store/user';

export default {
  name: 'TaskList',
  data() {
    return {
      tableCols: [
        {
          title: 'Title',
          key: 'title',
        },
        {
          title: 'Date',
          key: 'date',
        },
        {
          title: 'Status',
          key: 'status',
        },
        {
          title: 'Action',
          key: 'action',
        },
      ],
      actions: [
        {
          id: 0,
          title: 'Edit',
          icon: '🖌️',
          handleFunction: this.handleEdit,
        },
        {
          id: 1,
          title: 'Delete',
          icon: '💣',
          handleFunction: this.handleDelete,
        },
      ],
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks', 'tasksByDate']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'newTask']),

    async handleDelete(taskId) {
      const result = await this.removeTask(taskId);
      if (result) {
        console.log('Task removed');
      } else {
        console.log('Task not removed');
      }
    },
    handleAddNewTask() {
      this.newTask({
        title: 'New task',
        user_id: this.user.id,
      });
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
