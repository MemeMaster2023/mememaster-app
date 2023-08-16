/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;

// Composables
import { createApp } from 'vue'

// Plugins
import 'core-js/stable'; 
import 'regenerator-runtime/runtime';
import { registerPlugins } from '@/plugins'
import VueScrollTo from 'vue-scrollto';
import FIREBASE_CONFIG from './config/firebase';
import firebase from 'firebase/app';
// import bus from './bus/index';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';
import VueHtml2Canvas from 'vue-html2canvas';
import VueClipboard from 'vue3-clipboard'
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player';
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css';
import VueApexCharts from 'vue3-apexcharts'
// import Jazzicon from 'vue3-jazzicon/src/components';
// import Web3 from 'web3';

const app = createApp(App)
// app.component(Jazzicon.name, Jazzicon)

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}
export const db = firebase.firestore();
export const auth = firebase.auth();
// export const storageRef = firebase.storage().ref()

window.process = {
...window.process,
};
// Add Vue directive
app.directive('scroll-to', VueScrollTo, {
    container: 'body',
    duration: 1000,
    easing: 'ease',
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true,
})
app.use(VueHtml2Canvas)
app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
})
app.use(Vue3VideoPlayer, {
    lang: 'en',
})
app.use(VueApexCharts)
// app.use(Web3)

registerPlugins(app)

app.mount('#app')
