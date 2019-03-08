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
        
        //Intensity of the point lights
        const intensity = 0.25;

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
        let pointLight = new THREE.PointLight( 0xffffff, intensity, 0, 2 );
        pointLight.position.set( 98, 57, -65 );
        
        //Scale and position the STREETLAMP2
        STREETLAMP2.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP2.model.rotation.set(0, 0, 0);
        STREETLAMP2.model.position.set(-10, 0, -200);
        this.addObjectToGroup(STREETLAMP2.model);
        
        //Point light for the street lamp 2
        let pointLight2 = new THREE.PointLight( 0xffffff, intensity, 0, 2 );
        pointLight2.position.set( -8, 57, -200 );
        
        //Scale and position the STREETLAMP3
        STREETLAMP3.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP3.model.rotation.set(0,  1.5+ Math.PI/2, 0);
        STREETLAMP3.model.position.set(80, 0, -280);
        this.addObjectToGroup(STREETLAMP3.model);
        
        //Point light for the street lamp 3
        let pointLight3 = new THREE.PointLight( 0xffffff, intensity, 0, 2 );
        pointLight3.position.set( 78, 57, -280 );
        
        //Scale and position the STREETLAMP4
        STREETLAMP4.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP4.model.rotation.set(0, 0, 0);
        STREETLAMP4.model.position.set(-20, 0, -400);
        this.addObjectToGroup(STREETLAMP4.model);
        
        //Point light for the street lamp 4
        let pointLight4 = new THREE.PointLight( 0xffffff, intensity, 0, 2 );
        pointLight4.position.set( -18, 57, -400 );
       
        //Scale and position the STREETLAMP5
        STREETLAMP5.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP5.model.rotation.set(0, 1.5+ Math.PI/2, 0);
        STREETLAMP5.model.position.set(70, 0, -460);
        this.addObjectToGroup(STREETLAMP5.model);
        
        //Point light for the street lamp 5
        let pointLight5 = new THREE.PointLight( 0xffffff, intensity, 0, 2 );
        pointLight5.position.set( 68, 57, -460 );
       
        //Scale and position the STREETLAMP6
        STREETLAMP6.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP6.model.rotation.set(0, 0, 0);
        STREETLAMP6.model.position.set(-20, 0, -600);
        this.addObjectToGroup(STREETLAMP6.model);
        
        //Point light for the street lamp 6
        let pointLight6 = new THREE.PointLight( 0xffffff, intensity, 0, 2 );
        pointLight6.position.set( -18, 57, -600 );
       
        //Scale and position the STREETLAMP7
        STREETLAMP7.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP7.model.rotation.set(0,  1.5+ Math.PI/2, 0);
        STREETLAMP7.model.position.set(100, 0, -700);
        this.addObjectToGroup(STREETLAMP7.model);
        
        //Point light for the street lamp 7
        let pointLight7 = new THREE.PointLight( 0xffffff, intensity, 0, 2 );
        pointLight7.position.set( 98, 57, -700 );
     
        //Scale and position the STREETLAMP8
        STREETLAMP8.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP8.model.rotation.set(0, Math.PI/3, 0);
        STREETLAMP8.model.position.set(-60, 0, -800);
        this.addObjectToGroup(STREETLAMP8.model);
        
        //Point light for the street lamp 8
        let pointLight8 = new THREE.PointLight( 0xffffff, intensity, 0, 2 );
        pointLight8.position.set( -58, 57, -800 );
        
        //Add point light to the scene
        this.addObjectToGroup( pointLight );
        this.addObjectToGroup( pointLight2 );
        this.addObjectToGroup( pointLight3 );
        this.addObjectToGroup( pointLight4 );
        this.addObjectToGroup( pointLight5 );
        this.addObjectToGroup( pointLight6 );
        this.addObjectToGroup( pointLight7 );
        this.addObjectToGroup( pointLight8 );

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
