<template>
  <div id="commands">
    <!-- <main-component path="teams" home="commands"/> -->
  </div>
</template>

<script>
// import mainComponent from '../components/MainComponent.vue'

export default {
  components: {
    // 'main-component': mainComponent
  },
  created () {
    // this.$store.dispatch('loadCompetitions')
    this.$store.dispatch('loadTeams')
  }
}
</script>
