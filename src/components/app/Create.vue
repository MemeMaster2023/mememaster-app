<template>
  <div id="create">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 1">

       <v-row class="mt-12" :align="center">
        <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="6" :align="center">
          <div class="text-h4 text-center ma-2">Creating your Meme starts here!</div>
          <div class="text-center cardTextCreateSmall ma-2">Are you ready to unleash your creativity and tickle the internet's funny bone? Memes have become an integral part of modern online culture, allowing us to express ideas, emotions, and humor in a concise and shareable format. With a few simple steps, you can dive into the world of meme creation and craft your very own viral sensation. Buckle up, because the meme magic is about to begin!</div>
        </v-col>

        <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
        </v-col>

       </v-row>

       <v-row class="mt-8 mb-16" :align="center">
        <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="3" :align="center">
          <v-card
            class="mx-auto"
            max-width="350"
            min-height="180"
            variant="outlined"
          >
            <v-card-item>
              <div>
                <div class="text-h6 text-center">Meme Master Generator</div>
                <div class="body-1 text-center">Generate and Design your own Memes with our powerful AI engine and turn them into NFTs.</div>
              </div>
            </v-card-item>

            <v-card-actions style="position: absolute; bottom: 0;width:100%;">
              <v-btn 
                variant="outlined" 
                color="deep-purple-lighten-1" 
                style="width:100%" 
                prepend-icon="mdi-arrow-right-bold-hexagon-outline" 
                @click="view = 2"
              >
                Start Here
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="3" :align="center">
          <v-card
            class="mx-auto"
            min-height="180"
            max-width="350"
            variant="outlined"
          >
            <v-card-item>
              <div>
                <div class="text-h6 text-center">Upload your Own</div>
                <div class="body-1 text-center">Upload Images or Memes from your own collection and enhance them amd turn them into NFTs.</div>
              </div>
            </v-card-item>

            <v-card-actions style="position: absolute; bottom: 0;width:100%">
              <v-btn 
                variant="outlined" 
                color="indigo-lighten-1"  
                style="width:100%" 
                prepend-icon="mdi-upload" >
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="3" :align="center" >
        </v-col>
       </v-row>
      </v-card>

      <!-- ############################### Create Meme Comp -->
      <CreateMeme v-if="view === 2"
        :isMobileDevice="isMobileDevice" 
        :dark="dark"
        :windowWidth="windowWidth" 
        :windowHeight="windowHeight"
        :drawer="drawer"
        :toDrafts="toDrafts"
      >
      </CreateMeme>
  
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
import CreateMeme from './CreateMeme'
export default {
  name: 'Create',
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
    toDrafts: false
  }),
  components: {
    CreateMeme
  },
  computed: {

  },
  watch: {
    '$route.params.type'() {
      console.log('route changed')
      if (this.$route.params?.type === 'default') {
        this.view = 2
        this.toDrafts = false
        return
      } else {
        this.view = 2
        this.toDrafts = true
      }
    }
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.scrollToTop()
    this.init()
    if (this.$route.params?.type === 'default') {
      this.view = 1
      this.toDrafts = false
      return
    } else {
      this.view = 2
      this.toDrafts = true
    }
  },
  methods: {
    init () {
     
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#collections');
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
