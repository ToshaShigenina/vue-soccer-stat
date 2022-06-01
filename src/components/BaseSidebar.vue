<template>
  <div>
    <aside
      class="sidenav hide-on-large-only translate-transition"
      :class="{ 'translate-in': open }"
    >
      <base-menu @click="$emit('toggle-sidebar')" />
    </aside>
    <div
        class="sidenav-overlay hide-on-large-only"
        :style="{ display: open ? 'block' : 'none', opacity: open ? 1 : 0 }"
        @click.self="$emit('toggle-sidebar')"
      />
  </div>
</template>

<script>
import BaseMenu from './BaseMenu.vue'

export default {
  name: 'base-sidebar',
  components: { BaseMenu },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.translate-transition {
  transition: transform 0.5s;
  transform-origin: top left;
  transform: translateX(-100%);
}

.translate-transition.translate-in {
  transform: translateX(0);
}
</style>
