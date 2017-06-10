//Boss Prefab
Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

var bSpeed = 100;
var bossAtkRange = 5;

function Boss(game,key, x, y, frame) {
      // call to Phaser.Sprite // new Sprite(this, game, x, y, key, frame)
      Phaser.Sprite.call(this, game, x, y, key, frame);

      //Enabling physics properties and health
      game.physics.arcade.enable(this);
      this.anchor.x = 0;
      this.anchor.y = .75;
      this.bossHealth = 10000;
      this.choice;
      this.defBound;

      //Bounding box
      this.defBound = this.body.setSize(400, 200, 32, 222);

      //Animations //Frame 33 is idle
      this.animations.add('walk', [25, 26, 27, 28, 29, 30, 31, 32, 33], 8, true);
      let beam = this.animations.add('beam', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 8, false);
      beam.onComplete.add(bossDone, this);
      let sting = this.animations.add('sting', [18, 19, 20, 21, 22, 23, 24], 8, false);
      sting.onComplete.add(bossDone, this);
}

Boss.prototype.update = function(){

   //Check for stabbing
   game.physics.arcade.overlap(this, scalpel, bStab, null, this);

   //Set bounds
   this.defBound;

   if((player.y - this.y > bossAtkRange || player.y - this.y < -(bossAtkRange) || this.x < 200) && !bossAttacking) // if outside attack range
   {
      // play walking animation
      this.animations.play('walk');

      //Also you're not in attack range anymore
      bossAttacking = false;

      // move towards the player
      game.physics.arcade.moveToXY(this, 200, player.y, bSpeed);
   }
   else
   {
       //Stop moving
       this.body.velocity.x = 0;
       this.body.velocity.y = 0;

      //Choose an attack (sting or beam)
      this.choice = game.rnd.integerInRange(0,100);

      //Play correct animation
      if (this.choice < 60 && !bossAttacking)
      {
          bossAttacking = true;
          this.animations.play('sting');
          if (!game.laserSfx.isPlaying && !game.stingSfx.isPlaying)
          {
              game.stingSfx.play('', 0, 0.2, false);
          }
      }
      else if(this.choice >= 60 && !bossAttacking)
      {
          bossAttacking = true;
          this.animations.play('beam');
          if (!game.laserSfx.isPlaying && !game.stingSfx.isPlaying)
          {
              game.laserSfx.play('', 0, 0.2, false);
          }
      }

      //Check for overlaps
      game.physics.arcade.overlap(this, player, bAttack, null, this);
      game.physics.arcade.overlap(this, scalpel, bStab, null, this);
   }

   //Lock player
   if (player.body.x < 600 && aliveEnemies > 0)
   {
       player.body.x = 600;
   }
};

// The attack functions
function bAttack ()
{
    if (isAttacking && player.x < 680) {
        //Checking if the player is facing away or towards the boss.
        if (isLeft && (this.x < player.x))
        {
            this.bossHealth -= 10;
            game.hammerSfx.play('', 0, 0.2, false);
        }

        //Kill boss when dead
        if(this.bossHealth < 0)
        {
            this.kill();
            aliveEnemies -= 1;
        }
    }

    //Kill player if not good
    if (playerHealth < 0)
    {
        game.state.start('Lose');
    }
};

//If the player hits the boss with a scalpal.
function bStab() {
    //Lowers the boss health if it hits.
    this.bossHealth -= 10;

    //If the boss health goes to zero, it dies.
    if (this.bossHealth < 0)
    {
        this.kill();
        aliveEnemies -= 1;
    }
};

function bossDone()
{
    if(bossAttacking)
    {
        if (this.choice >= 75 && player.x >= 800) // if laser
        {
            player.tint = 0x770000;
            playerHealth -= 200;

            //OOF!
            if (!game.painSfx.isPlaying)
            {
                game.painSfx.play('', 0, 0.2, false);
            }
        }
        else if (this.choice < 75 && player.x < 800)
        {
            player.tint = 0x770000;
            playerHealth -= 150;

            //Player Knockback
            game.add.tween(player).to( { x: '+200'}, 500, Phaser.Easing.Linear.None, true);

            //OOF!
            if (!game.painSfx.isPlaying)
            {
                game.painSfx.play('', 0, 0.2, false);
            }
        }
    }

    //Stop playing sfx
    game.laserSfx.stop();
    game.stingSfx.stop();

    //We must know at all times if we can stab things
    game.physics.arcade.overlap(this, scalpel, bStab, null, this);

    //Done with boss attack
    bossAttacking = false;
};
