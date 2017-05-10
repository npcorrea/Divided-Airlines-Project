//Create Game Object
var game = new Phaser.Game(800, 600, Phaser.AUTO);

//Global Variables
var DeathBars;
var player;
var playButton;
var restartButton;
var door;
var enemy;
var sAttack;
var isAttacking = false;

//Load game states
game.state.add('Load', Load);
game.state.add('MainMenu', MainMenu);
game.state.add('Level1', Level1);
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
