<template>
  <div class="search row valign-wrapper">
    <div class="input-field col s10">
      <input
        type="search"
        :placeholder="placeholder"
        :value="value"
        @input="inputSearch($event.target.value)"
        @keypress.enter="enterSearch"
      />
    </div>
    <div class="col s2">
      <label for="search" class="btn-flat btn-large search__btn" v-if="!value">
        <i class="material-icons">search</i>
      </label>
      <button class="btn-flat" v-else @click="clearSearch">
        <i class="material-icons">close</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Введите текст'
    }
  },
  methods: {
    enterSearch () {
      this.$emit('search')
    },
    inputSearch (value) {
      this.$emit('input', value)
    },
    clearSearch () {
      this.inputSearch('')
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
</style>
