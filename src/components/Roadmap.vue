<template>
  <v-card theme="dark" style="width: 100%;height: auto">
    <v-row :style="isMobileDevice ? 'margin-left:4px;margin-right:4px; margin-top:50px;' : 'margin-top:50px;'">
      <v-col cols="12" md="12" class="mt-8 mb-16" >
        <!-- <div v-if="model === '0'" style="font-size: 3rem;" class="text-center">Roadmap</div> -->
        
        <v-carousel 
              v-model="model" 
              :height="isMobileDevice ? 'auto' : (windowHeight - 100)"
              :show-arrows="isMobileDevice ? false : 'hover'"
              :hide-delimiter-background="isMobileDevice"
          >
          <v-carousel-item
            value="0"
            src="/img/roadmap/slide_01.webp"
            height="100%"
            @click="model = '1'"
          >
          </v-carousel-item>

          <v-carousel-item
            value="1"
            height="100%"
          >
            <v-sheet
              height="100%"
              tile
              style="background: rgb(255,82,93);background: linear-gradient(180deg, rgba(125, 40, 45,1) 0%, rgb(255,82,93) 100%);"
            >

            <v-row style="height:100%">
              <v-col cols="12" md="4" class="pl-16 pt-0 pt-md-16" v-if="isMobileDevice">
              </v-col>
              <v-col cols="12" md="8" :class="isMobileDevice ? 'pl-4 my-16' : 'pl-16 pt-16'">
                <v-list density="default" bg-color="transparent">
                    <span style="font-weight: bold;font-size: 1.2rem;">{{ items[0].date}} - {{ items[0].title}}</span>

                    <v-list-item
                      v-for="(item, i) in items[0].text"
                      :key="i"
                      :value="item"
                    >
                      <template v-slot:prepend>
                        <v-icon size="32" color="green" v-if="item.completed" icon="mdi-checkbox-marked-outline"></v-icon>
                        <v-icon size="32" v-else icon="mdi-checkbox-blank-outline"></v-icon>
                      </template>

                      <span style="font-size: 1.1rem;" v-text="item.text"></span>
                    </v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="12" md="4" class="pr-16 pb-16" align-self="end" v-if="!isMobileDevice">
                  <v-img src="/img/roadmap/slide_02_1.webp"></v-img>
                </v-col>
              </v-row>

            </v-sheet>
            
          </v-carousel-item>

          <v-carousel-item
            value="2"
            height="100%"
          >
            <v-sheet
              height="100%"
              tile
              style="background: rgb(226, 82, 255);background: linear-gradient(180deg, rgba(117, 42, 132,1) 0%, rgb(226, 82, 255) 100%);"
            >
            <v-row style="height:100%">
                <v-col cols="12" md="4" class="pl-16" align-self="center" >
                  <v-img v-if="!isMobileDevice" src="/img/roadmap/slide_03_1.webp" style="border-radius: 15px;opacity: 0.7;"></v-img>
                </v-col>

                <v-col cols="12" md="8" :class="isMobileDevice ? 'pl-4 my-16' : 'pl-16 pt-16'">
                <v-list density="default" bg-color="transparent">
                    <span style="font-weight: bold;font-size: 1.2rem;">{{ items[1].date}} - {{ items[1].title }}</span>

                    <v-list-item
                      v-for="(item, i) in items[1].text"
                      :key="i"
                      :value="item"
                      active-color="primary"
                    >
                      <template v-slot:prepend>
                        <v-icon size="32" color="green" v-if="item.completed" icon="mdi-checkbox-marked-outline"></v-icon>
                        <v-icon size="32" v-else icon="mdi-checkbox-blank-outline"></v-icon>
                      </template>

                      <span style="font-size: 1.1rem;" v-text="item.text"></span>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>

          <v-carousel-item
            value="3"
            height="100%"
          >
            <v-sheet
              height="100%"
              tile
              style="background: rgb(82, 192, 255);background: linear-gradient(180deg, rgb(42, 95, 132) 0%, rgb(82, 192, 255) 100%);"
            >
            <v-row style="height:100%">
                <v-col cols="12" md="4" class="pl-16" v-if="isMobileDevice">
                </v-col>
                <v-col cols="12" md="8" :class="isMobileDevice ? 'pl-4 my-16' : 'pl-16 pt-16'">
                <v-list density="default" bg-color="transparent">
                    <span style="font-weight: bold;font-size: 1.2rem;">{{ items[2].date}} - {{ items[2].title }}</span>

                    <v-list-item
                      v-for="(item, i) in items[2].text"
                      :key="i"
                      :value="item"
                      active-color="primary"
                    >
                      <template v-slot:prepend>
                        <v-icon size="32" color="green" v-if="item.completed" icon="mdi-checkbox-marked-outline"></v-icon>
                        <v-icon size="32" v-else icon="mdi-checkbox-blank-outline"></v-icon>
                      </template>

                      <span style="font-size: 1.2rem;" v-text="item.text"></span>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12" md="4" class="pt-16 pr-16" align-self="start" v-if="!isMobileDevice">
                  <v-img src="/img/roadmap/slide_04_1.webp" style="border-radius: 15px;opacity: 0.7;"></v-img>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>

          <v-carousel-item
            value="4"
            height="100%"
          >
            <v-sheet
              height="100%"
              tile
              style="background: rgb(82, 255, 154);background: linear-gradient(180deg, rgb(42, 132, 89) 0%, rgb(82, 255, 154) 100%);"
            >
            <v-row style="height:100%">
                <v-col cols="12" md="4" class="pl-16" align-self="center" v-if="!isMobileDevice">
                  <v-img src="/img/roadmap/slide_05_1.webp" style="border-radius: 15px;opacity: 0.7;"></v-img>
                </v-col>
                <v-col cols="12" md="4" class="pl-16 pt-0" v-if="isMobileDevice">
                </v-col>

                <v-col cols="12" md="8" :class="isMobileDevice ? 'pl-4 my-16' : 'pl-16 pt-16'">
                  <v-list density="default" bg-color="transparent">
                    <span style="font-weight: bold;font-size: 1.2rem;">{{ items[3].date}} - {{ items[3].title }}</span>

                    <v-list-item
                      v-for="(item, i) in items[3].text"
                      :key="i"
                      :value="item"
                      active-color="primary"
                    >
                      <template v-slot:prepend>
                        <v-icon size="32" color="green" v-if="item.completed" icon="mdi-checkbox-marked-outline"></v-icon>
                        <v-icon size="32" v-else icon="mdi-checkbox-blank-outline"></v-icon>
                      </template>

                      <span style="font-size: 1.1rem;" v-text="item.text"></span>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>

          <v-carousel-item
            value="5"
            height="100%"
          >
            <v-sheet
              height="100%"
              tile
              style="background: rgb(255, 209, 82);background: linear-gradient(180deg, rgb(132, 105, 42) 0%, rgb(255, 209, 82) 100%);"
            >
            <v-row style="height:100%">
              <v-col cols="12" md="4" class="pl-16" v-if="isMobileDevice">
              </v-col>
              <v-col cols="12" md="8" :class="isMobileDevice ? 'pl-4 my-16' : 'pl-16 pt-16'">
                <v-list density="compact" bg-color="transparent">
                    <span style="font-weight: bold;font-size: 1.2rem;">{{ items[4].date}} - {{ items[4].title }}</span>

                    <v-list-item
                      v-for="(item, i) in items[4].text"
                      :key="i"
                      :value="item"
                      active-color="primary"
                    >
                      <template v-slot:prepend>
                        <v-icon size="32" color="green" v-if="item.completed" icon="mdi-checkbox-marked-outline"></v-icon>
                        <v-icon size="32" v-else icon="mdi-checkbox-blank-outline"></v-icon>
                      </template>

                      <span style="font-size: 1.1rem;" v-text="item.text"></span>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12" md="4" class="pt-16 pr-16" align-self="center" v-if="!isMobileDevice">
                  <v-img src="/img/roadmap/slide_06_1.webp" style="border-radius: 15px;opacity: 0.7;"></v-img>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
          
        </v-carousel>
        
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'timeline',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data () {
    return {
      items: [
        {
          title: 'Building the App and Establishing Foundations',
          text: [
            {text: 'Develop the MemeMaster App: Prioritize user-friendly design and make sure it\'s compatible with various devices.', completed: true}, 
            {text: 'Integrate a Meme Creator: Enable users to generate unique and personalized memes with an easy-to-use tool.', completed: true},
            {text: 'Integrate Wallets: Both web3 wallets for blockchain transactions and non-web3 wallets for standard transactions.', completed: true}, 
            {text: 'Develop Meme Master ERC 20 Tokens: This will be the native token for your platform.', completed: true},
            {text: 'Create a Meme Marketplace where public Collections can be showcased to public and platform users.', completed: false}, 
          ],
          date: 'Phase 1',
          color: '#463552',
          colorHex: this.getTheme,
          icon: 'mdi-calendar-start'
        },
        {
          title: 'Refinement & User Experience ',
          text: [
            {text: 'All your generated content automatically saved to your drafts so you can continue editing your creations.', completed: true}, 
            {text: 'Establish Galleries: Users can view and explore these curated collections.', completed: true}, 
            {text: 'Incorporate Social Media Links: Encourage sharing across platforms and foster community engagement.', completed: false}, 
            {text: 'Create a prompt library for far better meme and other creations.', completed: true}, 
            {text: 'Presale Token launch, 30th August 2023', completed: false},
          ],
          date: 'Phase 2',
          color: '#463552',
          colorHex: this.getTheme,
          icon: 'mdi-calendar-start'
        },
        {
          title: 'Launch & Enabling NFT Interactions',
          text: [
            {text: 'Uniswap and CEX listings', completed: false},
            {text: 'Develop NFT Backend Infrastructure: This will support minting, buying, and selling of NFTs.', completed: false}, 
            {text: 'Build the NFT Minting Application: This will allow users to create their own meme-based NFTs.', completed: false}, 
            {text: 'Launch MemeMaster\'s Meme-to-NFT Creation Section: This can be an exclusive feature of the platform allowing memes to be converted to NFTs.', completed: false},
            {text: 'Text to video: Generate video memes by creating an animation or video from text using visual and audio elements.', completed: false}, 

          ],
          date: 'Phase 3',
          color: '#463552',
          colorHex: this.getTheme,
          icon: 'mdi-tune'
        },
        {
          title: 'Expanding Platform Capabilities',
          text: [
            {text: 'Educational Content: Provide resources for users unfamiliar with NFTs, blockchain, or crypto.', completed: false},
            {text: 'Plan and Execute Airdrops: Distribute Memes and NFTs to wallet holders.', completed: false}, 
            {text: 'Confirm Coinmarketcap and Coingecko listing.', completed: false},
            {text: 'Create New Token Listing Platform: This will provide users with access to newly minted tokens, enhancing the ecosystem\'s dynamism.', completed: false},  
            {text: 'Gaming App Integration: Develop a mini-game section where users can play with/against each other. The games can be meme-themed or utilize user\'s NFTs', completed: false},
            {text: 'Introducing AI Music to Meme Master. Add music to your Memes. Experiment with an AI DJ mixing a playlist for you.', completed: false} 
          ],
          date: 'Phase 4',
          color: '#463552',
          colorHex: this.getTheme,
          icon: 'mdi-rocket-launch-outline'
        },
        {
          title: 'Time to grow!',
          text: [
            {text: 'Launch a Decentralized Marketplace: Enable peer-to-peer transaction of memes and NFTs within the platform.', completed: false},
            {text: 'Listing on more DEX and CEX exchanges.', completed: false},
            {text: 'Continuous improvement and development following the latest in Meme, NFT & AI movements.', completed: false},
            {text: 'Ordinal NFTs: Ordinal NFT creation adds an additional layer of uniqueness and value to the NFT ecosystem.', completed: false}
          ],
          date: 'Phase 5',
          color: '#463552',
          colorHex: this.getTheme,
          icon: 'mdi-sprout-outline'
        }
      ],
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
      model: 0,
    }
  },
  watch: {
  },
  created () {
    // this.windowWidth = this.$props.windowWidth
  },
  methods: {

  }
}
</script>
