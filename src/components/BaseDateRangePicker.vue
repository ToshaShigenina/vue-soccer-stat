<template>
  <div class="row">
    <div class="col l3 m4 s12">
      <base-datepicker
        :value="value.dateFrom"
        @change="changeDate('dateFrom', $event)"
      />
    </div>
    <div class="col l3 m4 s12">
      <base-datepicker
        :value="value.dateTo"
        @change="changeDate('dateTo', $event)"
      />
    </div>
    <div class="col l2 m3 s12">
      <button
        :disabled="!value.dateFrom || !value.dateTo"
        type="button"
        class="btn-flat waves-effect waves-teal"
        @click="clear"
      >
        <i class="material-icons">close</i>
      </button>
      <button
        :disabled="!(value.dateFrom && value.dateTo)"
        type="button"
        class="btn-flat waves-effect waves-teal"
        @click="search"
      >
        <i class="material-icons">search</i>
      </button>
    </div>
  </div>
</template>

<script>
import BaseDatepicker from "./BaseDatepicker.vue";

export default {
  name: "base-date-range-picker",
  model: {
    prop: "value",
    event: "change",
  },
  components: {
    BaseDatepicker,
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          dateFrom: null,
          dateTo: null,
        };
      },
      validator: (value) => {
        const keys = Object.keys(value);
        return (
          keys.length === 2 &&
          keys.includes("dateFrom") &&
          keys.includes("dateTo")
        );
      },
    },
  },
  methods: {
    changeDate(key, value) {
      const modifyValue = { ...this.value };
      modifyValue[key] = value;
      this.$emit("change", modifyValue);
    },
    clear() {
      const modifyValue = { ...this.value };
      for (const key in modifyValue) {
        modifyValue[key] = "";
      }
      this.$emit("change", modifyValue);
    },
    search() {
      this.$emit("search");
    },
  },
};
</script>
