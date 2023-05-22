<template>
  <div id="myprofile" :style="dark ? 'background:#272727;height: 100%;' : 'background:#FFF;height: 100%;'">
    <v-layout column pr-2 pl-2 :style="windowWidth < 770 ? '' : 'margin-left:20%;margin-right:20%'">
    <v-slide-y-transition mode="out-in">

      <!-- ####################### SKELETON LOADERS ####################### -->
      <v-layout column pa-2 v-if="loading">

        <p class="mt-0"></p>

        <template >
          <v-skeleton-loader style="border-radius:10px"
            class="mx-auto"
            width="90"
            height="90"
            type="image"
          ></v-skeleton-loader>
        </template>

        <p class="mt-2"></p>

        <template v-for="n in 6" >
          <v-skeleton-loader
            class="mx-auto"
            width="100%"
            height="100"
            type="list-item-two-line"
            :dark="dark"
            :key="n"
          ></v-skeleton-loader>
        </template>


      </v-layout>

      <!-- ####################### COMPONENTS ####################### -->
      <v-layout column pa-2 v-else fluid>
        <v-list two-line subheader :dark="dark">
          <v-list-item >
            <v-layout column align-center>
              <v-list-item-avatar :size="90" style="border-radius:10px;opacity:0.8;" >
                <v-gravatar v-if="getUser.gravatar && getPlatform !== 'Android'" :email="getUser.displayName" />
                <v-img v-else-if="!getUser.gravatar && getUser.avatar !== ''" :src="getUser.avatar"></v-img>
                <v-img v-else-if="getUser.gravatar && getUser.avatar === '' && getPlatform === 'Android'" :src="tempImage"></v-img>
                <v-gravatar v-else :email="getUser.displayName" />
              </v-list-item-avatar>
              <v-btn
                absolute
                dark
                fab
                bottom
                color="grey"
                x-small
                style="margin-left:75px;margin-bottom:15px"
                @click="photoDialog = true"
              >
                <v-icon>mdi-camera</v-icon>
              </v-btn>
            </v-layout>
          </v-list-item>

          <v-list-item class="text-center">
            <v-list-item-content>
              <v-list-item-title style="font-size:18px" class="text-truncate font-weight-bold">
                {{ getUser.displayName }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-truncate">
                {{ getUser.isVerified ? currentUser.email : '' }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-truncate grey--text">
                Member Since {{ getUser.memberSince === 0 ? '' : getDate(getUser.memberSince) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-progress-linear
            background-color="grey lighten-2"
            color="lime darken-2"
            height="20"
            :value="60"
            rounded
           >
           <span style="font-size:10px;margin-left:0px" class="font-weight-bold">{{'Profile Score'}} {{ 60 }}%</span>
         </v-progress-linear> -->


          <v-subheader class="font-weight-medium">{{ lang[getLanguage].ACC_VERIFICATION }}</v-subheader>

          <v-list-item link @click="emailDetailClicked" style="margin-top:-15px">
            <v-list-item-avatar >
                <v-icon v-if="getUser.isVerified" color="green" large>mdi-email-check-outline</v-icon>
                <v-icon v-if="!getUser.isVerified" color="amber darken-3" large>mdi-alert-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="subheading font-weight-bold">{{ lang[getLanguage].ACC_EMAIL }}</v-list-item-title>
              <v-list-item-subtitle>{{ getUser.isVerified ? 'Verified' : 'Not Verified'}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action >
                <v-btn v-if="getUser.isVerified" icon large>
                  <v-icon color="green">mdi-check-circle-outline</v-icon>
                </v-btn>
                <v-btn @click.stop="emailDetailClicked" v-if="!getUser.isVerified" color="amber darken-3" outlined small>
                  Verify
                </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>

          <!-- <v-list-item link>
            <v-list-item-avatar >
                <v-img v-if="getWeb3.mmLoggedIn" src="/img/app/metamask-icon.png" width="40"></v-img>
                <v-icon v-if="!getWeb3.mmLoggedIn" color="amber darken-3" large>mdi-alert-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="subheading font-weight-bold">MetaMask</v-list-item-title>
              <v-list-item-subtitle>{{ getWeb3.mmLoggedIn ? 'Connected ' : 'Not Connected'}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn v-if="getWeb3.mmLoggedIn" icon large>
                  <v-icon color="green">mdi-check-circle-outline</v-icon>
                </v-btn>
                <v-btn v-if="!getWeb3.mmLoggedIn" @click="getWeb3Instance" color="amber darken-3" outlined small>
                  Connect Now
                </v-btn>
            </v-list-item-action>
          </v-list-item >

          <v-divider></v-divider>
          <v-list-item link>
            <v-list-item-avatar >
                <v-icon v-if="getUser.phoneVerified" color="green" large>mdi-cellphone-text</v-icon>
                <v-icon v-if="!getUser.phoneVerified" color="amber darken-3" large>mdi-cellphone-off</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="subheading font-weight-bold">{{ lang[getLanguage].ACC_PHONE }}</v-list-item-title>
              <v-list-item-subtitle>{{ getUser.phoneVerified ? 'Verified' : 'Not Verified'}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn v-if="getUser.phoneVerified" icon large>
                  <v-icon color="green">mdi-check-circle-outline</v-icon>
                </v-btn>
                <v-btn v-if="!getUser.phoneVerified" color="amber darken-3" outlined small>
                  Verify
                </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider> -->

          <!-- <v-list-item link>
            <v-list-item-avatar >
                <v-icon color="green" large>mdi-form-textbox-password</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="subheading font-weight-bold">Password</v-list-item-title>
              <v-list-item-subtitle>********</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn @click="passwordDialog = true" color="blue" outlined small>
                  {{ lang[getLanguage].BUT_CHANGE }}
                </v-btn>
            </v-list-item-action>
          </v-list-item> -->

          <v-list-item link>
            <v-list-item-avatar >
                <v-icon color="blue" large>mdi-wallet-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="subheading font-weight-bold">Connected Wallet</v-list-item-title>
              <v-list-item-subtitle>{{ getAccounts[0] }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action >
              <v-btn v-if="mmConnected || binanceConnected || walletConnected" icon large>
                <v-icon color="green">mdi-check-circle-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
          <v-subheader class="font-weight-medium">{{ lang[getLanguage].ACC_INFO }}</v-subheader>

          <!-- <v-list-item link>
            <v-list-item-avatar >
                <v-icon color="blue" large>mdi-layers-triple</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="subheading font-weight-bold">Account Level</v-list-item-title>
              <v-list-item-subtitle class="text-truncate" v-if="getUser.accLevel === 1">Level One - Read Only</v-list-item-subtitle>
              <v-list-item-subtitle class="text-truncate" v-if="getUser.accLevel === 2">Level Two - Create, Edit and Upload</v-list-item-subtitle>
              <v-list-item-subtitle class="text-truncate" v-if="getUser.accLevel === 3">Level Tree - Super Admin</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn icon large>
                  <v-icon color="blue">mdi-information-outline</v-icon>
                </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider> -->

          <v-list-item link style="margin-top:-15px">
            <v-list-item-avatar >
                <v-img :src="'/img/tiers/' + getUser.accLevel  + '.png'" max-width="40" max-height="40" style="opacity:0.8"></v-img>
            </v-list-item-avatar>
            <v-list-item-content v-if="!accTypeEdit">
              <v-list-item-title class="subheading font-weight-bold">{{ lang[getLanguage].ACC_TIER }}</v-list-item-title>
              <v-list-item-subtitle v-if="getUser.accLevel === 1">Free User</v-list-item-subtitle>
              <v-list-item-subtitle v-if="getUser.accLevel === 2">GOBLIN - Holding min. 40,000 TMO</v-list-item-subtitle>
              <v-list-item-subtitle v-if="getUser.accLevel === 3">OGRE - Holding min. 75,000 TMO</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="accTypeEdit" style="max-height:80px;padding-top:10px">
              <v-select
                v-model="getUser.accType"
                :items="items"
                item-value="id"
                item-text="name"
                outlined
              ></v-select>
            </v-list-item-content>

            <v-list-item-action >

              <v-layout>
                <v-btn @click.stop="upgradeClicked" v-if="getUser.accLevel === 1" color="blue" outlined small style="margin-top:7px">
                  Upgrade
                </v-btn>

                <v-btn icon large @click="tierInfoDialog = true">
                  <v-icon color="blue">mdi-information-outline</v-icon>
                </v-btn>
              </v-layout>


            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-avatar >
                <v-icon v-if="getUser.accStatus === 0" color="amber darken-3" large>mdi-account-alert-outline</v-icon>
                <v-icon v-if="getUser.accStatus === 1" color="blue" large>mdi-account-check-outline</v-icon>
                <v-icon v-if="getUser.accStatus === 2" color="red lighten 1" large>mdi-account-cancel-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content >
              <v-list-item-title class="subheading font-weight-bold">{{ lang[getLanguage].ACC_STATUS }}</v-list-item-title>
              <v-list-item-subtitle v-if="getUser.accStatus === 0">Inactive</v-list-item-subtitle>
              <v-list-item-subtitle v-if="getUser.accStatus === 1">Active</v-list-item-subtitle>
              <v-list-item-subtitle v-if="getUser.accStatus === 2">Suspended</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action >
              <!-- <v-btn icon large>
                <v-icon color="blue">mdi-information-outline</v-icon>
              </v-btn> -->
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
          <v-subheader class="font-weight-medium">{{ lang[getLanguage].ACC_PERSONAL }}</v-subheader>

          <v-list-item link style="margin-top:-15px">
            <v-list-item-avatar >
                <v-icon color="blue" large>mdi-account-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-if="!accNameEdit">
              <v-list-item-title class="subheading font-weight-bold">{{ getUser.accType === 10 ? lang[getLanguage].ACC_NAME : getUser.accType === 2 ? 'Admin Name' : 'Superuser Name' }}</v-list-item-title>
              <v-list-item-subtitle >{{ getUser.displayName}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="accNameEdit" style="max-height:80px;padding-top:10px">
              <v-text-field
                v-model="getUser.displayName"
                maxlength="50"
                outlined
              ></v-text-field>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn icon large @click="accNameEdit = true, oldValue = getUser.displayName" v-if="!accNameEdit">
                  <v-icon color="blue">mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-layout>
                  <v-btn icon large @click="saveAccName" v-if="accNameEdit" :disabled="getUser.displayName.length < 2">
                    <v-icon color="green">mdi-content-save-outline</v-icon>
                  </v-btn>
                  <v-btn icon large @click="accNameEdit = false, getUser.displayName = oldValue" v-if="accNameEdit">
                    <v-icon color="grey">mdi-close-circle</v-icon>
                  </v-btn>
                </v-layout>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-avatar >
                <v-icon color="blue" large>mdi-text-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-if="!accAboutEdit">
              <v-list-item-title class="subheading font-weight-bold">{{ lang[getLanguage].ACC_ABOUT }}</v-list-item-title>
              <v-list-item-subtitle >{{ getUser.aboutMe === '' ? lang[getLanguage].ACC_ABOUT_TEXT : getUser.aboutMe }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="accAboutEdit" style="max-height:180px;padding-top:10px">
              <v-textarea
                v-model="getUser.aboutMe"
                rows="3"
                auto-grow
                :placeholder="lang[getLanguage].ACC_ABOUT_TEXT"
                maxlength="200"
                outlined
              ></v-textarea>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn icon large @click="accAboutEdit = true, oldValue = getUser.aboutMe" v-if="!accAboutEdit">
                  <v-icon color="blue">mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-layout>
                  <v-btn icon large @click="saveAccAbout" v-if="accAboutEdit">
                    <v-icon color="green">mdi-content-save-outline</v-icon>
                  </v-btn>
                  <v-btn icon large @click="accAboutEdit = false, getUser.aboutMe = oldValue" v-if="accAboutEdit">
                    <v-icon color="grey">mdi-close-circle</v-icon>
                  </v-btn>
                </v-layout>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-avatar >
                <v-icon color="blue" large>mdi-account-details-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-if="!accFullNameEdit">
              <v-list-item-title class="subheading font-weight-bold">{{ lang[getLanguage].ACC_FULL_NAME }}</v-list-item-title>
              <v-list-item-subtitle >{{ getUser.fullName === '' ? 'Add your full legal name here' : getUser.fullName }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="accFullNameEdit" style="max-height:80px;padding-top:10px">
              <v-text-field
                v-model="getUser.fullName"
                maxlength="70"
                outlined
              ></v-text-field>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn icon large @click="accFullNameEdit = true, oldValue = getUser.fullName" v-if="!accFullNameEdit">
                  <v-icon color="blue">mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-layout>
                  <v-btn icon large @click="saveAccFullName" v-if="accFullNameEdit">
                    <v-icon color="green">mdi-content-save-outline</v-icon>
                  </v-btn>
                  <v-btn icon large @click="accFullNameEdit = false, getUser.fullName = oldValue" v-if="accFullNameEdit">
                    <v-icon color="grey">mdi-close-circle</v-icon>
                  </v-btn>
                </v-layout>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-avatar >
                <v-icon color="blue" large>mdi-calendar-account-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-if="!accDobEdit">
              <v-list-item-title class="subheading font-weight-bold">{{ lang[getLanguage].ACC_DOB }}</v-list-item-title>
              <v-list-item-subtitle >{{ getUser.dob === '' ? lang[getLanguage].ACC_DOB_TEXT : getUser.dob }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="accDobEdit" style="max-height:80px;padding-top:10px">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="getUser.dob"
                    label="Birthday"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn icon large @click="accDobEdit = true, oldValue = getUser.dob" v-if="!accDobEdit">
                  <v-icon color="blue">mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-layout>
                  <v-btn icon large @click="saveDob" v-if="accDobEdit">
                    <v-icon color="green">mdi-content-save-outline</v-icon>
                  </v-btn>
                  <v-btn icon large @click="accDobEdit = false, getUser.dob = oldValue" v-if="accDobEdit">
                    <v-icon color="grey">mdi-close-circle</v-icon>
                  </v-btn>
                </v-layout>
            </v-list-item-action>
          </v-list-item>

          <!-- <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-avatar >
                <v-icon v-if="getUser.sex === 0" color="blue" large>mdi-gender-male-female</v-icon>
                <v-icon v-if="getUser.sex === 1" color="blue" large>mdi-gender-male</v-icon>
                <v-icon v-if="getUser.sex === 2" color="blue" large>mdi-gender-female</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-if="!accSexEdit">
              <v-list-item-title class="subheading font-weight-bold">{{ lang[getLanguage].ACC_GENDER }}</v-list-item-title>
              <v-list-item-subtitle v-if="getUser.sex === 0">{{ lang[getLanguage].ACC_NOT_SET }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="getUser.sex === 1">{{ lang[getLanguage].ACC_MALE }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="getUser.sex === 2">{{ lang[getLanguage].ACC_FEMALE }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="accSexEdit" style="max-height:80px;padding-top:10px">
              <v-select
                v-model="getUser.sex"
                :items="itemsSex"
                item-value="id"
                item-text="name"
                outlined
              ></v-select>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn icon large @click="accSexEdit = true, oldValue = getUser.sex" v-if="!accSexEdit">
                  <v-icon color="blue">mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-layout>
                  <v-btn icon large @click="saveAccSex" v-if="accSexEdit">
                    <v-icon color="green">mdi-content-save-outline</v-icon>
                  </v-btn>
                  <v-btn icon large @click="accSexEdit = false, getUser.sex = oldValue" v-if="accSexEdit">
                    <v-icon color="grey">mdi-close-circle</v-icon>
                  </v-btn>
                </v-layout>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-avatar >
                <v-icon color="blue" large>mdi-map-marker</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="subheading font-weight-bold">Address Details</v-list-item-title>
              <v-list-item-subtitle class="text-truncate">Address</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn icon large>
                  <v-icon color="blue">mdi-square-edit-outline</v-icon>
                </v-btn>
            </v-list-item-action>
          </v-list-item> -->

          <!-- <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-avatar >
                <v-icon color="blue" large>mdi-translate</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-if="!accLangEdit">
              <v-list-item-title class="subheading font-weight-bold">{{ lang[getLanguage].ACC_LANG }}</v-list-item-title>
              <v-list-item-subtitle v-if="getUser.language === 'id'">Bahasa Indonesia</v-list-item-subtitle>
              <v-list-item-subtitle v-if="getUser.language === 'en'">English</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="accLangEdit" style="max-height:80px;padding-top:10px">
              <v-select
                v-model="getUser.language"
                :items="itemsLanguage"
                item-value="id"
                item-text="name"
                outlined
              ></v-select>
            </v-list-item-content>
            <v-list-item-action >
                <v-btn icon large @click="accLangEdit = true, oldValue = getUser.language" v-if="!accLangEdit">
                  <v-icon color="blue">mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-layout>
                  <v-btn icon large @click="saveAccLanguage" v-if="accLangEdit">
                    <v-icon color="green">mdi-content-save-outline</v-icon>
                  </v-btn>
                  <v-btn icon large @click="accLangEdit = false, getUser.language = oldValue" v-if="accLangEdit">
                    <v-icon color="grey">mdi-close-circle</v-icon>
                  </v-btn>
                </v-layout>
            </v-list-item-action>
          </v-list-item> -->

          <v-divider></v-divider>
          <v-subheader class="font-weight-medium">{{ lang[getLanguage].ACC_APP }}</v-subheader>


          <v-list-item link style="margin-top:-15px">
            <v-list-item-avatar >
                <v-icon color="blue" >mdi-timeline-text-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-size:14px" class="font-weight-bold">{{ lang[getLanguage].ACC_APP_VER }}</v-list-item-title>
              <v-list-item-subtitle>V1.4.5</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link @click="openTerms">
            <v-list-item-avatar >
                <v-icon color="blue" >mdi-text-box-check-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-size:14px" class="font-weight-bold">{{ lang[getLanguage].ACC_APP_TERMS }}</v-list-item-title>

            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link @click="openPrivacy">
            <v-list-item-avatar >
                <v-icon color="blue" >mdi-shield-check-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-size:14px" class="font-weight-bold">{{ lang[getLanguage].ACC_APP_PRIVACY }}</v-list-item-title>

            </v-list-item-content>
          </v-list-item>

        </v-list>

        <p class="mt-0"></p>

        <!-- ################################## DIALOGS ######################################## -->

        <v-dialog v-model="emailDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card style="height:auto;width:100%;max-width:400px;" :dark="dark">
            <v-toolbar flat  :color="dark ? 'grey darken-4' : 'grey lighten-3'">
              <v-btn icon @click.native="emailDialog = false">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title >Account Email</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
              <v-layout column align-center fluid fill-height pa-2 v-if="!changeEmail && !emailSet && !updateEmailSuccess" >
                <v-flex style="margin: 0 16px 0 16px;max-width:400px">
                  <p class="mt-0"></p>
                  <p class="subheading font-weight-bold text-center">{{ lang[getLanguage].ACC_EMAIL_NOT_SET }}</p>
                  <v-layout style="margin-top:-10px">
                    <v-spacer></v-spacer>
                    <v-icon color="amber darken-3" x-large>mdi-email-alert-outline</v-icon>
                    <v-spacer></v-spacer>
                  </v-layout>
                  <p class="subheading text-center">{{ lang[getLanguage].ACC_EMAIL_ASS }}</p>
                  <p class="mt-0"></p>
                  <p class="subheading font-weight-medium text-center">{{ currentUser.email }}</p>
                    <p class="mt-2"></p>
                    <v-divider></v-divider>
                    <p class="mt-2"></p>
                  <span class="subheading text-center font-weight-medium">{{ lang[getLanguage].ENTER_EMAIL }}</span>
                  <p class="mt-0"></p>
                  <v-form v-model="valid" ref="form" dense >
                    <v-text-field class="title"
                      v-model="emailAddress"
                      outlined
                      color="#388E3C"
                      :rules="emailRules"
                      label="Email Address"
                      append-icon="mdi-email-outline"
                      @input="change0"
                      @change="change0"
                    ></v-text-field>
                    <v-text-field style="width:100%" v-show="false"
                      v-model="currentPassword"
                      :type="show1 ? 'text' : 'password'"
                      outlined
                      color="#388E3C"
                      :rules="passwordRules"
                      min="8"
                      label="Current Password"
                      :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      @click:append="show1 = !show1"
                      @input="change0"
                    ></v-text-field>
                  </v-form >
                  </v-flex>

                  <p class="mt-0"></p>

                   <v-alert
                     dense
                     color="pink"
                     type="error"
                     :value="alert"
                     outlined
                     border="left"
                   >
                     <span>{{ alertMessage }}</span>
                   </v-alert>

                  <v-layout fill-height ></v-layout>

                  <v-btn color="#388E3C" large style="max-width:400px;width: 100%;color:#FFF;text-transform: none !important;"
                         @click="clickVerifyEmail" :loading="loading" :disabled="!dataProvided || loading || currentPassword.length <= 6">
                    <v-icon left>mdi-arrow-right-bold</v-icon>{{ lang[getLanguage].BUT_VERIFY }}
                  </v-btn>

                  <p class="mt-0"></p>

                  <v-btn  outlined color="grey darken-2" large style="max-width:400px;width: 100%;color:#FFF;text-transform: none !important;"
                         @click="emailDialog = false" >
                    <v-icon left>mdi-cancel</v-icon>{{ lang[getLanguage].BUT_LATER }}
                  </v-btn>

              </v-layout >

              <v-layout column align-center fluid fill-height pa-2 v-else-if="emailSet && !verificationEmail">
                <v-flex style="margin: 0 16px 0 16px;max-width:400px">
                  <p class="mt-0"></p>
                  <p v-if="!currentUser.emailVerified" class="body-1 font-weight-bold text-center">{{ lang[getLanguage].ACC_NOT_VERIFIED }}</p>
                  <v-layout style="margin-top:-10px" v-if="!currentUser.emailVerified">
                    <v-spacer></v-spacer>
                    <v-icon color="amber darken-3" x-large>mdi-alert-circle-check-outline</v-icon>
                    <v-spacer></v-spacer>
                  </v-layout>
                  <p v-if="currentUser.emailVerified" class="body-1 font-weight-bold">{{ lang[getLanguage].ACC_VERIFIED }}</p>
                  <v-layout style="margin-top:-10px" v-if="currentUser.emailVerified" pt-1>
                    <v-spacer></v-spacer>
                    <v-icon color="green" x-large>mdi-check-circle-outline</v-icon>
                    <v-spacer></v-spacer>
                  </v-layout>
                  <p class="mt-0"></p>
                  <span v-if="!currentUser.emailVerified" class="subheading text-center">{{ lang[getLanguage].ACC_VERIFY }}</span>
                  <p class="mt-0"></p>
                  <p class="subheading font-weight-medium text-center">{{ currentUser.email }}</p>
                    <p class="mt-2"></p>
                    <v-divider></v-divider>
                    <p class="mt-2"></p>
                  <p class="mt-0"></p>
                  <v-text-field style="width:100%" v-show="false"
                    v-if="!currentUser.emailVerified"
                    v-model="currentPassword"
                    :type="show1 ? 'text' : 'password'"
                    outlined
                    color="#388E3C"
                    :rules="passwordRules"
                    min="8"
                    label="Current Password"
                    :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-flex>
                <p class="mt-0"></p>

                 <v-alert
                   dense
                   color="pink"
                   type="error"
                   :value="alert"
                   outlined
                   border="left"
                 >
                   <span>{{ alertMessage }}</span>
                 </v-alert>

                <v-layout fill-height ></v-layout>

                <v-btn v-if="!currentUser.emailVerified" color="#388E3C" large style="max-width:400px;width: 100%;color:#FFF;text-transform: none !important;"
                       @click="clickVerifyEmail2" :loading="loading" :disabled="loading || currentPassword.length <= 6">
                  <v-icon left>mdi-arrow-right-bold</v-icon>{{ lang[getLanguage].BUT_VERIFY }}
                </v-btn>

                <v-btn v-if="currentUser.emailVerified" text color="#388E3C" large style="max-width:400px;width: 100%;color:#FFF;text-transform: none !important;"
                       @click="clickChangeEmail" :loading="loading" :disabled="loading">
                  <v-icon left>mdi-email-edit-outline</v-icon>{{ lang[getLanguage].BUT_CHANGE_EMAIL }}
                </v-btn>

                <p class="mt-0"></p>

                <v-btn v-if="!currentUser.emailVerified" outlined color="grey darken-2" large style="max-width:400px;width: 100%;color:#FFF;text-transform: none !important;"
                       @click="emailDialog = false" >
                  <v-icon left>mdi-cancel</v-icon>{{ lang[getLanguage].BUT_LATER }}
                </v-btn>

              </v-layout >

              <!-- ################ Email Updated ################## -->
              <v-layout column align-center fluid fill-height pa-4 v-else-if="updateEmailSuccess || verificationEmail" >

                <p class="mt-0"></p>

                <v-alert
                  dense
                  color="green"
                  type="success"
                  :value="alertEmail"
                  outlined
                  border="left"
                >
                  <span>{{ alertMessageEmail }}</span>
                </v-alert>

                <p class="mt-0"></p>
                <span style="color:#9E9E9E;font-size:18px" class="font-weight-bold text-center">{{ lang[getLanguage].CHECK_EMAIL }}</span>
                <p class="mt-0"></p>
                <span style="color:#9E9E9E;font-size:16px" class="font-weight-medium text-center">{{ lang[getLanguage].EMAIL_INSTRUCTIONS }}</span>

                <p class="mt-4"></p>

                <v-btn color="#388E3C" dark bottom fixed large :style="windowWidth < 767 ? 'width:95%;color:#FFF' : 'width:400px;color:#FFF'"
                     @click="changeEmailDone">
                  <v-icon left>mdi-check-circle-outline</v-icon>{{ lang[getLanguage].BUT_OK }}
                </v-btn>

              </v-layout>

              <!-- ################ Email Updated ################## -->
              <v-layout column align-center fluid fill-height pa-4 v-else-if="changeEmail" >

                <v-flex style="margin: 0 16px 0 16px;max-width:400px">
                  <p class="mt-0"></p>

                  <span class="subheading text-center font-weight-medium">{{ lang[getLanguage].ENTER_NEW_EMAIL }}</span>
                  <p class="mt-0"></p>
                  <v-form v-model="valid" ref="form" dense >
                    <v-text-field class="title"
                      v-model="emailAddress"
                      outlined
                      color="#388E3C"
                      :rules="emailRules"
                      label="Email Address"
                      append-icon="mdi-email-outline"
                      @input="change0"
                      @change="change0"
                    ></v-text-field>
                    <v-text-field style="width:100%" v-show="false"
                      v-model="currentPassword"
                      :type="show1 ? 'text' : 'password'"
                      outlined
                      color="#388E3C"
                      :rules="passwordRules"
                      min="8"
                      label="Current Password"
                      :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      @click:append="show1 = !show1"
                      @input="change0"
                    ></v-text-field>
                  </v-form >

                  <p class="mt-0"></p>

                   <v-alert
                     dense
                     color="pink"
                     type="error"
                     :value="alert"
                     outlined
                     border="left"
                   >
                     <span>{{ alertMessage }}</span>
                   </v-alert>

                  <v-layout fill-height ></v-layout>

                  <v-btn color="#388E3C" large style="max-width:400px;width: 100%;color:#FFF"
                         @click="clickChangeEmailConfirm" :loading="loading2" :disabled="loading2">
                    <v-icon left>mdi-arrow-right-bold</v-icon>{{ lang[getLanguage].BUT_CONFIRM }}
                  </v-btn>

                </v-flex>

              </v-layout>
            </v-card>
        </v-dialog>

        <v-dialog v-model="photoDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card :dark="dark">
            <v-toolbar flat :color="dark ? 'grey darken-4' : 'grey lighten-3'">
              <v-btn icon @click.native="photoDialog = false">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>{{ lang[getLanguage].ACC_CH_PIC }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-layout column align-center pa-2>
              <p class="mt-2"></p>
              <picture-input
                ref="pictureInput"
                width="250"
                height="250"
                margin="16"
                radius="20"
                accept="image/jpg,image/jpeg,image/png"
                size="0.5"
                button-class="btn"
                :removable="true"
                :custom-strings="{
                  upload: '<h1>Bummer!</h1>',
                  drag: 'Click to select a photo'
                }"
                @change="onChange"
                @remove="onRemove">
              </picture-input>

              <v-btn color="#388E3C" dark @click="setProfilePhoto" bottom fixed large
                   :loading="loading" :disabled="loading || image === ''">
                <v-icon left>mdi-check-circle-outline</v-icon>{{ lang[getLanguage].ACC_SET_PIC }}
              </v-btn>

            </v-layout >
          </v-card>
      </v-dialog>

      <v-dialog v-model="passwordDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card :dark="dark">
          <v-toolbar flat :color="dark ? 'grey darken-4' : 'grey lighten-3'">
            <v-btn icon @click.native="passwordDialog = false">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Change Your Password</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-layout column align-center pa-3>

            <v-flex :style="windowWidth < 767 ? 'width:100%' : 'width:400px'">
              <p class="mt-4"></p>
              <v-text-field style="width:100%" v-show="false"
                v-model="currentPassword"
                :type="show1 ? 'text' : 'password'"
                outlined
                color="#388E3C"
                :rules="passwordRules"
                min="8"
                label="Current Password"
                :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-layout pb-2>
                <span class="subheading" >New Password</span>
                <v-spacer></v-spacer>
                <v-icon @click="pwdDialog = true" color="#388E3C">mdi-information-outline</v-icon>
              </v-layout>
              <password style="width:100%"
                v-model="newPassword"
                :toggle="true"
                :placeholder="lang[getLanguage].PRO_CH_PL"
                @score="showScore"
                @feedback="showFeedback"
                :secureLength="secureLength"
              />

              <p v-if="alert" class="mt-2"></p>
               <v-alert
                 dense
                 color="pink"
                 type="error"
                 :value="alert"
                 outlined
                 border="left"
               >
                 <span>{{ alertMessage }}</span>
               </v-alert>

              <v-layout column align-center pa-3>
                <v-btn color="#388E3C" @click="changePassword" bottom fixed large
                   :style="windowWidth < 767 ? 'width:95%;color:#FFF' : 'width:400px;color:#FFF'"
                   :loading="loading2" :disabled="!dataProvided || loading2">
                  <v-icon left>mdi-check-circle-outline</v-icon>&nbsp;Set new Password
                </v-btn>
              </v-layout>

            </v-flex>

        </v-layout>

        </v-card>
    </v-dialog>

    <v-dialog
      v-model="pwdDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title style="font-size:16px" class="font-weight-bold">Strong Password Suggestions</v-card-title>

        <v-card-text >
           &bull; At least 8 characters—the more characters, the better.<br>
           &bull; A mixture of both uppercase and lowercase letters.<br>
           &bull; A mixture of letters and numbers.<br>
           &bull; Inclusion of at least one special character, e.g., ! @ # ? ]
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#388E3C"
            outlined
            @click="pwdDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="tierInfoDialog"
      max-width="500"
    >
      <v-card :dark="dark">
        <v-card-title style="font-size:18px"
        class="font-weight-bold"
        >Token Monster Tiers
       </v-card-title>

        <v-card-text >
          <table style="font-size:16px">
            <tbody>
              <tr>
                <td style="width:40px"><v-img src="/img/tiers/1.png" max-width="32" max-height="32" style="opacity:0.7"></v-img></td>
                <td style="width:100px">FREE USER</td>
                <td>Holding less then 40,000 TMO</td>
              </tr>
              <tr>
                <td style="width:40px"><v-img src="/img/tiers/2.png" max-width="32" max-height="32" style="opacity:0.7"></v-img></td>
                <td style="width:100px">GOBLIN</td>
                <td>Holding 40,000 TMO or more</td>
              </tr>
              <tr>
                <td style="width:40px"><v-img src="/img/tiers/3.png" max-width="32" max-height="32" style="opacity:0.7"></v-img></td>
                <td style="width:100px">OGRE</td>
                <td>Holding 75,000 TMO or more</td>
              </tr>
            </tbody>
          </table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            outlined
            @click="tierInfoDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="changingAccountsDialog" persistent max-width="400">
      <v-card
       :dark="dark"
      >
      <v-toolbar flat>
        <v-card-title style="font-size:18px" class="font-weight-bold">Changing Accounts</v-card-title>
      </v-toolbar>

      <v-layout column align-center pl-4 pr-4 pb-4>
        <v-progress-linear
           color="#388E3C"
           indeterminate
           rounded
           height="8"
         ></v-progress-linear>
      </v-layout>
      </v-card>
    </v-dialog>

      <!-- ################################## SNACKBARS ######################################## -->

        <v-snackbar
          :timeout="4000" :bottom="'bottom'" v-model="snackbar"
        >
          <v-icon color="green" style="margin-right:10px">mdi-check-circle-outline</v-icon>
          <span >{{ snackbarText }}</span>

          <template v-slot:action="{ attrs }">
            <v-btn
              color="#00D2D7"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>

      </v-layout >
    </v-slide-y-transition>
    </v-layout>
  </div>
</template>


<script>
import firebase from 'firebase/app'
import { db } from '@/main'
import PictureInput from 'vue-picture-input'
// import Web3Getter from '../..//utils/web3/getWeb3'
import Password from 'vue-password-strength-meter'
import store from '@/store/index'
const dateformat = require('dateformat')
export default {
  name: 'myaccount',
  props: {
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number
  },
  components: {
    PictureInput,
    Password
  },
  data () {
    return {
      lang: this.$store.state.lang,
      loader: null,
      loading: false,
      loadingData: false,
      changingAccountsDialog: false,
      loading2: false,
      snackbar: false,
      snackbarText: '',
      alert: false,
      alertMessage: '',
      alertEmail: true,
      alertMessageEmail: 'Verification Email Sent!',
      leagues: [],
      teams: [],
      myLeagues: [],
      myTeams: [],
      emailDialog: false,
      verifyEmailDialog: false,
      passwordDialog: false,
      setLeaguesDialog: false,
      setTeamsDialog: false,
      pwdDialog: false,
      photoDialog: false,
      tierInfoDialog: false,
      accVerified: true,
      phoneVerified: false,
      idVerified: false,
      accTypeEdit: false,
      accNameEdit: false,
      accAboutEdit: false,
      accFullNameEdit: false,
      accDobEdit: false,
      accSexEdit: false,
      accLangEdit: false,
      score: 0,
      currentUser: null,
      currentPassword: '',
      emailSet: false,
      valid: false,
      emailAddress: '',
      updateEmailSuccess: false,
      verificationEmail: false,
      changeEmail: false,
      emailRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email address must be valid'
      ],
      show1: false,
      newPassword: '',
      passwordRules: [
        v => !!v || 'Password is required'
        // v => (v && v.length >= 7) || 'Minimal 7 characters'
      ],
      secureLength: 8,
      dataProvided: false,
      image: '',
      items: [
        {name: 'Starter', id: 10},
        {name: 'Active', id: 11},
        {name: 'Player', id: 12},
      ],
      itemsSex: [],
      itemsLanguage: [
        {name: 'Bahasa Indonesia', id: 'id'},
        {name: 'English', id: 'en'},
      ],
      date: null,
      menu: false,
      oldValue: null,
      butSrcTeam: '',
      tempImage: 'data:image/png;base64,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'
    }
  },
  computed: {
    getLanguage () {
      return this.$store.state.user.language
    },
    getPlatform () {
      // console.log(this.$store)
      // return this.$store.getters.state.device.platform
      return this.$store.state.device.platform
    },
    getUser () {
      return this.$store.state.user
    },
    getAccounts () {
      return this.$store.state.user.accounts
    },
    mmConnected () {
      return this.$store.state.user.mmConnected
    },
    binanceConnected () {
      return this.$store.state.user.binanceConnected
    },
    walletConnected () {
      return this.$store.state.user.walletConnected
    }
  },
  created () {
    store.commit('ShowNav')
    // store.commit('ShowNavHome')
    if (!this.mmConnected && !this.binanceConnected && !this.walletConnected) {
      this.$router.push('/')
    }
    this.butSrcTeam = './img/icons/my_teams.png'
    this.currentUser = firebase.auth().currentUser
    this.loading = true
    setTimeout(() => {
      this.init()
    }, 1000)
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    mmConnected () {
      if (!this.mmConnected) {
        this.$router.push('/')
      }
    },
    binanceConnected () {
      if (!this.binanceConnected) {
        this.$router.push('/')
      }
    },
    walletConnected () {
      if (!this.walletConnected) {
        this.$router.push('/')
      }
    },
    getAccounts () {
      console.log('getUser changed in store')
      console.log(this.getAccounts)
      this.changingAccountsDialog = true
      setTimeout(() => {
        this.reloadCurrentUser()
      }, 4000)
    }
  },
  methods: {
    reloadCurrentUser () {
      this.currentUser = null
      this.currentUser = firebase.auth().currentUser
      this.changingAccountsDialog = false
      console.log(this.currentUser)
    },
    init() {
      // console.log(firebase.auth().currentUser)
      this.loading = false
      this.itemsSex = [
        {name: this.lang[this.getLanguage].ACC_NOT_SET, id: 0},
        {name: this.lang[this.getLanguage].ACC_MALE, id: 1},
        {name: this.lang[this.getLanguage].ACC_FEMALE, id: 2},
      ]
    },
    emailDetailClicked () {
      var email = this.currentUser.email.split('@')[1]
      this.currentPassword = this.getAccounts[0]
      if ('tokenmonster.app' === email) {
        this.emailSet = false
      } else {
        this.emailSet = true
      }
      this.emailDialog = true
    },
    clickVerifyEmail () {
      this.loading2 = true
      var credentials = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, this.currentPassword)

      this.currentUser.reauthenticateWithCredential(credentials).then(() => {
        // User re-authenticated.
        this.currentUser.updateEmail(this.emailAddress).then(() => {
          // this.snackbar = true
          // this.snackbarText = this.getLanguage === 'en' ? this.lang[this.getLanguage].PWD_CHANGED : this.lang[this.getLanguage].PWD_CHANGED
          this.updateEmailSuccess = true
          this.alertEmail = true
          this.alertMessageEmail = 'Email Successfully Updated!'
          this.saveAccEmail(this.emailAddress)

          this.loading2 = false
          // this.emailDialog = false
          this.currentUser.sendEmailVerification().then(() => {
            // Email sent.
            this.verificationEmail = true
          }).catch((error) => {
            // An error happened.
            this.alert = true
            this.alertMessage = error.message
            this.loading2 = false
          })
        }).catch((error) => {
          console.log(error)
          this.alert = true
          this.alertMessage = error.message
          this.loading2 = false
        })
      }).catch((error) => {
        // An error happened.
        this.alert = true
        this.alertMessage = error.message
        this.loading2 = false
      })
    },
    clickVerifyEmail2 () {
      this.loading2 = true
      this.currentUser.sendEmailVerification().then(() => {
        // Email sent.
        this.verificationEmail = true
      }).catch((error) => {
        // An error happened.
        this.alert = true
        this.alertMessage = error.message
        this.loading2 = false
      })
    },
    changeEmailDone () {
      this.updateEmailSuccess = false
      this.verificationEmail = false,
      this.emailDialog = false
    },
    clickChangeEmail () {
      // console.log('change email clicked')
      this.changeEmail = true
      this.emailSet = false
    },
    clickChangeEmailConfirm () {
      this.loading2 = true
      var credentials = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, this.currentPassword)

      this.currentUser.reauthenticateWithCredential(credentials).then(() => {
        // User re-authenticated.
        this.currentUser.updateEmail(this.emailAddress).then(() => {
          // this.snackbar = true
          // this.snackbarText = this.getLanguage === 'en' ? this.lang[this.getLanguage].PWD_CHANGED : this.lang[this.getLanguage].PWD_CHANGED
          this.updateEmailSuccess = true
          this.alertEmail = true
          this.alertMessageEmail = 'Email Successfully Updated!'
          this.saveAccEmail(this.emailAddress)

          this.loading2 = false
          // this.emailDialog = false
          this.currentUser.sendEmailVerification().then(() => {
            // Email sent.
            this.verificationEmail = true
          }).catch((error) => {
            // An error happened.
            this.alert = true
            this.alertMessage = error.message
            this.loading2 = false
          })
        }).catch((error) => {
          console.log(error)
          this.alert = true
          this.alertMessage = error.message
          this.loading2 = false
        })
      }).catch((error) => {
        // An error happened.
        this.alert = true
        this.alertMessage = error.message
        this.loading2 = false
      })
    },
    saveAccEmail (newEmail) {
      let obj = {
        email: newEmail
      }
      this.saveSettingsData(obj)
    },
    saveAccType () {
      let obj = {
        acc_type: this.getUser.accType
      }
      this.saveSettingsData(obj)
      this.accTypeEdit = false
    },
    saveAccName () {
      let obj = {
        name: this.getUser.displayName
      }
      this.saveSettingsData(obj)
      // Update Display Name
      if (this.getUser.displayName !== this.oldValue) {
        this.currentUser.updateProfile({
          displayName: this.getUser.displayName
        }).then(function () {
          // Update successful.
          // console.log('Display Name Updated - Firebase')
        }, (error) => {
          // An error happened.
          console.log(error)
        })
      }
      this.accNameEdit = false
    },
    saveAccAbout () {
      let obj = {
        about_me: this.getUser.aboutMe
      }
      this.saveSettingsData(obj)
      this.accAboutEdit = false
    },
    saveAccFullName () {
      let obj = {
        full_name: this.getUser.fullName
      }
      this.saveSettingsData(obj)
      this.accFullNameEdit = false
    },
    saveDob () {
      let obj = {
        date_of_birth: this.getUser.dob
      }
      this.saveSettingsData(obj)
      this.accDobEdit = false
    },
    saveAccSex () {
      let obj = {
        sex: this.getUser.sex
      }
      this.saveSettingsData(obj)
      this.accSexEdit = false
    },
    saveAccLanguage () {
      let obj = {
        language: this.getUser.language
      }
      this.saveSettingsData(obj)
      this.accLangEdit = false
      this.itemsSex = [
        {name: this.lang[this.getLanguage].ACC_NOT_SET, id: 0},
        {name: this.lang[this.getLanguage].ACC_MALE, id: 1},
        {name: this.lang[this.getLanguage].ACC_FEMALE, id: 2},
      ]
    },
    setProfilePhoto () {
      this.loader = 'loading'
      store.commit('setAvatar', this.image)
      var obj = {
        avatar: this.image,
        gravatar: false
      }
      this.saveSettingsData(obj)
    },
    saveSettingsData (obj) {
      db.collection('users').doc(this.getUser.docId).update(obj)
        .then(() => {
            // console.log('User Account in bucket updated')
            // Snackbar That confirms
            this.snackbar = true
            this.snackbarText = this.getLanguage === 'en' ? this.lang[this.getLanguage].SET_UPDATED : this.lang[this.getLanguage].SET_UPDATED
            this.photoDialog = false
          })
        .catch(error => {
            console.log(error)
          })
    },
    changePassword () {
      this.loading2 = true
      var credentials = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, this.currentPassword)

      this.currentUser.reauthenticateWithCredential(credentials).then(() => {
        // User re-authenticated.
        this.currentUser.updatePassword(this.newPassword).then(() => {
          // Update successful.
          this.snackbar = true
          this.snackbarText = this.getLanguage === 'en' ? this.lang[this.getLanguage].PWD_CHANGED : this.lang[this.getLanguage].PWD_CHANGED
          this.loading2 = false
          this.passwordDialog = false
        }).catch((error) => {
          // An error happened.
          this.alert = true
          this.alertMessage = error.message
          this.loading2 = false
        })
      }).catch((error) => {
        // An error happened.
        this.alert = true
        this.alertMessage = error.message
        this.loading2 = false
      })
    },
    openTerms () {
      this.$emit('termsClicked')
    },
    openPrivacy () {
      this.$emit('privacyClicked')
    },
    onChange (image) {
      // console.log('New picture selected!')
      // console.log(image)
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        // console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    onRemove () {
      // console.log('Picture removed!')
      this.image = ''
    },
    replaceApos (string) {
      return string.replace('&apos;', '\'')
    },
    showFeedback ({suggestions, warning}) {
      console.log('🙏', suggestions)
      console.log('⚠', warning)
    },
    showScore (score) {
      // console.log('💯', score)
      if (score > 2) {
        // this.valid = true
        this.dataProvided = true
      } else {
        // this.valid = false
        this.dataProvided = false
      }
    },
    change0 () {
      // validate
      // console.log(this.valid)
      this.alert = false
      if (this.$refs.form.validate()) {
        this.dataProvided = true
      } else {
        this.dataProvided = false
      }
      /* setTimeout(() => {
        this.updateScore()
      }, 100) */
    },
    save (date) {
      this.$refs.menu.save(date)
      this.getUser.dob = date
    },
    getDate (time) {
      let date = dateformat(new Date(parseInt(time)), 'dd mmm, yyyy')
      return date
    }
  }
}
</script>
