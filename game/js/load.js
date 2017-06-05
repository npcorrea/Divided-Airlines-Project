//Preloader: Loads assests, starts physics engine
var Load = function(game) {};
Load.prototype =
{
    init: function(){
        // add loading text
        this.status = this.make.text(320, 350, 'Loading...', {font: 'Impact', fontSize: '48px', fill: 'white'});
    },
    preload: function()
    {
        // load preload screen, make bar preloader
        game.add.existing(this.status);

        //Load Backgrounds
        game.load.image('MenuBG', 'assets/img/TitleArt.png');
        game.load.image('Face', 'assets/img/DoctorFace.png');
    	game.load.image('background1', 'assets/img/Jet_Bridge.png');
        game.load.image('background2', 'assets/img/Plane.png');
        game.load.image('background3', 'assets/img/Cockpit.png');

        //Load Sprites
        game.load.image('play', 'assets/img/Play.png');
        game.load.image('rewind', 'assets/img/Rewind.png');
        game.load.image('door', 'assets/img/TheBESTdoor.png');
        game.load.image('star', 'assets/img/star.png');

        game.load.image('healthBar', 'assets/img/healthBarSmall.png', 256, 40);
        game.load.image('scalpelIcon', 'assets/img/scalpelHUD.png', 32, 32);
        game.load.image('pillIcon', 'assets/img/pillHUD.png', 32, 32);
        game.load.image('pillButton', 'assets/img/rButtonHUD.png', 32, 32);
        game.load.image('meleeAtkButton', 'assets/img/spaceBarHUD.png', 185, 43);
        game.load.image('rangedAtkButton', 'assets/img/eButtonHUD.png', 32, 32);

        //Load Spritesheets
        game.load.spritesheet('doctor', 'assets/img/DoctorWalkSpriteSheet.png', 256, 256);
        game.load.spritesheet('FA', 'assets/img/FAWalkAnimRight.png', 256, 256);
        game.load.spritesheet('SG', 'assets/img/SGWalkAnimRight.png', 256, 256);
        game.load.spritesheet('captain', 'assets/img/CaptainSpritesheet.png', 1024, 512);

        game.load.image('scalpel', 'assets/img/scalpel.png');

        //Load Sounds
        game.load.audio('music', ['assets/audio/MK.mp3']);
    },
    create: function()
    {
        //Start Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.status.setText('Ready!');

        //Move to MainMenu
        setTimeout(function () {
            game.state.start('MainMenu');
        }, 1000);
        
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
        game.state.start('Level1Part3');
    }
};

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
                game.rnd.integerInRange(400,600));
            game.add.existing(enemy);
            aliveEnemies += 1;
            spawnGroup.add(enemy);
        }
    }
    //Right Spawn
    for (let j = 0; j < waveSize; j++)
    {
        enemy = new Enemy(game, sprite, game.rnd.integerInRange(rightXMin,rightXMax),
            game.rnd.integerInRange(400,600));
        game.add.existing(enemy);
        aliveEnemies += 1;
        spawnGroup.add(enemy);
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
    boss = new Boss(game, 'captain', -200, 500);
        game.add.existing(boss);
        aliveEnemies += 1;

    if (lockBossSpawn)
    {
        lockBossSpawn = false;
    }
};

function scorprain()
{
    emitter = game.add.emitter(1485, -200, 100);
    emitter.makeParticles('star', 0, 7000, true);
    emitter.start(false, 7000, 20);
};

function scorpipain()
{
    playerHealth -= 1;

    if (playerHealth < 0)
    {
        game.state.start('Lose');
    }
};

function scalpelThrow()
{
    if (scalpels > 0)
    {
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

function done()
{
    isThrowing = false;
};

function done2()
{
    isAttacking = false;
};
