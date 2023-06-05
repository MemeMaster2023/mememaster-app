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
        :interval="10000"
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
            <v-col cols="12" md="6" class="pa-4">
              
              <template v-if="i === 0">
                <p :class="isMobileDevice ? 'font-weight-bold homeText' : 'font-weight-bold homeText'">Welcome to Meme Master's AI, NFT, Memes, Music and Gaming platform.</p>
                <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeTextSmall'">We're creating a hub where memes, NFTs, and social media intersect.</p>
              </template>
              <template v-if="i === 1">
                <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">Currently under development, we're excited to announce our IDO token listing, targeted for June 2023.</p>
              </template>

              <template v-if="i === 2">
                <p v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">Hold EMAS tokens in your wallet and be a part of our platform's growth.</p>
              </template>
              <template v-if="i === 3">
                <p v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">Follow us on our social media platforms to stay updated, and feel free to email us for any direct inquiries.</p><br>
                <p v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'"> Join us and become a Meme Master!</p>
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

          <v-row :align="'center'" v-if="!isMobileDevice" style="height:100%">
            <v-col cols="12" md="1" class="pa-4">
            </v-col>

            <v-col cols="12" md="4" class="pa-4" align-self="end" style="height:100%">
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                height="240"
                max-height="300"
                style="opacity:0.7"
                color="grey-lighten-4"
              >
              <v-card-title >
                <div class="font-weight-bold cardTextTitle">
                  Meme Collections & Token Listings
                </div>
              </v-card-title>
                <v-card-text>
                  <div class="text-body-1">
                    With Meme Master, you'll be able to: <br>
                    Mint your own memes and turn them into NFTs.<br>
                    Import, trade, and store your memes and NFTs in our marketplace.<br>
                    Get early access to new token listings. 
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    style="margin-top: 5px"
                    variant="text"
                    color="purple-darken-4"
                    @click="scrollToGallery()"
                  >
                    Sample Gallery
                  </v-btn>
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
                style="opacity:0.7"
                color="grey-lighten-4"
              >
              <v-card-title>
                <div class="cardTextTitleSmall">
                  Airdrops with our AI ChatBot
                </div>
              </v-card-title>
                <v-card-text>
                  <div class="text-body-1">
                    And enjoy limited edition Meme Master Airdrops with our AI ChatBot!<br>
                    All of these features can be managed from your Meme Master dashboard, allowing seamless storage, trading, and transfer.<br>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    style="margin-top:-35px"
                    variant="text"
                    color="purple-darken-4"
                  >
                    Learn More
                  </v-btn>
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
                style="opacity:0.7"
                color="grey-lighten-4"
              >
              <v-card-title>
                <div class="cardTextTitleSmall">
                  Connect Wallet or Walletless
                </div>
              </v-card-title>
              
                <v-card-text>
                  <div class="text-body-1">
                    Signing up is a breeze! You can use your Web 3 wallets (like MetaMask or Trust Wallet) or simply use your email address for FIAT via standard OTPs, with no blockchain knowledge required.
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    style="margin-top: 5px"
                    variant="text"
                    color="purple-darken-4"
                  >
                    Learn More
                  </v-btn>
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
          <v-row :style="'margin-top:' + (windowHeight - 450) + 'px;'" :align="'center'">
            <v-col cols="12" md="12" >
              <p :class="isMobileDevice ? 'font-weight-bold homeText' : 'font-weight-bold homeText'">Welcome to Meme Master's AI, NFT, Memes, Music and Gaming platform.</p>
              <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeTextSmall'">We're creating a hub where memes, NFTs, and social media intersect.<br><br>Currently under development, we're excited to announce our fair token launch, targeted for June 2023.</p>
              <p v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeTextSmall'">Hold EMAS tokens in your wallet and be a part of our platform's growth.<br><br>Follow us on our social media platforms to stay updated, and feel free to email us for any direct inquiries.</p>
              <p v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeTextSmall'"> Join us and become a Meme Master!</p>
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
              style="opacity:0.7"
              color="deep-purple-lighten-4"
            >
            <v-card-title >
              <div class="font-weight-bold cardTextTitle">
                Meme Collections & Token Listings
              </div>
            </v-card-title>
              <v-card-text>
                <div class="text-body-1">
                  With Meme Master, you'll be able to: <br>
                  Mint your own memes and turn them into NFTs.<br>
                  Import, trade, and store your memes and NFTs in our marketplace.<br>
                  Get early access to new token listings. 
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  style="margin-top: 5px"
                  variant="text"
                  color="purple-darken-4"
                  @click="scrollToGallery()"
                >
                  Sample Gallery
                </v-btn>
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
              style="opacity:0.7"
              color="deep-purple-lighten-4"
            >
            <v-card-title>
              <div class="cardTextTitleSmall">
                Airdrops with our AI ChatBot
              </div>
            </v-card-title>
              <v-card-text>
                <div class="text-body-1">
                  And enjoy limited edition Meme Master Airdrops with our AI ChatBot!<br>
                  All of these features can be managed from your Meme Master dashboard, allowing seamless storage, trading, and transfer.<br>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  style="margin-top:-35px"
                  variant="text"
                  color="purple-darken-4"
                >
                  Learn More
                </v-btn>
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
              style="opacity:0.7"
              color="deep-purple-lighten-4"
            >
            <v-card-title>
              <div class="cardTextTitleSmall">
                Connect Wallet or Walletless
              </div>
            </v-card-title>
            
              <v-card-text>
                <div class="text-body-1">
                  Signing up is a breeze! You can use your Web 3 wallets (like MetaMask or Trust Wallet) or simply use your email address for FIAT via standard OTPs, with no blockchain knowledge required.
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  style="margin-top: 5px"
                  variant="text"
                  color="purple-darken-4"
                >
                  Learn More
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="1" class="pa-4">
          </v-col>
        </v-row>
    </v-row>

    <div id="gallery">
        <v-row :style="scrollClicked ? 'margin-top:64px' : ''">
          <v-col class="mt-4">
            <div class="text-center gallery">Get inspired by our gallery!</div>
          </v-col>
        </v-row>
        <v-row class="ml-2 mr-2 mb-4">
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

        <v-row :align="'center'" class="ma-4">
          <v-col cols="12" md="12" :align="'center'">
            <v-btn 
                prepend-icon="mdi-collage" 
                size="large" 
                variant="outlined"
                theme="dark"
                color="white"
                to="/collections"
            >
              See more Collections
            </v-btn>
          </v-col>
        </v-row>
      </div>

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
    windowHeight: Number
  },
  data: () => ({
    loading: false,
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
    font-size: 34px;
    line-height: 1em;
    color: #FFF;
    margin-top: 16px;
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
