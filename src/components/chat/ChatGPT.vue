<template>
    <v-snackbar
        :color="chatOpen ? '#FFF' : 'transparent'"
        :min-width="chatOpen ? '400' : '70'"
        :min-height="chatOpen ? '600' : '70'"
        :timeout="-1"
        :elevation="chatOpen ? 24 : 0"
        vertical
        :variant="chatOpen ? 'elevated' : 'flat'" 
        location="bottom left"
    > 
        <v-card 
            v-if="chatOpen"
            :style="isMobileDevice ? 'margin: -10px;padding-right: 25px;' :'margin: -10px;'"
            width="400"
            max-width="400"
            color="white" 
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
        <v-list lines="one" bg-color="#FFF" height="450" class="mb-2">
            <v-list-item
                v-for="(item, index) in chatLog"
                :key="index"
                :class="item.sender == 'AI' ? '' : 'justify-end'"
                :id="'list-item-' + (index)"
            >   
                <v-alert v-if="item.sender == 'AI'"
                         icon="mdi-robot-outline" 
                         type="info"
                         min-width="50"
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
            <div ref="bottomEl" style="margin-top:20px"></div>
        </v-list>
        </v-card>
        <v-card 
            v-if="chatOpen"
            :style="isMobileDevice ? 'margin: -10px;padding-right: 25px;' :'margin: -10px;'"
            color="white" 
            variant="flat" 
        >
            <v-row>
                <v-col cols="12" md="12">
                    <v-textarea
                        v-model="prompt"
                        auto-grow
                        variant="outlined"
                        rows="1"
                        row-height="15"
                        append-inner-icon="mdi-send"
                        placeholder="Send a message..." 
                        @click:appendInner="sendMessage()"
                        v-on:keyup="keyPressed"
                        hide-details
                    >
                    </v-textarea>
                </v-col>
            </v-row>
        </v-card>
        <v-card 
            v-if="!chatOpen"
            width="100"
            max-width="100"
            color="transparent" 
            variant="flat" 
        >
            <v-img 
                src="/img/icons/ai_chatbot.png"
                @click="openChat()"
                style="max-width:100px;cursor: pointer"
            >
            </v-img>
        </v-card>
    </v-snackbar>
</template>

<script>
// @ is an alias to /src
import MemeMasterAPI from '../../clients/MemeMasterAPI';
import { scroller } from 'vue-scrollto/src/scrollTo'
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
    chatOpen: false,
    prompt: '',
    messagePending: false,
    chatLog: [
      { sender: 'AI', text: "Hello, I'm here to help. What can I do for you today?" },
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
    keyPressed(e) {
      console.log(e)
      if (this.prompt === '' || this.prompt === '\n') return
      if (e.keyCode === 16) {
        return;
      }
      if (e.keyCode === 13) {
        this.sendMessage()
        return;
      }
    },
    sendMessage () {
        var usePrompt = this.prompt
        if (usePrompt === '' || usePrompt === '\n') return
        var message = {
            sender: 'Human', 
            text: usePrompt
        }
        this.chatLog.push(message)
        this.prompt = ''
        this.messagePending = true
        var message = {
            sender: 'AI', 
            text: "..."
        }
        this.chatLog.push(message)
        // console.log('scrolling to bottom')
        this.$refs.bottomEl.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" })
        Promise.resolve(MemeMasterAPI.sendChatGPTmessage(usePrompt))
        .then(result => {
          console.log(result)
          this.chatLog.pop()
          this.messagePending = false
          let responseMessage = {
            sender: 'AI', 
            text: result.data.message.choices[0].text
          }
          this.chatLog.push(responseMessage)
          // console.log('scrolling to bottom')
          this.$refs.bottomEl.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" })
          // this.scrollToBottom()
        })
        .catch(err => {
          // this.loading = false
          console.log('Error generating Meme.', err)
          // show friendly error in user screen
        })
    },
    scrollToBottom () {
      //console.log('scrolling to bottom')
      const firstScrollTo = scroller();
      this.scrollClicked = true
      let element = '#list-item-' + index
      console.log(element)
      setTimeout(() => {
        firstScrollTo(element, 500, { offset: -100 });
      }, 200);
    },
    openChat () {
      this.chatOpen = true
    },
    closeChat () {
      this.chatOpen = false
      // this.$emit("closeChatClicked")
    }
  }
}
</script>

<style>
.v-snackbar__css {
    padding: 0 0 0 0;
}
</style>
