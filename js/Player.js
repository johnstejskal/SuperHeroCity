//var PlayerArms = PlayerArms || {}
// ************************************************************************ 
// PROTOTYOPE PUBLIC PROERTIES 
// ************************************************************************ 
Player.prototype.isPunching = false;
Player.prototype.speedFX;
Player.prototype.texAnimator_speedFX;
Player.prototype.isBoosting = false;
Player.prototype.hasArms = false;

function Player()
{
    //Left Hand Sprite
    var handMaterial = new THREE.SpriteMaterial( { map: texArmL, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.center } );
    var armLSprite = new THREE.Sprite( handMaterial );
    this.armLSprite = armLSprite;
    this.armLSprite.scale.set(676, 439, 1);
    this.armLSprite.position.set( window.innerWidth/2- 400, window.innerHeight+500 , 0 );
    scene.add( this.armLSprite );
 
     //Right Hand Sprite
    var handMaterialR = new THREE.SpriteMaterial( { map: texArmR, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.center } );
    var armRSprite = new THREE.Sprite( handMaterialR );
    this.armRSprite = armRSprite;
    this.armRSprite.scale.set(676, 439, 1);
    this.armRSprite.position.set(window.innerWidth/2+400, window.innerHeight+500, 0 );
    scene.add(  this.armRSprite );  

    this.animateSway();  
    
    /*
    this.texAnimator_speedFX = new TextureAnimator( texSpeedFX, 2, 1, 2, 60 ); // texture, #horiz, #vert, #total, duration.
    var speedFXMaterial = new THREE.MeshBasicMaterial( { map: texSpeedFX, side:THREE.DoubleSide, transparent: true, opacity: 1 } );
    var speedFXGeometry = new THREE.PlaneGeometry(30, 10, 1, 1);
    this.speedFX = new THREE.Mesh(speedFXGeometry, speedFXMaterial);
    this.speedFX.scale.x = this.speedFX.scale.y = .1;
    this.speedFX.position.set(0.02,-.59,-3);  
    this.speedFX.material.opacity = 1;   
    camera.add(this.speedFX)
     */
    
}


// ************************************************************************ 
// PROTOTYOPE PUBLIC METHODS 
// ************************************************************************ 
Player.prototype.update = function(){

    //this.texAnimator_speedFX.update(1000 * delta);
    //this.texAnimator_speedFX.update(1000 * delta);
   // this.armRSprite.position.y =(currSpeed/maxSpeed * 1)// * (window.innerHeight-100)
}

//---------------------------------------o
// Animate Hands Swaying
//---------------------------------------o
Player.prototype.animateSway = function(){
    
    var _this = this;
    console.log("animateSway")
    
    var posX = this.armLSprite.position.x
   
    TweenMax.to(this.armLSprite.position, .2, {x:window.innerWidth/2- 400 - 10, ease:Cubic.easeInOut, yoyo:true, repeat:-1});     
    TweenMax.to(this.armRSprite.position, .2, {x:window.innerWidth/2+ 400 + 10, ease:Cubic.easeInOut, yoyo:true, repeat:-1});     
     
}

//---------------------------------------o
// Animate Punch
//---------------------------------------o
Player.prototype.punch = function()
{
  
    var _this = this;  
    
    if(this.isPunching)
    return;
                
    this.isPunching = true;
                 
    document.getElementById('snd_punch').play();

    TweenLite.to(this.armLSprite.position, .2, {y:this.armLSprite.position.y - 50, ease:Back.easeInOut, onComplete:function(){
        TweenLite.to(_this.armLSprite.position, .5, {y:_this.armLSprite.position.y + 50})
    }}); 
    
    TweenLite.to(this.armRSprite.position, .2, {y:this.armRSprite.position.y - 50, ease:Back.easeInOut, onComplete:function(){
        TweenLite.to(_this.armRSprite.position, .5, {y:_this.armRSprite.position.y + 50, onComplete:function(){_this.isPunching = false}})
    }}); 
                
}

//---------------------------------------o
// Show speed trail
//---------------------------------------o
Player.prototype.showSpeedFX = function()
{
    return;
    if(!this.isBoosting)
        this.isBoosting = true;
    TweenLite.to(this.speedFX.material, 2, {opacity:1}); 
                     
}

//---------------------------------------o
// Show speed trail
//---------------------------------------o
Player.prototype.hideSpeedFX = function()
{
    return;
    if(this.isBoosting)
        this.isBoosting = false;    
    TweenLite.to(this.speedFX.material, .5, {opacity:0}); 
                     
}

//---------------------------------------o
// Hide arms
//---------------------------------------o
Player.prototype.hideArms = function()
{
    if(this.hasArms)
    {
        this.hasArms = false;
   // TweenLite.killTweensOf(this.armLSprite.position)
   // TweenLite.killTweensOf(this.armRSprite.position)   
    TweenLite.to(this.armLSprite.position, 1, {y:window.innerHeight+ 500, ease:Cubic.easeInOut}); 
    TweenLite.to(this.armRSprite.position, 1, {y:window.innerHeight+ 500, ease:Cubic.easeInOut}); 
    }
                 
}

//---------------------------------------o
// Show arms
//---------------------------------------o
Player.prototype.showArms = function()
{
    if(!this.hasArms)
    {    
        this.hasArms = true;
   // TweenLite.killTweensOf(this.armLSprite.position)
   // TweenLite.killTweensOf(this.armRSprite.position)
    TweenLite.to(this.armLSprite.position, 2, {y: window.innerHeight-100, ease:Cubic.easeInOut}); 
    TweenLite.to(this.armRSprite.position, 2, {y: window.innerHeight-100, ease:Cubic.easeInOut}); 
    }              
                         
}
//---------------------------------------o
// screen resize event 
//---------------------------------------o
Player.prototype.onResize = function()
{
    console.log("player onresize");
    TweenMax.killTweensOf(this.armLSprite.position);
    TweenMax.killTweensOf(this.armRSprite.position);
    
    this.armRSprite.position.x = window.innerWidth/2+400;
    this.armLSprite.position.x = window.innerWidth/2- 400;
    
    this.animateSway()
                         
}