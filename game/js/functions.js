//File containing game functions

// Call this to go to the losing state
function goToLoseState(){
  game.state.start('Lose');
}

//Replay the game
function again()
{
    //Reset Variables
    //Triggers
    isAttacking = false;
    isThrowing = false;
    isLeft = false;
    isRight = false;
    bossAttacking = false;
    key = false;
    simonSaved = false;

    //Resources
    playerHealth = 10000;
    pills = 3;
    scalpels = 5;

    //Locks
    lock1 = false;
    lock1Pending = true;
    lock1Spawn = true;

    lock2 = false;
    lock2Pending = true;
    lock2Spawn = true;

    lock3 = false;
    lock3Pending = true;
    lock3Spawn = true;

    lock4 = false;
    lock4Pending = true;
    lock4Spawn = true;

    lockBoss = false;
    lockBossPending = true;
    lockBossSpawn = true;

    //Move to MainMenu
    game.state.start('Level1Part1');
}

//Level transition to part2
function transport1 ()
{
    if (!lock1)
    {
        game.state.start('Level1Part2');
    }
};

//Level transition to part3
function transport2 ()
{
    if (key && !lockBoss)
    {
        game.state.start('Level1Part3');
    }
};

//Level transition to end of game
function transport3 ()
{
    game.state.start('Win');
};

//Spawn a wave of enemies
function spawnEnemies(sprite, leftXMin, leftXMax, rightXMin, rightXMax, leftSpawn)
{
    spawnGroup = game.add.group();

    //Left Spawn
    if (leftSpawn)
    {
        for (let i = 0; i < waveSize; i++)
        {
            enemy = new Enemy(game, sprite, game.rnd.integerInRange(leftXMin,leftXMax),
                game.rnd.integerInRange(250,600));
            game.add.existing(enemy);
            aliveEnemies += 1;
            spawnGroup.add(enemy);
        }
    }
    //Right Spawn
    for (let j = 0; j < waveSize; j++)
    {
        enemy = new Enemy(game, sprite, game.rnd.integerInRange(rightXMin,rightXMax),
            game.rnd.integerInRange(250,600));
        game.add.existing(enemy);
        aliveEnemies += 1;
        spawnGroup.add(enemy);
    }

    //Remake HUD so enemies are below it
    killHUD();
    HUD();

    //Deactivate spawn triggers
    if (lock1Spawn)
    {
        lock1Spawn = false;
    }

    if (lock2Spawn)
    {
        lock2Spawn = false;
    }

    if (lock3Spawn)
    {
        lock3Spawn = false;
    }

    if (lock4Spawn)
    {
        lock4Spawn = false;
    }
};

//Create the boss
function spawnBoss()
{
    boss = new Boss(game, 'captain', -200, 500);
        game.add.existing(boss);
        aliveEnemies += 1;

    killHUD();
    HUD();

    if (lockBossSpawn)
    {
        lockBossSpawn = false;
    }
};

//Make it rain scorpions
function scorprain()
{
    //emitter(x, y, maxParticles)
    emitter = game.add.emitter(1485, -200, 100);

    //makeParticles(keys, frames, quantity, collide)
    emitter.makeParticles('scorp', 0, 100, true);

    //start(explode, lifespan, frequency, quantity)
    //quantity = 0 means all of them until you run out/hit max
    emitter.start(false, 7000, 500, 0);
};

//Damage the player when hit by a scorpion
function scorpipain()
{
    playerHealth -= 10;

    //OOF!
    if (!game.painSfx.isPlaying)
    {
        game.painSfx.play('', 0, 0.2, false);
    }

    //Kill player if they seriously die to these things...
    if (playerHealth < 0)
    {
        game.state.start('Lose');
    }
};

//Create key to cockpit
function makeKey()
{
    endKey = game.add.sprite(2325, 405, 'key');
    game.physics.arcade.enable(endKey);
    endKey.anchor.x = 0.5;
    endKey.anchor.y = 0.5;
}

//Call when player touches key
function getKey()
{
    key = true;
    endKey.kill();
}

//STABBING!
function scalpelThrow()
{
    if (scalpels > 0)
    {
        game.scalpelSfx.play('', 0.5, 0.2, false);
        scalpels -= 1;
        scalpel = game.add.sprite(player.x, player.y - 42, 'scalpel');
        game.physics.arcade.enable(scalpel);
        scalpel.anchor.x = 0.5;
        scalpel.anchor.y = 0.5;

        if (isLeft)
        {
            scalpel.scale.x = -1;
            scalpel.body.velocity.x = -500;
        }
        else
        {
            scalpel.scale.x = 1;
            scalpel.body.velocity.x = 500;
        }

        if ((scalpel.x > game.world.width.x) || (scalpel.x < 0))
        {
            scalpel.kill();
        }
    }
};

//Call at end of long-range attack animation
function done()
{
    isThrowing = false;
};

//Call at end of short-range attack animation
function done2()
{
    isAttacking = false;
};

//Call when triggering Simon
function bunbun()
{
    simon.animations.play('poof');
}

//Call to lock Simon animation and unlock easter egg
function saved()
{
    simon.frame = 21;
    simonSaved = true;
}
