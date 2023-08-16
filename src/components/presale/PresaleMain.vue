<template>
  <div id="presale">
    <v-responsive style="background-color: #000;" class="pt-16">

      <v-img src="/img/presale/presale_home.png"
           cover
           gradient="to bottom, rgba(0,0,0,.8), rgba(0,0,0,.6)"
      >

        <v-row :class="isMobileDevice ? 'mt-2 ml-2 mr-2 mb-8' : drawer ? 'mt-12 ml-8 mr-8' : 'mt-12 ml-16 mr-16'" >
          <v-col cols="12" md="6" class="order-last order-md-first">
            <div :class="isMobileDevice ? 'text-h4 ma-2 pt-8 text-white' : 'text-h4 ma-2 text-white'">Meme Master Presale is starting soon!</div>
            <div style="text-align: justify;font-size: 1.2rem;" class="ma-2 pt-4 text-white font-weight-medium">The Meme Master 2023 Presale is going live on August 30th, 2023 at 00:00 CET (10pm UTC). Get ready to join the revolution of creativity!<br><br>We're bringing you a one-of-a-kind AI powered platform where you can mint, trade, and collect Memes music and NFTs, interact with our games, find new projects on our new token listing platform and a host of the features that are in development, please check out the information below including our roadmap, video and tier offers for more information.</div>

            <v-tooltip location="bottom" v-if="!isMobileDevice">
              <template v-slot:activator="{ props }">
                <div class="text-center">
                  <v-btn
                        class="mt-4"
                        size="large"
                        color="#360a3f"
                        style="text-transform: none !important;color:#FFF"
                        v-bind="props"
                        prepend-icon="mdi-hand-coin-outline"
                  >
                    Claim Your Meme Master Tokens
                  </v-btn>
                </div>
              </template>
              <span>Claiming will be available 14 days after the presale ends
              </span>
            </v-tooltip>

            <div class="text-center" v-else>
              <v-btn
                    class="mt-4"
                    size="large"
                    color="#360a3f"
                    style="text-transform: none !important;color:#FFF"
                    prepend-icon="mdi-hand-coin-outline"
              >
                Claim Your Meme Master Tokens
              </v-btn>
              <div style="font-size: 0.8rem;color:#FFF">Claiming will be available 14 days after the presale ends</div>
            </div>

            <v-row  class="mt-4" v-if="!isMobileDevice">
              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-stairs-up"
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       @click="scrollStages()"
                >
                  Presale Stages
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-chart-pie"
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       @click="scrollTokenomics()"
                >
                  Tokenomics
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-layers-triple-outline"
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       @click="scrollToTiers()"
                >
                  Tiers
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="!isMobileDevice">

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-transit-connection-variant"
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       to="/roadmap"
                >
                  Roadmap
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-shape-plus"
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       to="/games"
                >
                  Games
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-music"
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       to="/music"
                >
                  Music
                </v-btn>
              </v-col>

            </v-row>

            <v-row v-if="!isMobileDevice">
              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-view-dashboard"
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       to="/nfts"
                >
                  NFT Marketplace
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-image-multiple-outline"
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       to="/memes"
                >
                  Meme Marketplace
                </v-btn>
              </v-col>


              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-circle-multiple-outline"
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       to="/tokens"
                >
                  {{ drawer ? 'Token Listings' : 'New Token Listings' }}
                </v-btn>
              </v-col>

            </v-row>

          </v-col>

          <!-- #################################################################### -->
          <!-- ########################## PRESALE FORM ############################ -->
          <!-- #################################################################### -->

         

          <v-col cols="12" md="6" :align="'center'" :class="isMobileDevice ? 'pt-4' : ''">

            <v-btn v-if="isMobileDevice" class="mb-2"
              color="#360a3f"
              theme="dark"
              @click="scrollToKYCLink()"
              style="width:100%;color:#FFF;"
            >
              <img src="/img/icons/coinsult_squ.png" style="max-width:22px;padding-right:5px"/> 
              KYC - AUDIT
            </v-btn>

            <v-card theme="dark" color="#FFF" :max-width="isMobileDevice ? '100%' : '70%'" height="100%">
              <v-toolbar
                color="#360a3f"
              >
              <div style="font-size: 1.5rem;" class="ml-4 grow">Presale Stage 1</div>
              <v-spacer></v-spacer>
               <v-toolbar-title>$0.005</v-toolbar-title>
              </v-toolbar>


                <div class="pt-4 text-h5 ma-2 text-black">Aug 2023 - Sept 2023</div>
                <div class="text-h6 ma-2 text-black">1 EMAS = $0.005</div>
                <div style="font-size: 1rem;" class="ml-8 mr-8 text-black">Hurry and buy before Stage 2 Price Increases To $0.0055</div>

                <v-layout :class="isMobileDevice ? 'mt-4 ml-4 mr-4 mb-12' : 'mt-4 ml-12 mr-12 mb-12'">
                  <v-progress-linear
                    model-value="0"
                    height="30"
                    color="#360a3f"
                    style="background-color: #a692aa;"
                  >
                  <strong>{{ '0' }}%</strong>
                  </v-progress-linear>
                </v-layout>

                <div style="font-size: 1rem;"  class="ma-2 font-weight-bold text-black">Sold — 0 / 350,000,000</div>
                <div style="font-size: 1rem;"  class="ma-2 font-weight-bold text-black">USDT Raised — $0.00 / $1,750,000</div>

                <v-row class="pt-4" v-if="mmConnected || walletConnected || twConnected">
                  <v-col cols="12" md="12" class="pl-8 pr-8">
                    <v-chip variant="outlined" class="ma-2" color="#360a3f">
                      <v-icon start icon="mdi-wallet" color="#360a3f"></v-icon>
                      {{ this.getUser.accounts[0] }}
                    </v-chip>
                  </v-col>
                </v-row>

                <v-row v-if="!mmConnected && !walletConnected && !twConnected">

                  <v-col cols="12" md="12" class="pt-16 pl-8 pr-8">
                    <v-btn @click="connectWalletClicked" class="mt-8" size="large" style="width:100%" color="#360a3f">Connect your Wallet</v-btn>
                  </v-col>

                </v-row>

                <!--  presaleNotLive  -->
                <v-row v-else>
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pl-8'">
                    <v-btn @click="handleShowDialog(true, 'buyWithEthDialog')" size="large" style="width:100%" color="#360a3f">Buy with ETH</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pr-8'">
                    <v-btn @click="handleShowDialog(true, 'buyWithUsdtDialog')" size="large" style="width:100%" color="#360a3f">Buy with USDT</v-btn>
                  </v-col>
                </v-row>

                <v-row class="mb-8">
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pl-8'">
                    <v-btn size="large" style="width:100%" @click="scrollToHowToBuy()">How to Buy</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pr-8'">
                    <v-btn size="large" style="width:100%" @click="scrollToNewToCrypto()">New to Crypto</v-btn>
                  </v-col>
                </v-row>

            </v-card>
          </v-col>
        </v-row>
      </v-img>

        <v-row class="ml-2 mr-2" v-if="isMobileDevice">
          <v-col cols="6" :align="'center'">
            <v-btn prepend-icon="mdi-stairs-up" stacked
                    style="font-size: 0.8rem;width:100%;font-weight: bold;"
                    color="purple-lighten-4"
                    @click="scrollStages()"
            >
              Presale Stages
            </v-btn>
          </v-col>

          <v-col cols="6" :align="'center'">
            <v-btn prepend-icon="mdi-chart-pie" stacked
                    style="font-size: 0.8rem;width:100%;font-weight: bold;"
                    color="purple-lighten-4"
                    @click="scrollTokenomics()"
            >
              Tokenomics
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="ml-2 mr-2" v-if="isMobileDevice">
          <v-col cols="6" md="6" :align="'center'">
            <v-btn prepend-icon="mdi-layers-triple-outline" stacked
                    style="font-size: 0.8rem;width:100%;font-weight: bold;"
                    color="purple-lighten-4"
                    @click="scrollToTiers()"
            >
              Tiers
            </v-btn>
          </v-col>

          <v-col cols="6" md="6" :align="'center'">
            <v-btn prepend-icon="mdi-circle-multiple-outline" stacked
                       style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                       color="purple-lighten-4"
                       to="/tokens"
                >
                  New Token Listings
                </v-btn>
          </v-col>
        </v-row>

        <v-row class="ml-2 mr-2" v-if="isMobileDevice">
          <v-col cols="6" :align="'center'">
            <v-btn prepend-icon="mdi-shape-plus" stacked
                    style="font-size: 0.8rem;width:100%;font-weight: bold;"
                    color="purple-lighten-4"
                    to="/games"
            >
              Games
            </v-btn>
          </v-col>

          <v-col cols="6" :align="'center'">
            <v-btn prepend-icon="mdi-music" stacked
                    style="font-size: 0.8rem;width:100%;font-weight: bold;"
                    color="purple-lighten-4"
                    to="/music"
            >
              Music
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="ml-2 mr-2" v-if="isMobileDevice">
          <v-col cols="6" :align="'center'">
            <v-btn prepend-icon="mdi-view-dashboard" stacked
                    style="font-size: 0.8rem;width:100%;font-weight: bold;"
                    color="purple-lighten-4"
                    to="/nfts"
            >
              NFT Marketplace
            </v-btn>
          </v-col>

          <v-col cols="6" :align="'center'">
            <v-btn prepend-icon="mdi-image-multiple-outline" stacked
                    style="font-size: 0.8rem;width:100%;font-weight: bold;"
                    color="purple-lighten-4"
                    to="/memes"
            >
              Meme Marketplace
            </v-btn>
          </v-col>


          <!-- <v-col cols="12" md="4" :align="'center'">
            <v-btn prepend-icon="mdi-circle-multiple-outline"
                    style="font-size: 0.8rem;width: 100%;font-weight: bold;"
                    color="purple-lighten-4"
                    to="/tokens"
            >
              {{ drawer ? 'Token Listings' : 'New Token Listings' }}
            </v-btn>
          </v-col> -->
        </v-row>

      <!-- ######################################################################################## -->
      <!-- ###############################       WELCOME          ################################# -->
      <!-- ######################################################################################## -->

      <div id="welcome">

        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" >
          <v-col cols="12" md="12" :align="'center'">
              <div class="text-h4 ma-2 text-purple-lighten-3">WELCOME TO MEME MASTER 2023</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-16 mr-16 mb-16'" >
          <v-col cols="12" md="12" :align="'center'">


            <v-card theme="dark"
                    color="purple-lighten-3"
                    min-height="220"
                    max-height="100%"
                    max-width="1068"
                    variant="outlined"
            >
              <v-card-text style="font-size: 1.2rem;color:#FFF;text-align: justify;">
                <iframe width="100%" :height="isMobileDevice ? '350' : '584'" src="https://www.youtube.com/embed/0zLTr7uP648" title="MemeMaster2023" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </v-card-text>
            </v-card>

          </v-col>

        </v-row>
      </div>

      <!-- ######################################################################################## -->
      <!-- ###############################     HOW TO BUY         ################################# -->
      <!-- ######################################################################################## -->

      <div id="howtobuy">

        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" >
          <v-col cols="12" md="12" :align="'center'">
              <div class="text-h4 ma-2 text-purple-lighten-3">HOW TO BUY</div>
              <div class="text-h5 ma-2 text-white">How to buy Meme Master 2023 (EMAS) in the Presale?</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-16 mr-16 mb-16'" >
          <v-col cols="12" md="6" :align="'center'">

            <v-card theme="dark"
                    color="transparent"
                    max-width="450"
                    flat
            >
              <v-layout class="mb-2">
                <v-icon size="40" color="purple-lighten-3">mdi-numeric-1-box-outline</v-icon>
                <div class="text-h5 text-purple-lighten-3 pt-1">Install a Wallet</div>
              </v-layout>
            </v-card>

            <v-card theme="dark"
                    color="purple-lighten-3"
                    min-height="240"
                    max-height="100%"
                    max-width="450"
                    variant="outlined"
            >
              <v-card-text style="font-size: 1.2rem;color:#FFF;text-align: justify;">
                Ensure you have a MetaMask wallet or compatible web3 wallet installed on in your browser in order to connect your wallet to the platform.<br><br>
                If you are purchasing on a mobile phone we recommend using the MetaMask In-App browser. Meme Master's 'Connect' button will automatically launch the MetaMask App on the mobile device.
              </v-card-text>
            </v-card>

          </v-col>

          <v-col cols="12" md="6" :align="'center'">

            <v-card theme="dark"
                    color="transparent"
                    max-width="450"
                    flat
            >
              <v-layout class="mb-2" >
                <v-icon size="40" color="purple-lighten-3">mdi-numeric-2-box-outline</v-icon>
                <div class="text-h5 text-purple-lighten-3 pt-1">Connect your Wallet</div>
              </v-layout>
            </v-card>

            <v-card theme="dark"
                    color="purple-lighten-3"
                    min-height="240"
                    max-height="100%"
                    max-width="450"
                    variant="outlined"
            >
              <v-card-text style="font-size: 1.2rem;color:#FFF;text-align: justify;">
                Once you’ve connected your wallet, you’ll be presented with the options with which you can purchase our EMAS token.<br><br>
                Read below for more information on these options and select your choice of payment.
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
      </div>

      <!-- ######################################################################################## -->
      <!-- #################################     BUY OPTIONS      ################################# -->
      <!-- ######################################################################################## -->

      <div id="buyoptions" style="background-color: #F3E5F5;padding-bottom: 16px;">
        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-16'" >
          <v-col cols="12" md="12" :align="'center'" class="mt-8">
              <div class="text-h4 ma-2 text-purple-darken-3">OPTIONS ON HOW TO BUY</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-16 mr-16 mb-16'" >
          <v-col cols="12" md="6" :align="'center'">

            <v-card theme="dark"
                    color="transparent"
                    max-width="450"
                    flat
            >
              <v-layout class="mb-2">
                <v-icon size="40" color="purple-darken-3">mdi-ethereum</v-icon>
                <div class="text-h5 text-purple-darken-3 pt-1">Buy EMAS with Ethereum</div>
              </v-layout>
            </v-card>


            <v-card theme="light"
                    color="purple-darken-3"
                    :min-height="isMobileDevice ? '500' : '420'"
                    max-height="100%"
                    max-width="450"
                    variant="outlined"
            >
            <v-card-text style="font-size: 1.1rem;color:#000000;line-height: normal;text-align: justify;font-weight: 500;">
              Make sure you have enough ETH in your wallet for the gas fees as well as your purchase, you can then use the swap ETH to EMAS and follow the instructions in your wallet.<br><br>
              Type in the amount of ETH you wish to change for EMAS tokens and then click “Convert ETH”. Your wallet provider will ask you to confirm the transaction and will also show you the cost of gas fees.<br><br>
              You can use the 'Claim' button 14 days after the presale to collect your tokens in the same wallet address as you purchased them.
            </v-card-text>

              <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                <v-spacer></v-spacer>
                <v-btn
                  style="color:#FFF;width:80%"
                  variant="elevated"
                  color="#360a3f"
                  size="large"
                  class="font-weight-bold mb-2"
                  @click="handleShowDialog(false, 'buyWithEthDialog')"
                >
                  Buy with ETH Now
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>

            </v-card>

          </v-col>

          <v-col cols="12" md="6" :align="'center'">


            <v-card theme="dark"
                    color="transparent"
                    max-width="450"
                    flat
            >
              <v-layout class="mb-2">
                <!-- <v-icon size="40" color="purple-darken-3">mdi-currency-usd</v-icon> -->
                <v-img src="/img/icons/white-cryptocurrency-coin-tether-usdt-icon-vector-27655890.png" style="max-width:40px"></v-img>
                <div class="text-h5 text-purple-darken-3 pt-1">Buy with USDT</div>
              </v-layout>
            </v-card>

            <v-card theme="light"
                    color="purple-darken-3"
                    :min-height="isMobileDevice ? '470' : '420'"
                    max-height="100%"
                    max-width="450"
                    variant="outlined"
            >
              <v-card-text style="font-size: 1.1rem;color:#000000;line-height: normal;text-align: justify;font-weight: 500;">
                Make sure you have at least $30 USDT in your wallet. Enter the amount of USDT you wish to purchase EMAS tokens with then Click "Convert USDT".<br><br>
                You will then be asked to approve the purchase twice by your wallet. Please make sure you go through two approval steps to complete the transaction.<br><br>
                You can use the 'Claim' button 14 days after the presale to collect your tokens in the same wallet address as you purchased them.
              </v-card-text>

              <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                <v-spacer></v-spacer>
                <v-btn
                  style="color:#FFF;width:80%"
                  variant="elevated"
                  color="#360a3f"
                  size="large"
                  class="font-weight-bold mb-2"
                  @click="handleShowDialog(false, 'buyWithUsdtDialog')"
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

      <div id="stages">

        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" >
          <v-col cols="12" md="12" :align="'center'">
              <div class="text-h4 ma-2 text-purple-lighten-3">PRESALE STAGES</div>
              <div class="text-h5 ma-2 text-white">Meme Master 2023 will have 3 Presale stages</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2' : 'ml-16 mr-16'" >
          <v-col cols="12" md="4" :align="'center'">

            <v-card theme="dark"
                    color="transparent"
                    max-width="350"
                    flat
            >
              <v-layout class="mb-2">
                <v-icon color="green-lighten-2"><img
                        style="width: 28px; margin-top:15px;"
                        src="/img/logos/logo.png" alt="Icon" /></v-icon>
                <div class="text-h5 text-purple-lighten-3 pt-1 pl-2">Stage 1</div>
              </v-layout>
            </v-card>

            <v-card theme="dark"
                    color="purple-lighten-3"
                    min-height="220"
                    max-height="100%"
                    max-width="350"
                    variant="outlined"
            >
              <v-card-text style="font-size: 1.2rem;color:#FFF;text-align: justify;">
                <div class="text-center font-weight-bold">Total Tokens</div>
                <div class="text-center">350 million</div>
                <br>
                <div class="text-center font-weight-bold">Price per EMAS token</div>
                <div class="text-center">$0.005</div>
                <br>
                <div class="text-center font-weight-bold">Total to be raised</div>
                <div class="text-center">$1,750,000</div>
              </v-card-text>
            </v-card>

          </v-col>

          <v-col cols="12" md="4" :align="'center'">

            <v-card theme="dark"
                    color="transparent"
                    max-width="350"
                    flat
            >
              <v-layout class="mb-2">
                <v-icon color="green-lighten-2"><img
                        style="width: 28px; margin-top:15px;"
                        src="/img/logos/logo.png" alt="Icon" /></v-icon>
                <div class="text-h5 text-purple-lighten-3 pt-1 pl-2">Stage 2</div>
              </v-layout>
            </v-card>

            <v-card theme="dark"
                    color="purple-lighten-3"
                    min-height="220"
                    max-height="100%"
                    max-width="350"
                    variant="outlined"
            >
              <v-card-text style="font-size: 1.2rem;color:#FFF;text-align: justify;">
                <div class="text-center font-weight-bold">Total Tokens</div>
                <div class="text-center">250 million</div>
                <br>
                <div class="text-center font-weight-bold">Price per EMAS token</div>
                <div class="text-center">$0.0055</div>
                <br>
                <div class="text-center font-weight-bold">Total to be raised</div>
                <div class="text-center">$1,375,000</div>
              </v-card-text>
            </v-card>

          </v-col>

          <v-col cols="12" md="4" :align="'center'">

            <v-card theme="dark"
                    color="transparent"
                    max-width="350"
                    flat
            >
              <v-layout class="mb-2" >
                <v-icon color="green-lighten-2"><img
                        style="width: 28px; margin-top:15px;"
                        src="/img/logos/logo.png" alt="Icon" /></v-icon>
                <div class="text-h5 text-purple-lighten-3 pt-1 pl-2">Stage 3</div>
              </v-layout>
            </v-card>

            <v-card theme="dark"
                    color="purple-lighten-3"
                    min-height="220"
                    max-height="100%"
                    max-width="350"
                    variant="outlined"
            >
              <v-card-text style="font-size: 1.2rem;color:#FFF;text-align: justify;">
                <div class="text-center font-weight-bold">Total Tokens</div>
                <div class="text-center">200 million</div>
                <br>
                <div class="text-center font-weight-bold">Price per EMAS token</div>
                <div class="text-center">$0.0061</div>
                <br>
                <div class="text-center font-weight-bold">Total to be raised</div>
                <div class="text-center">$1,220,000</div>
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-16 mr-16'" >
          <v-col cols="12" md="4" :align="'center'">
              <div class="text-h5 ma-2 text-purple-lighten-3">HARD CAP</div>
              <div class="text-h6 ma-2 text-white">$4,345,000</div>
          </v-col>

          <v-col cols="12" md="4" :align="'center'">
              <div class="text-h5 ma-2 text-purple-lighten-3">TOKEN LAUNCH PRICE</div>
              <div class="text-h6 ma-2 text-white">$0.0065</div>
          </v-col>

          <v-col cols="12" md="4" :align="'center'">
              <div class="text-h5 ma-2 text-purple-lighten-3">TOKEN CLAIM LIVE</div>
              <div class="text-h6 ma-2 text-white">14 days after stage 3 is completed</div>
          </v-col>
        </v-row>


        <v-row :class="isMobileDevice ? 'mt-2 ml-2 mr-2' : 'mt-2 mb-16'" >
          <v-col cols="12" md="12" :align="'center'">

            <div class="text-body-1 text-white">Each stage will end when either the tokens are sold out or the stage date has expired</div>
            <div class="text-body-1 text-white">In the case of the tokens selling out before the stage date ends then the next stage will start immediately</div>
            <div class="text-body-1 text-white">If the tokens are not sold out in any of the stages then all of the unsold tokens will be burnt after the presale has completed and before the listing</div>


          </v-col>
        </v-row>

      </div>

      <!-- ######################################################################################## -->
      <!-- #######################################     TIERS      ################################# -->
      <!-- ######################################################################################## -->

      <div id="tiers" style="background-color: #F3E5F5;padding-bottom: 16px;">
        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-16'" >
          <v-col cols="12" md="12" :align="'center'" class="mt-8">
              <div class="text-h4 ma-2 text-purple-darken-3">MEME MASTER TIERS INFORMATION</div>
              <div class="text-h5 ma-2 text-purple-darken-3">Holding token tiers will give more access and discounted entry to early new token listing,<br>new project releases, airdrops and much more.</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-16 mr-16 mb-16'" >
          <v-col cols="12" md="12" >

            <v-expansion-panels
              v-model="panel"
              multiple
            >
              <v-expansion-panel >
                <v-expansion-panel-title style="background-color: #7B1FA2;">
                  <v-icon color="green-lighten-2"><img
                        style="width: 28px; border-radius: 50%"
                        src="/img/logos/logo.png" alt="Icon" /></v-icon>
                  <div style="font-size:1.3rem;color:#FFF;margin-left:5px;font-weight:bold">Tier 1 AGI (Artificial Intelligence)</div>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                  <v-col>
                    <div style="font-size:1rem;font-weight:bold">Min holding:  300,000 EMAS Tokens</div>
                    <ul class="ml-4 pt-4" style="font-size:1rem;">
                      <li>Discounted rates on current and future features</li>
                      <li>Airdrops level 1 EMAS Collections and New Token Contributors</li>
                      <li>Limited Early access to music and gaming</li>
                      <li>Limited early access to new products and services</li>
                      <li>MEME and NFT generation discounts on the mememaster trading platform</li>
                      <li>Level 1 EMAS points bonuses throughout the gaming sectors</li>
                    </ul>
                  </v-col>
                </v-expansion-panel-text>

              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title style="background-color: #6A1B9A;">
                  <v-icon color="green-lighten-2"><img
                        style="width: 28px;border-radius: 50%"
                        src="/img/logos/logo.png" alt="Icon" /></v-icon>
                  <div style="font-size:1.3rem;color:#FFF;margin-left:5px;font-weight:bold">Tier 2 ASI (Artificial Super Intelligence)</div>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                  <v-col>
                    <div style="font-size:1rem;font-weight:bold">Min holding:  500,000 EMAS Tokens</div>
                    <ul class="ml-4 pt-4" style="font-size:1rem;">
                      <li>Discounted rates on current and future features</li>
                      <li>Airdrops level 2 premium EMAS Collections and from New Token Contributors</li>
                      <li>Early full access to music and gaming</li>
                      <li>1st and discounted options on limited NFTs offers</li>
                      <li>Early access to new token launcher and offers</li>
                      <li>Access to AI new products and services</li>
                      <li>MEME and NFT generation discounts on the trading platform</li>
                      <li>Level 2 EMAS points bonuses throughout the gaming sectors</li>
                    </ul>
                  </v-col>
                </v-expansion-panel-text>

              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title style="background-color: #4A148C;">
                  <v-icon color="green-lighten-2"><img
                        style="width: 28px; border-radius: 50%"
                        src="/img/logos/logo.png" alt="Icon" /></v-icon>
                  <div style="font-size:1.3rem;color:#FFF;margin-left:5px;font-weight:bold">Tier 3 SAI (Self Awareness)</div>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                  <v-col>
                    <div style="font-size:1rem;font-weight:bold">Min holding:  1,000,000 EMAS Tokens</div>
                    <ul class="ml-4 pt-4" style="font-size:1rem;">
                      <li>Discounted rates on current and future features</li>
                      <li>Airdrops level 3 premium / limited addition EMAS Collections and from New Token Contributors</li>
                      <li>Early full access to premium and limited edition music and gaming</li>
                      <li>1st and discounted options on limited NFTs offers including premium</li>
                      <li>1st access to new token launcher and offers</li>
                      <li>Full Access to newly released AI products and services</li>
                      <li>MEME and NFT generation discounts on the trading platform</li>
                      <li>Level 3 EMAS points bonuses throughout the gaming sectors</li>
                    </ul>
                  </v-col>
                </v-expansion-panel-text>

              </v-expansion-panel>
            </v-expansion-panels>

          </v-col>
        </v-row>
      </div>


      <!-- ######################################################################################## -->
      <!-- ###############################     SECURITY AND AUDIT     ############################# -->
      <!-- ######################################################################################## -->

      <div id="audit" style="color: #FFF;">

        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" >
          <v-col cols="12" md="12" :align="'center'">
              <div class="text-h4 ma-2 text-purple-lighten-3">KYC, AUDIT & SECURITY</div>
              <div class="text-h5 ma-2 text-white">Meme Master has passed the KYC, AUDIT and is secured</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 pt-4' : 'ml-16 mr-16 pt-8'" >

            <v-col cols="12" md="6" :align="'center'">
              <v-btn variant="text">
                <img src="/img/logos/logo_audit.png" style="max-width:100px;cursor: pointer;" @click="gotoLink('https://coinsult.net/projects/mememaster/')" />
              </v-btn>
              <div class="text-h5 ma-2 text-white pt-12">Completed KYC Verification at Coinsult</div>
              <div style="font-size: 16px;" class="text-white"><v-icon style="margin-top:-5px" size="small" color="green">mdi-check</v-icon>Date: 26 July 2023 - Project Owner Identified</div>
            </v-col>

            <v-col cols="12" md="6" :align="'center'">
              <v-btn variant="text">
                <img src="/img/logos/logo_audit.png" style="max-width:100px;cursor: pointer;"  @click="gotoLink('https://github.com/MemeMaster2023/MemeMaster2023_Coinsult_KYC-AUDIT/blob/main/Coinsult_MemeMaster2023_0xfe...1e72_Audit.pdf')"/>
              </v-btn>
              <div class="text-h5 ma-2 text-white pt-12">Audited by Coinsult</div>
              <div style="font-size: 16px;" class="text-white"><v-icon style="margin-top:-5px" size="small" color="green">mdi-check</v-icon>Date: 26 July 2023 - Advanced Manual Smart Contract Audit</div>
              <div style="font-size: 16px;" class="text-white"><v-icon style="margin-top:-5px" size="small" color="green">mdi-check</v-icon>Contract: Oxfe82c0F9967c1D2BD18865F817103F004F172</div>
            </v-col>

        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 pt-4' : 'ml-16 mr-16 pt-8'" >

          <v-col cols="12" md="6" :align="'center'">
            <v-btn variant="text">
              <img src="/img/icons/token_security.png" style="max-width:80px;" @click="gotoLink('https://gopluslabs.io/token-security/1/0xfe82c0ff9967c1d2bd18865f817103f00e4f1e72')"/>
            </v-btn>
            <div class="text-h5 ma-2 text-white pt-12">100% Security by GoPlus</div>
            <div style="font-size: 16px;" class="ma-2 text-white"><v-icon style="margin-top:-5px" size="small" color="green">mdi-check</v-icon>Contract code fully audited by GoPlus and shown to be 100% secure</div>
          </v-col>

          <v-col cols="12" md="6" :align="'center'" >
            <v-btn variant="text">
              <img src="/img/icons/team_finance.png" style="max-width:80px;cursor: pointer;" @click="gotoLink('https://www.team.finance/view-coin/0xfe82c0Ff9967c1D2BD18865F817103F00e4F1e72?name=MemeMaster2023&symbol=EMAS&chainid=0x1')"/>
            </v-btn>
            <div class="text-h5 ma-2 text-white pt-12">Team Lockup</div>
            <div style="font-size: 16px;" class="ma-2 text-white"><v-icon style="margin-top:-5px" size="small" color="green">mdi-check</v-icon>Team Tokens locked for 2 years with Team Finance</div>
          </v-col>

        </v-row>
      </div>


      <!-- ######################################################################################## -->
      <!-- #####################################     TOKENOMICS      ############################## -->
      <!-- ######################################################################################## -->

      <div id="tokenomics" style="background-color: #F3E5F5;padding-bottom: 16px;">
        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-16'" >
          <v-col cols="12" md="12" :align="'center'" class="mt-8">
              <div class="text-h4 ma-2 text-purple-darken-3">MEME MASTER TOKENOMICS</div>
              <div class="text-h5 ma-2 text-purple-darken-3">Token distibution and information</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'mb-4' : 'ml-16 mr-16 mb-8'" >
          <v-col cols="12" md="12" :align="'center'">
            <div id="chart" :style="isMobileDevice ? 'margin-left:' + pieMargin + 'px' : ''">
              <apexchart type="donut" :width="isMobileDevice ? '450' : '600'" :options="chartOptions" :series="series"></apexchart>
            </div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2' : 'ml-12 mr-12'" >

          <v-col cols="12" md="3" :align="'center'">
            <v-chip
              class="pa-6"
              label
              style="background-color: #dcb9ec;width:100%"
              color="#4A148C"
              size="x-large"
              variant="outlined"
            >
             <v-icon size="28px" color="purple-darken-4"  class="mr-4">mdi-ethereum</v-icon>
             <div :style="isMobileDevice ? 'font-weight:bold' : 'font-size: 1.3rem;font-weight:bold'">ERC-20 ETH Token</div>
            </v-chip>
          </v-col>

          <v-col cols="12" md="3" :align="'center'">
            <v-chip
              class="pa-6"
              label
              style="background-color: #dcb9ec;width:100%"
              color="#4A148C"
              size="x-large"
              variant="outlined"
            >
             <v-icon size="28px" color="purple-darken-4" class="mr-4">mdi-circle-multiple-outline</v-icon>
             <div v-if="!isMobileDevice" :style="isMobileDevice ? 'font-weight:bold' : 'font-size: 1.3rem;font-weight:bold'">Supply: 1,000,000,000</div>
             <div v-else :style="isMobileDevice ? 'font-weight:bold' : 'font-size: 1.3rem;font-weight:bold'">Supply: 1,000,000,000</div>
            </v-chip>
          </v-col>

          <v-col cols="12" md="3" :align="'center'">
            <v-chip
              class="pa-6"
              label
              style="background-color: #dcb9ec;width:100%"
              color="#4A148C"
              size="x-large"
              variant="outlined"
            >
            <v-icon color="green-lighten-2"><img
                        style="width: 32px;margin-left:5px;"
                        src="/img/logos/logo.png" alt="Icon" /></v-icon>
              <div :style="isMobileDevice ? 'font-weight:bold;margin-left:10px' : 'font-size: 1.3rem;font-weight:bold;margin-left:15px'">Symbol: EMAS</div>
            </v-chip>
          </v-col>

          <v-col cols="12" md="3" :align="'center'">
            <v-chip
              class="pa-6"
              label
              style="background-color: #dcb9ec;width:100%"
              color="#4A148C"
              size="x-large"
              variant="outlined"
            >
              <v-icon size="28px" color="purple-darken-4" class="mr-4">mdi-lock-check</v-icon>
              <div :style="isMobileDevice ? 'font-weight:bold;margin-left:10px' : 'font-size: 1.3rem;font-weight:bold;margin-left:10px'">Team Tokens Locked</div>
            </v-chip>
          </v-col>

        </v-row>


        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-12 mr-12 mb-16'" >

          <v-col cols="12" md="12" :align="'center'">

              <v-sheet
                :class="isMobileDevice ? 'pa-2' : 'pa-2'"
                label
                style="background-color: #dcb9ec;width:100%;border: #4A148C 1px solid;border-radius: 5px;"
                color="#4A148C"
                variant="outlined"
              >
               <div :style="isMobileDevice ? 'font-weight:bold;color:#4A148C;font-size: 0.8rem;' : 'font-size: 1rem;font-weight:bold;color:#4A148C'"
                    v-clipboard:copy.stop="0xfe82c0Ff9967c1D2BD18865F817103F00e4F1e72"
                    v-clipboard:success="handleSuccess"
                    v-clipboard:error="handleError"
                >EMAS Contract Address: 0xfe82c0Ff9967c1D2BD18865F817103F00e4F1e72</div>
               <div :style="isMobileDevice ? 'font-weight:bold;color:#4A148C;font-size: 0.8rem;' : 'font-size: 1rem;font-weight:bold;color:#4A148C'"
                    v-clipboard:copy.stop="0xbEcff770Ef81F4aE5Cc73F992BB8e0FB3Ab96859"
                    v-clipboard:success="handleSuccess"
                    v-clipboard:error="handleError"
                >EMAS Team Token Lockup Address: 0xbEcff770Ef81F4aE5Cc73F992BB8e0FB3Ab96859</div>
               <div :style="isMobileDevice ? 'font-weight:bold;color:#4A148C;font-size: 0.8rem;' : 'font-size: 1rem;font-weight:bold;color:#4A148C'"
                    v-clipboard:copy.stop="0x000000000000000000000000000000000000dEaD"
                    v-clipboard:success="handleSuccess"
                    v-clipboard:error="handleError">EMAS Burn Address: 0x0000000000000......0000000000000dEaD</div><br>
               <div :style="isMobileDevice ? 'font-weight:bold;color:#F44336;font-size: 1rem;' : 'font-size: 1rem;font-weight:bold;color:#F44336'">!! Do not send funds to this Contract !!</div>
               <div :style="isMobileDevice ? 'font-weight:bold;color:#F44336;font-size: 1rem;' : 'font-size: 1rem;font-weight:bold;color:#F44336'">We cannot return funds sent to this contract address.</div>
              </v-sheet>

          </v-col>

        </v-row>

      </div>

      <!-- ######################################################################################## -->
      <!-- #####################################     NEW TO CRYPTO      ############################## -->
      <!-- ######################################################################################## -->

      <div id="newtocrypto">
        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-16'" >
          <v-col cols="12" md="12" :align="'center'" class="mt-4">
            <div class="text-h4 ma-2 text-purple-lighten-3">NEW TO CRYPTO</div>
            <div :class="isMobileDevice ? 'pa-2 ml-2 mr-2 text-white' : 'pa-2 ml-16 mr-16 text-white'" style="font-size: 1.5rem;">
              If you're new to the world of cryptocurrency, we're here to help you navigate this exciting journey. Please fill out the form below so we can better understand your needs and provide you with the right information and guidance.
            </div>
          </v-col>
        </v-row>
        <v-form @submit.prevent="sendContactForm()" ref="newCryptoForm">
          <v-row :class="isMobileDevice ? 'ml-2 mr-2' : 'ml-16 mr-16'" style="color: #fff;">
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="First Name"
                    class="mt-2"
                    variant="outlined"
                    v-model="firstName"
                    :rules="rules"
                    tabindex="1"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Phone number or Email"
                    class="mt-2"
                    variant="outlined"
                    v-model="phoneOrEmail"
                    :rules="rules"
                    tabindex="4"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-select
                    label="Country"
                    return-object
                    :items="countriesCode"
                    item-title="name"
                    item-value="dial_code"
                    v-model="countryCodeSelected"
                    variant="outlined"
                    class="mt-2"
                    theme="dark"
                    tabindex="3"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Last Name"
                    class="mt-2"
                    variant="outlined"
                    v-model="lastName"
                    :rules="rules"
                    tabindex="2"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-select
                    label="Best Time To Contact"
                    return-object
                    :items="bestTimeToContacts"
                    item-title="name"
                    item-value="id"
                    v-model="bestTimeToContactSelected"
                    variant="outlined"
                    class="mt-2"
                    theme="dark"
                    tabindex="5"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="12">
                  <v-select
                    label="Investment Budget"
                    return-object
                    :items="investmentBudgets"
                    item-title="name"
                    item-value="id"
                    v-model="investmentBudgetSelected"
                    variant="outlined"
                    class="mt-2"
                    theme="dark"
                    tabindex="6"
                  ></v-select>
                </v-col>
    
              </v-row>
            </v-col>

      
              <v-col :align="'center'" cols="12" md="12" style="margin: 0 auto;">
                <v-textarea
                  v-model="message"
                  theme="dark"
                  class="mb-2"
                  label="Your Message"
                  auto-grow
                  variant="outlined"
                  :placeholder="'Type your message here...'"
                  persistent-placeholder
                  clearable
                  rows="3"
                  maxlength="2000"
                  row-height="25"
                  shaped
                  hint="Max. 2000 characters"
                  counter
                ></v-textarea>
              </v-col>

          </v-row>


          <v-row :class="isMobileDevice ? 'mb-12 ml-2 mr-2' : 'ml-16 mr-16 mb-16'">
            <v-col :align="'center'" cols="12" md="12" style="margin: 0 auto;">
              <v-btn
                style="color:#FFF; width: 100%;"
                variant="elevated"
                color="#360a3f"
                size="x-large"
                class="font-weight-bold mb-2"
                type="submit"
              >
                Send Message
              </v-btn>
              <v-space></v-space>
            </v-col>
          </v-row>
        </v-form>
      </div>

      <!-- ######################################################################################## -->
      <!-- ############################     DIALOGS AND COMPONENTS   ###############################-->
      <!-- ######################################################################################## -->
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
            <v-btn variant="text" class="ma-4" @click="learnMoreDialog = true"
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
          <v-toolbar color="#241d43">
            <v-btn v-if="isMobileDevice" icon color="white" @click="buyWithEthDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span class="text-white ml-4" style="font-size: 1.2rem">Buy EMAS with ETH</span>
            <v-spacer></v-spacer>
            <v-btn v-if="!isMobileDevice" icon color="white" @click="buyWithEthDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="mb-8">
            <v-row>
              <v-col cols="12">
                <label for="" style="font-weight: bold;">Selling</label>
                <v-text-field
                  placeholder="0"
                  class="mt-2"
                  v-on:keyup="convertAmount('ethToEmas', amountEth)"
                  v-model="amountEth"
                  @focus="clearOnFocus('amountEth')"
                  @input="ensureNonNegative('amountEth')"
                  type="number"
                  min="0"
                >
                  <template v-slot:append-inner>
                    <v-icon size="28px" color="purple-darken-4">mdi-ethereum</v-icon>
                    <span style="font-weight: 400; margin-left: 10px;">ETH</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <label for="" style="font-weight: bold;">Buying</label>
                <v-text-field
                  class="mt-2"
                  placeholder="0"
                  v-model="amountEmasForEthDiagLog"
                  v-on:keyup="convertAmount('emasToEth', amountEmasForEthDiagLog)"
                  @focus="clearOnFocus('amountEmasForEthDiagLog')"
                  @input="ensureNonNegative('amountEmasForEthDiagLog')"
                  type="number"
                  min="0"
                >
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
                  Convert ETH
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
          <v-toolbar color="#241d43">
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
                <v-text-field
                  placeholder="0"
                  class="mt-2"
                  v-model="amountUsdt"
                  v-on:keyup="convertAmount('usdtToEmas', amountUsdt)"
                  @focus="clearOnFocus('amountUsdt')"
                  @input="ensureNonNegative('amountUsdt')"
                  type="number"
                  min="0"
                >
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
                <v-text-field
                  placeholder="0"
                  class="mt-2"
                  v-model="amountEmasForUsdtDiagLog"
                  v-on:keyup="convertAmount('emasToUsdt', amountEmasForUsdtDiagLog)"
                  @focus="clearOnFocus('amountEmasForUsdtDiagLog')"
                  @input="ensureNonNegative('amountEmasForUsdtDiagLog')"
                  type="number"
                  min="0"
                >
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
                  Convert USDT
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- DIALOG TEMP PRESALE NOT LIVE -->
      <v-dialog v-model="presaleNotLive" transition="dialog-bottom-transition" :fullscreen="isMobileDevice"
        :min-width="isMobileDevice ? 300 : 500" max-width="600">
        <v-card height="100%" color="#F3E5F5">
          <v-toolbar color="#241d43">
            <v-btn v-if="isMobileDevice" icon color="white" @click="presaleNotLive = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span class="text-white ml-4" style="font-size: 1.2rem">Presale is starting soon!</span>
            <v-spacer></v-spacer>
            <v-btn v-if="!isMobileDevice" icon color="white" @click="presaleNotLive = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="text-h6 ma-8">
             The Meme Master 2023 Presale is going live on August 30th, 2023 at 00:00 CET (10pm UTC).
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- DIALOG donateEthDialog -->
      <v-dialog v-model="donateEthDialog" transition="dialog-bottom-transition" :fullscreen="isMobileDevice"
        :min-width="isMobileDevice ? 300 : 500" max-width="600">
        <v-card height="100%" color="#F3E5F5">
          <v-toolbar color="#241d43">
            <v-btn v-if="isMobileDevice" icon color="white" @click="donateEthDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span class="text-white ml-4" style="font-size: 1.2rem">Donate with ETH</span>
            <v-spacer></v-spacer>
            <v-btn v-if="!isMobileDevice" icon color="white" @click="donateEthDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="mb-8">
            <v-row>
              <v-col cols="12">
                <label for="" style="font-weight: bold;">Quantity</label>
                <v-text-field
                  placeholder="0"
                  class="mt-2"
                  type="number"
                  min="0"
                >
                  <template v-slot:append-inner>
                    <v-icon size="28px" color="purple-darken-4">mdi-ethereum</v-icon>
                    <span style="font-weight: 400; margin-left: 10px;">ETH</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum necessitatibus cumque porro possimus!</div>
              </v-col>
              <v-col cols="12">
                <v-btn class="text-white" size="large" style="width:100%;" color="#360a3f">
                  DONATE ETH
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- DIALOG donateEthDialog -->
      <v-dialog v-model="donateUsdtDialog" transition="dialog-bottom-transition" :fullscreen="isMobileDevice"
        :min-width="isMobileDevice ? 300 : 500" max-width="600">
        <v-card height="100%" color="#F3E5F5">
          <v-toolbar color="#241d43">
            <v-btn v-if="isMobileDevice" icon color="white" @click="donateUsdtDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span class="text-white ml-4" style="font-size: 1.2rem">Donate with USDT</span>
            <v-spacer></v-spacer>
            <v-btn v-if="!isMobileDevice" icon color="white" @click="donateUsdtDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="mb-8">
            <v-row>
              <v-col cols="12">
                <label for="" style="font-weight: bold;">Quantity</label>
                <v-text-field
                  placeholder="0"
                  class="mt-2"
                  type="number"
                  min="0"
                >
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
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi doloremque obcaecati tempore ratione mollitia rem error quam maiores totam qui autem, sapiente non eaque dolorum in fuga ipsam ducimus.</div>
              </v-col>
              <v-col cols="12">
                <v-btn class="text-white" size="large" style="width:100%;" color="#360a3f">
                  DONATE USDT
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- ############################## LEARN MORE DIALOG ################################ -->
      <v-dialog
          v-model="learnMoreDialog"
          fullscreen
        >
          <v-card theme="dark" color="#2b2b2b">
            <v-toolbar
              color="deep-purple-darken-4"
            >
            <v-btn
              icon
              @click="learnMoreDialog = false"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-toolbar-title>Learn More...</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn
                icon
                @click="learnMoreDialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text >

              <v-sheet
                class="d-flex flex-wrap mx-auto px-4 py-4 mt-4"
                elevation="4"
                rounded
                width="100%"
              >
                <v-row>
                  <v-col cols="12" md="8">
                    <div id="learnmore_3">
                      <h2 class="text-h4 font-weight-bold">Connect Wallet or Walletless</h2>

                      <div class="text-h6 mt-2 mb-4">
                        Signing up is a breeze! You can use your Web 3 wallets (like MetaMask or Trust Wallet) or simply use your email address for FIAT via standard OTPs, with no blockchain knowledge required.
                      </div>

                        <div id="newlist" class="text-h6 ml-2">
                          <ul>
                            <li>Connect or sign up now and get 500 Free credits</li>
                            <li>Use web3 wallets or your regular email</li>
                            <li>No blockchain knowledge required</li>
                          </ul>
                        </div>
                        <br>

                        <div class="text-h6 mt-2 mb-4">
                          New to crypto? Click the guide below to help you onboard.
                        </div>

                        <v-btn
                          style="text-transform: none !important;"
                          variant="outlined"
                          size="large"
                          color="indigo-lighten-2"
                          prepend-icon="mdi-wallet"
                          @click="gotoLink('https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask')"
                        >
                        How to Create a Wallet?
                        </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" :align="'right'" align-self="center">
                    <v-img style="max-width: 350px; border-radius: 10px;"
                           src="/img/home/crypto_onboarding.webp"></v-img>
                  </v-col>
                </v-row>
              </v-sheet>
              
            </v-card-text>
          </v-card>
        </v-dialog>

      <!-- ############################## SNACKBARS ####################################### -->
     <v-snackbar
        v-model="snackbar"
        :timeout="4000"
      >
      <v-layout>
        <v-icon color="green" class="mr-2">mdi-check-circle-outline</v-icon>
        {{ snackbarText }}
      </v-layout>

        <template v-slot:actions>
          <v-btn
            color="pink"
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store/index'
import axios from 'axios'
import MetaMaskConnect from '@/components/wallets/MetaMaskConnect'
import WalletConnect from '@/components/wallets/WalletConnect'
import { scroller } from 'vue-scrollto/src/scrollTo'
import MemeMasterAPI from '../../clients/MemeMasterAPI'
import Web3 from 'web3';
// const web3 = new Web3(new Web3.providers.HttpProvider());
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
    snackbar: false,
    snackbarText: '',
    stage1: 0.005,
    stage2: 0.0055,
    stage3: 0.0061,
    ethPrice: 0,
    usdtPrice: 0,
    amountEth: 0,
    amountUsdt: 0,
    presaleNotLive: false,
    learnMoreDialog: false,
    amountEmasForUsdtDiagLog: 0,
    amountEmasForEthDiagLog: 0,
    connectWalletDialog: false,
    buyWithEthDialog: false,
    buyWithUsdtDialog: false,
    donateEthDialog: false,
    donateUsdtDialog: false,
    showConfirmation: false,
    getPriceInterval: null,
    firstName: '',
    lastName: '',
    phoneOrEmail: '',
    investmentBudgetSelected: { id: 0, name: '0$ - 5k$'},
    bestTimeToContactSelected: { id: 0, name: 'Morning'},
    countryCodeSelected: { id: 0, name: 'Select your country...'},
    investmentBudgets: [
      {
        id: 0,
        name: '0$ - 5k$'
      },
      {
        id: 1,
        name: '5k$ - 10k$'
      },
      {
        id: 2,
        name: '10k$ - 20k$'
      },
      {
        id: 3,
        name: '20k$ - 50k$'
      }
    ],
    bestTimeToContacts: [
      {
        id: 0,
        name: 'Morning'
      },
      {
        id: 1,
        name: 'Afternoon'
      },
      {
        id: 2,
        name: 'Evening'
      },
    ],
    countriesCode: [
      {
      "name": "Afghanistan",
      "dial_code": "+93",
      "code": "AF"
      },
      {
      "name": "Aland Islands",
      "dial_code": "+358",
      "code": "AX"
      },
      {
      "name": "Albania",
      "dial_code": "+355",
      "code": "AL"
      },
      {
      "name": "Algeria",
      "dial_code": "+213",
      "code": "DZ"
      },
      {
      "name": "AmericanSamoa",
      "dial_code": "+1684",
      "code": "AS"
      },
      {
      "name": "Andorra",
      "dial_code": "+376",
      "code": "AD"
      },
      {
      "name": "Angola",
      "dial_code": "+244",
      "code": "AO"
      },
      {
      "name": "Anguilla",
      "dial_code": "+1264",
      "code": "AI"
      },
      {
      "name": "Antarctica",
      "dial_code": "+672",
      "code": "AQ"
      },
      {
      "name": "Antigua and Barbuda",
      "dial_code": "+1268",
      "code": "AG"
      },
      {
      "name": "Argentina",
      "dial_code": "+54",
      "code": "AR"
      },
      {
      "name": "Armenia",
      "dial_code": "+374",
      "code": "AM"
      },
      {
      "name": "Aruba",
      "dial_code": "+297",
      "code": "AW"
      },
      {
      "name": "Australia",
      "dial_code": "+61",
      "code": "AU"
      },
      {
      "name": "Austria",
      "dial_code": "+43",
      "code": "AT"
      },
      {
      "name": "Azerbaijan",
      "dial_code": "+994",
      "code": "AZ"
      },
      {
      "name": "Bahamas",
      "dial_code": "+1242",
      "code": "BS"
      },
      {
      "name": "Bahrain",
      "dial_code": "+973",
      "code": "BH"
      },
      {
      "name": "Bangladesh",
      "dial_code": "+880",
      "code": "BD"
      },
      {
      "name": "Barbados",
      "dial_code": "+1246",
      "code": "BB"
      },
      {
      "name": "Belarus",
      "dial_code": "+375",
      "code": "BY"
      },
      {
      "name": "Belgium",
      "dial_code": "+32",
      "code": "BE"
      },
      {
      "name": "Belize",
      "dial_code": "+501",
      "code": "BZ"
      },
      {
      "name": "Benin",
      "dial_code": "+229",
      "code": "BJ"
      },
      {
      "name": "Bermuda",
      "dial_code": "+1441",
      "code": "BM"
      },
      {
      "name": "Bhutan",
      "dial_code": "+975",
      "code": "BT"
      },
      {
      "name": "Bolivia, Plurinational State of",
      "dial_code": "+591",
      "code": "BO"
      },
      {
      "name": "Bosnia and Herzegovina",
      "dial_code": "+387",
      "code": "BA"
      },
      {
      "name": "Botswana",
      "dial_code": "+267",
      "code": "BW"
      },
      {
      "name": "Brazil",
      "dial_code": "+55",
      "code": "BR"
      },
      {
      "name": "British Indian Ocean Territory",
      "dial_code": "+246",
      "code": "IO"
      },
      {
      "name": "Brunei Darussalam",
      "dial_code": "+673",
      "code": "BN"
      },
      {
      "name": "Bulgaria",
      "dial_code": "+359",
      "code": "BG"
      },
      {
      "name": "Burkina Faso",
      "dial_code": "+226",
      "code": "BF"
      },
      {
      "name": "Burundi",
      "dial_code": "+257",
      "code": "BI"
      },
      {
      "name": "Cambodia",
      "dial_code": "+855",
      "code": "KH"
      },
      {
      "name": "Cameroon",
      "dial_code": "+237",
      "code": "CM"
      },
      {
      "name": "Canada",
      "dial_code": "+1",
      "code": "CA"
      },
      {
      "name": "Cape Verde",
      "dial_code": "+238",
      "code": "CV"
      },
      {
      "name": "Cayman Islands",
      "dial_code": "+ 345",
      "code": "KY"
      },
      {
      "name": "Central African Republic",
      "dial_code": "+236",
      "code": "CF"
      },
      {
      "name": "Chad",
      "dial_code": "+235",
      "code": "TD"
      },
      {
      "name": "Chile",
      "dial_code": "+56",
      "code": "CL"
      },
      {
      "name": "China",
      "dial_code": "+86",
      "code": "CN"
      },
      {
      "name": "Christmas Island",
      "dial_code": "+61",
      "code": "CX"
      },
      {
      "name": "Cocos (Keeling) Islands",
      "dial_code": "+61",
      "code": "CC"
      },
      {
      "name": "Colombia",
      "dial_code": "+57",
      "code": "CO"
      },
      {
      "name": "Comoros",
      "dial_code": "+269",
      "code": "KM"
      },
      {
      "name": "Congo",
      "dial_code": "+242",
      "code": "CG"
      },
      {
      "name": "Congo, The Democratic Republic of the Congo",
      "dial_code": "+243",
      "code": "CD"
      },
      {
      "name": "Cook Islands",
      "dial_code": "+682",
      "code": "CK"
      },
      {
      "name": "Costa Rica",
      "dial_code": "+506",
      "code": "CR"
      },
      {
      "name": "Cote d'Ivoire",
      "dial_code": "+225",
      "code": "CI"
      },
      {
      "name": "Croatia",
      "dial_code": "+385",
      "code": "HR"
      },
      {
      "name": "Cuba",
      "dial_code": "+53",
      "code": "CU"
      },
      {
      "name": "Cyprus",
      "dial_code": "+357",
      "code": "CY"
      },
      {
      "name": "Czech Republic",
      "dial_code": "+420",
      "code": "CZ"
      },
      {
      "name": "Denmark",
      "dial_code": "+45",
      "code": "DK"
      },
      {
      "name": "Djibouti",
      "dial_code": "+253",
      "code": "DJ"
      },
      {
      "name": "Dominica",
      "dial_code": "+1767",
      "code": "DM"
      },
      {
      "name": "Dominican Republic",
      "dial_code": "+1849",
      "code": "DO"
      },
      {
      "name": "Ecuador",
      "dial_code": "+593",
      "code": "EC"
      },
      {
      "name": "Egypt",
      "dial_code": "+20",
      "code": "EG"
      },
      {
      "name": "El Salvador",
      "dial_code": "+503",
      "code": "SV"
      },
      {
      "name": "Equatorial Guinea",
      "dial_code": "+240",
      "code": "GQ"
      },
      {
      "name": "Eritrea",
      "dial_code": "+291",
      "code": "ER"
      },
      {
      "name": "Estonia",
      "dial_code": "+372",
      "code": "EE"
      },
      {
      "name": "Ethiopia",
      "dial_code": "+251",
      "code": "ET"
      },
      {
      "name": "Falkland Islands (Malvinas)",
      "dial_code": "+500",
      "code": "FK"
      },
      {
      "name": "Faroe Islands",
      "dial_code": "+298",
      "code": "FO"
      },
      {
      "name": "Fiji",
      "dial_code": "+679",
      "code": "FJ"
      },
      {
      "name": "Finland",
      "dial_code": "+358",
      "code": "FI"
      },
      {
      "name": "France",
      "dial_code": "+33",
      "code": "FR"
      },
      {
      "name": "French Guiana",
      "dial_code": "+594",
      "code": "GF"
      },
      {
      "name": "French Polynesia",
      "dial_code": "+689",
      "code": "PF"
      },
      {
      "name": "Gabon",
      "dial_code": "+241",
      "code": "GA"
      },
      {
      "name": "Gambia",
      "dial_code": "+220",
      "code": "GM"
      },
      {
      "name": "Georgia",
      "dial_code": "+995",
      "code": "GE"
      },
      {
      "name": "Germany",
      "dial_code": "+49",
      "code": "DE"
      },
      {
      "name": "Ghana",
      "dial_code": "+233",
      "code": "GH"
      },
      {
      "name": "Gibraltar",
      "dial_code": "+350",
      "code": "GI"
      },
      {
      "name": "Greece",
      "dial_code": "+30",
      "code": "GR"
      },
      {
      "name": "Greenland",
      "dial_code": "+299",
      "code": "GL"
      },
      {
      "name": "Grenada",
      "dial_code": "+1473",
      "code": "GD"
      },
      {
      "name": "Guadeloupe",
      "dial_code": "+590",
      "code": "GP"
      },
      {
      "name": "Guam",
      "dial_code": "+1671",
      "code": "GU"
      },
      {
      "name": "Guatemala",
      "dial_code": "+502",
      "code": "GT"
      },
      {
      "name": "Guernsey",
      "dial_code": "+44",
      "code": "GG"
      },
      {
      "name": "Guinea",
      "dial_code": "+224",
      "code": "GN"
      },
      {
      "name": "Guinea-Bissau",
      "dial_code": "+245",
      "code": "GW"
      },
      {
      "name": "Guyana",
      "dial_code": "+595",
      "code": "GY"
      },
      {
      "name": "Haiti",
      "dial_code": "+509",
      "code": "HT"
      },
      {
      "name": "Holy See (Vatican City State)",
      "dial_code": "+379",
      "code": "VA"
      },
      {
      "name": "Honduras",
      "dial_code": "+504",
      "code": "HN"
      },
      {
      "name": "Hong Kong",
      "dial_code": "+852",
      "code": "HK"
      },
      {
      "name": "Hungary",
      "dial_code": "+36",
      "code": "HU"
      },
      {
      "name": "Iceland",
      "dial_code": "+354",
      "code": "IS"
      },
      {
      "name": "India",
      "dial_code": "+91",
      "code": "IN"
      },
      {
      "name": "Indonesia",
      "dial_code": "+62",
      "code": "ID"
      },
      {
      "name": "Iran, Islamic Republic of Persian Gulf",
      "dial_code": "+98",
      "code": "IR"
      },
      {
      "name": "Iraq",
      "dial_code": "+964",
      "code": "IQ"
      },
      {
      "name": "Ireland",
      "dial_code": "+353",
      "code": "IE"
      },
      {
      "name": "Isle of Man",
      "dial_code": "+44",
      "code": "IM"
      },
      {
      "name": "Israel",
      "dial_code": "+972",
      "code": "IL"
      },
      {
      "name": "Italy",
      "dial_code": "+39",
      "code": "IT"
      },
      {
      "name": "Jamaica",
      "dial_code": "+1876",
      "code": "JM"
      },
      {
      "name": "Japan",
      "dial_code": "+81",
      "code": "JP"
      },
      {
      "name": "Jersey",
      "dial_code": "+44",
      "code": "JE"
      },
      {
      "name": "Jordan",
      "dial_code": "+962",
      "code": "JO"
      },
      {
      "name": "Kazakhstan",
      "dial_code": "+77",
      "code": "KZ"
      },
      {
      "name": "Kenya",
      "dial_code": "+254",
      "code": "KE"
      },
      {
      "name": "Kiribati",
      "dial_code": "+686",
      "code": "KI"
      },
      {
      "name": "Korea, Democratic People's Republic of Korea",
      "dial_code": "+850",
      "code": "KP"
      },
      {
      "name": "Korea, Republic of South Korea",
      "dial_code": "+82",
      "code": "KR"
      },
      {
      "name": "Kuwait",
      "dial_code": "+965",
      "code": "KW"
      },
      {
      "name": "Kyrgyzstan",
      "dial_code": "+996",
      "code": "KG"
      },
      {
      "name": "Laos",
      "dial_code": "+856",
      "code": "LA"
      },
      {
      "name": "Latvia",
      "dial_code": "+371",
      "code": "LV"
      },
      {
      "name": "Lebanon",
      "dial_code": "+961",
      "code": "LB"
      },
      {
      "name": "Lesotho",
      "dial_code": "+266",
      "code": "LS"
      },
      {
      "name": "Liberia",
      "dial_code": "+231",
      "code": "LR"
      },
      {
      "name": "Libyan Arab Jamahiriya",
      "dial_code": "+218",
      "code": "LY"
      },
      {
      "name": "Liechtenstein",
      "dial_code": "+423",
      "code": "LI"
      },
      {
      "name": "Lithuania",
      "dial_code": "+370",
      "code": "LT"
      },
      {
      "name": "Luxembourg",
      "dial_code": "+352",
      "code": "LU"
      },
      {
      "name": "Macao",
      "dial_code": "+853",
      "code": "MO"
      },
      {
      "name": "Macedonia",
      "dial_code": "+389",
      "code": "MK"
      },
      {
      "name": "Madagascar",
      "dial_code": "+261",
      "code": "MG"
      },
      {
      "name": "Malawi",
      "dial_code": "+265",
      "code": "MW"
      },
      {
      "name": "Malaysia",
      "dial_code": "+60",
      "code": "MY"
      },
      {
      "name": "Maldives",
      "dial_code": "+960",
      "code": "MV"
      },
      {
      "name": "Mali",
      "dial_code": "+223",
      "code": "ML"
      },
      {
      "name": "Malta",
      "dial_code": "+356",
      "code": "MT"
      },
      {
      "name": "Marshall Islands",
      "dial_code": "+692",
      "code": "MH"
      },
      {
      "name": "Martinique",
      "dial_code": "+596",
      "code": "MQ"
      },
      {
      "name": "Mauritania",
      "dial_code": "+222",
      "code": "MR"
      },
      {
      "name": "Mauritius",
      "dial_code": "+230",
      "code": "MU"
      },
      {
      "name": "Mayotte",
      "dial_code": "+262",
      "code": "YT"
      },
      {
      "name": "Mexico",
      "dial_code": "+52",
      "code": "MX"
      },
      {
      "name": "Micronesia, Federated States of Micronesia",
      "dial_code": "+691",
      "code": "FM"
      },
      {
      "name": "Moldova",
      "dial_code": "+373",
      "code": "MD"
      },
      {
      "name": "Monaco",
      "dial_code": "+377",
      "code": "MC"
      },
      {
      "name": "Mongolia",
      "dial_code": "+976",
      "code": "MN"
      },
      {
      "name": "Montenegro",
      "dial_code": "+382",
      "code": "ME"
      },
      {
      "name": "Montserrat",
      "dial_code": "+1664",
      "code": "MS"
      },
      {
      "name": "Morocco",
      "dial_code": "+212",
      "code": "MA"
      },
      {
      "name": "Mozambique",
      "dial_code": "+258",
      "code": "MZ"
      },
      {
      "name": "Myanmar",
      "dial_code": "+95",
      "code": "MM"
      },
      {
      "name": "Namibia",
      "dial_code": "+264",
      "code": "NA"
      },
      {
      "name": "Nauru",
      "dial_code": "+674",
      "code": "NR"
      },
      {
      "name": "Nepal",
      "dial_code": "+977",
      "code": "NP"
      },
      {
      "name": "Netherlands",
      "dial_code": "+31",
      "code": "NL"
      },
      {
      "name": "Netherlands Antilles",
      "dial_code": "+599",
      "code": "AN"
      },
      {
      "name": "New Caledonia",
      "dial_code": "+687",
      "code": "NC"
      },
      {
      "name": "New Zealand",
      "dial_code": "+64",
      "code": "NZ"
      },
      {
      "name": "Nicaragua",
      "dial_code": "+505",
      "code": "NI"
      },
      {
      "name": "Niger",
      "dial_code": "+227",
      "code": "NE"
      },
      {
      "name": "Nigeria",
      "dial_code": "+234",
      "code": "NG"
      },
      {
      "name": "Niue",
      "dial_code": "+683",
      "code": "NU"
      },
      {
      "name": "Norfolk Island",
      "dial_code": "+672",
      "code": "NF"
      },
      {
      "name": "Northern Mariana Islands",
      "dial_code": "+1670",
      "code": "MP"
      },
      {
      "name": "Norway",
      "dial_code": "+47",
      "code": "NO"
      },
      {
      "name": "Oman",
      "dial_code": "+968",
      "code": "OM"
      },
      {
      "name": "Pakistan",
      "dial_code": "+92",
      "code": "PK"
      },
      {
      "name": "Palau",
      "dial_code": "+680",
      "code": "PW"
      },
      {
      "name": "Palestinian Territory, Occupied",
      "dial_code": "+970",
      "code": "PS"
      },
      {
      "name": "Panama",
      "dial_code": "+507",
      "code": "PA"
      },
      {
      "name": "Papua New Guinea",
      "dial_code": "+675",
      "code": "PG"
      },
      {
      "name": "Paraguay",
      "dial_code": "+595",
      "code": "PY"
      },
      {
      "name": "Peru",
      "dial_code": "+51",
      "code": "PE"
      },
      {
      "name": "Philippines",
      "dial_code": "+63",
      "code": "PH"
      },
      {
      "name": "Pitcairn",
      "dial_code": "+872",
      "code": "PN"
      },
      {
      "name": "Poland",
      "dial_code": "+48",
      "code": "PL"
      },
      {
      "name": "Portugal",
      "dial_code": "+351",
      "code": "PT"
      },
      {
      "name": "Puerto Rico",
      "dial_code": "+1939",
      "code": "PR"
      },
      {
      "name": "Qatar",
      "dial_code": "+974",
      "code": "QA"
      },
      {
      "name": "Romania",
      "dial_code": "+40",
      "code": "RO"
      },
      {
      "name": "Russia",
      "dial_code": "+7",
      "code": "RU"
      },
      {
      "name": "Rwanda",
      "dial_code": "+250",
      "code": "RW"
      },
      {
      "name": "Reunion",
      "dial_code": "+262",
      "code": "RE"
      },
      {
      "name": "Saint Barthelemy",
      "dial_code": "+590",
      "code": "BL"
      },
      {
      "name": "Saint Helena, Ascension and Tristan Da Cunha",
      "dial_code": "+290",
      "code": "SH"
      },
      {
      "name": "Saint Kitts and Nevis",
      "dial_code": "+1869",
      "code": "KN"
      },
      {
      "name": "Saint Lucia",
      "dial_code": "+1758",
      "code": "LC"
      },
      {
      "name": "Saint Martin",
      "dial_code": "+590",
      "code": "MF"
      },
      {
      "name": "Saint Pierre and Miquelon",
      "dial_code": "+508",
      "code": "PM"
      },
      {
      "name": "Saint Vincent and the Grenadines",
      "dial_code": "+1784",
      "code": "VC"
      },
      {
      "name": "Samoa",
      "dial_code": "+685",
      "code": "WS"
      },
      {
      "name": "San Marino",
      "dial_code": "+378",
      "code": "SM"
      },
      {
      "name": "Sao Tome and Principe",
      "dial_code": "+239",
      "code": "ST"
      },
      {
      "name": "Saudi Arabia",
      "dial_code": "+966",
      "code": "SA"
      },
      {
      "name": "Senegal",
      "dial_code": "+221",
      "code": "SN"
      },
      {
      "name": "Serbia",
      "dial_code": "+381",
      "code": "RS"
      },
      {
      "name": "Seychelles",
      "dial_code": "+248",
      "code": "SC"
      },
      {
      "name": "Sierra Leone",
      "dial_code": "+232",
      "code": "SL"
      },
      {
      "name": "Singapore",
      "dial_code": "+65",
      "code": "SG"
      },
      {
      "name": "Slovakia",
      "dial_code": "+421",
      "code": "SK"
      },
      {
      "name": "Slovenia",
      "dial_code": "+386",
      "code": "SI"
      },
      {
      "name": "Solomon Islands",
      "dial_code": "+677",
      "code": "SB"
      },
      {
      "name": "Somalia",
      "dial_code": "+252",
      "code": "SO"
      },
      {
      "name": "South Africa",
      "dial_code": "+27",
      "code": "ZA"
      },
      {
      "name": "South Sudan",
      "dial_code": "+211",
      "code": "SS"
      },
      {
      "name": "South Georgia and the South Sandwich Islands",
      "dial_code": "+500",
      "code": "GS"
      },
      {
      "name": "Spain",
      "dial_code": "+34",
      "code": "ES"
      },
      {
      "name": "Sri Lanka",
      "dial_code": "+94",
      "code": "LK"
      },
      {
      "name": "Sudan",
      "dial_code": "+249",
      "code": "SD"
      },
      {
      "name": "Suriname",
      "dial_code": "+597",
      "code": "SR"
      },
      {
      "name": "Svalbard and Jan Mayen",
      "dial_code": "+47",
      "code": "SJ"
      },
      {
      "name": "Swaziland",
      "dial_code": "+268",
      "code": "SZ"
      },
      {
      "name": "Sweden",
      "dial_code": "+46",
      "code": "SE"
      },
      {
      "name": "Switzerland",
      "dial_code": "+41",
      "code": "CH"
      },
      {
      "name": "Syrian Arab Republic",
      "dial_code": "+963",
      "code": "SY"
      },
      {
      "name": "Taiwan",
      "dial_code": "+886",
      "code": "TW"
      },
      {
      "name": "Tajikistan",
      "dial_code": "+992",
      "code": "TJ"
      },
      {
      "name": "Tanzania, United Republic of Tanzania",
      "dial_code": "+255",
      "code": "TZ"
      },
      {
      "name": "Thailand",
      "dial_code": "+66",
      "code": "TH"
      },
      {
      "name": "Timor-Leste",
      "dial_code": "+670",
      "code": "TL"
      },
      {
      "name": "Togo",
      "dial_code": "+228",
      "code": "TG"
      },
      {
      "name": "Tokelau",
      "dial_code": "+690",
      "code": "TK"
      },
      {
      "name": "Tonga",
      "dial_code": "+676",
      "code": "TO"
      },
      {
      "name": "Trinidad and Tobago",
      "dial_code": "+1868",
      "code": "TT"
      },
      {
      "name": "Tunisia",
      "dial_code": "+216",
      "code": "TN"
      },
      {
      "name": "Turkey",
      "dial_code": "+90",
      "code": "TR"
      },
      {
      "name": "Turkmenistan",
      "dial_code": "+993",
      "code": "TM"
      },
      {
      "name": "Turks and Caicos Islands",
      "dial_code": "+1649",
      "code": "TC"
      },
      {
      "name": "Tuvalu",
      "dial_code": "+688",
      "code": "TV"
      },
      {
      "name": "Uganda",
      "dial_code": "+256",
      "code": "UG"
      },
      {
      "name": "Ukraine",
      "dial_code": "+380",
      "code": "UA"
      },
      {
      "name": "United Arab Emirates",
      "dial_code": "+971",
      "code": "AE"
      },
      {
      "name": "United Kingdom",
      "dial_code": "+44",
      "code": "GB"
      },
      {
      "name": "United States",
      "dial_code": "+1",
      "code": "US"
      },
      {
      "name": "Uruguay",
      "dial_code": "+598",
      "code": "UY"
      },
      {
      "name": "Uzbekistan",
      "dial_code": "+998",
      "code": "UZ"
      },
      {
      "name": "Vanuatu",
      "dial_code": "+678",
      "code": "VU"
      },
      {
      "name": "Venezuela, Bolivarian Republic of Venezuela",
      "dial_code": "+58",
      "code": "VE"
      },
      {
      "name": "Vietnam",
      "dial_code": "+84",
      "code": "VN"
      },
      {
      "name": "Virgin Islands, British",
      "dial_code": "+1284",
      "code": "VG"
      },
      {
      "name": "Virgin Islands, U.S.",
      "dial_code": "+1340",
      "code": "VI"
      },
      {
      "name": "Wallis and Futuna",
      "dial_code": "+681",
      "code": "WF"
      },
      {
      "name": "Yemen",
      "dial_code": "+967",
      "code": "YE"
      },
      {
      "name": "Zambia",
      "dial_code": "+260",
      "code": "ZM"
      },
      {
      "name": "Zimbabwe",
      "dial_code": "+263",
      "code": "ZW"
      }
      ],
    message: '',
    type: '',
    rules: [
      v => !!v || 'This field is required',
    ],
    panel: [0, 1, 2],
    pieMargin: 0,
    series: [80, 5, 5, 3, 2.5, 2.5, 2],
    chartOptions: {
      labels: ['Presale / project and liquidity', 'Dev', 'Community programs / bonuses', 'Gaming bonuses', 'Marketing', 'Future CEX listings', 'Team locked for 2 years'],
      chart: {
        width: 600,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -180,
          endAngle: 180,
          donut: {
            size: '65%'
          },
          dataLabels: {
            minAngleToShowLabel: 0
          }
        },
      },
      tooltip: {
        y: {
          formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
            return value + '%'
          }
        }
      },
      dataLabels: {
        showAlways: true,
        formatter: function (val) {
          return val + "%"
        },
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex] + '%'
        },
        fontSize: '16px',
        position: 'bottom'
      },
      responsive: [{
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
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
    getUser () {
      return store.state.user
    },
  },
  watch: {
    mmConnected () {
      if (this.mmConnected) {
        setTimeout(() => {
          this.connectWalletDialog = false
          // this.drawer = false
        }, 2000)
      }
    },
    twConnected () {
      if (this.twConnected) {
        setTimeout(() => {
          this.connectWalletDialog = false
          // this.drawer = false
        }, 2000)
      }
    },
    walletConnected () {
      if (this.walletConnected) {
        setTimeout(() => {
          this.connectWalletDialog = false
          // this.drawer = false
        }, 2000)
      }
    },
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.init()
    this.getLastestPrice()
    this.priceInterval = setInterval(() => {
      this.getLastestPrice();
    }, 6000);
  },
  beforeUnmount() {
    if (this.priceInterval) {
      console.log('clear interval');
      clearInterval(this.priceInterval);
    }
  },
  methods: {
    init () {
      this.pieMargin = this.windowWidth <= 360 ? -40 : this.windowWidth <= 390 ? -30 : -20
      console.log(this.pieMargin)
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
    scrollStages () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#stages', 500, { offset: -64 });
      }, 200);
    },
    scrollToTiers () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#tiers', 500, { offset: -64 });
      }, 200);
    },
    scrollTokenomics () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#tokenomics', 500, { offset: -64 });
      }, 200);
    },
    scrollToNewToCrypto () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#newtocrypto', 500, { offset: -64 });
      }, 200);
    },
    scrollToKYCLink () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#audit', 500, { offset: -64 });
      }, 200);
    },
    gotoLink(link) {
      window.open(link, "_blank");
    },
    gotoTokenLink() {
      this.$emit("tokenLinkClicked")
    },
    gotoKYCLink() {
      this.$emit("KYCLinkClicked")
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
      this.instantiateContractAbi()
    },
    instantiateContractAbi() {
      let contractAddress = '0x932C2E35793A0470d3F8bEb45E67A0A680096eD5'
      let web3 = new Web3(window.ethereum);
      Promise.resolve(MemeMasterAPI.instantiateContractAbi(contractAddress, import.meta.env.VITE_APP_ENVIRONMENT))
        .then(result => {
        console.log(result.data.result)
        let abi = result.data.result
        let contract = new web3.eth.Contract(abi, contractAddress)
        contract.methods.greet().call()
      })
    },
    handleSuccess(e) {
        console.log(e);
        this.snackbarText = 'Address copied to clipboard'
        this.snackbar = true
      },
      handleError(e) {
        console.log(e);
      },
    convertAmount(type,value) {
      switch (type) {
        case 'ethToEmas':
          return this.amountEmasForEthDiagLog = value * ( this.ethPrice / this.stage1 )
        case 'emasToEth':
          return this.amountEth = value * ( this.stage1 / this.ethPrice )
        case 'usdtToEmas':
          return this.amountEmasForUsdtDiagLog = value * ( this.usdtPrice / this.stage1 )
        case 'emasToUsdt':
          return this.amountUsdt = value * ( this.stage1 / this.usdtPrice )
        default:
          return 0;
      }
    },
    ensureNonNegative(inputField) {
      if (this[inputField] < 0) {
        this[inputField] = Math.abs(this[inputField]);
      }
    },
    clearOnFocus(e) {
      if (this[e] == 0) this[e]= ''
    },
    async getLastestPrice() {
      var url
      if (import.meta.env.VITE_APP_ENVIRONMENT === 'production') {
        url = import.meta.env.VITE_APP_MM_API
      } else {
        url = import.meta.env.VITE_APP_MM_API_TEST
      }
      try {
        // await axios.get(import.meta.env.VITE_APP_MM_API_LOCAL+'/getlastpricecoinmarketcap')
        const response = await axios.get(url + "getlastpricecoinmarketcap", {
          params: {
            "symbols": 'ETH,USDT'
          }
        });
        const { ETH: ethData, USDT: usdtData } = response.data.data;
        this.ethPrice = ethData.quote.USD.price;
        this.usdtPrice = usdtData.quote.USD.price;
      } catch (error) {
        console.log('Get new price error', error);
      }
    },
    async sendContactForm() {
      const isValid = await this.$refs.newCryptoForm.validate()
      this.type = 'newtocrypto'
      if (isValid.valid) {
        const { firstName, lastName, phoneOrEmail, investmentBudgetSelected, bestTimeToContactSelected, countryCodeSelected, message, type } = this
        const payload = {
          firstName,
          lastName,
          phoneOrEmail,
          investmentBudget: investmentBudgetSelected?.name,
          bestTimeToContact: bestTimeToContactSelected?.name,
          countryCode: countryCodeSelected?.name,
          message,
          type
        }

        this.$store.dispatch('createMessage', payload).then(() => {
          this.snackbarText = 'Send message success'
          this.snackbar = true
          this.clearForm()
        })
          .catch((error) => {
            this.snackbarText = 'Send message error - please try again later'
            this.snackbar = true
            console.log(error)
          })
      }
    },
    clearForm() {
      this.$refs.newCryptoForm.reset()
      this.investmentBudgetSelected = { id: 0, name: '0$ - 5k$' }
      this.bestTimeToContactSelected = { id: 0, name: 'Morning' }
      this.countryCodeSelected = { id: 0, name: 'Select your country' }
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>
