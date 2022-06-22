<template>
  <div id="calendar">
    <base-breadcrumb :links="links" />
    <h1>Матчи</h1>

    <!-- <div class="row" v-if="!error && load"> -->
    <base-date-range-picker v-model="period" @search="search"/>

  </div>
</template>

<script>
import BaseBreadcrumb from '../components/BaseBreadcrumb.vue'
import BaseDateRangePicker from '../components/BaseDateRangePicker.vue'

export default {
  components: {
    BaseBreadcrumb,
    BaseDateRangePicker
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    },
    parent: {
      type: Object
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      links: [],
      period: {
        dateFrom: '',
        dateTo: ''
      }
    }
  },
  computed: {
    load () {
      return this.$store.state.loadMatches
    },
    error () {
      return this.$store.state.loadingError
    },
    page: {
      get () {
        return this.$store.getters.getPage
      },
      set (page) {
        this.$store.commit('setPage', page)
      }
    },
    count () {
      return this.$store.getters.getMatchesCount
    },
    data () {
      return this.$store.getters.getMatchesData
    },
    pageSize () {
      return this.$store.state.pageSize
    }
  },
  methods: {
    search() {
      console.log(this.period)
    }
  },
  created () {
    /* if(this.parent) {
      switch(this.parent.name) {
        case 'Лиги':
          this.$store.dispatch('loadCompetitionsMatches', { id: this.id, query: {} });
          break;
        case 'Команды':
          this.$store.dispatch('loadTeamsMatches', { id: this.id, query: {} });
          break;
      }
    } else {
      this.$store.dispatch('loadTeamsMatches', { id: this.id, query: {} })
    } */
    
    if (!this.links.length) {
      this.links = []
    }
    if (this.parent && this.name) {
      this.links.push(this.parent)
      this.links.push({ name: this.name })
    } else {
      this.links.push({
        name: 'Лиги',
        path: '/leagues',
        page: 1
      })
    }
  }
}
</script>
