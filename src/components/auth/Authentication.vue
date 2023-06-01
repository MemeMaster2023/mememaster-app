<template>
  <div id="authentication">
    <v-img src="/img/home/mememaster_home02.webp" v-if="!isMobileDevice"
           cover
           :style="isMobileDevice ? 'height:' + windowHeight + 'px' : ''"
           gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.4)"
    >
    </v-img>
      <v-dialog v-model="dialog" :persistent="true" :scrollable="false" min-height="400" max-height="700" max-width="600" :min-width="isMobileDevice ? 300 : 500" transition="dialog-bottom-transition">
    <v-card height="100%" theme="dark">
      <v-toolbar
        color="#241d43"
      >
        <v-toolbar-title style="text-overflow:none" class="text-white" v-if="!isError">
          {{isLoading ? 'Loading...' : isExistingUser ? 'Connecting...' : 'Please set your display name!'}}
        </v-toolbar-title>
        <v-toolbar-title style="text-overflow:none" class="text-white" v-if="isError">
          Error
        </v-toolbar-title>
      </v-toolbar>
      <div class="text-center ma-4" v-if="isError">
        Something went wrong!
      </div>
      <div class="text-center ma-4" v-else>
        {{ isLoading ? 'Authentication in Progress' : isExistingUser ? 'You are connected!' : '' }}
      </div>
      <v-row pl-4 pr-4 style="margin-left:15%;margin-right:15%" v-if="isLoading">
        <v-col cols="12" class="d-flex justify-center my-16 align-center">
          <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row pl-4 pr-4 pt-8 style="margin-left:15%;margin-right:15%" v-else>
        <v-col cols="12" v-if="isError" class="d-flex flex-column align-center justify-center">
          <span class="text-center mb-4">{{ errorMessage }}</span>
          <v-btn style="width:100%"
                 size="large"
                 variant="outlined"
                 color="deep-purple-lighten-2"
            @click="backToHome"
          >Back To Home
          </v-btn>
        </v-col>
        <v-col cols="12" v-if="isExistingUser && !isError" class="d-flex flex-column align-center justify-center">
          <span class="text-center mb-4">Welcome Back! Redirecting you to the homepage in a few seconds...!</span>
          <v-btn style="width:100%"
                 size="large"
                 variant="outlined"
                 color="deep-purple-lighten-2"
            @click="backToHome"
          >Back To Home
          </v-btn>
        </v-col>
        <v-col cols="12" v-if="!isExistingUser && !isError">
          <v-text-field
            label="Display Name"
            placeholder="Enter your display name..."
            type="text"
            density="comfortable"
            v-model="displayName"
            variant="outlined"
          ></v-text-field>
          <!-- <v-text-field
            label="Email Address"
            placeholder="Enter your email address..."
            type="email"
            density="comfortable"
            :disabled="true"
            v-model="email"
            variant="outlined"
          ></v-text-field> -->
          <!-- <v-text-field
            label="Password"
            placeholder="Enter your password..."
            type="password"
            density="comfortable"
            v-model="password"
            variant="outlined"
          ></v-text-field> -->
          <v-btn style="width:100%"
                 size="large"
                 variant="outlined"
                 color="deep-purple-lighten-4"
                 :disabled="displayName === ''"
            @click="registerUser"
          >Continue
          </v-btn>
        </v-col>
      </v-row>
      <v-card-actions class="justify-end">
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>
<script>
import { db } from '@/main';
import firebase from 'firebase/app';

export default {
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
  },
  name: 'Authorise',
  components: {
  },
  data: () => ({
    currentStep: 0,
    source: '',
    isShow: false,
    dialog: false,
    isLoading: false,
    isExistingUser: false,
    userData: null,
    message: '',
    email: '',
    displayName: '',
    password:'',
    uid: '',
  }),
  computed: {
    isError(){
      const show = this.$store.state.auth.errorMessage !== '';
      return show;
    },
    errorMessage(){
      return this.$store.state.auth.errorMessage;
    },
    isShowMessage(){
      const show = this.$store.state.auth.authMessage !== '';
      return show;
    },
    authMessage(){
      return this.$store.state.auth.authMessage;
    },
    authProvider(){
      return this.$store.state.auth.provider;
    },
    authUser(){
      return this.$store.state.auth.user;
    },
    user(){
      console.log("user store", this.$store.state.user)
      return this.$store.state.user;
    },
    lang(){
      return this.$store.state.lang;
    },
    getLanguage(){
      return this.$store.state.current_language
    },
  },
  watch: {
  },
  async created() {
    this.dialog = true;
    this.isLoading = true;
    const code = this.$route.params.code;
    const emailForSignIn = window.localStorage.getItem('meme-master-emailForSignIn');
    const link = window.location.href;
    const emailFromLink = atob(code);
    const email = emailForSignIn ?? emailFromLink;
    console.log(email)
    this.email = email;
      if (email) {
        await this.onSignInWithLink(email, link);
      } else {
        await this.onInit();
      }
  },
  methods: {
    async onInit() {
      let id = '';
      let user = null;
      setTimeout(()=>{
        user = firebase.auth().currentUser;
      }, 1000)
      if (user !== null) {
        id = user.uid;
        this.email = user.email;
      } else {
        let firebaseUser = firebase.auth().currentUser;
        console.log(firebaseUser);
        if (firebaseUser) {
          id = firebaseUser.uid;
          this.email = firebaseUser.email;
          // this.displayName = firebaseUser.displayName;
        }
      }
      console.log("user", user);
      if (id === '') {
        this.isLoading = false;
        this.$router.push('/');
      } else {
        const userDoc = await db.collection('users').doc(id).get();
        if(userDoc.exists){
          this.isExistingUser = true;
        }
        this.uid = id;
        this.isLoading = false;
      }
    },
    async onSignInWithLink(email, link) {
      const querySnapshot = await db
        .collection('users')
        .where('email', '==', email)
        .get();
      let isNew = querySnapshot.empty;
      if(!isNew){
        this.userData = querySnapshot.docs[0].data();
        this.userData["docId"] = querySnapshot.docs[0].id;
        this.userDocId = querySnapshot.docs[0].id;
      }
      this.isExistingUser = !isNew;
      this.$store.dispatch('signInWithLink', {
        email: email,
        link: link,
        new: isNew,
        userData: this.userData
      }).then(() => {this.isLoading = false});
    },
    async registerUser(){
        let docId = this.user.docId ?? this.userDocId;
        console.log(docId)
        const payload = {
          name: this.displayName,
        }
        if(docId === ''){
          const querySnapshot = await db
          .collection('users')
          .where('email', '==', this.email)
          .get();
          docId = querySnapshot.docs[0].id;
        }
        await db.collection('users').doc(docId).update(payload)
        this.isExistingUser = true;
    },
    backToHome(){
      localStorage.removeItem('emailForSignIn');
      this.$store.dispatch('emptyAuthMessage')
      this.$router.push('/');
    },
    // async continueAuth(email, uid) {
    //   try {
    //     const credential = firebase.auth.EmailAuthProvider.credential(
    //       email, uid
    //     );
    //     const userCredential = await firebase
    //       .auth()
    //       .currentUser.reauthenticateWithCredential(credential);
    //     console.log(userCredential);
    //     await firebase.auth().currentUser.updatePassword(this.password);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
 
  },
};
</script>