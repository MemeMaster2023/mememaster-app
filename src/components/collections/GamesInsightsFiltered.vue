<template>
  <div id="nftcollections">
    <v-responsive style="background-color: #2b2b2b;">
      
      <!-- <v-img :src="'/img/home/collections_bg_01.webp'"
            :max-height="isMobileDevice ? 500 : 400"
            cover
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.4)"
      > 
        <v-card-title v-if="!isMobileDevice" :style="tab === '1' ? 'color: #e8c5ff' : 'color: #d4a863'" class="text-h4" >Sample NFT Collections</v-card-title>
        <v-card-title v-if="isMobileDevice" :style="tab === '1' ? 'color: #e8c5ff' : 'color: #d4a863'" class="text-h5" >Sample NFT Collections</v-card-title>
      </v-img> -->

      <v-card theme="dark">
        <v-row class="pt-4">
          <v-col cols="12" :align="center">
            <div class="text-h4 text-center" style="margin-left: 20px;">Early Gaming Insights</div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" :align="center">
            <div :style="isMobileDevice ? 'text-align: justify;margin-left: 5%;margin-right: 5%;font-size: 1rem;' : 'text-align: justify;margin-left: 15%;margin-right: 15%;font-size: 1rem;'">
              Take a sneak peek at our "Early Gaming Insights" you can use your qualified (they will need to fit that gaming criteria) generated memes and NFTs in the game zones and then sell swap them in our gaming market place or in the general market place and the NFT's even on third party platforms such as Rarible and OpenSea.<br><br>

              You can earn our points in features and then use those points in the marketplaces or redeem them for our EMAS tokens.<br><br>

              This is just a snapshot of the games we are developing and we are in negotiations to include third party game access to our gaming eco system, so mush is going on don't forget to join all of our social media channels so you are kept in the loop...
            </div>
          </v-col>
        </v-row>

        <v-row class="ma-4">

            <v-col
              v-for="(col, index) in collections"
              :key="index"
              class="d-flex child-flex"
              cols="12" md="4"
            >
              <v-card
                class="mx-auto"
                max-width="400"
                min-width="100%"
                @click="openCollection(col, index)"
              >
                <v-img
                  :src="lookupImageAndSubtitle(col.name).img"
                  aspect-ratio="1"
                  cover
                ></v-img>

                <v-card-title>
                  {{ col.name }}
                </v-card-title>

                <!-- <v-card-subtitle class="text-wrap">
                  <div>{{ lookupImageAndSubtitle(col.name).subtitle }}</div>
                </v-card-subtitle> -->

                <v-card-actions class="card-actions" style="width:100%">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="deep-purple-lighten-2"
                    variant="text"
                    @click="openCollection(col, index)"
                  >
                    OPEN
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>

              </v-card>
            </v-col>
          
        </v-row>

      </v-card>
      
      <v-dialog
          v-model="collectionDialog"
          fullscreen
        >
        <v-card theme="dark">
          <v-container fluid>

            <v-toolbar
              color="transparent"
            >
            <v-btn v-if="isMobileDevice"
              class="mr-2"
              variant="outlined"
              size="small"
              icon="mdi-arrow-left-bold"
              @click="collectionDialog = false"
            >
            </v-btn>
            <v-toolbar-title :style="isMobileDevice ? 'font-size: 1rem' : 'font-size: 1.5rem;margin-left:32px'" class="text-wrap">{{ selectedCollection.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn v-if="!isMobileDevice"
                class="mr-8"
                variant="outlined"
                size="small"
                icon="mdi-close"
                @click="collectionDialog = false"
              >
              </v-btn>
            </v-toolbar>

            <v-row class="ma-4">
              <v-col
                v-for="image in collectionImagesArr"
                :key="image"
                class="d-flex child-flex"
                cols="12" md="4"
              >
                <v-img
                  :src="image.url"
                  :lazy-src="image.url"
                  aspect-ratio="1"
                  cover
                  class="bg-grey-lighten-2"
                  style="border-radius: 10px;"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      :align="'center'"
                    >
                      <v-col cols="12" :align="'center'">
                        <v-progress-circular
                          indeterminate
                          color="grey-lighten-5"
                        ></v-progress-circular>
                      </v-col>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
  
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase/app'
import 'firebase/storage'
import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'Exclusive NFTs',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number
  },
  data: () => ({
    loading: false,
    collections: [],
    collectionImagesArr: [],
    selectedCollection: {},
    collectionDialog: false,
    storageRef: null
  }),
  components: {
  
  },
  computed: {

  },
  watch: {
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    // this.scrollToTop()
    this.storageRef = firebase.storage().ref()
    this.loadCollections()
  },
  methods: {
    loadCollections () {
      this.collections = []
      
      // Read user storage folder
      // Create a reference under which you want to list
      var listRef = this.storageRef.child('Game Insights//')

      // Find all the prefixes and items.
      // var firstPage = await listRef.list({ maxResults: 100});
      // console.log(firstPage);
      listRef.listAll()
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
            console.log(folderRef)
            var obj = {
              name: folderRef.name,
              path: folderRef.fullPath,
            }
            this.collections.push(obj)
            /* this.draftsArr.sort(function (a, b) {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(a.name) - new Date(b.name);
            }); */
  
          });
          console.log(this.collections)
          // this.collections.reverse()
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
     
    },
    lookupImageAndSubtitle (name) {
      let obj = {}
      if (name === 'Battleship game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Game%20Insights%2FBattleship%20game%2FBattleship%20game%206.png?alt=media&token=edf6e9c0-0c42-4fa1-8eec-a3a4ee1fc7d8&_gl=1*j8itiy*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjIwODQ1Ny40My4xLjE2ODYyMDg3OTAuMC4wLjA.'
        }
        return obj
      } else if (name === 'Cyber pulse game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Game%20Insights%2FCyber%20pulse%20game%2FCyber%20pulse%20game%206.png?alt=media&token=de02acaf-addc-43f5-9d9a-ae5aa391cdc8&_gl=1*ug252s*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjIwODQ1Ny40My4xLjE2ODYyMDkwNjcuMC4wLjA.'
        }
        return obj
      } else if (name === 'Dungeons game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Game%20Insights%2FDungeons%20game%2FDungeons%20and%20Dragons%20game.png?alt=media&token=6b35e486-9dc4-4c9d-8f8e-8f6a707a1e80&_gl=1*1uy4t79*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjIwODQ1Ny40My4xLjE2ODYyMDkxNTguMC4wLjA.'
        }
        return obj
      } else if (name === 'Galactic game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Game%20Insights%2FGalactic%20game%2FGalactica%20game%206.png?alt=media&token=911a6b43-36c2-4a2b-8a76-dc85186c2f2a&_gl=1*16yhfph*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjIwODQ1Ny40My4xLjE2ODYyMDkyNzYuMC4wLjA.'
        }
        return obj
      } else if (name === 'WAR game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Game%20Insights%2FWAR%20game%2FWar%20games%201.png?alt=media&token=ab2dd340-2c88-4c97-bde6-b07704edb983&_gl=1*s0upk7*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjIwODQ1Ny40My4xLjE2ODYyMDkzMzAuMC4wLjA.'
        }
        return obj
      } else if (name === 'Aircraft war game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Game%20Insights%2FAircraft%20war%20game%2FAircraft%20war%20game%203.jpeg?alt=media&token=7baff989-eff1-4ea9-b6ce-1633d04bf1b8'
        }
        return obj
      } 
    },
    openCollection (item, index) {
      this.selectedCollection = item
      this.collectionImagesArr = []
      this.collectionDialog = true
      /* if (this.draftsImagesArr.length > 0 ) {
        console.log('No reload needed')
        return
      } */ 
      var listRef = this.storageRef.child(item.path);
      // Find all the prefixes and items.
      listRef.listAll().then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          var imgRef = this.storageRef.child(itemRef.fullPath)
          imgRef.getMetadata().then((metadata) => {
            // Metadata now contains the metadata for 'images/forest.jpg'
            imgRef.getDownloadURL().then((url) => {
              var img = {
                url: url,
                metadata: metadata
              }
              this.collectionImagesArr.push(img)
            }).catch((error) => {
              // Uh-oh, an error occurred!
            })
          }).catch((error) => {
            // Uh-oh, an error occurred!
          })
        })
        console.log(this.collectionImagesArr)
        this.collections[index].files = this.draftsImagesArr
      }).catch((error) => {
        // Uh-oh, an error occurred!
      })

    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#nftcollections', 500, { offset: -100 });
      }, 200);
    }
  }
}
</script>

<style lang="scss">
  
</style>
