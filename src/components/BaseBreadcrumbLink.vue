<template>
  <router-link
    v-if="link.path"
    :to="url"
  >
    {{ link.name }}
  </router-link>
</template>

<script>
export default {
  name: "base-breadcrumb-link",
  props: {
    link: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    url() {
      const urlTo = {
        path: this.link.path,
      };
      if (this.link.page && this.link.page > 1) {
        urlTo.query = { page: this.link.page };
      }
      return urlTo;
    },
  },
};
</script>
