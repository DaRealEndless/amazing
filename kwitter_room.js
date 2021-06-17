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
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "welcome" + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;

        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "kwitter.html";
}