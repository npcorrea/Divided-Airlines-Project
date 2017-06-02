//Boss Prefab
Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

var speed;
var defBound;
var bossAtkRange;

function Boss(game,key, x, y, frame) {
      // call to Phaser.Sprite // new Sprite(this, game, x, y, key, frame)
      Phaser.Sprite.call(this, game, x, y, key, frame);
      
      //Enabling physics properties and health
      game.physics.arcade.enable(this);
      this.anchor.set(.5);
      
}

Boss.prototype.update = function(){
   //Checking for collision between the player and the boss.
   game.physics.arcade.overlap(player, this, attack, null, this);
   
   if (player.x - this.x > bossAtkRange){
   game.physics.arcade.moveToObject(this, player, speed);
   }
   
};

// The attack functions
function attack ()
{
    if (isAttacking) {
        //Checking if the player is facing away or towards the boss.
        if ((isRight && (player.x < this.x)) || (isLeft && (this.x < player.x)))
        {
            this.bossHealth -= 10;
        }

        if(this.bossHealth == 0)
        {
            this.kill();
            aliveEnemies -= 1;
        }
    }
    else
    {
        playerHealth -= 10;
    }

    if (playerHealth == 0)
    {
        game.state.start('Lose');
    }
};

//If the player hits the boss with a scalpal.
function stab() {
    //Lowers the boss health if it hits.
    console.log(this.bossHealth);
    this.bossHealth -= 100;
    scalpel.kill();

    //If the boss health goes to zero, it dies.
    if (this.bossHealth == 0)
    {
        this.kill();
        aliveEnemies -= 1;
    }
};