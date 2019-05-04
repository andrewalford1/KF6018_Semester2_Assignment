/**
 * A class representing a MoreTents.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
 */
class MoreTents extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the MoreTents.
     * @param {THREE.Vector3} position - Where the MoreTents is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the MoreTents model.
        const MOORETENTS = ENGINE.ObjectLoader().loadModel(
            'moreTents',
            'glb'
        );
        
        //Scale and position the MoreTents
        MOORETENTS.model.scale.set(0.1, 0.1, 0.1);
        MOORETENTS.model.rotation.set(0, 0.2, 0);
        MOORETENTS.model.position.set(-240, 0, -350);
        MOORETENTS.model.castShadow = true;
        MOORETENTS.model.receiveShadow = true;
        this.addObjectToGroup(MOORETENTS.model);

        /**
         * Updates the MoreTents. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //MoreTents does not need to update.
        }
    }
}
