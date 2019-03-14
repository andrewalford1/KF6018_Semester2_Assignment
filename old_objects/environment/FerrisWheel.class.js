/**
 * A class representing a ferris wheel.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford & Zoë Irwin
 * @date 26/02/2019
 * @version 1.0 - 26/02/2019
 */
class FerrisWheel extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the tent is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the tent model.
        const FERRIS_WHEEL = ENGINE.ObjectLoader().loadModel(
            'ferris_wheel',
            'gltf'
        );
        //Scale and position the model.
        FERRIS_WHEEL.model.scale.set(7, 7, 7);
        FERRIS_WHEEL.model.position.set(150, -160, -800);
        FERRIS_WHEEL.model.rotation.y = 315 * (-Math.PI / 180);

        //Add the model to the group.
        this.addObjectToGroup(FERRIS_WHEEL.model);

        //[onStart] Checks if this is the very first frame of animation.
        let onStart = true;

        //[mixer] Will manage the different animations of the  model.
        let mixer = new THREE.AnimationMixer(FERRIS_WHEEL.model);

        /**
         * Updates the tent. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Initialise the object on the fist frame.
            if(onStart)
            {
                //If the ferris wheel has animations, animate it.
                if(FERRIS_WHEEL.animations)
                {
                    //Initialise the animation.
                    mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            FERRIS_WHEEL.animations,
                            FERRIS_WHEEL.animations[0].name
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
