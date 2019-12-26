import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';
import PouchDBLiveFind from 'pouchdb-live-find';
import PouchVue from 'pouch-vue';

import 'normalize.css';

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBLiveFind);

Vue.config.productionTip = false;

Vue.use(PouchVue, {
  pouch: PouchDB,
  defaultDB: 'tasks',
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
