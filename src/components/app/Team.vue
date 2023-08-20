<template>
  <div id="team">
    <v-responsive style="background-color: #000;">


      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 0">
        
        <v-row class="mt-16">
              <v-col cols="12" :align="'center'">
                <v-progress-circular
                    indeterminate
                    color="deep-purple-darken-2"
                  ></v-progress-circular>
                  <div class="text-h6 mt-2 blue--text">Loading drafts...</div>
              </v-col>
            </v-row>
      
      </v-card>
      
      <v-card theme="dark" class="mt-16 mb-16" height="100%" v-if="view === 1">

        <v-row class="mt-12" :align="center">
          <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
          </v-col>

          <v-col cols="12" md="6" :align="center">
            <div class="text-h4 text-center ma-2">Meet the Meme Master Team Heads</div>

            <div class="text-h6 font-weight-normal text-center ma-2 pt-2">The team posted here are the heads of each sector, and they lead full tech, design and development teams.</div>
          </v-col>

          <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
          </v-col>
        </v-row>

        <v-row class="mt-8 mb-16" :align="center" style="margin-right: 10%;margin-left: 10%;">

          <template v-for="(team, index) in teamArr" :key="index">
            <v-col cols="12" md="4" :align="center" >
              <v-card
                class="mx-auto"
                max-width="300"
                :min-height="isMobileDevice ? '500' : '400'"
                variant="outlined"
              >

                <v-card-item>


                  <div class="text-center mt-8">
                    <v-avatar color="deep-purple-lighten-4" size="120" style="border-radius: 20px;">
                      <v-img :src="'img/avatars/' + team.name + '.png'" style="width: 120px;height:120px;">
                      </v-img>
                    </v-avatar>

                    <div class="text-h4 text-center mt-4">{{ team.name }}</div>
                    <div class="text-h6 text-center">{{ team.title }}</div>
                    <div class="text-center">{{ team.description }}</div>
                  </div>

                </v-card-item>

                <v-card-actions style="position: absolute; bottom: 0;width:100%;">
                  <v-spacer></v-spacer>
                    <v-btn 
                      v-if="team.type === 'linkedin' || team.type === 'both'"
                      size="80"
                      color="#0072b1"
                      @click="gotoLink(team.link)"
                    >
                    <v-icon size="40">mdi-linkedin</v-icon>
                    </v-btn>
                    <v-btn 
                      v-if="team.type === 'email' || team.type === 'both'"
                      size="80"
                      color="grey-lighten-1"
                      @click="gotoLink(team.email)"
                    >
                    <v-icon size="40">mdi-at</v-icon>
                    </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>  
          </template>  

        </v-row>
      </v-card>
  
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { scroller } from 'vue-scrollto/src/scrollTo'
export default {
  name: 'Create',
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
    toDrafts: false,
    toUpload: false,
    name: 'Martin',
    teamArr: [
      {
        name: 'Davey',
        title: 'Founder',
        description: 'Experienced blockchain and AI enthusiast!',
        type: 'both',
        link: 'https://www.linkedin.com/in/david-clark-1483861a/',
        email: 'mailto:info@mememaster.app'
      },
      {
        name: 'David',
        title: 'Marketing & PR',
        description: 'Holding a Major in marketing David lectures in Monash and oversees all marketing and PR',
        type: 'linkedin',
        link: 'https://www.linkedin.com/in/david-henderson-52a520106/',
      },
      {
        name: 'Martin',
        title: 'Sr. Project Manager',
        description: 'Experienced tech project manager overseeing project delivery and execution',
        type: 'linkedin',
        link: 'https://www.linkedin.com/in/martin-kuijs-b144766a/'
      },
      {
        name: 'Krishnan',
        title: 'Tech Lead',
        description: 'Experienced Tech Lead guiding teams to deliver successful solutions.',
        type: 'linkedin',
        link: 'https://www.linkedin.com/in/krishnan-r-9215a5156/'
      },
      {
        name: 'Michael',
        title: 'FullStack Developer',
        description: 'Skilled FullStack Developer proficient in front-end and back-end development.',
        type: 'linkedin',
        link: 'https://www.linkedin.com/in/michaelgunawan2112/'
      },
      {
        name: 'Peter',
        title: 'Blockchain Developer',
        description: 'Implementing decentralized solutions with expertise in blockchain technologies.',
        type: 'linkedin',
        link: 'https://www.linkedin.com/in/peter-joshua/'
      },

    ]
  }),
  components: {
  },
  computed: {
    getUser () {
      return this.$store.state.user
    },
  },
  watch: {
  
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.scrollToTop()
    if (this.getUser.uid === '') {
        this.waitGetUser()
      } else {
        // this.getNFTs()
      }
  },
  methods: {
    waitGetUser () {
      setTimeout(() => {
        if (this.getUser.uid === '') {
          this.waitGetUser()
        } else {
          // this.getNFTs()
        }
      }, 2000);
    },
    gotoLink(link) {
      console.log('button clicked')
      window.open(link, "_blank");
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#team', 500, { offset: -64 });
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
