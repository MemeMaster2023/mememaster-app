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
        @click="routerGo('/')"  v-scroll-to="'#home'"
      ></v-img>
    </v-layout>
    <v-layout v-if="isMobileDevice" :style="'margin-left:' + ((windowWidth / 2) - 65) + 'px;margin-top:-30px'">
      <v-img
        src="/img/logos/logo.png"
        style="max-height: 100px; max-width: 100px;cursor: pointer;"
        @click="routerGo('/')" v-scroll-to="'#home'"
      ></v-img>
    </v-layout>

    
    <v-layout class="pr-4 pl-4 pt-4 pb-2" v-if="env">

      <v-spacer></v-spacer>

      <v-btn v-if="!mmConnected && !twConnected && !emailConnected"
        variant="outlined"
        color="white"
        theme="dark"
        :style="isMobileDevice ? 'width:55%' : 'width:100%'"
        @click="connectWalletDialog = true"
      >
        Connect
      </v-btn>

      <v-btn v-if="mmConnected"
        variant="outlined"
        color="white"
        theme="dark"
        :style="isMobileDevice ? 'width:55%' : 'width:100%'"
      >
      <img src="/img/icons/metamask.png" style="max-width:32px;padding-right:10px"/>
        Connected
      </v-btn>

      <v-btn v-else-if="twConnected"
        variant="outlined"
        color="white"
        theme="dark"
        :style="isMobileDevice ? 'width:55%' : 'width:100%'"
      >
      <img src="/img/icons/trustwallet.png" style="max-width:32px;padding-right:10px"/>
        Connected
      </v-btn>

      <v-btn v-else-if="walletConnected"
        variant="outlined"
        color="white"
        theme="dark"
        :style="isMobileDevice ? 'width:55%' : 'width:100%'"
      >
      <img src="/img/icons/walletconnect.png" style="max-width:32px;padding-right:10px"/>
        Connected
      </v-btn>

      <v-btn v-else-if="emailConnected"
        variant="outlined"
        color="white"
        theme="dark"
        :style="isMobileDevice ? 'width:55%' : 'width:100%'"
      >
       <v-icon class="mr-2">mdi-email</v-icon> 
        Connected
      </v-btn>
    
      <v-spacer></v-spacer>

      <v-btn v-if="isMobileDevice"
        variant="outlined"
        style="margin-left:5px;"
        color="white"
        theme="dark"
        v-bind="props"
        prepend-icon="mdi-tag-outline"
        :style="isMobileDevice ? 'width:45%' : 'width:100%'"
        to="/presale"
      >
        Presale
      </v-btn>

      <v-spacer></v-spacer>

    </v-layout>

    <v-layout class="pr-4 pl-4 pt-4 pb-4" v-if="env">

      <v-spacer></v-spacer>

      <v-tooltip location="top" v-if="!isMobileDevice">
        <template v-slot:activator="{ props }">
          <v-btn v-if="drawer && isMobileDevice"
            style="margin-right:5px;margin-top:-5px"
            variant="outlined"
            color="white"
            theme="dark"
            @click="gotoTokenLink('')"
            v-bind="props"
            :style="isMobileDevice ? 'width:55%' : 'width:100%'"
          >
            <img src="/img/icons/token_security.png" style="max-width:30px;padding-right:5px"/> 
            Token Security
          </v-btn>
        </template>
        <span>Avoid scams - check the real Mememaster (EMAS) token contract address here,<br>
              DO NOT SEND FUNDS TO THIS CONTRACT ADDRESS SEE THE PRESALE and our SOCIAL MEDIA FOR CONTRIBUTION ADDRESS.
        </span>
      </v-tooltip>
      <v-btn v-if="drawer && isMobileDevice"
        style="margin-right:5px;margin-top:-5px"
        variant="outlined"
        color="white"
        theme="dark"
        @click="gotoTokenLink('')"
        :style="isMobileDevice ? 'width:55%' : 'width:100%'"
      >
        <img src="/img/icons/token_security.png" style="max-width:30px;padding-right:5px"/> 
        Token Security
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="drawer && isMobileDevice"
        style="margin-top:-5px"
        variant="outlined"
        color="white"
        theme="dark"
        @click="gotoKYCLink('')"
        :style="isMobileDevice ? 'width:45%' : 'width:100%'"
      >
        <img src="/img/icons/coinsult_squ.png" style="max-width:28px;padding-right:5px"/> 
        KYC - AUDIT
      </v-btn>

      <v-spacer></v-spacer>

    </v-layout>

    <!-- <v-layout class="mr-4 ml-4 mt-2 mb-4" v-if="env">
      <v-btn v-if="(mmConnected || emailConnected || walletConnected)"
             variant="outlined"
             color="white"
             @click="disconnectClicked"
             style="width:100%"
      > 
        <template v-slot:prepend>        
          <v-icon color="red-lighten-1" size="large">mdi-close-circle-outline</v-icon>  
        </template>
        Disconnect
      </v-btn>
    </v-layout> -->

    <v-list nav v-model:opened="open">
      <v-list-item prepend-icon="mdi-home-variant-outline" title="Home" value="home" @click="routerGo('/')"></v-list-item>

      <v-list-group v-if="isLoggedIn" value="account">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-box-outline"
            title="My Account"
          ></v-list-item>
        </template>

        <v-list-item
          v-bind="props"
          prepend-icon="mdi-card-account-details-outline"
          title="My Profile"
          @click="routerGo('/account')"
        ></v-list-item>

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

        <v-list-group v-if="isLoggedIn && getUser.accLevel === 10" value="admin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-key-outline"
              title="Admin Menu"
            ></v-list-item>
          </template>

          <v-list-item
            v-bind="props"
            prepend-icon="mdi-cube-unfolded"
            title="NFT Management"
            @click="routerGo('/admin/nfts')"
          ></v-list-item>
        </v-list-group>


      </v-list-group>
        
      <v-list-item prepend-icon="mdi-image-multiple-outline" title="Meme Marketplace" value="mememarket" @click="routerGo('/memes')"></v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" title="NFT Marketplace" value="nftmarket" @click="routerGo('/nfts')"></v-list-item>
      <v-list-item prepend-icon="mdi-circle-multiple-outline" title="New Token Listings" value="tokens" @click="routerGo('/tokens')"></v-list-item>
      <v-list-item prepend-icon="mdi-shape-plus" title="Games" value="games" @click="routerGo('/games')"></v-list-item>
      <v-list-item prepend-icon="mdi-music" title="Music" value="music" @click="routerGo('/music')"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group" title="Team" value="Team" @click="routerGo('/team')"></v-list-item>
      <v-list-item prepend-icon="mdi-handshake-outline" title="Partners" value="Partners" @click="gotoTeamLink()"></v-list-item>
      <v-list-item prepend-icon="mdi-at" title="Contact Us" value="contact" @click="gotoContact()" v-scroll-to="'#footer'"></v-list-item>
      <v-list-item prepend-icon="mdi-transit-connection-variant" title="Roadmap" value="Roadmap" @click="routerGo('/roadmap')"></v-list-item>
      <v-list-item prepend-icon="mdi-file-outline" title="Whitepaper" value="whitepaper" @click="openWhitePaper()"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar 
      flat 
      app 
      style="opacity:0.9"
      :color="!scrolled && ($route.name === 'Home' || $route.name === 'Collections') ? 'transparent' : '#000'" 
      class="pa-2"
  >

      <v-img v-if="!isMobileDevice"
        src="/img/logos/mememaster_logo.png"
        style="max-height: 62px; max-width: 300px;min-height: 62px; min-width: 300px;cursor: pointer;"
        @click="routerGo('/')"
      ></v-img>
      <v-img v-if="isMobileDevice"
        src="/img/logos/logo.png"
        :style="!drawer ? 'min-height: 50px; min-width: 50px;cursor: pointer;margin-left: -20px;' : 'min-height: 50px; min-width: 50px;cursor: pointer;'"
        @click="routerGo('/')"
      ></v-img>

      <v-spacer></v-spacer>

      <v-btn v-if="!drawer && env && (!mmConnected && !twConnected && !emailConnected && !walletConnected) && $router.currentRoute.value.path !== '/presale'"
        style="margin-right:10px;margin-top:-5px"
        variant="outlined"
        color="white"
        theme="dark"
        @click="connectWalletDialog = true"
        size="small"
      >
        Connect 
      </v-btn>

      <v-menu v-if="!drawer && env && (mmConnected || twConnected || emailConnected || walletConnected)" >
        <template v-slot:activator="{ props }">
          <v-btn v-if="!drawer && env && (mmConnected || twConnected || emailConnected || walletConnected)"
            style="margin-right:10px;margin-top:-5px"
            variant="outlined"
            color="white"
            theme="dark"
            v-bind="props"
            offset="-20"
            size="small"
          >
            <img src="/img/icons/metamask.png" style="max-width:32px;padding-right:10px" v-if="mmConnected"/> 
            <img src="/img/icons/trustwallet.png" style="max-width:32px;padding-right:10px" v-else-if="twConnected"/> 
            <img src="/img/icons/walletconnect.png" style="max-width:32px;padding-right:10px" v-else-if="walletConnected && !mmConnected && !twConnected"/> 
            <v-icon v-else-if="emailConnected && !mmConnected && !walletConnected" class="mr-2">mdi-email</v-icon>
              Connected
          </v-btn>
        </template>
        <v-card 
            min-width="300" 
            max-width="300" 
            max-height="500"
            class="mt-2 mb-2"
         >
          <v-list>
            <v-list-item
              :title="getUser.displayName"
              :subtitle="'Joined: ' + makeDate(getUser.memberSince)"
            >
            <template v-slot:prepend>
              <v-avatar color="deep-purple-lighten-4" style="border-radius: 10px;" size="65">
                <v-img v-if="getUser.avatar === ''" :src="'https://robohash.org/' + getUser.displayName" style="width: 65px;height:65px;">
                </v-img>
                <v-img v-else :src="getUser.avatar" style="width: 65px;height:65px;">
                </v-img>
              </v-avatar>
            </template>

              <!-- <template v-slot:append>
                <v-btn
                  variant="text"
                  :class="fav ? 'text-red' : ''"
                  icon="mdi-heart"
                  @click="fav = !fav"
                ></v-btn>
              </template> -->
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-row class="pt-2" style="width:280px">
            <v-col :align="'center'" class="mt-2" style="width:280px">
              <div class="row" style="width:280px" v-if="mmConnected || twConnected || walletConnected">
                <span class="font-weight-bold">{{ mmConnected || twConnected || walletConnected ? (this.getUser.accounts[0]).substring(0, 8) + '...' + (this.getUser.accounts[0]).substring(34, 42) : '' }}</span>
                <v-icon 
                  size="x-small" 
                  class="ml-2"
                  v-clipboard:copy.stop="getUser.accounts[0]"
                  v-clipboard:success="handleSuccess"
                  v-clipboard:error="handleError"
                  style="cursor: pointer;margin-top: -2px"
                >
                 mdi-content-copy
                </v-icon>
              </div>
              <div class="row mt-2" style="width:280px" v-if="mmConnected || twConnected || walletConnected">
                <span>{{ balance }} ETH</span><span class="ml-4">{{ tokenBalance }} EMAS</span>
              </div>
              <div class="row mt-2" style="width:280px">
                <span>{{ getUser.credits ?? 0 }} Credits</span>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon class="ml-2" size="small" v-bind="props" style="margin-top: -2px">mdi-information-outline</v-icon>
                  </template>
                  <span>These are your free credits you received upon Sign Up.<br>You can use them to use and try out the image and meme generation.</span>
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
          <div class="text-center  mb-4">
            <v-btn style="width:280px;text-transform: none !important;" 
                  class="ma-2"
                  variant="outlined"
                  color="deep-purple-darken-4"
                  prepend-icon="mdi-account-box-outline"
                  to="/account"
            >
              GoTo My Account
            </v-btn>

            <v-btn v-if="!drawer && env && (mmConnected || twConnected || emailConnected || walletConnected)"
                  style="width:280px;" 
                  variant="outlined"
                  @click="disconnectClicked"
            > 
              <template v-slot:prepend>        
                <v-icon color="red-lighten-1" size="large">mdi-close-circle-outline</v-icon>  
              </template>
              Disconnect
            </v-btn>
          </div>
        </v-card>
      </v-menu>

      <v-btn v-if="!isMobileDevice && !drawer && env && (mmConnected || twConnected || emailConnected || walletConnected)"
             style="margin-right:10px;margin-top:-5px"
             variant="outlined"
             color="white"
             to="/account"
             size="small"
      > 
        <template v-slot:prepend>        
          <v-icon size="large">mdi-account-box-outline</v-icon>  
        </template>
        My Account
      </v-btn>

      <v-btn v-if="!isMobileDevice && !drawer && env && (mmConnected || twConnected || emailConnected || walletConnected)"
             style="margin-right:10px;margin-top:-5px"
             variant="outlined"
             color="white"
             @click="disconnectClicked"
             size="small"
      > 
        <template v-slot:prepend>        
          <v-icon color="red-lighten-1" size="large">mdi-close-circle-outline</v-icon>  
        </template>
        Disconnect
      </v-btn>

      <v-btn v-if="!drawer && !isMobileDevice && env && (emailConnected || mmConnected || twConnected || walletConnected) && $router.currentRoute.value.path !== '/generate/default' && $router.currentRoute.value.path !== '/generate/drafts' && $router.currentRoute.value.path !== '/generate/upload'"
        style="margin-right:10px;margin-top:-5px"
        variant="outlined"
        color="white"
        theme="dark"
        @click="routerGo('/generate/default')"
        prepend-icon="mdi-view-grid-plus" 
        size="small"
      >
        Generate
      </v-btn>

      <v-tooltip location="top" v-if="$router.currentRoute.value.path !== '/presale'">
        <template v-slot:activator="{ props }">
          <v-btn v-if="!drawer && !isMobileDevice"
            style="margin-right:10px;margin-top:-5px"
            variant="outlined"
            color="white"
            theme="dark"
            v-bind="props"
            size="small"
            prepend-icon="mdi-tag-outline"
            to="/presale"
          >
            Presale
          </v-btn>
        </template>
        <span>Presale coming soon, follow our social media channels below for details...
        </span>
      </v-tooltip>

      <v-btn v-if="!drawer && !isMobileDevice"
        style="margin-right:10px;margin-top:-5px"
        variant="outlined"
        color="white"
        theme="dark"
        size="small"
        @click="gotoKYCLink()"
      >
        <img src="/img/icons/coinsult_squ.png" style="max-width:28px;padding-right:10px"/> 
        KYC - AUDIT
      </v-btn>

      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-if="!drawer && !isMobileDevice"
            style="margin-right:20px;margin-top:-5px"
            variant="outlined"
            color="white"
            theme="dark"
            @click="gotoTokenLink()"
            v-bind="props"
            size="small"
          >
            <img src="/img/icons/token_security.png" style="max-width:30px;padding-right:10px"/> 
            Token Security
          </v-btn>
        </template>
        <span>Avoid scams - check the real Mememaster (EMAS) token contract address here,<br>
              DO NOT SEND FUNDS TO THIS CONTRACT ADDRESS SEE THE PRESALE and our SOCIAL MEDIA FOR CONTRIBUTION ADDRESS.
        </span>
      </v-tooltip>

      <!-- <v-btn v-if="!drawer && !isMobileDevice"
        style="margin-right:10px;margin-top:-5px"
        variant="outlined"
        color="white"
        theme="dark"
        @click="routerGo('/tokens')"
        prepend-icon="mdi-circle-multiple-outline" 
        size="small"
      >
        New Token Listings
      </v-btn>

      <v-btn v-if="!drawer && !isMobileDevice"
        style="margin-right:20px;margin-top:-5px"
        variant="outlined"
        color="white"
        theme="dark"
        @click="routerGo('/nfts')"
        size="small"
      >
      <img src="/img/icons/nfts.png" style="max-width:20px;max-height:20px;margin-right:5px;"/>NFT Minting
      </v-btn> -->

      <MetaMaskConnect v-show="false" ref="mmConnect" >
      </MetaMaskConnect>

      <WalletConnect v-show="false" ref="walletConnectref" >
      </WalletConnect>

      <v-img v-if="!drawer"
        @click.stop="drawer = !drawer"
        src="/img/icons/menu.png"
        :style="isMobileDevice ? 'max-height: 35px; max-width: 35px;margin-right:10px;cursor: pointer;' :  'margin-top: -5px;max-height: 35px; max-width: 35px;margin-right:20px;cursor: pointer;'"
      ></v-img>

      <div v-if="!drawer && !isMobileDevice && $router.currentRoute.value.path !== '/presale'"
           style="color:#FFF;position: fixed;right:85px;top:55px"
      >
       Please use the menu on the top right to access the main features of the platform
      </div>
      
  </v-app-bar>


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

          <div class="text-center ma-6" v-if="showConfirmation === false">
            If you don't have a wallet, you can select a provider and create one now.<br>
            <v-btn variant="text" color="grey" @click="learnMoreDialog = true">Learn more</v-btn>
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
              <v-divider></v-divider>
              <p style="font-size:18px" class="font-weight-medium text-center mt-2">OR</p>
              <p style="font-size:18px" class="font-weight-medium text-center mt-2 mb-2">Connect without a wallet</p>
              <v-text-field
                label="Email Address"
                placeholder="Enter your email address..."
                type="email"
                density="comfortable"
                v-model="email"
                :rules="emailRules"
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
                  :rules="emailRules"
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

    <v-dialog
          v-model="learnMoreDialog"
          fullscreen
        >
          <v-card theme="dark" color="#2b2b2b">
            <v-toolbar
              color="deep-purple-darken-4"
            >
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
                class="d-flex flex-wrap mx-auto px-8 py-8 mt-4"
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

    <!-- ############### ChatBot ################### -->
    <ChatGPT
    v-if="(mmConnected || walletConnected || twConnected || emailConnected)"
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

     <!-- ############################## SNACKBARS ####################################### -->
     <v-snackbar
        v-model="snackbar2"
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

</template>

<script>
import store from '@/store/index'
import MetaMaskConnect from '@/components/wallets/MetaMaskConnect'
import WalletConnect from '@/components/wallets/WalletConnect'
import MemeMasterAPI from '../../clients/MemeMasterAPI';
// import { scroller } from 'vue-scrollto/src/scrollTo'
import ChatGPT from '@/components/chat/ChatGPT.vue'
import md5 from 'md5'
import dateformat from "dateformat"
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
      chatActive: true,
      connectWalletDialog: false,
      learnMoreDialog: false,
      loadingEmailAuth: false,
      emailDialog: false,
      isExistingUser: false,
      email: '',
      username: '',
      password:'',
      snackbar: false,
      snackbar2: false,
      isButtonDisabled: false,
      showConfirmation: false,
      // snackbarTitle: '',
      snackbarText: '',
      tempUserData: null,
      open: ['account'],
      balance: 0,
      tokenBalance: 0,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Email address must be valid",
      ],
    }),
    components: {
      MetaMaskConnect,
      WalletConnect,
      ChatGPT
    },
    computed: {
      getUser () {
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
      twConnected () {
        return this.$store.state.user.twConnected
      },
      emailConnected () {
        // if(this.persistentUser !== null){
        //   return store.state.auth.persistentUser.isEmailConnected;
        // }
        return this.$store.state.user.isEmailConnected
      },
      isLoggedIn () {
        return this.$store.state.user.isLoggedIn || this.getUser.uid !== '';
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
      // isPersistentLogin(){
      //   if(this.isLoggedIn) return this.isLoggedIn;
      //   return this.persistentUser !== null;
      // },
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
      getChain () {
          console.log('watcher this.waitGetUserBalance()')
          this.waitGetUserBalance()
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
      console.log(import.meta.env.VITE_APP_ENVIRONMENT)
      console.log(this.getUser)
      this.env = true
      // this.env = process.env.VUE_APP_ENVIRONMENT === 'testnet'
      console.log(import.meta.env.VITE_APP_ENVIRONMENT)
      // this.env = true
      this.env = import.meta.env.VITE_APP_ENVIRONMENT === 'local' || import.meta.env.VITE_APP_ENVIRONMENT === 'testnet' || import.meta.env.VITE_APP_ENVIRONMENT === 'production'
      console.log('this.getUser.mmConnected')
      console.log(this.getUser.mmConnected)
      this.waitGetUserBalance()
    },
    methods: {
      routerGo (route) {
        this.$router.push(route);
        this.drawer = false
      },
      connectWalletDialogClicked () {
        this.connectWalletDialog = true
      },
      openWhitePaper() {
        // console.log('wpClicked')
        this.$emit("wpClicked")
        this.drawer = false
      },
      gotoMMLink() {
        // console.log('wpClicked')
        this.drawer = false
        this.$emit("mmMobileClicked")
      },
      gotoTeamLink() {
        // console.log('wpClicked')
        // window.open(link, "_blank")
        this.drawer = false
        this.$emit("teamLinkClicked")
      },
      gotoKYCLink() {
        // console.log('wpClicked')
        // window.open(link, "_blank")
        this.drawer = false
        this.$emit("KYCLinkClicked")
      },
      gotoTokenLink() {
        // console.log('wpClicked')
        // window.open(link, "_blank")
        this.drawer = false
        this.$emit("tokenLinkClicked")
      },
      gotoLink(link) {
        // console.log('button clicked')
        window.open(link, "_blank");
      },
      gotoContact () {
        this.drawer = false
      },
      getHash (name) {
        return md5(name)
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
      },
      makeDate (date) {
        return dateformat(new Date(date), 'dd mmm, yyyy')
      },
      handleSuccess(e) {
        console.log(e);
        this.snackbarText = 'Address copied to clipboard'
        this.snackbar2 = true
      },
      handleError(e) {
        console.log(e);
      },
      disconnectClicked () {
        if (this.mmConnected || this.twConnected) {
          this.$refs.mmConnect.disconnectMetamask()
        } else if (this.walletConnected) {
          this.$refs.walletConnectref.disconnectWallet()
        }
        /* else if (this.binanceConnected) {
          this.$refs.mmConnect.disconnectBinance()
        } */ 
        if (this.emailConnected) {
          this.$store.dispatch('logout').then(() => {
            // const firstScrollTo = scroller();
            // console.log('Clear userPredictionsArr Array')
            // this.$store.dispatch('clearUserPredictions')
            setTimeout(() => {
              this.$router.push('/');
              window.location.reload();
              // firstScrollTo('#hometoolbar');
            }, 1000);
          });
        }
        localStorage.removeItem('mm-displayName');
        localStorage.removeItem('mm-email');
        localStorage.removeItem('mm-uid');
        localStorage.removeItem('mm-isEmailConnected');
        localStorage.removeItem('mm-mmConnected');
      },
      // ############################## Web 3 ##################################
      waitGetUserBalance () {
        setTimeout(() => {
          if (this.getUser.uid === '' || typeof this.getUser.accounts[0] === 'undefined' || this.getUser.accounts[0] === '0') {
            this.waitGetUserBalance()
          } else {
            console.log('this.getWalletBalance()')
            this.getWalletBalance()
            this.getTokenBalance()
            return
          }
        }, 1000);
      },
      getWalletBalance () {

        console.log('############## this.getUser.accounts[0] #################')
        console.log(this.getUser.accounts[0])

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
               this.getUser.accounts[0],
              'latest'
            ],
              id: 1
            })
          .then((balance) => {
            console.log(balance)
            this.balance =  Math.round(parseInt(balance, 16) / 100000000000000000 * 10000) / 100000
            this.$store.commit('setBalance', {
              balance: this.balance
            })
          })
          .catch((error) => console.log(error))
        } else if (this.getUser.walletProvider === 'BinanceChainWallet') {
          window.BinanceChain.request({
            method: 'eth_getBalance',
            params:[
              this.getUser.accounts[0],
              'latest'
            ],
              id: 1
            })
          .then((balance) => {
            // console.log(balance)
            this.balance =  Math.round(parseInt(balance, 16) / 100000000000000000 * 10000) / 100000
            this.$store.commit('setBalance', {
              balance: this.balance
            })
          })
          .catch((error) => console.log(error))
        }
      },
      getTokenBalance () {
        // https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&address=0x89e73303049ee32919903c09e8de5629b84f59eb&tag=latest&apikey=YourApiKeyToken
        
        let tokenAddress = ''
        let network = 'ETH'
        if (this.getUser.networkChainID === '0x1') {
          tokenAddress = '0xfe82c0Ff9967c1D2BD18865F817103F00e4F1e72'
          network = 'ETH'
        } else if  (this.getUser.networkChainID === '0x5') {
          tokenAddress = '0xfe82c0Ff9967c1D2BD18865F817103F00e4F1e72'
          network = 'GOERLI'
        }
        let walletAddress = this.getUser.accounts[0]

        Promise.resolve(MemeMasterAPI.getTokenBalance(tokenAddress, walletAddress, network))
        .then(result => {
          console.log(result)
          var tmpBalance  = result.data.message.result
          if (tmpBalance === "Invalid contractAddress format") {
            this.tokenBalance = 0
            return
          }
          this.tokenBalance = tmpBalance / (10**18)
          this.tokenBalance = this.tokenBalance.toLocaleString('en-US');
          this.$store.commit('setTokenBalance', {
            tokenBalance: this.tokenBalance
          })
        })
        .catch(err => {
          // this.loading = false
          console.log('Error getting Token Balance.', err)
          // show friendly error in user screen
        })
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
  .v-tooltip .v-overlay__content {
    background: rgba(var(--v-theme-surface-variant), 1) !important;
  } 

</style>
