console.log('hi devanshi');
var firebaseConfig = {
    apiKey: "AIzaSyDvFzGOxiGL-jYFYPYqt6rGB2WcD15SBNE",
    authDomain: "blogapp-cf367.firebaseapp.com",
    databaseURL: "https://blogapp-cf367.firebaseio.com",
    projectId: "blogapp-cf367",
    storageBucket: "blogapp-cf367.appspot.com",
    messagingSenderId: "883211144587",
    appId: "1:883211144587:web:4c2827d59552bedb0ff38e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  firebase.auth.Auth.Persistence.LOCAL;
  $('#btn-login').click(function()
  {
      var email = $('#email').val();
      var password = $('#password').val();

      if(email != "" && password != ""){
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error){
             var errCode = error.code;
             var errorMessage = error.message;
             console.log(errCode);
             console.log(errorMessage);
             window.alert("Message : " + errorMessage);
         });
      }
      else{
          window.alert("Please fill out all fields.")
      }
  });

  $('#btn-logout').click(function()
  { 
      console.log('i am clicked');
    firebase.auth().signOut();
});

$('#btn-signup').click(function()
  {
      var email = $('#email').val();
      var password = $('#password').val();
      var cPassword = $('#confirmPassword').val();

      if(email != "" && password != "" && cPassword != ""){
       if(password == cPassword)
       {
        var result = firebase.auth().createUserWithEmailAndPassword(email, password);
        result.catch(function(error){
             var errCode = error.code;
             var errorMessage = error.message;
             console.log(errCode);
             console.log(errorMessage);
             window.alert("Message : " + errorMessage);
         });
       }
       else{
           window.alert("Passwords do not match");
       }
      }
      else{
          window.alert("Please fill out all fields.")
      }
  });

  $('#btn-resetPassword').click(function()
  { 
      var auth = firebase.auth();
      var email = $("#email").val();

      if(email != "")
      {
         auth.sendPasswordResetEmail(email).then(function()
         {
            window.alert(" Email has been sent to you. Please  check and verify.");
         })
         .catch(function(error){
            var errCode = error.code;
            var errorMessage = error.message;
            console.log(errCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
         });
      }
      else
      {
          window.alert("Please write your email");
      }
});

$('#btn-update').click(function()
  { 
    var phone = $('#phone').val();
    var address = $('#address').val();
    var bio = $('#bio').val();
    var fName = $('#firstName').val();
    var sName = $('#secondName').val();
    var country = $('#country').val();
    var gender = $('#gender').val();
    
    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName != "" && sName != "" && phone != "" && address != "" && bio != "" && country != "" && gender != "")
    {
      var userData = {
          "phone" : phone,
          "address" : address,
          "bio" : bio,
          "firstName" : fName,
          "secondName" : sName,
          "country" : country,
          "gender" : gender
      };

      usersRef.set(userData, function(error){
          if(error)
          {
            var errCode = error.code;
            var errorMessage = error.message;
            console.log(errCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
          }
          else
          {
               window.location.href = "MainPage.html";
          }
      });
    }

    else
    {
        window.alert("Form is incomplete. Fill out all the fields");
    }
});

function switchView(view)
{
    $.get({
        url : view,
        cache : false,
    }).then(function(data){
        $("#container").html(data);
    });
}