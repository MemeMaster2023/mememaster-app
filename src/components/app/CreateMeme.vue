<template>
  
  <v-card theme="dark" color="#2b2b2b" class="mt-16 mb-16" height="100%">

    <!-- <v-row class="mt-12" :align="center">
       <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
       </v-col>

       <v-col cols="12" md="6" :align="center">
         <div class="text-h4 text-center">Create Meme</div>
       </v-col>

       <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
       </v-col>

    </v-row> -->

    <v-row class="pt-12 pl-4 pr-4" :align="center" v-if="view === 'generate'" >
       <v-col cols="12" md="4" :align="center" >

          <v-layout class="mb-4">
            <v-tooltip text="Image Generation Mode" location="top">
              <template v-slot:activator="{ props }">
                <v-btn 
                    v-if="view === 'generate'"
                    width="49%" 
                    class="mr-2" 
                    prepend-icon="mdi-view-grid-plus" 
                    color="white"
                    @click="view = 'generate'"
                    v-bind="props"
                >
                  Generate
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Image Generation Mode" location="top">
              <template v-slot:activator="{ props }">
                <v-btn 
                    v-if="view === 'edit'"
                    width="49%" 
                    class="mr-2" 
                    variant="outlined" 
                    prepend-icon="mdi-view-grid-plus"
                    @click="view = 'generate'"
                    v-bind="props"
                >
                Generate
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Edit Images From your Drafts" location="top">
              <template v-slot:activator="{ props }">
                <v-btn 
                    v-if="view === 'generate'"
                    width="49%" 
                    variant="outlined" 
                    prepend-icon="mdi-image-edit-outline"
                    @click="openDrafts()"
                    v-bind="props"
                >
                  Edit
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Edit Images From your Drafts" location="top">
              <template v-slot:activator="{ props }">
                <v-btn 
                    v-if="view === 'edit'"
                    width="49%" 
                    prepend-icon="mdi-image-edit-outline"
                    color="white"
                    @click="openDrafts()"
                    v-bind="props"
                >
                  Edit
                </v-btn>
              </template>
            </v-tooltip>
          </v-layout>

          <v-btn 
                class="mb-4"
                prepend-icon="mdi-book-open-variant" 
                style="width:100%;text-transform: none !important" 
                color="deep-purple-lighten-1"
                @click="openPromptingGuide()"
            >
            Meme Master Prompting Guide
          </v-btn>
          

          <v-textarea
            v-model="prompt"
            class="mb-4"
            label="Prompt"
            auto-grow
            variant="outlined"
            placeholder="What do you want to make?"
            persistent-placeholder
            clearable
            rows="3"
            maxlength="2000"
            row-height="25"
            shaped
            hint="Max. 2000 characters"
            counter
          ></v-textarea>

          <v-expansion-panels v-model="panel">
            <v-expansion-panel 
              value="settings"
              title="Settings"
            >
              <v-expansion-panel-text style="margin-left:-20px">
                <v-col>
                  <p class="mb-1">Image Style</p>
                  <v-menu >
                    <template v-slot:activator="{ props }">
                      
                      <v-list-item v-bind="props" style="border: 1px #FFF solid;border-radius: 5px;">
                        <v-layout>
                          <v-avatar>
                            <v-img :src="stylePreset.img" width="32" height="32" style="border-radius: 5px;"></v-img>
                          </v-avatar>

                          <v-list-item-content>
                          <v-list-item-title
                            class="ml-2 pt-2"
                            style="cursor: pointer"
                            >
                          {{ stylePreset.name }}
                          </v-list-item-title>
                          </v-list-item-content>
                          <v-spacer></v-spacer>
                          <v-list-item-action>
                            <v-icon size="large">mdi-chevron-down</v-icon>
                          </v-list-item-action>
                        </v-layout>

                      </v-list-item>
                    </template>
                    <v-list >
                        <template v-for="(item) in images">
                          <v-list-item class="pa-2" link @click="stylePreset = item" >
                            <v-layout>
                              <v-avatar size="72" style="border-radius: 5px;">
                                <v-img :src="item.img" width="72" height="72" ></v-img>
                              </v-avatar>

                              <v-list-item-title
                                style="cursor: pointer"
                                >
                                <v-layout>
                                  <span class="ml-4 pt-6 text-h6">{{ item.name }}</span>
                                </v-layout>
                              </v-list-item-title>
                            </v-layout>
                          </v-list-item>
                        </template>
                    </v-list>
                  </v-menu>

                  <p class="mt-4 mb-1">Number of image variants to generate? </p>
                  <v-btn-toggle
                      v-model="imagesCount"
                      rounded="0"
                      divided
                    >
                      <v-btn :value="1" size="small" width="50px" >
                        1
                      </v-btn>

                      <v-btn :value="2" size="small" width="50px" >
                        2
                      </v-btn>

                      <v-btn :value="3" size="small" width="50px" >
                        3
                      </v-btn>

                      <v-btn :value="4" size="small" width="50px" >
                        4
                      </v-btn>

                      <v-btn :value="5" size="small" width="50px" >
                        5
                      </v-btn>

                      <v-btn :value="6" size="small" width="50px" >
                        6
                      </v-btn>

                      <v-btn :value="7" size="small" width="50px" >
                        7
                      </v-btn>

                      <v-btn :value="8" size="small" width="50px" >
                        8
                      </v-btn>
                    </v-btn-toggle>

                    <p class="mt-4">Image size and aspect {{  w_x_h }}</p>
                    
                    <v-row style="width:395px;margin-top:2px">
                      <v-col cols="4" md="4" >
                        <v-icon class="pl-4">mdi-image-area</v-icon>
                      </v-col>
                      <v-col cols="4" md="4" :align="'center'">
                        <v-icon>mdi-image</v-icon>
                      </v-col>
                      <v-col cols="4" md="4" :align="'end'">
                        <v-icon  class="pr-4">mdi-image-album</v-icon>
                      </v-col>
                    </v-row>

                    <v-btn-toggle
                      v-model="aspect"
                      rounded="0"
                      divided
                      style="min-width:395px;margin-top:2px;margin-left:-2px"
                    >
                      <v-btn value="7:4" size="x-small" >
                        7 : 4
                      </v-btn>
                      <v-btn value="3:2" size="x-small" >
                        3 : 2
                      </v-btn>
                      <v-btn value="4:3" size="x-small" >
                        4 : 3
                      </v-btn>
                      <v-btn value="5:4" size="x-small" >
                        5 : 4
                      </v-btn>
                      <v-btn value="1:1" size="x-small" >
                        1 : 1
                      </v-btn>
                      <v-btn value="4:%" size="x-small" >
                        4 : 5
                      </v-btn>
                      <v-btn value="3:4" size="x-small" >
                        3 : 4
                      </v-btn>
                      <v-btn value="2:3" size="x-small" >
                        2 : 3
                      </v-btn>
                      <v-btn value="4:7" size="x-small" >
                        4 : 7
                      </v-btn>
                    </v-btn-toggle>

                    <v-btn 
                        style="text-transform: none !important;"
                        size="small"
                        class="mt-4" 
                        variant="text" 
                        prepend-icon="mdi-tune-vertical-variant"
                        @click="showAdvanced = !showAdvanced"
                      >
                      Advanced Settings
                    </v-btn>

                    <v-row style="margin-top: 2px;margin-left: 1px" v-if="showAdvanced" >
                      <v-col cols="12" md="6">
                        <v-layout>
                        <p>Prompt strength</p>
                        <v-tooltip location="top" text="Prompt strength determines how much the final image will portray your prompts.">
                          <template v-slot:activator="{ props }">
                            <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </v-layout>

                        <v-text-field
                          prepend-inner-icon="mdi-dots-grid"
                          placeholder="Auto"
                          type="number"
                          min="-1"
                          max="1"
                          density="compact"
                          v-model="promptStrength"
                          variant="outlined"
                          hint="Range 0 to 1"
                        ></v-text-field>


                      </v-col>
                      <v-col cols="12" md="6" :style="windowWidth < 940 ? 'margin-top: -20px;' : ''">
                        <v-layout>
                            <p>Generation steps</p>
                          <v-tooltip location="top" text="Generation steps is how many times the image is sampled. More steps may be more accurate.">
                            <template v-slot:activator="{ props }">
                              <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                            </template>
                          </v-tooltip>
                        </v-layout>
                        <v-text-field
                          prepend-inner-icon="mdi-stairs"
                          placeholder="Auto"
                          type="number"
                          min="10"
                          max="150"
                          density="compact"
                          v-model="generationSteps"
                          variant="outlined"
                          hint="Range 10 to 150"
                        ></v-text-field>

                      </v-col>
                    </v-row>

                    <v-row style="margin-top: -20px;margin-left: 1px" v-if="showAdvanced" >
                      <v-col cols="12" md="6">

                        <v-layout>
                          <p>Seed</p>
                          <v-tooltip location="top" text="Seed determines the initial noise. Using the same seed with the same settings will create a very similar image.">
                            <template v-slot:activator="{ props }">
                              <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                            </template>
                          </v-tooltip>
                        </v-layout>
                        <v-text-field
                          prepend-inner-icon="mdi-sprout-outline"
                          placeholder="Auto"
                          type="number"
                          min="0"
                          max="4294967295"
                          density="compact"
                          v-model="seed"
                          variant="outlined"
                          hint="Range 0 to 4294967295"
                        ></v-text-field>
                      </v-col>

                      <v-col :style="windowWidth < 940 ? 'margin-top: -20px;' : ''">
                      
                      </v-col>
                    </v-row>

                    <v-row style="margin-top: -20px;margin-left: 1px" v-if="showAdvanced" >
                      <v-col cols="12" md="12">
                        <v-layout>
                          <p>Model</p>
                          <v-tooltip location="top" text="The Model to user to generate the image. Default is latest stable version.">
                            <template v-slot:activator="{ props }">
                              <v-icon class="ml-2" size="small" v-bind="props">mdi-information-outline</v-icon>
                            </template>
                          </v-tooltip>
                        </v-layout>
                        <v-select
                          return-object
                          v-model="model"
                          :items="items"
                          item-title="name"
                          item-value="id"
                          density="compact"
                          variant="outlined"
      
                        ></v-select>
                      </v-col>
                    </v-row>
                </v-col>
              </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-row class="mt-2">
          <v-col >
            <v-btn 
                prepend-icon="mdi-auto-fix" 
                size="large" 
                style="width:100%;text-transform: none !important" 
                color="deep-purple-lighten-1"
                :disabled="prompt === ''"
                @click="startMemeGeneration()"
                :loading="generateLoading"
            >
              Start Meme Generation
            </v-btn>
          </v-col>
        </v-row>

       </v-col>

       <!-- ################ Generated Photo Box ##########################-->
       <v-col cols="12" :md="getDrawer ? 5 : 6" :align="center">
        <v-card theme="dark" 
                height="100%"
                variant="outlined"
                class="pa-4"
        >
          <v-row>
            <template v-for="(index) in parseInt(imagesCount)">
              <v-col cols="12" :md="parseInt(imagesCount) === 1 ? 12 : 6" class="pa-2">

                  <v-img
                    v-if="generatedArr.length === 0"
                    style="border-radius: 5px;"
                    :src="'/img/home/placeholder-square.webp'"
                    :lazy-src="'/img/home/placeholder-square.webp'"
                    :aspect-ratio="w_x_h.split('x')[0]/w_x_h.split('x')[1]"
                    cover
                    class="bg-grey-lighten-2"
                  > 
                  <v-row :align="'center'" style="height: 100%;">
                    <v-col cols="12" :align="'center'">
                      <v-progress-circular
                        class="pt-4"
                        v-if="generateLoading"
                        :size="50"
                        :width="7"
                        color="purple"
                        indeterminate
                      ></v-progress-circular>
                      <v-icon v-else 
                              class="pt-4"
                              color="purple" 
                              :size="50"
                      >
                        mdi-checkbox-blank-circle-outline
                      </v-icon>
                    </v-col>
                  </v-row>
                  </v-img>

                  <v-img
                    v-if="generatedArr.length > 0"
                    :style="generatedArr[index - 1].selected ? 'border: 4px solid green;border-radius: 5px;' : 'border-radius: 5px;'"
                    :src="'data:image/png;base64,' + generatedArr[index -1].base64"
                    :lazy-src="'data:image/png;base64,' + generatedArr[index -1].base64"
                    :aspect-ratio="w_x_h.split('x')[0]/w_x_h.split('x')[1]"
                    cover
                    class="bg-grey-lighten-2"
                    @mouseover="showToolbar[index - 1].show = true"
                    @mouseleave="showToolbar[index - 1].show = false"
                  >
                    <v-toolbar color="grey" style="opacity:0.8" v-show="showToolbar[index - 1].show" >

                      <v-tooltip text="Select Image" location="top">
                        <template v-slot:activator="{ props }">
                          <v-btn icon @click="selectImage(index - 1)" v-bind="props">
                            <v-icon>mdi-select</v-icon>
                          </v-btn>
                        </template>
                      </v-tooltip>

                      <v-tooltip text="Download Image" location="top">
                        <template v-slot:activator="{ props }">
                          <v-btn icon @click="downloadImage(index - 1)" v-bind="props">
                            <v-icon>mdi-tray-arrow-down</v-icon>
                          </v-btn>
                        </template>
                      </v-tooltip>

                      <v-tooltip text="Delete Image" location="top">
                        <template v-slot:activator="{ props }">
                          <v-btn icon @click="deleteImage(index - 1)" v-bind="props">
                            <v-icon>mdi-trash-can-outline</v-icon>
                          </v-btn>
                        </template>
                      </v-tooltip>

                    </v-toolbar>
                    <v-btn
                      v-if="generatedArr[index - 1].selected"
                      variant="text"
                      size="large"
                      style="position: absolute;bottom:0;right: 0;"
                      color="green"
                      icon="mdi-check-circle-outline"
                    >
                    </v-btn>
                  </v-img>
              </v-col>
            </template>
          </v-row>

        </v-card>
       </v-col>

       <v-col cols="12" :md="getDrawer ? 3 : 2" :align="center">
        
        <v-btn  prepend-icon="mdi-tune-variant" 
                style="width:100%;text-transform: none !important" 
                color="indigo-darken-2"
                :disabled="generatedArr.length === 0"
                @click="modifyPrompt()"
        >
          Modify Prompt
        </v-btn>

        <v-btn  class="mt-2"
                prepend-icon="mdi-restart" 
                style="width:100%;text-transform: none !important" 
                color="deep-purple-lighten-1"
                :disabled="generatedArr.length === 0"
                @click="startOverClicked"
        >
          Start Over
        </v-btn>

        <v-btn  class="mt-2"
                variant="outlined" 
                prepend-icon="mdi-image-edit-outline" 
                style="width:100%;text-transform: none !important" 
                @click="openDrafts()"
        >
          Open Saved Drafts
        </v-btn>

        <v-btn  class="mt-2"
                variant="outlined" 
                prepend-icon="mdi-arrow-right-bold-circle-outline" 
                style="width:100%;text-transform: none !important;box-shadow: 0px 0px 5px 5px rgb(138, 190, 145);" 
                color="green-lighten-1"
                :disabled="selectedImage === null"
                @click="selectedImageClicked()"
        >
          Use Selected Image
        </v-btn>

       </v-col>
    </v-row>

    <!-- ##################### Add Meme Text To Image #################### -->
    <v-row class="pt-12 pl-4 pr-4" :align="center" v-if="view === 'memetext'">
      <v-btn @click="view = 'generate'" prepend-icon="mdi-arrow-left-bold" class="mt-1 ml-3">Back</v-btn>
      <v-col cols="12" md="12">
        <CreateMemeText 
          :isMobileDevice="isMobileDevice" 
          :dark="dark"
          :windowWidth="windowWidth" 
          :windowHeight="windowHeight"
          :drawer="drawer"
          :selectedImage="selectedImage"
          v-on:generateMoreClicked="startOverClicked()"
        >
        </CreateMemeText>
      </v-col>
    </v-row>

    <!-- ##################### EDIT Images ################################-->
      
      <v-row class="pt-12 pl-4 pr-4" :align="center" v-if="view === 'edit'">
        <v-col cols="12" md="4" :align="center">
          <v-layout class="mb-4">
              <v-tooltip text="Image Generation Mode" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn 
                      v-if="view === 'generate'"
                      width="49%" 
                      class="mr-2" 
                      prepend-icon="mdi-view-grid-plus" 
                      color="white"
                      @click="view = 'generate'"
                      v-bind="props"
                  >
                    Generate
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Image Generation Mode" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn 
                      v-if="view === 'edit'"
                      width="49%" 
                      class="mr-2" 
                      variant="outlined" 
                      prepend-icon="mdi-view-grid-plus"
                      @click="view = 'generate'"
                      v-bind="props"
                  >
                  Generate
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Edit Images From your Drafts" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn 
                      v-if="view === 'generate'"
                      width="49%" 
                      variant="outlined" 
                      prepend-icon="mdi-square-edit-outline"
                      @click="openDrafts()"
                      v-bind="props"
                  >
                    Edit
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Edit Images From your Drafts" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn 
                      v-if="view === 'edit'"
                      width="49%" 
                      prepend-icon="mdi-square-edit-outline"
                      color="white"
                      @click="openDrafts()"
                      v-bind="props"
                  >
                    Edit
                  </v-btn>
                </template>
              </v-tooltip>
            </v-layout>
          </v-col>
        </v-row>

        <v-row :class="isMobileDevice ? 'ml-1 mr-1' : 'ml-1 mr-4'" :align="center" v-if="view === 'edit'">
         
          <v-col cols="12" md="5" >

            <v-card
              class="mx-auto"
            >
              <div class="text-h6 mt-4 ml-4">My Draft Generations</div>
              <v-list color="#2b2b2b">
                <template v-for="(item, index) in draftsArr" >

                  <v-list-group >
                    <template v-slot:activator="{ props }">

                    <v-list-item
                      v-bind="props"
                      prepend-icon="mdi-account-circle"
                      @click="openDraftsFolder(item.path, index)"
                    >
                      <template v-slot:prepend>
                        <v-avatar color="blue-lighten-1">
                          <v-icon color="white">mdi-image-multiple-outline</v-icon>
                        </v-avatar>
                      </template>

                      <v-list-item-title style="color: #FFF;font-weight:bold">{{ item.name  }}</v-list-item-title>
                      
                    </v-list-item>

                    </template>

                    <template v-for="(file, index) in item.files" >
                      <v-list-item
                        class="pa-2"
                        link
                        :value="file"
                        @click="selectedDraftClicked(file)"
                        active-color="primary"
                      >
                      <template v-slot:prepend>
                        <v-avatar color="purple-lighten-1" style="border-radius: 2px;" size="65">
                          <v-img :src="file.url" style="width: 65px;height:65px;">
                          </v-img>
                        </v-avatar>
                      </template>

                      <v-list-item-title style="color: #FFF;font-size: 22px;font-weight: bold;">{{ file.metadata.name  }}</v-list-item-title>

                      <template v-slot:append>
                        <v-icon
                          size="x-large"
                          color="purple-lighten-1"
                        >
                         mdi-image-check-outline
                        </v-icon>
                      </template>

                      </v-list-item>
                    </template>

                  </v-list-group>

                </template>
              </v-list> 
            </v-card>
          </v-col>

          <v-col cols="12" md="7" >
            <v-card
              class="mx-auto pl-2 pr-2"
              min-height="420"
            >
              <div v-if="selectedDraft.metadata.name === ''" class="text-h6 mt-4 ml-4">Select an Image from your drafts</div>
              <div v-else class="text-h6 mt-4 ml-4 mb-4">{{ selectedDraft.metadata.name }}</div>

              <v-row v-if="selectedDraft.metadata.name !== ''" :class="isMobileDevice ? '' : 'ml-2'">
                <v-col cols="12" md="6">
                  <v-img :src="selectedDraft.url" style="width: 350px;border-radius: 5px;">
                  </v-img>
                </v-col>

                <v-col cols="12" md="6" class="pr-8">
                  <span>Prompt used</span>
                  <v-textarea
                    v-model="draftPrompt"
                    class="mb-4"
                    auto-grow
                    variant="outlined"
                    rows="3"
                    row-height="25"
                    shaped
                    disabled
                  ></v-textarea>
                  <v-btn style="width:100%;text-transform: none !important;"
                         variant="outlined" 
                         prepend-icon="mdi-arrow-right-bold-circle-outline" 
                         color="green-lighten-1"
                         @click="draftContinueClicked()"
                  >
                    Continue with this Draft
                  </v-btn>
                </v-col>

              </v-row>

            </v-card>
          </v-col>

        </v-row>

  </v-card>

  <!-- #################################  DIALOGS ################################ -->
  <v-dialog v-model="deleteDialog" persistent min-width="290" max-width="390">
    <v-card>
      <v-card-title class="headline">Delete Selected Image</v-card-title>
      <v-card-text class="subheading">Please, confirm.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="red darken-1" text @click="deleteRowConfirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
<script>
import firebase from 'firebase/app'
import 'firebase/storage'
import { db } from '@/main'
import MemeMasterAPI from '../../clients/MemeMasterAPI';
import CreateMemeText from './CreateMemeText'
export default {
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean,
    toDrafts: Boolean
  },
  data: () => ({
    loading: false,
    deleteDialog: false,
    generateLoading: false,
    storageRef: null,
    view: 'generate',
    panel: ['settings'],
    stylePreset: {name: 'Enhance', id: 'enhance', img: '/img/styles/enhance.png'},
    imagesCount: 1,
    aspect: '1:1',
    showAdvanced: false,
    prompt: '',
    promptStrength: 0.5,
    generationSteps: 50,
    seed: 0,
    model: {name: 'Stable Diffusion v2.1', id: 'stable-diffusion-512-v2-1'},
    items: [
      { name: 'Stable Diffusion v2.1', id: 'stable-diffusion-512-v2-1' },
      { name: 'Stable Diffusion v2.1-768', id: 'stable-diffusion-768-v2-1' },
      { name: 'SDXL Beta', id: 'stable-diffusion-xl-beta-v2-2-2' }
    ],
    images: [
      {name: 'Enhance', id: 'enhance', img: '/img/styles/enhance.png'},
      {name: '3D Model', id: '3d-model', img: '/img/styles/3d-model.png'},
      {name: 'Analog Film', id: 'analog-film', img: '/img/styles/analog-film.png'},
      {name: 'Anime', id: 'anime', img: '/img/styles/anime.png'},
      {name: 'Cinematic', id: 'cinematic', img: '/img/styles/cinematic.png'},
      {name: 'Comic Book', id: 'comic-book', img: '/img/styles/comic-book.png'},
      {name: 'Digital Art', id: 'digital-art', img: '/img/styles/digital-art.png'},
      {name: 'Fantasy Art', id: 'fantasy-art', img: '/img/styles/fantasy-art.png'},
      {name: 'Isometric', id: 'isometric', img: '/img/styles/isometric.png'},
      {name: 'Line Art', id: 'line-art', img: '/img/styles/line-art.png'},
      {name: 'Low Poly', id: 'low-poly', img: '/img/styles/low-poly.png'},
      {name: 'Craft Clay ', id: 'modeling-compound', img: '/img/styles/modeling-compound.png'},
      {name: 'Neon Punk', id: 'neon-punk', img: '/img/styles/neon-punk.png'},
      {name: 'Origami', id: 'origami', img: '/img/styles/origami.png'},
      {name: 'Photographic', id: 'photographic', img: '/img/styles/photographic.png'},
      {name: 'Pixel Art', id: 'pixel-art', img: '/img/styles/pixel-art.png'},
    ],
    draftsArr: [],
    draftsImagesArr: [],
    selectedDraft: {
      metadata: {
        name: ''
      }
    },
    draftPrompt: '',
    generatedArr: [],
    selectedImage: null,
    showToolbar: [
      { show: false },
      { show: false },
      { show: false },
      { show: false }
    ],
  }),
  components: {
    CreateMemeText
  },
  watch: {
    toDrafts () {
      if (this.toDrafts) {
        this.view = 'edit'
        this.openDrafts()
      } else {
        this.view = 'generate'
      }
    }
  },
  created(){
    this.getGenerationEngines()
    // Get a reference to the storage service
    this.storageRef = firebase.storage().ref()
    if (this.toDrafts) {
      this.view = 'edit'
      this.openDrafts()
    }
  },
  computed:{
    getUser () {
      return this.$store.state.user
    },
    getDrawer () {
      return this.$store.state.drawer
    },
    w_x_h () {
      switch (this.aspect) {
        case '7:4':
          return '896 x 512';
        case '3:2':
          return '768 x 512';
        case '4:3':
          return '704 x 512';
        case '5:4':
          return '640 x 512'; 
        case '1:1':
          return '512 x 512'; 
        case '4:5':
          return '512 x 640'; 
        case '3:4':
          return '512 x 704';
        case '2:3':
          return '512 x 768';
        case '4:7':
          return '512 x 896';
        default:
          return '512 x 512';
      }
    },
  },
  methods:{
    getGenerationEngines () {
      this.items = []
      Promise.resolve(MemeMasterAPI.getGenerationEngines())
        .then(result => {
          console.log(result)
          // Handle Result
          this.items = result.data.message
        })
        .catch(err => {
          // this.loading = false
          console.log('Error generating Meme.', err)
          // show friendly error in user screen
        })
    },
    openDrafts () {
      this.draftsArr = []
      this.view = 'edit'
      
      // Read user storage folder
      // Create a reference under which you want to list
      var listRef = this.storageRef.child('drafts/' + this.getUser.uid)

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
            this.draftsArr.push(obj)
  
          });
          console.log(this.draftsArr)
          this.draftsArr.reverse()
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
    },
    async openDraftsFolder (path, index) {
      this.draftsImagesArr = []
      /* if (this.draftsImagesArr.length > 0 ) {
        console.log('No reload needed')
        return
      } */
      var listRef = this.storageRef.child(path);
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
              this.draftsImagesArr.push(img)
            }).catch((error) => {
              // Uh-oh, an error occurred!
            })
          }).catch((error) => {
            // Uh-oh, an error occurred!
          })
        })
        console.log(this.draftsImagesArr)
        this.draftsArr[index].files = this.draftsImagesArr
      }).catch((error) => {
        // Uh-oh, an error occurred!
      })

    },
    selectedDraftClicked (item) {
      this.selectedDraft = item
      this.draftPrompt = this.getDraftPrompt(item)
      console.log(item)
    },
    getDraftPrompt (item) {
      let promptUsed = JSON.parse(item.metadata.customMetadata.prompt);
      console.log(promptUsed)
      return promptUsed.text_prompts[0].text
    },
    draftContinueClicked () {
      // convert image to base 64 string
      this.generatedArr = []
      this.selectedImage = null
      this.getBase64(this.selectedDraft.url)
      // Set all generation settings from propmts
      let promptUsed = JSON.parse(this.selectedDraft.metadata.customMetadata.prompt);
      this.prompt = promptUsed.text_prompts[0].text
      this.stylePreset =  this.images.find(item => item.id === promptUsed.style_preset)
      this.promptStrength = parseFloat(promptUsed.text_prompts[0].weight) ?? 0.5
      this.generationSteps = parseFloat(promptUsed.steps)
      this.seed = parseFloat(promptUsed.seed)
      this.model = this.items.find(item => item.id === this.selectedDraft.metadata.customMetadata.model ?? 'stable-diffusion-512-v2-1') 
      var w_h = promptUsed.width + ' x ' + promptUsed.height
      // Set the Aspect from width x height
      switch (w_h) {
        case '896 x 512':
          this.aspect = '7:4';
          break;
        case '768 x 512':
          this.aspect = '3:2';
          break;
        case '704 x 512':
          this.aspect = '4:3';
          break;
        case '640 x 512':
          this.aspect = '5:4'; 
          break;
        case '512 x 512':
          this.aspect = '1:1'; 
          break;
        case '512 x 640':
          this.aspect = '4:5'; 
          break;
        case '512 x 704':
          this.aspect = '3:4';
          break;
        case '512 x 768':
          this.aspect = '2:3';
          break;
        case '512 x 896':
          this.aspect = '4:7';
          break;
        default:
          this.aspect = '1:1';
          break;
      }
      this.view = 'generate'
      console.log(this.aspect)
    },
    getBase64 (url) {
      
      Promise.resolve(MemeMasterAPI.getFirestoreImage(url))
        .then(result => {
          console.log(result)
          // Handle Result
          // this.items = result.data.message
          // var obj = {
            // base64: result.data.message.base64
            // selected: true
          // }
          // this.generatedArr.push(obj)
        })
        .catch(err => {
          // this.loading = false
          console.log('Error generating Meme.', err)
          // show friendly error in user screen
        })
        
      /* fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          console.log(buffer)
          let base64 = btoa(
            new Uint8Array(buffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );
          console.log(base64)
          var obj = {
            base64: base64
          }
          this.generatedArr.push(obj)
        }); */
    },
    openPromptingGuide () {

    },
    async startMemeGeneration () {
      this.generateLoading = true
      this.generatedArr = []
      let genObject = {
        text_prompts: [
          {
            text: this.prompt,
            weight: parseFloat(this.promptStrength)
          },
        ],
        cfg_scale: 7, // Default
        clip_guidance_preset: 'NONE', // Default
        style_preset: this.stylePreset.id,
        height: parseInt(this.w_x_h.split('x')[1]),
        width: parseInt(this.w_x_h.split('x')[0]),
        samples: this.imagesCount,
        steps: this.generationSteps,
        seed: this.seed,
      }
      let configObj = {
        engine_id: this.model.id,
        uid: this.getUser.uid,
        username: this.getUser.displayName
      }
      console.log(genObject)
      console.log(configObj)
      Promise.resolve(MemeMasterAPI.generateTextToImage(genObject, configObj))
        .then(result => {
          console.log(result)
          // Handle Result
          this.generatedArr = []
          this.generatedArr = result.data.message.artifacts
          for (var i in this.generatedArr) {
            this.generatedArr[i].selected = false
          }
          this.generateLoading = false
        })
        .catch(err => {
          // this.loading = false
          console.log('Error generating Meme.', err)
          // show friendly error in user screen
        })
      /* try {
        // only oce a day according to mola_points_updated in fb
        const response = await MemeMasterAPI.generateMeme(genObject);
        console.log(response);
        res = response;
        
      } catch (err) {
        console.log(err);
        res = null;
      } */
    },
    modifyPrompt () {
      this.generatedArr = []
    },
    startOverClicked () {
      this.view = 'generate'
      this.prompt = ''
      this.imagesCount = 1,
      this.aspect = '1:1',
      this.showAdvanced = false,
      this.promptStrength = 0.5,
      this.generationSteps = 50,
      this.seed = 0
      this.generatedArr = []
      this.stylePreset = {name: 'Enhance', id: 'enhance', img: '/img/styles/enhance.png'}
      this.model = {name: 'Stable Diffusion v2.1', id: 'stable-diffusion-512-v2-1'}
      this.selectedImage = null
    },
    selectImage (index) {
      console.log(index)
      for (var i in this.generatedArr) {
        if (parseInt(i) === index) {
          console.log(i)
          console.log('index ' + i + ' set to true')
          this.generatedArr[i].selected = !this.generatedArr[i].selected
          this.selectedImage = this.generatedArr[i].selected ? this.selectedImage = this.generatedArr[i] : this.selectedImage = null
        } else {
          console.log('index ' + i + ' set to false')
          this.generatedArr[i].selected = false
        }
      }
      console.log(this.selectedImage)
    },
    selectedImageClicked () {
      this.view = 'memetext'
      console.log(this.selectedImage)
    },
    downloadImage (index) {
      let date = new Date().toISOString().substr(0, 10)
      this.downloadBase64File(this.generatedArr[index].base64, 'image/png', 'MemeMaster_' + date)
    },
    deleteImage (index) {
      this.deleteIndex = index
      this.deleteDialog =  true
    },
    deleteRowConfirm () {
      this.generatedArr.splice(this.deleteIndex, 1)
      this.imagesCount -= 1
      this.deleteDialog =  false
      if (this.generatedArr.length === 0) {
        this.startOverClicked()
      }
    },
    downloadBase64File (base64Data, contentType, fileName) {
      const linkSource = `data:${contentType};base64,${base64Data}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click()
    }
  }
}
</script>

<style lang="scss">
  .v-tooltip .v-overlay__content {
    background: rgba(var(--v-theme-surface-variant), 1) !important;
  }   
</style>
