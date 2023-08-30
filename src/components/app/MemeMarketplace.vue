<template>
  <div id="mememarketplace">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16 ml-2 mr-2" height="100%" v-if="view === 1">

       <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" :align="center">
        <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="8" :align="center">
          <div class="text-h4 text-center ma-2">Meme Marketplace</div>
          <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
            Welcome to our Meme Marketplace, the ultimate hub for meme enthusiasts, creators, and collectors. Dive into a world of laughter, wit, and viral sensations as you explore our curated collection of hilarious and iconic memes.
            <!-- <v-btn size="small" variant="text" @click="readMore = !readMore">Read more...</v-btn> -->
            <br><br>

            <div v-if="readMore">
              Discover a wide range of meme formats, templates, and viral sensations that have taken the internet by storm. From classic reaction images to trending memes, our marketplace showcases the best and most entertaining content from across the meme-sphere.<br><br>

              As a creator, our Meme Marketplace provides you with a platform to showcase your meme-making skills and gain recognition. Upload your original creations, share your unique sense of humor with the world, and even earn rewards for your viral masterpieces.<br><br>

              For collectors, our marketplace offers a chance to own and trade rare and sought-after memes. Build your meme collection, unlock limited-edition memes, and connect with fellow meme aficionados. With a transparent and secure blockchain-based system, each meme comes with a verified and immutable ownership record.
            </div>
          </div>

          <!-- ######################## Meme Marketplace Component ######################## -->

          <!-- <div class="row"> 

            <div class="column">
              <template v-for="(meme, index) in getPublicMemes">
                <img v-if="index <= memeCount-1" :src="meme.url" style="width:100%;border-radius: 10px;">
              </template>
            </div>

            <div class="column">
              <template v-for="(meme, index) in getPublicMemes">
                <img v-if="index >= memeCount && index < memeCount*2" :src="meme.url" style="width:100%;border-radius: 10px;">
              </template>
            </div>

            <div class="column">
              <template v-for="(meme, index) in getPublicMemes">
                <img v-if="index >= memeCount*2" :src="meme.url" style="width:100%;border-radius: 10px;">
              </template>
            </div>
              
          </div> -->

          <v-alert
            class="mt-8 mb-16"
            color="deep-purple-darken-4"
            theme="dark"
            icon="mdi-code-braces"
          >
            <p style="font-size: 1.3rem;margin-top: -5px;">The Meme Marketplace is under development.<br>Stay tuned for information about the 1st release.</p>
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
  name: 'Meme Marketplace',
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
    readMore: true,
    limit: 50,
    memeCount: 0
  }),
  components: {
  },
  computed: {
    getPublicMemes () {
      return this.$store.state.fb.publicMemes
    },
  },
  watch: {
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.scrollToTop()
    // this.init()
  },
  methods: {
    init () {
     this.getMemes()
    },
    getMemes() {
      
      this.loadingData = true
      var dispatchObj = {
        limit: this.limit
      }

      this.$store.dispatch("getPublicMemes", dispatchObj)
        .then(() => {
          console.log('######################## this.getPublicMemes #####################')
          if (this.getPublicMemes.length === 0) {
            this.waitPublicMemesLoaded()
          } else {
            console.log(this.getPublicMemes)
            this.loadingData = false
            this.memeCount = Math.ceil(this.getPublicMemes.length / 3)
            console.log(this.memeCount)
          }
        })
        .catch(error => {
          console.log(error)
          this.loadingData = false
        })
    },
    waitPublicMemesLoaded () {
      setTimeout(() => {
          if (this.getPublicMemes.length === 0) {
            this.waitPublicMemesLoaded()
          } else {
            console.log(this.getPublicMemes)
            this.loadingData = false
            this.memeCount = Math.ceil(this.getPublicMemes.length / 3)
            console.log(this.memeCount)
            return
          }
        }, 2000);
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#mememarketplace', 500, { offset: -64 });
      }, 200);
    },
  }
}
</script>

<style lang="scss">
  .cardTextCreateSmall {
    font-family: 'Jura';
    font-size: 18px;
  }
  * {
  box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial;
  }

  .header {
    text-align: center;
    padding: 32px;
  }

  .row {
    display: -ms-flexbox; /* IE10 */
    display: flex;
    -ms-flex-wrap: wrap; /* IE10 */
    flex-wrap: wrap;
    padding: 0 4px;
  }

  /* Create four equal columns that sits next to each other */
  .column {
    -ms-flex: 33%; /* IE10 */
    flex: 50%;
    max-width: 33%;
    padding: 0 8px;
  }

  .column img {
    margin-top: 16px;
    vertical-align: middle;
    width: 100%;
  }

  /* Responsive layout - makes a two column-layout instead of four columns */
  @media screen and (max-width: 800px) {
    .column {
      -ms-flex: 50%;
      flex: 50%;
      max-width: 50%;
    }
  }

  /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .column {
      -ms-flex: 100%;
      flex: 100%;
      max-width: 100%;
    }
  }

</style>
