<template>
  <section class="section">
    <div class="row" v-if="load && !loadingError">
      <div class="col m6 l5">
        <search-component
          v-model.trim="search"
          @search="enterSearch"
        />
      </div>
    </div>

    <div v-if="!loadingError">
      <div v-if="load">
        <collection-component
          v-if="count"
          :data="data"
          :path="home"/>
        <base-not-found v-else-if="!count && search.trim()" />
        <div v-else>
          <p>{{ count }}</p>
          <p>{{ search.trim() }}</p>
        </div>
      </div>
      <base-loader v-else />
    </div>
    <base-error v-else />

    <pagination-component
      v-if="load && (count > pageSize)"
      :pages="pages"
      :page="page"
      :pageSize="pageSize"
      @change-page="updatePage" />
  </section>
</template>

<script>
import SearchComponent from './BaseSearch.vue'
import PaginationComponent from './PaginationComponent.vue'
import CollectionComponent from './CollectionComponent.vue'
import BaseNotFound from './BaseNotFound.vue'
import BaseLoader from './BaseLoader.vue'
import BaseError from './BaseError.vue'

export default {
  components: {
    BaseNotFound,
    BaseLoader,
    BaseError,
    SearchComponent,
    PaginationComponent,
    CollectionComponent
  },
  props: {
    path: {
      type: String,
      required: true
    },
    home: {
      type: String
    },
    data: {
      type: Array,
      required: true
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
    count () {
      return this.$store.getters.getCount
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
    enterSearch () {
      console.log(this.search)
    }
  },
  created () {
    if (this.$route.query && !isNaN(+this.$route.query.page)) this.page = +this.$route.query.page
  }
}
</script>
