//Boss Prefab
Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

var bSpeed = 100;
var bossDefBound;
var bossAtkRange = 5;
var choice;

function Boss(game,key, x, y, frame) {
      // call to Phaser.Sprite // new Sprite(this, game, x, y, key, frame)
      Phaser.Sprite.call(this, game, x, y, key, frame);

      //Enabling physics properties and health
      game.physics.arcade.enable(this);
      this.anchor.x = 0;
      this.anchor.y = .75;
      this.bossHealth = 5000;

      //Bounding box
      bossDefBound = this.body.setSize(800, 235, 32, 222);

      //Animations //Frame 33 is idle
      this.animations.add('walk', [25, 26, 27, 28, 29, 30, 31, 32, 33], 8, true);
      let beam = this.animations.add('beam', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 8, false);
      beam.onComplete.add(bossTimer, this);
      let sting = this.animations.add('sting', [18, 19, 20, 21, 22, 23, 24], 8, false);
      sting.onComplete.add(bossTimer, this);
}

Boss.prototype.update = function(){

   game.physics.arcade.overlap(this, scalpel, bStab, null, this);

   if((player.y - this.y > bossAtkRange || player.y - this.y < -(bossAtkRange) || this.x < 200) && !bossAttacking) // if outside attack range
   {
      // play walking animation
      this.animations.play('walk');

      // move towards the player
      game.physics.arcade.moveToXY(this, 200, player.y, bSpeed);
   }
   else
   {
       //Stop moving
       this.body.velocity.x = 0;
       this.body.velocity.y = 0;

      //Choose an attack (sting or beam)
      choice = game.rnd.integerInRange(0,100);

      //Play correct animation
      if (choice < 75 && !bossAttacking)
      {
          bossAttacking = true;
          this.animations.play('sting');
      }
      else if(choice >= 75 && !bossAttacking)
      {
          bossAttacking = true;
          this.animations.play('beam');
      }

      //Check for collision
      game.physics.arcade.collide(this, player, bAttack, null, this);
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
    this.tint = 0xFFFFFF;
    player.tint = 0xFFFFFF;

    if (isAttacking && player.x < 680) {
        //Checking if the player is facing away or towards the boss.
        if (isLeft && (this.x < player.x))
        {
            this.bossHealth -= 10;
            this.tint = 0x770000;
        }

        if(this.bossHealth < 0)
        {
            this.kill();
            aliveEnemies -= 1;
        }
    }

    if(bossAttacking)
    {
        if (choice > 75 && (player.y - this.y < bossAtkRange || player.y - this.y > -(bossAtkRange)))
        {
            playerHealth -= 100;
        }
        else if (choice < 75 && player.x < 780 && (player.y - this.y < bossAtkRange || player.y - this.y > -(bossAtkRange)))
        {
            playerHealth -= 50;
        }

        player.tint = 0x770000;
    }

    if (playerHealth < 0)
    {
        game.state.start('Lose');
    }
};

//If the player hits the boss with a scalpal.
function bStab() {
    //Lowers the boss health if it hits.
    player.tint = 0xFFFFFF;
    this.tint = 0x770000;
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
    bossAttacking = false;
    player.tint = 0xFFFFFF;
};

function bossTimer()
{
    game.physics.arcade.overlap(this, scalpel, bStab, null, this);
    bossTimer = levelTimer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 2, bossDone, this);
    bossTimer.start;
};
