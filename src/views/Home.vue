<template>
  <div class="home">
    <loading :active="loading" />
    <ul class="todo-list">
      <li v-for="todo in todoItems">
        <i class="checkbox material-icons" @click="() => { todo.done = true; saveTask(todo); }">check_box_outline_blank</i>
        <editable-span v-focus v-model="todo.text" @input="() => saveTask(todo)" />
      </li>
      <li>
        <i class="checkbox material-icons">add</i>
        <span ref="taskInput" contenteditable="true" @input="({data}) => addBoxChanged(data)" @paste="addBoxPasted" />
      </li>
      <li v-for="todo in doneItems">
        <i class="checkbox material-icons" @click="() => { todo.done = false; saveTask(todo); }">check_box</i>
        <editable-span class="done" v-focus v-model="todo.text" @change="() => saveTask(todo)" />
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

import { Task, makeTask } from '@/task';
import { focus } from '@/directives/focus';
import Editable from '@/components/EditableSpan.vue';

export default Vue.extend({
  name: 'home',
  components: {
    Loading,
    Editable
  },
  directives: {
    focus
  },
  pouch: {
    tasks: {}
  },
  data: () => ({
    loading: false,
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
    addBoxChanged(text: string) {
      if (!text) return;
      this.saveTask(makeTask(text, false));
      (this.$refs.taskInput as HTMLElement).innerText = '';
    },
    addBoxPasted(event: ClipboardEvent) {
      event.preventDefault();
      const text = event.clipboardData?.getData('text');
      if (!text) return;
      this.addBoxChanged(text);
    },
    saveTask(task: Task) {
      this.$pouch.put(task, undefined, 'tasks');
    }
  }
});

interface HomeState {
  loading: boolean;
  tasks: Task[];
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
