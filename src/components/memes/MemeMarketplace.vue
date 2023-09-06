<template>
  <div id="mememarketplace">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 1">

       <v-row :class="isMobileDevice ? 'mt-12 ml-1 mr-1' : 'mt-12'" :align="center">
        <v-col cols="12" md="1" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="10" :align="center">
          <div class="text-h4 text-center ma-2">Meme Marketplace</div>
          <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
            Welcome to our Meme Marketplace, the ultimate hub for meme enthusiasts, creators, and collectors. Dive into a world of laughter, wit, and viral sensations as you explore our curated collection of hilarious and iconic memes.
            <v-btn size="small" variant="text" @click="readMore = !readMore">Read more...</v-btn>
            <br><br>

            <div v-if="readMore">
              Discover a wide range of meme formats, templates, and viral sensations that have taken the internet by storm. From classic reaction images to trending memes, our marketplace showcases the best and most entertaining content from across the meme-sphere.<br><br>

              As a creator, our Meme Marketplace provides you with a platform to showcase your meme-making skills and gain recognition. Upload your original creations, share your unique sense of humor with the world, and even earn rewards for your viral masterpieces.<br><br>

              For collectors, our marketplace offers a chance to own and trade rare and sought-after memes. Build your meme collection, unlock limited-edition memes, and connect with fellow meme aficionados. With a transparent and secure blockchain-based system, each meme comes with a verified and immutable ownership record.
            </div>
          </div>

          <!-- ######################## Meme Marketplace Component ######################## -->

          <v-row v-if="loadingData" style="width:100%" class="ma-4"> 

            <v-col cols="12" md="12" :align="'center'">
              <v-progress-circular
                    indeterminate
                    color="deep-purple-lighten-2"
                    size="50"
              ></v-progress-circular>
              <div style="color:#9575CD;font-size:1.2rem">Loading the memes...</div>
            </v-col>

          </v-row>

          <div class="row" v-else> 

            <div class="column">
              <template v-for="(meme, index) in getPublicMemes">
                <v-img v-if="index < memeCount-1" class="mb-4"
                       style="width:100%;border-radius: 10px;"
                       :src="meme.url" 
                       :lazy-src="meme.url"
                       :class="meme.show ? 'bg-grey-darken-4' : ''"
                       @mouseover="meme.show = true"
                       @mouseleave="meme.show = false"
                       @click="selectImage(index)"
                  >

                  <v-toolbar color="bg-grey-darken-4" style="opacity:0.9" v-show="meme.show">

                    <v-tooltip :text="'See More from ' + meme?.username" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn @click.stop="moreInfoMeme(index)" v-bind="props" style="text-transform: none !important;font-weight: bold;" color="yellow">
                          <v-icon size="large" style="margin-right:5px;margin-left:-4px;">mdi-lightbulb-on-outline</v-icon>
                          <div :style="isMobileDevice ? 'font-size:0.7rem' : 'font-size:0.9rem'">{{ drawer ? '' : 'Created' }} By: {{  checkNameLength(meme?.username) }}</div>
                        </v-btn>
                      </template>
                    </v-tooltip>

                    <v-spacer></v-spacer>

                    <v-tooltip :text="checkLike(meme.id) ? 'You Liked this Meme' : 'Click to Like'" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn icon @click.stop="likeThisMeme(meme)" v-bind="props" color="yellow">
                          <v-icon :color="checkLike(meme.id) ? 'pink' : ''">{{ checkLike(meme.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>

                    <v-tooltip text="Meme Details" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn icon @click.stop="memeDetailsClicked(meme)" v-bind="props" color="yellow">
                          <v-icon>mdi-details</v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>

                  </v-toolbar>
                </v-img>
              </template>
            </div>

            <div class="column">
              <template v-for="(meme, index) in getPublicMemes">
                <v-img v-if="index >= memeCount-1 && index < (memeCount*2)-1" class="mb-4"
                       style="width:100%;border-radius: 10px;"
                       :src="meme.url" 
                       :lazy-src="meme.url"
                       :class="meme.show ? 'bg-grey-darken-4' : ''"
                       @mouseover="meme.show = true"
                       @mouseleave="meme.show = false"
                       @click="selectImage(index)"
                  >

                  <v-toolbar color="bg-grey-darken-4" style="opacity:0.9" v-show="meme.show">

                    <v-tooltip :text="'See More from ' + meme?.username" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn @click.stop="moreInfoMeme(index)" v-bind="props" style="text-transform: none !important;font-weight: bold;" color="yellow">
                          <v-icon size="large" style="margin-right:5px;margin-left:-4px;">mdi-lightbulb-on-outline</v-icon>
                          <div :style="isMobileDevice ? 'font-size:0.7rem' : 'font-size:0.9rem'">{{ drawer ? '' : 'Created' }} By: {{  checkNameLength(meme?.username) }}</div>
                        </v-btn>
                      </template>
                    </v-tooltip>

                    <v-spacer></v-spacer>

                    <v-tooltip :text="checkLike(meme.id) ? 'You Liked this Meme' : 'Click to Like'" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn icon @click.stop="likeThisMeme(meme)" v-bind="props" color="yellow">
                          <v-icon :color="checkLike(meme.id) ? 'pink' : ''">{{ checkLike(meme.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>

                    <v-tooltip text="More Info" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn icon @click.stop="memeDetailsClicked(meme)" v-bind="props" color="yellow">
                          <v-icon>mdi-details</v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>

                  </v-toolbar>
                </v-img>
              </template>
            </div>

            <div class="column">
               <template v-for="(meme, index) in getPublicMemes">
                <v-img v-if="index >= (memeCount*2)-1" class="mb-4"
                       style="width:100%;border-radius: 10px;"
                       :src="meme.url" 
                       :lazy-src="meme.url"
                       :class="meme.show ? 'bg-grey-darken-4' : ''"
                       @mouseover="meme.show = true"
                       @mouseleave="meme.show = false"
                       @click="selectImage(index)"
                  >

                  <v-toolbar color="bg-grey-darken-4" style="opacity:0.9" v-show="meme.show">

                    <v-tooltip :text="'See More from ' + meme?.username" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn @click.stop="moreInfoMeme(index)" v-bind="props" style="text-transform: none !important;font-weight: bold;" color="yellow">
                          <v-icon size="large" style="margin-right:5px;margin-left:-4px;">mdi-lightbulb-on-outline</v-icon>
                          <div :style="isMobileDevice ? 'font-size:0.7rem' : 'font-size:0.9rem'">{{ drawer ? '' : 'Created' }} By: {{  checkNameLength(meme?.username) }}</div>
                        </v-btn>
                      </template>
                    </v-tooltip>

                    <v-spacer></v-spacer>

                    <v-tooltip :text="checkLike(meme.id) ? 'You Liked this Meme' : 'Click to Like'" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn icon @click.stop="likeThisMeme(meme)" v-bind="props" color="yellow">
                          <v-icon :color="checkLike(meme.id) ? 'pink' : ''">{{ checkLike(meme.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>

                    <v-tooltip text="More Info" location="top">
                      <template v-slot:activator="{ props }" >
                        <v-btn icon @click.stop="memeDetailsClicked(meme)" v-bind="props" color="yellow">
                          <v-icon>mdi-details</v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>

                  </v-toolbar>
                </v-img>
              </template>
            </div>
              
          </div>

          <v-alert
            class="mt-8 mb-16"
            color="deep-purple-darken-4"
            theme="dark"
            icon="mdi-code-braces"
          >
            <p style="font-size: 1.3rem;margin-top: -5px;">The Meme Marketplace is still under development.<br>Stay tuned for information about more releases.</p>
          </v-alert>                                
           </v-col>
            <v-col cols="12" md="1" :align="center" v-if="!isMobileDevice">
        </v-col>
       </v-row>

      </v-card>

    <!-- ########################################################################### -->
    <!-- #################################  DIALOGS ################################ -->
    <!-- ########################################################################### -->

     <!-- #########################  MEME DETAILS DIALOG #########################-->
     <v-dialog
      v-model="memeDetailsDialog"
      :fullscreen="isMobileDevice"
      transition="dialog-bottom-transition"
      max-width="1000"
      persistent
    >
        <v-card theme="dark">
          <v-toolbar
            color="#241d43"
            class="text-white"
          >
          <v-btn
            icon
            @click="memeDetailsDialog = false"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
          <div class="text-h6">{{ 'Details for ' + selectedMeme.name }}</div>
          <v-spacer></v-spacer>
           <v-btn
              icon
              color="white"
              @click="memeDetailsDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
              <v-row>
                <v-col cols="12" md="6" :class="isMobileDevice ? 'pa-0' : ''">
                  <v-img
                       style="width:100%;border-radius: 10px;"
                       :src="selectedMeme.url" 
                       :lazy-src="selectedMeme.url"
                  ></v-img>
                </v-col>

                <v-col cols="12" md="6" :class="isMobileDevice ? 'pt-4 pa-0' : ''">

                  <v-card color="#323232"
                          :class="isMobileDevice ? 'pa-1' : 'pa-4'"
                          min-height="100%"
                          max-height="100%"
                  >
                    <v-card-text style="height:250px" :class="isMobileDevice ? 'pa-1' : 'pa-4'">
                      <div class="text-h4">{{ selectedMeme.name }}</div>
                      <div class="text-h6 mt-2"><v-icon color="grey">mdi-calendar-month</v-icon> {{ makeDate(selectedMeme.created) }}</div>
                      <div class="text-h6">
                          <v-icon v-if="selectedMeme.gender === 0" color="grey">mdi-account</v-icon> 
                          <v-icon v-else-if="selectedMeme.gender === 1" color="blue">mdi-face-man</v-icon> 
                          <v-icon v-else-if="selectedMeme.gender === 2" color="pink">mdi-face-woman</v-icon> 
                          {{ selectedMeme?.username }}
                      </div>
                    </v-card-text>

                    <v-card-actions class="card-actions" 
                                    style="margin-right:5px;margin-left:-5px;margin-bottom:10px;width:95%;position: absolute;bottom: 0;background-color: #424242;border-radius:5px">
                      <v-spacer></v-spacer>
                      <div>
                        <v-icon>mdi-eye-outline</v-icon> 
                        {{ selectedMeme.views }} View(s)
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <v-tooltip :text="checkLike(selectedMeme.id) ? 'You Liked this Meme' : 'Click to Like'" location="top">
                          <template v-slot:activator="{ props }" >
                            <v-icon @click.stop="likeThisMeme(selectedMeme)" v-bind="props" style="cursor: pointer" :color="checkLike(selectedMeme.id) ? 'pink' : ''">{{ checkLike(selectedMeme.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                            {{ selectedMeme.likes }} {{ selectedMeme.likes === 1 ? 'Like' : 'Likes'}}
                          </template>
                        </v-tooltip>
                      </div>
                      <v-spacer></v-spacer>
                      <v-btn variant="text" @click="sheet = !sheet">
                        <v-icon >mdi-share</v-icon> 
                        Share
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>

                  </v-card>
                </v-col>
              </v-row>
          </v-card-text>

          <v-bottom-sheet v-show="sheet">
            <v-card class="ma-4 pb-8">

              <div class="ma-4">
                <p style="color: #FFF" class="font-weight-medium text-center" >Share Via</p>
              </div>

                <v-layout justify-center>
                  <v-spacer></v-spacer>
                  <ShareNetwork
                      network="facebook"
                      :url="'https://mememaster.app/memes/' + selectedMeme.id"
                      :title="selectedMeme.name"
                      tag="v-btn"
                    >
                      <v-btn fab color="#3b5998" style="border-radius:10px" medium dark><v-icon medium>mdi-facebook</v-icon></v-btn>
                  </ShareNetwork>
                  <v-spacer></v-spacer>
                  <ShareNetwork
                      network="whatsapp"
                      :url="'https://mememaster.app/memes/' + selectedMeme.id"
                      :title="selectedMeme.name"
                      tag="v-btn"
                    >
                      <v-btn fab color="#25D366" style="border-radius:10px" medium dark><v-icon medium>mdi-whatsapp</v-icon></v-btn>
                  </ShareNetwork>
                  <v-spacer></v-spacer>
                  <ShareNetwork
                      network="twitter"
                      :url="'https://mememaster.app/memes/' + selectedMeme.id"
                      :title="selectedMeme.name"
                      tag="v-btn"
                    >
                      <v-btn fab color="light-blue" style="border-radius:10px" medium dark><v-icon medium>mdi-twitter</v-icon></v-btn>
                  </ShareNetwork>
                  <v-spacer></v-spacer>
                  <ShareNetwork
                      network="telegram"
                      :url="'https://mememaster.app/memes/' + selectedMeme.id"
                      :title="selectedMeme.name"
                      tag="v-btn"
                    >
                      <v-btn fab color="light-blue darken-3" style="border-radius:10px" medium dark>
                        <v-img 
                          src="/img/icons/telegram.png" 
                          style="width:16px;height:16px" 
                        />
                      </v-btn>
                  </ShareNetwork>
                  <v-spacer></v-spacer>
                  <ShareNetwork
                      network="email"
                      :url="'https://mememaster.app/memes/' + selectedMeme.id"
                      :title="selectedMeme.name"
                      tag="v-btn"
                    >
                      <v-btn fab color="grey" style="border-radius:10px" medium dark><v-icon medium>mdi-at</v-icon></v-btn>
                  </ShareNetwork>
                  <!-- <v-btn fab v-clipboard="'https://olahbola.com/#/news/' + card.slug" @success="handleSuccess" @error="handleError"
                          color="grey darken-1" style="border-radius:10px" medium dark><v-icon medium>mdi-content-copy</v-icon></v-btn> -->
                  <v-spacer></v-spacer>
                  <!-- <v-spacer></v-spacer>
                  <v-btn fab @click="shareFB" color="#3b5998" style="border-radius:10px" medium dark><v-icon medium>mdi-facebook</v-icon></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn fab @click="shareWA" color="#25D366" style="border-radius:10px" medium dark><v-icon medium>mdi-whatsapp</v-icon></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn fab @click="shareIN" color="purple" style="border-radius:10px" medium dark><v-icon medium>mdi-instagram</v-icon></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn fab @click="shareEmail" color="grey darken-1" style="border-radius:10px" medium dark><v-icon medium>mdi-at</v-icon></v-btn>
                  <v-spacer></v-spacer> -->
                </v-layout>
            </v-card>
          </v-bottom-sheet>
        </v-card>
      </v-dialog>


    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase/app'
import { db } from '@/main'
import { scroller } from 'vue-scrollto/src/scrollTo'
import dateformat from "dateformat"
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
    loadingData: false,
    memeDetailsDialog: false,
    sheet: false,
    view: 1,
    readMore: false,
    limit: 50,
    memeCount: 0,
    showToolbar: [],
    likeArr: [],
    selectedMeme: []
  }),
  components: {
  },
  computed: {
    getPublicMemes () {
      return this.$store.state.fb.publicMemes
    },
    getUser () {
      return this.$store.state.user
    },
    mmConnected () {
      return this.$store.state.user.mmConnected
    },
    walletConnected () {
      return this.$store.state.user.walletConnected
    },
    twConnected () {
      return this.$store.state.user.twConnected
    },
    emailConnected () {
      return this.$store.state.user.isEmailConnected
    },
  },
  watch: {
    mmConnected () {
      if (this.mmConnected) {
        setTimeout(() => {
          this.getLikes();
        }, 2000)
      }
    },
    twConnected () {
      if (this.twConnected) {
        setTimeout(() => {
          this.getLikes();
        }, 2000)
      }
    },
    walletConnected () {
      if (this.walletConnected) {
        setTimeout(() => {
          this.getLikes();
        }, 2000)
      }
    },
    emailConnected(newValue){
      if (this.emailConnected) {
        setTimeout(() => {
          this.getLikes();
        }, 2000)
      }
    },
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.scrollToTop()
    this.init()
  },
  methods: {
    init () {
      console.log('######## this.getUser ##########')
      console.log(this.getUser)
      if(![null,undefined, ''].includes(this.getUser.displayName)) {
        console.log("x");
        this.getLikes();
      }
     this.getMemes()
    },
    getMemes() {
      // Get Public Memes from database
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

            if (this.$route.params?.id !== 'default') {
              let id = this.$route.params?.id
              let meme  = this.getPublicMemes.find(item => item.id === id)
              this.memeDetailsClicked(meme)
            }
            
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
            if (this.$route.params?.id !== 'default') {
              let id = this.$route.params?.id
              let meme  = this.getPublicMemes.find(item => item.id === id)
              this.memeDetailsClicked(meme)
            }
            return
          }
        }, 2000);
    },
    getLikes (){
      console.log('######## this.getLikes ##########')
      const query = db.collection('likes').doc(this.getUser.uid);
      query.get().then(snapshot => {
        console.log(snapshot.data())
        const data = snapshot.data();
        this.likeArr = data.likedMemes;
      })
    }, 
    checkLike(newsId){
      return this.likeArr.includes(newsId);
    },
    likeThisMeme (item) {
      console.log(item.id);
      console.log(this.getUser);
      if([null,undefined].includes(this.getUser)){
        return;
      }
      var likeRef = db.collection('likes').doc(this.getUser.uid);
      var memeRef = db.collection('memes').doc(item.id);
      console.log(likeRef, memeRef);
      db.runTransaction(async (transaction) => {
        return transaction.get(likeRef).then(async (likeDoc) => {
          let likeObj;
          let memeObj;
          let isNewLike = true;
          //Like Document
          if (likeDoc.exists) {
            const isAlreadyLiked = likeDoc.data().likedMemes.includes(item.id);
            if(isAlreadyLiked) {
              likeObj = {
                likedMemes: firebase.firestore.FieldValue.arrayRemove(item.id)
              }
              isNewLike = false;
            }
            else{
              likeObj = {
                likedMemes: firebase.firestore.FieldValue.arrayUnion(item.id)
              }
            }
            transaction.update(likeRef, likeObj);
          }
          else{
            likeObj = {
              likedMemes: [item.id]
            }
            transaction.set(likeRef, likeObj);
          }

          //Meme Like Count
          if(isNewLike){
            memeObj = {
              likes: item.likes += 1
            }
          }
          else{
            memeObj = {
              likes: item.likes -= 1
            }
          }
          transaction.update(memeRef, memeObj);
        });
      })
        .then((isNewLike) => {
          if (isNewLike) {
            console.log("Meme Liked")
          } else {
            console.log("Meme Liked removed")
            this.getLikes();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectImage (index) {
      console.log('this.getPublicMemes[index].show')
      console.log(this.getPublicMemes[index].show)
      this.getPublicMemes[index].show = !this.getPublicMemes[index].show
    },
    memeDetailsClicked (meme) {
      console.log(meme)
      this.selectedMeme = meme
      this.memeDetailsDialog = true
      this.addViewCount(meme)
    },
    addViewCount (meme) {
      let dispatchObj = {
        views: meme.views += 1
      }
      db.collection('memes').doc(meme.id).update(dispatchObj)
      .then(() => {
          // No TODO
        })
      .catch(error => {
          console.log(error)
        })
    },
    checkNameLength (name) {
      if (name === undefined) return
      if (name.length < 10) {
        return name
      } else {
        return name.substr(0, 10) + '...'
      }
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#mememarketplace', 500, { offset: -64 });
      }, 200);
    },
    makeDate (date) {
      console.log('############# date ##################')
      console.log(date)
      return dateformat(new Date(date), 'dd mmm, yyyy')
    },
    makeDateTime (date) {
      return dateformat(new Date(date), 'dd mmm, yyyy HH:MM')
    }
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

  .column v-img {
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
