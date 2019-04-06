/**
 * A class representing a StreetLamp.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin and Ana-Sabina Irimia
 * @date 30/03/2019
 * @version 5.0 - 30/03/2019
 */
class StreetLamp extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the STREETLAMP is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        let numberOfStreetLights = 8;
        let StreetLamp = [];
        let once = true;
        let streetLightNumber = 8;
        let streetLight = [];

        for(let i=0; i<numberOfStreetLights; i++){
                //Add the STREETLAMP model.
                StreetLamp.push(ENGINE.ObjectLoader().loadModel(
                                'streetLamp',
                                'glb'
                                ));
                StreetLamp[i].model.scale.set(0.3, 0.4, 0.4);
                this.addObjectToGroup(StreetLamp[i].model);
                //Point light for the street lamps
                streetLight.push(new THREE.PointLight( 0xFFFBEF, 2.5, 130, 1));
                //Adjusting the shadow casted by the spot light
                streetLight[i].shadow.mapSize.width = 1024;
                streetLight[i].shadow.mapSize.height = 1024;
                streetLight[i].shadow.camera.near = 20;
                streetLight[i].shadow.camera.far = 4000;
                streetLight[i].shadow.camera.fov = 30;
                this.addObjectToGroup( streetLight[i] );
        }
        

        //Scale and position the STREETLAMP
        StreetLamp[0].model.rotation.set(0, 1.5+ Math.PI/2, 0);
        StreetLamp[0].model.position.set(100, 0, -65);
        //Position of the street light for the street lamp 1
        streetLight[0].position.set( 100, 57, -65 );        

        //Scale and position the STREETLAMP2
        StreetLamp[1].model.rotation.set(0, 0, 0);
        StreetLamp[1].model.position.set(-10, 0, -200);
        //Position of the street light for the street lamp 2
        streetLight[1].position.set(-8, 57, -200);
        
        
        //Scale and position the STREETLAMP3
        StreetLamp[2].model.rotation.set(0,  1.5+ Math.PI/2, 0);
        StreetLamp[2].model.position.set(80, 0, -280);
        //Position of the street light for the street lamp 3
        streetLight[2].position.set( 78, 57, -280 );

        //Scale and position the STREETLAMP4
        StreetLamp[3].model.rotation.set(0, 0, 0);
        StreetLamp[3].model.position.set(-20, 0, -400);
        //Position of the street light for the street lamp 4
        streetLight[3].position.set( -18, 57, -400 );
       
        //Scale and position the STREETLAMP5
        StreetLamp[4].model.rotation.set(0, 1.5+ Math.PI/2, 0);
        StreetLamp[4].model.position.set(70, 0, -460);
        //Position of the street light for the street lamp 5
        streetLight[4].position.set( 68, 57, -460 );     
       
        //Scale and position the STREETLAMP6
        StreetLamp[5].model.rotation.set(0, 0, 0);
        StreetLamp[5].model.position.set(-20, 0, -600);
        //Position of the street light for the street lamp 6
        streetLight[5].position.set( -18, 57, -600 );
       
        //Scale and position the STREETLAMP7
        StreetLamp[6].model.rotation.set(0,  1.5+ Math.PI/2, 0);
        StreetLamp[6].model.position.set(100, 0, -700);
        //Position of the street light for the street lamp 7
        streetLight[6].position.set( 98, 57, -700 );
        
        //Scale and position the STREETLAMP8
        StreetLamp[7].model.rotation.set(0, Math.PI/3, 0);
        StreetLamp[7].model.position.set(-60, 0, -800);
        //Position of the street light for the street lamp 8
        streetLight[7].position.set( -58, 57, -800 );


        /**
         * Updates the STREETLAMP. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
  /**
              if(once) {
                once = false;
                let scene = StreetLamp.children[0];
                //Make the Terrain be able to receive and cast shadows 
                //from the other models in the environment.
                //Search though the object tree and change the material of every mesh.
                if(scene) {
                    let object = scene.children[0];
                    if(object) {
                        let meshes = object.children;

                        //Change the material of every mesh.
                        meshes.forEach(mesh => {
                            mesh.castShadow = true;
                            mesh.receiveShadow = true;
                        });
                    }
                }
            }//end of if(once) 
            */   
        }//end of this.update
    }//end of constructor
}//end of StreetLamp()