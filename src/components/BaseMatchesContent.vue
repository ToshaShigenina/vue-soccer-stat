<template>
  <section class="section">
    <base-breadcrumb :links="links" />
    <h1>{{ heading }}</h1>

    <base-date-range-picker
      v-if="!error && load"
      v-model="period"
      @search="search"
      @clear="search"
    />

    <div v-if="!error && load">
      <base-table v-if="data.length" :data="data" />
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
import BaseBreadcrumb from "../components/BaseBreadcrumb.vue";
import BaseDateRangePicker from "../components/BaseDateRangePicker.vue";
import BaseTable from "../components/BaseTable.vue";
import BasePagination from "../components/BasePagination.vue";
import BaseLoader from "../components/BaseLoader.vue";
import BaseNotFound from "../components/BaseNotFound.vue";
import BaseError from "../components/BaseError.vue";

export default {
  components: {
    BaseBreadcrumb,
    BaseDateRangePicker,
    BaseTable,
    BasePagination,
    BaseLoader,
    BaseNotFound,
    BaseError,
  },
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      period: {
        dateFrom: "",
        dateTo: "",
      },
    };
  },
  computed: {
    heading() {
      return this.$route.meta.title;
    },
    data() {
      return this.$store.getters.getMatchesFiltered(this.page);
    },
    load() {
      return this.$store.state.matches.loadMatches;
    },
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
    count() {
      return this.$store.getters.getMatchesCount;
    },
    query() {
      const query = {};
      if (this.page) {
        query.page = this.page;
      }
      if (this.period && this.period.dateFrom && this.period.dateTo) {
        query.dateFrom = this.period.dateFrom;
        query.dateTo = this.period.dateTo;
      } else {
        delete query.dateFrom;
        delete query.dateTo;
      }
      return query;
    },
  },
  methods: {
    search() {
      this.page = 1;
      this.pushQuery();
      this.$emit("change-period", this.period);
    },
    toPage(page) {
      this.page = page;
      this.pushQuery();
    },
    pushQuery() {
      this.$router.push({ query: this.query });
    },
  },
  created() {
    if (this.$route.query) {
      const query = this.$route.query;
      if (query.page) {
        this.page = +query.page;
      } else {
        this.page = 1;
      }
      if (query.dateFrom && query.dateTo) {
        this.period.dateFrom = query.dateFrom;
        this.period.dateTo = query.dateTo;
      }
    }
  },
};
</script>
