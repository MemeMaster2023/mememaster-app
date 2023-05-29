<template>
  <v-navigation-drawer
    v-model="drawer"
    image="/img/home/menu_bg.webp"
    app
    theme="dark"
    location="right"
    width="280"
  >

    <v-layout style="margin-left: 90px;">
      <v-spacer></v-spacer>
      <v-btn icon="mdi-window-close"
            variant="plain" 
            @click.stop="drawer = !drawer" style="margin: 10px">
      </v-btn>
  </v-layout>

    <v-layout style="margin-left: 80px;margin-top:-30px">
      <v-img
        src="/img/logos/logo.png"
        style="max-height: 130px; max-width: 130px;cursor: pointer;"
        @click="routerGo('/')"
      ></v-img>
    </v-layout>

    <v-layout class="mr-4 ml-4 mt-8 mb-4" v-if="env">
      <v-btn v-if="!mmConnected"
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
      <img src="/img/icons/metamask.png" style="max-width:22px%;max-height:22px;padding-right:10px"/>Connected
      </v-btn>
    </v-layout>

    <v-list nav>
      <v-list-item prepend-icon="mdi-home-variant-outline" title="Home" value="home" @click="routerGo('/')"></v-list-item>

      <v-list-group v-if="isLoggedIn">
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
          to="/generate"
        ></v-list-item>

        <v-list-item
          v-bind="props"
          prepend-icon="mdi-collage"
          title="My Collections"
          to="/mycollections"
        ></v-list-item>

        <v-list-item
          v-bind="props"
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
        ></v-list-item>


      </v-list-group>
        
      <v-list-item prepend-icon="mdi-robot-outline" title="Meme Marketplace" value="mememarket"></v-list-item>
      <v-list-item prepend-icon="mdi-circle-multiple-outline" title="Token Listings" value="tokens"></v-list-item>
      <v-list-item prepend-icon="mdi-transit-connection-variant" title="Roadmap" value="faq"></v-list-item>
      <v-list-item prepend-icon="mdi-chart-arc" title="Tokenomics" value="faq"></v-list-item>
      <v-list-item prepend-icon="mdi-head-question-outline" title="FAQ" value="faq"></v-list-item>
      <v-list-item prepend-icon="mdi-at" title="Contact Us" value="contact"></v-list-item>
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
      <v-img
        src="/img/logos/mememaster_logo.png"
        :style="isMobileDevice ? 'min-height: 49px; min-width: 236px;cursor: pointer;' : 'max-height: 62px; max-width: 300px;cursor: pointer;'"
        @click="routerGo('/')"
      ></v-img>

      <v-spacer></v-spacer>

      <v-btn v-if="!drawer && !isMobileDevice && env && !mmConnected"
        style="margin-right:30px;margin-top:-7px"
        variant="outlined"
        color="white"
        theme="dark"
        @click="connectWalletDialog = true"
      >
        Connect
      </v-btn>
      <v-btn v-if="!drawer && !isMobileDevice && env && mmConnected"
        style="margin-right:10px;margin-top:-7px"
        variant="outlined"
        color="white"
        theme="dark"
      >
      <img src="/img/icons/metamask.png" style="max-width:18px%;max-height:18px;padding-right:10px"/>Connected
      </v-btn>

      <v-btn v-if="!drawer && !isMobileDevice && env && isLoggedIn"
        style="margin-right:30px;margin-top:-7px"
        variant="outlined"
        color="white"
        theme="dark"
        to="/generate"
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
            <v-toolbar-title style="text-overflow:none" class="text-white">Connect your wallet</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="!isMobileDevice"
              icon
              color="white"
              @click="connectWalletDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="text-center ma-4">
            If you don't have a wallet, you can select a provider and create one now.<br>
            <v-btn variant="text">Learn more</v-btn>
          </div>

          <v-row v-if="getChain === '0x1' && !isMobileDevice" pl-4 pr-4 style="margin-left:15%;margin-right:15%">
            <v-col cols="12" >
              <MetaMaskConnect :isMobileDevice="!isMobileDevice" style="width:100%;" ref="mmConnect" buttonType="large" :windowWidth="windowWidth" :windowHeight="windowHeight" :dark="dark">
              </MetaMaskConnect>
              <p class="mt-0"></p>
              <!-- <WalletConnect style="width:100%;" ref="walletConnect" buttonType="large" :windowWidth="windowWidth" :windowHeight="windowHeight" :dark="dark">
              </WalletConnect>
              <p class="mt-0"></p> -->
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
              >Authenticate
              </v-btn>
            </v-col>
          </v-row>

          <!-- <v-layout v-if="getChain != '0x1' && !isMobileDevice" column align-center pl-4 pr-4 :style="windowWidth < 770 ? '' : 'margin-left:25%;margin-right:25%'">
            <v-btn v-if="getChain != '0x1'" large style="width:100%;text-transform: none !important" :color="dark ? '#132f5d' : 'blue lighten-5'"  @click="addETHNetwork">
              <v-icon left >mdi-swap-horizontal</v-icon>Switch to Ethereum Mainnet
            </v-btn>
          </v-layout> -->

          <v-row v-if="isMobileDevice"  pl-4 pr-4 style="margin-left:5%;margin-right:5%">
            <!-- <v-btn v-if="$route.name === '/'" large style="width:100%;text-transform: none !important" :color="dark ? '#132f5d' : 'blue lighten-5'"  @click="gotoMMLink('https://metamask.app.link/dapp/chill2303.molanft.io/mmobile')">
              <v-icon left >mdi-wallet</v-icon>Connect Wallet
            </v-btn> -->
            <v-col cols="12" >
              <MetaMaskConnect v-if="$route.name === 'Home'" :isMobileDevice="isMobileDevice" style="width:100%;" ref="mmConnect" buttonType="large" :windowWidth="windowWidth" :windowHeight="windowHeight" :dark="dark">
              </MetaMaskConnect>

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
                >Authenticate
                </v-btn>
            </v-col>
          </v-row>


          <v-card-actions class="justify-end">

          </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
import store from '@/store/index'
import MetaMaskConnect from '@/components/wallets/MetaMaskConnect'
import md5 from 'md5'
// import WalletConnect from '@/components/wallets/WalletConnect'
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
      connectWalletDialog: false,
      email: ''
    }),
    components: {
      MetaMaskConnect
    },
    computed: {
      getUser () {
        return this.$store.state.user
      },
      gravatar () {
        return this.$store.state.user.gravatar
      },
      getChain () {
        return this.$store.state.user.networkChainID
      },
      mmConnected () {
        return this.$store.state.user.mmConnected
      },
      isLoggedIn () {
        return this.$store.state.user.isLoggedIn
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
          }, 2000)
        }
      },
      drawer () {
        store.commit('setDrawer', {
          drawer: this.drawer,
        })
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
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Baumans&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Gruppo&family=Saira:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');

  .menuText {
    font-family: 'Gruppo';
    font-size: 22px;
    color: #FFF;
  }

</style>
