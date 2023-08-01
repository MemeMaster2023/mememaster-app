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
        <v-row class="pt-8">
          <v-col cols="12" :align="center">
            <div class="text-h4 text-center" style="margin-left: 20px; margin-top: 80px">Early Gaming Insights</div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" :align="center">
            <div style="text-align: justify;margin-left: 15%;margin-right: 15%;font-size: 1rem;">
              Take a sneak peek at our "Early Gaming Insights" you can use your qualified (they will need to fit that gaming criteria) generated memes and NFTs in the game zones and then sell swap them in our gaming market place or in the general market place and the NFT's even on third party platforms such as Rarible and OpenSea.<br><br>

              You can earn our points in features and then use those points in the marketplaces or redeem them for our EMAS tokens.<br><br>

              This is just a snapshot of the games we are developing and we are in negotiations to include third party game access to our gaming eco system, so mush is going on don't forget to join all of our social media channels so you are kept in the loop...
            </div>
          </v-col>
        </v-row>

        <v-row class="ma-8">

            <v-col
              v-for="(col, index) in collections"
              :key="index"
              class="d-flex child-flex"
              cols="12" md="4"
            >
              <v-card
                min-width="100%"
                max-width="400"
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
            <v-toolbar-title style="font-size: 1.5rem" class="ml-8 text-wrap">{{ selectedCollection.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn
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
    this.scrollToTop()
    this.storageRef = firebase.storage().ref()
    this.loadCollections()
  },
  methods: {
    loadCollections () {
      this.collections = []
      
      // Read user storage folder
      // Create a reference under which you want to list
      var listRef = this.storageRef.child('Game Insights/')
      if (import.meta.env.VITE_APP_ENVIRONMENT === 'production') {
        listRef = this.storageRef.child('GameInsights/')
      }

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
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FBattleship%20game%2FBattleship%20game%206.png?alt=media&token=2131b02b-01d1-4c98-84e3-e37382fec060'
        }
        return obj
      } else if (name === 'Cyber pulse game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FCyber%20pulse%20game%2FCyber%20pulse%20game%206.png?alt=media&token=7ac05d8d-7e89-464f-948e-83a0ddb328dc'
        }
        return obj
      } else if (name === 'Dungeons game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FDungeons%20game%2FDungeons%20and%20Dragons%20game.png?alt=media&token=a43c2157-f19d-42a8-a961-4794a93876c1'
        }
        return obj
      } else if (name === 'Galactic game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FGalactic%20game%2FGalactica%20game%206.png?alt=media&token=68e0deb0-fc68-4cc7-b474-9a74528027da'
        }
        return obj
      } else if (name === 'WAR game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FWAR%20game%2FWar%20games%201.png?alt=media&token=9148cd25-dd09-4868-978f-23656b07dbb7'
        }
        return obj
      } else if (name === 'Aircraft war game') {
        obj = {
          subtitle: '',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FAircraft%20war%20game%2FAircraft%20war%20game%203.jpeg?alt=media&token=775771dd-6f9d-42be-bf60-1f2ffd4addba'
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
        firstScrollTo('#nftcollections', 500, { offset: -64 });
      }, 200);
    }
  }
}
</script>

<style lang="scss">
  
</style>
