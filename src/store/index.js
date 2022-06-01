import Vue from 'vue'
import Vuex from 'vuex'

import api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    competitions: [],
    teams: [],
    matches: [],
    loadCompetitions: false,
    loadTeams: false,
    loadMatches: false,
    loadingError: false,
    pageSize: 12,
    count: 0
  },
  getters: {
    getCompetitions: state => search => {
      const searchStr = search.trim().toLowerCase()
      if (searchStr) {
        return state.competitions.filter(item => item.name.toLowerCase().includes(searchStr) || item.area.name.toLowerCase().includes(searchStr))
      }
      return state.competitions
    },
    getTeams: state => search => {
      const searchStr = search.trim().toLowerCase()
      if (searchStr) {
        return state.teams.filter(item => item.name.toLowerCase().includes(searchStr))
      }
      return state.teams
    },
    getCompetitionsPerPage: (state, getters) => (page, search) => {
      let start = 0
      let end = state.pageSize
      if (page !== 1) {
        start = ((page - 1) * state.pageSize)
        end += start
      }
      const result = getters.getCompetitions(search)
      state.count = result.length
      return result.slice(start, end)
    },
    getTeamsPerPage: (state, getters) => (page, search) => {
      let start = 0
      let end = state.pageSize
      if (page !== 1) {
        start = ((page - 1) * state.pageSize)
        end += start
      }
      const result = getters.getTeams(search)
      state.count = result.length
      return result.slice(start, end)
    },
    getMatchesPerPage: state => page => {
      let start = 0
      let end = state.pageSize
      if (page !== 1) {
        start = ((page - 1) * state.pageSize)
        end += start
      }
      return state.matches.slice(start, end)
    },
    getPages (state) {
      return Math.ceil(state.count / state.pageSize)
    },
    getCount (state) {
      return state.count
    }
  },
  mutations: {
    setCompetitions (state, data) {
      state.competitions = data
    },
    setTeams (state, data) {
      state.teams = data
    },
    setMatches (state, data) {
      state.matches = data
    },
    setCount (state, count) {
      state.count = count
    }
  },
  actions: {
    processingData (_, { data, processing }) {
      console.log(data)
      if (data.errorCode) {
        throw new Error(data.message)
      } else {
        processing(data)
      }
    },
    /* Competitions */
    processingCompetitions ({ state, commit, dispatch }, data) {
      dispatch('processingData', {
        data,
        processing (data) {
          commit('setCompetitions', data.competitions)
          state.loadCompetitions = true
        }
      })
    },
    catchErrorComprtitions ({ state, commit }, e) {
      console.error(e)
      commit('setCompetitions', [])
      state.loadingError = true
    },
    loadCompetitions ({ state, dispatch }, query) {
      state.loadingError = false
      state.loadCompetitions = false
      api.getCompetitions(query)
        .then(data => dispatch('processingCompetitions', data))
        .catch(e => dispatch('catchErrorComprtitions', e))
    },
    /* Teams */
    processingTeams ({ state, commit, dispatch }, data) {
      dispatch('processingData', {
        data,
        processing (data) {
          commit('setTeams', data.teams)
          state.loadTeams = true
        }
      })
    },
    catchErrorTeams ({ state, commit }, e) {
      console.error(e)
      commit('setTeams', [])
      state.loadingError = true
    },
    loadTeams ({ state, dispatch }, query) {
      state.loadingError = false
      state.loadTeams = false
      api.getTeams(query)
        .then(data => dispatch('processingTeams', data))
        .catch(e => dispatch('catchErrorTeams', e))
    },
    /* Matches */
    processingMatches ({ state, commit, dispatch }, data) {
      dispatch('processingData', {
        data,
        processing (data) {
          commit('setMatches', data.matches)
          state.loadMatches = true
        }
      })
    },
    catchErrorMatches ({ state, commit }, e) {
      console.error(e)
      commit('setMatches', [])
      state.loadingError = true
    },
    loadCompetitionsMatches ({ state, dispatch }, { id, query }) {
      state.loadingError = false
      state.loadMatches = false
      api.getCompetitionMatches(id, query)
        .then(data => dispatch('processingMatches', data))
        .catch(e => dispatch('catchErrorMatches', e))
    },
    loadTeamsMatches ({ state, dispatch }, { id, query }) {
      state.loadingError = false
      state.loadMatches = false
      api.getTeamMatches(id, query)
        .then(data => dispatch('processingMatches', data))
        .catch(e => dispatch('catchErrorMatches', e))
    }
  }
})
