<template>
  <div id="generate">
    <v-card theme="dark" color="#2b2b2b" class="mt-16 mb-1" height="100%">

      <!-- ######################################################################################## -->
      <!-- ############################ Generate Text to Video #################################### -->
      <!-- ######################################################################################## -->
      <v-row class="pt-12 pl-4 pr-4 pb-12" v-if="view === 'generate'" >
        <v-col cols="12" md="4" :align="center" >

            <v-btn 
                  class="mb-4"
                  size="large"
                  prepend-icon="mdi-book-open-variant" 
                  style="width:100%;text-transform: none !important" 
                  color="blue-lighten-1"
                  @click="openPromptingGuide()"
              >
              Text to Video Guide
            </v-btn>            

            <v-textarea
              v-model="prompt"
              class="mb-2"
              label="Prompt"
              auto-grow
              variant="outlined"
              :placeholder="'Type your prompt here, use the sample prompts in the guide above to assist you.'"
              persistent-placeholder
              clearable
              rows="3"
              maxlength="2000"
              row-height="25"
              shaped
              hint="Max. 2000 characters"
              counter
            ></v-textarea>

            <v-row class="mt-2">
              <v-col >
                <v-btn v-if="!enableStopGenerating"
                    prepend-icon="mdi-auto-fix" 
                    size="large" 
                    style="width:100%;text-transform: none !important" 
                    color="blue-lighten-1"
                    :disabled="prompt === ''"
                    @click="startMemeGeneration()"
                    :loading="generateLoading"
                >
                  Start Video Generation
                </v-btn>

                <v-btn v-if="enableStopGenerating"
                    prepend-icon="mdi-close-octagon-outline" 
                    size="large" 
                    style="width:100%;text-transform: none !important" 
                    color="pink-darken-1"
                    @click="stopGenerationClicked()"
                >
                  Stop Generating
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
                      :src="'/img/home/placeholder-square_blue.webp'"
                      :lazy-src="'/img/placeholder-square_blue.webp'"
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
                          color="blue"
                          indeterminate
                        ></v-progress-circular>
                        <v-icon v-else 
                                class="pt-4"
                                color="blue" 
                                :size="50"
                        >
                          mdi-checkbox-blank-circle-outline
                        </v-icon>
                      </v-col>
                    </v-row>
                    </v-img>

                    <vue3-video-player
                      v-if="generatedArr.length > 0"
                      autoplay
                      :src="source"
                      :title="videoName"
                      @ended="playEnded"
                      :cover="cover"
                      :view-core="viewCore.bind(null, 'video1')"
                    >
                      <template #cusControls>
                        <picture-in-picture :player="players['video1']" />
                        <span class="btn-play" @click="play('video1')">play</span>
                      </template>
                    </vue3-video-player>

                    <!-- <v-img
                      v-if="generatedArr.length > 0"
                      :style="generatedArr[index - 1].selected ? 'border: 4px solid green;border-radius: 5px;' : 'border-radius: 5px;'"
                      :src="'data:image/png;base64,' + generatedArr[index -1].base64"
                      :lazy-src="'data:image/png;base64,' + generatedArr[index -1].base64"
                      :aspect-ratio="w_x_h.split('x')[0]/w_x_h.split('x')[1]"
                      cover
                      class="bg-grey-lighten-2"
                      @mouseover="showToolbar[index - 1].show = true"
                      @mouseleave="showToolbar[index - 1].show = false"
                      @click="selectImage(index - 1)"
                    >
                      <v-toolbar color="grey" style="opacity:0.8" v-show="showToolbar[index - 1].show" >

                        <v-tooltip text="Select Image" location="top">
                          <template v-slot:activator="{ props }">
                            <v-btn icon @click.stop="selectImage(index - 1)" v-bind="props">
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
                    </v-img> -->
                </v-col>
              </template>
            </v-row>

          </v-card>
        </v-col>

        <v-col cols="12" :md="getDrawer ? 3 : 2" :align="center">
          
          <!--<v-btn  prepend-icon="mdi-tune-variant" 
                  style="width:100%;text-transform: none !important" 
                  color="indigo-darken-2"
                  :disabled="generatedArr.length === 0"
                  @click="modifyPrompt()"
          >
            Modify Prompt
          </v-btn> -->

          <v-btn  class="mt-2"
                  prepend-icon="mdi-restart" 
                  style="width:100%;text-transform: none !important" 
                  color="blue-lighten-1"
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

          <v-btn  class="mt-3"
                  variant="outlined" 
                  prepend-icon="mdi-arrow-right-bold-circle-outline" 
                  style="width:100%;text-transform: none !important;box-shadow: 0px 0px 5px 5px rgb(138, 190, 145);" 
                  color="green-lighten-1"
                  :disabled="selectedImage === null"
                  @click="selectedImageClicked()"
          >
            Add Meme Caption
          </v-btn>
          <p class="mt-2 text-center" v-if="generatedArr.length > 0 && selectedImage === null">Click on image to select</p>

        </v-col>
    </v-row>

    <!-- ######################################################################################## -->
    <!-- ############################ Add Meme Caption To Image ################################## -->
    <!-- ######################################################################################## -->
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
        <v-col cols="12" md="3" :align="center">
          <v-layout class="mb-4">
              <v-tooltip text="Image Generation Mode" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn 
                      v-if="view === 'generate'"
                      width="100%" 
                      class="mr-2" 
                      prepend-icon="mdi-view-grid-plus" 
                      color="white"
                      @click="view = 'generate'"
                      v-bind="props"
                  >
                  Back To Generate
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Image Generation Mode" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn 
                      v-if="view === 'edit'"
                      width="100%" 
                      class="mr-2" 
                      variant="outlined" 
                      prepend-icon="mdi-view-grid-plus"
                      @click="view = 'generate'"
                      v-bind="props"
                  >
                  Back To Generate
                  </v-btn>
                </template>
              </v-tooltip>

              <!-- <v-tooltip text="Edit Images From your Drafts" location="top">
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
              </v-tooltip> -->
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
                        <!-- <v-icon
                          size="x-large"
                          color="deep-purple-lighten-1"
                        >
                          mdi-image-check-outline
                        </v-icon> -->


                        <v-icon
                          size="x-large"
                          color="red-lighten-1"
                          @click.stop="deleteDraftImage(file, index)"
                        >
                          mdi-trash-can-outline
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

    <!-- ################################################################################### -->
    <!-- ############################## PROMPT GUIDE ####################################### -->
    <!-- ################################################################################### -->
    <v-dialog
          v-model="promptGuideDialog"
          fullscreen
        >
          <v-card theme="dark" color="#2b2b2b">
            <v-toolbar
              color="deep-purple-darken-2"
            >
            <v-toolbar-title>Meme Master Prompt Guide</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn
                icon
                @click="promptGuideDialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text :class="isMobileDevice ? 'ml-4 mr-4' : 'ml-16 mr-16'">
              <p class="text-h6 mb-8">After reading this document and applying these simple steps, you’ll be able to generate better images with the same amount of effort.</p>

              <v-expansion-panels multiple>
                <v-expansion-panel>
                  <v-expansion-panel-title class="text-h5 pt-2 font-weight-bold">1. Raw prompt</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p>Raw prompt is the simplest way of describing what you want to generate, for instance;<br><br>
                      1. Princess<br>
                      2. A warrior with a sword<br>
                      3. Skeleton<br><br>
                      This is the basic building block of any prompt. 
                      Most new people start by only using raw prompts, this is usually a mistake as the images you generate like this tend to get random and chaotic.<br><br> 
                      In the next sections you will learn how to apply styles to improve your prompting and fine tune tune your results.
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="text-h5 pt-2 font-weight-bold">2. Style</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p>Style is a crucial part of the prompt. The AI, when missing a specified style, usually chooses the one it has seen the most in related images, for example, if we generate a landscape, it would probably generate realistic or oil painting looking images. Having a well chosen style + raw prompt is sometimes enough, as the style influences the image the most right after the raw prompt.<br><br>
                      The most commonly used styles include:<br><br>
                      1. Realistic<br>
                      2. Oil painting<br>
                      3. Pencil drawing<br>
                      4. Concept art<br><br>
                      Examine them one by one to give an overview on how you might use these styles.<br><br>
                      In the case of a realistic image, there are various ways of making it the style, most resulting in similar images. Here are some commonly used techniques of making the image realistic:<br><br>
                      1. a photo of + raw prompt<br>
                      2. a photograph of + raw prompt<br>
                      3. raw prompt, hyperrealistic<br>
                      4. raw prompt, realistic<br><br>
                      You can of course combine these to get more and more realistic images.
                      To get oil painting you can just simply add “an oil painting of” to your prompt. This sometimes results in the image showing an oil painting in a frame, to fix this you can just re-run the prompt or use raw prompt + “oil painting”<br><br>
                      To make a pencil drawing just simply add “a pencil drawing of” to your raw prompt or make your prompt raw prompt + “pencil drawing”.
                      The same applies to landscape art.
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="text-h5 pt-2 font-weight-bold">3. Artist</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p>
                      To make your style more specific, or the image more coherent, you can use artists’ names in your prompt. For instance, if you want a very abstract image, you can add “made by Pablo Picasso” or just simply, “Picasso”.<br>
                      Below are lists of artists in different styles that you can use, but we always encourage you to search for different artists as it is a cool way of discovering new art.<br><br>
                      Portrait<br>
                      1. John Singer Sargent<br>
                      2. Edgar Degas<br>
                      3. Paul Cézanne<br>
                      4. Jan van Eyck<br><br>
                      Oil painting<br>
                      1. Leonardo DaVinci<br>
                      2. Vincent Van Gogh<br>
                      3. Johannes Vermeer<br>
                      4. Rembrandt<br><br>
                      Pencil/Pen drawing<br>
                      1. Albrecht Dürer<br>
                      2. Leonardo da Vinci<br>
                      3. Michelangelo<br>
                      4. Jean-Auguste-Dominique Ingres<br><br>
                      Landscape art<br>
                      1. Thomas Moran<br>
                      2. Claude Monet<br>
                      3. Alfred Bierstadt<br>
                      4. Frederic Edwin Church<br><br>
                      Mixing the artists is highly encouraged, as it can lead to interesting-looking art.
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="text-h5 pt-2 font-weight-bold">4. Finishing touches</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p>
                      This is the part that some people take to extremes, leading to longer prompts than this article. 
                      Finishing touches are the final things that you add to your prompt to make it look like you want. 
                      For instance, if you want to make your image more artistic, add “trending on artstation”. 
                      If you want to add more realistic lighting add “Unreal Engine.” You can add anything you want, but here are some examples:<br><br>
                      Highly detailed, surrealism, trending on art station, triadic color scheme, smooth, sharp focus, matte, elegant, 
                      the most beautiful image ever seen, illustration, digital paint, dark, gloomy, octane render, 8k, 4k, washed colors, 
                      sharp, dramatic lighting, beautiful, post processing, picture of the day, ambient lighting, epic composition.
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="text-h5 pt-2 font-weight-bold">5. Conclusion</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p>
                      Prompt engineering allows you to have better control of what the image will look like.<br>
                      It (if done right) improves the image quality by a lot in every aspect. 
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="text-h5 pt-2 font-weight-bold">6. Prompt samples</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p>
                      <span class="text-h5 font-weight-bold">Add these prompts after your subject choice, ie A car on a mountain... then add prompts below after it... example below.</span><br><br>
                      A CAR ON A MOUNTAIN, animation, clipart, sticker, colorful,  digital render, digital painting<br><br>

                      Dragon meme that showcases Pixar-like rendering and Unreal Engine cinematic sharpness<br><br>

                      Rabbit sticker illustration, trending on 99designs, high quality, svg, vector art<br><br>

                      Girl, pltn style, cute big circular reflective eyes, Pixar render, unreal engine cinematic smooth, intricate detail<br><br>

                      <span class="text-h5 font-weight-bold">Add you item at the beginning of the following prompts as above.</span><br><br>

                      pltn style, Crypto raccoon, cute big circular reflective eyes, Pixar render, unreal engine cinematic smooth, intricate detail<br><br>

                      pltn style, noir style, my stery, fog, trending on artstation, matte, dramatic lighting, detailed, retro, style by Blade Runner<br><br>

                      muted colors, highly detailed, simple, smooth and clean vector illustration, no jagged lines, vector art, smooth, artstation<br><br>

                      animation, clipart, sticker, colorful,  digital render, digital painting, beeple, noah bradley, cyril roland, ross tran, trending on artstation<br><br>

                      cosmic star dust, galactic, uhd, hdr, 8k, maximalist”<br><br>

                      swirling multicolored neon potion, ugly, deformed, jpeg, high resolution<br><br>

                      Music, Fashion designer logo, intricate details, UHD, sharp focus, golden ratio, octane render, volumetric lighting, Greg Rutkowski, acrylic painting, background by Craig Mullins, netflix, poster, ultra real<br><br>

                      Stylish vector art stickers: must be SVG, high-quality<br><br>

                      Create a high-quality SVG vector illustration<br><br>

                      Seeking innovative and high-quality sticker illustrations, SVG vector art preferred<br><br>

                      Creative call to designers: High-quality SVG vector art for a trending sticker<br><br>

                      SVG vector art, high-quality illustrations wanted<br><br>

                      Stand out on 99designs: SVG vector art sticker design challenge, high quality<br><br>

                      PLTN-style meme with a character possessing cute, big, circular reflective eyes. The image should have Pixar-like rendering, Unreal Engine cinematic smoothness, and intricate detail<br><br>

                      PLTN-style, with Pixar-rendered characters boasting big circular reflective eyes. Expecting Unreal Engine cinematic smoothness and attention to detail<br><br>

                      a meme that showcases Pixar-like rendering and Unreal Engine cinematic smoothness<br><br>

                      vibrant, Beeple-inspired animations and digital paintings for a clipart sticker. Trending style on ArtStation, with a touch of Cyril Roland's aesthetic and Noah Bradley's unique flair<br><br>

                      colorful sticker that blends the digital rendering styles of Beeple and Ross Tran, with a dash of Noah Bradley and Cyril Roland's artistry. Aim to trend on ArtStation<br><br>

                      animated clipart sticker, using vibrant colors and digital painting techniques. Draw inspiration from Beeple, Noah Bradley, Cyril Roland, and Ross Tran, and aim for the ArtStation trend list<br><br>
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                
              </v-expansion-panels>
    
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="promptGuideDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    <!-- ########################################################################### -->
    <!-- #################################  DIALOGS ################################ -->
    <!-- ########################################################################### -->
    
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

    <v-dialog v-model="deleteDraftDialog" persistent min-width="290" max-width="390">
      <v-card>
        <v-card-title class="headline">Delete Selected Draft</v-card-title>
        <v-card-text class="subheading">Name: {{ selectedItem.metadata.name}}</v-card-text>
        <v-card-text class="subheading">Please, confirm.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDraftDialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteDraftConfirm">Delete</v-btn>
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
import firebase from 'firebase/app'
import 'firebase/storage'
import { db } from '@/main'
import MemeMasterAPI from '../../clients/MemeMasterAPI'
import CreateMemeText from './CreateMemeText'
import { scroller } from 'vue-scrollto/src/scrollTo'
import imageCompression from 'browser-image-compression'
// import { readAndCompressImage } from 'browser-image-resizer'

import HLSCore from '@cloudgeek/playcore-hls';
import PictureInPicture from './PictureInPicture.vue';
import { Vitar } from '@cloudgeek/vitar';

export default {
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean,
    toDrafts: Boolean,
    toUpload: Boolean
  },
  data: () => ({
    loading: false,
    snackbar: false,
    snackbarText: '',
    deleteDialog: false,
    generateLoading: false,
    promptGuideDialog: false,
    deleteDraftDialog: false,
    storageRef: null,
    view: 'generate',
    panel: ['settings'],
    stylePreset: {name: 'Enhance', id: 'enhance', img: '/img/styles/enhance.png'},
    imagesCount: 1,
    aspect: '7:4',
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
    promptUsed: '',
    taskPending: false,
    generatedArr: [],
    enableStopGenerating: false,
    generationStopped: false,
    selectedImage: null,
    showToolbar: [
      { show: false },
      { show: false },
      { show: false },
      { show: false }
    ],
    uploadImage: '',
    uploadImageUrl: '',
    newWidth: 0,
    newHeight: 0,
    imageStrength: 0.35,
    showRowAlert: false,
    showRowAlertText: '',
    players: {},
    HLSCore: '',
    volume: 80,
    source: '',
    cover: '',
    videoName: ''
  }),
  components: {
    CreateMemeText,
    PictureInPicture,
    Vitar,
  },
  watch: {
    toDrafts () {
      if (this.toDrafts) {
        this.openDrafts()
      } else {
        this.view = 'generate'
      }
    },
    toUpload () {
      if (this.toUpload) {
        this.view = 'generate'
        this.panel = ['settings','upload']
        //this.openDrafts()
      } else {
        this.toUpload = false
      }
    }
  },
  created(){
    this.scrollToTop()
    this.getGenerationEngines()
    // Get a reference to the storage service
    this.storageRef = firebase.storage().ref()
    if (this.toDrafts) {
      // this.toUpload = false
      this.openDrafts()
    }
    if (this.toUpload) {
      this.view = 'generate'
      this.panel = ['settings','upload']
      // this.toDrafts = false
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
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#generate', 500, { offset: -64 });
      }, 200);
    },
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
            this.draftsArr.sort(function (a, b) {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(a.name) - new Date(b.name);
            });
  
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
      this.promptUsed = JSON.parse(item.metadata.customMetadata.prompt);
      console.log(this.promptUsed)
      return this.promptUsed.text_prompts[0].text
    },
    draftContinueClicked () {
      // convert image to base 64 string
      this.generatedArr = []
      this.selectedImage = null
      this.getBase64(this.selectedDraft.url)
      // Set all generation settings from propmts
      this.imagesCount = 1
      let promptUsed = JSON.parse(this.selectedDraft.metadata.customMetadata.prompt);
      this.prompt = promptUsed.text_prompts[0].text
      this.stylePreset =  this.images.find(item => item.id === promptUsed.style_preset)
      this.promptStrength = parseFloat(promptUsed.text_prompts[0].weight) ?? 0.5
      this.generationSteps = parseInt(promptUsed.steps)
      this.seed = parseInt(promptUsed.seed)
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
          var obj = {
            base64: result.data.message,
            selected: true,
            prompt: this.promptUsed
          }
          this.generatedArr.push(obj)
          this.selectedImage = obj
          console.log(this.selectedImage)
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
      this.promptGuideDialog = true
    },
    async startMemeGeneration () {
      this.pollTask()
      return
      this.generationStopped = false
      setTimeout(() => {
        this.enableStopGenerating = true
      }, 1500)
      this.generateLoading = true
      this.generatedArr = []
      this.selectedImage = null
      let seed = Math.random().toString().slice(2,11)
      let genObject = {
          taskType: "gen2",
          internal: false,
          options: {
              seconds: 4,
              gen2Options: {
                  interpolate: false,
                  seed: seed, // 
                  upscale: false,
                  text_prompt: this.prompt,
                  watermark: false,
                  mode: "gen2"
              },
              name: "Gen-2 " +  seed,
              assetGroupName: "Gen-2"
          },
          asTeamId: 3842372
      }
      let configObj = {
        uid: this.getUser.uid,
        username: this.getUser.displayName
      }
      console.log(genObject)
      Promise.resolve(MemeMasterAPI.generateTextToVideo(genObject, configObj))
        .then(result => {
          console.log(result)
          // Handle Result
          if (this.generationStopped) {
            return;
          }
          this.generatedArr = []
          console.log(result)
          this.pendingTaskId = result.data.message.task.id
          // poll task 
          this.pollTask()
          this.taskPending = true
        })
        .catch(err => {
          // this.loading = false
          console.log('Error generating Meme.', err)
          // show friendly error in user screen
        })
    },
    pollTask () {
      this.pendingTaskId = '40bf7902-90c9-47b2-9ed6-f1eb7ca612f0'
      let configObj = {
        uid: this.getUser.uid,
        username: this.getUser.displayName
      }
      Promise.resolve(MemeMasterAPI.generateTextToVideoTask(this.pendingTaskId, configObj))
        .then(result => {
          console.log(result)
          // Handle Result
          let status = result.data.message.task.status
          if (status === 'RUNNING') {
            setTimeout(() => {
              this.pollTask()
              return
            }, 5000);
          }
          this.generatedArr = result.data.message.task.artifacts
          this.source = this.generatedArr[0].url
          this.cover = this.generatedArr[0].previewUrls[0]
          this.videoName = result.data.message.task.name
          this.taskPending = false

          // this.generatedArr = result.data.message.artifacts
          this.generateLoading = false
          this.enableStopGenerating = false
          console.log(this.generatedArr)
        })
        .catch(err => {
          // this.loading = false
          console.log('Error generating Meme.', err)
          // show friendly error in user screen
        })
    },
    // Image to Image
    async startImagetoImageGeneration () {
      this.generationStopped = false
      setTimeout(() => {
        this.enableStopGenerating = true
      }, 1500)
      this.generateLoading = true
      this.generatedArr = []
      this.selectedImage = null

      let configObj = {
        engine_id: this.model.id,
        uid: this.getUser.uid,
        username: this.getUser.displayName
      }
      var replaceType = 'data:' + this.fileType + ';base64,'
      let genImgToImgObject = {
        text_prompts: [
          {
            text: this.prompt,
            weight: parseFloat(this.promptStrength)
          },
        ],
        init_image: this.uploadImageUrl.replace(replaceType, ''), // base 64 image
        init_image_mode: 'IMAGE_STRENGTH',
        image_strength: parseFloat(this.imageStrength),
        cfg_scale: 7, // Default
        clip_guidance_preset: 'NONE', // Default
        style_preset: this.stylePreset.id,
        height: this.newHeight, // parseInt(this.w_x_h.split('x')[1]),
        width: this.newWidth, // parseInt(this.w_x_h.split('x')[0]),
        samples: parseInt(this.imagesCount),
        steps: parseInt(this.generationSteps),
        seed: parseInt(this.seed),
      }

      Promise.resolve(MemeMasterAPI.generateImageToImage(genImgToImgObject, configObj))
        .then(result => {
          console.log(result)
          // Handle Result
          if (this.generationStopped) {
            return;
          }
          this.generatedArr = []
          this.generatedArr = result.data.message.artifacts
          for (var i in this.generatedArr) {
            this.generatedArr[i].selected = false
          }
          var w_h = this.newWidth + ' x ' + this.newHeight
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
          this.generateLoading = false
          this.enableStopGenerating = false
        })
        .catch(err => {
          // this.loading = false
          console.log('Error generating Meme.', err)
          // show friendly error in user screen
        })
    },
    stopGenerationClicked ()  {
      this.generateLoading = false
      this.generationStopped = true
      this.enableStopGenerating =  false
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
      //this.selectedImage.propmt = 
      console.log('######## this one ######')
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
    },
    // Upload Text to Image
    async handleFiles(image) {
      if (image.target.files[0] === undefined) {
        this.filesValid = false;
        return;
      }
      if (image.target.files[0].size > 10000000) {
        // === 10MB Max size
        console.log(image.target.files[0].size)
        this.showRowAlert = true;
        this.showRowAlertText = 'Maximum file size of 10MB exeeded for ' + image.target.files[0].name + '!';
        this.uploadImage = '';
        return;
      } else {
        console.log(image)
        this.fileType = image.target.files[0].type
        this.showRowAlert = false
        this.checkDimension(image.target)
        /* const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 896,
          useWebWorker: true
        }
        const config = {
          quality: 1,
          maxWidth: 896,
          maxHeight: 896,
          mimeType: this.fileType
        }
        this.uploadImage = await imageCompression(image.target.files[0], options)
        this.uploadImage = await readAndCompressImage(this.uploadImage, config)
        this.filesValid = true
        this.getBase64Upload(this.uploadImage).then((data) => (this.uploadImageUrl = data, console.log(this.uploadImage))) */
      }
    },
    checkDimension (target) {
      //Check whether the file is valid Image.
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif|.jpeg)$");
      if (regex.test(target.value.toLowerCase())) {
  
          //Check whether HTML5 is supported.
          if (typeof (target.files[0]) !== "undefined") {
              //Initiate the FileReader object.
              var reader = new FileReader()
              //Read the contents of Image File.
              reader.readAsDataURL(target.files[0])
              reader.onload = (e) => {
                //Initiate the JavaScript Image object.
                var image = new Image()

                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result
                console.log(e.target.result)

                //Validate the File Height and Width.
                image.onload = () => {
                  var height = image.height
                  var width = image.width
                  
                  console.log(width + 'x' + height)
                  // show width and height to use
                  this.processWidthHeight(width, height, target.files[0])
              
                  // alert("Uploaded image has valid Height and Width.")
                  // return width + 'x' + height
                }
              }
          } else {
              alert("This browser does not support HTML5.")
              return false
          }
      } else {
          alert("Please select a valid Image file.")
          return false
      }
    },
    async processWidthHeight (width, height, file) {
      console.log(width/64)
      console.log(height/64)
      this.newWidth = Math.round(width/64) * 64
      this.newHeight = Math.round(height/64) * 64
      console.log(this.newWidth)
      console.log(this.newHeight)

      if (this.newWidth === this.newHeight) {
        this.newWidth = 512
        this.newHeight = 512
      } else if ( this.newWidth > this.newHeight) {
        this.newWidth = 896
        this.newHeight = 512
      } else if ( this.newWidth < this.newHeight) {
        this.newWidth = 512
        this.newHeight = 896
      }
      // console.log('ratio = ' + Math.round(width/64) + ':' + Math.round(height/64))
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 896,
        useWebWorker: true
      }
      /* const config = {
        quality: 1,
        maxWidth: newWidth,
        maxHeight: newHeight,
        mimeType: this.fileType
      } */
      // this.uploadImage = await readAndCompressImage(file, config)
      this.uploadImage = await imageCompression(file, options)
      this.filesValid = true
      this.getBase64Upload(this.uploadImage).then((data) => (this.uploadImageUrl = data, console.log(this.uploadImage)));
    },
    getBase64Upload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    removeImage () {
      this.uploadImage = ''
      this.uploadImageUrl = ''
    },
    deleteDraftImage (item, index) {
      console.log(this.draftsArr)
      this.selectedItem = item
      this.selectedItem.index = index
      this.deleteDraftDialog = true
    },
    deleteDraftConfirm () {
      // Create a reference to the file to delete
      var filePath = this.selectedItem.metadata.ref.fullPath
      var deleteFileRef = this.storageRef.child(filePath);

      // Delete the file
      deleteFileRef.delete().then(() => {
        // File deleted successfully
        // console.log(this.draftsArr)
        // console.log(this.selectedItem)
        this.deleteDraftDialog = false
        this.snackbar = true
        this.snackbarText = 'Draft deleted!'
        let index
        for (var i in this.draftsArr) {
          if (Array.isArray(this.draftsArr[i].files)) {
            if (this.draftsArr[i].files.findIndex(item => item.url === this.selectedItem.url) > -1 ) {
              index = i
            }
          } else {
            return
          }
        }
        this.draftsArr[index].files.splice(this.selectedItem.index, 1)
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });

    },
    // Video methods
    viewCore(id, player) {
      console.log(id, player);
      this.players[id] = player;
    },
    play(id) {
      console.log('custom play: id =', id);
      this.players && this.players[id] && this.players[id].play();
    },
    destroy(id) {
      this.players && this.players[id] && this.players[id].destroy();
    },
    playEnded(e) {
      console.log(e);
      if (e.target === document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    },
    volumeUp(id) {
      this.volume += 5;
      if (this.volume > 100) {
        this.volume = 100;
      }
      this.players &&
        this.players[id] &&
        this.players[id].setVolume(this.volume / 100, true);
    },
    volumeDown(id) {
      this.volume -= 5;
      if (this.volume < 0) {
        this.volume = 0;
      }
      this.players &&
        this.players[id] &&
        this.players[id].setVolume(this.volume / 100, true);
    },
    pip(id) {
      // you can also use this.players[id].$video to do what u want just like playEnded
      console.log(this.players[id].$video);
      this.players &&
        this.players[id] &&
        this.players[id].requestPictureInPicture();
    }
  }
}
</script>

<style lang="scss">
  .v-tooltip .v-overlay__content {
    background: rgba(var(--v-theme-surface-variant), 1) !important;
  } 
  .image-upload>input {
    display: none;
  }
  .test-player-wrap {
    width: 720px;
    height: 405px;
    position: relative;
    margin: 20px auto;
  }
  .btn-play {
    color: white;
    margin-right: 10px;
    cursor: pointer;
  }
  .btn-play svg {
    width: 16px;
  }
</style>
