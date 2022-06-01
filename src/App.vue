<template>
  <main>
    <base-navbar
      @toggle-sidebar="toggleNavbar"
    />
    <base-sidebar
      :open="navbarVisibility"
      @toggle-sidebar="toggleNavbar"
    />
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import BaseNavbar from './components/BaseNavbar.vue'
import BaseSidebar from './components/BaseSidebar.vue'

export default {
  components: {
    BaseNavbar,
    BaseSidebar
  },
  data () {
    return {
      navbarVisibility: false
    }
  },
  methods: {
    toggleNavbar () {
      this.navbarVisibility = !this.navbarVisibility
    }
  }
}
</script>

<style>
.text-muted {
  color: #9e9e9e;
}
</style>
