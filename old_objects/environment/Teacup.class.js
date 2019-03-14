/**
 * A class representing a teacup object.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford & Zoë Irwin
 * @date 26/02/2019
 * @version 1.0 - 26/02/2019
 */
class Teacup extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the dart.
     * @param {THREE.Vector3} position - Where the dart is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the teacup model.
        const TEACUP = ENGINE.ObjectLoader().loadModel(
            'teacup_obj',
            'glb'
        );
        //Scale and position the teacup
        TEACUP.model.scale.set(0.1, 0.1, 0.1);
        TEACUP.model.rotation.set(0, 0, 0);
        TEACUP.model.position.set(-150, 0, -70);
        this.addObjectToGroup(TEACUP.model);

        /**
         * Updates the dart. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //teacups does not need to update.
        }
    }
}