<template>
  <div id="mynfts">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16 ml-2 mr-2" height="100%" v-if="view === 1">

       <v-row class="mt-12" :align="center">
        <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="6" :align="center">
          <div class="text-h4 text-center ma-2">Meme Marketplace</div>
          <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
            Welcome to our Meme Marketplace, the ultimate hub for meme enthusiasts, creators, and collectors. Dive into a world of laughter, wit, and viral sensations as you explore our curated collection of hilarious and iconic memes.<br><br>

            Discover a wide range of meme formats, templates, and viral sensations that have taken the internet by storm. From classic reaction images to trending memes, our marketplace showcases the best and most entertaining content from across the meme-sphere.<br><br>

            As a creator, our Meme Marketplace provides you with a platform to showcase your meme-making skills and gain recognition. Upload your original creations, share your unique sense of humor with the world, and even earn rewards for your viral masterpieces.<br><br>

            For collectors, our marketplace offers a chance to own and trade rare and sought-after memes. Build your meme collection, unlock limited-edition memes, and connect with fellow meme aficionados. With a transparent and secure blockchain-based system, each meme comes with a verified and immutable ownership record.
          </div>
          <v-alert
            class="mt-8 mb-16"
            color="deep-purple-darken-4"
            theme="dark"
            icon="mdi-code-braces"
          >
            <p style="font-size: 1.3rem;margin-top: -5px;">The Meme Marketplace is still in development.<br>Stay tuned for information about the 1st release.</p>
          </v-alert>                                
        </v-col>

        <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
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
