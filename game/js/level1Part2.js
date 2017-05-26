//Game: Core game loop
var Level1Part2 = function(game) {};
Level1Part2.prototype =
{
    create: function()
    {
        //Set some boundries
        game.world.setBounds(0,0,2400,600);

        //Create Objects and their Physics
        game.background = game.add.image(0,0,'background2');

        //Create door that triggers level transition
        door = game.add.sprite(0, game.world.height - 280, 'door');
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
        game.physics.arcade.overlap(player, door, transport2, null, this);

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

        //Screen Lock 2 trigger
        if ((player.body.x < 400 && player.body.x > 385) && lock2Pending)
        {
            lock2 = true;
        }

        //Screen Lock 2
        if (lock2)
        {
            //Camera lock
            game.camera.deadzone = new Phaser.Rectangle(0, 0, 800, 600);

            //Lock bounds
            if (player.body.x > 770)
            {
                player.body.x = 770
            }

            //Create enemies (leftXMin, leftXMax, rightXMin, rightXMax)
            if (lock2Pending)
            {
                spawnEnemies(-800, 0, 800, 1600);
                lock2Pending = false;
            }

            game.physics.arcade.collide(spawnGroup, spawnGroup);

            //Release lock
            if (aliveEnemies == 0 && !lock2Spawn)
            {
                lock2 = false;
            }
        }

        //Screen Lock 3 trigger
        if ((player.body.x < 1200 && player.body.x > 1185) && lock3Pending)
        {
            lock3 = true;
        }

        //Screen Lock 3
        if (lock3)
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
            if (lock3Pending)
            {
                spawnEnemies(0, 800, 1600, 2400);
                lock3Pending = false;
            }

            game.physics.arcade.collide(spawnGroup, spawnGroup);

            //Release lock
            if (aliveEnemies == 0 && !lock3Spawn)
            {
                lock3 = false;
            }
        }

        //Screen Lock 4 trigger
        if ((player.body.x < 2000 && player.body.x > 1985) && lock4Pending)
        {
            lock4 = true;
        }

        //Screen Lock 4
        if (lock4)
        {
            //Camera lock
            game.camera.deadzone = new Phaser.Rectangle(0, 0, 800, 600);

            //Lock bounds
            if (player.body.x < 1600)
            {
                player.body.x = 1600;
            }

            if (player.body.x > 2370)
            {
                player.body.x = 2370;
            }

            //Create enemies (leftXMin, leftXMax, rightXMin, rightXMax)
            if (lock4Pending)
            {
                spawnEnemies(800, 1600, 2400, 3200);
                lock4Pending = false;
            }

            game.physics.arcade.collide(spawnGroup, spawnGroup);

            //Release lock
            if (aliveEnemies == 0 && !lock4Spawn)
            {
                lock4 = false;
                key = true;
            }
        }

        //Screen Lock Boss trigger
        if ((player.body.x < 350) && lockBossPending && key)
        {
            lockBoss = true;
        }

        //Screen Lock Boss
        if (lockBoss)
        {
            //Camera lock
            game.camera.deadzone = new Phaser.Rectangle(0, 0, 800, 600);

            //Lock bounds
            if (player.body.x > 770)
            {
                player.body.x = 770
            }

            //Create Boss
            if (lockBossPending)
            {
                spawnBoss();
                lockBossPending = false;
            }

            game.physics.arcade.collide(spawnGroup, spawnGroup);

            //Release lock
            if (aliveEnemies == 0 && !lockBossSpawn)
            {
                lockBoss = false;
            }
        }

        if (!lock2 && !lock3 && !lock4 && !lockBoss)
        {
            //Release camera
            game.camera.deadzone = new Phaser.Rectangle(395, 400, 5, 200);
        }


    }
};
