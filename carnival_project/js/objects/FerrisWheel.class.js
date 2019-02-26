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

        this.addObjectToGroup(FERRIS_WHEEL.model);

        /**
         * Updates the tent. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Circus Tent does not need to update.
        }
    }
}
