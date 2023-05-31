<template>
  <div id="mynfts">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 1">

       <v-row class="mt-12" :align="center">
        <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="6" :align="center">
          <div class="text-h4 text-center ma-2">Turn your Memes into NFTs</div>
          <div class="text-center cardTextCreateSmall ma-2">Welcome to our platform, where the world of memes meets the innovative realm of Non-Fungible Tokens (NFTs). 
                                                            Take your memes to new heights by transforming them into unique digital assets that will captivate audiences like never before.<br><br>

                                                            With our advanced NFT creation tools, you can soon empower your creativity and give your memes a permanent place in the digital art ecosystem.</div>
                                                            <v-alert
                                                              class="mt-8 mb-16"
                                                              color="deep-purple-darken-4"
                                                              theme="dark"
                                                              icon="mdi-code-braces"
                                                            >
                                                              <p style="font-size: 1.3rem;margin-top: -5px;">This feature is still in development.<br>Stay tuned for information about the 1st release.</p>
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
        firstScrollTo('#mynfts');
      }, 200);
    },
  }
}
</script>

<style lang="scss">
  .homeText {
    font-family: 'Baumans';
    font-size: 40px;
    line-height: 1em;
    color: #FFF;
  }
  .homeTextSmall {
    font-family: 'Baumans';
    font-size: 28px;
    line-height: 1em;
    color: #FFF;
  }
  .homeTextSmaller {
    font-family: 'Baumans';
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
    font-family: 'Baumans';
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
