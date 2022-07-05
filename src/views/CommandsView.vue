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
  created() {
    if (!this.data.length) {
      this.$store.dispatch("loadTeams");
    }
  },
};
</script>
