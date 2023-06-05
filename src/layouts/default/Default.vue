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
    // console.log('wpClicked Received')
    window.open('https://mememaster.app/whitepaper/MemeMaster2023%20White%20Paper.pdf', '_blank');
  }
  function mmMobileClicked() {
    // console.log('wpClicked Received')
    window.open('https://metamask.app.link/dapp/testnet.mememaster.app/mmobile', '_blank');
  }
  function teamLinkClicked() {
    // console.log('wpClicked Received')
    window.open('https://haven-associates.com/#tabs', '_blank');
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

