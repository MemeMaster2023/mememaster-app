<template>
  <v-container id="collections" class="mt-12 pt-12">
    <v-row class="mx-md-12 mb-md-6 px-md-12 mx-auto px-auto mt-12">
        <v-col cols="12" class="d-flex justify-center" >
            <div>
            <v-avatar color="blue-lighten-1" size="120" style="border-radius: 10px;">
                <v-icon v-if="'default' === 'default'" size="80" color="white">mdi-image-multiple-outline
                </v-icon>
            <!-- <v-img v-else :src="selectedCollection.icon" style="width: 120px; height:120px;border-radius: 10px;">
            </v-img> -->
            </v-avatar>
            <v-btn size="small" 
                icon="mdi-camera-outline" 
                color="grey" 
                style="position: absolute;margin-top: 90px;margin-left: -30px;"
                @click=""
            >
            </v-btn>
            </div>
            <div class="ml-6 text-left d-flex flex-column">
                <span class="text-md-h3 text-h4 text-left">{{ displayName }}</span>
                <span class="text-p font-weight-medium pl-1 mt-2">Member Since: 22 May 2023</span>
            </div>
        </v-col>
    </v-row>
    <v-row class="mx-md-12 px-md-12 mx-lg-16 px-lg-16 mt-4 mx-auto px-auto">
        <v-col cols="12" class="text-h6">Account Information</v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Display Name"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="displayName"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Email"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="email"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
            <v-text-field
            label="Metamask Address"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="address"
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
            v-model="fullName"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Date of Birth"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="dob"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Gender"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="gender"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
            label="Location"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="location"
            variant="outlined"
          ></v-text-field>
        </v-col>
    </v-row>
    <!-- #########################  COLLECTION  DETAIL DIALOG #########################-->
    <v-dialog
      v-model="collectionDetailsDialog"
      fullscreen
      transition="dialog-bottom-transition"
      persistent
    >
        <v-card theme="dark">
          <v-toolbar
            color="#241d43"
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

          <v-row class="pa-12">
                
            <v-col cols="12" md="6" :align="isMobileDevice ? 'center' : 'right'">

              <v-avatar color="blue-lighten-1" size="120" style="border-radius: 10px;">
                <v-icon v-if="selectedCollection.icon === 'default'" size="80" color="white">mdi-image-multiple-outline
                </v-icon>
                <v-img v-else :src="selectedCollection.icon" style="width: 120px; height:120px;border-radius: 10px;">
                </v-img>
              </v-avatar>
              
              <v-btn size="small" 
                     icon="mdi-camera-outline" 
                     color="grey" 
                     style="position: fixed;margin-top: 90px;margin-left: -30px;"
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
                    <v-img v-else :src="collectionImageUrl" style="width: 150px;height:150px;border-radius: 10px;">
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

                    <v-btn color="grey" 
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

     <!-- ############################## SNACKBARS ####################################### -->
      <v-snackbar
        v-model="snackbar"
        :timeout="4000"
      >
      <v-layout>
        <v-icon color="green" left>mdi-check-circle-outline</v-icon>
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
import { db } from '@/main'
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
    displayName: 'Michael',
    email: 'gunawan.michael20@gmail.com',
    address:'0x770e725359cd9a3cf34feeb832a16969a8d21660',
    dob:'21 December 1998',
    gender:'Male',
    location: 'Indonesia',
    fullName: 'Michael Gunawan'
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
  },
  watch: {
  },
  created() {
  },
  methods: {
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

</style>
