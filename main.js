var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var cursors;
var scoreText;
var score = 0;
var player;
var playerY;

function preload(){
	game.stage.backgroundColor = '#cbcbff';
	game.load.image('penguin', 'AeroPenguin.png');
}

function create(){
	scoreText = "SCORE: ";
	playerY = game.world.height / 2 - 40;

	player = game.add.sprite(0, playerY, 'penguin');
	game.add.text(10, 10, scoreText + score, { font: '24px Arial', fill: '#fff' });

	cursors = game.input.keyboard.createCursorKeys();
}

function update(){
	if (cursors.up.isDown){
		player.body.velocity.y = -200;
	}else if (cursors.down.isDown){
		player.body.velocity.y = 200;
	}
}
