<template>
  <div id="presale">
    <v-responsive style="background-color: #000;" class="pt-16">

      <v-img src="/img/presale/presale_home.png" 
           cover
           :style="isMobileDevice ? 'height:100%' : ''"
           gradient="to bottom, rgba(0,0,0,.8), rgba(0,0,0,.6)"
      >
      

        <v-row :class="isMobileDevice ? 'mt-2 ml-2 mr-2' : 'mt-12 ml-16 mr-16'" >
          <v-col cols="12" md="6" >
            <div class="text-h3 ma-2 text-white">Meme Master Presale is starting soon!</div>
            <div style="text-align: justify;" class="text-h5 ma-2 text-white">The Meme Master 2023 Presale is just around the corner, and we can't wait to share this epic journey with you! Get ready to join the revolution of creativity as we launch our exclusive Presale event on August 20, 2023. <br><br>As a pioneer in the world of memes, we're bringing you a one-of-a-kind AI powered platform where you can mint, trade, and collect the most iconic and side-splitting memes of all time.</div>
          </v-col>

          <v-col cols="12" md="6" :align="'center'">
            
            <v-card theme="dark" color="#FFF" :max-width="isMobileDevice ? '100%' : '70%'" height="100%">
              <v-toolbar
                color="#360a3f"
              >
               <v-toolbar-title>Presale Stage 1</v-toolbar-title>
              <v-spacer></v-spacer>
               <v-toolbar-title>$0.005</v-toolbar-title>
              </v-toolbar>

         
                <div class="pt-8 text-h5 ma-2 text-black">Aug 20 - Sept 20</div>
                <div class="text-h6 ma-2 text-black">1 EMAS = $0.005</div>
                <div style="font-size: 1rem;" class="ma-2 text-black">Hurry and buy before Stage 2 Price Increases To $0.006</div>

                <v-layout :class="isMobileDevice ? 'mt-4 ml-4 mr-4 mb-12' : 'mt-4 ml-12 mr-12 mb-12'">
                  <v-progress-linear
                    model-value="20"
                    height="30"
                    color="#360a3f"
                    style="background-color: #a692aa;"
                  >
                  <strong>{{ '17' }}%</strong>
                  </v-progress-linear>
                </v-layout>

                <div style="font-size: 1rem;"  class="ma-2 font-weight-bold text-black">Sold — 120,000,000 / 350,000,000</div>
                <div style="font-size: 1rem;"  class="ma-2 font-weight-bold text-black">USDT Raised — $600,000 / $1,750,000</div>

                <v-row class="pt-16" v-if="!mmConnected && !walletConnected && !twConnected">

                  <v-col cols="12" md="12" class="pl-8 pr-8">
                    <v-btn @click="connectWalletClicked" size="large" style="width:100%" color="#360a3f">Connect your Wallet</v-btn>
                  </v-col>

                </v-row>
                <v-row class="pt-16" v-else>
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pl-8'">
                    <v-btn size="large" style="width:100%" color="#360a3f">Buy with ETH</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pr-8'">
                    <v-btn size="large" style="width:100%" color="#360a3f">Buy with USDT</v-btn>
                  </v-col>
                </v-row>

                <v-row class="mb-8">
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pl-8'">
                    <v-btn size="large" style="width:100%" >How to Buy</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pr-8'">
                    <v-btn size="large" style="width:100%">New to Crypto</v-btn>
                  </v-col>
                </v-row>


          

            </v-card>
          </v-col>

        </v-row>

        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" :align="center">
        
        </v-row>

      </v-img>


      <!-- DIALOGS AND COMPONENTS-->
  <v-dialog v-if="!mmConnected || !walletConnected || !twConnected"
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
            <v-btn variant="text" class="ma-4" 
            >
              Learn more
            </v-btn>
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
              
              <WalletConnect 
                  :isMobileDevice="isMobileDevice" 
                  class="pt-6"
                  style="width:100%;" 
                  ref="walletConnectref" 
                  buttonType="large" 
                  :windowWidth="windowWidth" 
                  :windowHeight="windowHeight" 
                  :dark="dark"
              >
              </WalletConnect>

              <p class="mt-0"></p>
              <p style="font-size:14px" class="font-weight-medium text-center mt-6 mb-2">Works best with Chrome or Brave</p>
              
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

              <WalletConnect 
                  :isMobileDevice="isMobileDevice" 
                  class="pt-6"
                  style="width:100%;" 
                  ref="walletConnectref" 
                  buttonType="large" 
                  :windowWidth="windowWidth" 
                  :windowHeight="windowHeight" 
                  :dark="dark"
              >
              </WalletConnect>

              <p style="font-size:14px" class="font-weight-medium text-center mt-6 mb-2">Works best with Chrome or Brave</p>  
              
            </v-col>
          </v-row>

          <v-card-actions class="justify-end">

          </v-card-actions>
        </v-card>
    </v-dialog>

    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
import MetaMaskConnect from '@/components/wallets/MetaMaskConnect'
import WalletConnect from '@/components/wallets/WalletConnect'
export default {
  name: 'Presale',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    connectWalletDialog: false,
    showConfirmation: false
  }),
  components: {
    MetaMaskConnect,
    WalletConnect
  },
  computed: {
    getChain () {
      return this.$store.state.user.networkChainID
    },
    mmConnected () {
      return this.$store.state.user.mmConnected
    },
    walletConnected () {
      return this.$store.state.user.walletConnected
    },
    twConnected () {
      return this.$store.state.user.twConnected
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
    twConnected () {
      if (this.twConnected) {
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
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.scrollToTop()
    this.init()
  },
  methods: {
    init () {
     
    },
    connectWalletClicked () {
      this.connectWalletDialog = true
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#presale', 500, { offset: -64 });
      }, 200);
    },
  }
}
</script>

<style lang="scss">
  .homeText {
    font-family: 'Gruppo';
    font-size: 40px;
    line-height: 1em;
    color: #FFF;
  }
  .homeTextSmall {
    font-family: 'Gruppo';
    font-size: 28px;
    line-height: 1em;
    color: #FFF;
  }
  .homeTextSmaller {
    font-family: 'Gruppo';
    font-size: 24px;
    line-height: 1em;
    color: #FFF;
    margin-top: 16px;
  }
  .cardTextTitle {
    font-family: 'Saira';
    font-size: 20px;
    font-weight: bold;
  }
  .cardTextCreateSmall {
    font-family: 'Jura';
    font-size: 18px;
  }
  .gallery {
    font-family: 'Gruppo';
    font-size: 45px;
    line-height: 1em;
    color: #FFF;
  }
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>
