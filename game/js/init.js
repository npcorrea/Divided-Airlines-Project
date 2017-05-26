//Create Game Object
var game = new Phaser.Game(800, 600, Phaser.AUTO);

//Global Variables
var player;
var playButton;
var restartButton;
var door;
var enemy;
var sAttack;
var isAttacking = false;
var isLeft = false;
var isRight = false;
var spawnGroup;
var key = false;

var waveSize = 5;
var aliveEnemies = 0;

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

//Load game states
game.state.add('Load', Load);
game.state.add('MainMenu', MainMenu);
game.state.add('Level1Part1', Level1Part1);
game.state.add('Level1Part2', Level1Part2);
game.state.add('Win', Win);
game.state.add('Lose', Lose);

//Start Preloader
game.state.start('Load');
