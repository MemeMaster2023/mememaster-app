<template>
  <div id="presale">
    <v-responsive style="background-color: #000;" class="pt-16">

      <v-img src="/img/presale/presale_home.png"
           cover
           gradient="to bottom, rgba(0,0,0,.8), rgba(0,0,0,.6)"
      >

        <v-row :class="isMobileDevice ? 'mt-2 ml-2 mr-2 mb-8' : 'mt-12 ml-16 mr-16'" >
          <v-col cols="12" md="6" >
            <div class="text-h3 ma-2 text-white">Meme Master Presale is starting soon!</div>
            <div style="text-align: justify;" class="text-h5 ma-2 text-white">The Meme Master 2023 Presale is just around the corner, and we can't wait to share this epic journey with you! Get ready to join the revolution of creativity as we launch our exclusive Presale event in August 2023. <br><br>We're bringing you a one-of-a-kind AI powered platform where you can mint, trade, and collect Memes music and NFTs, interact with our games, find new projects on our new token listing platform and a host of the features that are in development, please check out the information below including our roadmap, video and tier offers for more information.</div>

            <v-row  class="mt-4">
              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-view-dashboard"
                       style="font-size: 0.7rem;width: 100%"
                       color="purple-lighten-4"
                >
                  NFT Marketplace
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-circle-multiple-outline"
                       style="font-size: 0.7rem;width: 100%"
                       color="purple-lighten-4"
                >
                  {{ drawer ? 'Token Listings' : 'New Token Listings' }}
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-shape-plus"
                       style="font-size: 0.7rem;width: 100%"
                       color="purple-lighten-4"
                >
                  Games
                </v-btn>
              </v-col>
            </v-row>

            <v-row >
              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-music"
                       style="font-size: 0.7rem;width: 100%"
                       color="purple-lighten-4"
                >
                  Music
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-transit-connection-variant"
                       style="font-size: 0.7rem;width: 100%"
                       color="purple-lighten-4"
                >
                  Roadmap
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" :align="'center'">
                <v-btn prepend-icon="mdi-layers-triple-outline"
                       style="font-size: 0.7rem;width: 100%"
                       color="purple-lighten-4"
                       @click="scrollToTiers()"
                >
                  Tiers
                </v-btn>
              </v-col>
            </v-row>

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


                <div class="pt-4 text-h5 ma-2 text-black">Aug 2023 - Sept 2023</div>
                <div class="text-h6 ma-2 text-black">1 EMAS = $0.005</div>
                <div style="font-size: 1rem;" class="ml-8 mr-8 text-black">Hurry and buy before Stage 2 Price Increases To $0.0061</div>

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

                <v-row v-else>
                  <v-col cols="12" md="6" :class="isMobileDevice ? 'pl-8 pr-8' : 'pl-8'">
                    <v-btn @click="handleShowDialog(true, 'buyWithEthDialog')" size="large" style="width:100%" color="#360a3f">Buy EMAS with ETH</v-btn>
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
                    <v-btn size="large" style="width:100%">New to Crypto</v-btn>
                  </v-col>
                </v-row>

            </v-card>
          </v-col>
        </v-row>
      </v-img>

      <!-- ######################################################################################## -->
      <!-- ###############################       WELCOME          ################################# -->
      <!-- ######################################################################################## -->

      <div id="welcome">

        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" >
          <v-col cols="12" md="12" :align="'center'">
              <div class="text-h3 ma-2 text-purple-lighten-3">WELCOME TO MEME MASTER 2023</div>
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
              <div class="text-h3 ma-2 text-purple-lighten-3">HOW TO BUY</div>
              <div class="text-h4 ma-2 text-white">How to buy Meme Master 2023 (EMAS) in the Presale?</div>
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
              <div class="text-h3 ma-2 text-purple-darken-3">OPTIONS ON HOW TO BUY</div>
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
              <div class="text-h3 ma-2 text-purple-lighten-3">PRESALE STAGES</div>
              <div class="text-h4 ma-2 text-white">Meme Master 2023 will have 3 Presale stages</div>
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

        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-16 mr-16 mb-16'" >
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
      </div>

      <!-- ######################################################################################## -->
      <!-- #######################################     TIERS      ################################# -->
      <!-- ######################################################################################## -->

      <div id="tiers" style="background-color: #F3E5F5;padding-bottom: 16px;">
        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-16'" >
          <v-col cols="12" md="12" :align="'center'" class="mt-8">
              <div class="text-h3 ma-2 text-purple-darken-3">MEME MASTER TIERS INFORMATION</div>
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
      <!-- ###############################     PRESALE  DONATIONS     ############################# -->
      <!-- ######################################################################################## -->

      <div id="donate" style="color: #FFF;">

        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" >
          <v-col cols="12" md="12" :align="'center'">
              <div class="text-h3 ma-2 text-purple-lighten-3">CONTRIBUTE</div>
              <div class="text-h4 ma-2 text-white">Contribute to the Meme Master Project</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2' : 'ml-16 mr-16'" >

          <v-col cols="12" md="2" :align="'center'">
          </v-col>

          <v-col cols="12" md="8" :align="'center'">
            Donations text donations text text donations text text donations text text donations text text donations text text donations text<br><br>
            Donations text donations text text donations text text donations text text donations text text donations text text donations text<br><br>
            Donations text donations text text donations text text donations text text donations text text donations text text donations text<br><br>
          </v-col>

          <v-col cols="12" md="2" :align="'center'">
          </v-col>

        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2' : 'ml-16 mr-16  mb-16'" >

          <v-col cols="12" md="2" :align="'center'">
          </v-col>

          <v-col cols="12" md="4" :align="'center'">
            <v-btn size="large" color="#360a3f" @click="handleShowDialog(true, 'donateEthDialog')">
              DONATE ETH
            </v-btn>
          </v-col>

          <v-col cols="12" md="4" :align="'center'">
            <v-btn size="large" color="#360a3f" @click="handleShowDialog(true, 'donateUsdtDialog')">
              DONATE USDT
            </v-btn>
          </v-col>

          <v-col cols="12" md="2" :align="'center'">
          </v-col>

          </v-row>
      </div>


      <!-- ######################################################################################## -->
      <!-- #####################################     TOKENOMICS      ############################## -->
      <!-- ######################################################################################## -->

      <div id="tiers" style="background-color: #F3E5F5;padding-bottom: 16px;">
        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-16'" >
          <v-col cols="12" md="12" :align="'center'" class="mt-8">
              <div class="text-h3 ma-2 text-purple-darken-3">MEME MASTER TOKENOMICS</div>
              <div class="text-h4 ma-2 text-purple-darken-3">Token distibution and information</div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'mb-4' : 'ml-16 mr-16 mb-8'" >
          <v-col cols="12" md="12" :align="'center'">
            <div id="chart" :style="isMobileDevice ? 'margin-left:-40px' : ''">
              <apexchart type="donut" :width="isMobileDevice ? '450' : '600'" :options="chartOptions" :series="series"></apexchart>
            </div>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-2 mr-2' : 'ml-12 mr-12'" >

          <v-col cols="12" md="4" :align="'center'">
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

          <v-col cols="12" md="4" :align="'center'">
            <v-chip
              class="pa-6"
              label
              style="background-color: #dcb9ec;width:100%"
              color="#4A148C"
              size="x-large"
              variant="outlined"
            >
             <v-icon size="28px" color="purple-darken-4" class="mr-4">mdi-circle-multiple-outline</v-icon>
             <div v-if="!isMobileDevice" :style="isMobileDevice ? 'font-weight:bold' : 'font-size: 1.3rem;font-weight:bold'">Supply: 1,000,000,000 EMAS Tokens</div>
             <div v-else :style="isMobileDevice ? 'font-weight:bold' : 'font-size: 1.3rem;font-weight:bold'">Supply: 1,000,000,000 EMAS</div>
            </v-chip>
          </v-col>

          <v-col cols="12" md="4" :align="'center'">
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
              <div :style="isMobileDevice ? 'font-weight:bold;margin-left:10px' : 'font-size: 1.3rem;font-weight:bold;margin-left:10px'">Symbol: EMAS</div>
            </v-chip>
          </v-col>

        </v-row>


        <v-row :class="isMobileDevice ? 'ml-2 mr-2 mb-4' : 'ml-12 mr-12 mb-16'" >

          <v-col cols="12" md="12" :align="'center'">

              <v-sheet
                :class="isMobileDevice ? 'pa-2' : 'pa-8'"
                label
                style="background-color: #dcb9ec;width:100%;border: #4A148C 1px solid;border-radius: 5px;"
                color="#4A148C"
                variant="outlined"
              >
               <div :style="isMobileDevice ? 'font-weight:bold;color:#4A148C' : 'font-size: 1.3rem;font-weight:bold;color:#4A148C'">Contract Address: 0xfe82c0Ff9967c1D2BD18865F817103F00e4F1e72</div><br>
               <div :style="isMobileDevice ? 'font-weight:bold;color:#F44336' : 'font-size: 1.3rem;font-weight:bold;color:#F44336'">!! Do not send funds to this Contract !!</div>
               <div :style="isMobileDevice ? 'font-weight:bold;color:#F44336' : 'font-size: 1.3rem;font-weight:bold;color:#F44336'">We cannot return funds sent to this contract address.</div>
              </v-sheet>

          </v-col>

        </v-row>

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
            <span class="text-white ml-4" style="font-size: 1.2rem">Buy EMAS with USDT</span>
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

    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store/index'
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
    stage1: 0.005,
    stage2: 0.0055,
    stage3: 0.0061,
    amountEth: 0,
    amountUsdt: 0,
    amountEmasForUsdtDiagLog: 0,
    amountEmasForEthDiagLog: 0,
    connectWalletDialog: false,
    buyWithEthDialog: false,
    buyWithUsdtDialog: false,
    donateEthDialog: false,
    donateUsdtDialog: false,
    showConfirmation: false,
    panel: [0, 1, 2],
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
    scrollToTiers () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#tiers', 500, { offset: -64 });
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
    convertAmount(type,value) {
      switch (type) {
        case 'ethToEmas':
          return this.amountEmasForEthDiagLog = value // Change this to the correct formula
        case 'emasToEth':
          return this.amountEth = value // Change this to the correct formula
        case 'usdtToEmas':
          return this.amountEmasForUsdtDiagLog = value / this.stage1
        case 'emasToUsdt':
          return this.amountUsdt = value * this.stage1
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
