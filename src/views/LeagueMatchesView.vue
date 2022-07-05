<template>
  <div id="league-calendar">
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
          name: "Лиги",
          path: "/leagues",
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
    name() {
      return this.$store.getters.getCompetitionName;
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
    changePeriod(period) {
      this.period = period;
      this.loadCompetitions();
    },
    loadCompetitions() {
      const search = { id: this.id };
      if (this.period && this.period.dateFrom && this.period.dateTo) {
        search.query = this.period;
      } else {
        delete search.query;
      }
      this.$store.dispatch("loadCompetitionsMatches", search);
    },
    loadCompetition() {
      this.$store.dispatch("loadCompetition", { id: this.id });
    },
  },
  created() {
    this.loadCompetition();
    this.loadCompetitions();
    if (this.parentPage > 1) {
      this.links[0].page = this.parentPage;
    }
  },
};
</script>
