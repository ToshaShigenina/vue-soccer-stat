<template>
  <table class="highlight responsive-table">
    <thead>
      <tr>
        <th>Дата</th>
        <th>Время</th>
        <th>Статус</th>
        <th class="right-align">Команда А</th>
        <th class="hide-on-med-and-down"></th>
        <th class="left-align">Команда Б</th>
        <th>Счет</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data"
        is="base-table-row"
        :key="item.id"
        :row="item"
      ></tr>
    </tbody>
  </table>
</template>

<script>
import BaseTableRow from "./BaseTableRow.vue";

export default {
  name: "base-table",
  components: {
    BaseTableRow,
  },
  props: {
    data: {
      type: Array,
      reuire: true,
    },
  },
};
</script>
