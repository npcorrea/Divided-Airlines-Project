//Game: Core game loop
var Level1Part1 = function(game) {};
Level1Part1.prototype =
{
    create: function()
    {
        //Make it rock in here
        game.music = game.add.audio('music');
        //game.music.play('', 1, 1, true);
        game.music.volume = 0.2;

        //Set some boundries
        game.world.setBounds(0,0,1600,600);

        //Create Objects and their Physics
        game.background = game.add.image(0,0,'background1');

        //Create door that triggers level transition
        door = game.add.sprite(game.world.width - 165, game.world.height - 280, 'door');
        game.physics.arcade.enable(door);
        door.body.immovable = true;

        //Make Player
        player = game.add.sprite(128, game.world.height - 128, 'doctor');
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        //Player Animation
        player.animations.add('right', null, 13, true);

        //Player properties
        game.physics.arcade.enable(player); //Physics for Player
        player.body.setSize(125, 230, 63, 10);
        player.body.collideWorldBounds = true;

        //Input manager
        cursors = game.input.keyboard.createCursorKeys();

        //Attack Keys
        sAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        lAttack = game.input.keyboard.addKey(Phaser.Keyboard.X);
    },
    update: function()
    {
        //Collision and overlap detection
        game.physics.arcade.overlap(player, door, transport1, null, this);

        //Movement Controls
        //Defaults
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp)
        {
            player.animations.stop();
        }

        //Left
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;
            player.animations.play('right');
            player.scale.x = -1;
            isLeft = true;
            isRight = false;
        }

        //Right
        if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
            player.animations.play('right');
            player.scale.x = 1;
            isRight = true;
            isLeft = false;
        }

        //Up
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -150;

            if (isRight)
            {
                player.animations.play('right');
                player.scale.x = 1;
            }
            else
            {
                player.animations.play('right');
                player.scale.x = -1;
            }
        }

        //Down
        if (cursors.down.isDown)
        {
            player.body.velocity.y = 150;

            if (isRight)
            {
                player.animations.play('right');
                player.scale.x = 1;
            }
            else
            {
                player.animations.play('right');
                player.scale.x = -1;
            }
        }

        //Floor Constraints
        if (player.body.y < 185)
        {
            player.body.y = 185;
        }

        //Activate close-range attack
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

        //Activate long-range attack
        if (lAttack.justPressed(lAttack))
        {
            //Summon Weapon
        }

        //Screen Lock 1 trigger
        if ((player.body.x < 1200 && player.body.x > 1136) && lock1Pending)
        {
            lock1 = true;
        }

        //Screen Lock 1
        if (lock1)
        {
            //Camera lock
            game.camera.deadzone = new Phaser.Rectangle(0, 0, 800, 600);

            //Lock bounds
            if (player.body.x < 800)
            {
                player.body.x = 800;
            }

            //Create enemies (sprite, leftXMin, leftXMax, rightXMin, rightXMax, leftYMin, leftYMax)
            if (lock1Pending)
            {
                spawnEnemies('SG', 0, 800, 1600, 2400, 400, 600);
                lock1Pending = false;
            }

            game.physics.arcade.collide(spawnGroup, spawnGroup);

            //Release lock
            if (aliveEnemies == 0 && !lock1Spawn)
            {
                lock1 = false;
            }
        }
        else if (!lock1)
        {
            //Release camera
            game.camera.deadzone = new Phaser.Rectangle(395, 400, 5, 200);
        }
    }
};
