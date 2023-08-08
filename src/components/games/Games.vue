<template>
  <div id="mynfts">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 1">

       <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" :align="center">
        <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="8" :align="center">
          <div class="text-h4 text-center ma-2">Meme Master AI Games</div>

          <v-row>
            <v-col cols="12" md="8">
              <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
                Welcome to our Games section, where excitement and rewards await! Immerse yourself in a world of thrilling gaming experiences and start earning points as you conquer challenges and achieve milestones in our featured games.<br><br>
                
                Every accomplishment you achieve in our games will earn you valuable points. These points serve as a currency within our ecosystem, opening up a world of possibilities. Use your hard-earned points in our marketplaces to unlock exclusive in-game items, power-ups, and enhancements that will take your gaming experience to the next level.<br><br>
              </div>
            </v-col>
            <v-col cols="12" md="4" :align="isMobileDevice ? 'center' : 'right'">
              <v-img style="max-width: 300px; border-radius: 10px;"
                 src="https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Game%20Insights%2FCyber%20pulse%20game%2FCyber%20pulse%20game.png?alt=media&token=b12af028-7656-4962-8c36-c27273b6274c"></v-img>
            </v-col>
          </v-row>

          <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
              But the rewards don't stop there! We believe in recognizing and appreciating our dedicated players. As a token of our gratitude, you can also redeem your accumulated points for our very own EMAS tokens. EMAS tokens not only hold inherent value within our platform but can also be used in various ways, such as participating in exclusive events, accessing premium content, or even trading them for other digital assets.
          </div>
          <v-alert
            class="mt-8 mb-8"
            color="deep-purple-darken-4"
            theme="dark"
            icon="mdi-code-braces"
          >
            <p style="font-size: 1.3rem;margin-top: -5px;">The Games will be developed in Phase 4.<br>Stay tuned for information about the 1st AI game releases.</p>
          </v-alert>    
          
          <v-btn
            variant="outlined"
            color="deep-purple-lighten-2"
            size="large"
            style="width: 100%"
            to="/games-early-insights"
          >
           {{ isMobileDevice ? 'Take a sneak peek' : 'Take a sneak peek at our "Early AI Gaming Insights"' }}
          </v-btn>
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
  name: 'My NFTs',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
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
