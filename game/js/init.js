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

var text1 = [
    "They beat me up... humiliated me... denied me a seat.",
    "But now now I'm back and I'm taking matters into ",
    "my own hands. If they won't fly me home then I'm ",
    "going to have to do it myself.",
    "",
	];
var text2 = [
	"Time to get my revenge.",
    "I'm going to presribe them some medication.",
    "Prescription?",
    "DEATH.",
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
game.state.add('Credits', Credits);
game.state.add('Level1Part1', Level1Part1);
game.state.add('Level1Part2', Level1Part2);
game.state.add('Win', Win);
game.state.add('Lose', Lose);

//Start Preloader
game.state.start('Load');

//Level transition
function transport ()
{
    game.state.start('Win');
};

//Combat resolution
function attack ()
{
    if (isAttacking)
    {
        enemy.kill();
    }
    else
    {
        game.state.start('Lose');
    }
}
