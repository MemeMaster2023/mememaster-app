<template>
  <div id="nfts">
    <v-responsive style="background-color: #000;">


      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 0">
        
        <v-row class="mt-16">
              <v-col cols="12" :align="'center'">
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
            <div class="text-h4 text-center ma-2">Meme Master NFT Management</div>
          </v-col>

          <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
          </v-col>
       </v-row>

       <v-row class="mt-8 mb-16" :align="center" style="margin-right: 10%;margin-left: 10%;">

        <v-col cols="12" md="4" :align="center">
          <v-card
            class="mx-auto"
            max-width="350"
            min-height="180"
            variant="outlined"
          >
            <v-card-item>
              <div>
                <div class="text-h6 text-center">Meme Master Minter</div>
                <div class="body-1 text-center">Mint NFTs to Meme Masters inventory.</div>
              </div>
            </v-card-item>

            <v-card-actions style="position: absolute; bottom: 0;width:100%;">
              <v-btn 
                variant="outlined" 
                color="deep-purple-lighten-1" 
                style="width:100%" 
                prepend-icon="mdi-seed-plus-outline" 
                to="/admin/mint"
              >
                Mint
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
                <div class="text-h6 text-center">Meme Master NFT Inventory</div>
                <div class="body-1 text-center">Meme Master NFT Inventory.</div>
              </div>
            </v-card-item>

            <v-card-actions style="position: absolute; bottom: 0;width:100%">
              <v-btn 
                variant="outlined" 
                color="indigo-lighten-1"  
                style="width:100%" 
                prepend-icon="mdi-format-list-bulleted-type" 
                to="/generate/upload"
                >
                Open Inventory
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
                <div class="text-h6 text-center">Airdrop NFT</div>
                <div class="body-1 text-center">Drop NFTs to multiple wallets in 1 transaction.</div>
              </div>
            </v-card-item>

            <v-card-actions style="position: absolute; bottom: 0;width:100%">
              <v-btn 
                variant="outlined" 
                color="blue-lighten-1"  
                style="width:100%" 
                prepend-icon="mdi-airballoon-outline" 
                to="/generate/video"
                >
                Start Airdrop
              </v-btn>
            </v-card-actions>
          </v-card>
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
  },
  computed: {
    getUser () {
      return this.$store.state.user
    },
  },
  watch: {
  
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.scrollToTop()
    if (this.getUser.uid === '') {
        this.view = 0
        this.waitGetUser()
      } else {
        if (this.getUser.accLevel === 10) {
            // this.getNFTs()
          } else {
            this.$router.push('/')
          }
      }
  },
  methods: {
    waitGetUser () {
      setTimeout(() => {
        if (this.getUser.uid === '') {
          this.waitGetUser()
          this.$router.push('/')
        } else {
          if (this.getUser.accLevel === 10) {
            // this.getNFTs()
          } else {
            this.$router.push('/')
          }
        }
      }, 2000);
    },
    getNFTs () {

    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#nfts', 500, { offset: -64 });
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
