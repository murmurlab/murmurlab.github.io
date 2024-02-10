
let socket = io()
let bra = new Audio("braa.mp3")


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
        document.cookie="usertoken="
    })
    }
//ss
document.getElementById("subtn").addEventListener("submit",signOut)
document.getElementById("list_lobby").addEventListener("click",()=>{
    
    document.getElementById("listl").setAttribute("style","display:block")
    
})
document.getElementById("close").addEventListener("click",()=>{
    bra.play()
    document.getElementById("listl").setAttribute("style","display:none")

})
document.getElementById("crelob").addEventListener("click",()=>{
    let lobyName = document.getElementById("lobyName").value
    let overwrite = document.getElementById("overwrite").checked
    /* let xhr=new XMLHttpRequest()
    xhr.open("post",window.location.origin)
    xhr.send({
        head:{
            opcode:0
        },
        body:{
            lobyName:lobyName
        }
    })
    xhr.onload */
    

    socket.emit("operation",{
        head:{
            operation:"crelob",
            arguments:{
                overwrite:overwrite
            }
        },
        body:{
            lobyName:lobyName
        }
    })
})


window.onload = ()=>{
    document.getElementById("load").setAttribute("style","display:none")
    document.getElementById("block").setAttribute("style","display:block")
    socket.emit("operation",{
        head:{
            operation:"pull",
            arguments:{
                data:["lobbies"]
            }
        },
        body:{
    
        }
    })

    socket.on("response",data=>{
        console.log("pulled");
        console.log(data);
    })

}
//on success
function onSuccess(googleUser) {
    document.getElementById("load").setAttribute("style","display:block")
    document.getElementById("block").setAttribute("style","display:none") 
    console.log("logining");
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    console.log(profile);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    document.cookie="usertoken="+id_token
    let req1 = new XMLHttpRequest()
    req1.open("POST", window.location.origin)
    
    req1.onload = function() {
        console.log(req1.response);
      if(req1.response=="succes"){
        document.getElementById("load").setAttribute("style","display:none")
      }
        //window.location.replace(req1.responseURL);
        //console.log('response: ' + req1.responseURL);
        
    }
    
    req1.send("token");
    console.log("cookie okunsun diye post");
    
}
//on failure
function onFailure(error) {
    document.getElementById("load").setAttribute("style","display:none")
    document.getElementById("block").setAttribute("style","display:none")
    console.log(error);
    }
//renderButton()
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
    }