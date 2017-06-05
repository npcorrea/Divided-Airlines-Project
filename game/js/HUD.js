function HUD()
{
   //healthBar
   healthBar = this.game.add.sprite(32, 32, 'healthBar');
   healthBar.cropEnabled = true;
   healthBar.fixedToCamera = true;

   // inventory displays
   // scalpels
   scalpelIcon = this.game.add.sprite(325, 25, 'scalpelIcon');
   scalpelIcon.fixedToCamera = true;
   scalpelText = game.add.text(360, 25, 'Scalpels:', {fontSize: '32px', fill: '#000'});
   scalpelText.fixedToCamera = true;

   // pills
   pillIcon = this.game.add.sprite(575, 25, 'pillIcon');
   pillIcon.fixedToCamera = true;
   pillText = game.add.text(610, 25, 'Pills:', {fontSize: '32px', fill: '#000'});
   pillText.fixedToCamera = true;

   pillButton = this.game.add.sprite(650, 540, 'pillButton');
   pillButton.fixedToCamera = true;
   pillButtonText = game.add.text(700, 550, 'to heal', {fontSize: '24px', fill: '#000'});
   pillButtonText.fixedToCamera = true;

   // attack button displays
   // melee
   meleeAtkIcon = this.game.add.sprite(25, 545, 'meleeAtkButton');
   meleeAtkIcon.fixedToCamera = true;
   meleeAtkText = game.add.text(215, 550, 'to melee attack', {fontSize: '24px', fill: '#000'});
   meleeAtkText.fixedToCamera = true;

   // rangedAtkIcon
   rangedAtkIcon = this.game.add.sprite(400, 540, 'rangedAtkButton');
   rangedAtkIcon.fixedToCamera = true;
   rangedAtkText = game.add.text(450, 550, 'to ranged attack', {fontSize: '24px', fill: '#000'});
   rangedAtkText.fixedToCamera = true;
};

function updateHUD()
{
   // when the player uses a scalpel
   scalpelText.text = 'Scalpels: ' + scalpels;

   // when the player uses a pill
   pillText.text = 'Pills: ' + pills;

   // healthBar
   healthBar.crop.width = (playerHealth/playerMaxHealth) * healthBar.width;
};

function killHUD()
{
    healthBar.kill();
    scalpelIcon.kill();
    scalpelText.kill();
    pillIcon.kill();
    pillText.kill();
    pillButton.kill();
    pillButtonText.kill();
    meleeAtkIcon.kill();
    meleeAtkText.kill();
    rangedAtkIcon.kill();
    rangedAtkText.kill();
};
