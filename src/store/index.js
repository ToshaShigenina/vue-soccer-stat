import Vue from 'vue'
import Vuex from 'vuex'

import api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    competitions: {
      count: 0,
      data: []
    },
    teams: {
      count: 0,
      data: []
    },
    matches: {
      count: 0,
      data: []
    },
    loadCompetitions: false,
    loadTeams: false,
    loadMatches: false,
    loadingError: false,
    page: 1,
    pageSize: 12
  },
  getters: {
    getPage (state) {
      return state.page
    },
    getPageSize (state) {
      return state.pageSize
    },
    getCompetitionsData (state) {
      return state.competitions.data
    },
    getTeamsData (state) {
      return state.teams.data
    },
    getMatchesData (state) {
      return state.matches.data
    },
    getFilteredCompetitions: (state) => (search, page) => {
      const filteredArr = state.competitions.data
        .filter(item => {
          return (item.name.toLowerCase()
            .includes(search.toLowerCase()))
        })
      state.competitions.count = filteredArr.length
      return filteredArr.slice(state.pageSize * (page - 1), state.pageSize * page)
    },
    getFilteredTeams: (state) => (search, page) => {
      const filteredArr = state.teams.data
        .filter(item => {
          return (item.name.toLowerCase()
            .includes(search.toLowerCase()))
        })
      state.teams.count = filteredArr.length
      return filteredArr.slice(state.pageSize * (page - 1), state.pageSize * page)
    },
    getCompetitionsCount (state) {
      return state.competitions.count
    },
    getTeamsCount (state) {
      return state.teams.count
    },
    getMatchesCount (state) {
      return state.matches.count
    }
  },
  mutations: {
    setPage (state, page) {
      state.page = page
    },
    setCompetitions (state, data) {
      state.competitions.data = data.competitions
      state.competitions.count = data.count
    },
    setTeams (state, data) {
      state.teams.data = data.teams
      state.teams.count = data.count
    },
    setMatches (state, data) {
      state.matches.data = data.matches
      state.matches.count = data.count
    }
  },
  actions: {
    processingData (_, { data, processing }) {
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
          commit('setCompetitions', data)
          state.loadCompetitions = true
        }
      })
    },
    catchErrorCompetitions ({ state, commit }, e) {
      console.error(e)
      commit('setCompetitions', { competitions: [], count: 0 })
      state.loadingError = true
    },
    loadCompetitions ({ state, dispatch }, query) {
      state.loadingError = false
      state.loadCompetitions = false
      api.getCompetitions(query)
        .then(data => dispatch('processingCompetitions', data))
        .catch(e => dispatch('catchErrorCompetitions', e))
    },
    /* Teams */
    processingTeams ({ state, commit, dispatch }, data) {
      dispatch('processingData', {
        data,
        processing (data) {
          commit('setTeams', data)
          state.loadTeams = true
        }
      })
    },
    catchErrorTeams ({ state, commit }, e) {
      console.error(e)
      commit('setTeams', { teams: [], count: 0 })
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
          commit('setMatches', data)
          state.loadMatches = true
        }
      })
    },
    catchErrorMatches ({ state, commit }, e) {
      console.error(e)
      commit('setMatches', { matches: [], count: 0 })
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
