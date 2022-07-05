import Vue from 'vue';
import Vuex from 'vuex';

import competitions from './competitions';
import teams from './teams';
import matches from './matches';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    competitions,
    teams,
    matches
  },
  state: {
    loadingError: false,
    page: 1,
    pageSize: 12
  },
  getters: {
    getPage (state) {
      return state.page;
    },
    getPageSize (state) {
      return state.pageSize;
    },
  },
  mutations: {
    setPage (state, page) {
      state.page = page;
    },
  },
  actions: {
    processingData (_, { data, processing }) {
      if (data.errorCode) {
        throw new Error(data.message);
      } else {
        processing(data);
      }
    },
  }
});
