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
        date: new Date(),
        location: 'New York',
        description: 'Lorem ipsum dolor sit amet.'
      },
      {
        imageUrl: 'http://spotify.github.io/HubFramework/resources/getting-started-tokyo.jpg',
        id: '37689',
        title: 'meetup there',
        date: new Date(),
        location: 'Paris',
        description: 'Consectetur adipisicing elit velit, quasi!'
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
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        id: '4959975',
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date
      }
      // firebase
      commit('createMeetup', meetup)
    }
  }
})
