var Credits = function(game) {};
Credits.prototype =
{
	create: function(){
		textStyle = {
			font: 'Cuprum',
			fontSize: 25,
			wordWrap: true,
			wordWrapWidth: 700,
			fill: '#bababa',
			align: 'center'
		}
		 game.add.text(75, 75, "Janelynn Camingue: Enemy Design, UI Design, Timer Implementation\n\nNoelle Correa: Level Design, Menu Design and Implementation, Cutscene Design and Implementation\n\nDaniel Martin: Doctor Design, Music Finder,\n\nAngela Moy: Boss Design, Music and Sound Effect Finder\n\nJesse Paone: Lead Programmer\n\nMusic from bensound.com and playonloop.com",
            textStyle);

		var back = new AddOption(game, 30, 500, 'Back', 'MainMenu');
        game.add.existing(back);
	}
};