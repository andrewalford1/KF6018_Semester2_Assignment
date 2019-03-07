/**
 * A class representing a ClownBalloons.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
 */
class ClownBalloons extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the ClownBalloons is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the ClownBalloons model.
        const CLOWNBALLOONS = ENGINE.ObjectLoader().loadModel(
            'clownBalloons',
            'glb'
        );
        
        //Scale and position the ClownBalloons
        CLOWNBALLOONS.model.scale.set(3, 3, 3);
        CLOWNBALLOONS.model.rotation.set(0, 1.6+ Math.PI/2, 0);
        CLOWNBALLOONS.model.position.set(-4, 3, -30);
        this.addObjectToGroup(CLOWNBALLOONS.model);

        /**
         * Updates the ClownBalloons. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //ClownBalloons does not need to update.
        }
    }
}