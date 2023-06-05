<template>
    <v-snackbar
        :color="dark ? '' : '#FFF'"
        :min-width="isMobileDevice ? '' : '400px'"
        :min-height="isMobileDevice ? '' : '600px'"
        :timeout="-1"
        elevation="24"
        vertical
        location="bottom left"
    > 
        <v-card 
            style="margin: -10px"
            width="400"
            color="transparent" 
            variant="flat" 
        >
        <v-toolbar
            width="400"
            color="blue-lighten-5"
        >
            <span class="pl-2" style="font-size: 1.2rem;font-weight: 600;" >Meme Master AI Chat</span>
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="closeChat()"
                >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <!-- Shit goes here -->
        <v-list lines="one" bg-color="#FFF" >
            <v-list-item
                v-for="(item, index) in chatLog"
                :key="index"
                :class="item.sender == 'AI' ? '' : 'justify-end'"
            >   
                <v-alert v-if="item.sender == 'AI'"
                         icon="mdi-robot-outline" 
                         type="info"
                         max-width="300"
                         density="compact"
                >
                {{ item.text}}
                </v-alert>

                <v-alert v-if="item.sender == 'Human'"
                         variant="outlined"
                         max-width="300"
                         density="compact"
                >
                    <v-layout>
                        <v-spacer></v-spacer>
                        <span class="justify-end">{{ item.text}}</span>
                        <v-icon class="ml-2" size="large">mdi-comment-account-outline</v-icon>
                    </v-layout>
                </v-alert>
            </v-list-item>
        </v-list>

        <row>
            <v-col cols="12">

            </v-col>
        </row>
        
        </v-card>
    </v-snackbar>
</template>

<script>
// @ is an alias to /src
// import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'ChatGPT',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    chatLog: [
      { sender: 'AI', text: "Hello, I'm here to help. What can I do for you today? What can I do for you today?" },
      { sender: 'Human', text: "What time is it in Jakarta Indonesia?" }
    ]
  }),
  components: {
  },
  computed: {

  },
  watch: {
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.init()
  },
  methods: {
    init () {
     
    },
    closeChat () {
      this.$emit("closeChatClicked")
    }
  }
}
</script>

<style>
.v-snackbar__css {
    padding: 0 0 0 0;
}
</style>
