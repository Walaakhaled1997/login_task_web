// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { signOut,getAuth,onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc,getDoc ,updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAez8UC9PZdRaDz1ya-d9Xmn9RDmRi6ZOU",
  authDomain: "logintask-d3389.firebaseapp.com",
  projectId: "logintask-d3389",
  storageBucket: "logintask-d3389.appspot.com",
  messagingSenderId: "1004317892048",
  appId: "1:1004317892048:web:169ba145804d09f5636dd5",
  measurementId: "G-GTCZD03VEY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const submit = document.getElementById('submit');
submit.addEventListener("click", function(event){
event.preventDefault()
var email = document.getElementById("emailId").value;
var pass = document.getElementById('pass').value;
var loginForm = document.getElementById('loginForm'); 
var loggedMsg =  document.getElementById('loggedMsg'); 
var logout =  document.getElementById('logout'); 

signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
  })
  .catch(error => {
    if (error.code === 'auth/user-not-found') {
      console.log('There no user exist with that email');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    console.error(error);
  });

  var userId = '';
  onAuthStateChanged(auth,async (user) => {
    if (user) {
      userId = user.uid;
      const docRef = doc(db, "user", userId);
      await updateDoc(docRef, {
        logged: true
      });

  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    
    document.body.style.backgroundColor = 'white';
    loginForm.style.display = 'none';
    loggedMsg.style.display = 'block';
    logout.style.display = 'block';
    if(docSnap.data().type == 2)
    loggedMsg.innerHTML = 'Hi Customer,'+docSnap.data().name; 
    else
    loggedMsg.innerHTML = 'Hi Admin,'+docSnap.data().name; 


  } else {
    console.log("No such document!");
  }
    } else {
      
    }
  });

logout.addEventListener("click",  function(event){
  event.preventDefault()
  signOut(auth).then(async() => {
    const docRef = doc(db, "user", userId);

    await updateDoc(docRef, {
      logged: false
    });
  userId = '';
  document.body.style.backgroundColor = '#2196F3FF';
  loginForm.style.display = 'block';
  loggedMsg.style.display = 'none';
  logout.style.display = 'none';
  }).catch((error) => {
    console.error(error);
  });
});
})