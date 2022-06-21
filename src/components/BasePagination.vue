<template>
  <ul class="pagination">
    <li
      :class="{ disabled: page === 1, 'waves-effect': page > 1 }"
      class="pagination__prev"
    >
      <button
        :disabled="page === 1"
        type="button"
        @click="toPage(page - 1)"
      >
        <i class="material-icons">chevron_left</i>
      </button>
    </li>
    <li :class="{ active: page === 1 }" >
      <button @click="toPage(1)">1</button>
    </li>
    <li
      v-if="pages >= 2"
      :class="{ active: page === 2 }"
    >
      <button @click="toPage(2)">2</button>
    </li>
    <li v-if="(pages >= 7) && (page > 4)">
      <span class="pagination__dots">...</span>
    </li>
    <li
      v-if="(pages >= 5) && (page >= 4) && (page < pages)"
    >
      <button @click="toPage(page - 1)">{{ page - 1 }}</button>
    </li>
    <li
      v-if="(pages >= 5) && (page >= 3) && (page < pages - 1)"
      class="active"
    >
      <button>{{ page }}</button>
    </li>
    <li
      v-if="(pages >= 5) && (page >= 2) && (page < pages - 2)"
    >
      <button @click="toPage(page + 1)">{{ page + 1 }}</button>
    </li>
    <li v-if="(pages >= 6) && (page < pages - 3)">
      <span class="pagination__dots">...</span>
    </li>
    <li
      v-if="pages >= 4"
      :class="{ active: page === pages - 1 }"
    >
      <button @click="toPage(pages - 1)">{{ pages - 1 }}</button>
    </li>
    <li
      v-if="pages >= 3"
      :class="{ active: page === pages }"
    >
      <button @click="toPage(pages)">{{ pages }}</button>
    </li>
    <li
      :class="{ disabled: page === pages, 'waves-effect': page < pages }"
       class="pagination__next"
    >
      <button
        :disabled="page === pages"
        type="button"
        @click="toPage(page + 1)"
      >
        <i class="material-icons">chevron_right</i>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'base-pagination',
  props: {
    count: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      default: 12
    },
    page: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.count / this.limit)
    }
  },
  methods: {
    toPage (i) {
      if (i !== this.page) this.$emit('to-page', i)
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination li {
  --size: 40px;
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
}
.pagination button {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  line-height: 100%;
  font-weight: 700;
  transition: background-color .5s;
}
.pagination button:hover {
  background-color: #e0e0e0;
}
.pagination button i {
  height: 100%;
  width: 100%;
  line-height: 40px;
}
.pagination li.active button {
  color: #fff;
  background-color: transparent;
}
.pagination__dots {
  display: block;
  height: 100%;
  padding-left: 12px;
  padding-right: 12px;
  font-weight: 700;
  line-height: 40px;
}
</style>
