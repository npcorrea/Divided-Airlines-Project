//Preloader: Loads assests, starts physics engine
var Load = function(game) {};
Load.prototype =
{
<<<<<<< Updated upstream
=======
    init: function(){
        // add loading text
        this.status = this.make.text(320, 300, 'Loading...', {font: 'Cuprum', fontSize: '48px', fill: 'white'});
    },
>>>>>>> Stashed changes
    preload: function()
    {
        //Load Backgrounds
        game.load.image('MenuBG', 'assets/img/TitleArt.png');
        game.load.image('Face', 'assets/img/DoctorFace.png');
    	game.load.image('background1', 'assets/img/Jet_Bridge.png');
        game.load.image('background2', 'assets/img/Plane.png');

        //Load Sprites
        game.load.image('play', 'assets/img/Play.png');
        game.load.image('rewind', 'assets/img/Rewind.png');
        game.load.image('door', 'assets/img/TheBESTdoor.png');

        //Load Spritesheets
        game.load.spritesheet('doctor', 'assets/img/DoctorWalkSpriteSheet.png', 256, 256);

        game.load.spritesheet('FA', 'assets/img/FAWalkAnimRight.png', 256, 256);
        //game.load.spritesheet('FAAttack', 'assets/img/FAAttackAnimRight.png', );
        game.load.spritesheet('SG', 'assets/img/SGWalkAnimRight.png', 256, 256);
        //game.load.spritesheet('SGAttack', 'assets/img/SGAttackAnimRight.png', );

        game.load.image('BOSSstar', 'assets/img/BOSSstar.png');
        game.load.image('sword', 'assets/img/sword.png');

        //Load Sounds
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
function spawnEnemies(sprite, leftXMin, leftXMax, rightXMin, rightXMax, leftYMin, leftYMax)
{
    spawnGroup = game.add.group();

    //Left Spawn
    for (let i = 0; i < waveSize; i++)
    {
        enemy = new Enemy(game, sprite, game.rnd.integerInRange(leftXMin,leftXMax),
            game.rnd.integerInRange(leftYMin,leftYMax));
        game.add.existing(enemy);
        aliveEnemies += 1;
        spawnGroup.add(enemy);
        console.log(aliveEnemies);
    }
    //Right Spawn
    for (let j = 0; j < waveSize; j++)
    {
        enemy = new Enemy(game, sprite, game.rnd.integerInRange(rightXMin,rightXMax),
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
    enemy = new Enemy(game, 'BOSSstar', game.rnd.integerInRange(-400, 0),
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
