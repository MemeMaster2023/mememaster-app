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
                uid: localStorage.getItem('mm-uid') === null ? '' : localStorage.getItem('mm-uid'),
                docId: '',
                email: localStorage.getItem('mm-email') === null ? '' : localStorage.getItem('mm-email'),
                displayName: localStorage.getItem('mm-displayName') === null || localStorage.getItem('mm-displayName') === '' ? null : localStorage.getItem('mm-displayName'),
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
                walletconnect: localStorage.getItem('walletconnect') === null ? '' : localStorage.getItem('walletconnect'),
                walletProvider: localStorage.getItem('provider') === null ? '' : localStorage.getItem('provider'),
                mmConnected: false,
                isEmailConnected: localStorage.getItem('mm-isEmailConnected') === null ? false : localStorage.getItem('mm-isEmailConnected') === 'false' ? false : true,
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
                memberSince: localStorage.getItem('mm-memberSince') === null ? 0 : localStorage.getItem('mm-memberSince'),
                credits: 0,
                language: 'en', // localStorage.getItem('language') === null ? 'en' : localStorage.getItem('language'),
                favorites: [],
                likes: localStorage.getItem('likes') === null ? [] : JSON.parse(localStorage.getItem('likes')),
                welcome: null,
                showWelcomeSession: false,
                showWelcome: localStorage.getItem('welcome') === null ? false : JSON.parse(localStorage.getItem('welcome')),
                photo: '',
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
            localStorage.setItem('mm-isEmailConnected', payload.isEmailConnected);
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
            localStorage.setItem('mm-mmConnected', payload.mmConnected)
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
            state.user.credits = payload.credits
            state.user.memberSince = payload.memberSince
            state.user.favorites = payload.favorites
            state.user.welcome = payload.welcome
            state.user.photo = payload.photo
            localStorage.setItem('mm-displayName', payload.displayName)
            localStorage.setItem('mm-email', payload.email)
            localStorage.setItem('mm-uid', payload.uid)
            localStorage.setItem('mm-memberSince', payload.memberSince)
        },
        SetMetaMaskChanges (state, payload) {
            console.log('SetMetaMaskChanges')
            console.log(payload)
            state.user.accounts = payload.accounts
            state.user.mmConnected = payload.mmConnected
            state.user.walletProvider = payload.walletProvider
            localStorage.setItem('provider', payload.walletProvider)
            localStorage.setItem('mm-mmConnected', payload.mmConnected)
            state.user.isLoggedIn = payload.isLoggedIn
            localStorage.setItem('mm-isEmailConnected', payload.isEmailConnected);
            localStorage.setItem('mm-uid', payload.uid)
        },
        SetDisplayName(state, payload){
            state.user.displayName = payload.newName;
            localStorage.setItem('mm-displayName', payload.newName)
        },
        SetWalletConnectChanges (state, payload) {
            console.log('SetWalletConnectChanges')
            console.log(payload)
            state.user.accounts = payload.accounts
            state.user.walletConnected = payload.walletConnected
            state.user.walletProvider = payload.walletProvider
            localStorage.setItem('provider', payload.walletProvider)
            localStorage.setItem('mm-mmConnected', payload.mmConnected)
            state.user.isLoggedIn = payload.isLoggedIn
            localStorage.setItem('mm-isEmailConnected', payload.isEmailConnected);
            state.user.isEmailConnected = payload.isEmailConnected
            localStorage.setItem('mm-uid', payload.uid)
        },
        SetEmpty(state){
            state.dark = true
            state.uid = ''
            state.docId = ''
            state.email = ''
            state.displayName = ''
            state.aboutMe = ''
            state.fullName = ''
            state.address = ''
            state.dob = ''
            state.gender = 0
            state.gravatar = false
            state.avatar = ''
            state.hasCoinbase = false
            state.hasWeb3InjectedBrowser = false
            state.accounts = []
            state.walletProvider = ''
            state.mmConnected = false
            state.isEmailConnected = false
            state.mmInstalled = false
            state.mmCount = 0
            state.newCount = 10
            state.networkChainID = '0x1'
            state.binanceConnected = false
            state.binanceInstalled = false
            state.binanceCount = 0
            state.walletConnected = false
            state.isDAppReady = false
            state.isLoggedIn = false
            state.isVerified = false
            state.idVerified = false
            state.phoneVerified = false
            state.ownsNFTs = false
            state.nftName = ''
            state.accLevel = 0
            state.accType = 0
            state.accStatus = 0
            state.memberSince = 1
            state.language = 'en'
            state.favorites = []
            state.likes = []
            state.welcome = null
            state.showWelcomeSession = false
            state.showWelcome = null
            state.photo = ''
            localStorage.removeItem('provider')
            localStorage.removeItem('mm-mmConnected')
            localStorage.removeItem('mm-uid')
            localStorage.removeItem('mm-displayName')
            localStorage.removeItem('mm-email')
            localStorage.removeItem('mm-displayName')
            localStorage.removeItem('mm-memberSince')
        },
        SetNetworkChainID (state, payload) {
            state.user.networkChainID = payload.networkChainID
         },
        SetPhoto(state, payload){
            state.user.photo = payload.photo
        }
    },
    modules: {
        // More Modules Go Here
        auth: AuthModule,
        fb: FirebaseModule
    }
})
