<template>
  <router-view 
    style="margin-top:-64px"
    :windowWidth="window.width"
    :windowHeight="window.height"
    :isMobileDevice="isMobileDevice"
    :drawer="getDrawer"
  />
</template>

<script>
// import { scroller } from 'vue-scrollto/src/scrollTo';
import { isMobile } from 'mobile-device-detect';
export default {
  name: 'App',
  props: {},
  data: () => ({
    dark: true,
    isMobileDevice: false,
    window: {
      width: 0,
      height: 0,
    },
    isShowLogin: false,
    name: '',
    snackbarText: "",
    snackbarColor: "green",
    snackbarTimeout: 2000,
    snackbar: false,
    snackbarError: false,
    isOnline: true,
    isShowContact: false,
    liveLeaderboard: false,
    limitLiveLeaderboard: 10,
    dialogFilePreview: false,
    fileName: ''//'http://docs.google.com/gview?url=',
  }),
  components: {

  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.isMobileDevice = isMobile;
    console.log('###### this.isMobileDevice App ##########')
    console.log(this.isMobileDevice)
  },
  computed: {
    getDrawer () {
      return this.$store.state.drawer
    }
  },
  watch: {

  },
  mounted() {
    // console.log("mounted");
    // this.connection();
  },
  methods: {
    routerGo(route) {
      /* if (this.isMobileDevice) {
        console.log("this.drawer = false");
        setTimeout(() => {
          this.drawer = false;
        }, 500);
      } */
      // console.log(this.$router.currentRoute.path)
      // console.log(route)
      if(this.isMobileDevice){
        this.drawer = false;
      }
      if (this.$router.currentRoute.path !== route) {
        this.$router.push(route);
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      /* console.log('this.window.height')
      console.log(this.window.height)
      console.log('this.window.width')
      console.log(this.window.width) */
      // this.window.width > 770 ? this.drawer = false : this.drawer = true
    },
    logout() {
      this.$store.dispatch('logout');
    },
    getWeek () {
      return dateformat(new Date(), 'WW')
    },
    connection() {
      this.$bus.$on("connection", (online) => {
        if(online){
          this.snackbarError = false;
          this.snackbar = true;
          this.snackbarText = "You are online";
        }else{
          this.snackbar = false;
          this.snackbarError = true;
          this.snackbarText = "You are offline";
        }
      });
    },
    changeLanguage(lang){
      this.$store.commit('SetCurrentLanguage', lang)
    }
  }
}
</script>