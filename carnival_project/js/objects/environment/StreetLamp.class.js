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
        
        //Scale and position the STREETLAMP2
        STREETLAMP2.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP2.model.rotation.set(0, 0, 0);
        STREETLAMP2.model.position.set(-10, 0, -200);
        this.addObjectToGroup(STREETLAMP2.model);
        
        //Scale and position the STREETLAMP3
        STREETLAMP3.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP3.model.rotation.set(0,  1.5+ Math.PI/2, 0);
        STREETLAMP3.model.position.set(80, 0, -280);
        this.addObjectToGroup(STREETLAMP3.model);
        
        //Scale and position the STREETLAMP4
        STREETLAMP4.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP4.model.rotation.set(0, 0, 0);
        STREETLAMP4.model.position.set(-20, 0, -400);
        this.addObjectToGroup(STREETLAMP4.model);
       
        //Scale and position the STREETLAMP5
        STREETLAMP5.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP5.model.rotation.set(0, 1.5+ Math.PI/2, 0);
        STREETLAMP5.model.position.set(70, 0, -460);
        this.addObjectToGroup(STREETLAMP5.model);
       
        //Scale and position the STREETLAMP6
        STREETLAMP6.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP6.model.rotation.set(0, 0, 0);
        STREETLAMP6.model.position.set(-20, 0, -600);
        this.addObjectToGroup(STREETLAMP6.model);
       
        //Scale and position the STREETLAMP7
        STREETLAMP7.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP7.model.rotation.set(0,  1.5+ Math.PI/2, 0);
        STREETLAMP7.model.position.set(100, 0, -700);
        this.addObjectToGroup(STREETLAMP7.model);
     
        //Scale and position the STREETLAMP8
        STREETLAMP8.model.scale.set(0.3, 0.4, 0.4);
        STREETLAMP8.model.rotation.set(0, Math.PI/3, 0);
        STREETLAMP8.model.position.set(-60, 0, -800);
        this.addObjectToGroup(STREETLAMP8.model);
     

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