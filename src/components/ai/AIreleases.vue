<template>
  <div id="aireleases">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 1">

       <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" :align="center">
        <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="8" :align="center">
          <div class="text-h4 text-center ma-2">Latest AI Releases</div>

          <v-row class="pt-8">
            <v-col cols="12" md="8">
              <div style="text-align: justify;" class="cardTextCreateSmall ma-2">
                This is a section for the latest AI innovations / news and products that is updated regularly<br><br>
                Prepare for a wave of innovation as we gear up to unveil the latest AI releases that are set to revolutionize the way we interact with technology. We're on the cusp of introducing cutting-edge advancements that will redefine the boundaries of what AI can achieve.<br><br>
                Our dedicated team of researchers and engineers are pushing the boundaries of artificial intelligence to bring you a regular update of what is happening in the AI space as well as products and services we are developing.<br>
              </div>
            </v-col>
            <v-col cols="12" md="4" :align="isMobileDevice ? 'center' : 'right'">
              <v-img style="max-width: 300px; border-radius: 10px;"
                 src="/img/home/latest_ai_releases.webp"></v-img>
            </v-col>
          </v-row>

          <hr>

          <v-row class="pt-8">
            <v-col cols="12" md="12">
              <v-list
                lines="two"
              >
              <v-list-subheader>Latest AI Releases</v-list-subheader>
              <v-list-item v-for="item in items">

                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="item.prependAvatar" style="width: 120px; height:120px;border-radius: 10px;">
                </v-img>
                  </v-avatar>
                </template>

                  <v-list-item-title class="font-weight-bold">
                    {{ item.title  }}
                  </v-list-item-title>

                  <v-list-item-sub-title>
                    {{ item.subtitle  }}
                  </v-list-item-sub-title>

                  <template v-slot:append>
                    <v-list-item-action>
                      <v-btn variant="text" color="yellow">open</v-btn>
                    </v-list-item-action>
                  </template>

              </v-list-item>

              </v-list>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="8" :align="center" v-if="!isMobileDevice">
        </v-col>

       </v-row>

      </v-card>
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'AI Releases',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    view: 1,
    items: [
        {
          prependAvatar: 'https://static.vecteezy.com/system/resources/previews/021/059/827/original/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg',
          title: 'The GPT Factory',
          subtitle: `The GPT Factory is an AI development company that helps turn AI ideas into profitable products. They offer a range of services, including development of ChatGPT applications, AI chatbots, AI-based web apps, and AI company incorporation.`,
        },
        {
          prependAvatar: 'https://aichatdocs.com/static/media/logoS.30b45fba09a329efe7bf.png',
          title: 'Chat Documents',
          subtitle: `ChatDocuments is an AI-powered app that enables users to engage in interactive chats with various document formats, including PDF, PPTX, XLSX, and DOCX.`,
        },
        {
          prependAvatar: 'https://play-lh.googleusercontent.com/-CetjiqKMZTjlygvTx9p4izVOPObkpZ0MdmmyB7fHb5qV1nVArpuIzTXKbfY1LA-EvIz',
          title: 'HappyChat',
          subtitle: "HappyChat AI is a tool that allows users to easily create conversational chatbots for their websites. Powered by ChatGPT, this tool doesn't require any coding skills to use."
        },
      ],
  }),
  components: {
  },
  computed: {

  },
  watch: {
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.scrollToTop()
    this.init()
  },
  methods: {
    init () {
     
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#aireleases', 500, { offset: -64 });
      }, 200);
    },
  }
}
</script>

<style lang="scss">
  .homeText {
    font-family: 'Gruppo';
    font-size: 40px;
    line-height: 1em;
    color: #FFF;
  }
  .homeTextSmall {
    font-family: 'Gruppo';
    font-size: 28px;
    line-height: 1em;
    color: #FFF;
  }
  .homeTextSmaller {
    font-family: 'Gruppo';
    font-size: 24px;
    line-height: 1em;
    color: #FFF;
    margin-top: 16px;
  }
  .cardTextTitle {
    font-family: 'Saira';
    font-size: 20px;
    font-weight: bold;
  }
  .cardTextCreateSmall {
    font-family: 'Jura';
    font-size: 18px;
  }
  .gallery {
    font-family: 'Gruppo';
    font-size: 45px;
    line-height: 1em;
    color: #FFF;
  }
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>
