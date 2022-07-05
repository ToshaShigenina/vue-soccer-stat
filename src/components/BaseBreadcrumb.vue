<template>
  <nav>
    <ul v-if="links.length">
      <li class="breadcrumb" v-for="(link, i) in links" :key="i">
        <base-breadcrumb-link v-if="link.path" :link="link" />
        <span v-else>{{ link.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import BaseBreadcrumbLink from './BaseBreadcrumbLink.vue';

export default {
  name: "base-breadcrumb",
  components: {
    BaseBreadcrumbLink
  },
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    setPath(link) {
      const urlTo = {
        path: link.path,
      };
      if (link.page && link.page > 1) {
        urlTo.query = { page: link.page };
      }
      return urlTo;
    },
  },
};
</script>

<style scoped>
nav {
  background-color: transparent;
  box-shadow: none;
}
.breadcrumb:before {
  color: rgba(0, 0, 0, 0.5);
}
.breadcrumb a,
.breadcrumb span {
  color: rgba(0, 0, 0, 0.5);
  font-size: 80%;
}
.breadcrumb:last-child a,
.breadcrumb:last-child span {
  color: rgba(0, 0, 0, 0.87);
}
</style>
