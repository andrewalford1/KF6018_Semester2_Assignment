/**
 * A class representing a GirlSitting.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class GirlSitting extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the GirlSitting.
     * @param {THREE.Vector3} position - Where the tent is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the GirlSitting model.
        const GIRL = ENGINE.ObjectLoader().loadModel(
            'girlSitting',
            'glb'
        );
        
        //Scale and position the GirlSitting
        GIRL.model.scale.set(0.2,0.2,0.2);
        GIRL.model.rotation.set(0,Math.PI/-2, 0);
        GIRL.model.position.set(160, 0, 30);
        this.addObjectToGroup(GIRL.model);

        //[onStart] Checks if this is the very first frame of animation.
        let onStart = true;

        //[mixer] Will manage the different animations of the  model.
        let mixer = new THREE.AnimationMixer(GIRL.model);

        /**
         * Updates the GirlSitting. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Initialise the object on the fist frame.
            if(onStart)
            {
                //If the GirlSitting has animations, animate it.
                if(GIRL.animations)
                {
                    //Initialise the animation.
                    mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            GIRL.animations,
                            GIRL.animations[0].name
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