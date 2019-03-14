/**
 * A class representing a bear.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 -05/03/2019
 */
class Bear extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the bear.
     * @param {THREE.Vector3} position - Where the tent is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the bear model.
        const BEAR = ENGINE.ObjectLoader().loadModel(
            'bear',
            'glb'
        );
        
        //Scale and position the bear
        BEAR.model.scale.set(0.25,0.25, 0.25);
        BEAR.model.rotation.set(-Math.PI / 2, 0, 0);
        BEAR.model.position.set(-20, 0, -100);
        this.addObjectToGroup(BEAR.model);

        /**
         * Updates the bear. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //bear does not need to update.
        }
    }
}