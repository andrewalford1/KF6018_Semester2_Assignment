/**
 * A class representing a Helicopter.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class Helicopter extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Helicopter.
     * @param {THREE.Vector3} position - Where the tent is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the Helicopter model.
        const HELICOPTER = ENGINE.ObjectLoader().loadModel(
            'helicopter',
            'glb'
        );
        
        //Scale and position the Helicopter
        HELICOPTER.model.scale.set(8,8,8);
        HELICOPTER.model.rotation.set(0, 0, 0);
        HELICOPTER.model.position.set(-150, 100, -750);
        this.addObjectToGroup(HELICOPTER.model);

        //[onStart] Checks if this is the very first frame of animation.
        let onStart = true;

        //[mixer] Will manage the different animations of the  model.
        let mixer = new THREE.AnimationMixer(HELICOPTER.model);

        /**
         * Updates the Helicopter. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Initialise the object on the fist frame.
            if(onStart)
            {
                //If the Helicopter has animations, animate it.
                if(HELICOPTER.animations)
                {
                    //Initialise the animation.
                    mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            HELICOPTER.animations,
                            HELICOPTER.animations[0].name
                        )).play();
                }
                //Prevent further access to this code.
                onStart = false;
            }

            //Update the animation.
            if(mixer)
            {
                mixer.update(frameTime / 2000);
            }
    }
    }
}