<template>
  <main>
    <navbar-component
      title="SoccerStat"
      :links="links"
      @toggle-sidebar="toggleNavbar"
    />
    <aside
      class="sidenav hide-on-large-only translate-transition"
      :class="{ 'translate-in': navbarVisibility }"
    >
      <menu-component
        :links="links"
        @toggle-sidebar="toggleNavbar"
      />
    </aside>
    <div class="container">
      <router-view></router-view>
    </div>
    <div
      class="sidenav-overlay hide-on-large-only"
      :style="{ display: navbarVisibility ? 'block' : 'none', opacity: navbarVisibility ? 1 : 0 }"
      @click.self="toggleNavbar"
    ></div>
  </main>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'
import MenuComponent from './components/MenuComponent.vue'

export default {
  components: {
    'navbar-component': NavbarComponent,
    'menu-component': MenuComponent
  },
  data () {
    return {
      navbarVisibility: false,
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
  },
  methods: {
    toggleNavbar () {
      this.navbarVisibility = !this.navbarVisibility
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

.text-muted {
  color: #9e9e9e;
}
</style>
