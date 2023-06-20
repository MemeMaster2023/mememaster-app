<template>
  <div id="nftcollections">
    <v-responsive style="background-color: #2b2b2b;" v-if="openCollectionIndex === -1">
      
      <!-- <v-img :src="'/img/home/collections_bg_01.webp'"
            :max-height="isMobileDevice ? 500 : 400"
            cover
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.4)"
      > 
        <v-card-title v-if="!isMobileDevice" :style="tab === '1' ? 'color: #e8c5ff' : 'color: #d4a863'" class="text-h4" >Sample NFT Collections</v-card-title>
        <v-card-title v-if="isMobileDevice" :style="tab === '1' ? 'color: #e8c5ff' : 'color: #d4a863'" class="text-h5" >Sample NFT Collections</v-card-title>
      </v-img> -->

      <v-card theme="dark" v-if="openCollectionIndex === -1">
        <v-row class="pt-8">
          <v-col cols="12" :align="center">
            <div class="text-h4 text-center" style="margin-left: 20px;">Exclusive NFT Collections</div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" :align="center">
            <div :style="isMobileDevice ? 'text-align: justify;margin-left: 5%;margin-right: 5%;font-size: 1rem;' : 'text-align: justify;margin-left: 15%;margin-right: 15%;font-size: 1rem;'">
              These "Exclusive NFT Collections" will be part of the limited airdrops made to holders of the required quantity our EMAS tokens in their wallets.<br><br>

              These will act as VIP passes and allow holders a host of advantages such as early access to new features like as our music integration and our games 
              but also gain early and higher points allocation to our points eco system, these points will be used in much of our platform and can be redeemed (swapped) 
              for further access, items, game access, loading points, music downloads after mixing with our groundbreaking in built DJ, and the NFTs can also be traded on third party platforms such as Rarible and OpenSea or swapped for our EMAS tokens.<br><br>

              All off this can be integrated with memes and NFTs that can also be used in our eco system and so, so, so much more... Join our social media channels so you are kept updated.
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
                @click="openCollection(index)"
              >
                <v-img
                  :src="lookupImageAndSubtitle(col.name).img"
                  aspect-ratio="1"
                  cover
                ></v-img>

                <v-card-title>
                  {{ col.name }}
                </v-card-title>

                <v-card-subtitle class="text-wrap">
                  <div>{{ lookupImageAndSubtitle(col.name).subtitle }}</div>
                </v-card-subtitle>

                <v-card-actions class="card-actions" style="width:100%">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="deep-purple-lighten-2"
                    variant="text"
                    @click="openCollection(index)"
                  >
                    OPEN
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>

              </v-card>
            </v-col>
          
        </v-row>

      </v-card>
      
      <v-dialog v-if="openCollectionIndex === -1"
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
            <v-col>
              <v-toolbar-title :style="isMobileDevice ? 'font-size: 1rem' : 'font-size: 1.5rem;margin-left:16px'" class="text-wrap">{{ lookupName() }}</v-toolbar-title>
              <v-toolbar-title v-if="!isMobileDevice" style="font-size: 1rem;margin-left:16px" class="text-wrap">{{ 'The NFTs below are samples from this collection. More will be added.' }}</v-toolbar-title>
            </v-col>
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

            <v-row :class="isMobileDevice ? 'ma-2' : 'ma-4'">
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

    <v-card theme="dark" v-else>
      <v-container fluid class="pa-0">

        <v-toolbar
          color="transparent"
          height="50"
        >
        <p style="font-size: 1.1rem" class="ml-8">{{ 'The NFTs below are samples from this collection. More will be added.' }}</p>
        </v-toolbar>

        <v-row :class="isMobileDevice ? 'ma-2' : 'ma-4'">
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
    windowHeight: Number,
    openCollectionIndex: Number
  },
  data: () => ({
    loading: false,
    collections: [],
    collectionImagesArr: [],
    selectedCollection: {
      name: ''
    },
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
      var listRef = this.storageRef.child('Exclusive Collections/')

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
          if (this.openCollectionIndex === -1) return
          this.openCollection(this.openCollectionIndex)
          // this.collections.reverse()
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
     
    },
    lookupImageAndSubtitle (name) {
      let obj = {}
      if (name === 'Andy Warhol - Limited Edition NFTs') {
        obj = {
          subtitle: 'Artist and leader of the Pop Art movement who created unique NFTs with limited editions available.',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Exclusive%20Collections%2FAndy%20Warhol%20-%20Limited%20Edition%20NFTs%2FAndy%20warwhol%20style%206.png?alt=media&token=02dc2856-8a3e-489c-830d-97dd376df2ea&_gl=1*1hb4df8*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjE4NjI5Ny40MS4xLjE2ODYxODgwNzIuMC4wLjA.'
        }
        return obj
      } else if (name === 'Pepe Frogs NEON - Limited Edition NFTs') {
        obj = {
          subtitle: 'Collectible, one-of-a-kind digital art cards featuring the iconic Pepe character.',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Exclusive%20Collections%2FPepe%20Frogs%20NEON%20-%20Limited%20Edition%20NFTs%2FPEPE%20NEON%20FROG%202.png?alt=media&token=a5f33630-846b-4fd9-bcd1-a865f7f7b57c&_gl=1*xa5hx6*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjE4NjI5Ny40MS4xLjE2ODYxODg0NTIuMC4wLjA.'
        }
        return obj
      } else if (name === 'Shiba INU NEONs NFTs - Limited Edition NFTs') {
        obj = {
          subtitle: 'Unique Non-Fungible Tokens featuring Shiba Inu themed artwork, available in a limited quantity.',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Exclusive%20Collections%2FShiba%20INU%20NEONs%20NFTs%20-%20Limited%20Edition%20NFTs%2FNeon%20shiba%2021.png?alt=media&token=5307eec4-5c93-4c80-b0a1-f78a93670824&_gl=1*1g2xboi*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjE4NjI5Ny40MS4xLjE2ODYxODg5NjcuMC4wLjA.'
        }
        return obj
      } else if (name === 'Shiba Pixels NFTs - Exclusive Rare Edition') {
        obj = {
          subtitle: 'Exclusive rare digital artworks, limited in supply and value, using Shiba Inu characters. Unlocks high access to games!',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Exclusive%20Collections%2FShiba%20Pixels%20NFTs%20-%20Exclusive%20Rare%20Edition%2FShiba%20Pixel%2015.png?alt=media&token=366061b0-500c-4874-b29f-b1ec44004e46&_gl=1*1yj8uen*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjE5Nzg2OS40Mi4xLjE2ODYxOTkxNzYuMC4wLjA.'
        }
        return obj
      } else if (name === 'Tim Burton collection - Exclusive Rare Edition') {
        obj = {
          subtitle: 'A rare set of Tim Burton creations, including rare editions and special features. Unlocks high access to games!',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Exclusive%20Collections%2FTim%20Burton%20collection%20-%20Exclusive%20Rare%20Edition%2FTim%20Mad%20Hatter%202.png?alt=media&token=dad2d83b-610f-40fc-a72c-5bf96fb7cebb&_gl=1*6r9uvc*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjE5Nzg2OS40Mi4xLjE2ODYxOTk0NzQuMC4wLjA.'
        }
        return obj
      } else if (name === 'Van Gogh style - Limited Edition NFTs') {
        obj = {
          subtitle: 'Art pieces created in the style of Vincent Van Gogh, digitally crafted as non-fungible tokens with limited availability.',
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Exclusive%20Collections%2FVan%20Gogh%20style%20-%20Limited%20Edition%20NFTs%2Fpuppets%204.png?alt=media&token=d7803af9-d6f4-4260-9736-4a7f6650b9af&_gl=1*yl1ufc*_ga*Njc3NjE5NjEwLjE2ODUxNTUxODY.*_ga_CW55HF8NVT*MTY4NjE5Nzg2OS40Mi4xLjE2ODYxOTk5MDMuMC4wLjA.'
        }
        return obj
      }

      
    },
    openCollectionFromIndex () {
      console.log('openCollectionIndex')
      console.log(this.openCollectionIndex)
      this.openCollection(this.openCollectionIndex)
    },
    openCollection (index) {
      console.log(index)
      console.log(this.collections)
      let item =  this.collections[index]
      console.log(item)
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
    lookupName () {
      console.log(typeof this.selectedCollection)
      if (typeof this.selectedCollection === 'undefined') {
        return ''
      } else {
        return this.selectedCollection.name
      }
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
