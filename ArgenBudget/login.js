/* Instancias del Modelo de Login *///////////////////////////////////////////////////////
/* To use ajax in Chrome do this Chrome.exe" --allow-file-access-from-files */

function newLogin (){

   var http_request = new XMLHttpRequest();
   try{
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
   }catch (e){
      // Internet Explorer Browsers
      try{
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }
   http_request.onreadystatechange = function (){
      if (http_request.readyState == 4) {

        var jsonObj = JSON.parse(http_request.responseText);

        var nuevoLogin = new getValuesLogin(userLogin);
        var newUser = nuevoLogin.getInfoUser();
        var newPass = nuevoLogin.getInfoPass();

        if (newUser == jsonObj.username && newPass == jsonObj.pass){

          var loggedInAs = "Logged in as ";
          document.getElementById("userName").innerHTML = loggedInAs + jsonObj.username;
          var floatRightUsername = document.getElementById("userName");
              floatRightUsername.classList.add('loginPosition');

          $('#passLogin').remove();
          $('#userLogin').remove();
          $('#get-users').remove();

        var createButtonLogout = document.createElement('input');
            createButtonLogout.setAttribute("id","logoutButton");
            createButtonLogout.setAttribute("value","Logout");
            createButtonLogout.setAttribute("type","button");
        var getLoginDiv = document.getElementById("loginContainer");
            getLoginDiv.appendChild(createButtonLogout);

        /* Bind to event Logout */
        document.getElementById('logoutButton').onclick = newLogout;

        }else{
          document.getElementById("userName").innerHTML = "Not a valid Username or Password";
        }
      }
   }
   http_request.open("GET", "users.json", true);
   http_request.send();
}

function newLogout (){
  document.getElementById('userName').innerHTML="";

  $('#logoutButton').remove();
  
  var createInputButton = document.createElement('input');
      createInputButton.setAttribute("value","Login");
      createInputButton.setAttribute("type","button");
      createInputButton.setAttribute("id","get-users");
  var getLoginDivForButton = document.getElementById("loginContainer");
      getLoginDivForButton.appendChild(createInputButton);

  var createInputPass = document.createElement('input');
      createInputPass.setAttribute("placeholder","Pass");
      createInputPass.setAttribute("type","password");
      createInputPass.setAttribute("id","passLogin");
  var getLoginDivForPass = document.getElementById("loginContainer");
      getLoginDivForPass.appendChild(createInputPass);

  var createInputLogin = document.createElement('input');
      createInputLogin.setAttribute("placeholder","User");
      createInputLogin.setAttribute("type","text");
      createInputLogin.setAttribute("id","userLogin");
  var getLoginDivForLogin = document.getElementById("loginContainer");
      getLoginDivForLogin.appendChild(createInputLogin);

/*
  <input id="get-users" type="button" value="Login"/>
  <input type="password" name="lastname" id="passLogin" placeholder="Pass">
  <input type="text" name="lastname" id="userLogin" placeholder="User">
*/
}