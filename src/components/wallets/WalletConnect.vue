<template>
  <div id="walletconnect">

    <v-row v-if="buttonType === 'large'" :class="isMobileDevice && !mmMobileApp ? 'pt-2 ml-0 mr-0' : 'pt-2'">

      <v-btn style="width:100%;" size="large" color="blue lighten-5" v-if="walletConnected">
        <img src="/img/icons/walletconnect_light.png" style="max-width:32px;padding-right:10px;text-transform: none !important;"/>Connected
      </v-btn>

      <v-btn style="width:100%;" size="large" color="blue lighten-5" @click="walletConnectInit('button')" v-if="!walletConnected">
        <img src="/img/icons/walletconnect_light.png" style="max-width:32px;padding-right:10px"/>Wallet Connect
      </v-btn>
      <!-- <w3m-core-button></w3m-core-button> -->

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

  </div>
</template>

<script>
  import store from '@/store/index'
  import firebase from "firebase/app"
  import "firebase/auth"
  import { db } from '@/main'
  // import WalletConnect from "@walletconnect/client";
  // import QRCodeModal from "@walletconnect/qrcode-modal"
  import { generate } from 'project-name-generator';
  // import {EthereumProvider} from '@walletconnect/ethereum-provider'

  // import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
  // import { Web3Modal } from '@web3modal/html'
  // import { configureChains, createConfig, connect, disconnect, watchAccount } from '@wagmi/core'
  // import { arbitrum, mainnet, polygon } from '@wagmi/core/chains'
  // import { InjectedConnector } from '@wagmi/core/connectors/injected'

  import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
  import { Web3Modal } from '@web3modal/html'
  import { configureChains, createConfig, watchAccount, getAccount, connect, disconnect } from '@wagmi/core'
  import { arbitrum, mainnet, polygon, goerli } from '@wagmi/core/chains'
  import { InjectedConnector } from '@wagmi/core/connectors/injected'


import { provide } from 'vue'

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
        displayName: '',
        userExists: false,
        accounts: [],
        chainId: 0,
        provider: null,
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
      },
      mmMobileApp () {
        return this.$store.state.user.mmMobileApp
      },
    },
    watch: {
      walletConnected () {
      if (!this.walletConnected) {
          this.disconnectWallet ()
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
      if (!this.walletConnected && this.getUser.walletProvider === 'WalletConnect') {
        this.walletConnectInit('init')
      } else {
        store.commit('SetConnectedUserFalse', {
          welcome: false
        })
      }
    },
    methods:{
      async walletConnectInit (type) {
        // 1. Define chains
        // chain testing

        // chain production
        // const chains = [mainnet]

        let projectId;
        let chains = [mainnet, goerli];
        if (import.meta.env.VITE_APP_ENVIRONMENT === 'production') {
          projectId = import.meta.env.VITE_APP_PROJECT_ID;

        } else {
          projectId = import.meta.env.VITE_APP_PROJECT_ID_TEST;
        }
        const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

        // 2. Set up wagmi config
        const wagmiConfig = createConfig({
          autoConnect: true,
          connectors: w3mConnectors({ projectId, chains }),
          publicClient
        });

        // 3. Create ethereum and modal clients
        const ethereumClient = new EthereumClient(wagmiConfig, chains);
        const web3Modal = new Web3Modal({ projectId , themeVariables: {'--w3m-z-index': '9999'} },ethereumClient);

        if (type === 'button') {
          console.log('button clicked');
          web3Modal.openModal()
        } else {
          console.log('init')
        }

        watchAccount(async ({ address, connector, isConnected }) => {
          console.log('hello watchAccount',isConnected, address, connector)
          if (isConnected) {
            this.accounts = [address];
            this.chainId = connector.chains[0].id
            this.enableWalletConnect()
          } else {
            this.disconnectWallet()
          }
        })


      //   if (type === 'button') {
      //     this.provider = await EthereumProvider.init({
      //       projectId,
      //       chains: [1],
      //       showQrModal: true, // REQUIRED set to "true" to use @walletconnect/modal,
      //       qrModalOptions:{
      //         themeVariables:{
      //           "--wcm-z-index": "9999"
      //         }
      //       },
      //     });
      //     await this.provider.connect();
      //   } else {
      //     const savedChainId = localStorage.getItem('chainId');
      //     // console.log("Reconnecting with saved chainId:", savedChainId);
      //     // let walletconnect = JSON.parse(this.getUser.walletconnect)
      //     this.provider = await EthereumProvider.init({
      //       projectId,
      //       chains: [savedChainId],
      //     })
      //     await this.provider.enable();
      //     this.accounts = this.provider.accounts;
      //     this.chainId = this.provider.chainId;
      //     this.enableWalletConnect()
      //   }

      //   // session established
      //   this.provider.on("connect", (chainId) => {
      //     console.log('Wallet is connect', chainId)
      //     this.enableWalletConnect()
      //   });

      //   //  Attach event listeners before connecting
      //   this.provider.on("accountsChanged", (accounts) => {
      //     console.log("Accounts changed:", accounts);
      //     // Update your application with the new accounts
      //     this.accounts = accounts
      //   });

      //   // chain changed
      //   this.provider.on("chainChanged", (chainId) => {
      //     console.log("Chain changed:", chainId);
      //     // Update your application with the new chain

      //   });

      //   // connection uri
      //   this.provider.on("display_uri", (payload)=>{
      //     console.log("display_uri:", payload)
      //   });

      //   // session event - chainChanged/accountsChanged/custom events
      //   this.provider.on("session_event",(payload) => {
      //     console.log('Wallet is session_event', payload)
      //     // Get provided accounts and chainId
      //     // this.chainId =  payload.params.chainId
      //     this.accounts = this.provider.accounts;
      //     this.chainId = this.provider.chainId;
      //     localStorage.setItem('chainId', payload.params.chainId);
      //     this.enableWalletConnect()
      //     // Do the rest of the store and firebase stuff
      //   });

      //   // session disconnect
      //   this.provider.on("disconnect",(payload) => {
      //     console.log('Wallet is disconnect', payload)
      //     this.provider = null
      //     store.commit('SetWalletConnectChanges', {
      //       accounts: [],
      //       walletConnected: false,
      //       walletProvider: '',
      //       isLoggedIn: false,
      //       isEmailConnected: false,
      //       uid: '',
      //     })
      //     localStorage.clear();
      //     firebase.auth().signOut()
      //     store.commit("SetEmpty")
      //   });
      // },
      // async walletConnectInit (type) {
      //   console.log(type)
      //   if (type === 'button') {
      //     this.connector = new WalletConnect({
      //       bridge: "https://bridge.walletconnect.org", // Required
      //       qrcodeModal: QRCodeModal,
      //     })
      //   } else {
      //     // TODO
      //     let walletconnect = JSON.parse(this.getUser.walletconnect)
      //     this.connector = new WalletConnect(walletconnect)
      //     this.enableWalletConnect()
      //   }

      //   // Check if connection is already established
      //   if (!this.connector.connected) {
      //     // create new session
      //     this.connector.createSession()
      //     // this.enableWalletConnect()
      //   }

      //   // Subscribe to connection events
      //   this.connector.on('connect', (error, payload) => {
      //     if (error) {
      //       throw error;
      //     }
      //     // Get provided accounts and chainId
      //     // console.log(payload.params[0])
      //     // const { accounts, chainId } = payload.params[0]
      //     this.accounts = payload.params[0].accounts
      //     this.chainId = payload.params[0].chainId
      //     // Do the rest of the store and firebase stuff
      //     this.enableWalletConnect()
      //   })

      //   this.connector.on('session_update', (error, payload) => {
      //     if (error) {
      //       throw error;
      //     }

      //     // Get updated accounts and chainId
      //     // console.log(payload.params[0])
      //     // const { accounts, chainId } = payload.params[0];
      //     this.accounts = payload.params[0].accounts
      //     this.chainId = payload.params[0].chainId
      //     // Do the rest of the store and firebase stuff
      //     this.enableWalletConnect()
      //   })

      //   this.connector.on('disconnect', (error, payload) => {
      //     if (error) {
      //       throw error;
      //     }
      //     // Delete connector
      //     console.log(payload.params[0])
      //     this.connector = null
      //     // Do the store remove stuff
      //     store.commit('SetWalletConnectChanges', {
      //       accounts: [],
      //       walletConnected: false,
      //       walletProvider: '',
      //       isLoggedIn: false,
      //       isEmailConnected: false,
      //       uid: '',
      //     })
      //     firebase.auth().signOut()
      //     store.commit("SetEmpty")
      //   })
      },
      disconnectWallet () {
        disconnect();
        console.log('===== localStorage.clear ======')
        console.log('===== localStorage.clear ======')
        console.log('===== localStorage.clear ======')
        localStorage.clear();
        console.log(JSON.stringify(localStorage))
        store.commit('SetWalletConnectChanges', {
          accounts: [],
          walletConnected: false,
          walletProvider: '',
          isLoggedIn: false,
          isEmailConnected: false,
          uid: ''
        })
        firebase.auth().signOut()
      },
      enableWalletConnect () {
        console.log('########### is this code happening ###########')
        console.log('This is enableWalletConnect:', this.accounts, this.chainId)

        var nw = parseInt(this.chainId).toString(16)

        store.commit('SetUserDetails', {
          accounts: this.accounts,
          walletProvider: 'WalletConnect',
          mmConnected: false,
          twConnected: false,
          twInstalled: false,
          mmInstalled: this.getUser.mmInstalled,
          binanceConnected: false,
          binanceInstalled: this.getUser.binanceInstalled,
          walletConnected: true,
          isDAppReady: true,
          networkChainID: '0x' + nw
        })

        let userAddress = this.accounts[0].toLowerCase()

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
              this.emailAddress = funkyName + '@mememaster.app'
              firebase.auth().createUserWithEmailAndPassword(this.emailAddress, userAddress).then(
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
                      isVerified: this.currentUser.emailVerified ? this.currentUser.emailVerified : this.userData.isVerified,
                      idVerified: this.userData.id_verified,
                      phoneVerified: this.userData.phone_verified,
                      accLevel: this.userData.acc_level,
                      accType: this.userData.acc_type,
                      accStatus: this.userData.status,
                      credits: this.userData.credits ?? 500,
                      memberSince: this.userData.created,
                      favorites: this.userData.favorites,
                      welcome: this.userData.welcome,
                      version: this.userData.version ?? import.meta.env.VITE_APP_VERSION
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
                  isVerified: this.currentUser.emailVerified ? this.currentUser.emailVerified : this.userData.isVerified,
                  idVerified: this.userData.id_verified,
                  phoneVerified: this.userData.phone_verified,
                  accLevel: this.userData.acc_level,
                  accType: this.userData.acc_type,
                  accStatus: this.userData.status,
                  credits: this.userData.credits ?? 0,
                  memberSince: this.userData.created,
                  favorites: this.userData.favorites,
                  welcome: this.userData.welcome,
                  version: this.userData.version ?? import.meta.env.VITE_APP_VERSION
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
    }
  }
</script>

<style lang="scss">
.wrap-text {
  word-break: normal;
}
</style>
