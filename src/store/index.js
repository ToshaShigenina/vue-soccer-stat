import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: process.env.VUE_APP_API_KEY,
    api: 'https://api.football-data.org/v2/',
    loadCompetitions: false,
    loadTeams: false,
    loadMatches: false,
    loadingError: false,
    pageSize: 12,
    count: 0,
    competitions: [],
    teams: [],
    matches: []
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
      return getters.getCompetitions(search).slice(start, end)
    },
    getTeamsPerPage: (state, getters) => (page, search) => {
      let start = 0
      let end = state.pageSize
      if (page !== 1) {
        start = ((page - 1) * state.pageSize)
        end += start
      }
      return getters.getTeams(search).slice(start, end)
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
    }
  },
  actions: {
    loadCompetitions ({ state, commit }) {
      state.loadingError = false
      state.loadCompetitions = false
      state.count = 0
      fetch(state.api + 'competitions', {
        method: 'GET',
        headers: {
          'X-Auth-Token': state.token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.errorCode) {
            throw new Error(data.message)
          } else {
            commit('setCompetitions', data.competitions)
            state.count = data.count
            state.loadCompetitions = true
          }
        })
        .catch(e => {
          console.error(e)
          commit('setCompetitions', [])
          state.loadingError = true
        })
    },
    loadTeams ({ state, commit }) {
      state.loadingError = false
      state.loadTeams = false
      state.count = 0
      fetch(state.api + 'teams', {
        method: 'GET',
        headers: {
          'X-Auth-Token': state.token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.errorCode) {
            throw new Error(data.message)
          } else {
            commit('setTeams', data.teams)
            state.count = data.count
            state.loadTeams = true
          }
        })
        .catch(e => {
          console.error(e)
          commit('setTeams', [])
          state.loadingError = true
        })
    },
    loadMatches ({ state, commit }, { id, path = 'competitions', filters = '' }) {
      state.loadingError = false
      state.loadMatches = false
      state.count = 0
      fetch(state.api + `${path}/${id}/matches${filters}`, {
        method: 'GET',
        headers: {
          'X-Auth-Token': state.token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.errorCode) {
            throw new Error(data.message)
          } else {
            commit('setMatches', data.matches)
            state.count = data.count
            state.loadMatches = true
          }
        })
        .catch(e => {
          commit('setMatches', [])
          state.loadingError = true
          console.error(e)
        })
    }
  }
})
