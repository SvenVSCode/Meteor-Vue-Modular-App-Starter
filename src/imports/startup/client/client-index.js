import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import { VuexAltPlugin } from 'vuex-alt';
import VueMeteorTracker from 'vue-meteor-tracker';

import { createRouter as createRouterOriginal } from './../../modules/router/client/lib/router';
import { createStore as createStoreOriginal } from './../../modules/store/client/lib/store';
import App from './App.vue';

/**
 * Export the setup of Vue, and allow overriding of the store and
 * router factory functions. Mostly for unit tests.
 * @param {Object} params
 * @param {Function} [params.createStore]     optional, function that returns a configured Vuex store
 * @param {Function} [params.createRouter]           optional, function that returns a configured VueRouter appInstance
 */
export const setupVue = ({
  createStore = createStoreOriginal,
  createRouter = createRouterOriginal
 } = {}) => {
  Vue.use(VueRouter);
  Vue.use(Vuex);
  Vue.use(VueMeteorTracker);

  const store = createStore();
  const router = createRouter();

  Vue.use(VuexAltPlugin, { store });

  sync(store, router);

  return { store, router };
};

// client application startup
Meteor.startup(() => {
  const { store, router } = setupVue();
  const appInstance = new Vue({
    render: h => h(App),
    router,
    store
  });
  // mounting will cause error in tests from missing #app
  if (process.env.NODE_ENV !== 'test') {
    appInstance.$mount('#app');
  }
});
