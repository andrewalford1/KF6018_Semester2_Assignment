/**
 * A class representing a BalloonCover.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
 */
class BalloonCover extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the BalloonCover.
     * @param {THREE.Vector3} position - Where the BalloonCover is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the BalloonCover model.
        const BALLOONCOVER = ENGINE.ObjectLoader().loadModel(
            'balloonCover',
            'glb'
        );
        
        //Scale and position the BalloonCover
        BALLOONCOVER.model.scale.set(16, 12, 12);
        BALLOONCOVER.model.rotation.set(0, Math.PI/ 2, 0);
        BALLOONCOVER.model.position.set(-20, 0, -270);
        BALLOONCOVER.model.castShadow = true;
        BALLOONCOVER.model.receiveShadow = true;
        this.addObjectToGroup(BALLOONCOVER.model);

        /**
         * Updates the BalloonCover. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //BalloonCover does not need to update.
        }
    }
}