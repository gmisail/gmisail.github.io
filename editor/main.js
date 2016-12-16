var text = document.getElementById('text');

function on_load(file){
    var files = document.getElementById('loader').files;
    var file = files[0];
    
    console.log("[Editor.js](Raw Load Data) ->");
    console.log(file);
    
    var reader = new FileReader();
    var content = "File unable to be read";
    
    reader.readAsText(file);
    reader.onloadend = function(evt) {
        content = evt.target.result;
        console.log("[Editor.js](File Loader) Success");
        text.value = content;
    }
}

function on_download(){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text.value));
    element.setAttribute('download', 'file');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function on_export(){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text.value));
    element.setAttribute('download', prompt("Title: "));

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
