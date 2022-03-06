<template>
  <div id="calendar">
    <matches-component :id="id" path="competitions" :home="home"/>
  </div>
</template>

<script>
import matchesComponent from '../components/MatchesComponent.vue'

export default {
  components: {
    'matches-component': matchesComponent
  },
  props: ['id'],
  data () {
    return {
      home: {
        name: 'Лиги',
        url: '/leagues'
      }
    }
  }
}
</script>
