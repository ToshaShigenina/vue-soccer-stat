<template>
  <div id="command-calendar">
    <base-matches-content
      :links="links"
      @change-period="changePeriod"
    />
  </div>
</template>

<script>
import BaseMatchesContent from "../components/BaseMatchesContent.vue";

export default {
  components: {
    BaseMatchesContent,
  },
  props: {
    id: {
      type: [String, Number],
      require: true,
    },
    parentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      links: [
        {
          name: "Команды",
          path: "/commands",
          page: 1,
        },
      ],
      period: {
        dateFrom: "",
        dateTo: "",
      },
    };
  },
  computed: {
    title() {
      return `SoccerStat - ${this.$route.meta.title} - ${this.name}`;
    },
    name() {
      return this.$store.getters.getTeamName;
    },
  },
  watch: {
    name(name, oldName) {
      if (name && name !== oldName) {
        this.links.push({ name });
      }
    }
  },
  methods: {
    changeTitle() {
      document.title = this.title;
    },
    changePeriod(period) {
      this.period = period;
      this.loadTeams();
    },
    loadTeams() {
      const search = { id: this.id };
      if (this.period && this.period.dateFrom && this.period.dateTo) {
        search.query = this.period;
      } else {
        delete search.query;
      }
      this.$store.dispatch("loadTeamsMatches", search);
    },
    loadTeam() {
      this.$store.dispatch("loadTeam", { id: this.id });
    },
  },
  created() {
    this.changeTitle();
    this.$store.state.loadingError = false;
    this.loadTeam();
    this.loadTeams();
    if (this.parentPage > 1) {
      this.links[0].page = this.parentPage;
    }
  },
};
</script>
