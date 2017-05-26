//Preloader: Loads assests, starts physics engine
var Load = function(game) {};
Load.prototype =
{
    preload: function()
    {
        //Load Non-Atlas Images
    	game.load.image('background1', 'assets/img/tempBack1.png');
        game.load.image('background2', 'assets/img/tempBack2.png');

        //Load Sprites (eventually Atlas)
        game.load.image('play', 'assets/img/Play.png');
        game.load.image('rewind', 'assets/img/Rewind.png');
        game.load.image('door', 'assets/img/TheBESTdoor.png');
        game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
        game.load.image('star', 'assets/img/star.png');
        game.load.image('BOSSstar', 'assets/img/BOSSstar.png');
        game.load.image('sword', 'assets/img/sword.png');
        game.load.audio('music', ['assets/audio/MK.mp3']);
    },
    create: function()
    {
        //Start Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Move to MainMenu
        game.state.start('MainMenu');
    }
};

//Level transition
function transport1 ()
{
    if (!lock1)
    {
        game.state.start('Level1Part2');
    }
};

function transport2 ()
{
    if (key && !lockBoss)
    {
        game.state.start('Win');
    }
};

//Spawn a wave of enemies
function spawnEnemies(leftXMin, leftXMax, rightXMin, rightXMax)
{
    spawnGroup = game.add.group();

    //Left Spawn
    for (let i = 0; i < waveSize; i++)
    {
        enemy = new Enemy(game, 'star', game.rnd.integerInRange(leftXMin,leftXMax),
            game.rnd.integerInRange(400,600));
        game.add.existing(enemy);
        aliveEnemies += 1;
        spawnGroup.add(enemy);
        console.log(aliveEnemies);
    }
    //Right Spawn
    for (let j = 0; j < waveSize; j++)
    {
        enemy = new Enemy(game, 'star', game.rnd.integerInRange(rightXMin,rightXMax),
            game.rnd.integerInRange(400,600));
        game.add.existing(enemy);
        aliveEnemies += 1;
        spawnGroup.add(enemy);
        console.log(aliveEnemies);
    }

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

function spawnBoss()
{
    enemy = new Enemy(game, 'BOSSstar', game.rnd.integerInRange(-800, 0),
        game.rnd.integerInRange(400,600));
        game.add.existing(enemy);
        aliveEnemies += 1;
        console.log("RAWR!!!!");
        console.log(aliveEnemies);

    if (lockBossSpawn)
    {
        lockBossSpawn = false;
    }
}
