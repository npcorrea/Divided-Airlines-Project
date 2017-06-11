//Game: Core game loop
var Level1Part1 = function(game) {};
Level1Part1.prototype =
{
    create: function()
    {
        //Music
        game.cutsceneMusic.stop();
        game.winMusic.stop();
        game.loseMusic.stop();

        game.bgMusic.play('', 0, 0.2, true);

        //Set some boundries
        game.world.setBounds(0,0,1600,600);

        //Set background
        game.background = game.add.image(0,0,'background1');

        //Create a custom timer
        levelTimer = game.time.create();

        //Create a delayed event
        levelTimerEvent = levelTimer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND *15, this.endLevelTimer, this);

        //Start the timer
        levelTimer.start();

        //Create door that triggers level transition
        door = game.add.sprite(game.world.width - 235, game.world.height - 445, 'door');
        game.physics.arcade.enable(door);
        door.body.immovable = true;

        //Make Player
        player = game.add.sprite(128, game.world.height - 128, 'doctor');
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        //Player Animation
        player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 13, true);
        let hammer = player.animations.add('hammer', [10, 11, 12], 8, false);
        hammer.onComplete.add(done2, this);
        let tossing = player.animations.add('toss', [13, 14, 15], 13, false);
        tossing.onComplete.add(done, this);

        //Player properties
        game.physics.arcade.enable(player); //Physics for Player
        player.body.setSize(120, 75, 70, 70);
        player.body.collideWorldBounds = true;

        //Input manager
        cursors = game.input.keyboard.createCursorKeys();

        //Attack Keys
        sAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        lAttack = game.input.keyboard.addKey(Phaser.Keyboard.E);
        healing = game.input.keyboard.addKey(Phaser.Keyboard.R);

        //WASD movement key support
        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //Make HUD
        HUD();
    },
    update: function()
    {
        //Update HUD and health display
        updateHUD();
        updateHealth();

        //Collision and overlap detection
        game.physics.arcade.overlap(player, door, transport1, null, this);

        //Movement Controls
        //Defaults
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        //Remove red tint if player isn't attacking
        if (!isAttacking)
        {
            player.tint = 0xFFFFFF; //this prevents boss laser from turning player red, unsure how to fix
        }

        //Set idle frame if player is not moving
        if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp
             && wKey.isUp && aKey.isUp && sKey.isUp && dKey.isUp)
        {
            if (!isAttacking && !isThrowing)
            {
                player.frame = 16;
            }
        }

        //Left movement
        if ((cursors.left.isDown || aKey.isDown) && !isAttacking && !isThrowing)
        {
            player.body.velocity.x = -150;
            player.animations.play('right');
            player.scale.x = -1;
            isLeft = true;
            isRight = false;
        }

        //Right movement
        if ((cursors.right.isDown || dKey.isDown) && !isAttacking && !isThrowing)
        {
            player.body.velocity.x = 150;
            player.animations.play('right');
            player.scale.x = 1;
            isRight = true;
            isLeft = false;
        }

        //Up movement
        if ((cursors.up.isDown || wKey.isDown) && !isAttacking && !isThrowing)
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

        //Down movement
        if ((cursors.down.isDown || sKey.isDown) && !isAttacking && !isThrowing)
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
        if (player.body.y < 195)
        {
            player.body.y = 195;
        }

        //Activate close-range attack
        if (sAttack.justPressed(sAttack) && !isThrowing)
        {
            isAttacking = true;
            player.animations.play('hammer');
        }

        //Activate long-range attack
        if (lAttack.justPressed(lAttack))
        {
            isThrowing = true;
            player.animations.play('toss');
            if (scalpels > 0)
            {
                scalpelThrow();
            }
        }

        //Activate healing
        if (healing.justPressed(healing))
        {
            if (pills > 0 && playerHealth + 1000 < playerMaxHealth)
            {
                playerHealth += 1000;
                pills -= 1;
            }
        }

        //Screen Lock 1 trigger
        if ((player.body.x < 1200 && player.body.x > 1136) && lock1Pending)
        {
            lock1 = true;

            //Begin battle music!
            game.bgMusic.stop();
            game.battleMusic.play('', 0, 0.2, true);
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

            //Create enemies (sprite, leftXMin, leftXMax, rightXMin, rightXMax, leftSpawn)
            if (lock1Pending)
            {
                spawnEnemies('SG', 0, 800, 1600, 2400, true);
                lock1Pending = false;
            }

            //Release lock
            if (aliveEnemies == 0 && !lock1Spawn)
            {
                //Calm time
                game.battleMusic.stop();
                game.bgMusic.play('', 0, 0.2, true);

                lock1 = false;
            }
        }
        else if (!lock1) //Release camera
        {
            game.camera.deadzone = new Phaser.Rectangle(395, 400, 5, 200);
        }
    },
      //This is for printing out time
      render: function() {
      //Prints out the timer
      if (levelTimer.running) {
              game.debug.text("Time left: " + this.formatLevelTime(Math.round((levelTimerEvent.delay - levelTimer.ms) / 1000)), 32, 32, "#000000");
          }
      },
      endLevelTimer: function() {
          //This stops the timer when the delayed event triggers
          levelTimer.stop();
          goToLoseState();
      },
      formatLevelTime: function(s) {
          //This converts the seconds (s) to a formatted and padded time string
          var minutes = "0" + Math.floor(s / 60);
          var seconds = "0" + (s - minutes * 60);
          return minutes.substr(-2) + ":" + seconds.substr(-2);
      }
};
