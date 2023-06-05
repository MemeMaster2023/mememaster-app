<template>
  <div id="walletconnect">

    <v-row v-if="buttonType === 'large'" :class="isMobileDevice ? 'pt-2 ml-0 mr-0' : 'pt-2'">

      <v-btn style="width:100%;" size="large" color="blue lighten-5" v-if="walletConnected">
        <img src="/img/icons/walletconnect_light.png" style="max-width:32px;padding-right:10px;text-transform: none !important;"/>Connected
      </v-btn>

      <v-btn style="width:100%;" size="large" color="blue lighten-5" @click="walletConnectInit('button')" v-if="!walletConnected">
        <img src="/img/icons/walletconnect_light.png" style="max-width:32px;padding-right:10px"/>Wallet Connect
      </v-btn>

      <!-- <v-btn style="width:100%;" large :color="dark ? '#388E3C' : 'green lighten-5'" @click="startOnboarding" v-if="!mmInstalled">
        <img src="/img/icons/metamask.png" style="max-width:22px%;max-height:22px;padding-right:10px"/>Install Metamask
      </v-btn> -->

    </v-row>

    <v-layout column v-if="buttonType === 'small'">

      <v-btn :style="dark ? 'width:190px;color:#212121' : 'width:190px;color:#EEEEEE'" depressed :color="dark ? 'grey lighten-3' : 'grey darken-3'" small v-if="walletConnected">
        <img src="/img/icons/walletconnect.png" style="max-width:22px;max-height:22px;padding-right:10px;text-transform: none !important;"/>Connected
      </v-btn>

      <v-btn :style="dark ? 'width:190px;color:#212121' : 'width:190px;color:#EEEEEE'" @click="walletConnectInit('button')" depressed :color="dark ? 'grey lighten-3' : 'grey darken-3'" small v-if="!walletConnected">
        <img src="/img/icons/walletconnect.png" style="max-width:22px;max-height:22px;padding-right:10px"/>Connect
      </v-btn>

      <!-- <v-btn :style="dark ? 'width:190px;color:#212121' : 'width:190px;color:#EEEEEE'" @click="startOnboarding" depressed :color="dark ? 'grey lighten-3' : 'grey darken-3'" small v-if="!mmInstalled">
        <img src="/img/icons/metamask.png" style="max-width:22px;max-height:22px;padding-right:10px"/>Install Metamask
      </v-btn> -->

    </v-layout>

    <v-dialog
      v-model="setDisplayNameDialog"
      persistent
      max-width="400"
    >
      <v-card pa-4 :dark="dark">
        <v-card-title class="wrap-text text-h5">
          Please enter your Display Name or Nickname
        </v-card-title>
        <v-card-text>This can be your real name or not, we leave that up to you.</v-card-text>

        <v-layout class="pa-4" >
          <v-text-field
            v-model="getUser.displayName"
            label="Display Name"
            placeholder="Please, enter your display name..."
            maxlength="50"
            variant="outlined"
            v-on:keyup="submitDisplayNameClicked"
            @click:append="submitDisplayNameClicked('click')"
            :rules="[v => !!v]"
          ></v-text-field>
        </v-layout>
        <v-layout class="pl-4 pr-4" style="margin-top:-30px" >
          <v-checkbox 
              v-model="ageConfirm" 
              label="I confirm that I am at least 13 years old.">
          </v-checkbox>
        </v-layout>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn 
            variant="outlined"
            :disabled="(getUser.displayName.length < 2 || getUser.displayName === ' ' || getUser.displayName === '  ') || !ageConfirm"
            :color="dark ? '#388E3C' : 'green lighten-4'"
            @click="submitDisplayName"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>

<script>
  import store from '@/store/index'
  import firebase from "firebase/app"
  import "firebase/auth"
  import { db } from '@/main'
  import WalletConnect from "@walletconnect/client";
  import QRCodeModal from "@walletconnect/qrcode-modal"
  import { generate } from 'project-name-generator';
  export default {
    props: {
      dark: Boolean,
      windowWidth: Number,
      windowHeight: Number,
      buttonType: String,
      isMobileDevice: Boolean
      
    },
    components: {
    },
    data(){
      return {
        connector: null,
        userExists: false,
        setDisplayNameDialog: false,
        displayName: '',
        accounts: [],
        chainId: 0,
        ageConfirm: false
      }
    },
    computed: {
      // getLanguage () {
        // return this.$store.state.user.language
      // },
      getAccounts () {
        return this.$store.state.user.accounts
      },
      walletConnected () {
        return this.$store.state.user.walletConnected
      },
      mmInstalled () {
        return this.$store.state.user.mmInstalled
      },
      getUser () {
        return this.$store.state.user
      }
    },
    created() {
      if (!this.walletConnected && this.getUser.walletProvider === 'WalletConnect') {
        this.walletConnectInit('init')
      } else {
        store.commit('SetConnectedUserFalse', {
          welcome: false
        })
      }
    },
    methods:{
      walletConnectInit (type) {
        console.log(type)
        this.connector = new WalletConnect({
          bridge: "https://bridge.walletconnect.org", // Required
          qrcodeModal: QRCodeModal,
        })

        // Check if connection is already established
        if (!this.connector.connected) {
          // create new session
          this.connector.createSession()
        }

        // Subscribe to connection events
        this.connector.on('connect', (error, payload) => {
          if (error) {
            throw error;
          }
          // Get provided accounts and chainId
          // console.log(payload.params[0])
          // const { accounts, chainId } = payload.params[0]
          this.accounts = payload.params[0].accounts
          this.chainId = payload.params[0].chainId
          // Do the rest of the store and firebase stuff
          this.enableWalletConnect()
        })

        this.connector.on('session_update', (error, payload) => {
          if (error) {
            throw error;
          }

          // Get updated accounts and chainId
          // console.log(payload.params[0])
          // const { accounts, chainId } = payload.params[0];
          this.accounts = payload.params[0].accounts
          this.chainId = payload.params[0].chainId
          // Do the rest of the store and firebase stuff
          this.enableWalletConnect()
        })

        this.connector.on('disconnect', (error, payload) => {
          if (error) {
            throw error;
          }
          // Delete connector
          console.log(payload.params[0])
          this.connector = null
          // Do the store remove stuff
          store.commit('SetWalletConnectChanges', {
            accounts: [],
            walletConnected: false,
            walletProvider: '',
            isLoggedIn: false,
          })
          firebase.auth().signOut()
        })
      },
      disconnecWallet () {

      },
      submitDisplayName () {
        let obj = {
          name: this.getUser.displayName,
          consent_13_years: true
        }
        this.saveSettingsData(obj)
        // Update Display Name
        this.currentUser.updateProfile({
          displayName: this.getUser.displayName
        }).then(function () {
          // Update successful.
          // console.log('Display Name Updated - Firebase')
        }, (error) => {
          // An error happened.
          console.log(error)
        })
      },
      submitDisplayNameClicked (e) {
        if (e === 'click' && this.getUser.displayName !== '' && this.getUser.displayName.length > 1) {
          this.submitDisplayName()
          return
        }
        if (e.keyCode === 13 && this.getUser.displayName !== '' && this.getUser.displayName.length > 1) {
          // alert('Enter was pressed')
          this.submitDisplayName()
          return
        }
      },
      saveSettingsData (obj) {
        db.collection('users').doc(this.getUser.docId).update(obj)
          .then(() => {
              // console.log('User Account in bucket updated')
              // Snackbar That confirms
              this.setDisplayNameDialog = false
            })
          .catch(error => {
              console.log(error)
            })
      },
      enableWalletConnect () {
        var nw = parseInt(this.chainId).toString(16)
        store.commit('SetUserDetails', {
          accounts: this.accounts,
          walletProvider: 'WalletConnect',
          mmConnected: false,
          mmInstalled: this.getUser.mmInstalled,
          binanceConnected: false,
          binanceInstalled: this.getUser.binanceInstalled,
          walletConnected: true,
          isDAppReady: true,
          networkChainID: '0x' + nw
        })

        let userAddress = this.accounts[0].toLowerCase()
        // console.log('userAddress[0]')
        // console.log(userAddress[0])
        let usersRef = db.collection('users')
        usersRef.where('accounts', 'array-contains', userAddress).orderBy('created', 'asc').limit(1).get()
          .then(snapshot => {
            // console.log(snapshot)
            if (snapshot.empty) {
              // console.log('No matching user!')
              this.userExists = false
              // this.loading = false
              // Create user record in 'users' bucket
              let funkyName = generate().dashed
              this.emailAddress = funkyName + '@nft.app'
              firebase.auth().createUserWithEmailAndPassword(this.emailAddress, userAddress[0]).then(
                () => {
                  this.currentUser = firebase.auth().currentUser
                  // Create user in fb if not exists yet
                  let action
                  let dispatchObj = {}
                  if (!this.userExists) {
                    this.newPostKey = db.collection('users').doc()
                    action = 'insertUserForSignUp'
                    dispatchObj = {
                      uid: this.currentUser.uid,
                      postkey: this.newPostKey.id,
                      name: '',
                      email: this.emailAddress,
                      accounts: userAddress,
                      status: 1,
                      level: 10,
                      created: new Date().getTime(),
                      welcome: this.getUser.showWelcome
                    }
                    this.$store.dispatch(action, dispatchObj)
                      .then(() => {
                        // console.log('User Created in db')
                        this.setDisplayNameDialog = true
                      }).catch(error => {
                        console.log(error)
                      })
                  }
                  // this.loadingBut = false
                  // Go to Account Home
                  // vm.$router.push('/')
                },
                (error) => {
                  // alert('Oops. ' + err.message)
                  this.alert = true
                  this.alertMessage = error.message
                  // this.loadingBut = false
                }
              )
            }
            snapshot.forEach(doc => {
              // console.log('User exists!')
              // console.log(doc.id, '=>', doc.data())
              this.newPostKey = doc
              this.userExists = true
              let emailAddress =  doc.data().email
              let pwd = doc.data().accounts[0]
              let count = 0
              // console.log(this.newPostKey.id)
              // Log User In // nickname account
              this.currentUser = firebase.auth().currentUser
              if (this.currentUser) {
                if (this.currentUser.uid !== doc.data().uid) {
                  // this is same MetaMask account address but different instance crerated due to fb is  console.log('User exists!')
                  // console.log('This is same MetaMask account address but different instance created due to fb connection issue')
                  this.currentUser = null
                }
              }

              if (!this.currentUser && count === 0) {
                count = 1
                firebase.auth().signInWithEmailAndPassword(emailAddress, pwd).then(
                  () => {
                    // Logged in so user can write to fb
                    // update store maybe
                    // console.log(user)
                    // console.log('Login User success!')
                    this.userData = doc.data()
                    this.currentUser = firebase.auth().currentUser
                    store.commit('SetConnectedUserDetails', {
                      uid: this.currentUser.uid,
                      docId: doc.id,
                      language: this.userData.language,
                      displayName: this.userData.name,
                      aboutMe: this.userData.about_me,
                      address: this.userData.address,
                      fullName: this.userData.full_name,
                      dob: this.userData.date_of_birth,
                      gender: this.userData.gender,
                      email: this.userData.email,
                      gravatar: this.userData.gravatar,
                      avatar: this.userData.avatar,
                      isLoggedIn: true,
                      isVerified: this.currentUser.emailVerified,
                      idVerified: this.userData.id_verified,
                      phoneVerified: this.userData.phone_verified,
                      accLevel: this.userData.acc_level,
                      accType: this.userData.acc_type,
                      accStatus: this.userData.status,
                      memberSince: this.userData.created,
                      favorites: this.userData.favorites,
                      welcome: this.userData.welcome
                    })
                    // console.log('Set User Details in Store success!')
                    if (this.getUser.displayName === '') {
                      this.setDisplayNameDialog = true
                    }

                    /* this.$store.dispatch('setUserTier', { address: userAddress[0] })
                      .then(() => {
                        // console.log('Sign in logged in db')
                      }).catch(error => {
                        console.log(error)
                      }) */

                    this.$store.dispatch('updateLastLogin', { uid: this.currentUser.uid })
                      .then(() => {
                        // console.log('Sign in logged in db')
                      }).catch(error => {
                        console.log(error)
                      })
                  },
                  (error) => {
                    // alert('Oops. ' + err.message)
                    this.alert = true
                    this.alertMessage = error.message
                    // this.loadingBut = false
                  }
                )
              } else if (this.currentUser && count === 0) {
                // console.log('Set User Details in Store')
                count = 1
                this.userData = doc.data()
                store.commit('SetConnectedUserDetails', {
                  uid: this.currentUser.uid,
                  docId: doc.id,
                  language: this.userData.language,
                  displayName: this.userData.name,
                  aboutMe: this.userData.about_me,
                  address: this.userData.address,
                  fullName: this.userData.full_name,
                  dob: this.userData.date_of_birth,
                  gender: this.userData.gender,
                  email: this.userData.email,
                  gravatar: this.userData.gravatar,
                  avatar: this.userData.avatar,
                  isLoggedIn: true,
                  isVerified: this.currentUser.emailVerified,
                  idVerified: this.userData.id_verified,
                  phoneVerified: this.userData.phone_verified,
                  accLevel: this.userData.acc_level,
                  accType: this.userData.acc_type,
                  accStatus: this.userData.status,
                  memberSince: this.userData.created,
                  favorites: this.userData.favorites,
                  welcome: this.userData.welcome
                })
                // console.log('Set User Details in Store success!')
                if (this.getUser.displayName === '') {
                  this.setDisplayNameDialog = true
                }

                /* this.$store.dispatch('setUserTier', { address: userAddress[0] })
                  .then(() => {
                    // console.log('Sign in logged in db')
                  }).catch(error => {
                    console.log(error)
                  }) */
              }
            })
          })
          .catch(err => {
            this.loading = false
            console.log('Error getting documents.', err)
            // show friendly error in user screen
          })

      }
    }
  }
</script>

<style lang="scss">
.wrap-text {
  word-break: normal;
}
</style>
