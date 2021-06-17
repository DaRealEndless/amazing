//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBYn7L-0XaLRjpEf8N3FvNsbxxgaLPMe8c",
      authDomain: "test-room-lol-not-lying-xd.firebaseapp.com",
      databaseURL: "https://test-room-lol-not-lying-xd-default-rtdb.firebaseio.com",
      projectId: "test-room-lol-not-lying-xd",
      storageBucket: "test-room-lol-not-lying-xd.appspot.com",
      messagingSenderId: "190902005648",
      appId: "1:190902005648:web:dee80ca985e155d91d0d15"
};

firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data["name"];
                        message = message_data["message"];
                        like = message_data["like"];
                        console.log("likes"+like);
                       
                        Name_html = "<h4>" + name + "<img class='user_tick' src='tick.jpg'></h4>";
                        msg_html = "<h4 class='msg_h4'>" + message + "</h4>";
                        like_html = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + "onclick='update_like(this.id)'>";
                        span_html = "<span class='glyphicon glyphicon-thumbs-up'>LIKE:" + like + "</span> </button><hr>"
                        total_html = Name_html + msg_html + like_html + span_html;
                        document.getElementById("output").innerHTML += total_html;
                        //End code
                  }
            });
      });
}
getData();

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = ""
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "kwitter.html";
}

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}