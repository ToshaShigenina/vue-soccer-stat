<template>
  <div id="commands">
    <main-component path="competitions" home="leagues"/>
  </div>
</template>

<script>
import mainComponent from '../components/MainComponent.vue'

export default {
  components: {
    'main-component': mainComponent
  }
}
</script>
