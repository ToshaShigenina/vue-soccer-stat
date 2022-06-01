<template>
  <nav>
    <div class="container">
      <div class="nav-wrapper">
        <div class="brand-logo">
          <router-link to="/">
            SoccerStat
          </router-link>
        </div>
        <button
          type="button"
          class="sidenav-trigger btn-flat hide-on-large-only"
          @click="$emit('toggle-sidebar')"
        >
          <i class="small material-icons">menu</i>
        </button>
        <base-menu
          :class="['right', 'hide-on-med-and-down']"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import BaseMenu from './BaseMenu.vue'

export default {
  name: 'base-navbar',
  components: { BaseMenu }
}
</script>
