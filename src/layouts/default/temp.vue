<v-menu
          bottom
          left
          offsetY
          v-if="isLoggedIn && !drawer"
          width="300"
          max-width="300"
      >
        <template v-slot:activator="{ props }">
          <v-btn style="margin-right:10px;margin-top:-7px;width:200px" 
                 variant="outlined"
                 color="deep-purple-lighten-4"
                 theme="dark" 
                 v-if="!isMobileDevice && !drawer" 
                 v-bind="props" 
          >
            <v-list-item style="border-radius:5px;opacity:0.9" class="text-center">
              <template v-slot:prepend>
                  <v-avatar :rounded="0" :size="24" >
                    <v-gravatar v-if="gravatar" :email="getUser.email" />
                    <v-img v-else-if="!gravatar && getUser.avatar !== ''" :src="getUser.avatar"></v-img>
                    <v-gravatar v-else :email="getUser.displayName" />
                  </v-avatar>
              </template>
            </v-list-item>
            <img v-if="mmConnected" src="/img/icons/metamask.png" style="max-width:18px%;max-height:18px;padding-right:10px"/>Connected
          </v-btn>
          <v-list-item v-bind="props" v-else  style="border-radius:5px;opacity:0.9;" class="text-center">
            <template v-slot:prepend>
                <v-avatar :rounded="0" :size="24">
                  <v-img v-if="gravatar" :src="'https://www.gravatar.com/avatar/' + getHash('martin.kuijs@gmail.com')" />
                  <v-img v-else-if="!gravatar && getUser.avatar !== ''" :src="getUser.avatar"></v-img>
                  <v-img v-else :src="'https://www.gravatar.com/avatar/' + getHash('martin.kuijs@gmail.com')" />
                </v-avatar>
            </template>
          </v-list-item>
        </template>
        <v-list :style="dark ? 'background:#212121' : 'background:#E8F5E9'">
            <v-list-item >
              <v-row column>
                <v-list-item  v-bind="props" style="border-radius:10px;opacity:0.9;margin-right:0px;" class="text-center">
                  <template v-slot:prepend>
                    <v-avatar :rounded="0" :size="90" >
                      <v-gravatar v-if="gravatar" :email="getUser.displayName" />
                      <v-img v-else-if="!gravatar && getUser.avatar !== ''" :src="getUser.avatar"></v-img>
                      <v-gravatar v-else :email="getUser.displayName" />
                    </v-avatar>
                </template>
                </v-list-item>
                <!-- <v-btn
                  absolute
                  dark
                  fab
                  bottom
                  color="grey"
                  x-small
                  style="margin-left:35px;margin-bottom:10px"
                >
                  <v-icon>mdi-camera</v-icon>
                </v-btn> -->
              </v-row>
            </v-list-item>

            <v-list-item class="text-center" style="margin-top:-5px">
              <v-list-item-content>
                <v-list-item-title >
                  {{ getUser.displayName }}
                </v-list-item-title>
                <!-- <v-list-item-subtitle class="text-truncate">
                  {{ getUser.email }}
                </v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </v-menu>