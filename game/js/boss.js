//Boss Prefab
Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

var bSpeed = 100;
var walkBound;
var stingBound;
var beamBound;
var bossAtkRange = 30;

function Boss(game,key, x, y, frame) {
      // call to Phaser.Sprite // new Sprite(this, game, x, y, key, frame)
      Phaser.Sprite.call(this, game, x, y, key, frame);

      //Enabling physics properties and health
      game.physics.arcade.enable(this);
      this.anchor.set(.5);
      this.bossHealth = 5000;

      //Bounding boxes for each animation
      //walkBound = this.body.setSize(400, 400, ??, ??);
      //stingBound = this.body.setSize(??, ??, ??, ??);
      //BeamBound = this.body.setSize(??, ??, ??, ??);

      //Animations
      //this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true); //Walk
      //this.animations.add('sting', [9, 10, 11, 12, 13, 14, 15], 8, true); //Sting
      //this.animations.add('beam', [16, 17, 18, 19, 29, 30, 31, 32, 33]); //Beam
}

Boss.prototype.update = function(){

   game.physics.arcade.overlap(this, scalpel, bStab, null, this);

   if(player.y - this.y > bossAtkRange || player.y - this.y < -(bossAtkRange)) // if outside attack range
   {
      //Set walking bounding box
      // play walking animation
      //this.animations.play('walk');

      // move towards the player
      game.physics.arcade.moveToXY(this, 300, player.y, bSpeed);
   }
   else
   {
      //Choose an attack (sting or beam)
      //Set correct bounding box
      //Stop moving
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      //Play correct animation
      //Check for collision
      game.physics.arcade.overlap(this, player, bAttack, null, this);

      //Wait for completion of animation
   }
};

// The attack functions
function bAttack ()
{
    this.tint = 0xFFFFFF;

    if (isAttacking) {
        //Checking if the player is facing away or towards the boss.
        if ((isLeft && (this.x < player.x)))
        {
            this.bossHealth -= 10;
            console.log(this.bossHealth);
            this.tint = 0x770000;
        }

        if(this.bossHealth == 0)
        {
            this.kill();
            aliveEnemies -= 1;
        }
    }
    else
    {
        playerHealth -= 100;
    }

    if (playerHealth == 0)
    {
        game.state.start('Lose');
    }
};

//If the player hits the boss with a scalpal.
function bStab() {
    //Lowers the boss health if it hits.
    this.tint = 0x770000;
    this.bossHealth -= 100;
    console.log(this.bossHealth);
    scalpel.kill();

    //If the boss health goes to zero, it dies.
    if (this.bossHealth == 0)
    {
        this.kill();
        aliveEnemies -= 1;
    }
};
