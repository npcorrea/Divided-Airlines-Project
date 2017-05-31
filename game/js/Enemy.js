 //Enemy Prefab
 Enemy.prototype = Object.create(Phaser.Sprite.prototype);
 Enemy.prototype.constructor = Enemy;

 var eIsLeft;
 var enemyAtkRange = 140;
 var speed = 100;
 var defBound;

 function Enemy(game, key, x, y, frame)
 {
    // call to Phaser.Sprite
    Phaser.Sprite.call(this, game, x, y, key, frame);

    // add properties
    this.anchor.set(.5);
    game.physics.enable(this);
    this.enemyHealth = 500;

    if (key == 'SG')
    {
        defBound = this.body.setSize(140, 256, 51, 0);
        this.animations.add('eRight', [0, 1, 2, 3, 4, 5], 8, true);
        this.animations.add('eAttack', [6, 7, 8, 9], 13, true);
    }
    else if (key == 'FA')
    {
        defBound = this.body.setSize(90, 256, 103, 0);
        this.animations.add('eRight', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
        this.animations.add('eAttack', [8, 9, 10], 8, true);
    }
 }

Enemy.prototype.update = function()
{

    game.physics.arcade.overlap(this, scalpel, stab, null, this);

    // check for left or right
    if (this.x - player.x < 0)
    {
        eIsLeft = false;
    }
    else if (player.x - this.x < 0)
    {
        eIsLeft = true;
    }

   // basic AI for enemy movement
   if(eIsLeft)
   {
      if(this.x - player.x > enemyAtkRange) // if outside attack range
      {
         // left walking animation
         defBound;
         this.animations.play('eRight');
         this.scale.x = -1;

         // move towards the player
         game.physics.arcade.moveToObject(this, player, speed);
      }
      else if (this.x - player.x > 0 && (player.x - player.x < enemyAtkRange)) // if within attack range
      {
         this.body.setSize(256, 256, 0, 0);
         this.animations.play('eAttack');
         this.body.velocity.x = 0;
         this.body.velocity.y = 0;
         game.physics.arcade.overlap(this, player, attack, null, this);
      }
   }
   else if (!eIsLeft)// if eIsRight (ie eIsLeft = false)
   {

      if(player.x - this.x > enemyAtkRange) // if outside attack range
      {
         // right walking animation
         defBound;
         this.animations.play('eRight');
         this.scale.x = 1;

         // move towards the player
         game.physics.arcade.moveToObject(this, player, speed);
      }
      else if (player.x - this.x > 0 && (player.x - this.x < enemyAtkRange))// if within attack range
      {
         this.body.setSize(256, 256, 0, 0);
         this.animations.play('eAttack');
         this.body.velocity.x = 0;
         this.body.velocity.y = 0;
         game.physics.arcade.overlap(this, player, attack, null, this);
      }
   }
};

// Combat resolution
function attack ()
{
    if (isAttacking)
    {
        if ((isRight && (player.x < this.x)) || (isLeft && (this.x < player.x)))
        {
            this.enemyHealth -= 10;
        }

        if(this.enemyHealth == 0)
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

function stab()
{
    console.log(this.enemyHealth);
    this.enemyHealth -= 100;
    scalpel.kill();

    if (this.enemyHealth == 0)
    {
        this.kill();
        aliveEnemies -= 1;
    }
};
