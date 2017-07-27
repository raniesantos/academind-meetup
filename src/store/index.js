import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'http://www.itowns-project.org/images/sample_itowns.jpg',
        id: 'sadghjkl',
        title: 'meetup here',
        date: '2017-07-17'
      },
      {
        imageUrl: 'http://spotify.github.io/HubFramework/resources/getting-started-tokyo.jpg',
        id: '37689',
        title: 'meetup there',
        date: '2017-07-17'
      }
    ],
    user: {
      id: 'vbmnbnvnghj',
      registeredMeetups: ['37689']
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  },
  mutations: {

  },
  actions: {

  }
})
