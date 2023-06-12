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
    <v-snackbar
      :color="snackbarColor"
      v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import firebase from 'firebase/app'
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
        this.snackbar = true;
        this.snackbarColor = "green";
        this.snackbarText = "You are online!"
      }else{
        this.isOnline = false
        this.snackbar = true;
        this.snackbarColor = "red";
        this.snackbarText = "You are offline!"
      }
    },
    isOnline(v){
      if(v){
        alert('Online Status: Online');
      }else{
        alert('Online Status: Offline');
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