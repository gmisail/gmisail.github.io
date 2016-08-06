var p = "7 11 -17 12"

function getPassword(){
    var pass = prompt("Please enter a password below.");
    if(pass != null){
        if(pass == p){
            var file = prompt("Choose a project");
            document.location.href = "http://gmisail64.github.io/lab/" + file + "/index.html";
        }else{
            alert("Incorrect password");
        }
    }
}
