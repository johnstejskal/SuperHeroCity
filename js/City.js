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


				//-----------------------------------------o
				//---- Create Buildings
				//-----------------------------------------o
				for ( var i = 0; i < 15000; i ++ ) {
					
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
                    arrBuildings.push(building);

				}
				// build the mesh
				var texture = new THREE.Texture( generateTexture() );
				texture.anisotropy = renderer.getMaxAnisotropy();
				texture.needsUpdate = true;

				var mesh = new THREE.Mesh( city, new THREE.MeshLambertMaterial( { map: texture, vertexColors: THREE.VertexColors } ) );
				scene.add( mesh );  
    
    
    
    
}



// ************************************************************************ 
// PROTOTYOPE PUBLIC PROERTIES 
// ************************************************************************ 
//Player.prototype.isPunching = false;

// ************************************************************************ 
// PROTOTYOPE PUBLIC METHODS 
// ************************************************************************ 




