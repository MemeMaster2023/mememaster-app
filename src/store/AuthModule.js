import firebase from 'firebase/app'
import { db } from '@/main'

const AuthModule = {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            user.updateProfile({displayName: payload.eth_address})
              .then(
                user => {
                  commit('setLoading', false)
                  const newUser = {
                    id: user.uid,
                    name: user.eth_address,
                    email: user.email,
                    photoUrl: user.photoURL
                  }
                  commit('setUser', newUser)
                }
              )
              .catch(
                error => {
                  commit('setLoading', false)
                  commit('setError', error)
                  console.log(error)
                }
              )
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    insertUserForSignUp ({commit}, payload) {
      commit('setLoading', true)
      // console.log(payload)
      const newUser = {
        uid: payload.uid,
        name: payload.name,
        about_me: '',
        full_name: '',
        address: '',
        date_of_birth: '',
        gender: 0,
        email: payload.email,
        gravatar: true,
        avatar: '',
        accounts: [payload.accounts],
        status: payload.status,
        link_verified: false,
        id_verified: false,
        phone_verified: false,
        id_type: 0,
        acc_level: 1,
        acc_type: 10, // TBD 10 Free 10k holder 11, 75k holder 12
        terms_accepted: true,
        language: 'en',
        created: payload.created,
        lastlogin: 0,
        favorites: [],
        welcome: payload.welcome
      }
      db.collection('users').doc(payload.postkey).set(newUser)
      .then(() => {
          // console.log('User Account in bucket created')

          commit('SetConnectedUserDetails', {
            uid: payload.uid,
            docId: payload.postkey,
            language: 'en',
            displayName: payload.name,
            aboutMe: '',
            address: '',
            fullName: '',
            dob: '',
            gender: 0,
            email: payload.email,
            gravatar: true,
            avatar: '',
            isLoggedIn: true,
            isVerified: false,
            idVerified: false,
            phoneVerified: false,
            accLevel: 1,
            accType: 10, // TBD 10 Free 10k holder 11, 75k holder 12
            accStatus: payload.status,
            memberSince: payload.created,
            favorites: [],
          })
          // console.log('Set User Details in Store - Auth Module')

        })
      .catch(error => {
          console.log(error)
        })
    },
    userLoginMagicLink ({commit}, payload) {
      commit('setLoading', true)
      // console.log(payload)
      const message = {
        link_verified: payload.link_verified
      }
      console.log(message)
      db.collection('users').doc(payload.postkey).update(message)
        .then(() => {
            // console.log('User Account in bucket updated')
          })
        .catch(error => {
            console.log(error)
          })
    },
    magicLinkClickedForSignUp ({commit}, payload) {
      commit('setLoading', true)
      // console.log(payload)
      const message = {
        uid: payload.uid,
        status: payload.status,
        link_verified: payload.link_verified,
        lastlogin: payload.lastlogin
      }
      db.collection('users').doc(payload.postkey).update(message)
        .then(() => {
            // console.log('User Account in bucket Updated')
          })
        .catch(error => {
            console.log(error)
          })
    },
    signUserInGoogle ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInFacebook ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInGithub ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInTwitter ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}

export default AuthModule
