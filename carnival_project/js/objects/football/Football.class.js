/**
 * A class representing a football object.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford & Zoë Irwin
 * @date 26/02/2019
 * @version 1.0 - 26/02/2019
 */
class Football extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the dart.
     * @param {THREE.Vector3} position - Where the dart is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the dart model.
        const FOOTBALL = ENGINE.ObjectLoader().loadModel(
            'football_obj',
            'glb'
        );
        //Scale and position the dart
        FOOTBALL.model.scale.set(0.005, 0.005, 0.005);
        FOOTBALL.model.rotation.set(0, 0, 0);
        FOOTBALL.model.position.set(10, 0, 0);
        this.addObjectToGroup(FOOTBALL.model);

        /**
         * Updates the dart. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Circus dart does not need to update.
        }
    }
}