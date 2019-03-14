/**
 * A class representing a MoreBalloons.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
 */
class MoreBalloons extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the MoreBalloons is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the MoreBalloons model.
        const MOREBALLOONS = ENGINE.ObjectLoader().loadModel(
            'moreBalloons',
            'glb'
        );
        
        //Scale and position the MoreBalloons
        MOREBALLOONS.model.scale.set(1, 1, 1);
        MOREBALLOONS.model.rotation.set(0, Math.PI/ -2, 0);
        MOREBALLOONS.model.position.set(-220, 0, -180);
        this.addObjectToGroup(MOREBALLOONS.model);

        /**
         * Updates the MoreBalloons. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //MoreBalloons does not need to update.
        }
    }
}