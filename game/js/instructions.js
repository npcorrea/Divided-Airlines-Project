var Instructions = function(game) {};
Instructions.prototype =
{
	create: function(){
		textStyle = {
			font: 'Cuprum',
			fontSize: 40,
			wordWrap: true,
			wordWrapWidth: 500,
			fill: '#bababa',
			align: 'center'
		}
		textStyle1 = {
			font: 'Cuprum',
			fontSize: 40,
			wordWrap: true,
			wordWrapWidth: 500,
			fill: '#e01f1f',
		}

		 game.add.text(170, 50, "You are a doctor who was beat up and thrown off the plane. Fight your way back on and get your revenge!",
            textStyle);

		 game.add.text(170, 300, "WASD or arrow keys to move", textStyle1);
		 game.add.text(320, 350, "to attack\nto heal\nfor ranged attack", textStyle1);

		 game.add.sprite(120, 350, 'meleeAtkButton');
		 game.add.sprite(260, 390, 'pillButton');
		 game.add.sprite(260, 450, 'rangedAtkButton');;

		var back = new AddOption(game, 30, 500, 'Back', 'MainMenu');
        game.add.existing(back);
	}
};
