<template>
  <input type="text" class="datepicker" :value="value" @change="changeDate($event.target.value)" :placeholder="placeholder">
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'

export default {
  name: 'datepicker-component',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Выберите дату'
    }
  },
  data () {
    return {
      picker: null,
      options: {
        autoClose: true,
        format: 'yyyy-mm-dd',
        i18n: {
          cancel: 'Закрыть',
          clear: 'Очистить',
          months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
          ],
          monthsShort: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек'
          ],
          weekdays: [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
          ],
          weekdaysShort: [
            'Вс',
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб'
          ],
          weekdaysAbbrev: [
            'Вс',
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб'
          ]
        }
      }
    }
  },
  methods: {
    changeDate (value) {
      console.log(value)
      this.$emit('input', value)
    }
  },
  mounted () {
    this.picker = M.Datepicker.init(this.$el, this.options)
  },
  destroyed () {
    this.picker.destroy()
  }
}
</script>
