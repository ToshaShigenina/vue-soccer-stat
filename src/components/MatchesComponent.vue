<template>
  <section class="section">
    <breadcrumb-component :links="links" />
    <h1>Матчи</h1>
    <div class="row" v-if="load && !loadingError">
      <div class="col l3 m4 s12">
        <datepicker-component
          v-model="dateFrom"
          placeholder="Дата начала периода"
        />
      </div>
      <div class="col l3 m4 s12">
        <datepicker-component
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

    <div v-if="!loadingError">
      <div v-if="load">
        <table-component v-if="count" :data="matches"/>
        <div class="row" v-if="!count && (dateFrom && dateTo)">
          <div class="col s12">
            <p>
              Ничего не найдено
            </p>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col s12">
          <p>
            Подождите, данные загружаются...
          </p>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col s12">
        <p>
          Что-то пошло не так, данные не загружены. Попробуйте обновить страницу позже.
        </p>
      </div>
    </div>

    <pagination-component
      v-if="count > pageSize"
      :pages="pages"
      :page="page"
      :pageSize="pageSize"
      @change-page="updatePage"
    />
  </section>
</template>

<script>
import breadcrumbComponent from './BreadcrumbComponent.vue'
import datepickerComponent from './DatepickerComponent.vue'
import tableComponent from './TableComponent.vue'
import paginationComponent from './PaginationComponent.vue'

export default {
  components: {
    'breadcrumb-component': breadcrumbComponent,
    'datepicker-component': datepickerComponent,
    'table-component': tableComponent,
    'pagination-component': paginationComponent
  },
  props: {
    id: {
      type: String,
      require: true
    },
    path: {
      type: String,
      require: true
    },
    home: {
      type: Object
    }
  },
  data () {
    return {
      page: 1,
      dateFrom: '',
      dateTo: '',
      links: []
    }
  },
  computed: {
    load () {
      return this.$store.state.loadMatches
    },
    matches () {
      return this.$store.getters.getMatchesPerPage(this.page)
    },
    count () {
      return this.$store.state.count
    },
    pages () {
      return this.$store.getters.getPages
    },
    pageSize () {
      return this.$store.state.pageSize
    },
    loadingError () {
      return this.$store.state.loadingError
    }
  },
  methods: {
    updatePage (page) {
      this.page = page
    },
    search () {
      this.$store.dispatch('loadMatches', { id: this.id, path: this.path, filters: `?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}` })
      this.updatePage(1)
    }
  },
  created () {
    this.links.push(this.home)
    this.links.push({ name: this.$route.query.name })
    this.$store.dispatch('loadMatches', { id: this.id, path: this.path })
    if (this.$route.query && !isNaN(+this.$route.query.page)) this.page = +this.$route.query.page
  }
}
</script>
