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
                    bg-color="#858585"
                  >
                  <strong>{{ '17' }}%</strong>
                  </v-progress-linear>
                </v-layout>

                <div style="font-size: 1rem;"  class="ma-2 font-weight-bold text-black">Sold — 120,000,000 / 350,000,000</div>
                <div style="font-size: 1rem;"  class="ma-2 font-weight-bold text-black">USDT Raised — $600,000 / $1,750,000</div>

                <v-row class="pt-16">
                  <v-col cols="12" md="12" class="pl-8 pr-8">
                    <v-btn @click="connectWalletClicked" size="large" style="width:100%" color="#360a3f">Connect your Wallet</v-btn>
                  </v-col>
                </v-row>

                <v-row class="mb-8">
                  <v-col cols="12" md="6" class="pl-8">
                    <v-btn size="large" style="width:100%" >How to Buy</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" class="pr-8">
                    <v-btn size="large" style="width:100%">New to Crypto</v-btn>
                  </v-col>
                </v-row>


          

            </v-card>
          </v-col>

        </v-row>

        <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" :align="center">
        
        </v-row>

      </v-img>
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
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
  }),
  components: {
  },
  computed: {

  },
  watch: {
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
      this.$emit("connectWalletClicked")
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
