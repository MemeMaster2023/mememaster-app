// import firebase from 'firebase/app'
// import 'firebase/database'
// import 'firebase/auth'
import firebase from 'firebase/app'
import { db } from '@/main'
import MemeMasterAPI from '@/clients/MemeMasterAPI'
const FirebaseModule = {
  state: {
    collections: [],
    collectionsEmpty: false,
    memes: [],
    memesEmpty: false,
    promotedTokens: [],
    launchQueue: [],
    popularTokens: [],
    justLaunchedTokens: [],
    newTokens: [],
    favoriteTokens: [],
    searchResults: []
  },
  mutations: {
    setCollections (state, payload) {
      state.collections = payload
    },
    setCollectionsEmpty (state, payload) {
      state.collectionsEmpty = payload
    },
    setMemes (state, payload) {
      state.memes = payload
    },
    setMemesEmpty (state, payload) {
      state.memesEmpty = payload
    },
    setPromotedTokens (state, payload) {
      state.promotedTokens = payload
    },
    setLaunchQueue (state, payload) {
      state.launchQueue = payload
    },
    setPopularTokens (state, payload) {
      state.popularTokens = payload
    },
    setPopularTokensBNB (state, payload, index) {
      state.popularTokens[index] = payload
    },
    setJustLaunchedTokens (state, payload) {
      state.justLaunchedTokens = payload
    },
    setNewTokens (state, payload) {
      state.newTokens = payload
    },
    setFavoriteTokens (state, payload) {
      state.favoriteTokens = payload
    },
    setSearchResults (state, payload) {
      state.searchResults = payload
    },
  },
  actions: {
    getUserCollections ({commit}, payload) {
      commit('setLoading', payload.uid)
      commit('setCollectionsEmpty', false);
      let today = new Date().getTime()
      let query = db.collection('collections').where('uid', '==', payload.uid).where('status', '==', 1).orderBy('name', 'asc')
      query.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          commit('setCollectionsEmpty', true);
          return
        }
        var collectionList = []
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          var obj = doc.data()
          obj.id = doc.id
          obj.checkTime = Math.round(today / 1000 + 1800) // 1 Hour to prevent to much Firebase loading/reading
          collectionList.push(obj)
        })
        commit('setCollections', collectionList)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    createCollection({ commit }, payload) {
      commit('setLoading', true);
      db.collection('collections')
        .doc(payload.id)
        .set(payload)
        .then(() => {
          console.log('Collection in bucket created');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCollection({ commit }, payload) {
      commit('setLoading', true);
      db.collection('collections')
        .doc(payload.id)
        .update(payload)
        .then(() => {
          console.log('Collection in bucket updated');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addMemeToCollection ({ commit }, payload) {
      // console.log(payload)
      commit('setLoading', true);

      db.collection('memes')
        .doc(payload.id)
        .set(payload)
        .then(() => {
          console.log('File in meme bucket created!');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserMemes ({commit}, payload) {
      commit('setLoading', payload.id)
      commit('setMemesEmpty', false);
      let today = new Date().getTime()
      let query = db.collection('memes').where('cid', '==', payload.cid).where('status', '==', 1).orderBy('created', 'desc')
      query.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          commit('setMemesEmpty', true);
          return
        }
        var memeList = []
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          var obj = doc.data()
          obj.id = doc.id
          obj.checkTime = Math.round(today / 1000 + 1800) // 1 Hour to prevent to much Firebase loading/reading
          memeList.push(obj)
        })
        commit('setMemes', memeList)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    getPromotedTokens ({commit}, payload) {
      // console.log(payload.limit)
      commit('setLoading', payload.limit)
      let today = new Date().getTime()
      let query = db.collection('tokens').where('status', '==', 2).where('expire_date', '>', today).where('promoted', '==', true).where('promoted_paid', '==', true).orderBy('expire_date', 'desc')
      query.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          return
        }
        var promotedList = []
        var lanchQueueList = []
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          var obj = doc.data()
          obj.id = doc.id
          obj.readmore = false
          obj.price = 0
          obj.price_text = '0'
          obj.mc = ''
          obj.holders = ''
          obj.checkTime = Math.round(today / 1000 + 1800) // 1 Hour to prevent to much Firebase loading/reading
          if (today > doc.data().launch_date && today > doc.data().publish_date) {
            promotedList.push(obj)
          } else if (today < doc.data().launch_date && today > doc.data().publish_date) {
            lanchQueueList.push(obj)
          }
        })
        // Sort Launch Queue List by launch_date >>  Maybe move sorting to filter in view
        // promotedList.sort((a, b) => {
          // return b.launch_date - a.launch_date
        //})
        commit('setPromotedTokens', promotedList)
        commit('setLaunchQueue', lanchQueueList)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    getMostPopularTokens ({commit}, payload) {
      // console.log(payload)
      let today = new Date().getTime()
      let query = db.collection('tokens').where('status', '==', 2).where('likes', '>', 299).orderBy('likes', 'desc').limit(payload.limit)
      query.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          return
        }
        var popularList = this.getters.popularTokens
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          var obj = doc.data()
          obj.id = doc.id
          obj.readmore = false
          obj.price = 0
          obj.price_text = '0'
          obj.mc = ''
          obj.holders = ''
          obj.checkTime = Math.round(today / 1000 + 1800) // 1 Hour to prevent to much Firebase loading/reading
          var inArray = popularList.findIndex(item => item.id === obj.id) > -1
          if (!inArray) {  //
            popularList.push(obj)
          }
        })
        commit('setPopularTokens', popularList)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    getTokenPriceQuote ({commit}, payload) {
      commit('setLoading', true)
      // console.log('getPriceQuoteBSC/ETH/MATIC')
      // console.log(payload)

      const getIndicesOf = (searchStr, str, caseSensitive) => {
          var searchStrLen = searchStr.length
          if (searchStrLen == 0) {
              return []
          }
          var startIndex = 0, index, indices = []
          if (!caseSensitive) {
              str = str.toLowerCase()
              searchStr = searchStr.toLowerCase();
          }
          while ((index = str.indexOf(searchStr, startIndex)) > -1) {
              indices.push(index)
              startIndex = index + searchStrLen
          }
          return indices;
      }

      // conditional to loomup per list dynamically
      var index = 0
      var obj = {}
      if (payload.list === 'promotedTokens') {
        index = this.getters.promotedTokens.findIndex(item => item.contract_address === payload.contract_address)
        obj = this.getters.promotedTokens[index]
      } else if (payload.list === 'popularTokens') {
        index = this.getters.popularTokens.findIndex(item => item.contract_address === payload.contract_address)
        obj = this.getters.popularTokens[index]
      } else if (payload.list === 'justLaunchedTokens') {
        index = this.getters.justLaunchedTokens.findIndex(item => item.contract_address === payload.contract_address)
        obj = this.getters.justLaunchedTokens[index]
      } else if (payload.list === 'newTokens') {
        index = this.getters.newTokens.findIndex(item => item.contract_address === payload.contract_address)
        obj = this.getters.newTokens[index]
      } else if (payload.list === 'favoriteTokens') {
        index = this.getters.favoriteTokens.findIndex(item => item.contract_address === payload.contract_address)
        obj = this.getters.favoriteTokens[index]
      } else if (payload.list === 'searchResults') {
        index = this.getters.searchResults.findIndex(item => item.contract_address === payload.contract_address)
        obj = this.getters.searchResults[index]
      }

      if (payload.network === 'KCC') {

        Promise.resolve(MemeMasterAPI.getTokenInfoKCC(payload.contract_address, payload.network))
        .then(result => {
          // console.log(result) // result.data.data.data.tokenInfo
          // result.data.data.data.holderCnt
          // var tokenInfo
          var holders = 0
          if (result.data.data.code === 1) {

            // tokenInfo = result.data.data.data.tokenInfo
            // this.tokenName = tokenInfo.f
            // this.tokenSymbol = tokenInfo.s
            // this.decimals = parseInt(tokenInfo.d)
            // this.totalSupply = parseInt(tokenInfo.t)
            holders = result.data.data.data.holderCnt
            obj.total_holders = parseInt(holders)
            obj.holders = parseInt(holders)

          } else {
            obj.total_holders = '-'
            obj.holders = '-'
          }
        })
        .catch(err => {
          this.loading = false
          console.log('Error getting KCC token info.', err)
          // show friendly error in user screen
        })

        //  https://api.coingecko.com/api/v3/simple/token_price/kucoin-community-chain?contract_addresses=0x4a81704d8c16d9fb0d7f61b747d0b5a272badf14&vs_currencies=USD%2CKCS&include_market_cap=true
        Promise.resolve(MemeMasterAPI.getKCCPriceMc(payload.contract_address, payload.network))
        .then(result => {
          // console.log(result) // result.data.data.data
          // result.data.data.data
          if (result.statusText === 'OK') {

            obj.price = parseFloat(result.data.data[payload.contract_address].usd)
            obj.price_text = result.data.data[payload.contract_address].usd
            obj.mc = parseInt(result.data.data[payload.contract_address].usd_market_cap)
            if (obj.mc === 0 && obj.price > 0) {
              // console.log('obj.price')
              // console.log(obj.price)
              // console.log('obj.total_supply')
              // console.log(obj.total_supply)
              obj.mc = Math.round(obj.price * obj.total_supply)
            }

          } else {
            obj.price = '-'
            obj.price_text = 'Not Available'
            obj.mc = '-'
          }
        })
        .catch(err => {
          this.loading = false
          console.log('Error getting KCC token info.', err)
          // show friendly error in user screen
        })

      } else {

        Promise.resolve(MemeMasterAPI.getTokenPriceQuote(payload.contract_address, payload.network, payload.total_supply))
        .then(result => {
          // console.log('result get quote')
          // console.log(result)
          var latestPrice = payload.network === 'BSC' ? payload.latestBNB : payload.network === 'ETH' ? payload.latestETH : payload.network === 'MATIC' ? payload.latestMATIC : 0
          obj.price = parseFloat((result.data.data.guaranteedPrice / 100) * 98)
          obj.price_text = (result.data.data.guaranteedPrice / 100) * 98
          obj.mc = Math.round((obj.price * latestPrice) * obj.total_supply * ((100 - obj.total_burned) / 100))
          /* console.log(payload.network)
          console.log('obj.total_supply')
          console.log(obj.total_supply)
          console.log('result.data.data.guaranteedPrice')
          console.log(result.data.data.guaranteedPrice)
          console.log('latestPrice BNB')
          console.log(latestPrice)
          console.log(eToNumber(obj.price))
          console.log((eToNumber(obj.price * latestPrice)))
          console.log(index)
          console.log('total_burned')
          console.log(100 - obj.total_burned)
          console.log('Market Cap')
          console.log(obj.mc) */
          // commit('setPopularTokensBNB', obj, index)
          /* function eToNumber(num) {
            let sign = "";
            (num += "").charAt(0) == "-" && (num = num.substring(1), sign = "-")
            let arr = num.split(/[e]/ig)
            if (arr.length < 2) return sign + num
            let dot = (.1).toLocaleString().substr(1, 1), n = arr[0], exp = +arr[1]
            let w = (n = n.replace(/^0+/, '')).replace(dot, ''),
              pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
              L = pos - w.length, s = "" + BigInt(w)
            w = exp >= 0 ? (L >= 0 ? s + "0".repeat(L) : r()) : (pos <= 0 ? "0" + dot + "0".repeat(Math.abs(pos)) + s : r())
            if (!+w) w = 0; return sign + w
            function r() {return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`)}
          } */

          Promise.resolve(MemeMasterAPI.getTotalHolders(payload.contract_address, payload.network))
          .then(result => {
            // console.log(result.data.toString())
            var html = result.data.data.toString()
            var startIndex = html.indexOf('<div class="mr-3">')
            // var stopIndex = html.indexOf('addresses')
            var stopIndex = 0
            var holders = 0
            if (payload.network === 'BSC') {
              stopIndex = getIndicesOf('addresses', html)
              holders = html.substr(startIndex + 18, (stopIndex[1] - 1) - (startIndex + 18))
            } else {
              stopIndex = html.indexOf('sparkholderscontainer')
              holders = html.substr(startIndex + 18, (stopIndex - 17) - (startIndex + 18))
            }
            /* console.log('startIndex')
            console.log(startIndex)
            console.log('stopIndex')
            console.log(stopIndex)
            console.log(holders) */
            obj.total_holders = parseInt(holders.replaceAll(',', ''))
            obj.holders = parseInt(holders.replaceAll(',', ''))

            // conditional
            // commit('setPromotedTokensBNB', obj, index)
          })
          .catch(err => {
            this.loading = false
            console.log('Error getting documents.', err)
            // show friendly error in user screen
          })
        })
        .catch(err => {
          this.loading = false
          console.log('Error getting documents.', err)
          // show friendly error in user screen
        })
      }
    },
    getJustLaunchedTokens ({commit}, payload) {
      console.log(payload.limit)
      let today = new Date().getTime()
      let endDate = today - 1000 * 60 * 60 * 24 * 4 // 96 Hours / 4 Days
      let query = db.collection('tokens').where('status', '==', 2).where('launch_date', '<', today).where('launch_date', '>', endDate).orderBy('launch_date', 'desc')
      query.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          return
        }
        var justLaunchedList = this.getters.justLaunchedTokens
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          var obj = doc.data()
          obj.id = doc.id
          obj.readmore = false
          obj.price = 0
          obj.price_text = '0'
          obj.mc = ''
          obj.holders = ''
          obj.checkTime = Math.round(today / 1000 + 1800) // 1 Hour to prevent to much Firebase loading/reading
          var inArray = justLaunchedList.findIndex(item => item.id === obj.id) > -1
          if (!inArray) {  //
            justLaunchedList.push(obj)
          }
        })
        commit('setJustLaunchedTokens', justLaunchedList)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    getNewTokens ({commit}, payload) {
      // console.log(payload)
      let today = new Date().getTime()
      // let query = db.collection('tokens').where('status', '==', 2).where('likes', '<', 300).orderBy('likes', 'desc').orderBy('publish_date', 'desc').limit(payload.limit)
      let query = db.collection('tokens').where('status', '==', 2).where('created', '>', payload.limit).orderBy('created', 'desc')
      query.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          return
        }
        var newList = this.getters.newTokens
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          var obj = doc.data()
          obj.id = doc.id
          obj.readmore = false
          obj.price = 0
          obj.price_text = '0'
          obj.mc = ''
          obj.holders = ''
          obj.checkTime = Math.round(today / 1000 + 1800) // 1 Hour to prevent to much Firebase loading/reading
          var inArray = newList.findIndex(item => item.id === obj.id) > -1
          if (!inArray) {  //
            newList.push(obj)
          }
        })
        /* newList.sort((a, b) => {
          return b.created - a.created
        }) */
        commit('setNewTokens', newList)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    getFavoriteTokens ({commit}, payload) {
      // console.log(payload)
      let today = new Date().getTime()
      let query = db.collection('tokens').where(firebase.firestore.FieldPath.documentId(), 'in', payload.favorites)
      query.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          return
        }
        var favList = this.getters.favoriteTokens
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          var obj = doc.data()
          obj.id = doc.id
          obj.readmore = false
          obj.price = 0
          obj.price_text = '0'
          obj.mc = ''
          obj.holders = ''
          obj.checkTime = Math.round(today / 1000 + 1800) // 1 Hour to prevent to much Firebase loading/reading
          var inArray = favList.findIndex(item => item.id === obj.id) > -1
          if (!inArray) {  //
            favList.push(obj)
          }
        })
        commit('setFavoriteTokens', favList)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    getSearchResults ({commit}, payload) {
      // console.log(payload)
      // let today = new Date().getTime()
      var searchList = []
      let query = db.collection('tokens').where('keywords', 'array-contains-any', [payload.search, '#' + payload.search])
      query.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          commit('setSearchResults', searchList)
          return
        }
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          var obj = doc.data()
          obj.id = doc.id
          obj.readmore = false
          obj.price = 0
          obj.price_text = '0'
          obj.mc = ''
          obj.holders = ''
          searchList.push(obj)
        })
        commit('setSearchResults', searchList)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
    updateToFavorites ({commit}, payload) {
      // console.log(payload)
      commit('setLoading', true)
      const message = {
        favorites: payload.favorites,
      }
      db.collection('users').doc(payload.postkey).update(message)
      .then(() => {
          console.log('Added to Favorites in bucket updated')
        })
      .catch(error => {
          console.log(error)
        })
    },
    setUserTier ({commit}, payload) {

      let tokenAddress = '0x49c248641eb904c9d5a33904d388212a89218187'
      let walletAddress = payload.address
      let network = 'BSC'

      Promise.resolve(MemeMasterAPI.getTokenBalance(tokenAddress, walletAddress, network))
      .then(result => {
        // console.log(result)
        var balance  = result.data.data.result
        var tokenBalance = balance / (10**18)
        var level = 1
        if (tokenBalance >= 75000) {
          // level is 3
          level = 3
        } else if (tokenBalance >= 40000) {
          // level is 2
          level = 2
        } else {
          // level is 1
          level = 1
        }
        commit('setUserTierLevel', level)
      })
      .catch(err => {
        // this.loading = false
        console.log('Error getting Token Balance.', err)
        // show friendly error in user screen
      })
    },
    updateLastLogin ({commit}, payload) {
      // console.log('payload.uid')
      commit('setLoading', true)
      let docRef = db.collection('users').where('uid', '==', payload.uid)
      docRef.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          return
        }
        snapshot.forEach(doc => {
          // console.log(doc)
          var obj = {
            lastlogin: new Date().getTime()
          }
          db.collection('users').doc(doc.id).update(obj)
          .then(() => {
              // console.log('Last Login in bucket updated')
            })
          .catch(error => {
              console.log(error)
            })
        })
      })
    },
    postForumComment ({commit}, payload) {
      commit('setLoading', true)
      var newkey = db.collection('tokens').doc(payload.postkey).collection('comments').doc()
      // console.log(newkey)
      const message = {
        comment: payload.comment,
        status: 2,
        name: payload.name,
        uid: payload.uid,
        pid: payload.pid,
        created: new Date().getTime(),
        avatar: payload.avatar
      }
      db.collection('tokens').doc(payload.postkey).collection('comments').doc(newkey.id).set(message)
      .then(() => {
          // console.log('Comment created')
        })
      .catch(error => {
          console.log(error)
        })
    },
    postScamReport ({commit}, payload) {
      commit('setLoading', true)
      var newkey = db.collection('tokens').doc(payload.postkey).collection('scamreports').doc()
      // console.log(newkey)
      const message = {
        report: payload.report,
        other: payload.other,
        status: 2,
        name: payload.name,
        uid: payload.uid,
        created: new Date().getTime(),
        avatar: payload.avatar
      }
      db.collection('tokens').doc(payload.postkey).collection('scamreports').doc(newkey.id).set(message)
      .then(() => {
          // console.log('Scam Report created')
        })
      .catch(error => {
          console.log(error)
        })
    },
    createMessage ({ commit }, payload) {
      commit("setLoading", true);
      var newkey = db.collection("messages").doc().id;
      db.collection("messages")
        .doc(newkey)
        .set(payload)
        .then(() => {
          // console.log('Message created')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  getters: {
    collections (state) {
      return state.collections
    },
    collectionsEmpty(state) {
      return state.collectionsEmpty;
    },
    memes (state) {
      return state.memes
    },
    memesEmpty(state) {
      return state.memesEmpty;
    },
    promotedTokens (state) {
      return state.promotedTokens
    },
    launchQueue (state) {
      return state.launchQueue
    },
    popularTokens (state) {
      return state.popularTokens
    },
    justLaunchedTokens (state) {
      return state.justLaunchedTokens
    },
    newTokens (state) {
      return state.newTokens
    },
    favoriteTokens (state) {
      return state.favoriteTokens
    },
    searchResults (state) {
      return state.searchResults
    }
  }
}

export default FirebaseModule
