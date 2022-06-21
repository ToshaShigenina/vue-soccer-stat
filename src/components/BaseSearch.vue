<template>
  <div class="search row valign-wrapper">
    <div class="input-field col s10">
      <input
        type="search"
        id="search"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        @input="inputSearch($event.target.value)"
        @keypress.enter="enterSearch"
      />
    </div>
    <div class="col s2">
      <label
        v-if="!value"
        :class="{ disabled: disabled }"
        for="search"
        class="btn-flat btn-large search__btn"
        @click="enterSearch"
      >
        <i class="material-icons">search</i>
      </label>
      <button
        v-else
        :class="{ disabled: disabled }"
        class="btn-flat"
        @click="clearSearch"
      >
        <i class="material-icons">close</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-search',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Введите текст'
    },
    disabled: {
      type: Boolean,
      default: false
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
      this.enterSearch()
    }
  }
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
