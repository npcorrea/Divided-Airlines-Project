//Main Menu: Gives play instructions, play button
var MainMenu = function(game) {};
MainMenu.prototype =
{
    create: function()
    {
        //Background
        game.background = game.add.image(0,0,'MenuBG');

        //Centered Play Button
        /*playButton = game.add.button(400, 350, 'play', this.playTime, this);
        playButton.anchor.x = 0.5;
        playButton.anchor.y = 0.5;*/
        var startText = new AddOption(game, 350, 350, 'Play', 'Level1Part1');
        game.add.existing(startText);

        var instrText = new AddOption(game, 290, 430, 'Instructions', 'Instructions');
        game.add.existing(instrText);
    },
    /*playTime: function()
    {
        //Starts game on button press
        game.state.start('Level1Part1');
    }*/
};
