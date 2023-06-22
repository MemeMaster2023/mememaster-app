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
                twConnected: false,
                twInstalled: false,
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
                balance: 0,
                tokenBlance:  0,
                userTier: 1,
                language: 'en', // localStorage.getItem('language') === null ? 'en' : localStorage.getItem('language'),
                favorites: [],
                likes: localStorage.getItem('likes') === null ? [] : JSON.parse(localStorage.getItem('likes')),
                welcome: null,
                showWelcomeSession: false,
                showWelcome: localStorage.getItem('welcome') === null ? false : JSON.parse(localStorage.getItem('welcome')),
                photo: '',
                version: ''
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
            // console.log('drawer: ' + payload.drawer)
            state.drawer = payload.drawer
        },
        setAvatar (state, payload) {
            console.log('avatar: ' + payload.avatar)
            state.user.avatar = payload.avatar
        },
        setBalance (state, payload) {
            console.log('balance: ' + payload.balance)
            state.user.balance = payload.balance
        },
        setTokenBalance (state, payload) {
            console.log('tokenBalance: ' + payload.tokenBalance)
            state.user.tokenBalance = payload.tokenBalance
        },
        setCredits (state, payload) {
            console.log('credits: ' + payload.credits)
            state.user.credits = payload.credits
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
            state.user.twConnected = payload.twConnected
            state.user.twInstalled = payload.twInstalled
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
            state.user.version = payload.version
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
            state.user.twConnected = payload.twConnected
            state.user.walletProvider = payload.walletProvider
            localStorage.setItem('provider', payload.walletProvider)
            localStorage.setItem('mm-mmConnected', payload.mmConnected)
            state.user.isLoggedIn = payload.isLoggedIn
            localStorage.setItem('mm-isEmailConnected', payload.isEmailConnected);
            localStorage.setItem('mm-uid', payload.uid)
        },
        SetDisplayName(state, payload){
            state.user.displayName = payload.newName;
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
            state.user.dark = true
            state.user.uid = ''
            state.user.docId = ''
            state.user.email = ''
            state.user.displayName = ''
            state.user.aboutMe = ''
            state.user.fullName = ''
            state.user.address = ''
            state.user.dob = ''
            state.user.gender = 0
            state.user.gravatar = false
            state.user.avatar = ''
            state.user.hasCoinbase = false
            state.user.hasWeb3InjectedBrowser = false
            state.user.accounts = []
            state.user.walletProvider = ''
            state.user.mmConnected = false
            state.user.mmInstalled = false
            state.user.twConnected = false
            state.user.twInstalled = false
            state.user.isEmailConnected = false
            state.user.mmCount = 0
            state.user.newCount = 10
            state.user.networkChainID = '0x1'
            state.user.binanceConnected = false
            state.user.binanceInstalled = false
            state.user.binanceCount = 0
            state.user.walletConnected = false
            state.user.isDAppReady = false
            state.user.isLoggedIn = false
            state.user.isVerified = false
            state.user.idVerified = false
            state.user.phoneVerified = false
            state.user.ownsNFTs = false
            state.user.nftName = ''
            state.user.accLevel = 0
            state.user.accType = 0
            state.user.accStatus = 0
            state.user.memberSince = 1
            state.user.credits = 0
            state.user.language = 'en'
            state.user.favorites = []
            state.user.likes = []
            state.user.welcome = null
            state.user.showWelcomeSession = false
            state.user.showWelcome = null
            state.user.version = ''
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
