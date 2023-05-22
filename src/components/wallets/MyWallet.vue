<template>
  <div id="wallet" :style="dark ? 'background-color:#000;height:120%;margin-top:-65px;' : 'background-color:#FFF;height:' + windowHeight + 'px;margin-top:-65px;'">
    <v-slide-y-transition mode="out-in">

      <!-- ####################### SKELETON LOADERS ####################### -->

      <v-layout column pa-4 v-if="loading">
        <p class="mt-4"></p>
        <p class="mt-4"></p>

        <v-skeleton-loader
          class="mx-auto"
          width="100%"
          type="card"
          :dark="dark"
        ></v-skeleton-loader>
        <p class="mt-0"></p>
        <v-skeleton-loader
          class="mx-auto"
          width="100%"
          type="card-heading"
          :dark="dark"
        ></v-skeleton-loader>

      </v-layout>

      <!-- ####################### COMPONENTS ####################### -->
      <v-layout column pa-4 v-else>
        <p class="mt-4"></p>
        <p class="mt-4"></p>

        <v-card
          class="mx-auto"
          width="100%"
          :height="windowWidth < 800 ? '310' : '280'"
          outlined
          :color="dark ? 'grey darken-4' : ''"
          :dark="dark"
        >
          <v-card-actions>
            <v-layout>
              <v-img v-if="dark" :src="logoSrcWalletDark" max-width="48" height="48"></v-img>
              <v-img v-if="!dark" :src="logoSrcWalletLight" max-width="48" height="48"></v-img>
              <v-spacer></v-spacer>
              <span style="padding-top:10px" class="title">Welcome, {{ getUser.displayName }}</span>
              <v-spacer></v-spacer>
              <v-btn icon style="margin-top:10px"><v-icon>mdi-send</v-icon></v-btn>
            </v-layout>
          </v-card-actions>
          <v-divider ></v-divider>
          <v-card-actions>
            <v-layout row wrap align-center pa-2>
              <v-layout column :align-center="windowWidth < 800" :style="windowWidth < 800 ? '' : 'margin-left:100px'">
                <span class="subtitle-1">{{ mmConnected ? 'Connected to MetaMask' : binanceConnected ? 'Connected to Binance' : 'Wallet not Connected' }}</span>
                <span :class="windowWidth < 800 ? 'subtitle-2' : 'subtitle-1'">{{ getAccounts[0] }}</span>
              </v-layout>
              <v-layout column :align-center="windowWidth < 800">
                <span :class="windowWidth < 800 ? 'subtitle-2 font-weight-regular' : 'subtitle-1 font-weight-regular'">Balance: {{ balance }} {{ this.connectedNw === 'BSC' ? 'BNB' : this.connectedNw  }}</span>
                <span :class="windowWidth < 800 ? 'subtitle-2 font-weight-regular' : 'subtitle-1 font-weight-regular'">Token Balance: {{ numberWithCommas(tokenBalance) }} TMO</span>
              </v-layout>
            </v-layout>
          </v-card-actions>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined  style="height:50px;border-radius:5px;" :disabled="loading" >
                <v-badge
                  v-if="unreadMessages > 0"
                  color="red"
                  overlap
                >
                <span slot="badge">{{unreadMessages}}</span>
                <v-icon>mdi-message-text-outline</v-icon></v-badge>
                <v-icon v-else>mdi-message-text-outline</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outlined style="height:50px;border-radius:5px;" :disabled="loading" >
                <v-badge
                  v-if="notifications > 0"
                  color="blue"
                  overlap
                >
                <span slot="badge">{{notifications}}</span>
                <v-icon>mdi-bell-outline</v-icon></v-badge>
                <v-icon v-else >mdi-bell-outline</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outlined style="height:50px;border-radius:5px;" :disabled="loading" >
                <v-icon>mdi-star-outline</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <p class="mt-0"></p>
          <v-divider ></v-divider>
          <v-card-actions>
            <v-layout :style="windowWidth < 770 ? 'padding-top:10px' : 'padding-top:15px'">
              <v-spacer></v-spacer>
              <v-icon color="blue" style="margin-right:5px">mdi-information-outline</v-icon>
              <span :class="windowWidth < 800 ? 'caption font-weight-regular' : 'subtitle-2 font-weight-regular'">TMO Token has not launched yet.</span>
              <v-spacer></v-spacer>
            </v-layout>
          </v-card-actions>
        </v-card>
        <p class="mt-2"></p>
        <!-- <v-text-field
          v-model="search"
          outlined
          :dark="dark"
          placeholder="Seach for anything..."
          maxlength="30"
          single-line
          append-icon="mdi-magnify"
          v-on:keyup="searchClicked"
          @click:append="searchClicked('click')"
        ></v-text-field> -->


      </v-layout >
    </v-slide-y-transition>
  </div>
</template>


<script>
import firebase from 'firebase/app'
import store from '@/store/index'
import MolaNftAPI from '@/clients/MolaNftAPI'
export default {
  name: 'acchome',
  props: {
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number
  },
  data () {
    return {
      lang: this.$store.state.lang,
      loading: false,
      coinbase: '',
      balance: 0,
      tokenBalance: 0,
      connectedNw: '',
      myUploads: 2,
      myDownloads: 3,
      myCollections: 1,
      search: '',
      unreadMessages: 0,
      notifications: 0,
      logoSrcWalletDark: '',
      logoSrcWalletLight: '',
    }
  },
  computed: {
    getPlatform () {
      // console.log(this.$store)
      // return this.$store.getters.state.device.platform
      return this.$store.state.device.platform
    },
    getUser () {
      return this.$store.state.user
    },
    getChain () {
      return this.$store.state.user.networkChainID
    },
    getAccounts () {
      return this.$store.state.user.accounts
    },
    mmConnected () {
      return this.$store.state.user.mmConnected
    },
    binanceConnected () {
      return this.$store.state.user.binanceConnected
    }
  },
  watch: {
    mmConnected () {
      if (!this.mmConnected && !this.binanceConnected) {
        this.balance = 0
      } else {
        this.init()
      }
    },
    binanceConnected () {
      if (!this.mmConnected && !this.binanceConnected) {
        this.balance = 0
      } else {
        this.init()
      }
    },
    getChain () {
      this.init()
    },
    getAccounts () {
      this.init()
    }
  },
  created () {
    store.commit('ShowNav')
    // store.commit('ShowNavApp')
    this.currentUser = firebase.auth().currentUser
    this.logoSrcWalletDark = './img/icons/my_wallet_color_dark.png'
    this.logoSrcWalletLight = './img/icons/my_wallet_color_light.png'
    this.loading = true
    setTimeout(() => {
      this.init()
      this.getTokenBalance()
    }, 2000)
  },
  methods: {
    init() {
      // console.log(firebase.auth().currentUser)
      this.loading = false

      if (this.getUser.networkChainID === '0x38') {
        this.connectedNw = 'BSC'
      } else if (this.getUser.networkChainID === '0x1') {
        this.connectedNw = 'ETH'
      } else if (this.getUser.networkChainID === '0x89') {
        this.connectedNw = 'MATIC'
      }

      if (this.getUser.walletProvider === 'MetaMask' || this.getUser.walletProvider === 'WalletConnect') {
        window.ethereum.request({
          method: 'eth_getBalance',
          params:[
            this.getAccounts[0],
            'latest'
          ],
            id:1
          })
        .then((balance) => {
          console.log(balance)
          this.balance =  Math.round(parseInt(balance, 16) / 100000000000000000 * 10000) / 100000
        })
        .catch((error) => console.log(error))
      } else if (this.getUser.walletProvider === 'BinanceChainWallet') {
        window.BinanceChain.request({
          method: 'eth_getBalance',
          params:[
            this.getAccounts[0],
            'latest'
          ],
            id:1
          })
        .then((balance) => {
          // console.log(balance)
          this.balance =  Math.round(parseInt(balance, 16) / 100000000000000000 * 10000) / 100000
        })
        .catch((error) => console.log(error))
      }
    },
    getTokenBalance () {
      // https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&address=0x89e73303049ee32919903c09e8de5629b84f59eb&tag=latest&apikey=YourApiKeyToken
      let tokenAddress = '0x49c248641eb904c9d5a33904d388212a89218187'
      let walletAddress = this.getAccounts[0]
      let network = 'BSC'
      /* if (this.getUser.networkChainID === '0x38') {
        network = 'BSC'
      } else if (this.getUser.networkChainID === '0x1') {
        network = 'ETH'
      } else if (this.getUser.networkChainID === '0x89') {
        network = 'MATIC'
      } */
      Promise.resolve(MolaNftAPI.getTokenBalance(tokenAddress, walletAddress, network))
      .then(result => {
        console.log(result)
        var balance  = result.data.data.result
        this.tokenBalance = balance / (10**18)
      })
      .catch(err => {
        // this.loading = false
        console.log('Error getting Token Balance.', err)
        // show friendly error in user screen
      })
    },
    searchClicked (e) {
      // console.log('search')
      // console.log(e)
      if (e === 'click' && this.search !== '') {
        // this.searchAll()
        return
      }
      if (e.keyCode === 13 && this.search !== '') {
        // alert('Enter was pressed')
        // this.searchAll()
      }
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }
}
</script>
