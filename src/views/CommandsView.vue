<template>
  <div id="commands">
    <base-content
      v-model="search"
      :data="data"
      :count="count"
      :error="error"
      :load="load"
      :search="search"
      name="command-matches"
    />
  </div>
</template>

<script>
import BaseContent from "../components/BaseMainPageContent.vue";

export default {
  components: {
    BaseContent,
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    title() {
      return `SoccerStat - ${this.$route.meta.title}`;
    },
    data() {
      return this.$store.getters.getTeamsFiltered(this.search, this.page);
    },
    count() {
      return this.$store.getters.getTeamsCount;
    },
    page() {
      return this.$store.getters.getPage;
    },
    error() {
      return this.$store.state.loadingError;
    },
    load() {
      return this.$store.state.teams.loadTeams;
    },
  },
  methods: {
    changeTitle() {
      document.title = this.title;
    },
  },
  created() {
    this.changeTitle();
    this.$store.state.loadingError = false;
    if (!this.data.length) {
      this.$store.dispatch("loadTeams");
    }
  },
};
</script>
