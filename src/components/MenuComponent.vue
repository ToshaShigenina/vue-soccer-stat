<template>
  <ul>
    <li v-for="link in links" :key="link.url" @click="$emit('toggle-sidebar')">
      <router-link :to="'/' + link.url">{{ link.text }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  name: 'menu-component'
}
</script>

<style scoped>
.router-link-active {
  background-color: #ea454b;
}
@media (max-width: 992px) {
  .router-link-active {
    background-color: rgba(0,0,0,0.1);
  }
}
</style>
