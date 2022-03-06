<template>
  <div class="row">
    <div class="col l4 m6 s12" v-for="item in data" :key="item.id">
      <router-link :to="{ path: `/${path}/${item.id}`, query: { name: item.name } }">
        <card-component v-if="path === 'leagues'" :title="item.name" :content="item.area.name" />
        <card-component v-else :title="item.name" :src="item.crestUrl" />
      </router-link>
    </div>
  </div>
</template>

<script>
import cardComponent from './CardComponent.vue'

export default {
  components: {
    'card-component': cardComponent
  },
  name: 'collection-component',
  props: {
    data: {
      type: Array,
      require: true
    },
    path: {
      type: String,
      require: true
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.row::before,
.row::after {
  content: none;
}

.row>.col {
  margin-left: 0 !important;
}
</style>
