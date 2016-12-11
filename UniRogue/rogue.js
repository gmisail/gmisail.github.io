var WIDTH = 50;
var HEIGHT = 50;

var command_prompt = document.getElementById("chatForm");
var command_prompt_input = document.getElementById("chatInput");

var EMPTY = 0;
var WALL = 1;
var PLAYER = 2;
var GOBLIN = 3;
var COIN = 4;
var DOOR = 5;
var CHEST = 6;
var SWORD = 7;

map = generate();

var weapons = [];

var player = {
    x: 2,
    y: 2,
    power: 1,
    money: 0,
    down: function(){
        if(map[player.y + 1][player.x] == 0){
            player.y += 1;
            refresh();
        }
    },
    up: function(){
        if(map[player.y - 1][player.x] == 0){
            player.y -= 1;
            refresh();
        }
    },
    left: function(){
        if(map[player.y][player.x + 1] == 0){
            player.x += 1;
            refresh();
        }
    },
    right: function(){
        if(map[player.y][player.x - 1] == 0){
            player.x -= 1;
            refresh();
        }
    }
};

var money = {
    give: function(val){
        player.money += val;
    }
}

var notification = {
    value: "",
    clear: function(){
        notification.value = "";
    },
    set: function(val){
        notification.value = val;
    }
}

function render() {
    console_send_message_focus("Power ~> " + player.power + " - Coins ~> " + player.money);
    for (var y = 0; y < map.length; y++) {

        console_print_newline();

        for (var x = 0; x < map[y].length; x++) {
            map[player.y][player.x] = 2;

            if(x <= (player.x + 5) && x >= (player.x - 5) && y <= (player.y + 5) && y >= (player.y - 5)){
                if (map[y][x] == WALL) {
                    console_print_char_white("X");
                } else if (map[y][x] == PLAYER) {
                    console_print_char_blue("@");
                } else if (map[y][x] == GOBLIN) {
                    console_print_char_green("*");
                } else if (map[y][x] == COIN) {
                    console_print_char_green("$");
                } else if (map[y][x] == DOOR) {
                    console_print_char_green("/");
                } else if (map[y][x] == CHEST) {
                    console_print_char_green("C");
                } else if (map[y][x] == SWORD) {
                    console_print_char_blue("S");
                } else {
                    console_print_space();
                }
            }
        }
    }

}

function clear(){
    console_clear_screen();
}

function refresh(){
    clear();
    notif = "";
    console();
    render();
    console_send_message_focus(notification.value);
    console_render();
}

refresh();

function console(){
    command_prompt.onsubmit = function(e){
        var message = command_prompt_input.value;
        var args = message.split(" ");
        e.preventDefault();

        switch(args[0]){
            case "open":
                if(map[player.y - 1][player.x] == DOOR){
                        map[player.y - 1][player.x] = 0;
                        notification.clear();
                        notification.set("The door creaks open...");
                }

                if(map[player.y + 1][player.x] == DOOR){
                        map[player.y + 1][player.x] = 0;
                        notification.clear();
                        notification.set("The door creaks open...");
                }

                if(map[player.y][player.x + 1] == DOOR){
                        map[player.y][player.x + 1] = 0;
                        notification.clear();
                        notification.set("The door creaks open...");
                }

                if(map[player.y][player.x - 1] == DOOR){
                        map[player.y][player.x - 1] = 0;
                        notification.clear();
                        notification.set("The door creaks open...");
                }

                /* check for chest */
                if(map[player.y - 1][player.x] == CHEST){
                    map[player.y - 1][player.x] = 0;
                    money.give(4);
                    notification.clear();
                    notification.set("You received 4 coins from the chest.");
                }

                if(map[player.y + 1][player.x] == CHEST){
                    map[player.y + 1][player.x] = 0;
                    money.give(4);
                    notification.clear();
                    notification.set("You received 4 coins from the chest.");

                }
                if(map[player.y][player.x + 1] == CHEST){
                    map[player.y][player.x + 1] = 0;
                    money.give(4);
                    notification.clear();
                    notification.set("You received 4 coins from the chest.");

                }
                if(map[player.y][player.x - 1] == CHEST){
                    map[player.y][player.x - 1] = 0;
                    money.give(4);
                    notification.clear();
                    notification.set("You received 4 coins from the chest.");
                }

                refresh();
            case "collect":
                /* check for coins */
                if(map[player.y - 1][player.x] == COIN){
                    map[player.y - 1][player.x] = 0;
                    money.give(1);
                    notification.clear();
                    notification.set("You found one coin.");
                }

                if(map[player.y + 1][player.x] == COIN){
                    map[player.y + 1][player.x] = 0;
                    money.give(1);
                    notification.clear();
                    notification.set("You found one coin.");
                }

                if(map[player.y][player.x + 1] == COIN){
                    map[player.y][player.x + 1] = 0;
                    money.give(1);
                    notification.clear();
                    notification.set("You found one coin.");
                }

                if(map[player.y][player.x - 1] == COIN){
                    map[player.y][player.x - 1] = 0;
                    money.give(1);
                    notification.clear();
                    notification.set("You found one coin.");
                    //player.money += 1;
                }

                if(map[player.y - 1][player.x] == SWORD){
                    map[player.y - 1][player.x] = 0;
                    weapons.push("sword");
                    notification.clear();
                    notification.set("You found a sword.");
                }

                if(map[player.y + 1][player.x] == SWORD){
                    map[player.y + 1][player.x] = 0;
                    weapons.push("sword");
                    notification.clear();
                    notification.set("You found a sword.");
                }

                if(map[player.y][player.x + 1] == SWORD){
                    map[player.y][player.x + 1] = 0;
                    weapons.push("sword");
                    notification.clear();
                    notification.set("You found a sword.");
                }

                if(map[player.y][player.x - 1] == SWORD){
                    map[player.y][player.x - 1] = 0;
                    weapons.push("sword");
                    notification.clear();
                    notification.set("You found a sword.");
                    //player.money += 1;
                }


                refresh();

            case "equip":
                for(var i = 0; i < weapons.length; i++){
                    if(args[1] == weapons[i]){
                        notification.clear();
                        notification.set("Equipping " + args[1]);
                    }
                }

                refresh();
        }

        command_prompt_input.value = "";
    }
}


document.onkeydown = function(e){
    map[player.y][player.x] = 0;

    if(e.keyCode == DOWN){
        player.down();
    }

    if(e.keyCode == UP){
        player.up();
    }

    if(e.keyCode == LEFT){
        player.right();
    }

    if(e.keyCode == RIGHT){
        player.left();
    }
}
