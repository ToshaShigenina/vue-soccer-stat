import api from '../services/api';

export default {
	state: () => ({
		teams: {
			count: 0,
			data: []
		},
		team: null,
		loadTeams: false,
		loadTeam: false,
	}),
	mutations: {
		setTeams (state, data) {
			state.teams.data = data.teams;
			state.teams.count = data.count;
		},
		setTeam (state, data) {
			state.team = data;
		},
	},
	actions: {
		processingTeams ({ state, commit, dispatch }, data) {
			dispatch('processingData', {
				data,
				processing (data) {
					commit('setTeams', data);
					state.loadTeams = true;
				}
			});
		},
		catchErrorTeams ({ commit, rootState }, e) {
			console.error(e);
			commit('setTeams', {
				teams: [],
				count: 0
			});
			rootState.loadingError = true;
		},
		loadTeams ({ state, dispatch, rootState }, query) {
			rootState.loadingError = false;
			state.loadTeams = false;
			api.getTeams(query)
				.then(data => dispatch('processingTeams', data))
				.catch(e => dispatch('catchErrorTeams', e));
		},
		processingTeam ({ state, commit, dispatch }, data) {
			dispatch('processingData', {
				data,
				processing (data) {
					commit('setTeam', data);
					state.loadTeam = true;
				}
			});
		},
		catchErrorTeam ({ commit, rootState }, e) {
			console.error(e);
			commit('setTeam', null);
			rootState.loadingError = true;
		},
		loadTeam ({ state, dispatch, rootState }, { id, query }) {
			rootState.loadingError = false;
			state.loadTeam = false;
			api.getTeam(id, query)
				.then(data => dispatch('processingTeam', data))
				.catch(e => dispatch('catchErrorTeam', e));
		},
	},
	getters: {
		getTeamsData (state) {
			return state.teams.data;
		},
		getTeamsCount (state) {
			return state.teams.count;
		},
		getTeam (state) {
			return state.team;
		},
		getTeamName (state) {
			if (
				state.team &&
				typeof state.team === 'object' &&
				Object.entries(state.team).length
			) {
				return state.team.name;
			}
			return '';
		},
		getTeamsFiltered: (state, getters) => (search, page) => {
			const filteredArr = state.teams.data
				.filter(item => {
					return item.name.toLowerCase()
						.includes(search.toLowerCase());
				});
			state.teams.count = filteredArr.length;
			return filteredArr.slice(
				getters.getPageSize * (page - 1),
				getters.getPageSize * page
			);
		},
	},
};