/**
 * A class representing a boy object.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford & Zoë Irwin
 * @date 26/02/2019
 * @version 1.0 - 26/02/2019
 */
class Boy extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the dart.
     * @param {THREE.Vector3} position - Where the dart is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the boy model.
        const BOY = ENGINE.ObjectLoader().loadModel(
            'boy_obj',
            'glb'
        );
        console.log(BOY);
        //Scale and position the dart
        BOY.model.scale.set(0.05, 0.05, 0.05);
        BOY.model.rotation.set(0, 0, 0);
        BOY.model.position.set(10, 0, 0);
        this.addObjectToGroup(BOY.model);

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