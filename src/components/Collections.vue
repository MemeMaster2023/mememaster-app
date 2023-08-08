<template>
  <div id="collections">
    <v-responsive style="background-color: #000;">
      
      <v-img :src="view === 0 ? '/img/home/collections_bg_V16_00' + colIndex + '.webp' : '/img/home/collections_bg_V16_0' + view + '.webp'"
            :max-height="isMobileDevice ? 500 : 400"
            cover
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.4)"
      > 
        <v-card-title v-if="!isMobileDevice && viewCol === 2 && colIndex === 5" style="color: #99c1f1" class="text-h4" >Tim Burton NFTs - Exclusive Rare Edition</v-card-title>
        <v-card-title v-if="isMobileDevice && viewCol === 2  && colIndex === 5" style="color: #99c1f1" class="text-h6" >Tim Burton NFTs - Exclusive Rare Edition</v-card-title>

        <v-card-title v-if="!isMobileDevice && viewCol === 2 && colIndex === 1" style="color: #99c1f1" class="text-h4" >MM GOLD EMAS - Exclusive Rare Edition</v-card-title>
        <v-card-title v-if="isMobileDevice && viewCol === 2  && colIndex === 1" style="color: #99c1f1" class="text-h6" >MM GOLD EMAS - Exclusive Rare Edition</v-card-title>

        <v-card-title v-if="!isMobileDevice && viewCol === 2 && colIndex === 3" style="color: #99c1f1" class="text-h4" >Shiba INU NEONs NFTs - Limited Edition NFTs</v-card-title>
        <v-card-title v-if="isMobileDevice && viewCol === 2  && colIndex === 3" style="color: #99c1f1" class="text-h6" >Shiba INU NEONs NFTs - Limited Edition NFTs</v-card-title>

        <v-card-title v-if="!isMobileDevice && viewCol === 2 && colIndex === 2" style="color: #99c1f1" class="text-h4" >Pepe Frogs NEON - Limited Edition NFTs</v-card-title>
        <v-card-title v-if="isMobileDevice && viewCol === 2  && colIndex === 2" style="color: #99c1f1" class="text-h6" >Pepe Frogs NEON - Limited Edition NFTs</v-card-title>

        <v-card-title v-if="!isMobileDevice && view === 1" :style="view === 1 ? 'color: #e8c5ff' : 'color: #d4a863'" class="text-h4" >Sample NFT Collections</v-card-title>
        <v-card-title v-if="isMobileDevice && view === 1" :style="view === 1 ? 'color: #e8c5ff' : 'color: #d4a863'" class="text-h6" >Sample NFT Collections</v-card-title>

        <v-card-title v-if="!isMobileDevice && view === 2" style="color: #31c46c" class="text-h4" >Early AI Gaming Insights</v-card-title>
        <v-card-title v-if="isMobileDevice && view === 2" style="color: #31c46c" class="text-h6" >Early AI Gaming Insights</v-card-title>

        <v-card-title v-if="!isMobileDevice && view === 3" style="color: #c5d73d" class="text-h4" >Exclusive NFT Collections</v-card-title>
        <v-card-title v-if="isMobileDevice && view === 3" style="color: #c5d73d" class="text-h6" >Exclusive NFT Collections</v-card-title>

      </v-img>

      <v-card theme="dark">

        <!-- <v-tabs
          v-model="tab"
          :color="tab === '1' ? '#e8c5ff' : '#99c1f1'"
          align-tabs="center"
        >
          <v-tab value="1">Women Warriors NFTs</v-tab>
          <v-tab value="2">Tim Burton collection</v-tab>
        </v-tabs> -->

        <v-toolbar v-if="!isMobileDevice"
              color="transparent"
              class="overflow-fix"
            >
            <v-spacer v-if="!drawer"></v-spacer>

            <v-btn  variant="text" color="#99c1f1" @click="openExclusiveCollection(5)">
              Tim Burton NFTs
            </v-btn>

            <v-btn variant="text" color="#99c1f1" @click="openExclusiveCollection(1)">
              MM GOLD EMAS
            </v-btn>

            <v-btn  variant="text" color="#99c1f1" @click="openExclusiveCollection(3)">
              Shiba INU NEONs NFTs
            </v-btn>

            <v-btn  variant="text" color="#99c1f1" @click="openExclusiveCollection(2)">
              Pepe Frogs NEON
            </v-btn>

            <v-btn  variant="text" color="#31c46c" @click="openEarlyGamesInsights()">
              Early Gaming Insights
            </v-btn>

            <v-btn  variant="text" color="#c5d73d" @click="openExclusiveCollection2(-1)">
              More Exclusive NFT Collections
            </v-btn>

            <v-spacer></v-spacer>

       </v-toolbar>

       <v-row v-if="isMobileDevice" class="pt-8">
        <v-col cols="12" md="4" :align="'center'" style="margin-top: -10px;">
          <v-btn  variant="text" color="#99c1f1" @click="openExclusiveCollection(5)">
            Tim Burton
          </v-btn>

          <v-btn variant="text" color="#99c1f1" @click="openExclusiveCollection(1)">
            MM GOLD EMAS
          </v-btn>
          </v-col>

          <v-col cols="12" md="4" :align="'center'" style="margin-top: -10px;">
            <v-btn  variant="text" color="#99c1f1" @click="openExclusiveCollection(3)">
              Shiba INU NEONs
            </v-btn>

            <v-btn  variant="text" color="#99c1f1" @click="openExclusiveCollection(2)">
              Pepe Frogs NEON
            </v-btn>
          </v-col>

          <v-col cols="12" md="4" :align="'center'" style="margin-top: -10px;margin-bottom:16px">
            <v-btn  variant="text" color="#31c46c" @click="openEarlyGamesInsights()">
              Early Gaming Insights
            </v-btn>

            <v-btn  variant="text" color="#c5d73d" @click="openExclusiveCollection2(-1)">
              Exclusive NFTs
            </v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>

          <v-container fluid  v-if="view === 1" class="ma-4">
            <v-row class="ma-4">
              <v-col
                v-for="image in collection_01"
                :key="image"
                class="d-flex child-flex"
                cols="12" md="4"
              >
                <v-img
                  :src="'/img/memes/girl_fighter_01/' + image.name"
                  :lazy-src="'/img/memes/girl_fighter_01/' + image.name"
                  aspect-ratio="1"
                  cover
                  class="bg-grey-lighten-2"
                  style="border-radius: 10px;"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      :align="'center'"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey-lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid v-else-if="view === 2">
            <v-row :class="isMobileDevice ? 'ma-1' : 'ma-4'">
              <v-col cols="12">
                <GamesInsightsFiltered ref="gamesInsightsFiltered"
                                       :isMobileDevice="isMobileDevice">
                </GamesInsightsFiltered>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid v-else-if="view === 3">
            <v-row :class="isMobileDevice ? 'ma-1' : 'ma-4'">
              <v-col cols="12">
                <ExclusiveNFTsFiltered ref="exclusiveNFTs" 
                                       :openCollectionIndex="-1"
                                       :isMobileDevice="isMobileDevice">
                </ExclusiveNFTsFiltered>
              </v-col>
            </v-row>
          </v-container>

         <v-container fluid v-if="viewCol === 2">
            <v-row c:class="isMobileDevice ? 'ma-1' : 'ma-4'">
              <v-col cols="12">
                <ExclusiveNFTsFiltered ref="exclusiveNFTsFiltered" 
                                       :openCollectionIndex="colIndex"
                                       :isMobileDevice="isMobileDevice">
                </ExclusiveNFTsFiltered>
              </v-col>
            </v-row>
          </v-container>



      </v-card>
  
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
import ExclusiveNFTsFiltered from './collections/ExclusiveNFTsFiltered'
import GamesInsightsFiltered from './collections/GamesInsightsFiltered'
export default {
  name: 'Collections',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    tab: 0,
    view: 0,
    viewCol: 2,
    colIndex: -2,
    collection_01: [
      {
        "name": "Girl fighter 1.jpg"
      },
      {
        "name": "Girl fighter 2.jpg"
      },
      {
        "name": "Girl fighter 3.jpg"
      },
      {
        "name": "Girl fighter 4.jpg"
      },
      {
        "name": "Girl fighter 5.jpg"
      },
      {
        "name": "Girl fighter 6.jpg"
      },
      {
        "name": "Girl fighter 8.jpg"
      },
      {
        "name": "Fighter girl.png"
      },
      {
        "name": "Fighter girl 2.png"
      },
      {
        "name": "Princeess warrior COREL.png"
      },
      {
        "name": "Woman warrior Leonardo 3.jpg"
      },
      {
        "name": "Woman warrior Leonardo 4.jpg"
      },
      {
        "name": "Woman warrior Leonardo 5.jpg"
      },
      {
        "name": "Woman warrior Leonardo 7.jpg"
      },
      {
        "name": "Woman warrior Leonardo 8.jpg"
      },
      {
        "name": "Woman warrior Leonardo 9.jpg"
      },
      {
        "name": "Woman warrior Leonardo 10.jpg"
      },
      {
        "name": "Woman warrior Leonardo 13.jpg"
      },
      {
        "name": "Woman warrior Leonardo 14.jpg"
      },
      {
        "name": "Woman warrior Leonardo 15.jpg"
      },
      {
        "name": "Woman warrior Leonardo 16.jpg"
      },
      {
        "name": "Woman warrior Leonardo 19.jpg"
      },
      {
        "name": "Woman warrior Leonardo 20.jpg"
      },
      {
        "name": "Woman warrior Leonardo 21.jpg"
      }
    ]
  }),
  components: {
    ExclusiveNFTsFiltered,
    GamesInsightsFiltered
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
     this.openExclusiveCollection(5)
    },
    openExclusiveCollection (index) {
      this.view = 0
      this.viewCol = 2
      this.colIndex = index
      setTimeout(() => {
        this.$refs.exclusiveNFTsFiltered.openCollectionFromIndex()
      }, 200)
    },
    openExclusiveCollection2 (index) {
      this.viewCol = 0
      this.view = 3
      this.colIndex = index
    },
    openEarlyGamesInsights () {
      this.viewCol = 0
      console.log('openEarlyGamesInsights')
      this.view = 2
    },
    openWomanWarriors () {
      this.viewCol = 0
      this.view = 1
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#collections', 500, { offset: -64 });
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
  .cardTextTitleSmall {
    font-family: 'Saira';
    font-size: 18px;
    font-weight: bold;
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
  .overflow-fix .v-toolbar__content {
    flex-wrap: wrap;
  }
</style>
