 //Enemy Prefab
 Enemy.prototype = Object.create(Phaser.Sprite.prototype);
 Enemy.prototype.constructor = Enemy;

 var eIsLeft;
 var enemyAtkRange = 45;
 var speed = 100;

 function Enemy(game, key, x, y, frame)
 {
    // call to Phaser.Sprite
    Phaser.Sprite.call(this, game, x, y, key, frame);

    // add properties
    this.anchor.set(.5);
    game.physics.enable(this);

    if (key == 'SG')
    {
        this.body.setSize(156, 256, 35, 0);
        this.animations.add('eRight', null, 8, true);
        //this.animations.add('eAttack', null, 13, false);
    }
    else if (key == 'FA')
    {
        this.body.setSize(102, 256, 91, 0);
        this.animations.add('eRight', null, 8, true);
        //this.animations.add('eAttack', null, 13, false);
    }
 }

Enemy.prototype.update = function()
{
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
         game.physics.arcade.moveToObject(this, player, speed);
      }
      else if (this.x - player.x > 0 && (player.x - player.x < enemyAtkRange)) // if within attack range
      {
         // left attacking animation
         this.body.velocity.x = 0;
         this.body.velocity.y = 0;
         game.physics.arcade.overlap(this, player, attack, null, this);
         //game.time.events.add(Phaser.Timer.SECOND * 4, wait, this);
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
         game.physics.arcade.moveToObject(this, player, speed);
      }
      else if (player.x - this.x > 0 && (player.x - this.x < enemyAtkRange))// if within attack range
      {
         // right attacking animation
         this.body.velocity.x = 0;
         this.body.velocity.y = 0;
         game.physics.arcade.overlap(this, player, attack, null, this);
         //game.time.events.add(Phaser.Timer.SECOND * 4, wait, this);
      }
   }
};

// Combat resolution
function attack ()
{
    if (isAttacking)
    {
        this.kill();
        aliveEnemies -= 1;
        console.log(aliveEnemies);
    }
    else
    {
        game.state.start('Lose');
    }
};

function wait ()
{};
