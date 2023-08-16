<template>
  <v-main>
    <router-view :windowWidth="windowWidth"
                 :windowHeight="windowHeight"
                 :isMobileDevice="isMobileDevice"
                 :drawer="drawer"
                 v-on:wpClicked="openWhitepaper()"
    />
    <v-footer
      class="d-flex flex-column"
      style="background-color: #2f2f2f;"
      theme="dark"
    >
      
    <v-row class="mt-2" :align="'center'" style="width:100%">

      <v-col cols="12" md="3">
      </v-col>

      <v-col cols="12" md="6">
      
        <div style="text-align: center;">

          <v-tooltip text="Telegram" location="top">
            <template v-slot:activator="{ props }">
              <v-btn variant="text" class="mx-2">
                <v-img 
                  src="/img/icons/telegram.png" 
                  style="width:24px;height:24px;padding-top:4px" 
                  @click="gotoLink('https://t.me/MemeMaster2023')"
                  v-bind="props"
                />
              </v-btn>
            </template>
          </v-tooltip>


          <v-tooltip text="X (Twitter)" location="top">
            <template v-slot:activator="{ props }">
              <v-btn variant="text" class="mx-2">
                <v-img 
                  src="/img/icons/x_logo.png" 
                  style="width:22px;height:22px;padding-top:4px"
                  @click="gotoLink('https://twitter.com/MemeMaster_2023')"
                  v-bind="props"
                />
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Instagram" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                class="mx-2"
                icon="mdi-instagram"
                variant="text"
                @click="gotoLink('https://www.instagram.com/meme_master_2023/')"
                v-bind="props"
              ></v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Youtube" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                class="mx-2"
                icon="mdi-youtube"
                variant="text"
                @click="gotoLink('https://www.youtube.com/channel/UCUNli2csi8spAEBZJD8nXgg/')"
                v-bind="props"
              ></v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Discord" location="top">
            <template v-slot:activator="{ props }">
              <v-btn variant="text" class="mx-2 mt-1">
                <v-img 
                  src="/img/icons/discord.png" 
                  style="width:24px;height:24px;padding-top:4px"
                  @click="gotoLink('https://discord.gg/4WbkJEfBzG')"
                  v-bind="props"
                />
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="TikTok" location="top">
            <template v-slot:activator="{ props }">
              <v-btn variant="text" class="mx-2 mt-1">
                <v-img 
                  src="/img/icons/tiktok_white.png" 
                  style="width:24px;height:24px;padding-top:4px" 
                  @click="gotoLink('https://www.tiktok.com/@mememaster_2023')"
                  v-bind="props"
                />
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Pinterest" location="top">
            <template v-slot:activator="{ props }">
              <v-btn variant="text" class="mx-2 mt-1">
                <v-img 
                  src="/img/icons/pinterest.png" 
                  style="width:24px;height:24px;padding-top:4px" 
                  @click="gotoLink('https://www.pinterest.com/MemeMaster2023')"
                  v-bind="props"
                />
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Linked In" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                class="mx-2 mt-1"
                icon="mdi-linkedin"
                variant="text"
                @click="gotoLink('https://www.linkedin.com/company/mememaster/')"
                v-bind="props"
              ></v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Github" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                class="mx-2 mt-1"
                icon="mdi-github"
                variant="text"
                @click="gotoLink('https://github.com/MemeMaster2023/')"
                v-bind="props"
              ></v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-col>

      <v-col cols="12" md="3">
      </v-col>
    </v-row>

      <v-row class="mt-4 mb-1" style="width:100%">
        <v-col cols="12" md="3">
          <v-img
            src="/img/logos/mememaster_logo.png"
            style="max-height: 72px; max-width: 350px;"
          ></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <div class="pt-4 mb-4 mr-8 ml-8" style="text-align: justify;">
            Unleash your creativity, explore trends, and connect with meme aficionados across multiple social media platforms. Our AI generative platform brings you a universe of endless meme, NFT music and gaming possibilities. Join the meme revolution now!
          </div>
          <div :class="isMobileDevice ? 'pt-4 text-center' : 'pt-4 text-center'">
            <p class="text-h6">Key Partner</p>
            <v-btn 
                  variant="text"
                  size="large"
                  style="text-transform: none !important;"
                  @click="gotoLink('https://www.haven-associates.com/')"
            >
            <img src="/img/icons/haven_logo.png" 
                style="max-width:32px;padding-right:10px;text-transform: none !important;"
            /> 
              Haven Associates
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="3" :align="isMobileDevice ? 'center' : ''" class="pl-4 pt-5">
          <v-btn variant="text" style="text-transform: none !important;" @click="termsDialog = true">
            Terms and Conditions
          </v-btn>
          <v-btn variant="text" style="text-transform: none !important;" @click="privacyDialog = true">
            Privacy Policy
          </v-btn>

        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-row class="mt-8 mb-1" style="width:100%">
        <v-col cols="12" class="d-flex justify-center" v-if="isMobileDevice">
          <span style="font-size: 16px; color:#FFF;">Copyright &copy; Meme Master, {{ new Date().getFullYear() }}</span>
        </v-col>
        <v-layout v-if="!isMobileDevice" style="width:100%" class="mr-2 ml-4">
          <span style="font-size: 16px; color:#FFF;">&copy; Meme Master, {{ new Date().getFullYear() }} - Version: {{ currentAppVersion  }}</span>
          <v-spacer v-if="!isMobileDevice"></v-spacer>
          <span style="font-size: 16px; color:#FFF;" v-if="!isMobileDevice">
            <v-btn
              variant="text"
              style="color:#FFF;text-transform: none !important;margin-top: -5px;"
              @click="gotoLink('mailto:info@mememaster.app')">
            <v-icon 
              left
              :color="'white'"
              >mdi-email</v-icon> info@mememaster.app
            </v-btn>
          </span>
        </v-layout>
      </v-row>
    </v-footer>
    <div id="footer"></div>
  </v-main>

   <!-- #########################  DIALOGS #########################-->
   <v-dialog
      v-model="termsDialog"
      :fullscreen="isMobileDevice"
      transition="dialog-bottom-transition"
      max-width="800"
    >
        <v-card>
          <v-toolbar
            color="#241d43"
            title="Terms and Conditions"
            class="text-white"
          >
          <v-spacer></v-spacer>
           <v-btn
              icon
              color="white"
              @click="termsDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <div class="pa-8">
              <iframe width="100%" :height="isMobileDevice ? '350' : '584'" src="TermsAndContitions.html" title="MemeMaster2023" frameborder="0">
              </iframe>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              variant="text"
              @click="termsDialog = false"
            >Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
      v-model="privacyDialog"
      :fullscreen="isMobileDevice"
      transition="dialog-bottom-transition"
      max-width="800"
    >
        <v-card>
          <v-toolbar
            color="#241d43"
            title="Privacy Policy"
            class="text-white"
          >
           <v-spacer></v-spacer>
           <v-btn
              icon
              color="white"
              @click="privacyDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <div class="pa-8">
              Privacy Policy<br><br>

              This Privacy Policy describes how we collect, use, and disclose your personal information when you visit and use our website https://mememaster.app ("Website"). We are committed to protecting your privacy and ensuring that any personal information you provide to us is handled securely and in accordance with applicable privacy laws. By using our Website, you consent to the practices described in this Privacy Policy.<br><br>

              Information We Collect<br>
              1.1 Personal Information: When you visit our Website, we may collect certain personal information that you voluntarily provide to us, such as your name, email address, and any other information you choose to provide when contacting us or submitting forms on the Website.<br><br>

              1.2 Usage Information: We may also collect non-personal information about your visit to the Website, including the pages you viewed, the links you clicked, and other actions you took on the Website. This information is collected using cookies and similar technologies. For more information on how we use cookies, please refer to our Cookie Policy.<br><br>

              Use of Information<br>
              2.1 We may use the personal information we collect to:<br><br>

              Respond to your inquiries and provide you with the information or services you request.<br>
              Send you administrative or promotional communications, such as updates, newsletters, and marketing materials, that we believe may be of interest to you.<br>
              Personalize and improve your experience on the Website.<br>
              Analyze trends, track user interactions, and gather demographic information for aggregate use.<br>
              Protect the security and integrity of our Website and our users.<br>
              2.2 We will not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy or as required by law.<br><br>

              Disclosure of Information<br>
              3.1 We may share your personal information with trusted third-party service providers who assist us in operating our Website, conducting our business, or servicing you, as long as they agree to keep your information confidential.<br><br>

              3.2 We may also disclose your personal information when we believe it is necessary to:<br><br>

              Comply with applicable laws, regulations, or legal processes.<br>
              Enforce our Website policies.<br>
              Protect our rights, privacy, safety, or property, or the rights, privacy, safety, or property of others.<br><br>
              
              Data Security<br>
              4.1 We take reasonable measures to protect the personal information you provide to us from unauthorized access, use, or disclosure. However, no data transmission over the internet or electronic storage method is 100% secure. Therefore, while we strive to protect your personal information, we cannot guarantee its absolute security.<br><br>

              Links to Third-Party Websites<br>
              5.1 Our Website may contain links to third-party websites. We are not responsible for the privacy practices or the content of such websites. We encourage you to review the privacy policies of those third-party websites before providing them with any personal information.<br><br>

              Children's Privacy<br>
              6.1 Our Website is not intended for children under the age of [13]. We do not knowingly collect personal information from children under the age of [13]. If we discover that we have collected personal information from a child under the age of [13] without parental consent, we will take steps to promptly delete that information.<br><br>

              Changes to the Privacy Policy<br>
              7.1 This Privacy Policy and any dispute or claim arising out of or in connection with it or its subject matter or formation (including non-contractual disputes or claims) will be governed by and construed in accordance with the law of England and Wales.<br><br>

              Each party irrevocably agrees that the courts of England and Wales will have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with this Privacy Policy or its subject matter or formation (including non-contractual disputes or claims).<br><br>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              variant="text"
              @click="privacyDialog = false"
            >Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'Default',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    termsDialog: false,
    privacyDialog: false,
    currentAppVersion: ''
  }),
  components: {
  },
  computed: {
  },
  watch: {
  },
  created() {
    console.log('###### this.isMobileDevice ##########')
    console.log(this.isMobileDevice)
    this.currentAppVersion = import.meta.env.VITE_APP_VERSION
  },
  methods: {
    gotoLink(link) {
      console.log('button clicked')
      window.open(link, "_blank");
    },
    openWhitePaper(link) {
      window.open('https://mememaster.app/whitepaper/MemeMaster2023%20-%20Whitepaper.pdf', '_blank');
    }
    
  }
}
</script>
