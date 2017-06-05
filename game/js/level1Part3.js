//Game: Core game loop
var Level1Part3 = function(game) {};
Level1Part3.prototype =
{
    create: function()
    {
        //Set some boundries
        game.world.setBounds(0,0,800,600);

        //Create Objects and their Physics
        game.background = game.add.image(0,0,'background3');

        //Create a custom timer
        levelTimer = game.time.create();

        //Create a delayed event 30s from now
        //Change later. 30s for testing
        levelTimerEvent = levelTimer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND *30, this.endLevelTimer, this);

        //Start the timer
        levelTimer.start();

        //Create door that triggers level transition
        door = game.add.sprite(200, game.world.height - 280, 'door');
        game.physics.arcade.enable(door);
        door.body.immovable = true;

        //Make Player
        player = game.add.sprite(600, game.world.height - 228, 'doctor');
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        player.scale.x = -1;
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        //Player Animation
        player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 13, true);
        let hammer = player.animations.add('hammer', [10, 11, 12], 8, false);
        hammer.onComplete.add(done2, this);
        let tossing = player.animations.add('toss', [13, 14, 15], 13, false);
        tossing.onComplete.add(done, this);

        //Player properties
        game.physics.arcade.enable(player); //Physics for Player
        player.body.setSize(120, 230, 70, 15);
        player.body.collideWorldBounds = true;

        //Input manager
        cursors = game.input.keyboard.createCursorKeys();

        //Attack Keys
        sAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        lAttack = game.input.keyboard.addKey(Phaser.Keyboard.E);
        healing = game.input.keyboard.addKey(Phaser.Keyboard.R);

        w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        d = game.input.keyboard.addKey(Phaser.Keyboard.D);
    },
    update: function()
    {
        //Collision and overlap detection
        game.physics.arcade.overlap(player, door, transport3, null, this);

        //Movement Controls
        //Defaults
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp
             && wKey.isUp && aKey.isUp && sKey.isUp && dKey.isUp)
        {
            if (!isAttacking && !isThrowing)
            {
                player.frame = 16;
            }
        }

        //Left
        if ((cursors.left.isDown || aKey.isDown) && !isAttacking && !isThrowing)
        {
            player.body.velocity.x = -150;
            player.animations.play('right');
            player.scale.x = -1;
            isLeft = true;
            isRight = false;
        }

        //Right
        if ((cursors.right.isDown || dKey.isDown) && !isAttacking && !isThrowing)
        {
            player.body.velocity.x = 150;
            player.animations.play('right');
            player.scale.x = 1;
            isRight = true;
            isLeft = false;
        }

        //Up
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

        //Down
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
        if (player.body.y < 185)
        {
            player.body.y = 185;
        }

        //Door Constraints
        if (player.body.x > 500)
        {
            player.body.x = 500;
        }

        //Activate close-range attack
        if (sAttack.justPressed(sAttack))
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
            if (pills > 0)
            {
                playerHealth += 3000;
                pills -= 1;
            }
        }
    },

    //This is for printing out time
    render: function() {

    //Prints out the timer
    if (levelTimer.running) {
            game.debug.text("Time left: "+this.formatLevelTime(Math.round((levelTimerEvent.delay - levelTimer.ms) / 1000)), 32, 32, "#ffffff");
        }
    //If the timer reaches 0, print this out
        else {
            //goToLoseState();
            //game.state.start('Lose');
            //game.debug.text("Time's up!", 32,32, '#ff0000');
        }
    },
    endLevelTimer: function() {
        //This stops the timer when the delayed event triggers
        levelTimer.stop();
        //game.debug.text("Time's up!", 32,32, '#ff0000');
        goToLoseState();
    },
    formatLevelTime: function(s) {
        //This converts the seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }
};
