//Lose: Losing game over screen, replay button
var Lose = function(game) {};
Lose.prototype =
{
    create: function()
    {
        textStyle = {
            font: 'Cuprum',
            fontSize: 40,
            wordWrap: true,
            wordWrapWidth: 500,
            fill: '#bababa',
            align: 'center'
        }

        //Music
        game.bgMusic.stop();
        game.battleMusic.stop();
        game.bossMusic.stop();

        game.loseMusic.play('', 0, 0.6, true);

        //Background
        game.deathScreen = game.add.image(0,0,'deathScreen');

        //Prompt for Replay
        game.add.text(170, 270, "You have failed in your quest for justice. \n\nAre you gonna give up? No? Press Q to reset your fate.", textStyle);

        //Restart Key
        qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    },
    update: function()
    {
        //Restart if restart key was pressed
        if (qKey.justPressed(qKey))
        {
            again();
        }
    }
};
