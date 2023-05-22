<template>
  <v-main>
    <router-view :windowWidth="windowWidth"
                 :windowHeight="windowHeight"
                 :isMobileDevice="isMobileDevice"
                 :drawer="drawer"
    />
    <v-footer
    class="d-flex flex-column"
    style="background-color: #2f2f2f;"
    theme="dark"
  >
    <!-- <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text"
      ></v-btn>
    </div> -->

    <v-row class="mt-4 mb-1" style="width:100%">
      <v-col cols="12" md="4">
        <v-img
          src="/img/logos/mememaster_logo.png"
          style="max-height: 72px; max-width: 350px;"
        ></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <div class="pt-0 mb-4">
          Unleash your creativity, explore hilarious trends, and connect with meme aficionados across multiple social media platforms. Our generative platform brings you a universe of endless meme possibilities. Get ready to laugh, share, and meme like never before! Join the meme revolution now.
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-row class="mt-8 mb-1" style="width:100%">
      <v-col cols="12" class="d-flex justify-center" v-if="isMobileDevice">
        <span style="font-size: 16px; color:#FFF;">Copyright &copy; Meme Master, {{ new Date().getFullYear() }}</span>
      </v-col>
      <v-layout v-if="!isMobileDevice" style="width:100%" class="mr-2 ml-4">
        <span style="font-size: 16px; color:#FFF;">&copy; Meme Master, {{ new Date().getFullYear() }}</span>
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
  </v-main>
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
    icons: [
      // 'mdi-telegram',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
    
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
  },
  methods: {
    gotoLink(link) {
      window.open(link, "_blank");
    }
  }
}
</script>
