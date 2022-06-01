<template>
  <ul @click.capture="$emit('click')">
    <li v-for="link in links" :key="link.url">
      <router-link :to="'/' + link.url">{{ link.text }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'base-menu',
  data () {
    return {
      links: [
        {
          url: 'leagues',
          text: 'Лиги'
        },
        {
          url: 'commands',
          text: 'Команды'
        }
      ]
    }
  }
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
