<template>
<div class="nes-table-responsive">
  <table id="tasklist" class="nes-table is-bordered is-centered">
    <tr>
      <th v-for="column in tableCols" :key="column.key">{{ column.title }}</th>
    </tr>

    <tr v-for="task in tasks" :key="task.id">
      <td>{{ task.title }}</td>
      <td>{{ task.inserted_at }}</td>
      <td>{{ task.is_complete ? task.is_complete : 'In progress' }} </td>
        <td>
        <div class="task-operations">
          <button v-for="action in actions" :key="action.id"
            @click="action.taskOperation(task.id)">
            {{ action.icon }}
          </button>
        </div>
      </td>
    </tr>
  </table>
  </div>
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
          title: 'Complete',
          icon: '✔️',
          taskOperation: this.handleComplete,
        },
        {
          id: 1,
          title: 'Delete',
          icon: '❌',
          taskOperation: this.handleDelete,
        },
      ],
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks', 'tasksByDate']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'newTask', 'deleteTask']),

    handleDelete(taskId) {
      try {
        this.deleteTask(taskId);
      } catch (error) {
        console.error(error.message);
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
