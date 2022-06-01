import http from './http'

const url = {
  COMPETITIONS: '/competitions',
  TEAMS: '/teams',
  MATCHES: id => `/${id}/matches`
}

export default {
  getCompetitions (query) {
    return http.send(url.COMPETITIONS, query)
  },
  getTeams (query) {
    return http.send(url.TEAMS, query)
  },
  getTeamMatches (id, query) {
    return http.send(`${url.TEAMS}${url.MATCHES(id)}`, query)
  },
  getCompetitionMatches (id, query) {
    return http.send(`${url.COMPETITIONS}${url.MATCHES(id)}`, query)
  }
}
