<template>
  <div id="create">
    <v-responsive style="background-color: #000;">


      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 0">
        
        <v-row class="mt-16">
              <v-col cols="12"  :align="'center'">
                <v-progress-circular
                    indeterminate
                    color="deep-purple-darken-2"
                  ></v-progress-circular>
                  <div class="text-h6 mt-2 blue--text">Loading drafts...</div>
              </v-col>
            </v-row>
      
      </v-card>
      
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

       <v-row class="mt-8 mb-16" :align="center" style="margin-right: 10%;margin-left: 10%;">

        <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="4" :align="center">
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
                prepend-icon="mdi-image-multiple-outline" 
                @click="view = 2"
              >
                Start Here
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" :align="center">
          <v-card
            class="mx-auto"
            min-height="180"
            max-width="350"
            variant="outlined"
          >
            <v-card-item>
              <div>
                <div class="text-h6 text-center">Upload your Own</div>
                <div class="body-1 text-center">Upload Images or from your own collection and enhance them and turn them into Memes.</div>
              </div>
            </v-card-item>

            <v-card-actions style="position: absolute; bottom: 0;width:100%">
              <v-btn 
                variant="outlined" 
                color="indigo-lighten-1"  
                style="width:100%" 
                prepend-icon="mdi-upload" 
                to="/generate/upload"
                >
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- <v-col cols="12" md="4" :align="center">
          <v-card
            class="mx-auto"
            min-height="180"
            max-width="350"
            variant="outlined"
          >
            <v-card-item>
              <div>
                <div class="text-h6 text-center">Text to Video</div>
                <div class="body-1 text-center">Turn text into dynamic videos, captivating audiences with stunning visuals and engaging animations.</div>
              </div>
            </v-card-item>

            <v-card-actions style="position: absolute; bottom: 0;width:100%">
              <v-btn 
                variant="outlined" 
                color="blue-lighten-1"  
                style="width:100%" 
                prepend-icon="mdi-animation-play" 
                to="/generate/video"
                >
                Try It Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col> -->
        
       </v-row>
      </v-card>

      <!-- #################################################################################-->
      <!-- ############################### Create Meme Comp ############################### -->
      <!-- #################################################################################-->
      <CreateMeme v-if="view === 2"
        :isMobileDevice="isMobileDevice" 
        :dark="dark"
        :windowWidth="windowWidth" 
        :windowHeight="windowHeight"
        :drawer="drawer"
        :toDrafts="toDrafts"
        :toUpload="toUpload"
      >
      </CreateMeme>

      <!-- #################################################################################-->
      <!-- ############################### Text To Video ################################## -->
      <!-- #################################################################################-->
      <TextToVideo v-if="view === 3"
        :isMobileDevice="isMobileDevice" 
        :dark="dark"
        :windowWidth="windowWidth" 
        :windowHeight="windowHeight"
        :drawer="drawer"
        :toDrafts="toDrafts"
        :toUpload="toUpload"
      >
      </TextToVideo>
  
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
import CreateMeme from './CreateMeme'
import TextToVideo from './TextToVideo'
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
    toDrafts: false,
    toUpload: false
  }),
  components: {
    CreateMeme,
    TextToVideo
  },
  computed: {
    getUser () {
      return this.$store.state.user
    },
  },
  watch: {
    '$route.params.type'() {
      console.log('route changed')
      if (this.$route.params?.type === 'default') {
        this.view = 2
        this.toDrafts = false
        this.toUpload = false
        return
      } else if (this.$route.params?.type === 'drafts') {
        this.view = 2
        this.toDrafts = true
        this.toUpload = false
      } else if (this.$route.params?.type === 'upload') {
        this.view = 2
        this.toUpload = true
        this.toDrafts = false
      } else if (this.$route.params?.type === 'video') {
        this.view = 3
        this.toUpload = false
        this.toDrafts = false
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
      this.toUpload = false
      return
    } else if (this.$route.params?.type === 'drafts') {
      console.log('############## Drafts this.getUser ##############')
      console.log(this.getUser.uid)
      if (this.getUser.uid === '') {
        this.view = 0
        this.waitGetUser()
      } else {
        this.view = 2
        this.toDrafts = true
        this.toUpload = false
      }
      return
    } else if (this.$route.params?.type === 'upload') {
      this.view = 2
      this.toUpload = true
    } else if (this.$route.params?.type === 'video') {
      this.view = 3
      this.toUpload = false
    }
  },
  methods: {
    init () {
     
    },
    waitGetUser () {
      setTimeout(() => {
        if (this.getUser.uid === '') {
          this.waitGetUser()
        } else {
          this.view = 2
          this.toDrafts = true
          this.toUpload = false
        }
      }, 2000);
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#create', 500, { offset: -64 });
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
