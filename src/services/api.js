import http from './http'

const url = {
  COMPETITIONS: '/competitions',
  TEAMS: '/teams',
  COMPETITION: id => `/competitions/${id}`,
  TEAM: id => `/teams/${id}`,
  MATCHES: id => `/${id}/matches`
}

export default {
  getCompetitions (query) {
    return http.send(url.COMPETITIONS, query)
  },
  getCompetition (id, query) {
    return http.send(url.COMPETITION(id), query);
  },
  getTeams (query) {
    return http.send(url.TEAMS, query)
  },
  getTeam (id, query) {
    return http.send(url.TEAM(id), query)
  },
  getTeamMatches (id, query) {
    return http.send(`${url.TEAMS}${url.MATCHES(id)}`, query)
  },
  getCompetitionMatches (id, query) {
    return http.send(`${url.COMPETITIONS}${url.MATCHES(id)}`, query)
  }
}
