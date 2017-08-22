import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyB6_a17VO_rX8sdui8wGmRkGi3l6zECaYc',
      authDomain: 'vuemeetup-127e6.firebaseapp.com',
      databaseURL: 'https://vuemeetup-127e6.firebaseio.com',
      projectId: 'vuemeetup-127e6',
      storageBucket: 'vuemeetup-127e6.appspot.com'
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
      }
    })

    this.$store.dispatch('loadMeetups')
  }
})
