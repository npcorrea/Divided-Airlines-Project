//Lose: Losing game over screen, replay button
var Lose = function(game) {};
Lose.prototype =
{
    create: function()
    {
        game.bgMusic.stop();
        game.battleMusic.stop();
        game.bossMusic.stop();

        game.loseMusic.play('', 0, 0.6, true);

        //Background
        game.deathScreen = game.add.image(0,0,'deathScreen');

        //Prompt for Replay
        game.add.text(230, 400, "Restart?",
            {font: '30px Arial', fill: '#ffffff'});

        //Restart Button
        restartButton = game.add.button(400, 300, 'rewind', again, this);
        restartButton.anchor.x = 0.5;
        restartButton.anchor.y = 0.5;

        //Restart Key
        qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    },
    update: function()
    {
        if (qKey.justPressed(qKey))
        {
            again();
        }
    }
};
