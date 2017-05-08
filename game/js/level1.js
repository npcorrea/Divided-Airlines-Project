//Game: Core game loop
var Level1 = function(game) {};
Level1.prototype =
{
    create: function()
    {
        //Set some boundries
        game.world.setBounds(0,0,2400,600);

        //Create Objects and their Physics
        game.background = game.add.image(0,0,'background');

        door = game.add.sprite(game.world.width - 65, game.world.height - 100, 'door');
        game.physics.arcade.enable(door);
        door.body.immovable = true;

        //Make Player
        player = game.add.sprite(64, game.world.height - 300, 'dude');
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        //Player Animation
        player.animations.add('left', [0, 3], 10, true);
        player.animations.add('right', [5, 8], 10, true);

        //Player properties
        game.physics.arcade.enable(player); //Physics for Player
        player.body.gravity.y = 100;
        player.body.collideWorldBounds = true;

        //Input Manager
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function()
    {
        game.physics.arcade.overlap(player, door, transport, null, this);

        //Accend and Descend Controls
        player.body.velocity.x = 0; //Default

        if (cursors.left.isDown) //Left
        {
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown) //Right
        {
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else //Stop
        {
            player.animations.stop();
            player.frame = 4;
        }
    }
};
