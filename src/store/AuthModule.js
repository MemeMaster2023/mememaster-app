import firebase from 'firebase/app'
import { db } from '@/main'

const AuthModule = {
  state: {
    user: null,
    authMessage: '',
    errorMessage: '',
    provider:'',
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setState(state, payload) {
      console.log(payload);
      var keys = Object.keys(payload);
      keys.forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    insertUserForSignUp({ commit }, payload) {
      // console.log(payload)
      let accounts = [];
      if(![null,undefined].includes(payload.accounts)){
        accounts = Array.isArray(payload.accounts) ? payload.accounts : [payload.accounts]
      }
      const newUser = {
        uid: payload.uid,
        name: payload.name,
        about_me: "",
        full_name: "",
        address: "",
        date_of_birth: "",
        gender: 0,
        email: payload.email,
        gravatar: true,
        avatar: '',
        accounts: accounts,
        status: payload.status,
        link_verified: false,
        id_verified: false,
        phone_verified: false,
        id_type: 0,
        acc_level: 1,
        acc_type: 10, // TBD 10 Free 10k holder 11, 75k holder 12
        terms_accepted: true,
        language: "en",
        created: payload.created,
        lastlogin: 0,
        favorites: [],
        welcome: payload.welcome,
      };
      console.log(newUser);
      db.collection("users")
        .doc(payload.postkey)
        .set(newUser)
        .then(() => {
          console.log('User Account in bucket created')
          commit("SetConnectedUserDetails", {
            uid: payload.uid,
            docId: payload.postkey,
            language: "en",
            displayName: payload.name,
            aboutMe: "",
            address: "",
            fullName: "",
            dob: "",
            gender: 0,
            email: payload.email,
            gravatar: true,
            avatar: "",
            isLoggedIn: true,
            isVerified: false,
            idVerified: false,
            phoneVerified: false,
            accLevel: 1,
            accType: 10, // TBD 10 Free 10k holder 11, 75k holder 12
            accStatus: payload.status,
            memberSince: payload.created,
            favorites: [],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendMagicLink({ commit }, payload) {
      var MM_URL;
      console.log(payload);
      const environment = import.meta.env.VITE_APP_ENVIRONMENT;
      if (environment === "production") {
        console.log("API PRODUCTION ENVIRONMENT");
        MM_URL = import.meta.env.VITE_APP_MM;
      } else if (environment === "testnet") {
        console.log("API TEST ENVIRONMENT");
        MM_URL = import.meta.env.VITE_APP_MM_TEST;
      } else {
        console.log("API LOCAL ENVIRONMENT");
        MM_URL = import.meta.env.VITE_APP_MM_LOCAL;
      }
      var actionCodeSettings = {
        url: MM_URL + "authorise/" + btoa(payload.email),
        handleCodeInApp: true,
      };
      firebase
        .auth()
        .sendSignInLinkToEmail(payload.email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem(
            "meme-master-emailForSignIn",
            payload.email
          );
          commit("setState", {
            authMessage: "Email sent successfully!",
          });
        })
        .catch((error) => {
          console.log(error);
          commit("setState", {
            errorMessage: error.message,
          });
        });
    },
    signInWithLink: ({ commit, dispatch }, payload) => {
      firebase
        .auth()
        .signInWithEmailLink(payload.email, payload.link)
        .then(async (result) => {
          const user = result.user;
          if (user) {
            if (payload.new) {
              if (result.user !== null && result.user !== undefined) {
                try {
                  console.log(result.user);
                  await firebase
                    .auth()
                    .currentUser.updatePassword(result.user.uid);
                } catch (err) {
                  console.log(err);
                  commit("setState", {
                    errorMessage: err.message,
                  });
                }
              } 
              let newPostKey = db.collection("users").doc();
              let dispatchObj = {
                uid: user.uid,
                postkey: newPostKey.id,
                name: '',//payload.username ?? payload.email.split("@")[0],
                email: payload.email,
                accounts: [],
                status: 1,
                level: 10,
                created: new Date().getTime(),
                welcome: true,
              };
              await dispatch("insertUserForSignUp", dispatchObj);
            } else {
              commit("SetConnectedUserDetails", payload.userData);
            }
            localStorage.removeItem("meme-master-emailForSignIn");
            commit("SetEmailConnected", {
              isEmailConnected: true,
              isLoggedIn: true
            }, { root: true }
            );
          }
        })
        .catch((error) => {
          localStorage.removeItem("meme-master-emailForSignIn");
          console.log(error);
          commit("setState", {
            errorMessage: error.message,
          });
        });
    },
    signUserInGoogle({ commit, dispatch }) {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(async (result) => {
          const user = result.user;
          if (user) {
            const querySnapshot = await db
              .collection('users')
              .where('email', '==', user.email)
              .get();
            if(querySnapshot.empty){
              let newPostKey = db.collection("users").doc();
              let dispatchObj = {
                uid: user.uid,
                postkey: newPostKey.id,
                name: '',//user.displayName ?? user.email.split("@")[0],
                email: user.email,
                accounts: [],
                status: 1,
                level: 10,
                created: new Date().getTime(),
                welcome: true,
              };
              await dispatch("insertUserForSignUp", dispatchObj);
            }else{
              let objFromDb = querySnapshot.docs[0].data();
              objFromDb["docId"] = querySnapshot.docs[0].id;
              commit("SetConnectedUserDetails", objFromDb);
            }
            commit("SetEmailConnected", {
                isEmailConnected: true,
                isLoggedIn: true
              }, { root: true }
            );
            commit("setState", {
              authMessage: "Login using google success!",
              provider: "Google"
            });
          }
        })
        .catch((error) => {
          commit("setState", {
            errorMessage: error.message,
          });
        });
    },
    emptyAuthMessage({commit}){
      commit("setState", {
        errorMessage: "",
        authMessage: "",
      });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL,
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};

export default AuthModule
