/**
 * A class representing a SmallTent.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
 */
class SmallTent extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the SmallTent is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the SmallTent model.
        const SMALLTENT = ENGINE.ObjectLoader().loadModel(
            'smallTent',
            'glb'
        );
        
        //Scale and position the SmallTent
        SMALLTENT.model.scale.set(1, 1, 1);
        SMALLTENT.model.rotation.set( 0, 0, 0);
        SMALLTENT.model.position.set(480, 0, -630);
        this.addObjectToGroup(SMALLTENT.model);

        /**
         * Updates the SmallTent. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //SmallTent does not need to update.
        }
    }
}