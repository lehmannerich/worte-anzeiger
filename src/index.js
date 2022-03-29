import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, onSnapshot
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBkmGLluiIFmN9lYMY0UrEEk3H1BHQbIhE",
  authDomain: "words-6ab0b.firebaseapp.com",
  projectId: "words-6ab0b",
  storageBucket: "words-6ab0b.appspot.com",
  messagingSenderId: "89434132335",
  appId: "1:89434132335:web:ac8d974fcd0483a937e29a"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'words')

// realtime collection data
let words = [];
let h1 = null;
let i = 0;

onSnapshot(colRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    words.push(doc.data())
  })
});

document.addEventListener("click", () => {
  console.log("clicked")
  getNext();
  document.getElementById("h1").innerHTML = h1;
});

function getNext() {
  let random = Math.floor(Math.random() * words.length);
  h1 = words[random].word;
  i++;
}