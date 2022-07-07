<template>
  <div class="content">
    <div v-if="!error && load">
      <slot v-if="length"></slot>
      <base-not-found v-else />
    </div>
    <base-loader v-else-if="!error && !load" />
    <base-error v-else />

    <base-pagination
      v-if="length"
      :count="count"
      :page="page"
      @to-page="toPage"
    />
  </div>
</template>

<script>
import BaseError from "./BaseError.vue";
import BaseLoader from "./BaseLoader.vue";
import BaseNotFound from "./BaseNotFound.vue";
import BasePagination from "./BasePagination.vue";

export default {
  name: "base-content",
  components: {
    BaseError,
    BaseLoader,
    BaseNotFound,
    BasePagination,
  },
  props: {
    length: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    load: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    page() {
        return this.$store.getters.getPage;
    },
    error() {
      return this.$store.state.loadingError;
    },
  },
  methods: {
    toPage(page) {
      this.$emit("to-page", page);
    },
  },
};
</script>
