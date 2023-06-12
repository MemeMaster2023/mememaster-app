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
      tempImage:'',
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
