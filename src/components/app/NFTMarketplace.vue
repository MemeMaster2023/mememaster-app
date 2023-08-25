<template>
  <div id="mynfts">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 1">

       <v-row class="mt-12 mx-auto" :align="center">
        <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col :class="isMobileDevice ? 'mt-12' : 'mt-12'" md="6" cols="12" :align="center">
          <div class="text-h4 text-center ma-2">NFT Marketplace</div>
          <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
            Meme Master's NFT Marketplace, the premier destination for buying, selling, and trading unique digital assets on the blockchain. Step into a world where creativity meets technology, and explore an incredible collection of non-fungible tokens (NFTs) created by talented artists and creators from around the globe.<br><br>

            Discover a diverse range of digital artwork, collectibles, virtual real estate, virtual goods, and much more. Our NFT Marketplace provides a platform for artists to showcase their digital creations and connect with a global community of art enthusiasts, collectors, and investors.<br><br>

            Whether you're an artist looking to showcase your talent and monetize your work, a collector seeking rare and exclusive digital assets, or simply an enthusiast eager to explore the vibrant world of NFTs, our marketplace offers a seamless and secure platform to engage with this exciting ecosystem.      
          </div>
          <v-alert
            class="mt-8 mb-8"
            color="deep-purple-darken-4"
            theme="dark"
            icon="mdi-code-braces"
          >
            <p style="font-size: 1.3rem;margin-top: -5px;">The Marketplace is under development.<br>Stay tuned for information about the 1st release.</p>
          </v-alert>        
          
          <v-btn
            variant="outlined"
            color="deep-purple-lighten-2"
            size="large"
            style="width: 100%"
            to="/exclusive"
          >
            
            {{ isMobileDevice ? 'Explore our Collections' : 'Take a look at our "Exclusive NFT Collections'}}
          </v-btn>

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
import CreateMeme from './CreateMeme'
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
    CreateMeme
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
