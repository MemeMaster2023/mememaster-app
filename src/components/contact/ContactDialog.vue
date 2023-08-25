<template>
    <v-dialog
      transition="dialog-bottom-transition"
      :fullscreen="$vuetify.display.smAndDown"
      :min-width=" $vuetify.display.smAndDown ? 300 : 500"
      :max-width="$vuetify.display.smAndDown ? '100%': 600"
      :persistent="true"
      v-model="contactDialog"
    >
      <div id="recaptcha-container"></div>
        <v-card height="100%" theme="dark">
          <v-toolbar
            color="#2d0f35"
          >
            <v-btn v-if="$vuetify.display.mobile"
              icon
              color="white"
              @click="contactDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <span class="text-white ml-4" style="font-size: 1.2rem">Contact Us</span>
            <v-spacer></v-spacer>
            <v-btn v-if="!$vuetify.display.mobile"
              icon
              color="white"
              @click="contactDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="text-center ma-4">
          </div>

          <v-row style="margin-left:10%;margin-right:10%">
              <v-col cols="12">
                  <v-img
                    src="/img/logos/mememaster_logo.png"
                    class="mx-auto my-4"
                    style="max-height: 500px; max-width: 500px;cursor: pointer;"
                  ></v-img>
                  <v-row class="d-flex justify-center flex-column align-center" v-if="!isForm">
                    <p style="font-size:18px" class="font-weight-medium text-center mt-4 mb-2 d-flex justify-center lowercase">
                      <v-btn @click="gotoLink('mailto:info@mememaster.app')" class="text-lowercase">
                      <v-icon 
                          left
                          class="mr-2"
                          :color="'white'">
                          mdi-email
                      </v-icon>
                          info@mememaster.app
                      </v-btn>
                    </p>
                    <v-divider></v-divider>
                    <p style="font-size:14px" class="font-weight-medium text-center mt-6 mb-4">
                      Please don’t hesitate to contact us if you need further information or have other issues about Meme Master 2023.
                    </p>
                    <v-btn style="width:100%"
                        size="large"
                        color="#2d0f35"
                        @click="isForm = true">
                      Send Us A Message!
                    </v-btn>
                  </v-row>
                  <v-row class="d-flex flex-column align-center justify-center" v-else>
                    <v-col cols="12">
                      <v-text-field
                        label="Name"
                        v-model="name"
                        single-line
                        placeholder="Please enter you name"
                        density="comfortable"
                        hide-details
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-text-field
                          label="Email"
                          v-model="email"
                          single-line
                          placeholder="Please enter you email"
                          density="comfortable"
                          hide-details
                          variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                    <v-text-field
                        label="Subject"
                        v-model="subject"
                        single-line
                        placeholder="Please enter your subject"
                        density="comfortable"
                        hide-details
                        variant="outlined"
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                    <v-textarea
                        label="Message"
                        v-model="message"
                        single-line
                        placeholder="Please enter your message"
                        density="comfortable"
                        hide-details
                        variant="outlined"
                    ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                    <v-btn :loading="isLoading" style="width:100%"
                        @click.stop="sendMessage"
                        :disabled="[subject, name, email, message].includes('') || isLoading"
                        size="large"
                        variant="flat"
                        color="#2d0f35"
                        class="text-white">
                        Send Message
                    </v-btn>
                    </v-col>
                    <v-col cols="12">
                    <v-btn :loading="isLoading" style="width:100%"
                        @click.stop="isForm = false"
                        size="large"
                        variant="outlined"
                        color="#2d0f35"
                        class="text-white">
                        Back
                    </v-btn>
                    </v-col>
                  </v-row>
              </v-col>
          </v-row>
          <v-card-actions class="justify-end">

          </v-card-actions>
        </v-card>
  </v-dialog>
  <v-snackbar
        :color="snackbarColor"
        :timeout="4000"
        v-model="snackbar"
      >
      <v-icon v-if="snackbarColor === 'red'">mdi-alert-outline</v-icon>
      <v-icon v-if="snackbarColor === 'green'">mdi-check-circle-outline</v-icon>
        {{ snackbarText }}
        <template v-slot:actions>
          <v-btn
            color="white"
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
  </v-snackbar>
</template>
<script>
import {db} from '@/main';
import store from '@/store';
import MemeMasterAPI from '@/clients/MemeMasterAPI';
export default {
  name: 'AppBar',
  props: {
    isOpen: Boolean,
    dark: Boolean
  },
  data: () => ({
    isForm: false,
    subject: '',
    email: '',
    name: '',
    message: '',
    isLoading: false,
    snackbar: false,
    snackbarColor: 'green',
    snackbarText: ''
  }),
  components: {
  },
  computed: {
    contactDialog: {
        get() {
            return this.isOpen;
        },
        set(newValue) {
            this.$emit("close", newValue);
        },
    },
    getUser () {
      return store.state.auth.user
    },
  },
  watch:{
  },
  destroyed () {
  },
  created () {
  },
  methods: {
    gotoLink(link) {
      window.open(link, "_blank");
    },
    sendMessage(){
      this.isLoading = true;
      console.log(JSON.stringify(this.message));
      let message = this.message.replaceAll('\n', '<br>');
      console.log(message);
      let postkey = db.collection('messages').doc()
      let obj = {
        id: postkey.id,
        uid: [undefined, null, ''].includes(this.getUser?.uid) ? 'GUEST' : this.getUser?.uid,
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: message,
        isSendEmail: 0,
        created: new Date().getTime(), 
        type: 'contact'
      }

      const formatedMessage = `
        <table>
          <tr>
            <td>Name:</td>
            <td>${obj.name}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>${obj.email}</td>
          </tr>
          <tr>
            <td>Type:</td>
            <td><strong>Contact Us</strong></td>
          </tr>
          <tr>
            <td>Subject:</td>
            <td>${obj.subject}</td>
          </tr>
          <tr>
            <td>Message:</td>
          </tr>
        </table>
        <div>${message}</div>
      `

      db.collection('messages')
        .doc(postkey.id)
        .set(obj)
        .then(async () => {
          const payload = {
            subject: `Contact Us: ${this.name} - ${this.email} | ${this.subject}`,
            message: formatedMessage,
            email: this.email
          }
          await MemeMasterAPI.sendMessage(payload);
          this.snackbarText = "Success sending message";
          this.snackbar = true;
          this.isLoading = false;
          this.isForm = false;
          this.contactDialog = false;
          this.name = '';
          this.email = '';
          this.subject = '';
          this.message = '';
        })
        .catch((error) => {
          this.snackbarText = "Failed sending message: " + error ;
          this.snackbarColor = 'red'
          this.snackbar = true;
        });
    }
  }
}
</script>
<style>
.lowercase{
  text-transform: lowercase !important;
}
</style>