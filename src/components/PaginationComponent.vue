<template>
  <ul class="pagination">
    <li :class="{ disabled: page === 1, 'waves-effect': page > 1 }">
      <button type="button" class="btn-flat" @click="changePagination(page - 1)" :disabled="page === 1">
        <i class="material-icons">chevron_left</i>
      </button>
    </li>
    <li v-for="n in pagesForView" :key="'page' + n.num" :class="{ active: n.num === page, 'waves-effect': n.num !== page }" @click="changePagination(n.num)">
      <router-link v-if="n.type" :to="{ query: { ...$route.query, page: n.num } }">{{ n.num }}</router-link>
      <span v-else class="pagination__dots">...</span>
    </li>
    <li :class="{ disabled: page === pages, 'waves-effect': page < pages }">
      <button type="button" class="btn-flat" @click="changePagination(page + 1)" :disabled="page === pages">
        <i class="material-icons">chevron_right</i>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 12
    }
  },
  computed: {
    pagesForView () {
      const pages = []
      for (let i = 1; i <= this.pages; i++) {
        if (this.pages > 5) {
          if (
            (i !== this.page && (i <= 2 || i > this.pages - 2)) ||
            (i === this.page && (i > 2 || i <= this.pages - 2))
          ) {
            pages.push({
              num: i,
              type: 1
            })
          }
          if (
            ((i === 3 || i === this.pages - 2) && (this.page > 3 && this.page <= this.pages - 3)) ||
            ((i === 3 && this.page < 3) || (i === 4 && this.page === 3)) ||
            (
              (i === this.pages - 2 && this.page > this.pages - 2) ||
              (i === this.pages - 3 && this.page === this.pages - 2)
            )
          ) {
            pages.push({
              num: i,
              type: 0
            })
          }
        } else {
          pages.push({
            num: i,
            type: 1
          })
        }
      }
      return pages
    }
  },
  methods: {
    changePagination (page) {
      this.$emit('change-page', page)
    }
  },
  name: 'pagination-component'
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination__dots {
  padding-left: 12px;
  padding-right: 12px;
}
</style>
