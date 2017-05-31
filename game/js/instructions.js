var Instructions = function(game) {};
Instructions.prototype =
{
	create: function(){
		 game.add.text(170, 250, "Press/Hold SPACE to attack",
            {font: '40px Cuprum', fill: '#bababa'});

		var back = new AddOption(game, 30, 500, 'Back', 'MainMenu');
        game.add.existing(back);
	}
};