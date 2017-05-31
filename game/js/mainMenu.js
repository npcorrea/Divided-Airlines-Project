//Main Menu: Gives play instructions, play button
var MainMenu = function(game) {};
MainMenu.prototype =
{
    create: function()
    {
        //Background
        game.background = game.add.image(0,0,'MenuBG');

        //Instructions
        game.add.text(225, 450, "Press/Hold SPACE to attack",
            {font: '30px Arial', fill: '#ffffff'});

        //Centered Play Button
        playButton = game.add.button(400, 350, 'play', this.playTime, this);
        playButton.anchor.x = 0.5;
        playButton.anchor.y = 0.5;
    },
    playTime: function()
    {
        //Starts game on button press
        game.state.start('Level1Part1');
    }
};
