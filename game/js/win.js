//Win: Winning game over screen, replay button
var Win = function(game) {};
Win.prototype =
{
    create: function()
    {
        //Prompt for Replay
        game.add.text(230, 200, "You won: Restart?",
            {font: '30px Arial', fill: '#ffffff'});

        //Restart Button
        restartButton = game.add.button(400, 300, 'rewind', this.Again, this);
        restartButton.anchor.x = 0.5;
        restartButton.anchor.y = 0.5;

        //Background color, because color is good
        game.stage.backgroundColor = "#007700";
    },
    Again: function()
    {
        //Move to MainMenu
        game.state.start('MainMenu');
    }
};
