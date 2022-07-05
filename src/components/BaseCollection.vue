<template>
  <div class="row">
    <div class="col l4 m6 s12" v-for="item in data" :key="item.id">
      <router-link
        :to="{
          name,
          params: {
            parentPage,
            id: item.id,
            name: item.name,
          },
        }"
      >
        <base-card
          :title="item.name"
          :content="item.area.name"
          :src="item.crestUrl"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseCard from "./BaseCard.vue";

export default {
  components: {
    BaseCard,
  },
  name: "base-collection",
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    parentPage() {
      return this.$store.getters.getPage;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.row::before,
.row::after {
  content: none;
}

.row > .col {
  margin-left: 0 !important;
}
</style>
