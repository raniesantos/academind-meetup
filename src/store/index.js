import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
    user: null
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
    },
    authCheck (state) {
      return (state.user !== null && state.user !== undefined)
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
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
    },
    firebaseSignup ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    firebaseSignin ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const authUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', authUser)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
