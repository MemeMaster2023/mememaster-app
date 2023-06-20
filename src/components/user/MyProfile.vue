<template>
  <v-container class="mt-12 pt-12" v-if="isLoading">
    <v-row class="my-16 py-16">
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-progress-circular
                  indeterminate
                  :size="70"
                  :width="7"
                  color="purple"
                ></v-progress-circular>
              </v-col>
            </v-row>
  </v-container>
  <v-container class="mt-12 pt-12" v-else>
    <v-row class="mx-md-12 mb-md-6 px-md-12 mx-auto px-auto mt-12">
        <v-col cols="12" class="d-flex justify-center" >
            <div>
            <v-avatar color="blue-lighten-1" size="120" style="border-radius: 10px;">
                <v-icon v-if="getUser.photo === ''" size="80" color="white">mdi-image-multiple-outline
                </v-icon>
            <v-img v-else :src="getUser.photo" style="width: 120px; height:120px;border-radius: 10px;">
            </v-img>
            </v-avatar>
            <v-btn size="small" 
                icon="mdi-camera-outline" 
                color="grey" 
                style="position: absolute;margin-top: 90px;margin-left: -30px;"
                @click="imageDialog = true"
            >
            </v-btn>
            </div>
            <div class="ml-6 text-left d-flex flex-column">
                <span class="text-md-h3 text-h4 text-left">{{ getUser.displayName }}</span>
                <span class="text-p font-weight-medium pl-1 mt-2">Member Since: {{ makeDate(getUser.memberSince) }}</span>
            </div>
        </v-col>
    </v-row>
    <v-row class="mx-md-12 px-md-12 mx-lg-16 px-lg-16 mt-4 mx-auto px-auto">
        <v-col cols="12" class="d-flex">
            <span class="text-h6">Account Information</span>
            <v-spacer></v-spacer>
            <v-btn size="small" variant="outlined" rounded color="green" @click="isEdit = true" v-if="!isEdit"><v-icon>mdi-pencil-outline</v-icon>Edit Profile</v-btn>
            <v-btn size="small" variant="outlined" rounded color="red" @click="isEdit = false" v-else><v-icon>mdi-close-outline</v-icon>Cancel Edit</v-btn>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Display Name"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="getUser.displayName"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Email"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="getUser.email"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
            <v-text-field
            label="Wallet Address"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="getUser.accounts[0]"
            variant="outlined"
          ></v-text-field>
        </v-col>
    </v-row>
    <v-row class="mx-md-12 px-md-12 mx-lg-16 px-lg-16 mt-4 mx-auto px-auto">
        <v-col cols="12" class="text-h6">User Information</v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Full Name"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="getUser.fullName"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Date of Birth"
            placeholder="Enter your display name..."
            type="date"
            density="comfortable"
            v-model="getUser.dob"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-combobox
            label="Gender"
            placeholder="Enter your Gender..."
            :readonly="!isEdit"
            density="comfortable"
            hide-details="auto"
            :items="genders"
            item-title="name"
            item-value="id"
            v-model="getUser.gender"
            variant="outlined"
          ></v-combobox>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Location"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="getUser.location"
            variant="outlined"
          ></v-text-field>
        </v-col>
    </v-row>
    <v-row class="mx-md-12 px-md-12 mx-lg-16 px-lg-16 mt-4 mx-auto px-auto mb-12" v-if="isEdit">
              <v-col cols="12" md="12">
                <v-btn @click="update()" block color="purple" variant="flat"  :loading="loading">Update Profile</v-btn>           
              </v-col>
            </v-row>
    <!-- #########################  PROFILE PICTURE  DETAIL DIALOG #########################-->
    <v-dialog v-model="imageDialog" fullscreen hide-overlay transition="dialog-bottom-transition" persistent>
          <v-card theme="dark">
            <v-toolbar flat color="grey-darken-3">
              <v-btn icon @click.native="imageDialog = false">
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
                    <v-avatar color="blue-lighten-1" size="150"  v-if="profilePicture === ''" style="border-radius: 10px;">
                      <v-icon size="80" color="white">{{ isMobileDevice ? 'mdi-gesture-tap' : 'mdi-selection-search' }}
                      </v-icon>
                    </v-avatar>
                    <v-img v-else 
                           :src="profilePictureUrl" 
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
                          @click="setProfilePicture" 
                          :loading="loadingImage"
                          class="mt-4"
                          :disabled="profilePicture === ''">
                      <v-icon class="mr-2">mdi-check-circle-outline</v-icon>{{ 'Use this Image' }}
                    </v-btn>

                    <v-btn color="grey-lighten-2" 
                          @click="onRemove()" 
                          class="mt-4 ml-2"
                          variant="outlined"
                          :loading="loadingImage"
                          :disabled="profilePicture === ''">
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
     <!-- ############################## SNACKBARS ####################################### -->
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :timeout="4000"
      >
      <v-layout>
        <v-icon v-if="snackbarColor === 'red'">mdi-alert-outline</v-icon>
        <v-icon v-if="snackbarColor === 'green'">mdi-check-circle-outline</v-icon>
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
  </v-container>
</template>

<script>
// @ is an alias to /src
import dateformat from "dateformat"
import imageCompression from 'browser-image-compression'
export default {
  name: 'My Profile',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    snackbar: false,
    snackbarText: '',
    privatePublicDialog: false,
    collectionDetailsDialog: false,
    collectionImageDialog: false,
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
    isEdit: false,
    imageDialog: false,
    profilePicture: '',
    profilePictureUrl: '',
    snackbarColor: 'green',
    snackbar: false,
    snackbarText: '',
    loadingImage: false,
    loadingPage: true,
    genders: [
      {
        id: 0,
        name: 'None'
      },
      {
        id: 1,
        name: 'Male'
      },
      {
        id: 2,
        name: 'Female'
      },
    ]
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
    isLoading(){
      return this.getUser.uid === ''
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    makeDate (date) {
      let dateBeforeFormat = Number.parseInt(date.toString());
      if([undefined,null,0,''].includes(date)){
        dateBeforeFormat = 1
      }
      console.log(new Date(dateBeforeFormat))
      return dateformat(new Date(dateBeforeFormat), 'dd mmm, yyyy')
    },
    makeDateTime (date) {
      return dateformat(new Date(date), 'dd mmm, yyyy HH:MM')
    },
    getBase64(file) {
      console.log(file)
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    onRemove () {
      // console.log('Picture removed!')
      this.profilePicture = ''
      this.profilePictureUrl = ''
    },
    async handleFiles(image) {
      const picture = image.target.files[0];
      if (picture === undefined) {
        this.profilePicture = '';
        this.snackbarColor = 'red'
        this.snackbarText = 'Image not detected!'
        this.snackbar = true
        return;
      }
      if (picture.size > 2000000) {
        // === 500 KB
        this.profilePicture = '';
        this.snackbarColor = 'red'
        this.snackbarText = 'Maximum file size of 500KB exeeded for ' + picture.name + '!'
        this.snackbar = true
        return;
      } else {
        console.log(image)
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 960,
          useWebWorker: true
        }
        this.profilePicture = await imageCompression(picture, options)
        this.filesValid = true
        console.log(this.profilePicture)
        this.getBase64(this.profilePicture).then((data) => (this.profilePictureUrl = data));
        console.log(this.profilePictureUrl)
      }
    },
    setProfilePicture () {
      this.loadingImage = true;
      let dispatchObj = {
        docId: this.getUser.docId,
        photo: this.profilePictureUrl
      }
      console.log(dispatchObj)
      this.$store.dispatch('updateProfilePicture', dispatchObj)
        .then(() => {
          this.loadingImage = false;
          this.imageDialog = false;
          this.snackbarColor = 'green'
          this.snackbarText = 'Profile Picture Updated!'
          this.snackbar = true
        })
        .catch(error => {
          console.log(error)
          this.loadingImage = false;
          this.snackbarColor = 'red'
          this.snackbarText = 'Something Went Wrong!'
          this.snackbar = true
        })
    },
    update(){
      this.loading = true
      console.log(this.getUser.scout);
      const payload = {
        email: this.getUser.email,
        fullName: this.getUser.fullName,
        dob: this.getUser.dob,
        phone: this.getUser.phone,
        gender: this.getUser.gender,
        accounts: this.getUser.accounts,
        docId: this.getUser.docId
      }
      this.$store.dispatch('updateProfile', payload)
        .then(() => {
            this.loading = false;
            this.snackbarColor = 'green'
            this.snackbarText = 'Profile Updated!'
            this.snackbar = true
          })
          .catch(error => {
            console.log(error)
            this.loading = false;
            this.snackbarColor = 'red'
            this.snackbarText = 'Something Went Wrong!'
            this.snackbar = true
          })
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

</style>
