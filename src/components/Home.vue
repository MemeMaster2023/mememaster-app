<template>
   <div id="home">
    <v-responsive style="background-color: #000;">

    <v-carousel 
        v-model="carousel" 
        v-if="!isMobileDevice" 
        :height="windowHeight"
        hide-delimiters
        :show-arrows="false"
        cycle
        :interval="7500"
      >
      <v-carousel-item
        v-for="(item, i) in carouselItems"
        :key="i"
        :src="item.src" 
        cover
        :style="isMobileDevice ? 'height:' + windowHeight + 'px' : ''"
        gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.4)"
      >
        <div :class="isMobileDevice ? 'ma-2' : ''">
          
          <v-row style="margin-top:280px;" :align="'center'">
            <v-col cols="12" md="2" xl="3"  class="pa-4">
            </v-col>
            <v-col cols="12" md="8" xl="6">
              
              <template v-if="i === 0">
                <p :class="isMobileDevice ? 'font-weight-bold homeText' : 'font-weight-bold homeText'">Welcome to Meme Master's AI, NFT, Memes, Music and Gaming platform.</p>
              </template>

              <template v-if="i === 1">
                <p style="margin-right: -20px;margin-right: -20px;" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">We're creating an AI based hub where memes, NFTs, and social media intersect.</p>
              </template>
              
              <template v-if="i === 2">
                <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">Hold our EMAS tokens in your wallet to be eligible for airdrops and more.</p>
              </template>

              <template v-if="i === 3">
                <p v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">Follow us on our social media platforms  to stay updated and join our promo's.</p>
              </template>

              <template v-if="i === 4">
                <p style="margin-right: -20px;margin-right: -20px;" v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">We are an evolving AI inspired project: Try our current features then follow our roadmap.</p>
              </template>

              <template v-if="i === 5">
                 <p style="margin-right: -30px;margin-right: -30px;" v-if="!isMobileDevice" :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeText'">We're excited to announce our token offer, targeted for August 2023, get in early.</p>
              </template>
              <!--<v-layout class="mt-8" >
                <v-btn size="x-large"
                      variant="outlined"
                      color="white"
                      theme="dark"
                      style="width:100%"
                >Coming Soon!
                </v-btn>
              </v-layout> -->
            </v-col>

            <v-col cols="12" md="2" xl="3" class="pa-4">
            </v-col>
          </v-row>

          <v-row :align="'center'" v-if="!isMobileDevice" style="height:100%;margin-left:10%;margin-right:10%" class="pt-8"> 

            <v-col cols="12" md="4" class="pa-2" style="height:100%">
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                :height="drawer ? 280 : 250"
                max-height="300"
                style="opacity:0.8"
                color="grey-lighten-4"
              >
              <v-card-title >
                <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                  AI generated memes & NFTs
                </div>
              </v-card-title>
                <v-card-text>
                  <div id="newlist" class="text-body-1 ml-2">
                    <ul>
                      <li>Create your own memes</li>
                      <li>Turn them into NFTs</li>
                      <li>Import, trade, and store your memes and NFTs in our marketplace.</li>
                    </ul>
                  </div>
                </v-card-text>
                <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                    @click="learnMoreDialog = true"
                  >
                    Learn More
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="4" class="pa-2">
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                :height="drawer ? 280 : 250"
                max-height="300"
                style="opacity:0.8"
                color="grey-lighten-4"
              >
              <v-card-title>
                <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                  New tokens listing & airdrops
                </div>
              </v-card-title>
                <v-card-text>
                  <div id="newlist" class="text-body-1 ml-2">
                    <ul>
                      <li>Get first look access to exclusive new token listing platform</li>
                      <li>Receive limited edition air-drops</li>
                      <li>Enjoy exclusive benefits</li>
                    </ul>
                  </div>
                </v-card-text>
                <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                    @click="learnMoreDialog2 = true"
                  >
                    Learn More
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="4" class="pa-2">
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                :height="drawer ? 280 : 250"
                max-height="300"
                style="opacity:0.8"
                color="grey-lighten-4"
              >
              <v-card-title>
                <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                  Join in our AI gaming and music
                </div>
              </v-card-title>
              
                <v-card-text>
                  <div id="newlist" class="text-body-1 ml-2">
                    <ul>
                      <li>Add your AI generated memes and NFTs to our games</li>
                      <li>Integrate music into memes and NFTs</li>
                      <li>Experiment with our AI DJ</li>
                    </ul>
                  </div>
                </v-card-text>
                <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                    @click="learnMoreDialog3 = true"
                  >
                    Learn More
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>

          </v-row>
        </div>
 
      </v-carousel-item>
    </v-carousel>
      
    <!-- <v-img src="/img/home/mememaster_home02.webp" v-if="!isMobileDevice"
           cover
           :style="isMobileDevice ? 'height:' + windowHeight + 'px' : ''"
           gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.4)"
    >
    </v-img> -->

    <!-- ###############################################################-->
    <!-- #################### Mobile Device ############################-->
    <!-- ###############################################################-->
    <v-container v-if="isMobileDevice">
      <v-row>
        <v-img src="/img/home/mememaster_home_mobile.webp" 
              cover
              gradient="to bottom, rgba(0,0,0,.8), rgba(0,0,0,.5)"
        >
        
          <div class="ma-8">
            <v-row :style="'margin-top:' + (windowHeight - 560) + 'px;'" :align="'center'">
              <v-col cols="12" md="12" >
                <div class="text-center pb-12">
                  <v-btn variant="outlined" 
                        color="#FFF"
                        size="large"
                        prepend-icon="mdi-tag-outline"
                        style="text-transform: none !important;"
                        to="/presale"
                  >
                    Meme Master Presale
                </v-btn>
                </div>
                <p :class="isMobileDevice ? 'font-weight-bold homeText' : 'font-weight-bold homeText'">Welcome to Meme Master's AI, NFT, Memes, Music and Gaming platform.</p>
                <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeTextSmall'">Hold our EMAS tokens in your wallet to be eligible for airdrops and more.</p>
                <p :class="isMobileDevice ? 'font-weight-bold homeTextSmaller' : 'font-weight-bold homeTextSmall'">We're excited to announce our token offer, targeted for August 2023, get in early.</p>
                <!--<v-layout class="mt-8" >
                  <v-btn size="x-large"
                        variant="outlined"
                        color="white"
                        theme="dark"
                        style="width:100%"
                  >Coming Soon!
                  </v-btn>
                </v-layout> -->
              </v-col>
            </v-row>

          </div>
        </v-img>

            <v-col cols="12" md="1" class="pa-4">
            </v-col>

            <v-col cols="12" md="4" >
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                height="300"
                max-height="450"
                style="opacity:0.8"
                color="deep-purple-lighten-4"
              >
                <div class="pa-4 font-weight-bold">
                  <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'" style="word-break: break-word;">
                    AI generated memes & NFTs
                  </div>
                </div>
                  <v-card-text>
                    <div id="newlist" class="text-body-1 ml-2">
                      <ul>
                        <li>Create your own memes</li>
                        <li>Turn them into NFTs</li>
                        <li>Import, trade, and store your memes and NFTs in our marketplace.</li>
                      </ul>
                    </div>
                  </v-card-text>
                  <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                    <v-spacer></v-spacer>
                    <v-btn
                      variant="text"
                      @click="learnMoreDialog = true"
                    >
                      Learn More
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="3" class="pa-4">
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                height="320"
                max-height="450"
                style="opacity:0.8"
                color="deep-purple-lighten-4"
              >
                <div class="pa-4 font-weight-bold">
                  <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                    New tokens listing & airdrops
                  </div>
                </div>
                  <v-card-text>
                    <div id="newlist" class="text-body-1 ml-2">
                      <ul>
                        <li>Get first look access to exclusive new token listing platform</li>
                        <li>Receive limited edition air-drops</li>
                        <li>Enjoy exclusive benefits</li>
                      </ul>
                    </div>
                  </v-card-text>
                  <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                    <v-spacer></v-spacer>
                    <v-btn
                      variant="text"
                      @click="learnMoreDialog2 = true"
                    >
                      Learn More
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="3" class="pa-4">
              <v-card
                class="mx-auto overflow-auto"
                max-width="100%"
                min-width="100%"
                height="340"
                max-height="450"
                style="opacity:0.8"
                color="deep-purple-lighten-4"
              >
                <div class="pa-4 font-weight-bold">
                  <div :class="drawer ? 'cardTextTitleSmaller' : 'cardTextTitleSmall'">
                    Join in our AI gaming and music
                  </div>
                </div>
                
                  <v-card-text>
                    <div id="newlist" class="text-body-1 ml-2">
                      <ul>
                        <li>Add your AI generated memes and NFTs to our games</li>
                        <li>Integrate music into memes and NFTs</li>
                        <li>Experiment with our AI DJ</li>
                      </ul>
                    </div>
                  </v-card-text>
                  <v-card-actions class="card-actions" style="width:100%;position: absolute;bottom: 0;">
                    <v-spacer></v-spacer>
                    <v-btn
                      variant="text"
                      @click="learnMoreDialog3 = true"
                    >
                      Learn More
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="1" class="pa-4">
            </v-col>
      </v-row>
    </v-container>

    <div id="gallery">
        <v-row :style="scrollClicked ? 'margin-top:32px' : ''">
          <v-col class="mt-4">
            <div class="text-center gallery">Sample of our AI latest releases and galleries!</div>
          </v-col>
        </v-row>

        <v-row :align="'center'" class="ma-4">
          <v-col cols="12" md="6" :align="'center'">
            <v-btn 
                :size="isMobileDevice ? 'large' : 'x-large'" 
                variant="outlined"
                theme="dark"
                color="white"
                to="/collections"
                :width="isMobileDevice ? '100%' : '370'"
                style="text-transform: none !important;box-shadow: 0px 0px 5px 5px rgb(96, 88, 172);" 
            >
              Get inspired by our gallery!
            </v-btn>
          </v-col>

          <v-col cols="12" md="6" :align="'center'">
            <v-btn 
                :size="isMobileDevice ? 'large' : 'x-large'" 
                variant="outlined"
                theme="dark"
                color="white"
                to="/latest_ai"
                :width="isMobileDevice ? '100%' : '370'"
                style="text-transform: none !important;box-shadow: 0px 0px 5px 5px rgb(96, 88, 172);" 
            >
             Latest AI Releases Coming Soon
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-8 ml-2 mr-2 mb-4">
          <template v-for="(image,imgIdx) in images1" :key="imgIdx">
            <v-col cols="12" :md="image.cols">
              <v-img
                :src="image.url"
                cover
                class="align-end"
              >
              </v-img>
            </v-col>
          </template>

          <template v-for="(image,imgIdx) in images2" :key="imgIdx">
            <v-col cols="12" :md="image.cols">
              <v-img
                :src="image.url"
                cover
                class="align-end"
              >
              </v-img>
            </v-col>
          </template>

          <template v-for="(image,imgIdx) in images3" :key="imgIdx">
            <v-col cols="12" :md="image.cols">
              <v-img
                :src="image.url"
                cover
                class="align-end"
              >
              </v-img>
            </v-col>
          </template>
        </v-row>
      </div>

      <!-- ######################## DIALOGS ############################ -->
      <v-dialog
          v-model="learnMoreDialog"
          fullscreen
        >
          <v-card theme="dark" color="#2b2b2b">
            <v-toolbar
              color="deep-purple-darken-4"
            >
            <v-btn
              icon
              @click="learnMoreDialog = false"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-toolbar-title>Learn More...</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn
                icon
                @click="learnMoreDialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text >

              <v-sheet
                :class="isMobileDevice ? 'd-flex flex-wrap mx-auto px-2 py-2' : 'd-flex flex-wrap mx-auto px-8 py-8'"
                elevation="4"
                rounded
                width="100%"
              >
                <v-row>
                  <v-col cols="12" md="8">
                    <div>
                      <h2 class="text-h4 font-weight-bold">AI generated memes & NFTs</h2>

                      <div class="text-h6 mt-2 mb-2">
                        With Meme Master, you'll be able to:

                        <div id="newlist" class="text-h6 ml-4">
                          <ul>
                            <li>Create your own memes and turn them into NFTs.</li>
                            <li>Create and Manage your collections.</li>
                            <li>Keep them private or make them public.</li>
                            <li>Import, trade, and store your memes and NFTs in our marketplace.</li>
                            <li>Holding our EMAS tokens is the first step to opening these possibilities.</li>
                          </ul>
                        </div><br>
                        Enjoy these early features... Much more coming after launch. See our Roadmap.
                        <br><br>
                        <!-- Get early access to new token listings from our own token finder complete with features such as anti- rug pull, compliance, project KYC. Our daily top listings and much more to allow you to get early access into many projects with peace of mind, this will be exclusive to MemeMaster. -->
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" :align="'right'" align-self="center">
                    <v-img style="max-width: 350px; border-radius: 10px;"
                           src="/img/home/nft_machine.webp"></v-img>
                  </v-col>
                </v-row>

                <v-row>

                  <v-col cols="12" md="4" :align="'left'" align-self="center">
                    <v-img style="max-width: 350px; border-radius: 10px;"
                           src="/img/home/500_free_credits.webp"></v-img>
                  </v-col>

                  <v-col cols="12" md="8">
                    <div>
                      <h2 class="text-h4 font-weight-bold">Get 500 Free Credits when joining</h2>

                      <div class="text-h6 mt-2 mb-2">
                        Create NFTs from your memes or directly for integration in our gaming platform.<br>

                        <div id="newlist" class="text-h6 ml-4">
                          <ul>
                            <li>Add music to your Memes and NFTs.</li>
                            <li>Generate Text to Video. Coming Soon!</li>
                            <li>Create NFTs from your memes or directly for integration in our gaming platform..</li>
                            <li>Win EMAS points and convert them into EMAS tokens.</li>
                          </ul>
                        </div><br>
                        Your generations, creations with prompts are automatically saved for 30 days in your personal Drafts folder so you can easily find them back later.
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-sheet>
              
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="learnMoreDialog2"
          fullscreen
        >
          <v-card theme="dark" color="#2b2b2b">
            <v-toolbar
              color="deep-purple-darken-4"
            >
            <v-btn
              icon
              @click="learnMoreDialog2 = false"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-toolbar-title>Learn More...</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn
                icon
                @click="learnMoreDialog2 = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text >

              <v-sheet
                class="d-flex flex-wrap mx-auto px-8 py-8 mt-4"
                elevation="4"
                rounded
                width="100%"
              >
                <v-row>
                  <v-col cols="12" md="4" :align="'left'" align-self="top">
                    <v-img style="max-width: 350px; border-radius: 10px;"
                           src="/img/home/airdrops_and_gaming.webp"></v-img>
                  </v-col>

                  <v-col cols="12" md="8">
                    <div>
                      <h2 class="text-h4 font-weight-bold">New tokens listing & airdrops</h2>

                      <div style="text-align: justify;" class="text-h6 mt-2 mb-2">
                        Get <strong><u>FIRST LOOK</u></strong> access to new token listings from our own token finder complete with features such as anti- rug pull, compliance and project KYC. Our daily top listings allow you to get early access into many projects with peace of mind, this will be <strong><u>EXCLUSIVE</u></strong> to MemeMaster. Airdrops Gaming and much more<br><br>

                        Get our <strong><u>LIMITED EDITION AIRDROPS.</u></strong><br><br>

                        These NFTs, when held in your wallet (with a min quantity of EMAS tokens) will give many benefits including early access to our new features that are listed in our roadmap, first look to new token listings, higher free allocation of our MemeMaster points to use in games (that you will also have early access too) and later convert to our EMAS tokens.<br><br>
                        
                        </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" :align="'left'" align-self="center">
                    <div style="text-align: justify;" class="text-h6 mt-2 mb-2">
                        Receive our future limited-edition airdrops and also early access to join our partners of listed tokens (coming soon) plus so much more...<br>
                        All of these features can be managed from your Meme Master dashboard, allowing seamless storage, trading, and transfer of memes, NFTs, Games, music and more.<br><br>
                        
                        Holding our EMAS tokens is the first step to opening these possibilities.<br><br>
                      <!-- Token Martix -->     
                    </div>
                  </v-col>
                </v-row>
              </v-sheet>
              
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="learnMoreDialog3"
          fullscreen
        >
          <v-card theme="dark" color="#2b2b2b">
            <v-toolbar
              color="deep-purple-darken-4"
            >
            <v-btn
              icon
              @click="learnMoreDialog3 = false"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-toolbar-title>Learn More...</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn
                icon
                @click="learnMoreDialog3 = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text >

              <v-sheet
                class="d-flex flex-wrap mx-auto px-8 py-8"
                elevation="4"
                rounded
                width="100%"
              >
              <v-row :class="isMobileDevice ? 'mt-2 ml-2 mr-2' : 'mt-2'" :align="center">
                <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
                </v-col>

                <v-col cols="12" md="8" :align="center">
                  <div class="text-h4 text-center ma-2">Join in our AI gaming and music</div>

                  <v-row class="mt-8">
                    <v-col cols="12" md="4" :align="isMobileDevice ? 'center' : 'right'">
                      <v-img style="max-width: 300px; border-radius: 10px;"
                      src="/img/music/mememaster_music_01.png">
                    </v-img>
                    </v-col>

                    <v-col cols="12" md="8">
                      <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
                        Take your memes to the next level with our latest feature: Music Integration. Elevate the humor, emotion, and impact of your memes by seamlessly blending them with catchy tunes. Our platform allows you to easily add music to your memes, enhancing the overall experience for your audience. From upbeat tracks to sentimental melodies, choose the perfect soundtrack to complement your witty creations. With Music Integration, your memes will have an irresistible charm that resonates with viewers on a whole new level.
                      </div>
                    </v-col>
                  </v-row>
                
                  
                  <v-row>
                    <v-col cols="12" md="8">
                      <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
                        Experiment with an AI DJ: Let Our Virtual DJ Curate Your Playlist
                        Dive into the world of AI-driven music curation with our innovative feature: AI DJ. Say goodbye to the hassle of creating playlists manually and let our virtual DJ take the reins. Our intelligent algorithm analyzes your music preferences, understands your mood, and crafts customized playlists tailored specifically for you. With AI DJ, you'll discover a seamless blend of your favorite tunes and new, exciting tracks. Sit back, relax, and enjoy the perfect mix as our AI DJ expertly navigates through genres, tempos, and styles to create an immersive musical journey personalized just for you.
                      </div>
                    </v-col>
                    
                    <v-col cols="12" md="4" :align="isMobileDevice ? 'center' : 'right'">
                      <v-img style="max-width: 300px; border-radius: 10px;"
                        src="/img/music/mememaster_music_03.png">
                        </v-img>
                    </v-col>
                  </v-row>


                
                  <v-alert
                    class="mt-8 mb-8"
                    color="deep-purple-darken-4"
                    theme="dark"
                    icon="mdi-code-braces"
                  >
                    <p style="font-size: 1.3rem;margin-top: -5px;">The AI Music features will be developed in Phase 4.<br>Stay tuned for information about the 1st release.</p>
                  </v-alert>    
                  
                </v-col>

                <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
                </v-col>

              </v-row>
              </v-sheet>
              
            </v-card-text>
          </v-card>
        </v-dialog>

    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import TokenListings from '@/components/tokens/Tokens'
import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'Home',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    learnMoreDialog: false,
    learnMoreDialog2: false,
    learnMoreDialog3: false,
    imageLayout: [
      { cols: 4 },
      {
        cols: 8,
        children: [{ cols: 12 }, { cols: 12 }],
      },
      { cols: 6 },
      { cols: 3 },
      { cols: 9 },
      { cols: 4 },
      { cols: 8 },
    ],
    carousel: 0,
    carouselItems: [
        {
          src: '/img/home/mememaster_home01.webp',
        },
        {
          src: '/img/home/mememaster_home02.webp',
        },
        {
          src: '/img/home/mememaster_home03.webp',
        },
        {
          src: '/img/home/mememaster_home04.webp',
        },
        {
          src: '/img/home/mememaster_home05.webp',
        },
        {
          src: '/img/home/mememaster_home06.webp',
        }
      ],
    images1: [
      {name: '', meme:'Enjoying the sun at the beach on pandora', color: '', url: '/img/memes/meme_01.png', cols: 4},
      {name: '', meme:'The end of the day...', color: '', url: '/img/memes/meme_02.png', cols: 4},
      {name: '', meme:"When you're trying to diet but your fridge is full of cake", color: 'purple', url: '/img/memes/meme_03.png', cols: 4},
    ],
    images2: [
      {name: '', meme:'English not getting any better...', color: '', url: '/img/memes/meme_10.png', cols: 6},
      {name: '', meme:"That's how I like my noodles!", color: '', url: '/img/memes/meme_08.png', cols: 6},
    ],
    images3: [
      {name: '', meme:'Elon and Shiba Inu checking the price of Tesla shares...', color: '', url: '/img/memes/meme_06.png', cols: 4},
      {name: '', meme:'Need my daily coffee...', color: '', url: '/img/memes/meme_07.png', cols: 4},
      {name: '', meme:"That's how I like my noodles!", color: 'purple', url: '/img/memes/meme_09.png', cols: 4},
    ],
    reveal: false,
    scrollClicked: false
  }),
  components: { 
    TokenListings
  },
  computed: {

  },
  watch: {
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    // this.init();
    this.scrollToTop()
    console.log('###### this.isMobileDevice Home Home ##########')
    console.log(this.isMobileDevice)
  },
  methods: {
    scrollToGallery () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#gallery', 500, { offset: -64 });
      }, 200);
    },
    gotoLink(link) {
      console.log('button clicked')
      window.open(link, "_blank");
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#home', 500, { offset: -64 });
      }, 200);
    },
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
    font-size: 38px;
    line-height: 1em;
    color: #FFF;
  }
  .homeTextSmaller {
    font-family: 'Gruppo';
    font-size: 28px;
    line-height: 1em;
    color: #FFF;
    margin-top: 16px;
  }
  .cardTextTitle {
    font-family: 'Saira';
    font-size: 20px;
    font-weight: bold;
  }
  .cardTextTitleSmall {
    font-family: 'Saira';
    font-size: 18px;
    font-weight: bold;
  }
  .cardTextTitleSmaller {
    font-family: 'Saira';
    font-size: 16px;
    font-weight: bold;
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
  #newlist ul {
    list-style: none;
  }
  #newlist li {
    list-style: none;
    counter-increment: foo;
    display: table-row;
  }
  //* standard Unicode method *//
  #newlist ul li:before {
    content: "\27A2";
    padding-right:5px;
    display: table-cell;
  }
</style>
