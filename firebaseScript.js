// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq1m5uk57_5VU_JKP5BfCD2tawahiaRwo",
  authDomain: "notion-chat-e5142.firebaseapp.com",
  projectId: "notion-chat-e5142",
  storageBucket: "notion-chat-e5142.appspot.com",
  messagingSenderId: "1032788325348",
  appId: "1:1032788325348:web:1efaad7cb2b1004c6b8df1",
  measurementId: "G-JM9W089ZK3",
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
// const auth = app.auth();
//   console.log(app)

//**function for add users**//
function addUsers() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  if (firstName.length < 4 || lastName.length < 4) {
    alert("Please enter atleast four charecters for each input box");
    return;
  }
  firebase
    .firestore()
    .collection("users")
    .add({
      Firstname: firstName,
      Lastname: lastName,
    })
    .then((ref) => {
      localStorage.setItem(
        "userName",
        JSON.stringify({
          resUser: firstName + " " + lastName,
          id: ref.id,
        })
      );
      window.location.href = "chatPage.html";

      // return ref.id;
    });
  // $("#loginPopup").hide();
  // $("#chatPopup").show();
}

// **function for send chat message to firebase**//
function sendChatData() {
  var username = JSON.parse(localStorage.getItem("userName"));
  var chatData = document.getElementById("chatData").value;

  firebase
    .firestore()
    .collection("chat")
    .add({
      id: username.id,
      userName: username.resUser,
      message: chatData,
      time: Date.now(),
    })
    .then((ref) => {
      document.getElementById("chatData").value = "";
      return ref.id;
    });
}

//**function for get all message data from firebase**//
function getAllMessageData() {
  var containchat = document.getElementById("showChatBox");
  db.collection("chat")
    .orderBy("time")
    .onSnapshot((allMessage) => {
      document.getElementById("showChatBox").innerHTML = "";
      allMessage.forEach((item) => {
        // console.log(item.data());

        displayData(item.data());
      });
      containchat.scrollTop = containchat.scrollHeight; //code for auto scroll to see new message on chatbox
    });
}

//**function for display the messages on browser **//
function displayData(item) {
  var containchat = document.getElementById("showChatBox");
  var time1 = new Date(item.time);
  //  console.log(time1.toLocaleString('en-US'))

  var messageDiv = document.createElement("div");

  var username = JSON.parse(localStorage.getItem("userName")).resUser;
  if (item.userName == username) {
    messageDiv.innerHTML = `
        <div class="myMessageBox messageShowingBox" style=" background-color: green; padding:5px;">
        <div class="usernamebox" style="padding:5px;">
        <img width="20px" height=20px src="./personIcon/baseline_account_circle_black_24dp.png" alt="">
            <p><small>${item.userName} ,</small></p>
            <p><small>${time1.toLocaleString("en-US")}</small></p>
            </div>
            <p class="messageData" style="padding-right:2%;">${item.message}</p>
           
           
        </div>
    `;
  } else if (item.userName == undefined) {
    messageDiv.innerHTML = `
        <div class="userMessageBox messageShowingBox" style=" background-color:teal; padding:5px; ">
        <div class="usernamebox1" style="padding:5px;">
        <img width="20px" height=20px  position: absolute; src="./personIcon/baseline_account_circle_black_24dp.png" alt="">
            <p><small>Anonymous ,</small></p>
            <p><small>${time1.toLocaleString("en-US")}</small></p>
            </div>
            <p class="messageData">${item.message}</p>
          
           
        </div>
    `;
  } else {
    messageDiv.innerHTML = `
        <div class="userMessageBox messageShowingBox" style=" background-color:teal; padding:5px;">
        <div class="usernamebox1" style="padding:5px;">
        <img width="20px" height=20px src="./personIcon/baseline_account_circle_black_24dp.png" alt="">
            <p><small>${item.userName} ,</small></p>
            <p><small>${time1.toLocaleString("en-US")}</small></p>
           
            </div>
            <p class="messageData">${item.message}</p>
          
            
        </div>
    `;
  }

  containchat.append(messageDiv);
}
window.onload = getAllMessageData;
//**function for logout**//
function logoutFunct() {
  // console.log("here")
  window.open("index.html");
}
