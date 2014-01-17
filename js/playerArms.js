//var PlayerArms = PlayerArms || {}

function Player()
{
        //Left Hand Sprite
        var handMaterial = new THREE.SpriteMaterial( { map: texArmL, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.center } );
				var armLSprite = new THREE.Sprite( handMaterial );
                this.armLSprite = armLSprite;
				this.armLSprite.scale.set(676, 439, 1);
				this.armLSprite.position.set( window.innerWidth/2- 400, window.innerHeight-100 , 0 );
				scene.add( this.armLSprite );
 
    //Right Hand Sprite
 				var handMaterialR = new THREE.SpriteMaterial( { map: texArmR, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.center } );
				var armRSprite = new THREE.Sprite( handMaterialR );
                this.armRSprite = armRSprite;
				armRSprite.scale.set(676, 439, 1);
				armRSprite.position.set(window.innerWidth/2+400, window.innerHeight-100, 0 );
				scene.add( armRSprite );  
    
    
                
              //  this.myVar = "cool";
                this.animateSway();  
    
              
				this.texAnimator_speedFX = new TextureAnimator( texSpeedFX, 2, 1, 2, 60 ); // texture, #horiz, #vert, #total, duration.
				var speedFXMaterial = new THREE.MeshBasicMaterial( { map: texSpeedFX, side:THREE.DoubleSide, transparent: true, opacity: 1 } );
				var speedFXGeometry = new THREE.PlaneGeometry(30, 10, 1, 1);
				this.speedFX = new THREE.Mesh(speedFXGeometry, speedFXMaterial);
				this.speedFX.scale.x = this.speedFX.scale.y = .1;
				//scene.add(this.speedFX)
                this.speedFX.position.set(0.02,-.59,-3);  
				camera.add(this.speedFX);
				this.speedFX.material.opacity = 1;    
    
                TweenLite.to(this.speedFX.material, 2, {opacity:0}); 

}



// ************************************************************************ 
// PROTOTYOPE PUBLIC PROERTIES 
// ************************************************************************ 
Player.prototype.isPunching = false;
Player.prototype.speedFX;
Player.prototype.texAnimator_speedFX;
Player.prototype.isBoosting = false;

// ************************************************************************ 
// PROTOTYOPE PUBLIC METHODS 
// ************************************************************************ 
Player.prototype.update = function(){

this.texAnimator_speedFX.update(1000 * delta);
 
    
   // this.armRSprite.position.y =(currSpeed/maxSpeed * 1)// * (window.innerHeight-100)
}

//---------------------------------------o
// Animate Hands Swaying
//---------------------------------------o
Player.prototype.animateSway = function(){
    var _this = this;
    console.log("animateSway")
            
        //animate left hand
         var armLTween_position = { x: this.armLSprite.position.x };
         var armLTween_target = { x: this.armLSprite.position.x - 5 };
        var armLTween = new TWEEN.Tween(armLTween_position)
        .to(armLTween_target, 100)
        .onUpdate(function()
        {
        _this.armLSprite.position.x = armLTween_position.x;
        })
        .repeat( Infinity )
        .delay( 100 )
        .yoyo( true )
        .start();     
    
    
        //animate right hand
        var armRTween_position = { x: this.armRSprite.position.x };
        var armRTween_target = { x: this.armRSprite.position.x - 5 };
        var armRTween = new TWEEN.Tween(armRTween_position)
        .to(armRTween_target, 100)
        .onUpdate(function()
        {
            _this.armRSprite.position.x = armRTween_position.x;
        })
        .repeat( Infinity )
        .yoyo( true )
        .start();      
    
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
                
                console.log("punching");   
                 document.getElementById('snd_punch').play();
                //-----------------------------------o
                //--------Tween L arm
                //-----------------------------------o
    
                TweenLite.to(this.armLSprite.position, .5, {y:this.armLSprite.position.y - 50, ease:Back.easeInOut, onComplete:function(){
                
                 TweenLite.to(_this.armLSprite.position, .5, {y:_this.armLSprite.position.y + 50})
                }}); 
    
    
                TweenLite.to(this.armRSprite.position, .5, {y:this.armRSprite.position.y - 50, ease:Back.easeInOut, onComplete:function(){
                
                 TweenLite.to(_this.armRSprite.position, .5, {y:_this.armRSprite.position.y + 50, onComplete:function(){_this.isPunching = false}})
                
                
                }}); 
    /*
                var armTween_position = { y: this.armLSprite.position.y };
                var armTween_target = { y: this.armLSprite.position.y - 50 };
                var armTween = new TWEEN.Tween(armTween_position)
                .to(armTween_target, 600)
                .delay(50)
                .onUpdate(function()
                 {
                 _this.armLSprite.position.y = armTween_position.y;
                 })
                 .onComplete(function() 
                 {
                    armTween_position = { y: _this.armLSprite.position.y };
                    armTween_target = { y: _this.armLSprite.position.y + 50 };
                    armTween = new TWEEN.Tween(armTween_position)    
                     .to(armTween_target, 400)  
                     .onUpdate(function()
                     {
                    
                     _this.armLSprite.position.y = armTween_position.y;
                     })
                    .start();      
                 })  
                .easing(TWEEN.Easing.Elastic.Out)
                .start(); 
                */

               /* var armRTween_position = { y: this.armRSprite.position.y };
                var armRTween_target = { y: this.armRSprite.position.y - 50 };
                var armRTween = new TWEEN.Tween(armRTween_position)
                .to(armRTween_target, 600)
                .onUpdate(function()
                 {
                 _this.armRSprite.position.y = armRTween_position.y;
                 })
                 .onComplete(function() 
                 {
                    armRTween_position = { y: _this.armRSprite.position.y };
                    armRTween_target = { y: _this.armRSprite.position.y + 50 };
                    armRTween = new TWEEN.Tween(armRTween_position)    
                     .to(armRTween_target, 400)  
                     .onUpdate(function()
                     {
                     _this.armRSprite.position.y = armRTween_position.y;
                     })
                    .onComplete(function(){_this.isPunching = false})
                    .start();  
                    
                 })  

                .easing(TWEEN.Easing.Elastic.Out)
                .start(); 
                */
                
                
}

//---------------------------------------o
// Show speed trail
//---------------------------------------o
Player.prototype.showSpeedFX = function()
{
if(!this.isBoosting)
    this.isBoosting = true;
TweenLite.to(this.speedFX.material, 2, {opacity:1}); 
                 
                 
                     
}

//---------------------------------------o
// Show speed trail
//---------------------------------------o
Player.prototype.hideSpeedFX = function()
{
if(this.isBoosting)
    this.isBoosting = false;    
TweenLite.to(this.speedFX.material, .5, {opacity:0}); 

                 
                 
                     
}