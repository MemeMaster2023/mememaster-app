<template>
  <div id="mynfts">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 1">

       <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" :align="center">
        <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="8" :align="center">
          <div class="text-h4 text-center ma-2">Introducing Music to Meme Master</div>

          <v-row class="mt-8">
            <v-col cols="12" md="4" :align="isMobileDevice ? 'center' : 'right'">
              <v-img style="max-width: 300px; border-radius: 10px;"
              src="/img/music/mememaster_music_01.png">
            </v-img>
            </v-col>

            <v-col cols="12" md="8">
              <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
                 Take your memes to the next level with our latest feature: Music Integration. Elevate the humor, emotion, and impact of your memes by seamlessly blending them with catchy tunes. Our platform allows you to easily add music to your memes, enhancing the overall experience for your audience. From upbeat tracks to sentimental melodies, choose the perfect soundtrack to complement your witty creations. With Music Integration, your memes will have an irresistible charm that resonates with viewers on a whole new level.
              </div>
            </v-col>
          </v-row>
        
          
          <v-row>
            <v-col cols="12" md="8">
              <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
                Experiment with an AI DJ: Let Our Virtual DJ Curate Your Playlist
                Dive into the world of AI-driven music curation with our innovative feature: AI DJ. Say goodbye to the hassle of creating playlists manually and let our virtual DJ take the reins. Our intelligent algorithm analyzes your music preferences, understands your mood, and crafts customized playlists tailored specifically for you. With AI DJ, you'll discover a seamless blend of your favorite tunes and new, exciting tracks. Sit back, relax, and enjoy the perfect mix as our AI DJ expertly navigates through genres, tempos, and styles to create an immersive musical journey personalized just for you.
              </div>
            </v-col>
            
            <v-col cols="12" md="4" :align="isMobileDevice ? 'center' : 'right'">
              <v-img style="max-width: 300px; border-radius: 10px;"
                 src="/img/music/mememaster_music_03.png">
                </v-img>
            </v-col>
          </v-row>


        
          <v-alert
            class="mt-8 mb-8"
            color="deep-purple-darken-4"
            theme="dark"
            icon="mdi-code-braces"
          >
            <p style="font-size: 1.3rem;margin-top: -5px;">The Music features will be developed in Phase 4.<br>Stay tuned for information about the 1st release.</p>
          </v-alert>    
          
        </v-col>

        <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
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
