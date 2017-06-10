function HUD()
{
  // h1-h10 represent each heart
  h1 = this.game.add.sprite(32, 32, 'heart');
  h1.cropEnabled = true;
  h1.fixedToCamera = true;

  h2 = this.game.add.sprite(65, 32, 'heart');
  h2.cropEnabled = true;
  h2.fixedToCamera = true;

  h3 = this.game.add.sprite(97, 32, 'heart');
  h3.cropEnabled = true;
  h3.fixedToCamera = true;

  h4 = this.game.add.sprite(129, 32, 'heart');
  h4.cropEnabled = true;
  h4.fixedToCamera = true;

  h5 = this.game.add.sprite(161, 32, 'heart');
  h5.cropEnabled = true;
  h5.fixedToCamera = true;

  h6 = this.game.add.sprite(193, 32, 'heart');
  h6.cropEnabled = true;
  h6.fixedToCamera = true;

  h7 = this.game.add.sprite(225, 32, 'heart');
  h7.cropEnabled = true;
  h7.fixedToCamera = true;

  h8 = this.game.add.sprite(256, 32, 'heart');
  h8.cropEnabled = true;
  h8.fixedToCamera = true;

  h9 = this.game.add.sprite(288, 32, 'heart');
  h9.cropEnabled = true;
  h9.fixedToCamera = true;

  h10 = this.game.add.sprite(320, 32, 'heart');
  h10.cropEnabled = true;
  h10.fixedToCamera = true;

   // inventory displays
   // scalpels
   scalpelIcon = this.game.add.sprite(400, 25, 'scalpelIcon');
   scalpelIcon.fixedToCamera = true;
   scalpelText = game.add.text(435, 25, 'Scalpels: 0', HUDFont);
   scalpelText.fixedToCamera = true;

   // pills
   pillIcon = this.game.add.sprite(615, 25, 'pillIcon');
   pillIcon.fixedToCamera = true;
   pillText = game.add.text(650, 25, 'Pills: 0', HUDFont);
   pillText.fixedToCamera = true;

   pillButton = this.game.add.sprite(650, 540, 'pillButton');
   pillButton.fixedToCamera = true;
   pillButtonText = game.add.text(700, 550, 'to heal', HUDFont);
   pillButtonText.fixedToCamera = true;

   // attack button displays
   // melee
   meleeAtkIcon = this.game.add.sprite(25, 545, 'meleeAtkButton');
   meleeAtkIcon.fixedToCamera = true;
   meleeAtkText = game.add.text(215, 550, 'to melee attack', HUDFont);
   meleeAtkText.fixedToCamera = true;

   // rangedAtkIcon
   rangedAtkIcon = this.game.add.sprite(400, 540, 'rangedAtkButton');
   rangedAtkIcon.fixedToCamera = true;
   rangedAtkText = game.add.text(450, 550, 'to ranged attack', HUDFont);
   rangedAtkText.fixedToCamera = true;
};

function updateHUD()
{
   // when the player uses a scalpel
   scalpelText.text = 'Scalpels: ' + scalpels;

   // when the player uses a pill
   pillText.text = 'Pills: ' + pills;

}
// This updates the health on screen
function updateHealth(){

   if(playerHealth<9000){
    h10.visible=false;
   }
   else{
      h10.visible=true;
    }

   if(playerHealth<8000){
    h9.visible=false;
   }
   else{
     h9.visible=true;
   }

    if (playerHealth<7000){
     h8.visible=false;
    }
    else {
     h8.visible=true;
    }

    if(playerHealth<6000){
    h7.visible=false;
    }
    else{
      h7.visible=true;
    }

    if(playerHealth<5000){
      h6.visible=false;
    }
    else {
      h6.visible=true;
    }

    if (playerHealth<4000){
        h5.visible=false;
    }else{
        h5.visible=true;
    }

    if(playerHealth<3000){
        h4.visible=false;
    }
    else{
        h4.visible=true;
    }

    if(playerHealth<2000){
        h3.visible=false;
    }
    else{
        h3.visible=true;
    }

    if (playerHealth<1000){
        h2.visible=false;
    }
    else {
      h2.visible=true;
    }

    if (playerHealth<0){
       h1.visible=false;
    }
    else {
      h1.visible=true;
    }
}

function killHUD()
{
    h1.kill();
    h2.kill();
    h3.kill();
    h4.kill();
    h5.kill();
    h6.kill();
    h7.kill();
    h8.kill();
    h9.kill();
    h10.kill();
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
