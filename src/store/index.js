import { createStore } from 'vuex'
// More Modules Go Here
import AuthModule from './AuthModule'
import FirebaseModule from './FirebaseModule'

// Create a new store instance.
export default createStore({
    state () {
        return {
            user: {
                dark: localStorage.getItem('darkTheme') === null ? true : JSON.parse(localStorage.getItem('darkTheme')), // set and get
                uid: '',
                docId: '',
                email: '',
                displayName: '',
                aboutMe: '',
                fullName: '',
                address: '',
                dob: '',
                gender: 0,
                gravatar: false,
                avatar: '',
                hasCoinbase: false,
                hasWeb3InjectedBrowser: false,
                accounts: [],
                walletProvider: localStorage.getItem('provider') === null ? '' : localStorage.getItem('provider'),
                mmConnected: false,
                isEmailConnected: false,
                mmInstalled: false,
                mmCount: 0,
                newCount: 10,
                networkChainID: '0x1',
                binanceConnected: false,
                binanceInstalled: false,
                binanceCount: 0,
                walletConnected: false,
                isDAppReady: false,
                isLoggedIn: false,
                isVerified: false,
                idVerified: false,
                phoneVerified: false,
                ownsNFTs: false,
                nftName: '',
                accLevel: 0,
                accType: 0,
                accStatus: 0,
                memberSince: 0,
                language: 'en', // localStorage.getItem('language') === null ? 'en' : localStorage.getItem('language'),
                favorites: [],
                likes: localStorage.getItem('likes') === null ? [] : JSON.parse(localStorage.getItem('likes')),
                welcome: null,
                showWelcomeSession: false,
                showWelcome: localStorage.getItem('welcome') === null ? false : JSON.parse(localStorage.getItem('welcome'))
            },
            count: 0,
            drawer: false
        }
    },
    mutations: {
        increment (state) {
            state.count++
            console.log(state)
        },
        setDrawer (state, payload) {
            console.log('drawer: ' + payload.drawer)
            state.drawer = payload.drawer
        },
        SetEmailConnected(state, payload) { 
            state.user.isEmailConnected = payload.isEmailConnected;
            state.user.isLoggedIn = payload.isLoggedIn;
        },
        SetMetaMaskInstalled (state, payload) {
            state.user.mmInstalled = payload.mmInstalled
        },
        SetConnectedUserFalse (state, payload) {
            state.user.welcome = payload.welcome
        },
        SetCount (state, payload) {
            state.user.mmCount = payload.mmCount
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        SetUserDetails (state, payload) {
            // console.log('SetUserDetails in Store')
            // console.log(payload)
            state.user.accounts = payload.accounts
            state.user.walletProvider = payload.walletProvider
            localStorage.setItem('provider', payload.walletProvider)
            state.user.mmConnected = payload.mmConnected
            state.user.mmInstalled = payload.mmInstalled
            state.user.binanceConnected = payload.binanceConnected
            state.user.binanceInstalled = payload.binanceInstalled
            state.user.walletConnected = payload.walletConnected
            state.user.isDAppReady = payload.isDAppReady
            state.user.networkChainID = payload.networkChainID
            state.user.mmCount = payload.mmCount
        },
        SetConnectedUserDetails (state, payload) {
            console.log(payload);
            // console.log('SetUserDetails in Store')
            // console.log(payload)
            state.user.uid = payload.uid
            state.user.docId = payload.docId
            state.user.language = payload.language
            state.user.displayName = payload.displayName
            state.user.aboutMe = payload.aboutMe
            state.user.fullName = payload.fullName
            state.user.dob = payload.dob
            state.user.gender = payload.gender
            state.user.address = payload.address
            state.user.email = payload.email
            state.user.gravatar = payload.gravatar
            state.user.avatar = payload.avatar
            state.user.isLoggedIn = payload.isLoggedIn
            state.user.isVerified = payload.isVerified
            state.user.idVerified = payload.idVerified
            state.user.phoneVerified = payload.phoneVerified
            // state.user.accLevel = payload.accLevel
            state.user.accType = payload.accType
            state.user.accStatus = payload.accStatus
            state.user.memberSince = payload.memberSince
            state.user.favorites = payload.favorites
            state.user.welcome = payload.welcome
        },
        SetMetaMaskChanges (state, payload) {
            console.log(payload)
            state.user.accounts = payload.accounts
            state.user.mmConnected = payload.mmConnected
            state.user.walletProvider = payload.walletProvider
            localStorage.setItem('provider', payload.walletProvider)
            state.user.isLoggedIn = payload.isLoggedIn
        },
        SetWalletConnectChanges (state, payload) {
            state.user.accounts = payload.accounts
            state.user.walletConnected = payload.mmConnected
            state.user.walletProvider = payload.walletProvider
            localStorage.setItem('provider', payload.walletProvider)
            state.user.isLoggedIn = payload.isLoggedIn
        },
        
    },
    modules: {
        // More Modules Go Here
        auth: AuthModule,
        fb: FirebaseModule
    }
})
