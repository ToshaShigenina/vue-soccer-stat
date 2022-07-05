<template>
  <section class="section">
    <div class="row">
      <div class="col m6 l5">
        <base-search
          :value="search"
          :disabled="error || !load"
          @input="toPage(1, $event)"
        />
      </div>
    </div>

    <div v-if="!error && load">
      <base-collection v-if="data.length" :data="data" :name="name" />
      <base-not-found v-else />
    </div>
    <base-loader v-else-if="!error && !load" />
    <base-error v-else />

    <base-pagination
      v-if="data.length"
      :count="count"
      :page="page"
      @to-page="toPage"
    />
  </section>
</template>

<script>
import BaseSearch from './BaseSearch.vue'
import BasePagination from './BasePagination.vue'
import BaseCollection from './BaseCollection.vue'
import BaseNotFound from './BaseNotFound.vue'
import BaseLoader from './BaseLoader.vue'
import BaseError from './BaseError.vue'

export default {
  components: {
    BaseNotFound,
    BaseLoader,
    BaseError,
    BaseSearch,
    BasePagination,
    BaseCollection
  },
  model: {
    prop: 'search',
    event: 'input'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    search: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      required: true
    },
    load: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    page: {
      get () {
        return this.$store.getters.getPage
      },
      set (page) {
        this.$store.commit('setPage', page)
      }
    },
    pageSize () {
      return this.$store.getters.getPageSize
    }
  },
  methods: {
    toPage (page, search) {
      this.page = page
      if (search !== undefined) this.$emit('input', search)
      this.pushQuery(search)
    },
    pushQuery (search) {
      const query = {}
      if (this.page) {
        query.page = this.page
      }
      if (search) {
        query.search = search
      } else {
        delete query.search
      }
      this.$router.push({ query })
    }
  },
  created () {
    if (this.$route.query.search) {
      this.$emit('input', this.$route.query.search)
    }
    if (this.$route.query.page) {
      this.page = +this.$route.query.page
    } else {
      this.page = 1
    }
  }
}
</script>
