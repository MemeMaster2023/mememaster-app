<template>
    <div style="width:100%;background-color: #F3E5F5;" fluid>
        <!-- <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-4'">
            <v-col cols="12" :align="'center'">
                <div class="text-h4 ma-2 text-purple-darken-3">SOCIAL MEDIA EMAS TOKENS LUCKY DRAW</div>
                <div class="text-h6 ml-4 mr-4 mt-4" :style="isMobileDevice ? 'text-align: justify;' : 'padding-left:10%;padding-right:10%'">
                    Social media listings lucky draw EMAS tokens to the lucky top 50 handles joining and posting on any of our social medias will be drawn and airdropped no need to hold EMAS tokens to join.<br><br>
                    Simply post something thats cool about MemeMaster and get people to like your comments, and you enter the lucky draw airdrop after the listing. The more likes you get and the more channels you post in, the more entries into the lucky draw.<br><br>
                    All wining handles will be posted in our social media platforms after the airdrop
                </div>
            </v-col>            
        </v-row> -->
        <v-row style="width:100%;margin: 0px" :class="isMobileDevice ? 'mt-12' : 'mt-4'">
            <v-col cols="12" class="pl-4 pr-4">
                <iframe :src="gleamUrl" 
                        frameBorder="0" 
                        allowfullscreen 
                        scrolling="no"
                        :style="isMobileDevice ? 'width:100%;height:1280px;overflow: hidden;' : 'width:100%;height:950px;overflow: hidden;'"
                >
                </iframe>
            </v-col>            
        </v-row>
    </div>  
</template>
  
<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'SOCIAL MEDIA EMAS TOKENS LUCKY DRAW',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    gleamUrl: '',
  }),
  components: {
  },
  computed: {

  },
  watch: {
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    if (import.meta.env.VITE_APP_ENVIRONMENT === 'production') {
      this.gleamUrl = 'https://gleam.io/xQ6Mu/social-media-emas-tokens-lucky-draw'
    } else{
     this.gleamUrl = 'https://gleam.io/203UF/free-token-airdrop'
    }
  },
  methods: {
 
  }
}
</script>
  