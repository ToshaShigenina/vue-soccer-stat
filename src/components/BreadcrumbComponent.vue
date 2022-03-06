<template>
  <nav>
    <ul>
      <li class="breadcrumb" v-for="(link, index) in links" :key="'link' + index">
        <router-link v-if="link.url" :to="link.url">
          {{ link.name }}
        </router-link>
        <span v-else>{{ link.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: null
    }
  },
  methods: {},
  name: 'breadcrumb-component'
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
