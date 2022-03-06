<template>
  <section class="section">
    <div class="row" v-if="load && !loadingError">
      <div class="col m6 l5">
        <search-component v-model.trim="search"/>
      </div>
    </div>

    <div v-if="!loadingError">
      <div v-if="load">
        <collection-component
          v-if="count"
          :data="data"
          :path="home"/>
        <div class="row" v-if="!count && search.trim()">
          <div class="col s12">
            <p>Ничего не найдено</p>
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
        <p>Что-то пошло не так, данные не загружены. Попробуйте обновить страницу позже.</p>
      </div>
    </div>

    <pagination-component
      v-if="load && (count > pageSize)"
      :pages="pages"
      :page="page"
      :pageSize="pageSize"
      @change-page="updatePage" />
  </section>
</template>

<script>
import searchComponent from './SearchComponent.vue'
import paginationComponent from './PaginationComponent.vue'
import collectionComponent from './CollectionComponent.vue'

export default {
  components: {
    'search-component': searchComponent,
    'pagination-component': paginationComponent,
    'collection-component': collectionComponent
  },
  props: {
    path: {
      type: String,
      require: true
    },
    home: {
      type: String
    }
  },
  data () {
    return {
      search: '',
      page: 1
    }
  },
  computed: {
    load () {
      if (this.path === 'competitions') {
        return this.$store.state.loadCompetitions
      }
      return this.$store.state.loadTeams
    },
    data () {
      if (this.path === 'competitions') {
        return this.$store.getters.getCompetitionsPerPage(this.page, this.search)
      }
      return this.$store.getters.getTeamsPerPage(this.page, this.search)
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
    }
  },
  created () {
    if (this.path === 'competitions') {
      this.$store.dispatch('loadCompetitions')
    } else {
      this.$store.dispatch('loadTeams')
    }
    if (this.$route.query && !isNaN(+this.$route.query.page)) this.page = +this.$route.query.page
  }
}
</script>
