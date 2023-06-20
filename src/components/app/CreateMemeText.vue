<template>
  <div id="memetext">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" height="100%" width="100%">

       <v-row >

        <v-col cols="12" md="5">
          <div class="text-h6 mt-4 ml-4">Add Meme Text</div>
        </v-col>

        <v-col cols="12" md="5" >
          <div class="text-h6 mt-4 ml-4">Selected Image</div>
        </v-col>

        <v-col cols="12" md="2" >
        </v-col>

       </v-row>

       <v-row class="ml-4" style="margin-top:-20px">

        <v-col cols="12" md="5">

          <v-row>
            <v-col>
              <div>Your Meme</div>
              <v-text-field
                prepend-inner-icon="mdi-text-shadow"
                placeholder="Enter your meme text here..."
                density="compact"
                v-model="memeText"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: -20px;">
            <v-col cols="12" md="5">
              <v-layout>
              <p>Font</p>
              <!-- <v-tooltip location="top" text="Prompt strength determines how much the final image will portray your prompts.">
                <template v-slot:activator="{ props }">
                  <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                </template>
              </v-tooltip> -->
            </v-layout>
              <v-select
                return-object
                prepend-inner-icon="mdi-format-font"
                placeholder="Select Font..."
                v-model="font"
                :items="fonts"
                item-title="name"
                item-value="id"
                density="compact"
                variant="outlined"
                single-line
              ></v-select>
            </v-col>

            <v-col cols="12" md="3" :style="windowWidth < 940 ? 'margin-top: -20px;' : ''">
              <v-layout>
                  <p>Font Size</p>
                <!-- <v-tooltip location="top" text="Generation steps is how many times the image is sampled. More steps may be more accurate.">
                  <template v-slot:activator="{ props }">
                    <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                  </template>
                </v-tooltip> -->
              </v-layout>
              <v-text-field
                prepend-inner-icon="mdi-format-size"
                placeholder="Auto"
                type="number"
                min="8"
                max="150"
                density="compact"
                v-model="fontSize"
                variant="outlined"
                hint="Range 8 to 150"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-layout>
                  <p>Format</p>
                <!-- <v-tooltip location="top" text="Generation steps is how many times the image is sampled. More steps may be more accurate.">
                  <template v-slot:activator="{ props }">
                    <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                  </template>
                </v-tooltip> -->
              </v-layout>
              <v-btn-toggle
                v-model="formatting"
                multiple
                variant="outlined"
                divided
              >
                <v-btn size="x-small" style="height:41px" @click="formattingChanged()">
                  <v-icon size="medium" icon="mdi-format-italic"></v-icon>
                </v-btn>

                <v-btn size="x-small" style="height:41px" @click="formattingChanged()">
                  <v-icon size="medium" icon="mdi-format-bold"></v-icon>
                </v-btn>

                <v-btn size="x-small" style="height:41px" @click="formattingChanged()">
                  <v-icon size="medium" icon="mdi-format-underline"></v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <v-row style="margin-top: -20px;">
            <v-col cols="12" md="7">
              <v-layout>
                  <p>Font Color</p>
                <!-- <v-tooltip location="top" text="Generation steps is how many times the image is sampled. More steps may be more accurate.">
                  <template v-slot:activator="{ props }">
                    <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                  </template>
                </v-tooltip> -->
              </v-layout>
              <v-color-picker 
                  width="90%"
                  v-model="fontColor"
                  hide-inputs 
                  :show-swatches="swatches"
              >
              </v-color-picker>
            </v-col>

            <v-col cols="12" md="5">
              <v-layout>
                  <p>Options</p>
                <!-- <v-tooltip location="top" text="Generation steps is how many times the image is sampled. More steps may be more accurate.">
                  <template v-slot:activator="{ props }">
                    <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                  </template>
                </v-tooltip> -->
              </v-layout>
              <!-- <v-switch
                v-model="swatches"
                label="Color Swatches"
                color="success"
                value="swatches"
                hide-details
              ></v-switch> -->

              <v-checkbox
                style="margin-top:-10px"
                v-model="shadow"
                label="Add Shadow"
                color="success"
                value="shadow"
                hide-details
              ></v-checkbox>
              <v-radio-group
                v-if="shadow"
                v-model="shadowColor"
                inline
                style="margin-top:-20px"
              >
                <v-radio
                  style="margin-left:30px;"
                  label="Black"
                  value="black"
                ></v-radio>
                <v-radio 
                  label="White"
                  value="white"
                ></v-radio>
                <v-text-field
                  v-if="shadow"
                  class="ml-8"
                  prepend-inner-icon="mdi-box-shadow"
                  suffix="Thickness"
                  placeholder="Number"
                  type="number"
                  min="1"
                  max="10"
                  density="compact"
                  v-model="shadowThickness"
                  variant="outlined"
                  hint="Range 1 to 10"
                ></v-text-field>
              </v-radio-group>
              <v-checkbox
                  style="margin-top:-20px"
                  v-model="border"
                  label="Border Around"
                  color="success"
                  value="border"
                  hide-details
                ></v-checkbox>
                <v-radio-group
                v-if="border"
                v-model="borderColor"
                inline
                style="margin-top:-20px"
              >
                <v-radio
                  style="margin-left:30px;"
                  label="Black"
                  value="black"
                ></v-radio>
                <v-radio 
                  label="White"
                  value="white"
                ></v-radio>
                <v-text-field
                  v-if="border"
                  class="ml-8"
                  prepend-inner-icon="mdi-box-shadow"
                  suffix="Thickness"
                  placeholder="Number"
                  type="number"
                  min="1"
                  max="10"
                  density="compact"
                  v-model="borderThickness"
                  variant="outlined"
                  hint="Range 1 to 10"
                ></v-text-field>
              </v-radio-group>

              <v-layout :style="shadow ? 'margin-top:-15px' : ''">
                  <p>Meme Placement</p>
                <!-- <v-tooltip location="top" text="Generation steps is how many times the image is sampled. More steps may be more accurate.">
                  <template v-slot:activator="{ props }">
                    <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                  </template>
                </v-tooltip> -->
              </v-layout>

              <v-radio-group label="Horizontal" v-model="horizontalPlacement">
                <v-radio label="Left" value="text-left" style="margin-top:-10px"></v-radio>
                <v-radio label="Center" value="text-center" style="margin-top:-10px"></v-radio>
                <v-radio label="Right" value="text-right" style="margin-top:-10px"></v-radio>
              </v-radio-group>

              <v-radio-group label="Vertical" style="margin-top:-20px" v-model="verticalPlacement">
                <v-radio label="Top" value="align-start" style="margin-top:-10px"></v-radio>
                <v-radio label="Middle" value="align-center" style="margin-top:-10px"></v-radio>
                <v-radio label="Bottom" value="align-end" style="margin-top:-10px"></v-radio>
              </v-radio-group>
    
            </v-col>
          </v-row>

        </v-col>
       
        <!-- ###################### THE SELECTED IMAGE WITH THE MEME TEXT ################# -->
        <v-col cols="12" md="5" >
          <div ref="memeCanvas">
            <v-img 
                :src="'data:image/png;base64,' + selectedImage.base64" width="100%"
                :class="verticalPlacement + ' ' + horizontalPlacement"
            >
              <div :class="fontSize < 100 ? 'pa-2' : ''" 
                  :style="'line-height: 1em;color:' + fontColor + 
                          ';font-size:' + fontSize + 
                          'px;font-weight:' + fontWeight + 
                          ';font-style:' + fontStyle + 
                          ';text-decoration:' + textDecoration +
                          ';text-shadow:' + getShadow() +
                          ';font-family:' + font.id">
                            {{ memeText }}
              </div>
            </v-img>
          </div>
          <v-img :src="output" style="display: none"></v-img>
        </v-col>

        <v-col cols="12" md="2" class="pa-2">
          <v-btn prepend-icon="mdi-check-outline" 
                 :style="memeText === '' ? 'width:90%;text-transform: none !important' : 'width:90%;text-transform: none !important;box-shadow: 0px 0px 5px 5px rgb(237, 229, 249)'" 
                 color="deep-purple-lighten-1"
                 @click="printSaveThis()"
          >
            Save this Meme
          </v-btn>

          <v-btn class="mt-3"
                 prepend-icon="mdi-view-grid-plus" style="width:90%;text-transform: none !important" 
                 variant="outlined" 
                 color="indigo-lighten-1"
                 @click="toMyCollections()"
                 :disabled="!memeCompleted"
          >
            My Collections
          </v-btn>

          <v-btn class="mt-2"
                 variant="outlined" 
                 prepend-icon="mdi-view-grid-plus" style="width:90%;text-transform: none !important" 
                 @click="generateMore()"
                 :disabled="!memeCompleted"
          >
            Generate More
          </v-btn>
        </v-col>

       </v-row>
      </v-card>
    </v-responsive>

    <!-- #########################  SAVE MEME DIALOG #########################-->
    <v-dialog
      v-model="saveMemeDialog"
      :fullscreen="isMobileDevice"
      transition="dialog-bottom-transition"
      max-width="800"
      persistent
    >
        <v-card>
          <v-toolbar
            color="#241d43"
            title="Save this Meme to Your Collections"
            class="text-white"
          >
          <v-spacer></v-spacer>
           <v-btn
              v-if="!uploadingFile && !uploadComplete"
              icon
              color="white"
              @click="saveMemeDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text v-if="!uploadingFile && !uploadComplete && !newCollection">
            <v-row>
              <v-col cols="=12" md="6">
                <v-text-field
                  prepend-inner-icon="mdi-tag-faces"
                  label="Meme Name"
                  placeholder="Meme Name..."
                  density="compact"
                  v-model="memeName"
                  variant="outlined"
                  hint="A nice name for your meme file."
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="=12" md="6" :align="'end'">
                <v-btn 
                    :style="isMobileDevice ? 'width:100%;margin-top:-20px' : ''"
                    prepend-icon="mdi-plus" 
                    variant="outlined"
                    @click="newCollection = true"
                >
                  Create new Collection
                </v-btn>
              </v-col>
              
            </v-row>
            <v-list lines="two" :style="isMobileDevice ? '' : 'margin-top:-30px'" v-if="getCollections.length > 0">
              <v-list-subheader>My Meme Collections ({{ getCollections.length }})</v-list-subheader>

                <template v-for="(item, index) in getCollections" :key="index">
                <v-list-item
                  link
                  :value="item"
                  active-color="primary"
                  :title="item.name"
                  :subtitle="'Created: ' + makeDateTime(item.created) + ' --- ' + (item.public ? 'Public Collection' : 'Private Collection')"
                  @click="selectedCollection = item"
                >
                <template v-slot:prepend>
                      <v-avatar color="blue-lighten-1" style="border-radius: 10px;" v-if="item.icon === 'default'" >
                        <v-icon color="white">mdi-image-multiple-outline</v-icon>
                      </v-avatar>
                      <v-img v-else :src="item.icon" style="max-width: 40px;min-width: 40px; max-height:40px;min-height:40px;border-radius: 10px;margin-right: 18px">
                      </v-img>
                    </template>

                  <template v-slot:append>
                    <v-icon
                      :color="item.public ? 'green-lighten-1' : 'red-lighten-1'"
                    >
                      {{  item.public ? 'mdi-lock-open-variant-outline' : 'mdi-lock-outline' }}
                    </v-icon>
                  </template>
                </v-list-item>
                <v-divider></v-divider>
                </template>

            </v-list>
            <div v-else class="text-h6 ma-2">You don't have any Collections yet. Create one first.</div>

          </v-card-text>

          <v-card-text v-if="uploadingFile || uploadComplete">
            <v-row >
              <v-col cols="12" md="12">
                <div v-if="!uploadComplete" class="text-h6 ma-2">Saving Meme...</div>
                <div v-if="uploadComplete" class="text-h6 ma-2">Meme saved to your {{ memeName }} collection</div>
                <v-progress-linear
                  v-model="uploadProgress"
                  color="deep-purple-darken-3"
                  height="25"
                >
                  <strong>{{ Math.ceil(uploadProgress) }}%</strong>
                </v-progress-linear>
              </v-col>
             </v-row>
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
                    style="margin-top:5px"
                    size="large"
                    color="green"
                    @click="privatePublicDialog = true"
                   >
                    mdi-information-outline
                  </v-icon>
                </v-layout>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="justify-end mb-2 mr-4"  v-if="!uploadingFile && !uploadComplete && !newCollection">
              <v-btn
                variant="text"
                @click="saveMemeDialog = false"
              >
                Cancel
              </v-btn>

              <v-btn
                v-if="!uploadingFile && !uploadComplete"
                prepend-icon="mdi-content-save-check-outline"
                variant="outlined"
                color="green-lighten-1"
                @click="saveMemeConfirmed()"
                :disabled="selectedCollection.length === 0 || memeName === '' || checkNameRules(memeName)"
              >
              Save Meme
              </v-btn>
            </v-card-actions>

            <v-card-actions class="justify-end mb-2 mr-4"  v-if="(uploadingFile || uploadComplete) && !newCollection">
              <v-btn
                prepend-icon="mdi-check-all"
                variant="outlined"
                color="green-lighten-3"
                @click="memeCreationCompleted()"
                :disabled="!uploadComplete"
              >
              Meme Creation Completed
              </v-btn>
            </v-card-actions>

            <v-card-actions class="justify-end mb-2 mr-4"  v-if="newCollection">
              <v-btn 
                  variant="text"
                  @click="newCollection = flase"
              >
                Cancel
              </v-btn>
              <v-btn 
                  prepend-icon="mdi-content-save-check-outline" 
                  variant="outlined"
                  color="green-lighten-3"
                  @click="createNewCollection()"
                  :disabled="newCollectionName === '' || checkNameRules(newCollectionName)"
              >
                Create Collection
              </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>

    <v-dialog
        v-model="privatePublicDialog"
        max-width="800"
        :fullscreen="isMobileDevice"
      >

        <v-card>
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

  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase/app'
import 'firebase/storage'
import { db } from '@/main'
import dateformat from "dateformat"
import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'MemeText',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean,
    selectedImage: Array
  },
  data: () => ({
    loading: false,
    saveMemeDialog: false,
    privatePublicDialog: false,
    memeName: '',
    memeText: '',
    newCollectionName: '',
    public: false,
    font: { name: "Nunito", id: "Nunito" },
    fonts: [
      { name: "Nunito", id: "Nunito" },
      { name: "Open Sans", id: "Open Sans, sans-serif" },
      { name: "Roboto", id: "'Roboto', sans-serif" },
      { name: "Comfortaa", id: "Comfortaa" },
      { name: "Luckiest Guy", id: "Luckiest Guy" },
      { name: "Courgette Handwriting", id: "Courgette" },
      { name: "Bungee Shade", id: "'Bungee Shade', cursive" },
      { name: "Bungee Outline", id: "'Bungee Outline', cursive" },
    ],
    fontSize: 50,
    formatting: [],
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    fontColor: '#FFF',
    swatches: true,
    shadow: false,
    border: false,
    shadowColor: 'black',
    shadowThickness: 1,
    borderColor: 'black',
    borderThickness: 2,
    horizontalPlacement: 'text-center',
    verticalPlacement: 'align-end',
    output: null,
    selectedCollection: [],
    uploadingFile: false,
    uploadComplete: false,
    uploadProgress: 0,
    newCollection: false,
    memeCompleted: false,
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
    }
  },
  watch: {
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    // this.scrollToTop()
    this.init()
    // this.storageRef = firebase.storage().ref()
  },
  methods: {
    init () {
     
    },
    formattingChanged () {
      console.log(this.formatting.includes(0))
      if (this.formatting.includes(0)) {
        this.fontStyle = 'italic'
      } else {
        this.fontStyle = 'normal'
      }

      if (this.formatting.includes(1)) {
        this.fontWeight = 'bold'
      } else {
        this.fontWeight = 'normal'
      }

      if (this.formatting.includes(2)) {
        this.textDecoration = 'underline'
      } else {
        this.textDecoration = 'none'
      }
    },
    getShadow () {
      if (this.shadow) {
        return this.shadowThickness + 'px ' + this.shadowThickness+ 'px ' + this.shadowThickness + 'px ' + this.shadowColor + ', 0 0 25px grey, 0 0 5px grey'
      } else if (this.border) {
        return '-' + this.borderThickness+ 'px 0 ' + this.borderColor + ', 0 ' + this.borderThickness+ 'px ' + this.borderColor + ', ' + this.borderThickness+ 'px 0 ' + this.borderColor + ', 0 -' + this.borderThickness+ 'px ' + this.borderColor + ';'
      }
      return 'none'
    },
    async printSaveThis() {
      console.log(this.selectedImage)
      this.uploadComplete = false
      this.memeCompleted = false
      const el = this.$refs.memeCanvas;
      // add option type to get the image version
      // if not provided the promise will return 
      // the canvas.
      const options = {
        type: 'dataURL'
      }
      this.output = await this.$html2canvas(el, options);
      console.log(this.output)
      this.saveMemeDialog = true
      this.getUserCollections()
    },
    async saveMemeConfirmed () {

        // Create a reference to the file
        this.uploadingFile = true
        this.uploadComplete = false
        const storageRef = firebase.storage().ref()
        // storageRef.child(this.files.name);
        // const compressedFile = await imageCompression(this.files, options)
        // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        // Create a reference to 'images/mountains.jpg'
        // var str = this.currentUser.uid.substr(0, 6)
        // var fileImagesRef = 
        var metadata = {
          contentType:'image/png',
          customMetadata: {
            uid: this.getUser.uid,
            uname: this.getUser.displayName,
            prompt: JSON.stringify(this.selectedImage.prompt),
            status: '1',
            created: new Date().getTime()
          },
        };
        var filePath = 'memes/' + this.getUser.uid + '/' + this.selectedCollection.name + '/' + this.memeName + '.png'
        var uploadTask = storageRef.child(filePath).putString(this.output, 'data_url', metadata)
        // fileImagesRef.put('memes/' + this.getUser.uid + '/' + this.selectedCollection.name + '/' + this.memeName + '.png', metadata);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            console.log("snapshot", snapshot)
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            console.log("snapshot state", snapshot.state);
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log(this.memeName + '.png');
                this.uploadProgress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            // if (this.files.length - 1 === parseInt(i)) {
            // }
            var thumbnail = ''
            let postkey = db.collection('memes').doc()
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              let dispatchObj = {
                cid: this.selectedCollection.id,
                id: postkey.id,
                url: downloadURL,
                uid: this.getUser.uid,
                name: this.memeName,
                created: new Date().getTime(),
                thumbnail: thumbnail, // To be Done
                status: 1,
                public: this.selectedCollection.public,
                views: 0,
                likes: 0
              }
              console.log(dispatchObj)
              this.$store.dispatch("addMemeToCollection", dispatchObj)
                .then(() => {
                  // console.log(this.getCollections)
                })
                .catch(error => {
                  console.log(error)
                  this.loadingData = false
                })
              /* db.collection('collections').doc(this.newPostKey.id).collections(dispatchObj)
              .then(() => {
                  console.log('Image url in bucket updated')
                })
              .catch(error => {
                  console.log(error)
                }) */
              // this.saveMemeDialog = false
              this.uploadingFile = false
              this.uploadComplete = true
            })
          }
        )
    },
    memeCreationCompleted () {
      // Create a reference to the file whose metadata we want to retrieve
      /* const storageRef = firebase.storage().ref()
      var fileRef = storageRef.child(this.filePath);

      // Get metadata properties
      fileRef.getMetadata()
        .then((metadata) => {
          // Metadata now contains the metadata for 'images/forest.jpg'
          console.log(metadata)
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        }); */
        this.memeName = ''
        this.saveMemeDialog = false
        this.memeCompleted = true
        // some other view actions
    },
    getUserCollections() {
      console.log(this.getCollections)
      if (this.getCollections.length > 0) {
        let checkTime = Math.round(new Date().getTime() / 1000)
        if (this.getCollections[0]?.checkTime > Math.round(checkTime)) {
          console.log('No collections reload needed')
          return
        }
      }
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
        public: false,
        created: new Date().getTime(),
        username: this.getUser.displayName,
        slug: '',
        icon: 'default'
      }
      this.$store.dispatch('createCollection', dispatchObj)
        .then(() => {
          console.log('Collection Added to Firebase!')
          this.getCollections.splice(0, 0, dispatchObj)
          this.newCollectionName = ''
          this.newCollection = false
        })
        .catch(error => {
          console.log(error)
          this.loadingData = false
        })
    },
    generateMore () {
      this.$emit("generateMoreClicked")
    },
    toMyCollections () {

    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#memetext', 500, { offset: -64 });
      }, 200);
    },
    checkNameRules (value) {
      if (/^[\w\s]+$/.test(value)) return false
      return true
    },
    makeDateTime (date) {
      return dateformat(new Date(date), 'dd mmm, yyyy HH:MM')
    }
  }
}
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Bungee+Outline&family=Bungee+Shade&family=Comfortaa:wght@400;700&family=Courgette&family=Gruppo&family=Luckiest+Guy&family=Nunito:wght@400;700;900&family=Open+Sans:wght@400;700&family=Roboto:wght@700;900&family=Saira:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');
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
