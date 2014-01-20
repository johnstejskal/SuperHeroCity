//var PlayerArms = PlayerArms || {}

function City()
{



				// build the base geometry for each building
				var cityGeometry = new THREE.CubeGeometry( 1, 1, 1 );
				// translate the geometry to place the pivot point at the bottom instead of the center
				cityGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
				// get rid of the bottom face - it is never seen
				cityGeometry.faces.splice( 3, 1 );
				cityGeometry.faceVertexUvs[0].splice( 3, 1 );

				// change UVs for the top face
				// - it is the roof so it wont use the same texture as the side of the building
				// - set the UVs to the single coordinate 0,0. so the roof will be the same color
				//   as a floor row.
				cityGeometry.faceVertexUvs[0][2][0].set( 0, 0 );
				cityGeometry.faceVertexUvs[0][2][1].set( 0, 0 );
				cityGeometry.faceVertexUvs[0][2][2].set( 0, 0 );
				cityGeometry.faceVertexUvs[0][2][3].set( 0, 0 );

				var building = new THREE.Mesh( cityGeometry );
				var city = new THREE.Geometry();

				var light = new THREE.Color( 0xffffff );
				var shadow = new THREE.Color( 0x303050 );

    
    
    
               /* ---------- Add a cube --------------
 
            //add the geometry, this is an object that contains all the verticies and faces. pass in the size of the faces
            var geometry = new THREE.CubeGeometry(10,10,10);
 
            //create the texture by loading our image from file
            var texture = THREE.ImageUtils.loadTexture( 'images/sky-xpos.jpg' );
    
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.x = 5;
            texture.repeat.y = 5;    
    
            //set quality of the texture when it is viewed on a perspective (not essential)
            texture.anisotropy = renderer.getMaxAnisotropy();
 
            var material = new THREE.MeshBasicMaterial( { map: texture } );
            material.side = THREE.DoubleSide;

 
            //create the Mesh using the geometry and material
            var cube = new THREE.Mesh( geometry, material );
            cube.scale.set(200,200,200)
            cube.position.y = 100;
            //add the cube to the scene, defaults to coords 0,0,0 (x,y,z)
            scene.add( cube ); 
    
    
    */
                ////////////
                // SKYBox //
                ////////////
              /*  
                // axes
                var axes = new THREE.AxisHelper(100);
                scene.add( axes );
                
                var imagePrefix = "images/sky-";
                var directions  = ["xpos", "xpos", "xpos", "xpos", "xpos", "xpos"];
               // var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
                var imageSuffix = ".jpg";
                var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );	
                
                var materialArray = [];
                for (var i = 0; i < 6; i++)
                    materialArray.push( new THREE.MeshBasicMaterial({
                        map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
                        side: THREE.BackSide
                    }));
                var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
                var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
                scene.add( skyBox );
    
    */
                //--------------------o
    
				//-----------------------------------------o
				//---- Create Buildings
				//-----------------------------------------o
				for ( var i = 0; i < 11000; i ++ ) {
					
					// establish the base color for the buildingMesh
					var value = 1 - Math.random() * Math.random();
					var baseColour = new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );

 				 // set topColor/bottom vertexColors as adjustement of baseColor
					var topColour = baseColour.clone().multiply( light );
					var bottomColour = baseColour.clone().multiply( shadow );

					building.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;
					building.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
					building.rotation.y = Math.random();
					building.scale.x = building.scale.z = Math.random() * Math.random() * Math.random() * Math.random() * 50 + 15;
					building.scale.y = ( Math.random() * Math.random() * Math.random() * building.scale.x ) * 8 + 8;

					var geometry = building.geometry;

					for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {

						if ( j === 2 ) {

							geometry.faces[ j ].vertexColors = [ baseColour, baseColour, baseColour, baseColour ];

						} else {

							geometry.faces[ j ].vertexColors = [ topColour, bottomColour, bottomColour, topColour ];

						}

					}

					//mer
					THREE.GeometryUtils.merge( city, building );
                   // arrBuildings.push(building);

				}
				// build the mesh
				var texture = new THREE.Texture( generateTexture() );
				texture.anisotropy = renderer.getMaxAnisotropy();
				texture.needsUpdate = true;

				var mesh = new THREE.Mesh( city, new THREE.MeshLambertMaterial( { map: texture, vertexColors: THREE.VertexColors } ) );
				scene.add( mesh );  
    
    
    
    
}


			//---------------------------------o
			// create the window texture for city 
			//--------------------------------o
			function generateTexture() {

				// build a small canvas 32x64 and paint it in white
				var canvas = document.createElement( 'canvas' );
				canvas.width = 32;
				canvas.height = 64;

				var context = canvas.getContext( '2d' );
				// plain it in white
				context.fillStyle = '#ffffff';
				context.fillRect( 0, 0, 32, 64 );

 				 // draw the window rows - with a small noise to simulate light variations in each room
  				for ( var y = 2; y < 64; y += 2 ) {

					for ( var x = 0; x < 32; x += 2 ) {

						var value = Math.floor( Math.random() * 64 );
						context.fillStyle = 'rgb(' + [ value, value, value ].join( ',' )  + ')';
						context.fillRect( x, y, 2, 1 );
					}
				}

			  // build a bigger canvas and copy the small one in it
 			  // This is a trick to upscale the texture without filtering
				var canvas2 = document.createElement( 'canvas' );
				canvas2.width = 512;
				canvas2.height = 1024;

				var context = canvas2.getContext( '2d' );

				 // disable smoothing
				context.imageSmoothingEnabled = false;
				context.webkitImageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );
				
				// return the just built canvas2
				return canvas2;

			}

// ************************************************************************ 
// PROTOTYOPE PUBLIC PROERTIES 
// ************************************************************************ 
//Player.prototype.isPunching = false;

// ************************************************************************ 
// PROTOTYOPE PUBLIC METHODS 
// ************************************************************************ 




