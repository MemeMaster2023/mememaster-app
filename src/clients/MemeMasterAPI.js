'use strict'
import axios from 'axios'

// Local Dev
// const MORALIS_API = 'http://127.0.0.1:3000/api/'

// Production Server
// const MORALIS_API = 'http://209.58.172.141:3000/api/'
//
const MORALIS_API = 'https://deep-index.moralis.io/api/v2/'
const environment = import.meta.env.VITE_APP_ENVIRONMENT;
var MEME_MASTER_API;
if (environment === "production") {
  console.log("API PRODUCTION ENVIRONMENT");
  MEME_MASTER_API = import.meta.env.VITE_APP_MM_API;
} else if (environment === "testnet") {
  console.log("API TEST ENVIRONMENT");
  MEME_MASTER_API = import.meta.env.VITE_APP_MM_API_TEST;
} else {
  console.log("API LOCAL ENVIRONMENT");
  MEME_MASTER_API = import.meta.env.VITE_APP_MM_API_LOCAL; // 'https://testnet.mememaster.app/api/v1/' // "http://localhost:6060/api/v1/"; 
}

let getters = null
class MemeMasterAPI {
  constructor () {
    getters = getters || this
    return getters
  }


  // Get the Latest BNB Price >> On App init in app.vue every 2-3 minutes
  async getNftForWallet(walletAddress) {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key' : 'HQ45rH10GU8B65Y3f1HYhg1iiQgbFoB2IBJjZD9sgyyElCaOFLdxxCCzALW3g1WB'
      }
    }
    return await axios.get(MORALIS_API + walletAddress + '/nft?chain=eth&format=decimal', config)
      .then(response => {
        // console.log(response)
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }

  // ###################################################################################
  // ##########################WWWWW### CHAT GTP SEND MESSAGE #################WWWW#####
  // ###################################################################################
  async sendChatGPTmessage(prompt) {
    var payload = {
      prompt: prompt,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(MEME_MASTER_API)
    return await axios.post(MEME_MASTER_API + 'send-gpt-message', payload, config)
      .then(response => {
        console.log(response)
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }

  // ###################################################################################
  // ############################# TEXT TO IMAGE/MEME GENERATION #######################
  // ###################################################################################

  async generateTextToImage(genObj, configObj) {
    var payload = {
      generate: genObj,
      config: configObj
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(MEME_MASTER_API)
    return await axios.post(MEME_MASTER_API + 'generate-text-to-image', payload, config)
      .then(response => {
        // console.log(response)
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }

  // ###################################################################################
  // ############################# IMAGE TO IMAGE/MEME GENERATION ######################
  // ###################################################################################

  async generateImageToImage(genObj, configObj) {
    var payload = {
      generate: genObj,
      config: configObj
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(MEME_MASTER_API)
    return await axios.post(MEME_MASTER_API + 'generate-image-to-image', payload, config)
      .then(response => {
        // console.log(response)
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }

  // ###################################################################################
  // ############################# TEXT TO VIDEO ##########################
  // ###################################################################################
  async generateTextToVideo(genObj, configObj) {
    var payload = {
      generate: genObj,
      config: configObj
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(MEME_MASTER_API)
    return await axios.post(MEME_MASTER_API + 'generate-text-to-video', payload, config)
      .then(response => {
        // console.log(response)
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }

  async generateTextToVideoTask (taskId, configObj) {
    var payload = {
      taskId: taskId,
      config: configObj
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(MEME_MASTER_API)
    return await axios.post(MEME_MASTER_API + 'generate-text-to-video-task', payload, config)
      .then(response => {
        // console.log(response)
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }

  // ###################################################################################
  // ############################# GET ENGINES/MODELS FROM API  ########################
  // ###################################################################################

  async getGenerationEngines() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(MEME_MASTER_API)
    return await axios.get(MEME_MASTER_API + 'get-engines', config)
      .then(response => {
        // console.log(response)
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }

  // ###################################################################################
  // ############################# FIRESTORE IMAGE TO BASE64  ##########################
  // ###################################################################################

  async getFirestoreImage(imgUrl) {
    var payload = {
      imgUrl: imgUrl
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(MEME_MASTER_API)
    return await axios.post(MEME_MASTER_API + 'get-firestore-image', payload, config)
      .then(response => {
        console.log(response)
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }

  // ###################################################################################
  // ############################# FIRESTORE IMAGE TO BASE64  ##########################
  // ###################################################################################

  getTokenBalance (tokenAddress, walletAddress, network) {
    const requestBody = {
      tokenAddress: tokenAddress,
      walletAddress: walletAddress,
      network: network
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
        // 'X-Authentication': token
      }
    }
    return axios.post(MEME_MASTER_API + 'gettokenbalance', requestBody, config)
      .then(response => {
        // console.log(response)
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }
}
export default new MemeMasterAPI()
