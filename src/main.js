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
// import Jazzicon from 'vue3-jazzicon/src/components';

const app = createApp(App)
// app.component(Jazzicon.name, Jazzicon)

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}
export const db = firebase.firestore();
export const auth = firebase.auth();
// export const storageRef = firebase.storage().ref()

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
app.use(VueHtml2Canvas);
registerPlugins(app)

app.mount('#app')
