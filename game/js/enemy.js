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
    this.defBound;

    if (key == 'SG')
    {
        this.defBound = this.body.setSize(140, 70, 51, 55);
        this.atkBound = this.body.setSize(205, 110, 51, 0);
        this.animations.add('eRight', [0, 1, 2, 3, 4, 5], 8, true);
        this.animations.add('eAttack', [6, 7, 8, 9], 13, true);
    }
    else if (key == 'FA')
    {
        this.defBound = this.body.setSize(90, 75, 103, 50);
        this.atkBound = this.body.setSize(256, 75, 0, 50);
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
         this.defBound;
         this.animations.play('eRight');
         this.scale.x = -1;

         // move towards the player
         game.physics.arcade.moveToObject(this, player, eSpeed);
      }
      else if (this.x - player.x > 0 && (player.x - player.x < enemyAtkRange)) // if within attack range
      {
         this.atkBound;
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
         this.defBound;
         this.animations.play('eRight');
         this.scale.x = 1;

         // move towards the player
         game.physics.arcade.moveToObject(this, player, eSpeed);
      }
      else if (player.x - this.x > 0 && (player.x - this.x < enemyAtkRange))// if within attack range
      {
         this.atkBound;
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
    if (isAttacking)
    {
        if ((isRight && (player.x < this.x)) || (isLeft && (this.x < player.x)))
        {
            this.enemyHealth -= 150;
            game.hammerSfx.play('', 0, 0.2, false);

            if (player.x < this.x)
            {
                    game.add.tween(this).to( { x: '+300'}, 500, Phaser.Easing.Linear.None, true);
            }
            else
            {
                    game.add.tween(this).to( { x: '-300'}, 500, Phaser.Easing.Linear.None, true);
            }
        }

        if(this.enemyHealth < 0)
        {
            this.kill();
            aliveEnemies -= 1;
        }
    }
    else
    {
        playerHealth -= 50;
        player.tint = 0x770000;

        if (!game.painSfx.isPlaying)
        {
            game.painSfx.play('', 0, 0.2, false);
        }
    }

    if (playerHealth < 0)
    {
        game.state.start('Lose');
    }
};

function eStab()
{
    this.enemyHealth -= 100;

    if (this.enemyHealth < 0)
    {
        this.kill();
        aliveEnemies -= 1;
    }
};
