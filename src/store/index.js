import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

/*
New York image
http://lorempixel.com/1200/600/city/2/
Paris image
http://edoecohen.com/countries/app/images/capitals/paris.jpeg
San Francisco
http://lorempixel.com/1200/600/city/9/
*/

export default new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
    authCheck (state) {
      return (state.user !== null && state.user !== undefined);
    }
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id;
      if (state.user.registeredMeetups.findIndex((meetup) => meetup.id === id) >= 0) {
        return;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },
    unregisterUserForMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(registeredMeetups.findIndex((meetup) => meetup.id === payload), 1);
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
    setUser (state, payload) {
      state.user = payload;
    },
    setLoading (state, payload) {
      state.loading = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    clearError (state) {
      state.error = null;
    }
  },
  actions: {
    registerUserForMeetup ({commit, state}, payload) {
      commit('setLoading', true);
      const user = state.user;
      firebase.database().ref('/users/' + user.id).child('registrations').push(payload)
        .then((data) => {
          commit('setLoading', false);
          commit('registerUserForMeetup', { id: payload, fbKey: data.key });
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    unregisterUserForMeetup ({commit, state}, payload) {
      commit('setLoading', true);
      const user = state.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey).remove()
        .then(() => {
          commit('setLoading', false);
          commit('unregisterUserForMeetup', payload);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    loadMeetups ({commit}) {
      commit('setLoading', true);
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              userId: obj[key].userId
            });
          }
          commit('setLoadedMeetups', meetups);
          commit('setLoading', false);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    createMeetup ({commit, state}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        userId: state.user.id
      };
      let imageUrl;
      let key;
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key;
          return key;
        })
        .then((key) => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image);
        })
        .then((fileData) => {
          imageUrl = fileData.metadata.downloadURLs[0];
          return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl });
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateMeetup ({commit}, payload) {
      commit('setLoading', true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false);
          commit('updateMeetup', payload);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    firebaseSignup ({commit}, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          };
          commit('setUser', newUser);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    firebaseSignin ({commit}, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false);
          const authUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          };
          commit('setUser', authUser);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      });
    },
    fetchUserData ({commit, state}) {
      commit('setLoading', true);
      firebase.database().ref('/users/' + state.user.id + '/registrations/').once('value')
        .then((data) => {
          const dataPairs = data.val();
          let registeredMeetups = [];
          let swappedPairs = {};
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }
          const updatedUser = {
            id: state.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          };
          commit('setLoading', false);
          commit('setUser', updatedUser);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    firebaseSignout ({commit}) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    clearError ({commit}) {
      commit('clearError');
    }
  }
});
