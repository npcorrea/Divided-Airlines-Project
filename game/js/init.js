//Create Game Object
var game = new Phaser.Game(800, 600, Phaser.AUTO);

//Global Variables
//Sprite vars
var player;
var playButton;
var restartButton;
var door;
var enemy;
var sAttack;
var emitter;
var scalpel;
var spawnGroup;
var endKey;

//Trigger vars
var isAttacking = false;
var isThrowing = false;
var isLeft = false;
var isRight = false;
var bossAttacking = false;
var key = false;
var simonSaved = false;
var waveSize = 5;
var aliveEnemies = 0;

//Resource vars
var playerHealth = 10000;
var pills = 3;
var scalpels = 5;
var HUDFont = {font: 'Cuprum', fontSize: '24px', fill: '#000000'};
var simonSaved = false;

var waveSize = 5;
var aliveEnemies = 0;

//Lock vars
var lock1 = false;
var lock1Pending = true;
var lock1Spawn = true;

var lock2 = false;
var lock2Pending = true;
var lock2Spawn = true;

var lock3 = false;
var lock3Pending = true;
var lock3Spawn = true;

var lock4 = false;
var lock4Pending = true;
var lock4Spawn = true;

var lockBoss = false;
var lockBossPending = true;
var lockBossSpawn = true;

//HUD vars
var HUDFont = {font: 'Cuprum', fontSize: '24px', fill: '#000000'};
var healthBar;
var scalpeIcon;
var scalpelText;
var pillIcon;
var pillText;
var pillButton;
var pillButtonText;
var meleeAtkIcon;
var meleeAtkText;
var rangedAtkIcon;
var rangedAtkText;
var playerMaxHealth = 10000;

//Cutscene vars
var text1 = [
    "They beat me up... humiliated me... denied me a seat.",
    "But now now I'm back and I'm taking matters into ",
    "my own hands. If they won't fly me home then I'm ",
    "going to have to do it myself.	",
    "",
	];
var text2 = [
	"Time to get my revenge.",
    "I'm going to prescribe them some medication.",
    "Prescription?",
    "DEATH.		",
    "",
];
var text3 = [
	"MISSION: Fight your way onto the plane.",
	"Go to the cockpit and fly your damn self home."
];
var textBlock = [text1, text2, text3];
var line = [];
var content = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;
var spaceKey;
var n = 0;

//Load game states
game.state.add('Load', Load);
game.state.add('Cutscene', Cutscene);
game.state.add('MainMenu', MainMenu);
game.state.add('Instructions', Instructions);
game.state.add('Level1Part1', Level1Part1);
game.state.add('Level1Part2', Level1Part2);
game.state.add('Level1Part3', Level1Part3);
game.state.add('Win', Win);
game.state.add('Lose', Lose);

//Start Preloader
game.state.start('Load');
