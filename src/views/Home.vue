<template>
  <div class="home">
    <loading :active="loading" />
    <ul class="todo-list">
      <li v-for="item in todoItems">
        <i class="checkbox material-icons" @click="() => item.done = true">check_box_outline_blank</i>
        <span contenteditable="true">{{item.text}}</span>
      </li>
      <li>
        <i class="checkbox material-icons">add</i>
        <span contenteditable="true"/>
      </li>
      <li v-for="item in doneItems">
        <i class="checkbox material-icons" @click="() => item.done = false">check_box</i>
        <span class="done" contenteditable="true">{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import { Task } from '@/task';

export default Vue.extend({
  name: 'home',
  components: {
    Loading
  },
  data: () => ({
    loading: true,
    tasks: []
  } as HomeState),
  computed: {
    todoItems() {
      return this.tasks.filter(i => !i.done);
    },
    doneItems() {
      return this.tasks.filter(i => i.done);
    }
  },
  methods: {},
  mounted(): void {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(tasks => {
        this.tasks = tasks;
        this.loading = false;
      });
  }
});

interface HomeState {
  loading: boolean;
  tasks: Task[];
}
</script>

<style>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 8px;
}

.todo-list {
  border: 1px solid black;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  padding: 0;
  text-align: left;
}

.todo-list > li {
  padding: 4px;
  display: flex;
  align-items: center;
}

.todo-list > li > i {
  flex: none;
}

.todo-list > li > span {
  display: inline-block;
  flex: auto;
}

.todo-list span.done {
  text-decoration: line-through;
}

.checkbox {
  vertical-align: text-bottom;
}
</style>
