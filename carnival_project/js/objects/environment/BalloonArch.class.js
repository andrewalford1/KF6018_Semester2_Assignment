/**
 * A class representing a BallonArch.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
 */
class BalloonArch extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the BallonArch is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the BallonArch model.
        const BALLOONARCH = ENGINE.ObjectLoader().loadModel(
            'balloonArch',
            'glb'
        );
        
        //Scale and position the BallonArch
        BALLOONARCH.model.scale.set(0.3, 0.4, 0.4);
        BALLOONARCH.model.rotation.set(-Math.PI / 2, 0, 0);
        BALLOONARCH.model.position.set(45, 0, -100);
        this.addObjectToGroup(BALLOONARCH.model);

        /**
         * Updates the BallonArch. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //BallonArch does not need to update.
        }
    }
}