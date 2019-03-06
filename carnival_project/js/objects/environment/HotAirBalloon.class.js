/**
 * A class representing a HotAirBalloon
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class HotAirBalloon extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the HotAirBalloon is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the HotAirBalloon model.
        const AIRBALLOON = ENGINE.ObjectLoader().loadModel(
            'airballoon',
            'glb'
        );
        
        //Scale and position the HotAirBalloon
        AIRBALLOON.model.scale.set(5, 5, 5);
        AIRBALLOON.model.rotation.set(0, 0, 0);
        AIRBALLOON.model.position.set(-50, 100, -750);
        this.addObjectToGroup(AIRBALLOON.model);

        /**
         * Updates the HotAirBalloon. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //HotAirBalloon does not need to update.
        }
    }
}
