// constructor
HUD.prototype = Object.create(Phaser.Group.prototype);
HUD.prototype.constructor = HUD;

// properties
var healthBar;
var scalpeIcon;
var scalpelText;
var pillIcon;
var pillText;
var pillButton;
var pillButtonText;
var meleeAtkIcon;
var meleeAtkText;
var rangedAtkIcon;
var rangedAtkText;
var playerMaxHealth = 10000;

function HUD()
{
   //healthBar
   this.load.image('healthBar', 'assets/img/healthBar.png', 256, 40);
   healthBar = this.game.add.sprite(32, 32, 'healthBar');
   healthBar.cropEnabled = true;
   healthBar.fixedToCamera = true;
      
   // inventory displays
   
   // scalpels
   this.load.image('scalpelIcon', 'assets/img/scalpelHUD.png', 32, 32);
   scalpeIcon = this.game.add.sprite(64, 64, 'scalpeIcon');
   scalpeIcon.fixedToCamera = true;
   scalpelText = game.add.text(64, 32. 'Scalpels: 0', {fontSize: '32px', fill: '#000'});
   scalpelText.fixedToCamera = true;

   // pills
   this.load.image('pillIcon', 'assets/img/pillHUD.png', 32, 32);
   pillIcon = this.game.add.sprite(96, 64, 'pillIcon');
   pillIcon.fixedToCamera = true;
   pillText = game.add.text(96, 32, 'Pills: 0', {fontSize: '32px', fill: '#000'});
   pillText.fixedToCamera = true;
   this.load.image('pillButton', 'assets/img/rButtonHUD.png', width, height);
   pillButton = this.game.add.sprite(96, 590, 'pillButton');
   pillButton.fixedToCamera = true;
   pillButtonText = game.add.text(96, 580, 'Press R to heal', {fontSize: '32px', fill: '#000'});
   pillButtonText.fixedToCamera = true;

   // attack button displays
   
   // melee 
   this.load.image('meleeAtkButton', 'assets/img/spaceBarHUD.png', 185, 43);
   meleeAtkIcon = this.game.add.sprite(32, 590, 'meleeAtkButton');
   meleeAtkIcon.fixedToCamera = true;
   meleeAtkText = game.add.text(32. 580, 'Press SPACE to melee attack', {fontSize: '32px', fill: '#000'});
   meleeAtkText.fixedToCamera = true;

   // rangedAtkIcon
   this.load.image('rangedAtkButton', 'assets/img/eButtonHUD.png', 32, 32);
   rangedAtkIcon = this.game.add.sprite(64, 590, 'rangedAtkButton')';
   rangedAtkIcon.fixedToCamera = true;
   rangedAtkText = game.add.text(64, 580, 'Press E to ranged attack' {fontSize: '32px', fill: '#000'});
   rangedAtkText.fixedToCamera
}

HUD.prototype.update = function()
{
   // when the player uses a scalpel
   scalpelText = 'Scalpels: ' + scalpels;
   
   // when the player uses a pill
   pillText = 'Pills: ' + pills;
   
   // healthBar   
   healthBar.crop.width = (playerHealth/playerMaxHealth) * healthBar.width;  
}