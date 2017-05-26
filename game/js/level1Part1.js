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
        player = game.add.sprite(16, game.world.height - 24, 'dude');
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        //Player Animation
        player.animations.add('left', [0, 3], 10, true);
        player.animations.add('right', [5, 8], 10, true);

        //Player properties
        game.physics.arcade.enable(player); //Physics for Player
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
            player.animations.play('left');
            isLeft = true;
            isRight = false;
        }

        //Right
        if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
            player.animations.play('right');
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
            }
            else
            {
                player.animations.play('left');
            }
        }

        //Down
        if (cursors.down.isDown)
        {
            player.body.velocity.y = 150;

            if (isRight)
            {
                player.animations.play('right');
            }
            else
            {
                player.animations.play('left');
            }
        }

        //Floor Constraints
        if (player.body.y < 360)
        {
            player.body.y = 360;
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
        if ((player.body.x < 1200 && player.body.x > 1185) && lock1Pending)
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

            if (player.body.x > 1570)
            {
                player.body.x = 1570;
            }

            //Create enemies (leftXMin, leftXMax, rightXMin, rightXMax)
            if (lock1Pending)
            {
                spawnEnemies(0, 800, 1600, 2400);
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
