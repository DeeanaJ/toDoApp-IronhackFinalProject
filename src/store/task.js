// /store/task.js

import { defineStore } from 'pinia';
import supabase from '../supabase';

export default defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks.map((task) => ({
        ...task,
        inserted_at: new Date(task.inserted_at).toLocaleDateString(),
      }));
      return this.tasks.sort((a, b) => (a.inserted_at > b.inserted_at ? -1 : 1));
    },

    async newTask(taskTitle, userName) {
      const { error } = await supabase
        .from('tasks')
        .insert([{ title: taskTitle, user_id: userName }]);
      if (error) throw error;
    },

    async deleteTask(taskId) {
      try {
        const { data, error } = await supabase.from('tasks').delete().match({ id: taskId });
        if (error) throw error;
        if (data && data.length) {
          const toBeDeleted = this.tasks.findIndex((task) => task.id === taskId);
          this.tasks = this.tasks.splice(toBeDeleted, 1);
        } else {
          throw new Error('Task not found');
        }
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },

    async completeTask(taskId, status) {
      const { error } = await supabase
        .from('tasks')
        .update({ is_complete: status })
        .match({ id: taskId });
      if (error) throw error;
    },
    async editTask(taskTitle, taskId) {
      const { error } = await supabase
        .from('tasks')
        .update({ title: taskTitle })
        .match({ id: taskId });
      if (error) throw error;
    },
  },
});
