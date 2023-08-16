const FIREBASE_CONFIG_TEST_ENV = {
  apiKey: "AIzaSyDzUezY-J_P8Gs2BNO5xKy-bpEo6xar8HY",
  authDomain: "meme-master-staging.firebaseapp.com",
  projectId: "meme-master-staging",
  storageBucket: "meme-master-staging.appspot.com",
  messagingSenderId: "828147414915",
  appId: "1:828147414915:web:9ededd47adfb95131b28b6",
  measurementId: "G-XXD2M21N04"
};

const FIREBASE_CONFIG_PROD_ENV = {
  apiKey: "AIzaSyCsDzN40b7Yrebq2QVkZP1_X5b7gHKLph4",
  authDomain: "meme-master-app.firebaseapp.com",
  projectId: "meme-master-app",
  storageBucket: "meme-master-app.appspot.com",
  messagingSenderId: "629898393927",
  appId: "1:629898393927:web:eb4f2e55ce71bcd7023462",
  measurementId: "G-9WQ985X5EK"
};

// const FIREBASE_CONFIG_LOCAL_ENV = {
//   apiKey: "AIzaSyACM4-YRTvUJJoIa8hCUSXPX_FnCNBt_-Y",
//   authDomain: "civil-array-390609.firebaseapp.com",
//   databaseURL: "https://civil-array-390609-default-rtdb.firebaseio.com",
//   projectId: "civil-array-390609",
//   storageBucket: "civil-array-390609.appspot.com",
//   messagingSenderId: "834724276047",
//   appId: "1:834724276047:web:875a0c94f3343f5828873a",
//   measurementId: "G-ZLPSP8YR76"
// };

var FIREBASE_CONFIG = {};

if (import.meta.env.VITE_APP_ENVIRONMENT === "production") {
  console.log("PROD ENVIRONMENT");
  FIREBASE_CONFIG = FIREBASE_CONFIG_PROD_ENV;
} else if (import.meta.env.VITE_APP_ENVIRONMENT === "testnet") {
  console.log("STAGING ENVIRONMENT");
  FIREBASE_CONFIG = FIREBASE_CONFIG_TEST_ENV;
} else {
  console.log("LOCAL ENVIRONMENT");
  FIREBASE_CONFIG = FIREBASE_CONFIG_TEST_ENV;
}

export default FIREBASE_CONFIG;



