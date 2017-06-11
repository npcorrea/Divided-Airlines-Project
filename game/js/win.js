//Win: Winning game over screen, replay button
var Win = function(game) {};
Win.prototype =
{
    create: function()
    {
       textStyle = {
            font: 'Cuprum',
            fontSize: 40,
            wordWrap: true,
            wordWrapWidth: 600,
            fill: '#bababa',
            align: 'center'
        }
        
        game.bgMusic.stop();
        game.battleMusic.stop();

        //Prompt for Replay
        game.add.text(200, 170, "You won! Press Q to restart", textStyle);
        
        //SIMON!!!
        if(simonSaved == true)
        {
           game.add.text(260, 230, "Simon was saved!", textStyle);
           simon = game.add.sprite(300, 250, 'simon');
           simon.animations.add('simon', [17, 18, 19, 20, 21, 22], 15, false);
           simon.animations.play('simon');
           simon.frame = 22;
        }
        else
        {
           game.add.text(110, 230, "Sadly, Simon died on the flight home...", textStyle);
        }

        //Background color, because color is good
        game.stage.backgroundColor = "#000";

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
