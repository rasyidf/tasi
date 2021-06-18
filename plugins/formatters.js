import Vue from 'vue'
import moment from 'moment'
moment.locale('id')

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('dddd, DD-MMM-YYYY hh:mm')
  }
})

Vue.filter('formatCurrency', (value) => {
  return formatter.format(value).replace(/\s/g, '')
})
