var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//player
var player;
var speed = 250;

//physics
var gravity = 500;

//maps
var map;
var layer;

//input
var cursors;
var jump;
var shift;

function preload(){

    //loads all of the game assets
	this.load.image('set', 'set.png');
	this.load.image('player', 'sprites/Player.png');
	this.load.tilemap('map_basic', 'maps/Map_Basic.json', null, Phaser.Tilemap.TILED_JSON);
}
 
function create(){

    //starts the phaser ARCADE physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

    //sets the background color to the hex color #380000
	game.stage.backgroundColor = '#380000';

    //loads the tilemap, and sets the collision
    map = this.add.tilemap('map_basic');
    map.addTilesetImage('set');
    map.setCollisionBetween(0, 100);

    //adds the map layer
    layer = map.createLayer('Walls');
    layer.resizeWorld();

    //uncomment to show the collision boundries
    //layer.debug = true;

    //creates the player
    player = this.add.sprite(200, 200, 'player');
    game.physics.arcade.enable(player); 
	player.body.gravity.y = 500;

    //initializes the cursor keys(arrows) and the space bar
    cursors = game.input.keyboard.createCursorKeys();
    jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  	shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
}
 
function update(game){
    //player and map collisions
	game.physics.arcade.collide(player, layer);

    //player velocity is reset to 0 every frame, so that it will not go
    //infinitly in one direction.
    player.body.velocity.x = 0;

    //gets player input, and holds the player controls
    getPlayerInput(player);
}

function getPlayerInput(player){
    if (cursors.left.isDown){
        player.body.velocity.x = -speed;
    }else if (cursors.right.isDown){
        player.body.velocity.x = speed;
    }else if(cursors.up.isDown){
    	player.body.gravity.y = -gravity;
    }else if(cursors.down.isDown){
    	player.body.gravity.y = gravity;
    }
  
  	if(shift.isDown){
  		speed = 1000;
    }else{
    	speed = 500;
    }
  
    if (jump.isDown && player.body.onFloor()){
        player.body.velocity.y = -150;
    }
}
