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
                    <v-btn @click="handleShowDiaLogEth(true)" size="large" style="width:100%" color="#360a3f">Buy with ETH</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pr-8'">
                    <v-btn @click="handleShowDiaLogUsdt(true)" size="large" style="width:100%" color="#360a3f">Buy with USDT</v-btn>
                  </v-col>
                </v-row>

                <v-row class="mb-8">
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pl-8'">
                    <v-btn size="large" style="width:100%" @click="scrollToHowToBuy()">How to Buy</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pr-8'">
                    <v-btn size="large" style="width:100%">New to Crypto</v-btn>
                  </v-col>
                </v-row>

            </v-card>
          </v-col>
        </v-row>
      </v-img>

      <!-- ######################################################################################## -->
      <!-- ###############################     HOW TO BUY         ################################# -->
      <!-- ######################################################################################## -->

      <div id="howtobuy">
        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" >
          <v-col cols="12" md="12" :align="'center'">
              <div class="text-h3 ma-2 text-purple-lighten-3">HOW TO BUY</div>
              <div class="text-h4 ma-2 text-white">How to buy Meme Master 2023 (EMAS) in the Presale?</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-16 mr-16 mb-16'" >
          <v-col cols="12" md="6" >

            <v-layout class="mb-2">
              <v-icon size="40" color="purple-lighten-3">mdi-numeric-1-box-outline</v-icon>
              <div class="text-h5 text-purple-lighten-3 pt-1">Install a Wallet</div>
            </v-layout>

            <v-card theme="dark"
                    color="purple-lighten-3"
                    min-height="220"
                    max-height="100%"
                    max-width="450"
                    variant="outlined"
            >
            <v-card-text style="font-size: 1.2rem;color:#FFF;text-align: justify;">
              To start with, ensure you have a MetaMask wallet installed on your browser in order to connect your wallet to the platform.<br><br>
              If you are purchasing on mobile, we recommend using MetaMask In-App browser. Meme Master's Connect button will automatically launch MetaMask App on the mobile device.
            </v-card-text>
            </v-card>

          </v-col>

          <v-col cols="12" md="6" >

            <v-layout class="mb-2">
              <v-icon size="40" color="purple-lighten-3">mdi-numeric-2-box-outline</v-icon>
              <div class="text-h5 text-purple-lighten-3 pt-1">Connect your Wallet</div>
            </v-layout>

            <v-card theme="dark"
                    color="purple-lighten-3"
                    min-height="220"
                    max-height="100%"
                    max-width="450"
                    variant="outlined"
            >
              <v-card-text style="font-size: 1.2rem;color:#FFF;text-align: justify;">
                Once you’ve connected your wallet, you’ll be presented with the options with which you can purchase EMAS token.<br><br>
                Read below for more information on these options, and select the option which is right for you.
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
      </div>

      <!-- ######################################################################################## -->
      <!-- #################################     BUY OPTIONS      ################################# -->
      <!-- ######################################################################################## -->

      <div id="buyoptions" style="background-color: #F3E5F5;height:100%">
        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-16'" >
          <v-col cols="12" md="12" :align="'center'" class="mt-8">
              <div class="text-h3 ma-2 text-purple-darken-3">OPTIONS ON HOW TO BUY</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-16 mr-16 mb-16'" >
          <v-col cols="12" md="6" >

            <v-layout class="mb-2">
              <v-icon size="40" color="purple-darken-3">mdi-ethereum</v-icon>
              <div class="text-h5 text-purple-darken-3 pt-1">Buy with Ethereum</div>
            </v-layout>

            <v-card theme="light"
                    color="purple-darken-3"
                    min-height="420"
                    max-height="100%"
                    max-width="450"
                    variant="outlined"
            >
            <v-card-text style="font-size: 1.3rem;color:#000000;line-height: normal;text-align: justify;font-weight: 500;">
              If you have enough ETH in your wallet, you can use the purchase EMAS with ETH option in order to swap the ETH in your wallet for EMAS.<br><br>
              Type in the amount of EMAS you wish to purchase and then click “Convert ETH”. Your wallet provider will ask you to confirm the transaction and will also show you the cost of gas fees.
            </v-card-text>

              <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                <v-spacer></v-spacer>
                <v-btn
                  style="color:#FFF;width:80%"
                  variant="elevated"
                  color="#360a3f"
                  size="large"
                  class="font-weight-bold mb-2"
                  @click="handleShowDiaLogEth(false)"
                >
                  Buy with ETH Now
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>

            </v-card>

          </v-col>

          <v-col cols="12" md="6" >

            <v-layout class="mb-2">
              <!-- <v-icon size="40" color="purple-darken-3">mdi-currency-usd</v-icon> -->
              <v-img src="/img/icons/white-cryptocurrency-coin-tether-usdt-icon-vector-27655890.png" style="max-width:40px"></v-img>
              <div class="text-h5 text-purple-darken-3 pt-1">Buy with USDT</div>
            </v-layout>

            <v-card theme="light"
                    color="purple-darken-3"
                    min-height="420"
                    max-height="100%"
                    max-width="450"
                    variant="outlined"
            >
              <v-card-text style="font-size: 1.3rem;color:#000000;line-height: normal;text-align: justify;font-weight: 500;">
                Before you start trading, make sure you have at least $30 USDT in your wallet. Enter the amount of EMAS you wish to purchase (minimum 20,000). Click "Convert USDT".<br><br>
                You will then be asked to approve the purchase twice. The first approval is for the USDT contract and the second approval is for the transaction amount. Please make sure you go through two approval steps to complete the transaction.
              </v-card-text>

              <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                <v-spacer></v-spacer>
                <v-btn
                  style="color:#FFF;width:80%"
                  variant="elevated"
                  color="#360a3f"
                  size="large"
                  class="font-weight-bold mb-2"
                  @click="handleShowDiaLogUsdt(false)"
                >
                  Buy with USDT Now
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>

          </v-col>
        </v-row>
      </div>

      <!-- ######################################################################################## -->
      <!-- ###############################     PRESALE  STAGES        ############################# -->
      <!-- ######################################################################################## -->




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

      <!-- DIALOG buyWithEthDialog -->
      <v-dialog v-model="buyWithEthDialog" transition="dialog-bottom-transition" :fullscreen="isMobileDevice"
        :min-width="isMobileDevice ? 300 : 500" max-width="600">
        <v-card height="100%" color="#F3E5F5">
          <v-toolbar color="#700070">
            <v-btn v-if="isMobileDevice" icon color="white" @click="buyWithEthDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span class="text-white ml-4" style="font-size: 1.2rem">Buy with ETH</span>
            <v-spacer></v-spacer>
            <v-btn v-if="!isMobileDevice" icon color="white" @click="buyWithEthDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="mb-8">
            <v-row>
              <v-col cols="12">
                <label for="" style="font-weight: bold;">Selling</label>
                <v-text-field placeholder="0" class="mt-2">
                  <template v-slot:append-inner>
                    <v-icon size="28px" color="purple-darken-4">mdi-ethereum</v-icon>
                    <span style="font-weight: 400; margin-left: 10px;">ETH</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <label for="" style="font-weight: bold;">Buying</label>
                <v-text-field placeholder="0" class="mt-2">
                  <template v-slot:append-inner>
                    <v-icon color="green-lighten-2"><img
                        style="width: 28px; background-color: rgb(159, 155, 155); border-radius: 50%"
                        src="/img/logos/logo.png" alt="Icon" /></v-icon>
                    <span style="font-weight: 400; margin-left: 10px;">EMAS</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn class="text-white" size="large" style="width:100%" color="#360a3f">
                  Convert to ETH
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- DIALOG buyWithUsdtDialog -->
      <v-dialog v-model="buyWithUsdtDialog" transition="dialog-bottom-transition" :fullscreen="isMobileDevice"
        :min-width="isMobileDevice ? 300 : 500" max-width="600">
        <v-card height="100%" color="#F3E5F5">
          <v-toolbar color="#700070">
            <v-btn v-if="isMobileDevice" icon color="white" @click="buyWithUsdtDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span class="text-white ml-4" style="font-size: 1.2rem">Buy with USDT</span>
            <v-spacer></v-spacer>
            <v-btn v-if="!isMobileDevice" icon color="white" @click="buyWithUsdtDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="mb-8">
            <v-row>
              <v-col cols="12">
                <label for="" style="font-weight: bold;">Selling</label>
                <v-text-field placeholder="0" class="mt-2">
                  <template v-slot:append-inner>
                    <v-icon size="28px">
                      <img style="width: 28px;"
                        src="/img/icons/white-cryptocurrency-coin-tether-usdt-icon-vector-27655890.png"
                        alt="Icon" />
                    </v-icon>
                    <span style="font-weight: 400; margin-left: 10px;">USDT</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <label for="" style="font-weight: bold;">Buying</label>
                <v-text-field placeholder="0" class="mt-2">
                  <template v-slot:append-inner>
                    <v-icon color="green-lighten-2">
                      <img style="width: 28px; background-color: rgb(159, 155, 155); border-radius: 50%"
                        src="/img/logos/logo.png" alt="Icon" />
                    </v-icon>
                    <span style="font-weight: 400; margin-left: 10px;">EMAS</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn class="text-white" size="large" style="width:100%;" color="#360a3f">
                  Convert to USDT
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import MetaMaskConnect from '@/components/wallets/MetaMaskConnect'
import WalletConnect from '@/components/wallets/WalletConnect'
import { scroller } from 'vue-scrollto/src/scrollTo'
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
    showConfirmation: false,
    buyWithEthDialog: false,
    buyWithUsdtDialog: false
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
    this.init()
  },
  methods: {
    init () {

    },
    connectWalletClicked () {
      this.connectWalletDialog = true
    },
    scrollToHowToBuy () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#howtobuy', 500, { offset: -64 });
      }, 200);
    },
    handleShowDialog(isTop, dialogType) {
      const isConnected = this.mmConnected || this.walletConnected || this.twConnected;

      if (isTop) {
        this[dialogType] = isConnected;
        this.connectWalletDialog = !isConnected;
      } else {
        const firstScrollTo = scroller();
        this.scrollClicked = true;
        firstScrollTo('#presale', 500, { offset: -64 });

        setTimeout(() => {
          this[dialogType] = isConnected;
          this.connectWalletDialog = !isConnected;
        }, 500);
      }
    },
    handleShowDiaLogUsdt(isTop) {
      this.handleShowDialog(isTop, 'buyWithUsdtDialog');
    },
    handleShowDiaLogEth(isTop) {
      this.handleShowDialog(isTop, 'buyWithEthDialog');
    }
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
