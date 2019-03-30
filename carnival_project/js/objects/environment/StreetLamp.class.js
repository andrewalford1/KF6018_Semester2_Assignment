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

        //Add the STREETLAMP model.
        const STREETLAMP = ENGINE.ObjectLoader().loadModel(
            'streetLamp',
            'glb'
        );
        const STREETLAMP2 = ENGINE.ObjectLoader().loadModel(
            'streetLamp',
            'glb'
        );
        const STREETLAMP3 = ENGINE.ObjectLoader().loadModel(
            'streetLamp',
            'glb'
        );
        const STREETLAMP4 = ENGINE.ObjectLoader().loadModel(
            'streetLamp',
            'glb'
        );
        const STREETLAMP5 = ENGINE.ObjectLoader().loadModel(
            'streetLamp',
            'glb'
        );
        const STREETLAMP6 = ENGINE.ObjectLoader().loadModel(
            'streetLamp',
            'glb'
        );
        const STREETLAMP7 = ENGINE.ObjectLoader().loadModel(
            'streetLamp',
            'glb'
        );
        const STREETLAMP8 = ENGINE.ObjectLoader().loadModel(
            'streetLamp',
            'glb'
        );

        let pointLightNumber = 4;
        let spotLightNumber = 8;
        let pointLight = [];
        let spotLight = [];
        //For loop to create the point lights to eluminate the scene
        for(let p = 0; p < pointLightNumber; p++){
                pointLight.push(new THREE.PointLight( 0xffffff, 0.6, 0, 2 ));
                pointLight[p].castShadow = true;
                pointLight[p].shadow.mapSize.width = 1024;
                pointLight[p].shadow.mapSize.height = 1024;
                this.addObjectToGroup( pointLight[p] );
        }
        //For loop to create the spot lights for the street lamps
        for(let s = 0; s < spotLightNumber; s++){
                //Spot light for the street lamps
                spotLight.push(new THREE.SpotLight(0xFFFBEF, 2, 200, 0.9, 0.4, 2));
                spotLight[s].castShadow = true;
                //Adjusting the shadow casted by the spot light
                spotLight[s].shadow.mapSize.width = 1024;
                spotLight[s].shadow.mapSize.height = 1024;
                spotLight[s].shadow.camera.near = 500;
                spotLight[s].shadow.camera.far = 4000;
                spotLight[s].shadow.camera.fov = 30;
                this.addObjectToGroup( spotLight[s] );
        }
        
        //Scale and position the STREETLAMP
        STREETLAMP.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP.model.rotation.set(0, 1.5+ Math.PI/2, 0);
        STREETLAMP.model.position.set(100, 0, -65);
        STREETLAMP.model.castShadow = true;
        this.addObjectToGroup(STREETLAMP.model);
        
        //Position of the point light for the street lamp 1
        pointLight[0].position.set( 98, 57, -65 );
        //Position of the spot light for the street lamp 1
        spotLight[0].position.set( 98, 57, -65 );
        spotLight[0].target.position.set(98, 0, -65 );        

        //Scale and position the STREETLAMP2
        STREETLAMP2.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP2.model.rotation.set(0, 0, 0);
        STREETLAMP2.model.position.set(-10, 0, -200);
        STREETLAMP2.model.castShadow = true;
        this.addObjectToGroup(STREETLAMP2.model);

        //Position of the point light for the street lamp 2
        pointLight[1].position.set( -10, 57, -200 );
        //Position of the spot light for the street lamp 2
        spotLight[1].position.set(-8, 57, -200);
        spotLight[1].target.position.set(-8, 0, -200);
        
        
        //Scale and position the STREETLAMP3
        STREETLAMP3.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP3.model.rotation.set(0,  1.5+ Math.PI/2, 0);
        STREETLAMP3.model.position.set(80, 0, -280);
        STREETLAMP3.model.castShadow = true;
        this.addObjectToGroup(STREETLAMP3.model);

        //Position of the spot light for the street lamp 3
        spotLight[2].position.set( 78, 57, -280 );
        spotLight[2].target.position.set( 78, 0, -280 );

        //Scale and position the STREETLAMP4
        STREETLAMP4.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP4.model.rotation.set(0, 0, 0);
        STREETLAMP4.model.position.set(-20, 0, -400);
        STREETLAMP4.model.castShadow = true;
        this.addObjectToGroup(STREETLAMP4.model);

        //Position of the spot light for the street lamp 4
        spotLight[3].position.set( -18, 57, -400 );
        spotLight[3].target.position.set( -18, 0, -400 );
       
        //Scale and position the STREETLAMP5
        STREETLAMP5.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP5.model.rotation.set(0, 1.5+ Math.PI/2, 0);
        STREETLAMP5.model.position.set(70, 0, -460);
        STREETLAMP5.model.castShadow = true;
        this.addObjectToGroup(STREETLAMP5.model);
        
        //Position of the point light for the street lamp 5
        pointLight[2].position.set( 68, 57, -460 );
        //Position of the spot light for the street lamp 5
        spotLight[4].position.set( 68, 57, -460 );
        spotLight[4].target.position.set( 68, 0, -460 );       
       
        //Scale and position the STREETLAMP6
        STREETLAMP6.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP6.model.rotation.set(0, 0, 0);
        STREETLAMP6.model.position.set(-20, 0, -600);
        STREETLAMP6.model.castShadow = true;
        this.addObjectToGroup(STREETLAMP6.model);

        //Position of the spot light for the street lamp 6
        spotLight[5].position.set( -18, 57, -600 );
        spotLight[5].target.position.set( -18, 0, -600 );
       
        //Scale and position the STREETLAMP7
        STREETLAMP7.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP7.model.rotation.set(0,  1.5+ Math.PI/2, 0);
        STREETLAMP7.model.position.set(100, 0, -700);
        STREETLAMP7.model.castShadow = true;
        this.addObjectToGroup(STREETLAMP7.model);

        //Position of the spot light for the street lamp 7
        spotLight[6].position.set( 98, 57, -700 );
        spotLight[6].target.position.set( 98, 0, -700 );
        
        //Scale and position the STREETLAMP8
        STREETLAMP8.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP8.model.rotation.set(0, Math.PI/3, 0);
        STREETLAMP8.model.position.set(-60, 0, -800);
        STREETLAMP8.model.castShadow = true;
        this.addObjectToGroup(STREETLAMP8.model);
        
        //Position of the point light for the street lamp 8
        pointLight[3].position.set( -58, 57, -800 );
        //Position of the spot light for the street lamp 8
        spotLight[7].position.set( -58, 57, -800 );
        spotLight[7].target.position.set( -58,  0, -800 );

        let shadowMaterial = new THREE.ShadowMaterial( { color: 0xeeeeee } );
        shadowMaterial.opacity = 0.5;
        
        //Add point light, spot light and the target of the spot light to the scene
        //Add target light for Street Lamp 1
        this.addObjectToGroup( spotLight[0].target );
        //Add light for Street Lamp 2
        this.addObjectToGroup( spotLight[1].target );
        //Add light for Street Lamp 3
        this.addObjectToGroup( spotLight[2].target );
        //Add light for Street Lamp 4
        this.addObjectToGroup( spotLight[3].target );
        //Add light for Street Lamp 5
        this.addObjectToGroup( spotLight[4].target );
        //Add light for Street Lamp 6
        this.addObjectToGroup( spotLight[5].target );
        //Add light for Street Lamp 7
        this.addObjectToGroup( spotLight[6].target );
        //Add light for Street Lamp 8
        this.addObjectToGroup( spotLight[7].target );

        /**
         * Updates the STREETLAMP. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //STREETLAMP does not need to update.
        }
    }
}