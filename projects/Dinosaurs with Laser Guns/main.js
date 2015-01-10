var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//player
var player;

//maps
var map;
var layer;

//input
var cursors;
var jump;

function preload(){
	this.load.image('set', 'set.png');
	this.load.image('player', 'sprites/Player.png');
	this.load.tilemap('map_basic', 'maps/Map_Basic.json', null, Phaser.Tilemap.TILED_JSON);
}
 
function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = '#380000';
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    map = this.add.tilemap('map_basic');
    map.addTilesetImage('set');
    map.setCollisionBetween(0, 100);

    layer = map.createLayer('Walls');
    layer.resizeWorld();

    //uncomment for debug mode
    //layer.debug = true;

    player = this.add.sprite(200, 200, 'player');
    game.physics.arcade.enable(player); 
	player.body.gravity.y = 500;

    cursors = game.input.keyboard.createCursorKeys();
    jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);  
}
 
function update(game){
	game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    getPlayerInput(player);
}

function getPlayerInput(player){
    if (cursors.left.isDown){
        player.body.velocity.x = -150;
    }else if (cursors.right.isDown){
        player.body.velocity.x = 150;
    }

    if (jump.isDown && player.body.onFloor()){
        player.body.velocity.y = -250;
    }
}
