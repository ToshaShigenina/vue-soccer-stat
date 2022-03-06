<template>
  <table class="highlight responsive-table">
    <thead>
      <tr>
        <th>Дата</th>
        <th>Время</th>
        <th>Статус</th>
        <th class="center-align">Команда А</th>
        <th></th>
        <th class="center-align">Команда Б</th>
        <th>Счет</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ new Date(item.utcDate) | getDate }}</td>
        <td>{{ new Date(item.utcDate) | getTime }}</td>
        <td>{{ item.status | getStatus }}</td>
        <td class="right-align">{{ item.homeTeam.name }}</td>
        <td class="center-align">-</td>
        <td>{{ item.awayTeam.name }}</td>
        <td>
          <strong>{{ item.score.fullTime.homeTeam | getScore }}:{{ item.score.fullTime.awayTeam | getScore }}</strong> <span class="text-muted">({{ item.score.extraTime.homeTeam | getScore }}:{{ item.score.extraTime.awayTeam | getScore }})</span> <span class="text-muted">({{ item.score.penalties.homeTeam | getScore }}:{{ item.score.penalties.awayTeam | getScore }})</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      reuire: true
    }
  },
  name: 'table-component',
  filters: {
    getDate (utcDate) {
      return `${utcDate.getFullYear()}-${utcDate.getMonth() + 1}-${utcDate.getDate()}`
    },
    getTime (utcDate) {
      return `${utcDate.getHours()}:${utcDate.getMinutes()}`
    },
    getStatus (status) {
      switch (status) {
        case 'SCHEDULED':
          return 'Запланирован'
        case 'LIVE':
          return 'В прямом эфире'
        case 'IN_PLAY':
          return 'В игре'
        case 'PAUSED':
          return 'Пауза'
        case 'FINISHED':
          return 'Завершен'
        case 'POSTPONED':
          return 'Отложен'
        case 'SUSPENDED':
          return 'Приостановлен'
        case 'CANCELED':
          return 'Отменен'
        default:
          return status
      }
    },
    getScore (score) {
      return score !== null ? score : '--'
    }
  }
}
</script>
