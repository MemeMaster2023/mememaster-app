<template>
  <v-navigation-drawer
    v-model="drawer"
    image="/img/home/menu_bg.webp"
    app
    theme="dark"
    location="right"
    :width="isMobileDevice ? windowWidth : 280"
  >

    <v-layout style="margin-left: 90px;">
      <v-spacer></v-spacer>
      <v-btn icon="mdi-window-close"
            variant="plain" 
            @click.stop="drawer = !drawer" style="margin: 10px">
      </v-btn>
  </v-layout>

    <v-layout v-if="!isMobileDevice" style="margin-left: 80px;margin-top:-30px">
      <v-img
        src="/img/logos/logo.png"
        style="max-height: 130px; max-width: 130px;cursor: pointer;"
        @click="routerGo('/')"
      ></v-img>
    </v-layout>
    <v-layout v-if="isMobileDevice" :style="'margin-left:' + ((windowWidth / 2) - 65) + 'px;margin-top:-30px'">
      <v-img
        src="/img/logos/logo.png"
        style="max-height: 130px; max-width: 130px;cursor: pointer;"
        @click="routerGo('/')"
      ></v-img>
    </v-layout>

    <v-layout class="mr-4 ml-4 mt-8 mb-4" v-if="env">
      <v-btn v-if="!mmConnected && !emailConnected"
        variant="outlined"
        color="white"
        theme="dark"
        style="width:100%"
        @click="connectWalletDialog = true"
      >
        Connect
      </v-btn>
      <v-btn v-if="mmConnected"
        variant="outlined"
        color="white"
        theme="dark"
        style="width:100%"
      >
      <img src="/img/icons/metamask.png" style="max-width:32px;padding-right:10px"/>Connected
      </v-btn>
      <v-btn v-if="emailConnected"
        variant="outlined"
        color="white"
        theme="dark"
        style="width:100%"
      >
      <v-icon class="mr-2">mdi-email</v-icon> Connected
      </v-btn>
    </v-layout>

    <v-list nav v-model:opened="open">
      <v-list-item prepend-icon="mdi-home-variant-outline" title="Home" value="home" @click="routerGo('/')"></v-list-item>

      <v-list-group v-if="isLoggedIn" value="account">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle-outline"
            title="My Account"
          ></v-list-item>
        </template>

        <v-list-item
          v-bind="props"
          prepend-icon="mdi-view-grid-plus"
          title="Generate"
          @click="routerGo('/generate/default')"
        ></v-list-item>

        <v-list-item
          v-bind="props"
          prepend-icon="mdi-collage"
          title="My Collections"
          @click="routerGo('/mycollections')"
        ></v-list-item>

        <v-list-item
          v-bind="props"
          @click="routerGo('/mynfts')"
        >
          <v-layout>
            <img src="/img/icons/nfts.png" style="max-width:24px%;max-height:24px;margin-right:32px;"/>
            <v-list-item-title v-text="'My NFTs'" style="margin-top:2px"></v-list-item-title>
          </v-layout>
        </v-list-item>

        <v-list-item
          v-bind="props"
          prepend-icon="mdi-image-edit-outline"
          title="Drafts"
          @click="routerGo('/generate/drafts')"
        ></v-list-item>


      </v-list-group>
        
      <v-list-item prepend-icon="mdi-robot-outline" title="Meme Marketplace" value="mememarket"></v-list-item>
      <!-- <v-list-item prepend-icon="mdi-circle-multiple-outline" title="Token Listings" value="tokens"></v-list-item> -->
      <v-list-item prepend-icon="mdi-transit-connection-variant" title="Roadmap" value="Roadmap" @click="routerGo('/roadmap')"></v-list-item>
      <v-list-item prepend-icon="mdi-chart-arc" title="Tokenomics" value="Tokenomics"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group" title="Team" value="Team"></v-list-item>
      <v-list-item prepend-icon="mdi-head-question-outline" title="FAQ" value="faq"></v-list-item>
      <v-list-item prepend-icon="mdi-at" title="Contact Us" value="contact"></v-list-item>
      <v-list-item prepend-icon="mdi-file-outline" title="Whitepaper" value="whitepaper" @click="openWhitePaper()"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar 
      flat 
      app 
      style="opacity:0.9"
      :color="!scrolled && ($route.name === 'Home' || $route.name === 'Collections') ? 'transparent' : '#000'" 
      class="pa-4"
  >

    <!--<v-layout >
      <v-btn class="menuText" text @click.stop="routerGo('/')">{{ 'HOME' }}</v-btn>
      <span class="menuText" style="margin-top:2px">|</span>
      <v-btn class="menuText" text @click.stop="routerGo('/schedule')">{{ 'PRODUCT' }}</v-btn>
      <span class="menuText" style="margin-top:2px">|</span>
      <v-btn class="menuText" text @click.stop="routerGo('/schedule')">{{ 'FAQ' }}</v-btn>
      <span class="menuText" style="margin-top:2px">|</span>
      <v-btn class="menuText" text @click.stop="routerGo('/schedule')">{{ 'ABOUT' }}</v-btn>
      <span class="menuText" style="margin-top:2px">|</span>
      <v-btn class="menuText" text @click.stop="routerGo('/schedule')">{{ 'CONTACT' }}</v-btn>
      <span class="menuText" style="margin-top:2px">|</span>
      <v-btn class="menuText" text @click.stop="routerGo('/schedule')">{{ 'LOGIN' }}</v-btn>

                <span style="margin-top: 5px" v-if="isUserLogin">|</span>
      <v-btn @click="signOut" text v-if="isUserLogin">{{ lang[getLanguage].SIGN_OUT }}</v-btn>
    </v-layout> -->


      <!-- <v-img
        src="/img/logos/mememaster_logo_color.png"
        :style="isMobileDevice ? 'min-height: 50px; min-width: 236px;cursor: pointer;' : 'max-height: 64px; max-width: 300px;cursor: pointer;'"
        @click="routerGo('/')"
      ></v-img> -->
      <v-img v-if="!isMobileDevice"
        src="/img/logos/mememaster_logo.png"
        style="max-height: 62px; max-width: 300px;cursor: pointer;"
        @click="routerGo('/')"
      ></v-img>
      <v-img v-if="isMobileDevice"
        src="/img/logos/logo.png"
        :style="!drawer ? 'min-height: 50px; min-width: 50px;cursor: pointer;margin-left: -20px;' : 'min-height: 50px; min-width: 50px;cursor: pointer;'"
        @click="routerGo('/')"
      ></v-img>

      <v-spacer></v-spacer>

      <v-btn v-if="!drawer && env && (!mmConnected && !emailConnected && !walletConnected)"
        style="margin-right:30px;margin-top:-5px"
        variant="outlined"
        color="white"
        theme="dark"
        @click="connectWalletDialog = true"
      >
        Connect 
      </v-btn>
      <v-btn v-if="!drawer && env && (mmConnected || emailConnected)"
        style="margin-right:10px;margin-top:-7px"
        variant="outlined"
        color="white"
        theme="dark"
      >
      <img src="/img/icons/metamask.png" style="max-width:32px;padding-right:10px" v-if="mmConnected"/> 
      <v-icon v-if="emailConnected" class="mr-2">mdi-email</v-icon>Connected
      </v-btn>
      <v-btn v-else-if="!drawer && env && (walletConnected || emailConnected)"
        style="margin-right:10px;margin-top:-7px"
        variant="outlined"
        color="white"
        theme="dark"
      >
      <img src="/img/icons/walletconnect.png" style="max-width:32px;padding-right:10px" v-if="walletConnected"/> 
      <v-icon v-if="emailConnected" class="mr-2">mdi-email</v-icon>Connected
      </v-btn>

      <v-btn v-if="!drawer && !isMobileDevice && env && (isLoggedIn || mmConnected || walletConnected) && $router.currentRoute.value.path !== '/generate/default' && $router.currentRoute.value.path !== '/generate/drafts' && $router.currentRoute.value.path !== '/generate/upload'"
        style="margin-right:30px;margin-top:-7px"
        variant="outlined"
        color="white"
        theme="dark"
        @click="routerGo('/generate/default')"
        prepend-icon="mdi-view-grid-plus" 
      >
        Generate
      </v-btn>

      <MetaMaskConnect v-show="false" style="width:190px" ref="mmConnect" >
      </MetaMaskConnect>

      <v-img v-if="!drawer"
        @click="drawer = !drawer"
        src="/img/icons/menu.png"
        :style="isMobileDevice ? 'max-height: 35px; max-width: 35px;margin-right:10px;cursor: pointer;' :  'margin-top: -5px;max-height: 35px; max-width: 35px;margin-right:20px;cursor: pointer;'"
      ></v-img>

  </v-app-bar>

  <!-- DIALOGS AND COMPONENTS-->
  <v-dialog v-if="!mmConnected"
      transition="dialog-bottom-transition"
      :fullscreen="isMobileDevice"
      :min-width="isMobileDevice ? 300 : 500"
      max-width="600"
      v-model="connectWalletDialog"
    >
        <v-card height="100%" theme="dark">
          <v-toolbar
            color="#241d43"
          >
            <v-btn v-if="isMobileDevice"
              icon
              color="white"
              @click="connectWalletDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span class="text-white ml-4" style="font-size: 1.2rem">Connect your wallet</span>
            <v-spacer></v-spacer>
            <v-btn v-if="!isMobileDevice"
              icon
              color="white"
              @click="connectWalletDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="text-center ma-4" v-if="showConfirmation === false">
            If you don't have a wallet, you can select a provider and create one now.<br>
            <v-btn variant="text">Learn more</v-btn>
          </div>

          <v-row v-if="getChain === '0x1' && !isMobileDevice" style="margin-left:15%;margin-right:15%">
            <v-col cols="12" v-if="showConfirmation === false">
              <MetaMaskConnect 
                  :isMobileDevice="isMobileDevice" 
                  style="width:100%;" 
                  ref="mmConnect" 
                  buttonType="large" 
                  :windowWidth="windowWidth" 
                  :windowHeight="windowHeight" 
                  :dark="dark"
              >
              </MetaMaskConnect>
              
              <!-- <WalletConnect 
                  :isMobileDevice="isMobileDevice" 
                  class="pt-6"
                  style="width:100%;" 
                  ref="walletConnect" 
                  buttonType="large" 
                  :windowWidth="windowWidth" 
                  :windowHeight="windowHeight" 
                  :dark="dark"
              >
              </WalletConnect> -->
              <p class="mt-0"></p>
              <p style="font-size:14px" class="font-weight-medium text-center mt-6 mb-2">Works best with Chrome or Brave</p>
              <v-divider></v-divider>
              <p style="font-size:18px" class="font-weight-medium text-center mt-2">OR</p>
              <p style="font-size:18px" class="font-weight-medium text-center mt-2 mb-2">Connect without a wallet</p>
              <v-text-field
                label="Email Address"
                placeholder="Enter your email address..."
                type="email"
                density="comfortable"
                v-model="email"
                variant="outlined"
              ></v-text-field>
              <v-btn style="width:100%"
                     size="large"
                     variant="outlined"
                     color="deep-purple-lighten-2"
                     :disabled="email === ''"
                      @click="authenticateViaEmail"
              >Authenticate
              </v-btn>
              <v-btn style="width:100%"
                      size="large"
                      class="mt-4"
                      variant="outlined"
                      color="deep-purple-lighten-2"
                      :disabled="isButtonDisabled"
                      @click="authenticateViaGoogle"
                >
                  <v-img src="/img/icons/google.png" style="width:24px;height:24px;margin-right:10px"></v-img>Continue with Google
                </v-btn>
            </v-col>
            <v-col cols="12" v-else>
              <v-img
                src="/img/logos/logo.png"
                class="mx-auto mt-4"
                style="max-height: 130px; max-width: 130px;cursor: pointer;"
              ></v-img>
              <p style="font-size:14px" class="font-weight-medium text-center mt-6 mb-4">You're almost there, please check your email and click the magic link to verify your email and access your account.</p>
              <v-divider></v-divider>
              <p style="font-size:18px" class="font-weight-medium text-center mt-4 mb-2">Didn't get the email?</p>
              <v-btn style="width:100%"
                     size="large"
                     color="deep-purple-lighten-2"
                     :disabled="email === ''"
                      @click="authenticateViaEmail"
              >Resend Now!
              </v-btn>
            </v-col>
          </v-row>

          <!-- <v-layout v-if="getChain != '0x1' && !isMobileDevice" column align-center pl-4 pr-4 :style="windowWidth < 770 ? '' : 'margin-left:25%;margin-right:25%'">
            <v-btn v-if="getChain != '0x1'" large style="width:100%;text-transform: none !important" :color="dark ? '#132f5d' : 'blue lighten-5'"  @click="addETHNetwork">
              <v-icon left >mdi-swap-horizontal</v-icon>Switch to Ethereum Mainnet
            </v-btn>
          </v-layout> -->

          <v-row v-if="isMobileDevice" style="margin-left:5%;margin-right:5%">
            <v-col cols="12" v-if="showConfirmation === false">
              <v-btn v-if="!mmConnected && $route.name !== 'MMobile'" size="large" style="width:100%;text-transform: none !important" color="deep-purple-lighten-4"  @click="gotoMMLink()">
                <img src="/img/icons/metamask.png" style="max-width:32px;padding-right:10px;text-transform: none !important;"/>Launch Metamask In-App Browser
              </v-btn>
              <MetaMaskConnect v-if="$route.name === 'MMobile'" :isMobileDevice="isMobileDevice" style="width:100%;" ref="mmConnect" buttonType="large" :windowWidth="windowWidth" :windowHeight="windowHeight" :dark="dark">
              </MetaMaskConnect>

              <!-- <WalletConnect 
                  :isMobileDevice="isMobileDevice" 
                  class="pt-6"
                  style="width:100%;" 
                  ref="walletConnect" 
                  buttonType="large" 
                  :windowWidth="windowWidth" 
                  :windowHeight="windowHeight" 
                  :dark="dark"
              >
              </WalletConnect> -->

              <p style="font-size:14px" class="font-weight-medium text-center mt-6 mb-2">Works best with Chrome or Brave</p>
                <v-divider></v-divider>
                <p style="font-size:18px" class="font-weight-medium text-center mt-2">OR</p>
                <p style="font-size:18px" class="font-weight-medium text-center mt-2 mb-2">Connect without a wallet</p>
                <v-text-field
                  label="Email Address"
                  placeholder="Enter your email address..."
                  type="email"
                  density="comfortable"
                  v-model="email"
                  variant="outlined"
                ></v-text-field>
                <v-btn style="width:100%"
                      size="large"
                      variant="outlined"
                      color="deep-purple-lighten-2"
                      :disabled="email === '' || isButtonDisabled"
                      @click="authenticateViaEmail"
                >Authenticate
                </v-btn>
                <v-btn style="width:100%"
                      size="large"
                      variant="outlined"
                      color="deep-purple-lighten-2"
                      class="text-white mt-3"
                      :disabled="isButtonDisabled"
                      @click="authenticateViaGoogle"
                >
                  <v-img src="/img/icons/google.png" style="width:24px;height:24px;margin-right:10px"></v-img>Continue with Google
                </v-btn>
            </v-col>
            <v-col cols="12" v-else>
              <v-img
                src="/img/logos/logo.png"
                class="mx-auto mt-4"
                style="max-height: 130px; max-width: 130px;cursor: pointer;"
              ></v-img>
              <p style="font-size:14px" class="font-weight-medium text-center mt-6 mb-4">You're almost there, please check your email and click the magic link to verify your email and access your account.</p>
              <v-divider></v-divider>
              <p style="font-size:18px" class="font-weight-medium text-center mt-4 mb-2">Didn't get the email?</p>
              <v-btn style="width:100%"
                     size="large"
                     color="deep-purple-lighten-2"
                     :disabled="email === ''"
                      @click="authenticateViaEmail"
              >Resend Now!
              </v-btn>
            </v-col>
          </v-row>


          <v-card-actions class="justify-end">

          </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- ############### ChatBot ################### -->
    <ChatGPT
        v-model="chatActive"
        :isMobileDevice="isMobileDevice" 
        :windowWidth="windowWidth" 
        :windowHeight="windowHeight" 
        :dark="dark"
        v-on:closeChatClicked="closeChat"
    >
    </ChatGPT>

   <v-snackbar
      v-model="snackbar"
      vertical
    >
      <div class="text-subtitle-1 pb-2">{{ snackbarTitle }}</div>

      <p>{{ snackbarText }}</p>

      <template v-slot:actions>
        <v-btn
          color="indigo"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

</template>

<script>
import store from '@/store/index'
import MetaMaskConnect from '@/components/wallets/MetaMaskConnect'
// import WalletConnect from '@/components/wallets/WalletConnect'
import ChatGPT from '@/components/chat/ChatGPT.vue'
import md5 from 'md5'
import { db } from '@/main'
export default {
    name: 'AppBar',
    props: {
      isMobileDevice: Boolean,
      dark: Boolean,
      windowWidth: Number,
      windowHeight: Number,
    },
    data: () => ({
      dark: true,
      env: false,
      drawer: false,
      scrolled: false,
      chatActive: false,
      connectWalletDialog: false,
      loadingEmailAuth: false,
      emailDialog: false,
      isExistingUser: false,
      email: '',
      username: '',
      password:'',
      snackbar: false,
      isButtonDisabled: false,
      showConfirmation: false,
      // snackbarTitle: '',
      snackbarText: '',
      tempUserData: null,
      open: ['account'],
    }),
    components: {
      MetaMaskConnect,
      // WalletConnect,
      ChatGPT
    },
    computed: {
      getUser () {
        console.log(this.$store.state.user);
        return store.state.user
      },
      gravatar () {
        return this.$store.state.user.gravatar
      },
      provider(){
        console.log(store.state.auth.provider)
        return store.state.auth.provider;
      },
      getChain () {
        return this.$store.state.user.networkChainID
      },
      mmConnected () {
        return this.$store.state.user.mmConnected
      },
      walletConnected () {
        return this.$store.state.user.walletConnected
      },
      emailConnected () {
        return store.state.user.isEmailConnected;
      },
      isLoggedIn () {
        return this.$store.state.user.isLoggedIn
      },
      snackbarTitle(){
        return store.state.auth.authMessage;
      },
      disconnecWallet () {
        if (this.mmConnected) {
          this.$refs.mmConnect.disconnectMetamask()
        } /* else if (this.binanceConnected) {
          this.$refs.mmConnect.disconnectBinance()
        } else  if (this.walletConnected) {
          this.$refs.mmConnect.disconnecWallet()
        } */
      },
    },
    watch: {
     mmConnected () {
      if (this.mmConnected) {
          setTimeout(() => {
            this.connectWalletDialog = false
            this.drawer = false
          }, 2000)
        }
      },
      walletConnected () {
        if (this.walletConnected) {
          setTimeout(() => {
            this.connectWalletDialog = false
            this.drawer = false
          }, 2000)
        }
      },
      emailConnected(newValue){
        console.log("watch email", newValue)
        if(newValue){
          this.connectWalletDialog = false
          this.drawer = false
        }
      },
      drawer () {
        store.commit('setDrawer', {
          drawer: this.drawer,
        })
      },
      snackbar(newValue){
        if(!newValue){
          store.commit("setState", {
            authMessage: "",
          });
        }
      },
      snackbarTitle(newValue){
        if(newValue.length > 0){
          this.snackbar = true;
        }else{
          this.snackbar = false;
        }
      },
      provider(newValue){
        if(newValue === 'Google'){
          this.connectWalletDialog = false
          this.routerGo('/authorise')
        }
      }
    /* binanceConnected () {
      if (this.binanceConnected) {
        setTimeout(() => {
          this.connectWalletDialog = false
        }, 2000)
      }
    }, */
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    created () {
      window.addEventListener('scroll', this.handleScroll)
      console.log(process.env.VUE_APP_ENVIRONMENT)
      this.env = true
      // this.env = process.env.VUE_APP_ENVIRONMENT === 'testnet'
      console.log('this.getUser.mmConnected')
      console.log(this.getUser.mmConnected)
    },
    methods: {
      routerGo (route) {
        this.$router.push(route);
        this.drawer = false
      },
      openWhitePaper() {
        // console.log('wpClicked')
        this.$emit("wpClicked")
        this.drawer = false
      },
      gotoMMLink() {
        // console.log('wpClicked')
        this.$emit("mmMobileClicked")
      },
      getHash (name) {
        return md5(name)
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
      },
      handleScroll () {
        // console.log(window.scrollY)
        if (window.scrollY > 150 && this.isMobileDevice) {
          this.scrolled = true
        } else if (window.scrollY > 150 && !this.isMobileDevice) {
          this.scrolled = true
        } else {
          this.scrolled = false
        }
      },
      authenticateViaEmail(){
        const payload = {email: this.email}
        store.dispatch('sendMagicLink', payload)
          .then(() =>{
            this.isButtonDisabled = true;
            this.showConfirmation = true;
          })
      },
      authenticateViaGoogle(){
        this.isButtonDisabled = true;
        store.dispatch('signUserInGoogle')
        .then(() =>{
          console.log(this.provider)
        })
      },
      closeChat () {
        console.log('chat close clicked')
        this.chatActive = false
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Gruppo&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Gruppo&family=Saira:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');

  .menuText {
    font-family: 'Gruppo';
    font-size: 22px;
    color: #FFF;
  }

</style>
