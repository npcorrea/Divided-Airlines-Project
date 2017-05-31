var Cutscene = function(game) {};
Cutscene.prototype =
{
	create: function(){
		text = game.add.text(32, 32, '', { font: "15px Arial", fill: "#bababa" });
		skip = game.add.text(32, 500, 'Press SPACE to skip cutscene.', {font: "15px Arial", fill: "#bababa"});

		// content hold first block of text
		content = textBlock[0];
		spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.nextLine();
	},
	update: function(){
		if(spaceKey.isDown){
			 game.state.start('Level1Part1');
		}
	},
	nextLine: function() {
	    if (lineIndex == content.length){
	        // go to next block of text when finished, clearing previous text
	        if(n >= 1){
	        	// if at end of text blocks, clear text and go to menu after timer or press space to go to menu
	        	lineIndex = 0;
	        	//text.setText("");

	        	this.goToLevel();
	        	return;
	        }
	        else {
	        	n++;
	        	console.log('n = ' + n);
	        	content = textBlock[n];
	       		lineIndex = 0;
	        	text.setText("");
	        }
	    }
	    //  Split the current line on spaces, so one word per array element
	    line = content[lineIndex].split(' ');

	    //  Reset the word index to zero (the first word in the line)
	    wordIndex = 0;

	    //  Call the 'nextWord' function once for each word in the line (line.length)
	    game.time.events.repeat(wordDelay, line.length, this.nextWord, this);

	    //  Advance to the next line
	    lineIndex++;
	},
	nextWord: function() {
	    //  Add the next word onto the text string, followed by a space
	    text.text = text.text.concat(line[wordIndex] + " ");

	    //  Advance the word index to the next word in the line
	    wordIndex++;

	    //  Last word?
	    if (wordIndex == line.length){
	        //  Add a carriage return
	        text.text = text.text.concat("\n");

			game.time.events.add(lineDelay, this.nextLine, this);
	        //  Get the next line after the lineDelay amount of ms has elapsed
	        //spaceKey.onDown.add(this.nextLine, this);
	    }

	},
	goToLevel: function() {
		if(spaceKey.isDown){
	    	console.log('Go to level1');
	        game.state.start('Level1Part1');
	    }
	        	
		setTimeout(function () {
			game.state.start('Level1Part1');
    	}, 2200);
	}
};