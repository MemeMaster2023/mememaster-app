<template>
  <div id="aireleases">
    <v-responsive style="background-color: #000;">
      
      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 1">

       <v-row :class="isMobileDevice ? 'mt-12 ml-2 mr-2' : 'mt-12'" :align="center">
        <v-col cols="12" md="2" :align="center" v-if="!isMobileDevice">
        </v-col>

        <v-col cols="12" md="8" :align="center">
          <div class="text-h4 text-center ma-2">Latest AI Releases</div>

          <v-row class="pt-8 mb-2">
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

                  <v-list-item-sub-title v-if="!isMobileDevice">
                    {{ item.subtitle  }}
                  </v-list-item-sub-title>

                  <template v-slot:append>
                    <v-list-item-action>
                      <v-btn variant="text" 
                             color="yellow"
                             size="small"
                             width="100"
                             @click="gotoLink(item.link)"
                      >
                       {{ item.type }}
                    </v-btn>
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
          prependAvatar: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
          title: 'Open LLM Leaderboard',
          subtitle: `The Open LLM Leaderboard aims to track, rank and evaluate LLMs and chatbots as they are released.`,
          link: 'https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard',
          type: 'Website'
        },
        {
          prependAvatar: 'https://icones.pro/wp-content/uploads/2021/08/icone-cible-orange.png',
          title: 'LLM Attacks',
          subtitle: `Universal and Transferable Adversarial Attacks on Aligned Language Models`,
          link: 'https://llm-attacks.org',
          type: 'Website'
        },
        {
          prependAvatar: 'https://yt3.ggpht.com/ytc/AOPolaSbaST1JBNd9phht_n7tFN-VHx0FlvKPHeSDnmu4Q=s88-c-k-c0x00ffffff-no-rj',
          title: 'UNKNOWN: Killer Robots',
          subtitle: "Deep in the heart of the military-industrial complex, a new kind of soldier is being developed. ",
          link: 'https://www.youtube.com/watch?v=YsSzNOpr9cE',
          type: 'Video'
        },
        {
          prependAvatar: 'data:image/jpeg;base64,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',
          title: 'All-in-one platform to build computer vision 10x faster',
          subtitle: `The no-code platform Viso Suite™ is the leading all-in-one solution to develop, deploy, and operate computer vision applications.`,
          link: 'https://viso.ai/',
          type: 'Website'
        },
        {
          prependAvatar: 'data:image/jpeg;base64,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',
          title: 'Jupyter Notebook for Machine Learning - A Gentle Introduction',
          subtitle: "The Jupyter Notebook is an open-source web platform that allows developers to create and share documents that consist of narrative text, live code, visualizations, and equations.",
          link: 'https://viso.ai/deep-learning/jupyter-notebook-for-machine-learning/',
          type: 'Website'
        },
        {
          prependAvatar: 'data:image/png;base64,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',
          title: 'IBM Watson',
          subtitle: "IBM Watson products unlock new levels of productivity by infusing AI and automation into core business workflows.",
          link: 'https://www.ibm.com/watson',
          type: 'Website'
        },
        {
          prependAvatar: 'https://h2o.ai/content/experience-fragments/h2o/us/en/site/header/master/_jcr_content/root/container/header_copy/logo.coreimg.svg/1691517818600/h2o-logo.svg',
          title: 'Democratizing Generative AI',
          subtitle: "h2oGPT, a truly open source generative AI.",
          link: 'https://h2o.ai/',
          type: 'Website'
        },
        {
          prependAvatar: 'https://www.simplilearn.com/ice9/team_images/author_simplilearn.jpg',
          title: 'Convolutional Neural Network Tutorial',
          subtitle: "Artificial Intelligence has come a long way and has been seamlessly bridging the gap between the potential of humans and machines.",
          link: 'https://www.simplilearn.com/tutorials/deep-learning-tutorial/convolutional-neural-network',
          type: 'Website'
        },
        {
          prependAvatar: 'https://www.simplilearn.com/ice9/team_images/author_simplilearn.jpg',
          title: 'AI in the Automotive Industry: A 2023 Outlook',
          subtitle: "Artificial Intelligence (AI) has had a clear impact on many business sectors, but it is particularly powerful in the manufacturing and automotive industries.",
          link: 'https://www.simplilearn.com/ai-in-automative-article',
          type: 'Website'
        },
        {
          prependAvatar: 'https://static.vecteezy.com/system/resources/previews/006/693/936/original/compass-icon-template-black-color-editable-compass-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg',
          title: 'Definitions of takeoff',
          subtitle: "In this post, an AI takeoff can be roughly construed as 'the dynamics of the world associated with the development of powerful artificial intelligence.''",
          link: 'https://www.alignmentforum.org/posts/YgNYA6pj2hPSDQiTE/distinguishing-definitions-of-takeoff',
          type: 'Website'
        },
        {
          prependAvatar: '',
          title: 'Definitions of takeoff',
          subtitle: "In this post, an AI takeoff can be roughly construed as 'the dynamics of the world associated with the development of powerful artificial intelligence.''",
          link: 'https://www.alignmentforum.org/posts/YgNYA6pj2hPSDQiTE/distinguishing-definitions-of-takeoff',
          type: 'Website'
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
    gotoLink(link) {
      window.open(link, "_blank");
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
