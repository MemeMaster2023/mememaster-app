<template>
  <div id="metamask">

    <v-layout column v-if="buttonType === 'large'">

      <v-btn style="width:100%;" large :color="dark ? 'deep-purple' : 'green lighten-5'" v-if="binanceInstalled && binanceConnected">
        <img src="/img/icons/binance.png" style="max-width:22px%;max-height:22px;padding-right:10px;text-transform: none !important;"/>Connected To Binance
      </v-btn>

      <v-btn :disabled="isMobileDevice" style="width:100%;" large :color="dark ? 'deep-purple' : 'green lighten-5'" @click="enableEthereumButton" v-if="binanceInstalled && !binanceConnected">
        <img src="/img/icons/binance.png" style="max-width:22px%;max-height:22px;padding-right:10px"/>Binance Chain Wallet
      </v-btn>

      <v-btn :disabled="isMobileDevice" style="width:100%;" large :color="dark ? 'deep-purple' : 'green lighten-5'" @click="startBinaceOnboarding" v-if="!binanceInstalled">
        <img src="/img/icons/binance.png" style="max-width:22px%;max-height:22px;padding-right:10px"/>{{ isMobileDevice ? 'Install Binance Wallet' : 'Install Binance Chain Wallet'}}
      </v-btn>

    </v-layout>

    <v-layout column v-if="buttonType === 'small'">

      <v-btn :style="dark ? 'width:190px;color:#212121' : 'width:190px;color:#EEEEEE'" depressed :color="dark ? 'grey lighten-3' : 'grey darken-3'" small v-if="binanceInstalled && binanceConnected">
        <img src="/img/icons/binance.png" style="max-width:22px;max-height:22px;padding-right:10px;text-transform: none !important;"/>Connected
      </v-btn>

      <v-btn :disabled="isMobileDevice" :style="dark ? 'width:190px;color:#212121' : 'width:190px;color:#EEEEEE'" @click="enableEthereumButton" depressed :color="dark ? 'grey lighten-3' : 'grey darken-3'" small v-if="binanceInstalled && !binanceConnected">
        <img src="/img/icons/binance.png" style="max-width:22px;max-height:22px;padding-right:10px"/>Connect
      </v-btn>

      <v-btn :disabled="isMobileDevice" :style="dark ? 'width:190px;color:#212121' : 'width:190px;color:#EEEEEE'" @click="startBinaceOnboarding" depressed :color="dark ? 'grey lighten-3' : 'grey darken-3'" small v-if="!binanceInstalled">
        <img src="/img/icons/binance.png" style="max-width:22px;max-height:22px;padding-right:10px"/>{{ isMobileDevice ? 'Install Binance Wallet' : 'Install Binance Chain Wallet'}}
      </v-btn>

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

        <v-layout pa-4 >
          <v-text-field
            v-model="getUser.displayName"
            label="Display Name"
            placeholder="Please, enter your name"
            maxlength="50"
            outlined
            v-on:keyup="submitDisplayNameClicked"
            @click:append="submitDisplayNameClicked('click')"
            :rules="[v => !!v]"
          ></v-text-field>
        </v-layout>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :disabled="getUser.displayName.length < 1 && getUser.displayName !== ' ' && getUser.displayName !== '  '"
            :color="dark ? '#388E3C' : 'green lighten-4'"
            @click="submitDisplayName"
          >
            Submit
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
  import MetaMaskOnboarding from '@metamask/onboarding'
  const onboarding = new MetaMaskOnboarding()
  const generate = require('project-name-generator');
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
    watch: {
      isBinConnected () {
        if (!this.isBinConnected) {
          store.commit('SetBinanceChanges', {
            accounts: [],
            binanceConnected: false,
            walletProvider: '',
            isLoggedIn: false,
          })
          firebase.auth().signOut()
        }
      }
    },
    data(){
      return {
        userExists: false,
        isBinConnected: false,
        resultInterval: null,
        setDisplayNameDialog: false
      }
    },
    computed: {
      // getLanguage () {
        // return this.$store.state.user.language
      // },
      getAccounts () {
        return this.$store.state.user.accounts
      },
      binanceConnected () {
        return this.$store.state.user.binanceConnected
      },
      binanceInstalled () {
        return this.$store.state.user.binanceInstalled
      },
      getUser () {
        return this.$store.state.user
      }
    },
    beforeDestroy () {
      clearInterval(this.resultInterval)
    },
    destroyed () {
      // window.removeEventListener('resize', this.handleResize)
    },
    created() {
      setTimeout(() => {
        this.init('init')
      }, 2000)
    },
    methods:{
      init (type) {
        // console.log(window.BinanceChain)
        if (this.getAccounts && this.getAccounts.length > 0) {
          // console.log('####### this.getAccounts in Binance connect ########')
          // console.log(this.getAccounts)
          store.commit('SetBinanceInstalled', {
            binanceInstalled: true,
          })
          if (type === 'changed') {
            this.enableEthereumButton()
          }
          // onboarding.stopOnboarding()
          // this.enableEthereumButton()
          // MetaMask Connected next View
        } else if (typeof window.BinanceChain !== 'undefined') {
          // console.log('Binance is installed!')
          store.commit('SetBinanceInstalled', {
            binanceInstalled: true,
          })
          // console.log(!this.binanceConnected)
          // console.log(type)
          // console.log(this.getUser.walletProvider)
          if (!this.binanceConnected && type === 'init' && this.getUser.walletProvider === 'BinanceChainWallet') {
            this.enableEthereumButton()
          } else {
            store.commit('SetConnectedUserFalse', {
              welcome: false
            })
          }
        } else {
          // console.log('Binance Start Onboarding!')
          store.commit('SetBinanceInstalled', {
            binanceInstalled: false,
          })
          store.commit('SetConnectedUserFalse', {
            welcome: false
          })
          // onboarding.startOnboarding()
        }
      },
      startOnboarding () {
        onboarding.startOnboarding()
      },
      startBinaceOnboarding () {
        // onboarding.startOnboarding()
        window.open('https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp', '_blank')
      },
      submitDisplayName () {
        let obj = {
          name: this.getUser.displayName
        }
        this.saveSettingsData(obj)
        // Update Display Name
        this.currentUser.updateProfile({
          displayName: this.getUser.displayName
        }).then(function () {
          // Update successful.
          // console.log('Display Name Updated')
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
      disconnectBinance () {
        window.Binance.request({
          method: "eth_requestAccounts",
          params: [
            {
              eth_accounts: {}
            }
          ]
        })
        store.commit('SetBinanceChanges', {
          accounts: [],
          binanceConnected: false,
          walletProvider: '',
          isLoggedIn: false,
        })
        firebase.auth().signOut()
      },
      enableEthereumButton () {
        const connectWallet = async () => {
          if (window.BinanceChain) { //check if Metamask is installed
            try {
              const address = await window.BinanceChain.request({ method: 'eth_requestAccounts' }) //connect Metamask
              const obj = {
                connectedStatus: true,
                status: "Connected",
                address: address
              }
              // console.log(obj)
              return obj;

            } catch (error) {
              return {
                connectedStatus: false,
                status: "Connect to Binance Chain Wallet using the button on the top right."
              }
            }

          } else {
            return {
              connectedStatus: false,
              status: "You must install Binance Chain Wallet into your browser: https://www.binance.com/en/wallet-direct"
            }
          }
        }
        let nw
        window.BinanceChain.request({ method: 'net_version' })
        .then((nwId) => {
          nw = parseInt(nwId).toString(16)

          Promise.resolve(connectWallet())
          .then(result => {
            // console.log(result.connectedStatus)
            // console.log(result.address)
            // console.log(result.status)
            // Set the user in the store
            // console.log(nw)
            if (result.connectedStatus) {
              store.commit('SetUserDetails', {
                accounts: result.address,
                walletProvider: 'BinanceChainWallet',
                binanceConnected: true,
                binanceInstalled: true,
                mmConnected: false,
                mmInstalled: this.getUser.mmInstalled,
                walletConnected: false,
                isDAppReady: true,
                networkChainID: '0x' + nw
              })
            }
            // console.log(this.getUser.networkChainID)
            // lookup account with address in firebase users
            if (result.connectedStatus) {
              let userAddress = result.address
              let usersRef = db.collection('users')
              usersRef.where('accounts', 'array-contains', userAddress[0]).orderBy('created', 'asc').limit(1).get()
                .then(snapshot => {
                  // console.log(snapshot)
                  if (snapshot.empty) {
                    // console.log('No matching user!')
                    this.userExists = false
                    // this.loading = false
                    // Create user record in 'users' bucket
                    let funkyName = generate().dashed
                    this.emailAddress = funkyName + '@mememaster.app'
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
                            isVerified: this.currentUser.emailVerified ? this.currentUser.emailVerified : this.userData.isVerified,
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

                          this.$store.dispatch('setUserTier', { address: userAddress[0] })
                            .then(() => {
                              // console.log('Sign in logged in db')
                            }).catch(error => {
                              console.log(error)
                            })

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
                        isVerified: this.currentUser.emailVerified ? this.currentUser.emailVerified : this.userData.isVerified,
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

                      this.$store.dispatch('setUserTier', { address: userAddress[0] })
                        .then(() => {
                          // console.log('Sign in logged in db')
                        }).catch(error => {
                          console.log(error)
                        })
                    }
                  })
                })
                .catch(err => {
                  this.loading = false
                  console.log('Error getting documents.', err)
                  // show friendly error in user screen
                })
            }
          }).catch(error => {
            console.log(error)
          })
        })
        .catch((error) => console.log(error))

        if (typeof window.BinanceChain !== 'undefined' && this.getUser.mmCount === 0) {

          // console.log('################ Adding Listeners ################')

          this.resultInterval = setInterval(() => {
            // console.log(window.BinanceChain.isConnected())
            this.isBinConnected = window.BinanceChain.isConnected()
          }, 30000)

          window.BinanceChain.on('accountsChanged', (accounts) => {
            // Time to reload your interface with accounts[0]!
            // console.log('Binance Account Changed')
            // console.log(accounts)
            if (!accounts.length) {
              store.commit('SetBinanceChanges', {
                accounts: [],
                binanceConnected: false,
                walletProvider: '',
                isLoggedIn: false,
              })
              firebase.auth().signOut()
            }
            setTimeout(() => {
              this.init('changed')
            }, 2000)
          })

          window.BinanceChain.on('disconnect', (message) => {
            console.log('Disconnected', message)
            // Handle the new disconnect
          })

          window.BinanceChain.on('chainChanged', (chainId) => {
            // console.log('Binance chainId changed', chainId)
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            store.commit('SetNetworkChainID', {
              networkChainID: chainId
            })
          })
          store.commit('SetCount', {
            mmCount: this.getUser.mmCount + 1
          })
        }
      }
    }
  }
</script>
