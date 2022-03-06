<template>
  <nav>
    <div class="container">
      <div class="nav-wrapper">
        <div class="brand-logo">{{ title }}</div>
        <button
          type="button"
          class="sidenav-trigger btn-flat hide-on-large-only"
          @click="$emit('toggle-sidebar')"
        >
          <i class="small material-icons">menu</i>
        </button>
        <menu-component
          :links="links"
          :class="['right', 'hide-on-med-and-down']"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import MenuComponent from './MenuComponent.vue'

export default {
  components: { 'menu-component': MenuComponent },
  props: {
    title: {
      type: String,
      default: ''
    },
    links: {
      type: Array,
      required: true
    }
  },
  name: 'navbar-component'
}
</script>
