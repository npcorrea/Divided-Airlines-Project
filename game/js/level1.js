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

        //Create door that triggers level transition
        door = game.add.sprite(game.world.width - 65, game.world.height - 100, 'door');
        game.physics.arcade.enable(door);
        door.body.immovable = true;

        //Make Player
        player = game.add.sprite(16, game.world.height - 24, 'dude');
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

        //Make Enemy
        enemy = game.add.sprite(612, game.world.height - 11, 'star');
        enemy.anchor.x = 0.5;
        enemy.anchor.y = 0.5;

        //Enemy Animation (Do this later)
        //enemy.animations.add('eLeft', [0,1], 10, true);
        //enemy.animations.add('eRight', [2,3], 10, true);

        //Enemy properties
        game.physics.arcade.enable(enemy);
        enemy.body.gravity.y = 100;
        enemy.body.collideWorldBounds = true;

        //Input manager
        cursors = game.input.keyboard.createCursorKeys();
        sAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function()
    {
        //Collision and overlap detection
        game.physics.arcade.overlap(player, enemy, attack, null, this);
        game.physics.arcade.overlap(player, door, transport, null, this);

        //Enemy move toward player
        game.physics.arcade.moveToObject(enemy, player, 100);

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

        //Activate rage mode on button press (attack)
        if (sAttack.isDown)
        {
            player.tint = 0x770000;
            isAttacking = true;
        }
        else
        {
            player.tint = 0xFFFFFF;
            isAttacking = false;
        }
    }
};
