<template>
  <div id="app">
    <header><a href="/">YeetTask</a></header>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'app'
  });
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

header {
  padding: 8px;
}

header > a {
  text-decoration: none;
}
</style>
