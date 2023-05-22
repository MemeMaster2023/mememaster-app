/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import VueScrollTo from 'vue-scrollto';
import FIREBASE_CONFIG from './config/firebase';
import firebase from 'firebase/app';
// import bus from './bus/index';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';
// import Jazzicon from 'vue3-jazzicon/src/components';

const app = createApp(App)
// app.component(Jazzicon.name, Jazzicon)

firebase.initializeApp(FIREBASE_CONFIG);
export const db = firebase.firestore();
export const auth = firebase.auth();

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

registerPlugins(app)

app.mount('#app')
