//Main Menu: Gives play instructions, play button
var MainMenu = function(game) {};
MainMenu.prototype =
{
    create: function()
    {
        //Background
        game.background = game.add.image(0,0,'MenuBG');

        // add menu options
        var startText = new AddOption(game, 365, 335, 'Play', 'Cutscene');
        game.add.existing(startText);

        var instrText = new AddOption(game, 305, 415, 'Instructions', 'Instructions');
        game.add.existing(instrText);

        var instrText = new AddOption(game, 345, 495, 'Credits', 'Credits');
        game.add.existing(instrText);

        //var sceneText = new AddOption(game, 290, 510, 'Cutscene', 'Cutscene');
        //game.add.existing(sceneText);
    },
};
