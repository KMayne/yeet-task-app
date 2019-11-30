<template>
  <div class="home">
    <header>YeetTask</header>
    <loading :active="loading" />
    <ul class="todo-list">
      <li v-for="item in todoItems">
        <i class="checkbox material-icons" @click="() => item.done = true">check_box_outline_blank</i>
        <span v-focus contenteditable="true">{{item.text}}</span>
      </li>
      <li>
        <i class="checkbox material-icons">add</i>
        <span ref="taskInput" contenteditable="true" @input="({data}) => addBoxChanged(data)"
              @paste="addBoxPasted" />
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
import { focus } from '@/directives/focus';

export default Vue.extend({
  name: 'home',
  components: {
    Loading
  },
  directives: {
    focus
  },
  data: () => ({
    loading: true,
    tasks: []
  } as HomeState),
  computed: {
    todoItems(): Task[] {
      return this.tasks.filter(i => !i.done);
    },
    doneItems(): Task[] {
      return this.tasks.filter(i => i.done);
    },
    maxId(): number {
      return this.tasks.reduce((max, t) => Math.max(t.id, max), 0);
    }
  },
  methods: {
    addBoxChanged(text: string) {
      if (!text) return;
      this.tasks.push({id: this.maxId + 1, text, done: false});
      (this.$refs.taskInput as HTMLElement).innerText = '';
    },
    addBoxPasted(event: ClipboardEvent) {
      event.preventDefault();
      const text = event.clipboardData?.getData('text');
      if (!text) return;
      this.addBoxChanged(text);
    }
  },
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
