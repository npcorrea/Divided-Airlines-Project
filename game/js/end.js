//End: Game over screen, display score, replay button
var End = function(game) {};
End.prototype =
{
    create: function()
    {
        //Prompt for Replay
        game.add.text(game.world.centerX -55, game.world.centerY +60, "Restart?",
            {font: '30px Arial', fill: '#ffffff'});

        //Restart Button
        restartButton = game.add.button(400, 300, 'rewind', this.Again, this);
        restartButton.anchor.x = 0.5;
        restartButton.anchor.y = 0.5;

        game.stage.backgroundColor = "#770000";
    },
    Again: function()
    {
        //Move to MainMenu
        game.state.start('MainMenu');
    }
};
