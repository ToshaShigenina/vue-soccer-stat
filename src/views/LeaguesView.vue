<template>
  <div id="leagues">
    <base-content
      v-model="search"
      :data="data"
      :count="count"
      :error="error"
      :load="load"
      :search="search"
    />
  </div>
</template>

<script>
import BaseContent from '../components/BaseMainPageContent.vue'

export default {
  components: {
    BaseContent
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    data () {
      return this.$store.getters.getFilteredCompetitions(this.search, this.page)
    },
    count () {
      return this.$store.getters.getCompetitionsCount
    },
    page () {
      return this.$store.getters.getPage
    },
    error () {
      return this.$store.state.loadingError
    },
    load () {
      return this.$store.state.loadCompetitions
    }
  },
  created () {
    if (!this.data.length) {
      this.$store.dispatch('loadCompetitions')
    }
  }
}
</script>
