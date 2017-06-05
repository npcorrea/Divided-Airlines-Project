function HUD()
{
   //healthBar
   healthBar = this.game.add.sprite(32, 32, 'healthBar');
   healthBar.cropEnabled = true;
   healthBar.fixedToCamera = true;

   // inventory displays
   // scalpels
   scalpelIcon = this.game.add.sprite(64, 64, 'scalpelIcon');
   scalpelIcon.fixedToCamera = true;
   scalpelText = game.add.text(64, 32, 'Scalpels: 0', {fontSize: '32px', fill: '#000'});
   scalpelText.fixedToCamera = true;

   // pills
   pillIcon = this.game.add.sprite(96, 64, 'pillIcon');
   pillIcon.fixedToCamera = true;
   pillText = game.add.text(96, 32, 'Pills: 0', {fontSize: '32px', fill: '#000'});
   pillText.fixedToCamera = true;

   pillButton = this.game.add.sprite(96, 590, 'pillButton');
   pillButton.fixedToCamera = true;
   pillButtonText = game.add.text(96, 580, 'Press R to heal', {fontSize: '32px', fill: '#000'});
   pillButtonText.fixedToCamera = true;

   // attack button displays
   // melee
   meleeAtkIcon = this.game.add.sprite(32, 590, 'meleeAtkButton');
   meleeAtkIcon.fixedToCamera = true;
   meleeAtkText = game.add.text(32, 580, 'Press SPACE to melee attack', {fontSize: '32px', fill: '#000'});
   meleeAtkText.fixedToCamera = true;

   // rangedAtkIcon
   rangedAtkIcon = this.game.add.sprite(64, 590, 'rangedAtkButton');
   rangedAtkIcon.fixedToCamera = true;
   rangedAtkText = game.add.text(64, 580, 'Press E to ranged attack', {fontSize: '32px', fill: '#000'});
   rangedAtkText.fixedToCamera = true;
}

function updateHUD()
{
   // when the player uses a scalpel
   scalpelText = 'Scalpels: ' + scalpels;

   // when the player uses a pill
   pillText = 'Pills: ' + pills;

   // healthBar
   healthBar.crop.width = (playerHealth/playerMaxHealth) * healthBar.width;
}
