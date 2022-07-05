<template>
  <tr>
    <td>{{ date.day }}</td>
    <td>{{ date.time }}</td>
    <td>{{ status }}</td>
    <td class="right-align">{{ row.homeTeam.name }}</td>
    <td class="center-align hide-on-med-and-down">-</td>
    <td>{{ row.awayTeam.name }}</td>
    <td>
      <strong>
        <nobr>
          {{ row.score.fullTime.homeTeam | getScore }}
          :
          {{ row.score.fullTime.awayTeam | getScore }}
        </nobr>
      </strong>
      <nobr class="text-muted">
        ({{ row.score.extraTime.homeTeam | getScore }}
        :
        {{ row.score.extraTime.awayTeam | getScore }})
      </nobr>
      <nobr class="text-muted">
        ({{ row.score.penalties.homeTeam | getScore }}
        :
        {{ row.score.penalties.awayTeam | getScore }})
      </nobr>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      reuire: true,
    },
  },
  name: "base-table-row",
  filters: {
    getScore(score) {
      return score !== null ? score : "--";
    },
  },
  computed: {
    date() {
      const date = new Date(this.row.utcDate);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formatDate = new Intl.DateTimeFormat("ru-RU", options)
        .format(date)
        .split(", ");
      return {
        day: formatDate[0],
        time: formatDate[1],
      };
    },
    status() {
      switch (this.row.status) {
        case "SCHEDULED":
          return "Запланирован";
        case "LIVE":
          return "В прямом эфире";
        case "IN_PLAY":
          return "В игре";
        case "PAUSED":
          return "Пауза";
        case "FINISHED":
          return "Завершен";
        case "POSTPONED":
          return "Отложен";
        case "SUSPENDED":
          return "Приостановлен";
        case "CANCELED":
          return "Отменен";
        default:
          return this.row.status;
      }
    },
  },
};
</script>
