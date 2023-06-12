const FIREBASE_CONFIG_TEST_ENV = {
  apiKey: "AIzaSyDzUezY-J_P8Gs2BNO5xKy-bpEo6xar8HY",
  authDomain: "meme-master-staging.firebaseapp.com",
  projectId: "meme-master-staging",
  storageBucket: "meme-master-staging.appspot.com",
  messagingSenderId: "828147414915",
  appId: "1:828147414915:web:9ededd47adfb95131b28b6",
  measurementId: "G-XXD2M21N04"
};

const FIREBASE_CONFIG_PROD_ENV = { /// Change Later
  apiKey: "AIzaSyCsDzN40b7Yrebq2QVkZP1_X5b7gHKLph4",
  authDomain: "meme-master-app.firebaseapp.com",
  projectId: "meme-master-app",
  storageBucket: "meme-master-app.appspot.com",
  messagingSenderId: "629898393927",
  appId: "1:629898393927:web:eb4f2e55ce71bcd7023462",
  measurementId: "G-9WQ985X5EK"
};

var FIREBASE_CONFIG = {};

if (process.env.VITE_APP_ENVIRONMENT === "production") {
  console.log("PROD ENVIRONMENT");
  FIREBASE_CONFIG = FIREBASE_CONFIG_PROD_ENV;
} else if (process.env.VITE_APP_ENVIRONMENT === "testnet") {
  console.log("STAGING ENVIRONMENT");
  FIREBASE_CONFIG = FIREBASE_CONFIG_TEST_ENV;
} else {
  console.log("LOCAL ENVIRONMENT");
  FIREBASE_CONFIG = FIREBASE_CONFIG_TEST_ENV;
}

export default FIREBASE_CONFIG;
