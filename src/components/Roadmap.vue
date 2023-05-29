<template>
  <v-card theme="dark" tile flat style="width: 100%;height: auto">
    <v-row :style="isMobileDevice ? 'margin-right:10px' : 'margin-right:100px;margin-left:100px;margin-bottom:20px'">
      <v-col cols="12" md="12" class="mt-8 mb-16" >
        <div style="font-size: 3rem;" class="text-center">Roadmap</div>
        <v-timeline :side="isMobileDevice ? 'end' : ''" >
          <v-timeline-item
            v-for="(item, i) in items"
            :color="item.color"
            :icon="item.icon"
            :dot-color="item.color"
            size="large"
          >
            <template v-slot:opposite v-if="!isMobileDevice">
              <span
                :class="`font-weight-bold`"
                style="font-size: 2rem;"
                v-text="item.date"
              ></span>
            </template>
            <v-card
              :color="item.color"
              :style="isMobileDevice ? 'max-width: ' + (windowWidth - 100) + 'px;' : 'max-width: 600px'"
            >
              <v-card-title :style="dark ? 'color: #FFF' : 'color: #FFF'" class="title">{{ item.title }}</v-card-title>
              <v-card-text class="white text--primary" style="padding-top:10px">
                <template v-for="(t, index) in item.text" :key="index">
                  <p>{{ t }}</p>
                </template>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
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
          text: ['✅ Develop the MemeMaster App: Prioritize user-friendly design and make sure it\'s compatible with various devices.', '✅ Integrate a Meme Creator: Enable users to generate unique and personalized memes with an easy-to-use tool.','✅ Integrate Wallets: Both web3 wallets for blockchain transactions and non-web3 wallets for standard transactions.', '✅ Develop MemeMaster ERC 20 Tokens: This will be the native token for your platform.', '✅ Create and curate Meme Collections.', '✅ Establish Galleries: Users can view and explore these curated collections.', '✅ Incorporate Social Media Links: Encourage sharing across platforms and foster community engagement.', '⬜ Create a prompt library for far better meme and other creations.', '⬜ MM Token launch on ICO Drops'],
          date: 'Phase 1',
          color: '#463552',
          colorHex: this.getTheme,
          icon: 'mdi-rocket-launch-outline'
        },
        {
          title: 'Enabling NFT Interactions',
          text: ['⬜  Develop NFT Backend Infrastructure: This will support minting, buying, and selling of NFTs.', '⬜  Build the NFT Minting Application: This will allow users to create their own meme-based NFTs.', '⬜ Launch MemeMaster\'s Meme-to-NFT Creation Section: This can be an exclusive feature of the platform allowing memes to be converted to NFTs', '⬜ Educational Content: Provide resources for users unfamiliar with NFTs, blockchain, or crypto.'],
          date: 'Phase 2',
          color: '#463552',
          colorHex: this.getTheme,
          icon: 'mdi-calendar-start'
        },
        {
          title: 'Taking shape and getting it out',
          text: ['⬜ Publish Final Whitepaper', '⬜ MEME & NFT platform App development', '⬜ MEME & NFT platform demo and previews', '⬜ Cross chain with Cardano, Polkadot, NEO and TRON', '⬜ Token LAUNCHPAD rolling out for all platforms/chains', '⬜ Swap platform', '⬜ Limit orders on swap platforms', '⬜ Airdrops to TMO holders from projects launching', '⬜ Airdrops to TMO holders from Meme Master from time to time', '⬜ Continue marketing and funneling','⬜ Apply to other exchanges', '⬜ Reach 15,000 TMO Holders', '⬜ Reach 5,000 Telegram members'],
          date: 'Phase 3',
          color: '#463552',
          colorHex: this.getTheme,
          icon: 'mdi-bullhorn-outline'
        },
        {
          title: 'Time to grow!',
          text: ['⬜ MetaMask & Binance Chain Wallet ( Full Funtionality )', '⬜ Hybrid MEME & NFT platform Launch (Mobile)', '⬜ MEME/NFT Exchange', '⬜ Collect and Trade / Exchange', '⬜ Implementation of Trading Bots', '⬜ Smart Contract interfaces... Produce your own token and launch your own project on Meme Master on multiple chains', '⬜ Links and ratings to other launchpads (kind of CoinGecko for launchpads) all chains', '⬜ Apply to more exchanges', '⬜ Reach 30,000 TMO Holders', '⬜ Reach 15,000 Telegram members'],
          date: 'Phase 4',
          color: '#463552',
          colorHex: this.getTheme,
          icon: 'mdi-sprout-outline'
        }
      ]
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
