<template>
  <div class="home">
    <loading :active="loading" />
    <ul class="todo-list">
      <li v-for="todo in todoItems">
        <i class="checkbox material-icons" @click="() => toggleDone(todo)">check_box_outline_blank</i>
        <input v-focus v-model="todo.text" @input="() => taskChanged(todo)" />
      </li>
      <li>
        <i class="checkbox material-icons">add</i>
        <input v-model="newText" @input="addBoxChanged" />
      </li>
      <li v-for="todo in doneItems">
        <i class="checkbox material-icons" @click="() => toggleDone(todo)">check_box</i>
        <input class="done" v-model="todo.text" @input="() => taskChanged(todo)" />
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
import debounce from 'lodash/debounce';

import { Task, makeTask } from '@/task';
import { focus } from '@/directives/focus';

export default Vue.extend({
  name: 'home',
  components: {
    Loading
  },
  directives: {
    focus
  },
  pouch: {
    tasks: {}
  },
  data: () => ({
    loading: false,
    newText: ''
  } as HomeState),
  computed: {
    todoItems(): Task[] {
      return this.tasks?.filter(i => !i.done) || [];
    },
    doneItems(): Task[] {
      return this.tasks?.filter(i => i.done) || [];
    },
  },
  methods: {
    addBoxChanged() {
      if (this.newText === '') return;
      this.$pouch.put(makeTask(this.newText, false), undefined, 'tasks');
      this.newText = '';
    },
    toggleDone(task: Task) {
        task.done = !task.done;
        this.taskChanged(task);
    },
    taskChanged(task: Task) {
      debounce(() => this.$pouch.put(task, undefined, 'tasks'), 500);
    }
  }
});

interface HomeState {
  loading: boolean;
  tasks: Task[];
  newText: string;
}
</script>

<style>
.home {
  flex: 1;
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

.todo-list > li > input {
  display: inline-block;
  flex: auto;
  border: none;
}

.todo-list .done {
  text-decoration: line-through;
}

.checkbox {
  vertical-align: text-bottom;
}
</style>
