import api from '../services/api';

export default {
    state: () => ({
        competitions: {
            count: 0,
            data: []
        },
        competition: null,
        loadCompetitions: false,
        loadCompetition: false,
    }),
    mutations: {
        setCompetitions (state, data) {
            state.competitions.data = data.competitions;
            state.competitions.count = data.count;
        },
        setCompetition (state, data) {
            state.competition = data;
        },
    },
    actions: {
        processingCompetitions ({ state, commit, dispatch }, data) {
            dispatch('processingData', {
                data,
                processing (data) {
                    commit('setCompetitions', data);
                    state.loadCompetitions = true;
                }
            });
        },
        catchErrorCompetitions ({ commit, rootState }, e) {
            console.error(e);
            commit('setCompetitions', {
                competitions: [],
                count: 0
            });
            rootState.loadingError = true;
        },
        loadCompetitions ({ state, dispatch, rootState }, query) {
            rootState.loadingError = false;
            state.loadCompetitions = false;
            api.getCompetitions(query)
                .then(data => dispatch('processingCompetitions', data))
                .catch(e => dispatch('catchErrorCompetitions', e));
        },
        processingCompetition ({ state, commit, dispatch }, data) {
            dispatch('processingData', {
                data,
                processing (data) {
                    commit('setCompetition', data);
                    state.loadCompetition = true;
                }
            });
        },
        catchErrorCompetition ({ commit, rootState }, e) {
            console.error(e);
            commit('setCompetition', null);
            rootState.loadingError = true;
        },
        loadCompetition ({ state, dispatch, rootState }, { id, query }) {
            rootState.loadingError = false;
            state.loadCompetition = false;
            api.getCompetition(id, query)
                .then(data => dispatch('processingCompetition', data))
                .catch(e => dispatch('catchErrorCompetition', e));
        },
    },
    getters: {
        getCompetitionsData (state) {
            return state.competitions.data;
        },
        getCompetitionsCount (state) {
            return state.competitions.count;
        },
        getCompetitionName (state) {
            if (
                state.competition &&
                typeof state.competition === 'object' &&
                Object.entries(state.competition).length
            ) {
                return state.competition.shortName;
            }
            return '';
        },
        getCompetitionsFiltered: (state, getters) => (search, page) => {
            const filteredArr = state.competitions.data
                .filter(item => {
                    return item.name.toLowerCase()
                        .includes(search.toLowerCase());
                });
            state.competitions.count = filteredArr.length;
            return filteredArr.slice(
                getters.getPageSize * (page - 1),
                getters.getPageSize * page
            );
        },

    },
};