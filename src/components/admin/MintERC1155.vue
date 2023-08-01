<template>
  <div id="mint">
    <v-responsive style="background-color: #000;" >


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
            <div class="text-h4 text-center ma-2">Create NFT Collection and Mint ERC-1155</div>
          </v-col>

          <v-col cols="12" md="3" :align="center" v-if="!isMobileDevice">
          </v-col>
       </v-row>

       <v-row class="mt-8 mb-4" :align="center" :style="isMobileDevice ? 'margin-right: 5%;margin-left: 5%;' : 'margin-right: 20%;margin-left: 20%;'">

        <v-col cols="12" md="12" :align="'center'">
          <v-card
            class="justify-center"
            width="100%"
            variant="outlined"
          >
            <v-card-item>
              <div>
                <div class="text-h5 text-center">Select NFT file</div>
                <div class="image-upload text-center">
                      <label for="file-input" class="text-center">

                        <div class="text-center">Click or tab to select an image. </div>
                        <div style="font-size: 0.8rem;" class="text-center mb-2">PNG, GIF, WEBP, MP4 or MP3. Max 10 MB.</div>
      
                        <v-avatar size="120"  v-if="uploadImage === ''" style="border-radius: 5px;">
                          <v-icon size="120" color="white">{{ isMobileDevice ? 'mdi-gesture-tap' : 'mdi-selection-search' }}
                          </v-icon>
                        </v-avatar>
                        
                        <v-col v-else :align="'center'">
                          <v-img 
                                :src="uploadImageUrl" 
                                class="text-center"
                                :style="'max-width: 350px;max-height:350px;border-radius: 5px;'">
                          </v-img>
                        </v-col>
 

                        <v-btn v-if="uploadImage !== ''"
                              size="small" 
                              icon="mdi-close-circle-outline" 
                              color="red" 
                              style="position: relative;margin-top: -25px;margin-left: 350px;"
                              @click="removeImage"
                        >
                        </v-btn>

                        <v-alert v-model="showRowAlert"
                            closable 
                            :text="showRowAlertText" 
                            type="error" 
                            variant="tonal"
                        >
                        </v-alert>

                      </label>

                      <input 
                        id="file-input" 
                        type="file" 
                        accept="image/jpg,image/jpeg,image/png, image/webp"
                        @change="handleFiles"
                      />
                    </div>
                
              </div>
            </v-card-item>
              <!-- <v-card-actions style="position: absolute; bottom: 0;width:100%;">
                <v-btn 
                  variant="outlined" 
                  color="deep-purple-lighten-1" 
                  style="width:100%" 
                  prepend-icon="mdi-seed-plus-outline" 
                  @click="view = 2"
                >
                  Create and Mint
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4 mb-4" :align="center" :style="isMobileDevice ? 'margin-right: 5%;margin-left: 5%;' : 'margin-right: 20%;margin-left: 20%;'">
          <v-col cols="12" md="12" >
            <v-card
              width="100%"
              variant="outlined"
            >
              <v-card-item>
                <div>
                <div class="text-h5 text-center">NFT details</div>

                  <v-col>
                    <div class="text-h6">Category</div>
                    <v-select
                      theme="light"
                      placeholder="Select a category..."
                      return-object
                      v-model="category"
                      :items="categories"
                      item-title="name"
                      item-value="id"
                      variant="outlined"
                      density="comfortable"
                    ></v-select>

                    <div class="text-h6">NFT name</div>
                    <v-text-field
                      prepend-inner-icon="mdi-text-recognition"
                      placeholder="Enter the NFT name..."
                      density="comfortable"
                      v-model="nftName"
                      max-length="50"
                      variant="outlined"
                      hint="Max. 50 characters"
                      persistent-hint
                    ></v-text-field>

                    <div class="text-h6 mt-4">NFT description</div>
                    <v-textarea
                      v-model="nftDesctiption"
                      class="mb-2"
                      auto-grow
                      variant="outlined"
                      :placeholder="'Type your description here here...'"
                      persistent-placeholder
                      clearable
                      rows="3"
                      maxlength="2000"
                      row-height="25"
                      shaped
                      hint="Max. 2000 characters"
                      counter
                    ></v-textarea>

                    <div class="text-h6">Number of copies</div>
                    <v-text-field
                      prepend-inner-icon="mdi-sort-numeric-variant"
                      placeholder="Number of NFTs to be minted"
                      type="number"
                      min="1"
                      max="10000000"
                      density="comfortable"
                      v-model="nftCopies"
                      variant="outlined"
                      hint="Range 1 to 10,000,000"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                </div>
              </v-card-item>
            </v-card>
           </v-col>
        </v-row>

        <v-row class="mt-4 mb-4" :align="center" :style="isMobileDevice ? 'margin-right: 5%;margin-left: 5%;' : 'margin-right: 20%;margin-left: 20%;'">
          <v-col cols="12" md="12" >
            <v-card
              width="100%"
              variant="outlined"
            >
              <v-card-item>
                <div class="text-h5 text-center">Put On Sale Details</div>

                <!-- <div class="text-h6 text-center">Add VAT/GST</div>
                <div class="body-1 text-center">The VAT/GST will be added to the sale price.</div> -->

                <v-list-item>
                  <v-layout>
                    <v-list-item-content>
                      <div class="text-h6">Put on sale</div>
                      <div>NFT will be on sale for a fixed price</div>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-action>
                      <v-switch
                          v-model="putOnSale"
                          @change="instantSale = !instantSale"
                          hide-details
                          color="green-lighten-2"
                          inset
                        ></v-switch>
                    </v-list-item-action>
                  </v-layout>
                </v-list-item>

                <v-list-item>
                  <v-layout>
                    <v-list-item-content>
                      <div class="text-h6">Instant sale price</div>
                      <div>Enter the price for which the item will be instantly sold</div>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-action>
                      <v-switch
                          v-model="instantSale"
                          @change="putOnSale = !putOnSale"
                          hide-details
                          color="green-lighten-2"
                          inset
                        ></v-switch>
                    </v-list-item-action>
                  </v-layout>
                  <v-text-field v-if="instantSale"
                      prepend-inner-icon="mdi-ethereum"
                      placeholder="Instant sale price for the NFT"
                      type="number"
                      min="0"
                      max="10000000"
                      density="comfortable"
                      v-model="instantSalePrice"
                      variant="outlined"
                      hint="Range 0 to 10,000,000"
                      persistent-hint
                    ></v-text-field>
                </v-list-item>

                <v-list-item>
                  <v-layout>
                    <v-list-item-content>
                      <div class="text-h6">Unlock once purchased</div>
                      <div>Content will be unlocked after successful transaction</div>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-action>
                      <v-switch
                          v-model="unlockableContent"
                          hide-details
                          color="green-lighten-2"
                          inset
                        ></v-switch>
                    </v-list-item-action>
                  </v-layout>
                  <v-text-field v-if="unlockableContent"
                      prepend-inner-icon="mdi-lock-open-variant-outline"
                      placeholder="Unlockable content information, url/link or text..."
                      density="comfortable"
                      v-model="unlockableContentText"
                      variant="outlined"
                      hint="Only the owner of the NFt can see this content"
                      persistent-hint
                    ></v-text-field>
                </v-list-item>   

              </v-card-item>
            </v-card>
          </v-col>
         </v-row>

         <v-row class="mt-4 mb-4" :align="center" :style="isMobileDevice ? 'margin-right: 5%;margin-left: 5%;' : 'margin-right: 20%;margin-left: 20%;'">
          <v-col cols="12" md="12" >
            <v-card
              width="100%"
              variant="outlined"
            >
              <v-card-item>
                <div class="text-h5 text-center">NFT Collection Details</div>

                <div class="text-h6">Choose collection</div>
                <v-col>
                    <v-radio-group v-model="nftType" inline hide-details="">
                      <v-radio label="ERC-1155 Custom Collection" value="erc1155" style="margin-top:-10px"></v-radio>
                      <v-radio label="Standard Collectible NFT (coming soon)" value="collectible" style="margin-top:-10px" disabled></v-radio>
                    </v-radio-group>
                </v-col>

                <div class="text-h6">New or add to existing collection</div>
                <v-list>
                  <v-list-item link 
                               @click="newContract = true"
                               active-class="primary"
                  >
                    <v-layout>

                      <v-avatar  class="mt-2 mr-4">
                        <v-icon color="white" size="30">mdi-plus-circle-outline</v-icon>
                      </v-avatar>

                      <v-list-item-content>
                        <div class="text-h6">Add New</div>
                        <div>Contract</div>
                      </v-list-item-content>
                      <v-spacer></v-spacer>
                      <v-list-item-action v-if="newContract">
                        <v-icon color="green-lighten-2"  size="30">mdi-check-circle-outline</v-icon>
                      </v-list-item-action>
                    </v-layout>
                  </v-list-item>

                  <template>

                  </template>
                </v-list>

              </v-card-item>
            </v-card>
          </v-col>
         </v-row>

          <v-row class="mt-8 mb-16" :align="center" :style="isMobileDevice ? 'margin-right: 5%;margin-left: 5%;' : 'margin-right: 20%;margin-left: 20%;'">
            <v-col cols="12" md="12" :align="'center'">

              <v-btn 
                size="x-large"
                color="deep-purple-lighten-1" 
                style="width:100%" 
                prepend-icon="mdi-seed-plus-outline" 
                @click="createAndMint()"
              >
                Create and Mint
              </v-btn>
            </v-col>
          </v-row>

      </v-card>
  
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/main'
import { scroller } from 'vue-scrollto/src/scrollTo'
import imageCompression from 'browser-image-compression'
export default {
  name: 'Mint NFT',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    loading: false,
    NFT1155_ADDRESS: '',
    TRADE_ADDRESS: '',
    PROXY_ADDRESS: '',
    view: 1,
    toDrafts: false,
    toUpload: false,
    uploadImage: '',
    uploadImageUrl: '',
    imageStrength: 0.35,
    showRowAlert: false,
    showRowAlertText: '',
    category: '',
    categories: [
      { name: 'Art', id: 1 },
      { name: 'Memes', id: 2 },
      { name: 'Amimation', id: 3 },
      { name: 'Games', id: 4 },
      { name: 'Music', id: 5 },
      { name: 'Video', id: 6 },
      { name: 'Videos', id: 7 },
      { name: 'Metaverses', id: 8 },
      { name: 'Other', id: 20 },
    ],
    nftName: '',
    nftDesctiption: '',
    nftCopies: 1,
    putOnSale: false,
    instantSale: false,
    instantSalePrice: 0,
    unlockableContent: false,
    unlockableContentText: '',
    useRoyalties: false,
    nftType: 'erc1155',
    newContract: false,
    selectedContract: {},
    imageHash: '',
    metadataHash: ''
  }),
  components: {
  },
  computed: {
    getUser () {
      return this.$store.state.user
    },
    getNFTcontracts () {
      return this.$store.state.mint.contracts
    }
  },
  watch: {
  
  },
  created() {
    // this.currentUser = firebase.auth().currentUser;
    this.scrollToTop()
    if (this.getUser.uid === '') {
        this.view = 0
        this.waitGetUser()
      } else {
        if (this.getUser.accLevel === 10) {
            this.loadNFTcontracts()
          } else {
            this.$router.push('/')
          }
      }
      // Initialize NFT contracts
      if (import.meta.env.VITE_APP_ENVIRONMENT === 'production') {
        this.NFT1155_ADDRESS = ''
        this.TRADE_ADDRESS = ''
        this.PROXY_ADDRESS = ''
      } else {
        this.NFT1155_ADDRESS = '0x37ed30D3c1D0C3C606e2f37Eda042E5035F514A9'
        this.TRADE_ADDRESS = '0xd1feda4F9350c2454da043b54131990104Ca1bBc'
        this.PROXY_ADDRESS = '0x075649DD03084D53b3A5C9c5bf9F5aAC82714D4d'
      }
  },
  methods: {
    waitGetUser () {
      setTimeout(() => {
        if (this.getUser.uid === '') {
          this.waitGetUser()
          this.$router.push('/')
        } else {
          if (this.getUser.accLevel === 10) {
            // this.getNFTs()
          } else {
            this.$router.push('/')
          }
        }
      }, 2000);
    },
    loadNFTcontracts () {
      let dispatchObj = {
        uid: this.getUser.uid,
        limit: 100
      }
      console.log(dispatchObj)
      this.$store.dispatch("getNFTcontracts", dispatchObj)
        .then(() => {
          console.log(this.getNFTcontracts)
        })
        .catch(error => {
          console.log(error)
          this.loadingData = false
        })
    },
    async handleFiles(image) {
      if (image.target.files[0] === undefined) {
        this.filesValid = false;
        return;
      }
      if (image.target.files[0].size > 10000000) {
        // === 10MB Max size
        console.log(image.target.files[0].size)
        this.showRowAlert = true;
        this.showRowAlertText = 'Maximum file size of 10MB exeeded for ' + image.target.files[0].name + '!';
        this.uploadImage = '';
        return;
      } else {
        console.log(image)
        this.fileType = image.target.files[0].type
        this.showRowAlert = false
        this.checkDimension(image.target)
        /* const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 896,
          useWebWorker: true
        }
        const config = {
          quality: 1,
          maxWidth: 896,
          maxHeight: 896,
          mimeType: this.fileType
        }
        this.uploadImage = await imageCompression(image.target.files[0], options)
        this.uploadImage = await readAndCompressImage(this.uploadImage, config)
        this.filesValid = true
        this.getBase64Upload(this.uploadImage).then((data) => (this.uploadImageUrl = data, console.log(this.uploadImage))) */
      }
    },
    checkDimension (target) {
      //Check whether the file is valid Image.
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif|.jpeg)$");
      if (regex.test(target.value.toLowerCase())) {
  
          //Check whether HTML5 is supported.
          if (typeof (target.files[0]) !== "undefined") {
              //Initiate the FileReader object.
              var reader = new FileReader()
              //Read the contents of Image File.
              reader.readAsDataURL(target.files[0])
              reader.onload = (e) => {
                //Initiate the JavaScript Image object.
                var image = new Image()

                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result
                console.log(e.target.result)

                //Validate the File Height and Width.
                image.onload = () => {
                  var height = image.height
                  var width = image.width
                  
                  console.log(width + 'x' + height)
                  // show width and height to use
                  this.processWidthHeight(width, height, target.files[0])
              
                  // alert("Uploaded image has valid Height and Width.")
                  // return width + 'x' + height
                }
              }
          } else {
              alert("This browser does not support HTML5.")
              return false
          }
      } else {
          alert("Please select a valid Image file.")
          return false
      }
    },
    async processWidthHeight (width, height, file) {
      console.log(width/64)
      console.log(height/64)
      this.newWidth = Math.round(width/64) * 64
      this.newHeight = Math.round(height/64) * 64
      console.log(this.newWidth)
      console.log(this.newHeight)

      if (this.newWidth === this.newHeight) {
        this.newWidth = 700
        this.newHeight = 700
      } else if ( this.newWidth > this.newHeight) {
        this.newWidth = 1225
        this.newHeight = 700
      } else if ( this.newWidth < this.newHeight) {
        this.newWidth = 700
        this.newHeight = 1225
      }
      // console.log('ratio = ' + Math.round(width/64) + ':' + Math.round(height/64))
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1225,
        useWebWorker: true
      }
      /* const config = {
        quality: 1,
        maxWidth: newWidth,
        maxHeight: newHeight,
        mimeType: this.fileType
      } */
      // this.uploadImage = await readAndCompressImage(file, config)
      this.uploadImage = await imageCompression(file, options)
      this.filesValid = true
      this.getBase64Upload(this.uploadImage).then((data) => (this.uploadImageUrl = data, console.log(this.uploadImage)));
    },
    getBase64Upload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    selectExistingContract (item) {
      this.selectedContract = item
    },
    // ###########################################################################
    // ############################## Create and Mint NFT Process ################
    // ###########################################################################
    createAndMint () {
      // Create and Mint NFT Process Start
      this.createNewNFTcontract()
    },
    createNewNFTcontract () {
      if (this.newContract) {
        this.newContractId = 0 // Will be set after creating the contract
        // Form to ask for Name, Description, Symbol images etc
        // create the new NFT contract

        // NFT Contract done go to next step
        this.uploadIPFS()
      } else {
        this.uploadIPFS()
      }
    },
    uploadIPFS () {
      // Upload & Pin Image to IPFS and get image_hash and metadata_hash

      // IPFS done go to next step
      this.createNFT()
    },
    createNFT () {
      // Create item in nft_collections
      let postkey = db.collection('nft_collections').doc()
      var nftObject = {
        id: postkey.id,
        category: this.category.id,
        name: this.nftName,
        description: this.nftDesctiption,
        no_of_copies: this.nftCopies,
        owned_tokens: this.nftCopies,
        put_on_sale: this.putOnSale,
        instant_sale_price: this.instantSale,
        sign_instant_sale_price: parseFloat(this.instantSalePrice),
        unlock_on_purchase: this.unlockableContent,
        unlock_on_purchase_content: this.unlockableContentText,
        is_active: 1,
        image_hash: this.imageHash,
        metadata_hash: this.metadataHash, 
        created: new Date().getTime(),
        creator_id: this.getUser.uid,
        owner_id: this.getUser.uid,
        owner_name: this.getUser.displayName,
        modified: 0,
        modified_by_id: this.getUser.uid,
        modified_by: this.getUser.displayName,
        nft_contract_id: this.newContract ? this.newContractId : this.selectedContract.contract_id,
        transaction_hash: '',
        network_id: this.getUser.networkChainID, // 1 ETH Mainnet, 5 ETH Goerli
        royalty: this.useRoyalties,
        multi_royalty: {} // {"royalties": [0], "wallet_address": ["0xf251d1b5215dd88dda288689b2cedc5f0843d7f4"]}
      }
      console.log(nftObject)
      // Create item in nft_contracts if new
      // if (this.newContract) {
      //   this.createNewNFTcontract()
      // }
    },
    // ###########################################################################
    // ###################################### END ################################
    // ###########################################################################
    removeImage () {
      this.uploadImage = ''
      this.uploadImageUrl = ''
    },
    scrollToTop () {
      const firstScrollTo = scroller();
      this.scrollClicked = true
      setTimeout(() => {
        firstScrollTo('#mint', 500, { offset: -64 });
      }, 200);
    },
  }
}
</script>

<style lang="scss">
  .v-tooltip .v-overlay__content {
    background: rgba(var(--v-theme-surface-variant), 1) !important;
  } 
  .image-upload>input {
    display: none;
  }
</style>

