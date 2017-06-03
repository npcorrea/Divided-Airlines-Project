//Lose: Losing game over screen, replay button
var Lose = function(game) {};
Lose.prototype =
{
    create: function()
    {
        game.music.stop();

        //Prompt for Replay
        game.add.text(230, 200, "You died: Restart?",
            {font: '30px Arial', fill: '#ffffff'});

        //Restart Button
        restartButton = game.add.button(400, 300, 'rewind', again, this);
        restartButton.anchor.x = 0.5;
        restartButton.anchor.y = 0.5;

        //Background color, because color is good
        game.stage.backgroundColor = "#770000";

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
