// object to add selectable menu options
function AddOption(game, x, y, text, callback){
	Phaser.Text.call(this, game, x, y, text, {font: 'Cuprum', fontSize: '40px', fill: '#bababa'});
	// change text color when hovering over
	var onOver = function(target){
			target.fill = "white";
	};
	// revert to normal color when mouse moves
	var onOut = function(target){
		target.fill = '#bababa';
	};
	// start state when clicked
	var onUp = function(target){
		game.state.start(callback);
	}
	
	// enable input and add
	this.inputEnabled = true;
	this.events.onInputUp.add(onUp);
    this.events.onInputOver.add(onOver);
    this.events.onInputOut.add(onOut);
};
AddOption.prototype = Object.create(Phaser.Text.prototype);
AddOption.prototype.constructor = AddOption;