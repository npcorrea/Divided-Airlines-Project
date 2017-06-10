//Preloader: Loads assests, starts physics engine
var Load = function(game) {};
Load.prototype =
{
    init: function(){
        // add loading text
        this.status = this.make.text(320, 300, 'Loading...', {font: 'Cuprum', fontSize: '48px', fill: 'white'});
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
        game.load.image('deathScreen', 'assets/img/DeathScreen.png');

        //Load Game Sprites
        game.load.image('play', 'assets/img/Play.png');
        game.load.image('rewind', 'assets/img/Rewind.png');
        game.load.image('door', 'assets/img/TheBESTdoor.png');
        game.load.image('scorp', 'assets/img/babyScorpion.png');
        game.load.image('scalpel', 'assets/img/scalpel.png');
        game.load.image('key', 'assets/img/key.png');

        //Load HUD Sprites
        game.load.image('heart','assets/img/Heart.png',32,32);
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
        game.load.spritesheet('simon', 'assets/img/Simon.png', 256, 256);

        //Load Music
        game.load.audio('menuMusic', ['assets/audio/menuMusic.mp3', 'assets/audio/menuMusic.ogg']);
        game.load.audio('cutsceneMusic', ['assets/audio/cutscenebg.mp3', 'assets/audio/cutscenebg.ogg']);
        game.load.audio('winMusic', ['assets/audio/winbg.mp3', 'assets/audio/winbg.ogg']);
        game.load.audio('loseMusic', ['assets/audio/lossbg.mp3', 'assets/audio/lossbg.ogg']);

        game.load.audio('bgMusic', ['assets/audio/bgm.mp3', 'assets/audio/bgm.ogg']);
        game.load.audio('battleMusic', ['assets/audio/battleMusic.mp3', 'assets/audio/battleMusic.ogg']);
        game.load.audio('bossMusic', ['assets/audio/bossMusic.mp3', 'assets/audio/bossMusic.ogg']);

        //Load Sfx
        game.load.audio('hammerSfx', ['assets/audio/hammer.mp3', 'assets/audio/hammer.ogg']);
        game.load.audio('scalpelSfx', ['assets/audio/scalpel.mp3', 'assets/audio/scalpel.ogg']);
        game.load.audio('painSfx', ['assets/audio/pain.mp3', 'assets/audio/pain.ogg']);
        game.load.audio('stingSfx', ['assets/audio/sting.mp3', 'assets/audio/sting.ogg']);
        game.load.audio('laserSfx', ['assets/audio/laser.mp3', 'assets/audio/laser.ogg']);

    },
    create: function()
    {
        //Start Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Add Music
        game.menuMusic = game.add.audio('menuMusic');
        game.cutsceneMusic = game.add.audio('cutsceneMusic');
        game.winMusic = game.add.audio('winMusic');
        game.loseMusic = game.add.audio('loseMusic');

        game.bgMusic = game.add.audio('bgMusic');
        game.battleMusic = game.add.audio('battleMusic');
        game.bossMusic = game.add.audio('bossMusic');

        //Add Sfx
        game.hammerSfx = game.add.audio('hammerSfx');
        game.scalpelSfx = game.add.audio('scalpelSfx');

        game.painSfx = game.add.audio('painSfx');
        game.stingSfx = game.add.audio('stingSfx');
        game.laserSfx = game.add.audio('laserSfx');

        //Let's get it started
        this.status.setText('Ready!');

        //Start music
        game.menuMusic.play('', 0, 0.2, true);

        //Move to MainMenu
        setTimeout(function () {
            game.state.start('MainMenu');
        }, 1000);

    }
};
