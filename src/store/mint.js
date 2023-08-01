// import firebase from 'firebase/app'
// import 'firebase/database'
// import 'firebase/auth'
// import firebase from 'firebase/app'
import { db } from '@/main'
// import MemeMasterAPI from '@/clients/MemeMasterAPI'
const MintModule = {
  state: {
    contracts: [],
    contractsEmpty: false,
  },
  mutations: {
    setContracts (state, payload) {
      state.contracts = payload
    },
    setContractsEmpty (state, payload) {
      state.contractsEmpty = payload
    },
  },
  actions: {
    getNFTcontracts ({commit}, payload) {
      commit('setLoading', payload.uid)
      commit('setCollectionsEmpty', false);
      let today = new Date().getTime()
      let query = db.collection('nft_contracts').where('owner_id', '==', payload.uid).where('is_active', '==', 1).orderBy('name', 'asc')
      query.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          commit('setContractsEmpty', true);
          return
        }
        var contractList = []
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          var obj = doc.data()
          obj.id = doc.id
          obj.checkTime = Math.round(today / 1000 + 1800) // 1 Hour to prevent to much Firebase loading/reading
          contractList.push(obj)
        })
        commit('setContracts', contractList)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    },
  },
  getters: {
    contracts (state) {
      return state.contracts
    },
    contractsEmpty(state) {
      return state.contractsEmpty;
    },
  }
}

export default MintModule
