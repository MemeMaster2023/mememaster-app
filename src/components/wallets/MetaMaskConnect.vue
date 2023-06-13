<template>
  <div id="metamask">

    <v-row v-if="buttonType === 'large'">

      <v-btn style="width:100%;" size="large" color="deep-purple-lighten-4" v-if="mmInstalled && mmConnected">
        <img src="/img/icons/metamask.png" style="max-width:32px;padding-right:10px;text-transform: none !important;"/>Connected To Metamask
      </v-btn>

      <!-- :disabled="isMobileDevice" -->
      <v-btn style="width:100%;" size="large" color="deep-purple-lighten-4" @click="enableEthereumButton" v-if="mmInstalled && !mmConnected">
        <img src="/img/icons/metamask.png" style="max-width:32px;padding-right:10px"/>Metamask
      </v-btn>

      <!-- :disabled="isMobileDevice" -->
      <v-btn  style="width:100%;" size="large" color="deep-purple-lighten-4" @click="startOnboarding" v-if="!mmInstalled">
        <img src="/img/icons/metamask.png" style="max-width:32px;padding-right:10px"/>Install Metamask
      </v-btn>

    </v-row>

    <v-row  v-if="buttonType === 'small'">

      <v-btn :style="dark ? 'width:190px;color:#212121' : 'width:190px;color:#EEEEEE'" depressed :color="dark ? 'grey lighten-3' : 'grey darken-3'" small v-if="mmInstalled && mmConnected">
        <img src="/img/icons/metamask.png" style="width:24px;height:22px;padding-right:10px;text-transform: none !important;"/>Connected
      </v-btn>

      <!-- :disabled="isMobileDevice" -->
      <v-btn  :style="dark ? 'width:190px;color:#212121' : 'width:190px;color:#EEEEEE'" @click="enableEthereumButton" depressed :color="dark ? 'grey lighten-3' : 'grey darken-3'" small v-if="mmInstalled && !mmConnected">
        <img src="/img/icons/metamask.png" style="width:24px;height:22px;padding-right:10px"/>Connect
      </v-btn>

      <v-btn :style="dark ? 'width:190px;color:#212121' : 'width:190px;color:#EEEEEE'" @click="startOnboarding" depressed :color="dark ? 'grey lighten-3' : 'grey darken-3'" small v-if="!mmInstalled">
        <img src="/img/icons/metamask.png" style="width:24px;height:22px;padding-right:10px"/>Install Metamask
      </v-btn>

    </v-row>

  </div>
</template>

<script>
  import store from '@/store/index'
  import firebase from "firebase/app"
  import "firebase/auth"
  import { db } from '@/main'
  import MetaMaskOnboarding from '@metamask/onboarding'
  const onboarding = new MetaMaskOnboarding()
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
        userExists: false,
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
      mmConnected () {
        return this.$store.state.user.mmConnected
      },
      mmInstalled () {
        return this.$store.state.user.mmInstalled
      },
      getUser () {
        return this.$store.state.user
      }
    },
    watch: {
     mmConnected () {
      if (!this.mmConnected) {
          this.disconnectMetamask ()
        }
      }
      /* binanceConnected () {
        if (this.binanceConnected) {
          setTimeout(() => {
            this.connectWalletDialog = false
          }, 2000)
        }
      },
      walletConnected () {
        if (this.walletConnected) {
          setTimeout(() => {
            this.connectWalletDialog = false
          }, 2000)
        }
      } */
    },
    created() {
      this.init('init')
    },
    methods:{
      init (type) {
        console.log('this.getAccounts after disconnect')
        console.log(this.getAccounts)
        if (this.getAccounts && this.getAccounts.length > 0) {
          console.log('####### this.getAccounts in MM connect ########')
          console.log(this.getAccounts)
          store.commit('SetMetaMaskInstalled', {
            mmInstalled: true,
          })
          if (type === 'changed') {
            this.enableEthereumButton()
          }
          onboarding.stopOnboarding()
          // this.enableEthereumButton()
          // MetaMask Connected next View
        } else if (typeof window.ethereum !== 'undefined') {
          console.log('MetaMask is installed!')
          store.commit('SetMetaMaskInstalled', {
            mmInstalled: true,
          })
          console.log(!this.mmConnected)
          console.log(type)
          console.log(this.getUser)
          console.log(this.getUser.walletProvider)
          if (!this.mmConnected && type === 'init' && this.getUser.walletProvider === 'MetaMask') {
            this.enableEthereumButton()
          } else {
            store.commit('SetConnectedUserFalse', {
              welcome: false
            })
          }
        } else {
          // console.log('MetaMask Start Onboarding!')
          store.commit('SetMetaMaskInstalled', {
            mmInstalled: false,
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
          console.log('Display Name Updated - Firebase')
        }, (error) => {
          // An error happened.
          console.log(error)
        })
      },
      submitDisplayNameClicked (e) {
        // console.log(e)
        // console.log(this.getUser.displayName)
        // console.log(this.getUser.displayName.length)
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
              // this.setDisplayNameDialog = false
            })
          .catch(error => {
              console.log(error)
            })
      },
      disconnectMetamask () {
        window.ethereum.request({
          method: "eth_requestAccounts",
          params: [
            {
              eth_accounts: {}
            }
          ]
        })
        store.commit('SetMetaMaskChanges', {
          accounts: [],
          mmConnected: false,
          walletProvider: '',
          isLoggedIn: false,
          isEmailConnected: false,
          uid: ''
        })
        console.log('disconnectMetamask SetMetaMaskChanges ')
        firebase.auth().signOut()
      },
      enableEthereumButton () {
        const connectWallet = async () => {
          if (window.ethereum) { //check if Metamask is installed
            try {
              const address = await window.ethereum.request({ method: 'eth_requestAccounts' }) //connect Metamask
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
                status: "🦊 Connect to Metamask using the button on the top right."
              }
            }

          } else {
            return {
              connectedStatus: false,
              status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
            }
          }
        }
        var nw
        window.ethereum.request({ method: 'net_version' })
        .then((nwId) => {
          console.log(nwId)
          nw = parseInt(nwId).toString(16)
          console.log(nw)

          Promise.resolve(connectWallet())
          .then(result => {
            // console.log(result.connectedStatus)
            // console.log(result.address)
            // console.log(result.status)
            // Set the user in the store
            if (result.connectedStatus) {
              store.commit('SetUserDetails', {
                accounts: result.address,
                walletProvider: 'MetaMask',
                mmConnected: true,
                mmInstalled: true,
                binanceConnected: false,
                binanceInstalled: this.getUser.binanceInstalled,
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
                          this.$store.dispatch('insertUserForSignUp', dispatchObj)
                            .then(() => {
                              console.log('User Created in db - Set Display name')
                              // this.setDisplayNameDialog = true
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
                            // accLevel: this.userData.acc_level,
                            accType: this.userData.acc_type,
                            accStatus: this.userData.status,
                            credits: this.userData.credits ?? 0,
                            memberSince: this.userData.created,
                            favorites: this.userData.favorites,
                            welcome: this.userData.welcome
                          })
                          // console.log('Set User Details in Store success!')
                          if (this.getUser.displayName === '') {
                            // this.setDisplayNameDialog = true
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
                        // accLevel: this.userData.acc_level,
                        accType: this.userData.acc_type,
                        accStatus: this.userData.status,
                        credits: this.userData.credits ?? 0,
                        memberSince: this.userData.created,
                        favorites: this.userData.favorites,
                        welcome: this.userData.welcome
                      })
                      // console.log('Set User Details in Store success!')
                      if (this.getUser.displayName === '') {
                        // this.setDisplayNameDialog = true
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
          }).catch(error => {
            console.log(error)
          })
        })
        .catch((error) => console.log(error))


        if (typeof window.ethereum !== 'undefined' && this.getUser.mmCount === 0) {
          window.ethereum.on('accountsChanged', (accounts) => {
            // Time to reload your interface with accounts[0]!
            // console.log('Account Changed')
            // console.log(accounts)
            if (!accounts.length) {
              store.commit('SetMetaMaskChanges', {
                accounts: [],
                mmConnected: false,
                walletProvider: '',
                isLoggedIn: false,
                isEmailConnected: this.getUser.isEmailConnected,
                uid: this.getUser.uid
              })
              firebase.auth().signOut()
            }
            setTimeout(() => {
              this.init('changed')
            }, 2000)
          })

          window.ethereum.on('disconnect', (message) => {
            console.log('Disconnected', message)
            // Handle the new disconnect
          })

          window.ethereum.on('chainChanged', (chainId) => {
            // console.log('chainId changed', chainId)
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

<style lang="scss">
.wrap-text {
  word-break: normal;
}
</style>
