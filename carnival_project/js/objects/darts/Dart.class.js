/**
 * A class representing a dart object.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford & Zoë Irwin
 * @date 23/02/2019
 * @version 1.0 - 23/02/2019
 */
class Dart extends ENGINE.OBJECTS.ClassicObject
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
        const DART = ENGINE.ObjectLoader().loadModel(
            'darts_obj',
            'glb'
        );
        console.log(DART);
        //Scale and position the dart
        DART.model.scale.set(0.02, 0.02, 0.02);
        DART.model.rotation.set(0, 0, 0);
        DART.model.position.set(-40, 18, 0);
        this.addObjectToGroup(DART.model);

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
