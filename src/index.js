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
let activeArray = [];
let tags = [];
let h1 = null;
let i = 0;

onSnapshot(colRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    words.push(doc.data())
  })
  
  // 0 Initialize Active Array
  activeArray = words

  // 1 Get Tags
  tags = [...new Set(words.map(item => item.tag))];
  let str = '<ul class="menu">';
  tags.forEach((tag) => {
    str += '<li class="menu-item" id="' + tag + '">' + tag + '</li>';
  });
  str += '</ul>';
  document.getElementById("filterbox").innerHTML = str;


  // 2 Tag Clicker
  tags.forEach((tag) => {

    // change activeArray with click
    document.getElementById(tag)
    .addEventListener("click", () => {
      console.log(tag + " clicked")
      activeArray = words;
      activeArray = activeArray.filter( x => x.tag == tag );
      getNext();

      // remove all active
      tags.forEach((tag)=>{
        document.getElementById(tag).classList.remove("active");
      })
      // make one active
      document.getElementById(tag).classList.add("active");
    });
  })

  // Logs
  console.log(words)
  console.log(activeArray)
  console.log(tags)
});




// Next Click
document.getElementById("wordbox")
  .addEventListener("click", () => {
    console.log("clicked")
    getNext();
  });

function getNext() {
  let random = Math.floor(Math.random() * activeArray.length);
  if (activeArray.length == 1) {
    h1 = activeArray[0].word;
    i++;
    document.getElementById("h1").innerHTML = h1;
  }
  else if (h1 == activeArray[random].word){
    getNext()
  }
  else {
    h1 = activeArray[random].word;
    i++;
    document.getElementById("h1").innerHTML = h1;
  }
}


