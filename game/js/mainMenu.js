//Main Menu: Gives play instructions, play button
var MainMenu = function(game) {};
MainMenu.prototype =
{
    create: function()
    {
        //Background
        game.background = game.add.image(0,0,'MenuBG');

        // add menu options
        var startText = new AddOption(game, 350, 350, 'Play', 'Cutscene');
        game.add.existing(startText);

        var instrText = new AddOption(game, 290, 430, 'Instructions', 'Instructions');
        game.add.existing(instrText);
    },
};
