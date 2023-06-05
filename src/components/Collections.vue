<template>
  <div id="collections">
    <v-responsive style="background-color: #000;">
      
      <v-img :src="'/img/home/collections_bg_0' + tab + '.webp'"
            :max-height="isMobileDevice ? 500 : 400"
            cover
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.4)"
      > 
        <v-card-title v-if="!isMobileDevice" :style="tab === '1' ? 'color: #e8c5ff' : 'color: #d4a863'" class="text-h4" >Sample NFT Collections</v-card-title>
        <v-card-title v-if="isMobileDevice" :style="tab === '1' ? 'color: #e8c5ff' : 'color: #d4a863'" class="text-h5" >Sample NFT Collections</v-card-title>
      </v-img>

      <v-card theme="dark">

        <v-tabs
          v-model="tab"
          :color="tab === '1' ? '#e8c5ff' : '#d4a863'"
          align-tabs="center"
        >
          <v-tab value="1">Girl fighters</v-tab>
          <v-tab value="2">Monsters & Wizzards</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="1"
          >
            <v-container fluid>
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
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
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
          </v-window-item>

          <v-window-item value="2"
          >
            <v-container fluid>
              <v-row class="ma-4">
                <v-col
                  v-for="image in collection_02"
                  :key="image"
                  class="d-flex child-flex"
                  cols="12" md="4"
                >
                  <v-img
                    :src="'/img/memes/monsters_wizzards/' + image.name"
                    :lazy-src="'/img/memes/monsters_wizzards/' + image.name"
                    aspect-ratio="1"
                    cover
                    class="bg-grey-lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
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
          </v-window-item>

        </v-window>
      </v-card>
  
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'Collections',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number
  },
  data: () => ({
    loading: false,
    tab: 0,
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
        "name": "Master 1.png"
      },
      {
        "name": "Master 10.jpg"
      },
      {
        "name": "Master 11.jpg"
      },
      {
        "name": "Master 12.jpg"
      },
      {
        "name": "Master 13.jpg"
      },
      {
        "name": "Master 2.png"
      },
      {
        "name": "Master 3.png"
      },
      {
        "name": "Master 4.png"
      },
      {
        "name": "Master 5.jpg"
      },
      {
        "name": "Master 6.jpg"
      },
      {
        "name": "Master 7.jpg"
      },
      {
        "name": "Master 8.jpg"
      },
      {
        "name": "Master 9.jpg"
      },
      {
        "name": "Wizard warlord 1.jpg"
      },
      {
        "name": "Wizard warlord 2.jpg"
      },
      {
        "name": "Wizard warlord 3.jpg"
      },
      {
        "name": "Wizard warlord 4.jpg"
      },
      {
        "name": "Wizard warlord 5.jpg"
      },
      {
        "name": "Wizard warlord 6.jpg"
      },
      {
        "name": "Wizard warlord 7.jpg"
      },
      {
        "name": "a fantasy cartoon st.jpg"
      }
    ],
    collection_02: [
      {
        "name": "CAPTION Deal with it.png"
      },
      {
        "name": "Dragon 1.png"
      },
      {
        "name": "Dragon danger 1.png"
      },
      {
        "name": "Dragons with caption.png"
      },
      {
        "name": "Dragons.png"
      },
      {
        "name": "Frog and Jar.png"
      },
      {
        "name": "Group of spell makers.png"
      },
      {
        "name": "Lion warrior.png"
      },
      {
        "name": "Master challanger.png"
      },
      {
        "name": "Master meme (1).png"
      },
      {
        "name": "Master meme.png"
      },
      {
        "name": "Monster MM.png"
      },
      {
        "name": "Princess warrior.png"
      },
      {
        "name": "Snake warrior.png"
      },
      {
        "name": "Wait, it's Monday already.png"
      },
      {
        "name": "Warrior 1.png"
      },
      {
        "name": "Wizard and children.png"
      },
      {
        "name": "Wizards talking with caption.png"
      },
      {
        "name": "Woman warrior 1.png"
      },
      {
        "name": "Woman warrior 2.png"
      }
    ]
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
</style>
