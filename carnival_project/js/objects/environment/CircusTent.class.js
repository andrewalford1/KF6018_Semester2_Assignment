/**
 * A class representing a circus tent.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford & Zoë Irwin
 * @date 23/02/2019
 * @version 1.0 - 23/02/2019
 */
class CircusTent extends ENGINE.OBJECTS.ClassicObject
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
        const TENT = ENGINE.ObjectLoader().loadModel(
            'circus_tent',
            'glb'
        );
        //Scale and position the tent
        TENT.model.scale.set(0.1, 0.1, 0.1);
        TENT.model.rotation.set(-Math.PI / 2, 0, 0);
        TENT.model.position.set(0, 0, -200);
        this.addObjectToGroup(TENT.model);

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
