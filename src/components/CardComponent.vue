<template>
  <div class="card">
    <div class="card-content center-align">
      <h2 class="card-title" v-if="title">{{ title }}</h2>
      <p v-if="content">{{ content }}</p>
    </div>
    <div class="card-image" v-if="src">
      <img :src="src" :alt="title" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    }
  },
  name: 'search-component'
}
</script>

<style scoped>
.search__btn {
  padding: 0;
}
.search__btn:hover,
.search__btn:active {
  background-color: transparent;
}
.card-title {
  margin-top: 0;
}
.card-image {
  padding-bottom: 24px;
}
.card-image img {
  width: auto;
  max-width: 100%;
  height: 100px;
  margin: 0 auto;
  object-fit: contain;
  object-position: center center;
}
</style>
