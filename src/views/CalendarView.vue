<template>
  <div id="calendar">
    <base-breadcrumb :links="links" />
    <h1>Матчи</h1>

    <div class="row" v-if="!error && load">
      <div class="col l3 m4 s12">
        <base-datepicker
          v-model="dateFrom"
          placeholder="Дата начала периода"
        />
      </div>
      <div class="col l3 m4 s12">
        <base-datepicker
          v-model="dateTo"
          placeholder="Дата окончания периода"
        />
      </div>
      <div class="col l2 m3 s12">
        <button type="button" class="btn-flat waves-effect waves-teal" @click="search" :disabled="!(dateFrom && dateTo)">
          <i class="material-icons">search</i>
        </button>
      </div>
    </div>

    <base-date-range-picker v-model="period"/>

  </div>
</template>

<script>
import BaseBreadcrumb from '../components/BaseBreadcrumb.vue'
import BaseDatepicker from '../components/BaseDatepicker.vue'
import BaseDateRangePicker from '../components/BaseDateRangePicker.vue'

export default {
  components: {
    BaseBreadcrumb,
    BaseDatepicker,
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
      dateFrom: '',
      dateTo: '',
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
      return this.$store.getters.getFilteredMatches(this.page)
    },
    pageSize () {
      return this.$store.state.pageSize
    }
  },
  created () {
    if (!this.links.length) {
      this.links = []
    }
    if (this.parent && this.name) {
      this.links.push(this.parent)
      this.links.push({ name: this.name })
    }
  }
}
</script>
