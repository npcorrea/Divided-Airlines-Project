//Create Game Object
var game = new Phaser.Game(800, 600, Phaser.AUTO);

//Global Variables
var DeathBars;
var player;
var playButton;
var restartButton;
var door;

//Load game states
game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Level1', Level1);
game.state.add('End', End);

//Start Preloader
game.state.start('Preloader');

function transport ()
{
    game.state.start('End');
};
