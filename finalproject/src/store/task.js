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
    },
    async newTask(task) {
      const { data, error } = await supabase.from('tasks').insert(task);
      if (error) throw error;
      if (data.length) {
        this.tasks.push(data[0]);
      }
    },
    getters: {
      tasksByDate() {
        return this.tasks.sort((a, b) => (a.inserted_at > b.inserted_at ? -1 : 1));
      },
    },
  },
});
