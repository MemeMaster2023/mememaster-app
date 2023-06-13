<template>
  <router-view 
    style="margin-top:-64px"
    :windowWidth="window.width"
    :windowHeight="window.height"
    :isMobileDevice="isMobileDevice"
    :drawer="getDrawer"
  />

  <v-dialog
      v-model="switchNWDialog"
      transition="dialog-bottom-transition"
      :width="isMobileDevice ? 'auto' : 500"
      persistent
    >
        <v-card theme="dark">
          <v-toolbar
            color="deep-purple-darken-4"
            title="Switch Network"
          ></v-toolbar>
          <v-card-text>
            <div class="text-h6 pt-4">You are currently connected to <span style="text-transform: capitalize;">{{ getNetworkName() }}</span></div>
            <div class="pt-1 pb-2">Please switch to the Ethereum Mainnet</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              variant="outlined"
              color="indigo-lighten-2"
              prepend-icon="mdi-swap-horizontal-bold"
              @click="addETHNetwork"
            >
             Switch Network
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
      v-model="setDisplayNameDialog"
      persistent
      max-width="400"
    >
      <v-card pa-4 theme="dark">
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

    <v-snackbar
      :color="snackbarColor"
      :timeout="isOnline ? 3000 : -1"
      v-model="snackbar"
    >
    <v-icon v-if="!isOnline">mdi-alert-outline</v-icon>
    <v-icon v-if="isOnline">mdi-check-circle-outline</v-icon>
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          v-if="isOnline"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '@/main'
// import { scroller } from 'vue-scrollto/src/scrollTo';
import WalletConnect from '@walletconnect/client';
import { isMobile } from 'mobile-device-detect';
export default {
  name: 'App',
  props: {},
  data: () => ({
    dark: true,
    isMobileDevice: false,
    switchNWDialog: false,
    setDisplayNameDialog: false,
    ageConfirm: false,
    window: {
      width: 0,
      height: 0,
    },
    isShowLogin: false,
    name: '',
    snackbarText: "",
    snackbarColor: "green",
    snackbarTimeout: 2000,
    snackbar: false,
    snackbarError: false,
    isOnline: true,
    isShowContact: false,
    dialogFilePreview: false,
    fileName: '',//'http://docs.google.com/gview?url=',
    online: navigator.onLine,
    isOnline: true,
    networkNames: [
    { id: 1, name: 'ethereum mainnet' },    
    { id: 2, name: 'morden testnet (deprecated)' },
    { id: 3, name: 'ropsten testnet' },
    { id: 4, name: 'rinkeby testnet' },
    { id: 5, name: 'goerli testnet' },
    { id: 11155111, name: 'sepolia testnet' },
    { id: 10, name: 'optimism mainnet' },
    { id: 69, name: 'optimism kovan testnet' },
    { id: 42, name: 'kovan testnet' },
    { id: 137, name: 'matic/polygon mainnet' },
    { id: 80001, name: 'matic/polygon mumbai testnet' },
    { id: 250, name: 'fantom mainnet' },
    { id: 100, name: 'xdai mainnet' },
    { id: 56, name: 'bsc mainnet' }
    ]
  }),
  components: {

  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.isMobileDevice = isMobile;
    console.log('###### this.isMobileDevice App ##########')
    console.log(this.isMobileDevice)
    setTimeout(() => {
      let uid = '';
      const user = firebase.auth().currentUser;
      if(!user){
        uid = localStorage.getItem('mm-uid');
      }else{
        uid = user.uid;
      }
      this.$store.dispatch("getUser", uid);
    }, 2000);
    if (this.getChain !== '0x1') {
      this.switchNWDialog = true
      // this.addETHNetwork()
    }
  },
  computed: {
    getDrawer () {
      return this.$store.state.drawer
    },
    getUser () {
      return this.$store.state.user
    },
    displayName () {
      return this.$store.state.user.displayName
    },
    getChain () {
      return this.$store.state.user.networkChainID
    },
    mmConnected () {
      return this.$store.state.user.mmConnected
    },
    walletConnected () {
      return this.$store.state.user.walletConnected
    }
  },
  watch: {
    online(v) {
      if (v) {
        this.isOnline = true
      }else{
        this.isOnline = false
      }
    },
    isOnline(v){
      if(v){
        this.snackbar = true;
        this.snackbarColor = "green";
        this.snackbarText = "You are back online!"
      }else{
        this.snackbar = true;
        this.snackbarColor = "red";
        this.snackbarText = "You are offline!"
      }
    },
    displayName () {
      if (this.displayName === '' && (this.mmConnected || this.walletConnected)) {
        setTimeout(() => {
          this.setDisplayNameDialog = true
        }, 1000);
      }
    },
    getChain () {
      console.log('######### this.getChain ############')
      console.log(this.getChain)
      if (this.getChain !== '0x1' && (this.mmConnected || this.walletConnected)) {
        this.switchNWDialog = true
        // this.addETHNetwork()
      } else {
        this.switchNWDialog = false
      }
    }
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
  },
  methods: {
    routerGo(route) {
      /* if (this.isMobileDevice) {
        console.log("this.drawer = false");
        setTimeout(() => {
          this.drawer = false;
        }, 500);
      } */
      // console.log(this.$router.currentRoute.path)
      // console.log(route)
      if(this.isMobileDevice){
        this.drawer = false;
      }
      if (this.$router.currentRoute.path !== route) {
        this.$router.push(route);
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      /* console.log('this.window.height')
      console.log(this.window.height)
      console.log('this.window.width')
      console.log(this.window.width) */
      // this.window.width > 770 ? this.drawer = false : this.drawer = true
    },
    logout() {
      this.$store.dispatch('logout');
    },
    getWeek () {
      return dateformat(new Date(), 'WW')
    },
    changeLanguage(lang){
      this.$store.commit('SetCurrentLanguage', lang)
    },
    updateOnlineStatus(e) {
      console.log(e);
      const { type } = e
      this.online = type === 'online'
    },
    submitDisplayName () {
      this.currentUser = firebase.auth().currentUser
      let obj = {
        name: this.getUser.displayName,
        consent_13_years: true
      }
      this.saveSettingsData(obj)
      // Update Display Name
      this.currentUser.updateProfile({
        displayName: this.getUser.displayName
      }).then(() => {
        // Update successful.
        console.log('Display Name Updated - Firebase')
        this.setDisplayNameDialog = false
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
    getNetworkName () {
      let nwId = parseInt(this.getChain, 16)
      if  (this.networkNames.findIndex(item => item.id === nwId)  === -1) {
        return 'another network'
      }
      return this.networkNames.find(item => item.id === nwId).name
    },
    async addETHNetwork () {
      // console.log(this.getUser.walletProvider)
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x1', // A 0x-prefixed hexadecimal string
                chainName: 'Ethereum Mainnet',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH', // 2-6 characters long
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                blockExplorerUrls:['https://etherscan.io/']
              }],
            })
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }
  }
}
</script>