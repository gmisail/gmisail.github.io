var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var speed = 200;
var scoreText = "Score: ";
var score = 0;
var player;

function preload(){
	game.stage.backgroundColor = '#cbcbff';
  game.load.image('penguin', 'AeroPenguin.png');
    
  this.cursors = game.input.keyboard.createCursorKeys();
}

function create(){
	player = game.add.sprite(0, game.width / 2 - 8, 'penguin');
  game.physics.enable(player, Phaser.Physics.ARCADE);

  game.add.text(10, 10, scoreText + score, { font: '24px Arial', fill: '#fff' });
}

function update(){
    player.body.velocity.y = 0;
    player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      player.body.velocity.y -= speed;
    }
    else if(this.cursors.down.isDown) {
      player.body.velocity.y += speed;
    }

    if(player.y == game.world.height){
      player.y = 0;
    }
}




