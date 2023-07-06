<template>
  <v-app id="mememaster-app">
    <default-bar 
        :isMobileDevice="isMobileDevice" 
        :windowWidth="windowWidth" 
        :windowHeight="windowHeight" 
        :drawer="drawer"
        v-on:wpClicked="openWhitepaper()"
        v-on:mmMobileClicked="mmMobileClicked()"
        v-on:teamLinkClicked="teamLinkClicked()"
        v-on:tokenLinkClicked="tokenLinkClicked()"
    />
    <default-view 
        :isMobileDevice="isMobileDevice" 
        :windowWidth="windowWidth" 
        :windowHeight="windowHeight" 
        :drawer="drawer"
  />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppLayout.vue'
  import DefaultView from './View.vue'

  defineProps({
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  })

  function openWhitepaper() {
    // console.log('openWhitepaper Received')
    window.open('https://firebasestorage.googleapis.com/v0/b/meme-master-staging.appspot.com/o/whitepaper%2FMemeMaster2023%20-%20Whitepaper.pdf?alt=media&token=f3c58534-dd4f-4a63-a699-4cfb3a7b7129', '_blank');
  }
  function mmMobileClicked() {
    // console.log('mmMobileClicked Received')
    window.open('https://metamask.app.link/dapp/testnet.mememaster.app/mmobile', '_blank');
  }
  function teamLinkClicked() {
    // console.log('teamLinkClicked Received')
    window.open('https://haven-associates.com/#tabs', '_blank');
  }
  function tokenLinkClicked () {
    // console.log('tokenLinkClicked Received')
    window.open('https://gopluslabs.io/token-security/1/0xfe82c0ff9967c1d2bd18865f817103f00e4f1e72', '_blank');
  }
  
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500&display=swap');
  #mememaster-app {
    font-family: 'Jura', sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

