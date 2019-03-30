/**
 * A class representing a StreetLamp.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
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
        
        //Scale and position the STREETLAMP
        STREETLAMP.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP.model.rotation.set(0, 1.5+ Math.PI/2, 0);
        STREETLAMP.model.position.set(100, 0, -65);
        this.addObjectToGroup(STREETLAMP.model);
        
        //Point light for the street lamp 1
        let pointLight = new THREE.PointLight( 0xffffff, 0.4, 0, 2 );
        pointLight.position.set( 98, 57, -65 );

        //Spot light for the street lamp 1
        let streetLight = new THREE.SpotLight(0xFFFBEF, 2, 200, 0.9, 0.4, 2);
        streetLight.position.set( 98, 57, -65 );
        streetLight.target.position.set(98, 0, -65 );
        streetLight.castShadow = true;
        
        streetLight.shadow.mapSize.width = 1024;
        streetLight.shadow.mapSize.height = 1024;
        streetLight.shadow.camera.near = 500;
        streetLight.shadow.camera.far = 4000;
        streetLight.shadow.camera.fov = 30;
        

        //Scale and position the STREETLAMP2
        STREETLAMP2.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP2.model.rotation.set(0, 0, 0);
        STREETLAMP2.model.position.set(-10, 0, -200);
        this.addObjectToGroup(STREETLAMP2.model);

        //Point light for the street lamp 2
        let pointLight2 = new THREE.PointLight( 0xffffff, 0.4, 0, 2 );
        pointLight2.position.set( -10, 57, -200 );

        //Spot light for the street lamp 2
        let streetLight2 = new THREE.SpotLight(0xFFFBEF, 2, 200, 0.9, 0.4, 2);
        streetLight2.position.set(-8, 57, -200);
        streetLight2.target.position.set(-8, 0, -200);
        streetLight2.castShadow = true;
        
        streetLight2.shadow.mapSize.width = 1024;
        streetLight2.shadow.mapSize.height = 1024;
        streetLight2.shadow.camera.near = 500;
        streetLight2.shadow.camera.far = 4000;
        streetLight2.shadow.camera.fov = 30;
        
        
        //Scale and position the STREETLAMP3
        STREETLAMP3.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP3.model.rotation.set(0,  1.5+ Math.PI/2, 0);
        STREETLAMP3.model.position.set(80, 0, -280);
        this.addObjectToGroup(STREETLAMP3.model);

        //Spot light for the street lamp 3
        let streetLight3 = new THREE.SpotLight(0xFFFBEF, 2, 200, 0.9, 0.4, 2);
        streetLight3.position.set( 78, 57, -280 );
        streetLight3.target.position.set( 78, 0, -280 );
        streetLight3.castShadow = true;
        
        streetLight3.shadow.mapSize.width = 1024;
        streetLight3.shadow.mapSize.height = 1024;
        streetLight3.shadow.camera.near = 500;
        streetLight3.shadow.camera.far = 4000;
        streetLight3.shadow.camera.fov = 30;
        
        
        //Scale and position the STREETLAMP4
        STREETLAMP4.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP4.model.rotation.set(0, 0, 0);
        STREETLAMP4.model.position.set(-20, 0, -400);
        this.addObjectToGroup(STREETLAMP4.model);

        //Spot light for the street lamp 4
        let streetLight4 = new THREE.SpotLight(0xFFFBEF, 2, 200, 0.9, 0.4, 2);
        streetLight4.position.set( -18, 57, -400 );
        streetLight4.target.position.set( -18, 0, -400 );
        streetLight4.castShadow = true;
        
        streetLight4.shadow.mapSize.width = 1024;
        streetLight4.shadow.mapSize.height = 1024;
        streetLight4.shadow.camera.near = 500;
        streetLight4.shadow.camera.far = 4000;
        streetLight4.shadow.camera.fov = 30;
        
       
        //Scale and position the STREETLAMP5
        STREETLAMP5.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP5.model.rotation.set(0, 1.5+ Math.PI/2, 0);
        STREETLAMP5.model.position.set(70, 0, -460);
        this.addObjectToGroup(STREETLAMP5.model);
        
        //Point light for the street lamp 5
        let pointLight5 = new THREE.PointLight( 0xffffff, 0.4, 0, 2 );
        pointLight5.position.set( 68, 57, -460 );

        //Spot light for the street lamp 5
        let streetLight5 = new THREE.SpotLight(0xFFFBEF, 2, 200, 0.9, 0.4, 2);
        streetLight5.position.set( 68, 57, -460 );
        streetLight5.target.position.set( 68, 0, -460 );
        streetLight5.castShadow = true;
        
        streetLight5.shadow.mapSize.width = 1024;
        streetLight5.shadow.mapSize.height = 1024;
        streetLight5.shadow.camera.near = 500;
        streetLight5.shadow.camera.far = 4000;
        streetLight5.shadow.camera.fov = 30;
        
       
        //Scale and position the STREETLAMP6
        STREETLAMP6.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP6.model.rotation.set(0, 0, 0);
        STREETLAMP6.model.position.set(-20, 0, -600);
        this.addObjectToGroup(STREETLAMP6.model);

        //Spot light for the street lamp 6
        let streetLight6 = new THREE.SpotLight(0xFFFBEF, 2, 200, 0.9, 0.4, 2);
        streetLight6.position.set( -18, 57, -600 );
        streetLight6.target.position.set( -18, 0, -600 );
        streetLight6.castShadow = true;
        
        streetLight6.shadow.mapSize.width = 1024;
        streetLight6.shadow.mapSize.height = 1024;
        streetLight6.shadow.camera.near = 500;
        streetLight6.shadow.camera.far = 4000;
        streetLight6.shadow.camera.fov = 30;
        
       
        //Scale and position the STREETLAMP7
        STREETLAMP7.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP7.model.rotation.set(0,  1.5+ Math.PI/2, 0);
        STREETLAMP7.model.position.set(100, 0, -700);
        this.addObjectToGroup(STREETLAMP7.model);

        //Spot light for the street lamp 7
        let streetLight7 = new THREE.SpotLight(0xFFFBEF, 2, 200, 0.9, 0.4, 2);
        streetLight7.position.set( 98, 57, -700 );
        streetLight7.target.position.set( 98, 0, -700 );
        streetLight7.castShadow = true;
        
        streetLight7.shadow.mapSize.width = 1024;
        streetLight7.shadow.mapSize.height = 1024;
        streetLight7.shadow.camera.near = 500;
        streetLight7.shadow.camera.far = 4000;
        streetLight7.shadow.camera.fov = 30;
        
     
        //Scale and position the STREETLAMP8
        STREETLAMP8.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP8.model.rotation.set(0, Math.PI/3, 0);
        STREETLAMP8.model.position.set(-60, 0, -800);
        this.addObjectToGroup(STREETLAMP8.model);
        
        //Point light for the street lamp 8
        let pointLight8 = new THREE.PointLight( 0xffffff, 0.4, 0, 2 );
        pointLight8.position.set( -58, 57, -800 );

        //Spot light for the street lamp 8
        let streetLight8 = new THREE.SpotLight(0xFFFBEF, 2, 200, 0.9, 0.4, 2);
        streetLight8.position.set( -58, 57, -800 );
        streetLight8.target.position.set( -58,  0, -800 );
        streetLight8.castShadow = true;
        
        streetLight8.shadow.mapSize.width = 1024;
        streetLight8.shadow.mapSize.height = 1024;
        streetLight8.shadow.camera.near = 500;
        streetLight8.shadow.camera.far = 4000;
        streetLight8.shadow.camera.fov = 30;
        
        
        //Add point light, spot light and the target of the spot light to the scene
        this.addObjectToGroup( pointLight );
        this.addObjectToGroup( streetLight );
        this.addObjectToGroup( streetLight.target );

        this.addObjectToGroup( pointLight2 );
        this.addObjectToGroup( streetLight2 );
        this.addObjectToGroup( streetLight2.target );

        this.addObjectToGroup( streetLight3 );
        this.addObjectToGroup( streetLight3.target );

        this.addObjectToGroup( streetLight4 );
        this.addObjectToGroup( streetLight4.target );

        this.addObjectToGroup( pointLight5 );
        this.addObjectToGroup( streetLight5 );
        this.addObjectToGroup( streetLight5.target );

        this.addObjectToGroup( streetLight6 );
        this.addObjectToGroup( streetLight6.target );

        this.addObjectToGroup( streetLight7 );
        this.addObjectToGroup( streetLight7.target );
        
        this.addObjectToGroup( pointLight8 );
        this.addObjectToGroup( streetLight8 );
        this.addObjectToGroup( streetLight8.target );

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
