 //Enemy Prefab
 Enemy.prototype = Object.create(Phaser.Sprite.prototype);
 Enemy.prototype.constructor = Enemy;

 var eIsLeft;
 var enemyAtkRange = 140;
 var eSpeed = 100;

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
        this.body.setSize(140, 256, 51, 0);
        this.animations.add('eRight', [0, 1, 2, 3, 4, 5], 8, true);
        this.animations.add('eAttack', [6, 7, 8, 9], 13, true);
    }
    else if (key == 'FA')
    {
        this.body.setSize(90, 256, 103, 0);
        this.animations.add('eRight', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
        this.animations.add('eAttack', [8, 9, 10], 8, true);
    }
 }

Enemy.prototype.update = function()
{
    game.physics.arcade.overlap(this, scalpel, eStab, null, this);

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
         this.animations.play('eRight');
         this.scale.x = -1;

         // move towards the player
         game.physics.arcade.moveToObject(this, player, eSpeed);
      }
      else if (this.x - player.x > 0 && (player.x - player.x < enemyAtkRange)) // if within attack range
      {
         this.body.setSize(256, 256, 0, 0);
         this.animations.play('eAttack');
         this.body.velocity.x = 0;
         this.body.velocity.y = 0;
         game.physics.arcade.overlap(this, player, eAttack, null, this);
      }
   }
   else if (!eIsLeft)// if eIsRight (ie eIsLeft = false)
   {

      if(player.x - this.x > enemyAtkRange) // if outside attack range
      {
         // right walking animation
         this.animations.play('eRight');
         this.scale.x = 1;

         // move towards the player
         game.physics.arcade.moveToObject(this, player, eSpeed);
      }
      else if (player.x - this.x > 0 && (player.x - this.x < enemyAtkRange))// if within attack range
      {
         this.body.setSize(256, 256, 0, 0);
         this.animations.play('eAttack');
         this.body.velocity.x = 0;
         this.body.velocity.y = 0;
         game.physics.arcade.overlap(this, player, eAttack, null, this);
      }
   }
};

// Combat resolution
function eAttack ()
{
    this.tint = 0xFFFFFF;
    player.tint = 0xFFFFFF;

    if (isAttacking)
    {
        if ((isRight && (player.x < this.x)) || (isLeft && (this.x < player.x)))
        {
            this.enemyHealth -= 10;
            this.tint = 0x770000;
        }

        if(this.enemyHealth < 0)
        {
            this.kill();
            aliveEnemies -= 1;
        }
    }
    else
    {
        playerHealth -= 10;
        player.tint = 0x770000;
    }

    if (playerHealth < 0)
    {
        game.state.start('Lose');
    }
};

function eStab()
{
    player.tint = 0xFFFFFF;
    this.enemyHealth -= 100;
    this.tint = 0x770000;

    if (this.enemyHealth < 0)
    {
        this.kill();
        aliveEnemies -= 1;
    }
};
