<template>
   <div id="home">
    <v-responsive style="background-color: #000;">

    <v-carousel 
        v-model="carousel" 
        v-if="!isMobileDevice" 
        :height="windowHeight"
        hide-delimiters
        :show-arrows="false"
        cycle
        :interval="6000"
      >
      <v-carousel-item
        v-for="(item, i) in carouselItems"
        :key="i"
        :src="item.src" 
        cover
        :style="isMobileDevice ? 'height:' + windowHeight + 'px' : ''"
        gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.4)"
      >
        <div :class="isMobileDevice ? 'ma-2' : ''">
          
          <v-row style="margin-top:250px;" :align="'center'">
            <v-col cols="12" md="3" class="pa-4">
            </v-col>
            <v-col cols="12" md="6">
              
              <template v-if="i === 0">
                <p :class="isMobileDevice ? 'font-weight-bold homeText' : 'font-weight-bold homeText'">Welcome to Meme Master's AI, NFT, Memes, Music and Gaming platform.</p>
              </template>

              <template v-if="i === 1">
                <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">We're creating a hub where memes, NFTs, and social media intersect.</p>
              </template>
              
              <template v-if="i === 2">
                <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">Hold our EMAS tokens in your wallet to be eligible for airdrops and more.</p>
              </template>

              <template v-if="i === 3">
                <p v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">Follow us on our social media platforms  to stay updated and join our promo's.</p>
              </template>

              <template v-if="i === 4">
                <p style="margin-right: -20px;margin-right: -20px;" v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">We are an evolving project: Try our current features then follow our roadmap.</p>
              </template>

              <template v-if="i === 5">
                 <p v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">We're excited to announce our token offer, targeted for July 2023, get in early.</p>
              </template>
              <!--<v-layout class="mt-8" >
                <v-btn size="x-large"
                      variant="outlined"
                      color="white"
                      theme="dark"
                      style="width:100%"
                >Coming Soon!
                </v-btn>
              </v-layout> -->
            </v-col>

            <v-col cols="12" md="3" class="pa-4">
            </v-col>
          </v-row>

          <v-row :align="'center'" v-if="!isMobileDevice" style="height:100%" class="pt-8">
            <v-col cols="12" md="1" class="pa-4">
            </v-col>

            <v-col cols="12" md="3" class="pa-4" align-self="end" style="height:100%">
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                :height="drawer ? 280 : 250"
                max-height="300"
                style="opacity:0.8"
                color="grey-lighten-4"
              >
              <v-card-title >
                <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                  Meme Collections & Token Listings
                </div>
              </v-card-title>
                <v-card-text>
                  <div class="text-body-1">
                    With Meme Master, you'll be able to: <br>
                    Mint your own memes and turn them into NFTs.<br>
                    Import, trade, and store your memes and NFTs in our marketplace.
                  </div>
                </v-card-text>
                <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                    @click="learnMoreDialog = true"
                  >
                    Learn More
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="4" class="pa-4">
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                :height="drawer ? 280 : 250"
                max-height="300"
                style="opacity:0.8"
                color="grey-lighten-4"
              >
              <v-card-title>
                <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                  Airdrops, Gaming and much more
                </div>
              </v-card-title>
                <v-card-text>
                  <div class="text-body-1 pb-16">
                    Get access to join our limited-edition airdrops.<br><br>
                    These NFTs, when held in your wallet (with a min quantity of EMAS tokens) will give many benefits including early access to our new features that are listed our roadmap.
                  </div>
                </v-card-text>
                <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                    @click="learnMoreDialog = true"
                  >
                    Learn More
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="3" class="pa-4">
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                :height="drawer ? 280 : 250"
                max-height="300"
                style="opacity:0.8"
                color="grey-lighten-4"
              >
              <v-card-title>
                <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                  Connect Wallet or Walletless
                </div>
              </v-card-title>
              
                <v-card-text>
                  <div class="text-body-1">
                    Signing up is a breeze! You can use your Web 3 wallets (like MetaMask or Trust Wallet) or simply use your email address for FIAT via standard OTPs, with no blockchain knowledge required.
                  </div>
                </v-card-text>
                <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                    @click="learnMoreDialog = true"
                  >
                    Learn More
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="1" class="pa-4">
            </v-col>
          </v-row>
        </div>
 
      </v-carousel-item>
    </v-carousel>
      
    <!-- <v-img src="/img/home/mememaster_home02.webp" v-if="!isMobileDevice"
           cover
           :style="isMobileDevice ? 'height:' + windowHeight + 'px' : ''"
           gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.4)"
    >
    </v-img> -->

    <!-- ###############################################################-->
    <!-- #################### Mobile Device ############################-->
    <!-- ###############################################################-->
    
    <v-row v-if="isMobileDevice">
      <v-img src="/img/home/mememaster_home_mobile.webp" 
            cover
            gradient="to bottom, rgba(0,0,0,.8), rgba(0,0,0,.5)"
      >
      
        <div class="ma-8">
          <v-row :style="'margin-top:' + (windowHeight - 460) + 'px;'" :align="'center'">
            <v-col cols="12" md="12" >
              <p :class="isMobileDevice ? 'font-weight-bold homeText' : 'font-weight-bold homeText'">Welcome to Meme Master's AI, NFT, Memes, Music and Gaming platform.</p>
              <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeTextSmall'">Hold our EMAS tokens in your wallet to be eligible for airdrops and more.</p>
              <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeTextSmall'">We're excited to announce our token offer, targeted for July 2023, get in early.</p>
              <!--<v-layout class="mt-8" >
                <v-btn size="x-large"
                      variant="outlined"
                      color="white"
                      theme="dark"
                      style="width:100%"
                >Coming Soon!
                </v-btn>
              </v-layout> -->
            </v-col>
          </v-row>

        </div>
      </v-img>

      <v-row :align="'center'" v-if="isMobileDevice" class="ma-4">
          <v-col cols="12" md="1" class="pa-4">
          </v-col>

          <v-col cols="12" md="4" >
            <v-card
              class="mx-auto overflow-auto"
              max-width="100%"
              min-width="100%"
              height="240"
              max-height="300"
              style="opacity:0.8"
              color="deep-purple-lighten-4"
            >
              <v-card-title >
                <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                  Meme Collections & Token Listings
                </div>
              </v-card-title>
                <v-card-text>
                  <div class="text-body-1">
                    With Meme Master, you'll be able to: <br>
                    Mint your own memes and turn them into NFTs.<br>
                    <p style="margin-top:10px">Import, trade, and store your memes and NFTs in our marketplace.</p>
                  </div>
                </v-card-text>
                <v-card-actions class="card-actions" style="width:100%">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                  >
                    Learn More
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="3" class="pa-4">
            <v-card
              class="mx-auto overflow-auto"
              max-width="100%"
              min-width="100%"
              height="280"
              max-height="350"
              style="opacity:0.8"
              color="deep-purple-lighten-4"
            >
              <v-card-title>
                <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                  Airdrops, Gaming and much more
                </div>
              </v-card-title>
                <v-card-text>
                  <div class="text-body-1 pb-16">
                    Get access to join our limited-edition airdrops.<br><br>
                    These NFTs, when held in your wallet (with a min quantity of EMAS tokens) will give many benefits including early access to our new features that are listed our roadmap.
                  </div>
                </v-card-text>
                <v-card-actions class="card-actions" style="width:100%">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                  >
                    Learn More
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="3" class="pa-4">
            <v-card
              class="mx-auto overflow-auto"
              max-width="100%"
              min-width="100%"
              height="240"
              max-height="300"
              style="opacity:0.8"
              color="deep-purple-lighten-4"
            >
              <v-card-title>
                <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                  Connect Wallet or Walletless
                </div>
              </v-card-title>
              
                <v-card-text>
                  <div class="text-body-1">
                    Signing up is a breeze! You can use your Web 3 wallets (like MetaMask or Trust Wallet) or simply use your email address for FIAT via standard OTPs, with no blockchain knowledge required.
                  </div>
                </v-card-text>
                <v-card-actions class="card-actions" style="width:100%">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                  >
                    Learn More
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="1" class="pa-4">
          </v-col>
        </v-row>
    </v-row>

    <div id="gallery">
        <v-row :style="scrollClicked ? 'margin-top:32px' : ''">
          <v-col class="mt-4">
            <div class="text-center gallery">Sample of our Meme gallery!</div>
          </v-col>
        </v-row>

        <v-row :align="'center'" class="ma-4">
          <v-col cols="12" md="12" :align="'center'">
            <v-btn 
                prepend-icon="mdi-collage" 
                size="x-large" 
                variant="outlined"
                theme="dark"
                color="white"
                to="/collections"
                style="text-transform: none !important;box-shadow: 0px 0px 5px 5px rgb(96, 88, 172);" 
            >
              Get inspired by our gallery!
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-8 ml-2 mr-2 mb-4">
          <template v-for="(image,imgIdx) in images1" :key="imgIdx">
            <v-col cols="12" :md="image.cols">
              <v-img
                :src="image.url"
                cover
                class="align-end"
              >
              </v-img>
            </v-col>
          </template>

          <template v-for="(image,imgIdx) in images2" :key="imgIdx">
            <v-col cols="12" :md="image.cols">
              <v-img
                :src="image.url"
                cover
                class="align-end"
              >
              </v-img>
            </v-col>
          </template>

          <template v-for="(image,imgIdx) in images3" :key="imgIdx">
            <v-col cols="12" :md="image.cols">
              <v-img
                :src="image.url"
                cover
                class="align-end"
              >
              </v-img>
            </v-col>
          </template>
        </v-row>
      </div>

      <!-- ######################## DIALOGS ############################ -->
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
                class="d-flex flex-wrap mx-auto px-8 py-8"
                elevation="4"
                rounded
                width="100%"
              >
                <v-row>
                  <v-col cols="12" md="8">
                    <div>
                      <h2 class="text-h4 font-weight-bold">Meme Collections & Token Listings</h2>

                      <div class="text-h6 mt-2 mb-2">
                        With Meme Master, you'll be able to:<br>
                        Mint your own memes and turn them into NFTs.<br>
                        Import, trade, and store your memes and NFTs in our marketplace.<br><br>
                        Create NFTs from your memes or directly for integration in our gaming platforms.<br><br>
                        Get early access to new token listings from our own token finder complete with features such as anti- rug pull, compliance, project KYC. Our daily top listings and much more to allow you to get early access into many projects with peace of mind, this will be exclusive to MemeMaster.
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" :align="'right'" align-self="center">
                    <v-img style="max-width: 350px; border-radius: 10px;"
                           src="/img/home/nft_machine.webp"></v-img>
                  </v-col>
                </v-row>
              </v-sheet>

              <v-sheet
                class="d-flex flex-wrap mx-auto px-8 py-8 mt-4"
                elevation="4"
                rounded
                width="100%"
              >
                <v-row>
                  <v-col cols="12" md="4" :align="'left'" align-self="center">
                    <v-img style="max-width: 350px; border-radius: 10px;"
                           src="/img/home/airdrops_and_gaming.webp"></v-img>
                  </v-col>

                  <v-col cols="12" md="8">
                    <div>
                      <h2 class="text-h4 font-weight-bold">Airdrops Gaming and much more</h2>

                      <div class="text-h6 mt-2 mb-2">
                        Get access to join our limited-edition airdrops.<br><br>
                        These NFTs, when held in your wallet (with a min quantity of EMAS tokens) will give many benefits including early access to our new features that are listed our roadmap, early access to new token listings, higher free allocation of our MemeMaster points that you can use in the games (that you will also have early access too) and later convert to our EMAS tokens.<br><br>
                        Access to our future limited-edition airdrops and also early access to join our partners of listed tokens (coming soon) plus so much more...<br>
                        All of these features can be managed from your Meme Master dashboard, allowing seamless storage, trading, and transfer on memes, NFTs, Games, music and more.<br><br>
                        Holding our EMAS tokens is the first step to opening these possibilities.<br><br>
                        Token Martix (this later will be a link to show users what they need to hold in order to be eligible)                  
                        </div>
                    </div>
                  </v-col>
                </v-row>
              </v-sheet>

              <v-sheet
                class="d-flex flex-wrap mx-auto px-8 py-8 mt-4"
                elevation="4"
                rounded
                width="100%"
              >
                <v-row>
                  <v-col cols="12" md="8">
                    <div>
                      <h2 class="text-h4 font-weight-bold">Connect Wallet or Walletless</h2>

                      <div class="text-h6 mt-2 mb-2">
                        Signing up is a breeze! You can use your Web 3 wallets (like MetaMask or Trust Wallet) or simply use your email address for FIAT via standard OTPs, with no blockchain knowledge required.<br><br>
                        New to crypto? Click the guide below to help you onboard.<br><br>

                        <v-btn
                          style="text-transform: none !important;"
                          variant="outlined"
                          size="large"
                          color="indigo-lighten-2"
                          prepend-icon="mdi-wallet"
                          @click="addETHNetwork"
                        >
                        How to Create a Wallet?
                        </v-btn>
                      </div>
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

    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'Home',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    learnMoreDialog: false,
    imageLayout: [
      { cols: 4 },
      {
        cols: 8,
        children: [{ cols: 12 }, { cols: 12 }],
      },
      { cols: 6 },
      { cols: 3 },
      { cols: 9 },
      { cols: 4 },
      { cols: 8 },
    ],
    carousel: 0,
    carouselItems: [
        {
          src: '/img/home/mememaster_home01.webp',
        },
        {
          src: '/img/home/mememaster_home02.webp',
        },
        {
          src: '/img/home/mememaster_home03.webp',
        },
        {
          src: '/img/home/mememaster_home04.webp',
        },
        {
          src: '/img/home/mememaster_home05.webp',
        },
        {
          src: '/img/home/mememaster_home06.webp',
        }
      ],
    images1: [
      {name: '', meme:'Enjoying the sun at the beach on pandora', color: '', url: '/img/memes/meme_01.png', cols: 4},
      {name: '', meme:'The end of the day...', color: '', url: '/img/memes/meme_02.png', cols: 4},
      {name: '', meme:"When you're trying to diet but your fridge is full of cake", color: 'purple', url: '/img/memes/meme_03.png', cols: 4},
    ],
    images2: [
      {name: '', meme:'English not getting any better...', color: '', url: '/img/memes/meme_10.png', cols: 6},
      {name: '', meme:"That's how I like my noodles!", color: '', url: '/img/memes/meme_08.png', cols: 6},
    ],
    images3: [
      {name: '', meme:'Elon and Shiba Inu checking the price of Tesla shares...', color: '', url: '/img/memes/meme_06.png', cols: 4},
      {name: '', meme:'Need my daily coffee...', color: '', url: '/img/memes/meme_07.png', cols: 4},
      {name: '', meme:"That's how I like my noodles!", color: 'purple', url: '/img/memes/meme_09.png', cols: 4},
    ],
    reveal: false,
    scrollClicked: false
  }),
  components: { 
  },
  computed: {

  },
  watch: {
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    // this.init();
    this.scrollToTop()
    console.log('###### this.isMobileDevice Home Home ##########')
    console.log(this.isMobileDevice)
  },
  methods: {
    scrollToGallery () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#gallery', 500, { offset: -64 });
      }, 200);
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#home', 500, { offset: -64 });
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
    font-size: 38px;
    line-height: 1em;
    color: #FFF;
  }
  .homeTextSmaller {
    font-family: 'Gruppo';
    font-size: 28px;
    line-height: 1em;
    color: #FFF;
    margin-top: 16px;
  }
  .cardTextTitle {
    font-family: 'Saira';
    font-size: 20px;
    font-weight: bold;
  }
  .cardTextTitleSmall {
    font-family: 'Saira';
    font-size: 18px;
    font-weight: bold;
  }
  .cardTextTitleSmaller {
    font-family: 'Saira';
    font-size: 16px;
    font-weight: bold;
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
