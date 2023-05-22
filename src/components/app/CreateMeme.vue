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

    <v-row class="pt-12 pl-4 pr-4" :align="center" v-if="type === 'generate'" min-width="395">
       <v-col cols="12" md="4" :align="center" v-if="!isMobileDevice">

          <v-layout class="mb-4">
            <v-btn 
                v-if="type === 'generate'"
                width="49%" 
                class="mr-2" 
                prepend-icon="mdi-view-grid-plus" 
                color="white"
                @click="type = 'generate'"
            >
              Generate
            </v-btn>
            <v-btn 
                v-if="type === 'edit'"
                width="49%" 
                class="mr-2" 
                variant="outlined" 
                prepend-icon="mdi-view-grid-plus"
                @click="type = 'generate'"
            >
             Generate
            </v-btn>

            <v-btn 
                v-if="type === 'generate'"
                width="49%" 
                variant="outlined" 
                prepend-icon="mdi-square-edit-outline"
                @click="type = 'edit'"
            >
              Edit
            </v-btn>
            <v-btn 
                v-if="type === 'edit'"
                width="49%" 
                prepend-icon="mdi-square-edit-outline"
                color="white"
                @click="type = 'generate'"
            >
              Edit
            </v-btn>
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
              <v-expansion-panel-text style="margin-left:-15px">
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
                    <v-list>
                        <template v-for="(item) in images">
                          <v-list-item class="pa-2" link @click="stylePreset = item">
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
                      <v-btn value="1" size="small" width="60px">
                        1
                      </v-btn>

                      <v-btn value="2" size="small" width="60px">
                        2
                      </v-btn>

                      <v-btn value="3" size="small" width="60px">
                        3
                      </v-btn>

                      <v-btn value="4" size="small" width="60px">
                        4
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
                      style="width:100%;margin-top:1px"
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
                        <v-layout>
                        <p>Model</p>
                        <v-tooltip location="top" text="Text.">
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
                          single-line
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
       <v-col cols="12" :md="drawer ? 5 : 6" :align="center">
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
                  :lazy-src="'/img/placeholder-square.webp'"
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
                  style="border-radius: 5px;"
                  :src="'data:image/png;base64,' + generatedArr[index -1].base64"
                  :lazy-src="'data:image/png;base64,' + generatedArr[index -1].base64"
                  :aspect-ratio="w_x_h.split('x')[0]/w_x_h.split('x')[1]"
                  cover
                  class="bg-grey-lighten-2"
                >
                </v-img>
              </v-col>
            </template>
          </v-row>

        </v-card>
       </v-col>

       <v-col cols="12" :md="drawer ? 3 : 2" :align="center" v-if="!isMobileDevice">
        
        <v-btn  prepend-icon="mdi-restart" 
                style="width:100%;text-transform: none !important" 
                color="deep-purple-lighten-1"
                :disabled="generatedArr.length !== 0"
        >
          Start Over
        </v-btn>

        <v-btn  class="mt-2"
                variant="outlined" 
                prepend-icon="mdi-arrow-right-bold-circle-outline" 
                style="width:100%;text-transform: none !important" 
                color="green-lighten-1"
                :disabled="generatedArr.length !== 0"
        >
          Use Selected Image
        </v-btn>

       </v-col>

    </v-row>

    <!-- ##################### EDIT Images ################################-->
    <v-row class="pt-12 pl-4 pr-4" :align="center" v-if="type === 'edit'">
       <v-col cols="12" md="4" :align="center" v-if="!isMobileDevice">

          <v-layout class="mb-6">
            <v-btn 
                v-if="type === 'generate'"
                width="49%" 
                class="mr-2" 
                prepend-icon="mdi-view-grid-plus" 
                color="white"
                @click="type = 'generate'"
            >
              Generate
            </v-btn>
            <v-btn 
                v-if="type === 'edit'"
                width="49%" 
                class="mr-2" 
                variant="outlined" 
                prepend-icon="mdi-view-grid-plus"
                @click="type = 'generate'"
            >
             Generate
            </v-btn>

            <v-btn 
                v-if="type === 'generate'"
                width="49%" 
                variant="outlined" 
                prepend-icon="mdi-square-edit-outline"
                @click="type = 'edit'"
            >
              Edit
            </v-btn>
            <v-btn 
                v-if="type === 'edit'"
                width="49%" 
                prepend-icon="mdi-square-edit-outline"
                color="white"
                @click="type = 'generate'"
            >
              Edit
            </v-btn>
          </v-layout>
        </v-col>
      </v-row>

  </v-card>

</template>
<script>
// import { db } from '@/main'
import MemeMasterAPI from '../../clients/MemeMasterAPI';
export default {
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    generateLoading: false,
    type: 'generate',
    panel: ['settings'],
    stylePreset: {name: 'Enhance', id: 'enhance', img: '/img/styles/enhance.png'},
    imagesCount: '1',
    aspect: '1:1',
    showAdvanced: false,
    prompt: '',
    promptStrength: 0.5,
    generationSteps: 50,
    seed: 0,
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
    model: {name: 'Stable Diffusion v2.1', id: 'stable-diffusion-512-v2-1'},
    generatedArr: []
  }),
  created(){
    
  },
  computed:{
    getUser () {
      return this.$store.state.user
    },
    w_x_h () {
      switch (this.aspect) {
        case '7:4':
          return '896 x 512';
        case '3:2':
          return '768 x 512';
        case '4:3':
          return '683 x 512';
        case '5:4':
          return '640 x 512'; 
        case '1:1':
          return '512 x 512'; 
        case '4:5':
          return '512 x 640'; 
        case '3:4':
          return '512 x 683';
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
    openPromptingGuide () {

    },
    async startMemeGeneration () {
      this.generateLoading = true
      let genObject = {
        text_prompts: [
          {
            text: this.prompt,
            weight: this.promptStrength
          },
        ],
        cfg_scale: 7, // Default
        clip_guidance_preset: 'NONE', // Default
        style_preset: this.stylePreset.id,
        height: parseInt(this.w_x_h.split('x')[1]),
        width: parseInt(this.w_x_h.split('x')[0]),
        samples: parseInt(this.imagesCount),
        steps: this.generationSteps,
        seed: this.seed,
      }
      let configObj = {
        engine_id: this.model.id,
        user_id: this.getUser.uid
      }
      console.log(genObject)
      console.log(configObj)
      Promise.resolve(MemeMasterAPI.generateTextToImage(genObject, configObj))
      .then(result => {
        console.log(result)
        // Handle Result
        this.generatedArr = []
        this.generatedArr = result.data.message.artifacts
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
    }
  }
}
</script>

<style lang="scss">
  .v-tooltip .v-overlay__content {
    background: rgba(var(--v-theme-surface-variant), 1) !important;
  }   
</style>
