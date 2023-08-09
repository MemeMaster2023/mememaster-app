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
            <div class="text-h4 text-center" style="margin-left: 20px; margin-top: 80px">Early AI Gaming Insights</div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" :align="center">
            <div style="text-align: justify;margin-left: 15%;margin-right: 15%;font-size: 1rem;">
              Take a sneak peek at our "Early AI Gaming Insights" you can use your qualified (they will need to fit that gaming criteria) generated memes and NFTs in the game zones and then sell swap them in our gaming market place or in the general market place and the NFT's even on third party platforms such as Rarible and OpenSea.<br><br>

              Players can use Meme Master’s EMAS points to gain ‘more’ EMAS points for various actions throughout the games and these can later be converted to real EMAS tokens, the higher your tier the more free points you get as bonuses when you first buy the starter EMAS points with EMAS tokens and the higher your rewards when you win.<br><br>

              Extra ammo can be purchased with points and players may play other users on the platform and enter tournaments for EMAS token prizes.<br><br>

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

                <v-card-actions class="card-actions" style="width:100%">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="deep-purple-lighten-2"
                    variant="text"
                    @click.stop="openCollection(col, index)"
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

            <div style="font-size: 1rem;margin-left:32px;max-width:1000px;text-align: justify;" 
                 class="text-wrap">{{ lookupImageAndSubtitle(selectedCollection.name).description }}
            </div>

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
          description: "A turn-based strategy game where the objective is to sink your opponent's battleship before they sink yours. Players take turns placing their ships on the grid, which is hidden from the opponent's view. On each turn, players must guess the location of their opponent's ships using limited information. If the player guesses correctly, the opponent's ship sinks and marks a point for the successful player. The goal is to sink all the opposing ships before they can sink yours. There will be different levels of difficulty and various terrain options that give the players more strategic ways to win.",
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FBattleship%20game%2FBattleship%20game%206.png?alt=media&token=2131b02b-01d1-4c98-84e3-e37382fec060'
        }
        return obj
      } else if (name === 'Cyber pulse game') {
        obj = {
          subtitle: '',
          description: "Players will take control of cyber crafts to engage in high-octane battles. Cyber crafts are powered by advanced weaponry and armor that can be customized and upgraded throughout the game. These advanced ships are capable of engaging in intense combat against enemy cyber crafts or defending friendly vessels. The goal of the game is to build up a strong fleet of cyber crafts to conquer territories and become the most powerful in the sector. Each cyber craft has its own unique strengths and weaknesses, so the player must choose the right strategies and equipment to emerge victorious. Through strategic planning and tactical maneuvering, the game offers a thrilling and action-packed experience that keeps players engaged until the end.",
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FCyber%20pulse%20game%2FCyber%20pulse%20game%206.png?alt=media&token=7ac05d8d-7e89-464f-948e-83a0ddb328dc'
        }
        return obj
      } else if (name === 'Dungeons game') {
        obj = {
          subtitle: '',
          description: "Dungeons game is a type of role-playing game where the player takes on the role of a dungeon master, controlling the layout and environment of the game. They use their skills to create interesting dungeons for other players to explore, setting up traps and monsters for them to encounter. The main goal is to protect your own dungeon while trying to take control of someone else’s. You can customize the layout of your own dungeon, adding in items to make it more difficult to traverse. As the dungeon master, you can also control the various monsters that are inside the dungeon, moving them around to create different challenges for the players. Different creatures will have different strengths and weaknesses, so it's important to plan ahead and find the right balance.",
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FDungeons%20game%2FDungeons%20and%20Dragons%20game.png?alt=media&token=a43c2157-f19d-42a8-a961-4794a93876c1'
        }
        return obj
      } else if (name === 'Galactic game') {
        obj = {
          subtitle: '',
          description: "In this galactic game, each player controls a fleet of starships with different abilities and strengths. Each player will use their fleet to challenge the other players in battles of strategy and tactics as they compete to win control of the galaxies. Players must build fleets of ships while managing resources and reaching objectives in order to win the game. The game progresses over multiple scenarios in which players attack and defend planets, battle enemy fleets, trade resources, and employ special strategies in order to gain an advantage over their opponents. Players can also enter into alliances with other players and build powerful fleets from those agreements. The ultimate goal is to become the ruler of the galaxy by taking control of its capital planet. Victory can only be achieved through careful planning, resource management, and the takeover of apposing star fleets.",
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-app.appspot.com/o/GameInsights%2FGalactic%20game%2FGalactica%20game%206.png?alt=media&token=68e0deb0-fc68-4cc7-b474-9a74528027da'
        }
        return obj
      } else if (name === 'Tank game') {
        obj = {
          subtitle: '',
          description: "A strategy and shooting game about two teams of tanks battling to be the last one standing. The battlefield is divided into a grid and each team's tanks are randomly placed when the game starts. The objective of the game is to defend your own tanks and destroy the tanks of the opposing team. At the start of each turn, players may choose to move their tanks on the grid on either the X or the Y axes, or fire their weapons at an enemy tank. Tanks come with various levels of defense which can make them harder to hit. When firing weapons, players must also consider wind direction and the angle of their aim in order to maximize the effect of their shot.",
          img: 'https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/Game%20Insights%2FTank%20game%2FWar%20games%204.png?alt=media&token=adf9c1a2-3e75-4ea4-8b59-a58b4cd55cc7'
        }
        return obj
      } else if (name === 'Aircraft war game') {
        obj = {
          subtitle: '',
          description: "A real-time strategy game, featuring fast-paced and tactical scenarios as players command squadrons of aircraft in aerial combat. Players will have to build their air wings, develop their battle strategies, and attack enemy forces. They will need to acquire better aircraft and new weapons by giving up their kills or buying more points, as well as researching technologies which can give them an advantage in combat. The game will have single player campaigns, allowing players to progress through a storyline, as well as intense multiplayer skirmishes to test their aerial prowess against human opponents.",
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
