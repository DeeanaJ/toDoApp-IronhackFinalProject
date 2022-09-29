<template>
  <div class="nes-table-responsive">
    <table id="tasklist" class="nes-table is-bordered is-centered">
      <tr>
        <th v-for="column in tableCols" :key="column.key">
          {{ column.title }}
        </th>
      </tr>

      <tr v-for="task in tasks" :key="task.id">
        <td :class="task.is_complete ? 'complete' : 'is-primary'">
          <span v-if="task.is_complete">**</span>
          {{ task.title }}
          <span v-if="task.is_complete">**</span>
        </td>
        <td>{{ task.inserted_at }}</td>
        <td>{{ task.is_complete ? "Done!" : "In progress" }}</td>
        <td>
                    <button
            class="nes-btn is-disabled"
            type="button"
            @click="handleEditTask(task.id)"
          >
            ✏️
          </button>
          <button
            class="nes-btn is-success"
            type="button"
            @click="handleComplete(task.is_complete, task.id)"
          >
            ✔️
          </button>
          <button
            class="nes-btn is-error"
            type="button"
            @click="handleDelete(task.id)"
          >
            ❌
          </button>
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
          title: 'Modify',
          key: 'action',
        },
      ],
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks', 'tasksByDate']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, [
      'fetchTasks',
      'newTask',
      'deleteTask',
      'completeTask',
      'editTask',
    ]),

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
    handleComplete(status, taskId) {
      try {
        this.completeTask(taskId, !status);
        const findTasks = this.tasks.find((element) => element.id === taskId);
        findTasks.is_complete = !status;
      } catch (error) {
        console.error('Error: ', error.message);
      }
    },
    handleEditTask(taskTitle, taskId) {
      this.editTask(taskTitle, taskId);
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
