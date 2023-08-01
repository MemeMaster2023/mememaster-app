<template>
  <div id="tokens">
    <v-responsive style="background-color: #212121;">
      
      <v-card theme="dark" :class="isMobileDevice ? 'mt-2' : 'mt-16 mb-16'" height="100%" v-if="view === 1">

       <v-row :class="isMobileDevice ? 'mt-2 ml-2 mr-2' : 'mt-12'" :align="center">
        <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="8" :align="center" >
          <div class="text-h4 text-center ma-2">New Tokens Listing</div>

          <v-row class="mt-4">
            <v-col cols="12" md="8" :class="isMobileDevice ? 'pa-4' : ''">
              <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
                Welcome to our New Tokens Listing section, where you can discover a wide array of tokens. Whether you're an investor, enthusiast, or simply curious about the latest trends in the digital asset space, this is the place to be.<br><br>
                
                Explore a diverse range of tokens representing various projects, protocols, and industries. From cryptocurrencies to utility tokens and beyond, our curated selection ensures you have access to some of the most promising and innovative assets in the market.<br><br>
              </div>
            </v-col>
            <v-col cols="12" md="4" :align="isMobileDevice ? 'center' : 'right'">
              <v-img style="max-width: 300px; border-radius: 10px;"
                 src="/img/tokens/tokens_02.png"></v-img>
            </v-col>
          </v-row>

          <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
            Keep an eye out for new listings and exciting token offerings, as we regularly update our collection to showcase the latest opportunities in the ever-evolving digital landscape. Whether you're seeking long-term investments or short-term trading opportunities, our Token Listings section serves as your gateway to the world of digital assets.
          </div>
          <v-alert
            class="mt-8 mb-8"
            color="deep-purple-darken-4"
            theme="dark"
            icon="mdi-code-braces"
          >
            <p style="font-size: 1.3rem;margin-top: -5px;">The New Token Listings will be launched in Phase 4.<br>Stay tuned for information about the 1st release.</p>
          </v-alert>    
          
          <!-- <v-btn
            variant="outlined"
            color="deep-purple-lighten-2"
            size="large"
            style="width: 100%"
            to="/games-early-insights"
          >
            
            Take a sneak peek at our "New Token Listings"
          </v-btn> -->
        </v-col>

        <v-col cols="12" md="8" :align="center" v-if="!isMobileDevice">
        </v-col>

       </v-row>

      </v-card>
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'New Token Listings',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean,
  },
  data: () => ({
    loading: false,
    view: 1,
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
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#mynfts', 500, { offset: -64 });
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
