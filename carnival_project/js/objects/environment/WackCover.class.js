/**
 * A class representing a WackCover.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
 */
class WackCover extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the WackCover.
     * @param {THREE.Vector3} position - Where the WackCover is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the WackCover model.
        const WACKCOVER = ENGINE.ObjectLoader().loadModel(
            'wackCover',
            'glb'
        );
        
        //Scale and position the WackCover
        WACKCOVER.model.scale.set(12, 12, 12);
        WACKCOVER.model.rotation.set(0, Math.PI/ 2, 0);
        WACKCOVER.model.position.set(-20, 0, -220);
        this.addObjectToGroup(WACKCOVER.model);

        /**
         * Updates the WackCover. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //WackCover does not need to update.
        }
    }
}