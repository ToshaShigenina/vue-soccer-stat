<template>
  <nav>
    <ul v-if="links.length">
      <li class="breadcrumb" v-for="(link, i) in links" :key="i">
        <router-link v-if="link.path" :to="{ path: link.path, query: { page: link.page } }">
          {{ link.name }}
        </router-link>
        <span v-else>{{ link.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'base-breadcrumb',
  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
nav {
  background-color: transparent;
  box-shadow: none;
}
.breadcrumb:before {
  color: rgba(0,0,0,0.5);
}
.breadcrumb a,
.breadcrumb span {
  color: rgba(0,0,0,0.5);
  font-size: 80%;
}
.breadcrumb:last-child a,
.breadcrumb:last-child span {
  color: rgba(0,0,0,0.87);
}
</style>
