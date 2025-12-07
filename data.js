// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// قائمة الطعام
const menu = [
    {name: "وجبة أساسية", desc: "برقر + بطاطس + مشروب", price: 50},
    {name: "10 وجبة جكن فليه", desc: "مشروب وجكن فليه من كل شيء", price: 2000},
    {name: "برقر منفصل", desc: "-", price: 100},
    {name: "مشروب منفصل", desc: "-", price: 80},
];

// الطلبات
let orders = [];
