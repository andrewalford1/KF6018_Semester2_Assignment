/**
 * A class representing a Jack.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 -05/03/2019
 */
class Jack extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Jack.
     * @param {THREE.Vector3} position - Where the Jack is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the Jack model.
        const JACK = ENGINE.ObjectLoader().loadModel(
            'Jack',
            'glb'
        );
        
        //Scale and position the Jack
        JACK.model.scale.set(2, 2, 2);
        JACK.model.rotation.set(-Math.PI / 2,0, 0);
        JACK.model.position.set(-100, 0, 0);
        this.addObjectToGroup(JACK.model);

        /**
         * Updates the Jack. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Jack not need to update.
        }
    }
}