
// import { getDatabase, ref, child, get } from "firebase/database";
  // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDYQxoFMDV5gKie-E8zg_lz6CCXHcYOvcM",
    authDomain: "notion-it-chat.firebaseapp.com",
    projectId: "notion-it-chat",
    storageBucket: "notion-it-chat.appspot.com",
    messagingSenderId: "432618414673",
    appId: "1:432618414673:web:0ec827619226dae0f0ce70"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
    const db = app.firestore();
    const auth = app.auth();
//   console.log(app)

function addUsers()
{
  var firstName = document.getElementById("firstName").value;   
  var lastName=document.getElementById("lastName").value;
   if(firstName.length<4 || lastName.length<4){
    alert("Please enter atleast four charecters")
    return
   }
  firebase.firestore().collection("users")
  .add({
    Firstname : firstName,
    Lastname : lastName,
  })
  .then((ref) => {
    localStorage.setItem("userName", JSON.stringify({
      resUser:firstName+" "+lastName,
      id:ref.id,
  }))
  window.location.href="chatPage.html";

    // return ref.id;
  });
  // $("#loginPopup").hide();
  // $("#chatPopup").show();

}
function sendChatData()
{
  var username = JSON.parse(localStorage.getItem("userName"))
  var chatData = document.getElementById("chatData").value;   
  
  firebase.firestore().collection("chat")
  .add({
    id: username.id,
    userName : username.resUser,
    message : chatData,
    time : Date.now()
  })
  .then((ref) => {
    document.getElementById("chatData").value="";
    return ref.id;
  });
  
}


function getAllMessageData(){
 
   var allMessageData=[];
   db.collection("chat").orderBy("time").onSnapshot(allMessage => {
    document.getElementById("showChatBox").innerHTML=""
    allMessage.forEach(item => {
      // console.log(item.data());
      displayData(item.data())
    })
    
})

    // console.log( msg)
   }

  //  console.log( msg)
  

function displayData(item){
  var containchat=document.getElementById("showChatBox");
  containchat.scrollTop = containchat.scrollHeight;
  var messageDiv=document.createElement("div");
  var username = JSON.parse(localStorage.getItem("userName")).resUser;
  if (item.userName == username) {
    messageDiv.innerHTML = `
        <div class="myMessage messageBox">
        <div class="usernamebox">
        <img width="20px" height=20px src="./personIcon/baseline_account_circle_black_24dp.png" alt="">
            <p><small>${item.userName}</small></p>
            </div>
            <p class="messageData" style="padding-right:2%;">${item.message}</p>
           
           
        </div>
    `
  }
  else if (item.userName == undefined) {
    messageDiv.innerHTML = `
        <div class="userMessage messageBox">
        <div class="usernamebox1">
        <img width="20px" height=20px  position: absolute; src="./personIcon/baseline_account_circle_black_24dp.png" alt="">
            <p><small>Anonymous</small></p>
            </div>
            <p class="messageData">${item.message}</p>
          
           
        </div>
    `
  }
  else {
    messageDiv.innerHTML = `
        <div class="userMessage messageBox">
        <div class="usernamebox1">
        <img width="20px" height=20px src="./personIcon/baseline_account_circle_black_24dp.png" alt="">
            <p><small>${item.userName}</small></p>
           
            </div>
            <p class="messageData">${item.message}</p>
          
            
        </div>
    `
  }
  containchat.append(messageDiv);
}
window.onload=getAllMessageData;

function logoutFunct(){
  console.log("here")
  window.open("userjoinChat.html");
}
// displayData();
