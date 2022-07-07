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

    <base-content
      :length="data.length"
      :count="count"
      :load="load"
      @to-page="toPage"
    >
      <base-collection :data="data" :name="name" />
    </base-content>
  </section>
</template>

<script>
import BaseSearch from "./BaseSearch.vue";
import BaseCollection from "./BaseCollection.vue";
import BaseContent from "./BaseContent.vue";

export default {
  components: {
    BaseSearch,
    BaseCollection,
    BaseContent,
  },
  model: {
    prop: "search",
    event: "input",
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    search: {
      type: String,
      default: "",
    },
    load: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    error() {
      return this.$store.state.loadingError;
    },
    page: {
      get() {
        return this.$store.getters.getPage;
      },
      set(page) {
        this.$store.commit("setPage", page);
      },
    },
    pageSize() {
      return this.$store.getters.getPageSize;
    },
  },
  methods: {
    toPage(page, search) {
      if (page !== this.page) this.page = page;
      if (search !== undefined) this.$emit("input", search);
      this.pushQuery(search);
    },
    pushQuery(search) {
      const query = {};
      if (this.page) {
        query.page = this.page;
      }
      if (search) {
        query.search = search;
      } else {
        delete query.search;
      }
      this.$router.push({ query });
    },
  },
  created() {
    if (this.$route.query.search) {
      this.$emit("input", this.$route.query.search);
    }
    if (this.$route.query.page) {
      this.page = +this.$route.query.page;
    } else {
      this.page = 1;
    }
  },
};
</script>
