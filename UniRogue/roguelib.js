var view = document.getElementById('view');
var buffer = "";

function console_render(){
    view.innerHTML = buffer;
}

function console_print_char(char){
    buffer += char;
}

function console_print_space(){
    buffer += ".";
}

function console_print_char_white(char){
    buffer += "<white>" + char + "</white>";
}

function console_print_char_green(char){
    buffer += "<green>" + char + "</green>";
}

function console_print_char_blue(char){
    buffer += "<blue>" + char + "</blue>";
}

function console_print_char_focus(char){
    buffer += "<black_on_white>" + char + "</black_on_white>";
}

function console_print_newline(){
    buffer += "<div></div>";
}

function console_clear_screen(){
    buffer = "";
}

function console_send_message(msg){
    console_print_newline();
    console_print_char_white(msg);
}

function console_send_message_focus(msg){
    console_print_newline();
    console_print_char_focus(msg);
}
