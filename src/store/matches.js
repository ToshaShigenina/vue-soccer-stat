import api from '../services/api';

export default {
  state: () => ({
    matches: {
      count: 0,
      data: []
    },
    loadMatches: false,
  }),
  mutations: {
    setMatches (state, data) {
      state.matches.data = data.matches;
      state.matches.count = data.count;
    }
  },
  actions: {
    processingMatches ({ state, commit, dispatch }, data) {
      dispatch('processingData', {
        data,
        processing (data) {
          commit('setMatches', data);
          state.loadMatches = true;
        }
      });
    },
    catchErrorMatches ({ state, commit }, e) {
      console.error(e);
      commit('setMatches', { matches: [], count: 0 });
      state.loadingError = true;
    },
    async loadCompetitionsMatches ({ state, dispatch, rootState }, { id, query }) {
      state.loadingError = false;
      rootState.loadMatches = false;
      await api.getCompetitionMatches(id, query)
        .then(data => dispatch('processingMatches', data))
        .catch(e => dispatch('catchErrorMatches', e));
    },
    async loadTeamsMatches ({ state, dispatch, rootState }, { id, query }) {
      state.loadingError = false;
      rootState.loadMatches = false;
      await api.getTeamMatches(id, query)
        .then(data => dispatch('processingMatches', data))
        .catch(e => dispatch('catchErrorMatches', e));
    }
  },
  getters: {
    getMatchesData (state) {
      return state.matches.data;
    },
    getMatchesFiltered: (state, getters) => (page) => {
      return state.matches.data.slice(getters.getPageSize * (page - 1), getters.getPageSize * page);
    },
    getMatchesCount (state) {
      return state.matches.count;
    }
  },
};