/**
 * A class representing a Welcome.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew A05/03/201923/02/2019
 * @version 1.0 - 05/03/2019
 */
class Welcome extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Welcome.
     * @param {THREE.Vector3} position - Where the Welcome is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the Welcome model.
        const WELCOME = ENGINE.ObjectLoader().loadModel(
            'Welcome',
            'glb'
        );
        
        //Scale and position the tent
        WELCOME.model.scale.set(3, 3, 3);
        WELCOME.model.rotation.set(0,0, 0);
        WELCOME.model.position.set(-4, 0, -30);
        this.addObjectToGroup(WELCOME.model);

        /**
         * Updates the Welcome. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //welcome does not need to update.
        }
    }
}