/**
 * A class representing a Carousel.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class Carousel extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Carousel.
     * @param {THREE.Vector3} position - Where the tent is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the Carousel model.
        const CAROUSEL = ENGINE.ObjectLoader().loadModel(
            'carousel',
            'glb'
        );
        
        //Scale and position the Carousel
        CAROUSEL.model.scale.set(0.01,0.01,0.01);
        CAROUSEL.model.rotation.set(0, 0, 0);
        CAROUSEL.model.position.set(220, 0, -40);
        this.addObjectToGroup(CAROUSEL.model);

        //[onStart] Checks if this is the very first frame of animation.
        let onStart = true;

        //[mixer] Will manage the different animations of the  model.
        let mixer = new THREE.AnimationMixer(CAROUSEL.model);

        /**
         * Updates the Carousel. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Initialise the object on the fist frame.
            if(onStart)
            {
                //If the Carousel has animations, animate it.
                if(CAROUSEL.animations)
                {
                    //Initialise the animation.
                    mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            CAROUSEL.animations,
                            CAROUSEL.animations[0].name
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