<template>
  <div id="mycollections">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" color="#2b2b2b"  class="mt-16 mb-4" height="100%" v-if="view === 1">

       <v-row class="mt-12" :align="center">
          <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
          </v-col>

          <v-col cols="12" md="6" :align="center">
            <div class="text-h4 text-center ma-2">My Meme Collections</div>
            <div class="text-center cardTextCreateSmall ma-2">My Meme Collections is the way to manage and organize your memes. Create more collections to file your meme's away for easy reference.</div>
          </v-col>

          <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
          </v-col>
       </v-row>

       <v-row class="mb-4" :align="center">

        <v-col cols="12" md="2" :align="center" >
        </v-col>
       
        <v-col cols="12" md="8" :align="center" >
          <v-card >
  
          <v-card-text v-if="!uploadingFile && !uploadComplete && !newCollection">
            <v-row>
              <v-col cols="12" md="6" :align="'end'">
                <v-text-field
                  prepend-inner-icon="mdi-feature-search-outline"
                  placeholder="Search..."
                  density="compact"
                  v-model="searchCollections"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="=12" md="6" :align="'end'">
                <v-btn 
                    :style="isMobileDevice ? 'width:100%;margin-top:-20px' : ''"
                    prepend-icon="mdi-plus" 
                    variant="outlined"
                    @click="newCollection = true"
                >
                  New Collection
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="loadingData && !collectionsEmpty">
              <v-col cols="12"  :align="'center'">
                <v-progress-circular
                    indeterminate
                    color="deep-purple-darken-2"
                  ></v-progress-circular>
                  <div class="text-h6 mt-2 blue--text">Loading collections...</div>
              </v-col>
            </v-row>
            <v-list lines="two" v-else-if="getCollections.length > 0 && !loadingData">
              <v-list-subheader>My Meme Collections ({{ getCollections.length }})</v-list-subheader>

                <template v-for="(item, index) in filteredCollections" :key="index">
                  <v-list-item
                    link
                    :value="item"
                    active-color="primary"
                    @click="selectedCollectionClicked(item, index)"
                  >
                    <template v-slot:prepend>
                      <v-avatar color="blue-lighten-1" style="border-radius: 10px;" v-if="item.icon === 'default'" >
                        <v-icon color="white">mdi-image-multiple-outline</v-icon>
                      </v-avatar>
                      <v-img v-else :src="item.icon" style="width: 40px; height:40px;border-radius: 10px;margin-right: 18px">
                      </v-img>
                    </template>

                    <v-list-item-title style="color: #FFF;font-size: 18px;font-weight: bold;">
                      {{ item.name  }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      {{ 'Created: ' + makeDateTime(item.created) + ' --- ' + (item.public ? 'Public Collection' : 'Private Collection') }}
                    </v-list-item-subtitle>


                    <template v-slot:append>
                      <v-icon
                        :color="item.public ? 'green-lighten-1' : 'blue-lighten-1'"
                      >
                        {{  item.public ? 'mdi-lock-open-variant-outline' : 'mdi-lock-outline' }}
                      </v-icon>
                      <v-icon
                          size="x-large"
                          color="red-lighten-1"
                          @click.stop="deleteCollection(item, index)"
                        >
                          mdi-trash-can-outline
                        </v-icon>
                    </template>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>

            </v-list>
            <div v-else class="text-h6 ma-2">You don't have any Collections yet. Create one first.</div>

          </v-card-text>

          <v-card-text v-if="newCollection">
            <v-row>
              <v-col cols="=12" md="8">
                <v-form fast-fail @submit.prevent>
                  <v-text-field
                    prepend-inner-icon="mdi-collage"
                    label="Collection Name"
                    placeholder="Collection Name..."
                    density="compact"
                    maxlength="50"
                    v-model="newCollectionName"
                    variant="outlined"
                    hint="A name for your new collection."
                    :rules="nameRules"
                  ></v-text-field>
                </v-form>
              </v-col>

              <v-col cols="=12" md="4" :align="'end'">
                <v-layout>
                  <v-switch
                    style="margin-top:-8px"
                    v-model="public"
                    hide-details
                    :label="`Make Public: ${public ? 'Yes' : 'No'}`"
                    inset
                  ></v-switch>
                  
                  <v-icon
                    style="margin-top:7px"
                    size="large"
                    @click="privatePublicDialog = true"
                   >
                    mdi-information-outline
                  </v-icon>
                </v-layout>
              </v-col>

            </v-row>
          </v-card-text>

            <v-card-actions class="mb-2 mr-4"  v-if="newCollection">
              <v-btn 
                  variant="text"
                  @click="newCollection = flase"
              >
                Cancel
              </v-btn>
              <v-btn 
                  prepend-icon="mdi-content-save-check-outline" 
                  variant="outlined"
                  color="green-lighten-1"
                  @click="createNewCollection()"
                  :disabled="newCollectionName === '' || checkNameRules(newCollectionName)"
              >
                Create Collection
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-col>

        <v-col cols="12" md="2" :align="'center'">
        </v-col>

       </v-row>
      </v-card>
  
    </v-responsive>

     <!-- ############################## DIALOGS ####################################### -->
     <v-dialog
        v-model="privatePublicDialog"
        max-width="800"
        :fullscreen="isMobileDevice"
      >
        <v-card theme="dark">
          <v-toolbar
            color="transparent"
          >
          <v-spacer></v-spacer>
            <v-btn
              icon
              @click="privatePublicDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            My Meme Collections offers both private and public collections, providing you with the flexibility to choose the level of visibility for your memes.<br><br>

            Private Collections: Keep your memes exclusively for your eyes only. With private collections, you have complete control over who can access and view your memes. It's perfect for those special, inside jokes or personal creations that you prefer to keep within a select group of friends or for your personal amusement.<br><br>

            Public Collections: If you're eager to share your memes with the world and embrace the full glory of internet fame, public collections are for you. Showcase your creativity to a wider audience and let your memes spread like wildfire across the web. Public collections allow other users to discover, appreciate, and even contribute to your meme collection, fostering a vibrant community of meme enthusiasts.<br><br>

            Whether you choose to keep your memes private or make them public, My Meme Collections ensures that your preferences are respected. You have the freedom to manage your collections and decide who gets to enjoy your meme masterpieces.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="privatePublicDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!-- #########################  COLLECTION  DETAIL DIALOG #########################-->
    <v-dialog
      v-model="collectionDetailsDialog"
      fullscreen
      transition="dialog-bottom-transition"
      persistent
    >
        <v-card theme="dark">
          <v-toolbar
            color="deep-purple-darken-4"
            :title="'Collection Details - ' + selectedCollection.name"
            class="text-white"
          >
          <v-spacer></v-spacer>
           <v-btn
              icon
              color="white"
              @click="collectionDetailsDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-row class="pa-4" style="max-height: 200px;">
                
            <v-col cols="12" md="6" :align="isMobileDevice ? 'center' : 'right'" class="pr-4">

              <v-avatar color="blue-lighten-1" size="120" style="border-radius: 10px;">
                <v-icon v-if="selectedCollection.icon === 'default'" size="80" color="white">mdi-image-multiple-outline
                </v-icon>
                <v-img v-else :src="selectedCollection.icon" style="width: 120px; height:120px;border-radius: 10px;">
                </v-img>
              </v-avatar>
              
              <v-btn size="small" 
                     icon="mdi-camera-outline" 
                     color="grey" 
                     style="position: relative;margin-top: 100px;margin-left: -30px;"
                     @click="collectionImageDialog = true"
              >
              </v-btn>
              
            </v-col>

            <v-col cols="12" md="6" :align="isMobileDevice ? 'center' : 'left'">
              <v-card
              :dark="dark"
              flat
              class="pa-4"
              > 
                <v-layout v-if="!collectionNameEdit">
                  <div style="text-transform: uppercase;" class="text-h4 font-weight-bold">{{ selectedCollection.name }}</div>
                  <v-icon
                    style="margin-left:10px"
                    size="small"
                    @click="collectionNameEditClicked"
                   >
                    mdi-pencil-box-outline
                  </v-icon>
                </v-layout>

                <v-layout v-if="collectionNameEdit">
                  <v-text-field
                    v-model="selectedCollection.name"
                    maxlength="70"
                    variant="outlined"
                  >
                  </v-text-field>
                  <v-btn
                    icon
                    size="large"
                    @click="updateCollectionSettings" 
                    v-if="collectionNameEdit"
                  >
                    <v-icon color="green">mdi-content-save-outline</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    size="large"
                    @click="collectionNameEditCancel"
                    v-if="collectionNameEdit"
                  >
                    <v-icon color="grey">mdi-close-circle</v-icon>
                  </v-btn>
                </v-layout>

                <div class="text-h7 mb-3 font-weight-bold">Created: {{ makeDate(selectedCollection.created) }}</div>

                <v-layout style="padding-top: 5px">
                  <div class="text-h7 mb-3 font-weight-bold">Public: {{ selectedCollection.public ? 'Yes' : 'No' }}</div>
                  <v-switch
                    style="margin-left:20px;margin-top: -14px"
                    v-model="selectedCollection.public"
                    hide-details
                    inset
                    @change="updateCollectionSettings"
                  >
                  </v-switch>
                  
                  <v-icon
                    style="margin-top:-3px"
                    size="large"
                    color="green"
                    @click="privatePublicDialog = true"
                   >
                    mdi-information-outline
                  </v-icon>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-card>
            </v-col>
          </v-row>

          <v-row :class="isMobileDevice ? 'ml-2 mr-2' : 'ml-8 mr-8 mb-8'" :align="start">
            <v-col v-if="loadingData" :align="'center'">
              <v-progress-circular
                  indeterminate
                  color="deep-purple-darken-2"
                ></v-progress-circular>
                <div class="text-h6 mt-2 blue--text">Loading memes...</div>
            </v-col>
            <v-col v-else-if="!memesEmpty && !loadingData" cols="12" md="3" v-for="(item,index) in getMemes" :key="index" class="px-0">
              <v-card
                class="ma-1 rounded-card"
                max-width="448"
                color="grey-darken-3"
                :loading="loadingData"
              >
                <v-img
                  :src="item.url"
                  :lazy-src="item.url"
                  class="rounded-image"
                  max-width="448"
                  max-height="448"
                  cover
                ></v-img>

                <v-card-title>
                  {{ item.name }}
                </v-card-title>

                <v-card-subtitle>
                  {{ makeDate(item.created) }}
                </v-card-subtitle>

                <v-card-actions class="ml-2">
                  <v-layout>
                    <v-icon class="mr-1">mdi-eye-outline</v-icon>
                    {{ item.views }} View{{ item.views === 1 ? '' : 's' }}
                  </v-layout>
                  <v-layout>
                    <v-icon class="mr-1">mdi-thumb-up-outline</v-icon>
                    {{ item.views }}
                  </v-layout>
                  <v-layout>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                   Share
                  </v-layout>
                </v-card-actions>
              </v-card>
              
            </v-col>

            <v-col v-if="memesEmpty" :align="'center'">
              <div class="text-h6 ma-2 text-center">You don't have any Memes in this Collections yet.<br><br>
                Create one now?
              </div>
              <v-btn 
               size="large"
               variant="outlined"
               color="white"
               theme="dark"
               @click="routerGo('/generate/default')"
               prepend-icon="mdi-view-grid-plus" 
              >
                Go To Generate
              </v-btn>
            </v-col>
          </v-row>

        </v-card>
      </v-dialog>

      <v-dialog v-model="collectionImageDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card theme="dark">
            <v-toolbar flat color="grey-darken-3">
              <v-btn icon @click.native="collectionImageDialog = false">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>{{ 'Select an Image' }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-row :align="'center'" class="pa-2">
              <p class="mt-2"></p>
              <v-col cols="12" md="3" :align="'center'">
              </v-col>
              
              <v-col cols="12" md="6" :align="'center'">

                <div class="image-upload">
                  <label for="file-input">

                    <div class="text-center mb-2">Click or tab to select an image.</div>
                    <v-avatar color="blue-lighten-1" size="150"  v-if="collectionImage === ''" style="border-radius: 10px;">
                      <v-icon size="80" color="white">{{ isMobileDevice ? 'mdi-gesture-tap' : 'mdi-selection-search' }}
                      </v-icon>
                    </v-avatar>
                    <v-img v-else 
                           :src="collectionImageUrl" 
                           style="width: 150px;height:150px;border-radius: 10px;">
                    </v-img>

                  </label>

                  <input 
                    id="file-input" 
                    type="file" 
                    accept="image/jpg,image/jpeg,image/png"
                    @change="handleFiles"
                  />
                </div>

                <v-row>
                  <v-col cols="12" md="12">
                    <v-btn color="#388E3C" 
                          @click="setCollectionImage" 
                          class="mt-4"
                          :disabled="collectionImage === ''">
                      <v-icon class="mr-2">mdi-check-circle-outline</v-icon>{{ 'Use this Image' }}
                    </v-btn>

                    <v-btn color="grey-lighten-2" 
                          @click="onRemove()" 
                          class="mt-4 ml-2"
                          variant="outlined"
                          :disabled="collectionImage === ''">
                      {{ 'Change' }}
                    </v-btn>
                  </v-col>
                </v-row>

              </v-col>

              <v-col cols="12" md="3" :align="'center'">
              </v-col>

            </v-row>
          </v-card>
      </v-dialog>

    <!-- ########################################################################### -->
    <!-- #################################  DIALOGS ################################ -->
    <!-- ########################################################################### -->
    
    <v-dialog v-model="deleteCollectionDialog" persistent min-width="290" max-width="390">
      <v-card>
        <v-card-title class="headline">Delete Selected Collection</v-card-title>
        <v-card-text class="subheading">Name: {{ selectedCollection.name}}</v-card-text>
        <v-card-text class="subheading">Please, confirm.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteCollectionDialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteCollectionConfirm">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <!-- ############################## SNACKBARS ####################################### -->
      <v-snackbar
        v-model="snackbar"
        :timeout="4000"
      >
      <v-layout>
        <v-icon color="green" class="mr-2">mdi-check-circle-outline</v-icon>
        {{ snackbarText }}
      </v-layout>

        <template v-slot:actions>
          <v-btn
            color="pink"
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/main'
import { scroller } from 'vue-scrollto/src/scrollTo'
import imageCompression from 'browser-image-compression'
import dateformat from "dateformat"
export default {
  name: 'My Collections',
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
    snackbar: false,
    snackbarText: '',
    privatePublicDialog: false,
    collectionDetailsDialog: false,
    collectionImageDialog: false,
    deleteCollectionDialog: false,
    collectionImage: '',
    collectionImageUrl: '',
    view: 1,
    newCollection: false,
    newCollectionName: '',
    collectionNameEdit: false,
    oldValue: null,
    public: false,
    searchCollections: '',
    selectedCollection: {},
    nameRules: [
      value => {
        if (/^[\w\s]+$/.test(value)) return true
        return 'Name must be alphanumeric'
      },
    ],
  }),
  components: {
  },
  computed: {
    getUser () {
      return this.$store.state.user
    },
    getCollections () {
      return this.$store.state.fb.collections
    },
    collectionsEmpty () {
      return this.$store.state.fb.collectionsEmpty
    },
    getMemes () {
      return this.$store.state.fb.memes
    },
    memesEmpty () {
      return this.$store.state.fb.memesEmpty
    },
    filteredCollections () {
        return this.getCollections.filter(item => {
          // console.log(item)
          return item.name.toLowerCase().indexOf(this.searchCollections.toLowerCase()) > -1 
        })
      }
  },
  watch: {
    getCollections () {
      if (this.getCollections.length > 0) {
        this.loadingData = false
        console.log(this.getCollections)
      } else {
        setTimeout(() => {
          this.loadingData= false
        }, 3000)
      }
    },
    getMemes () {
      if (this.getMemes.length > 0) {
        this.loadingData= false
        console.log(this.getMemes)
      } else {
        setTimeout(() => {
          this.loadingData= false
        }, 3000)
      }
    }
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.scrollToTop()
    this.waitGetUser()
  },
  methods: {
    waitGetUser () {
      setTimeout(() => {
        if (this.getUser.uid === '') {
          this.waitGetUser()
        } else {
          this.getUserCollections()
        }
      }, 1000);
    },
    getUserCollections () {
      // console.log(this.getCollections)
      this.loadingData = true
      /* if (this.getCollections.length > 0) {
        let checkTime = Math.round(new Date().getTime() / 1000)
        if (this.getCollections[0]?.checkTime > Math.round(checkTime)) {
          console.log('No collections reload needed')
          this.loadingData = false
          return
        }
      } */
      let dispatchObj = {
        uid: this.getUser.uid,
        limit: 20
      }
      console.log(dispatchObj)
      this.$store.dispatch("getUserCollections", dispatchObj)
        .then(() => {
          console.log(this.getCollections)
        })
        .catch(error => {
          console.log(error)
          this.loadingData = false
        })
    },
    createNewCollection () {
      // Insert database first then objects
      let postkey = db.collection('collections').doc()
      let dispatchObj = {
        id: postkey.id,
        uid: this.getUser.uid,
        name: this.newCollectionName,
        status: 1,
        public: this.public === 'No' ? false : true,
        created: new Date().getTime(),
        username: this.getUser.displayName,
        slug: '',
        icon: 'default'
      }
      this.$store.dispatch('createCollection', dispatchObj)
        .then(() => {
          console.log('Collection Added to Firebase!')
          if (this.getCollections.length === 0) {
            this.getCollections.push(dispatchObj)
            this.getUserCollections()
          } else {
            this.getCollections.splice(0, 0, dispatchObj)
          }
          console.log( this.getCollections)
          this.newCollectionName = ''
          this.newCollection = false
          this.snackbarText = 'Collection created!' // this.lang[this.getLanguage].RECORD_DELETED
          this.snackbar = true
        })
        .catch(error => {
          console.log(error)
          this.loadingData = false
        })
    },
    selectedCollectionClicked (item, index) {
      // actions
      this.selectedCollection = item
      this.selectedCollection.index = index
      this.collectionDetailsDialog = true
      console.log(this.selectedCollection)

      // load the memes from firebase
      this.loadingData = true
      this.$store.commit('setMemes', [])
      let dispatchObj = {
        cid: this.selectedCollection.id,
        limit: 20
      }
      console.log(dispatchObj)
      this.$store.dispatch("getUserMemes", dispatchObj)
        .then(() => {
          console.log(this.getMemes)
          this.loadingData = false
        })
        .catch(error => {
          console.log(error)
          this.loadingData = false
        })

    },
    setCollectionImage () {
      // compress the image

      let dispatchObj = {
        id: this.selectedCollection.id,
        name: this.selectedCollection.name,
        public: this.selectedCollection.public === 'No' ? false : true,
        modified: new Date().getTime(),
        username: this.getUser.displayName,
        icon: this.collectionImageUrl === '' ? 'default' : this.collectionImageUrl
      }
      console.log(dispatchObj)
      this.$store.dispatch('updateCollection', dispatchObj)
        .then(() => {
          console.log('Collection updated!')
          this.snackbarText = 'Collection updated!' // this.lang[this.getLanguage].RECORD_DELETED
          this.snackbar = true
          this.getCollections[this.selectedCollection.index].icon = this.collectionImageUrl === '' ? 'default' : this.collectionImageUrl
          this.selectedCollection.icon = this.collectionImageUrl === '' ? 'default' : this.collectionImageUrl
          this.collectionImageDialog = false
        })
        .catch(error => {
          console.log(error)
          this.loadingData = false
        })
    },
    updateCollectionSettings () {
      console.log(this.selectedCollection.public)
      let dispatchObj = {
        id: this.selectedCollection.id,
        name: this.selectedCollection.name,
        public: this.selectedCollection.public,
        modified: new Date().getTime(),
        username: this.getUser.displayName,
      }
      console.log(dispatchObj)
      this.$store.dispatch('updateCollection', dispatchObj)
        .then(() => {
          console.log('Collection updated!')
          this.snackbarText = 'Collection updated!' // this.lang[this.getLanguage].RECORD_DELETED
          this.snackbar = true
          this.getCollections[this.selectedCollection.index].name = this.selectedCollection.name
          this.getCollections[this.selectedCollection.index].public = this.selectedCollection.public
          this.collectionNameEdit = false
        })
        .catch(error => {
          console.log(error)
          this.loadingData = false
        })
    },
    collectionNameEditClicked () {
      this.collectionNameEdit =  true
      this.oldValue = this.selectedCollection.name
    },
    collectionNameEditCancel () {
      this.collectionNameEdit = false
      this.selectedCollection.name = this.oldValue
    },
    deleteCollection (item, index) {
      console.log(this.item)
      this.selectedCollection = item
      this.selectedCollection.index = index
      this.deleteCollectionDialog = true
    },
    deleteCollectionConfirm () {
      let dispatchObj = {
        id: this.selectedCollection.id,
        status: -1,
        modified: new Date().getTime(),
      }
      console.log(dispatchObj)
      this.$store.dispatch('updateCollection', dispatchObj)
        .then(() => {
          console.log('Collection Deleted!')
          this.snackbarText = 'Collection Deleted!' // this.lang[this.getLanguage].RECORD_DELETED
          this.snackbar = true
          this.getCollections.splice(this.selectedCollection.index, 1)
          this.deleteCollectionDialog = false

        })
        .catch(error => {
          console.log(error)
          this.loadingData = false
        })
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#mycollections', 500, { offset: -64 });
      }, 200);
    },
    checkNameRules (value) {
      if (/^[\w\s]+$/.test(value)) return false
      return true
    },
    async handleFiles(image) {
      if (this.collectionImage === undefined) {
        this.filesValid = false;
        return;
      }
      if (this.collectionImage.size > 2000000) {
        // === 500 KB
        this.collectionImage = [];
        this.showRowAlert = true;
        this.showRowAlertText =
          'Maximum file size of 500KB exeeded for ' + this.collectionImage.name + '!';
        return;
      } else {
        console.log(image)
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 960,
          useWebWorker: true
        }
        this.collectionImage = await imageCompression(image.target.files[0], options)
        this.filesValid = true
        this.getBase64(this.collectionImage).then((data) => (this.collectionImageUrl = data));
        console.log( this.collectionImageUrl)
      }
    },
    onRemove () {
      // console.log('Picture removed!')
      this.collectionImage = ''
      this.collectionImageUrl = ''
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    routerGo (route) {
      this.$router.push(route);
    },
    makeDate (date) {
      return dateformat(new Date(date), 'dd mmm, yyyy')
    },
    makeDateTime (date) {
      return dateformat(new Date(date), 'dd mmm, yyyy HH:MM')
    }
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
  .image-upload>input {
    display: none;
  }
  .rounded-card {
    border-radius:10px;
  }
  .rounded-image {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

</style>
