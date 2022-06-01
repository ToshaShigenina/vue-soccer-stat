<template>
  <div id="commands">
    <main-component path="competitions" home="leagues" :data="competitions"/>
  </div>
</template>

<script>
import MainComponent from '../components/MainComponent.vue'

export default {
  components: {
    MainComponent
  },
  computed: {
    competitions () {
      return this.$store.getters.getCompetitions('')
    }
  },
  created () {
    this.$store.dispatch('loadCompetitions')
  }
}
</script>
