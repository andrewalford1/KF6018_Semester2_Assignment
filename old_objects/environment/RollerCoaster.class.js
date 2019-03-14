/**
 * A class representing a RollerCoaster.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 05/03/2019
 * @version 1.0 - 05/03/2019
 */
class RollerCoaster extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the RollerCoaster is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the RollerCoaster model.
        const ROLLERCOASTER = ENGINE.ObjectLoader().loadModel(
            'rollerCoaster',
            'glb'
        );
        
        //Scale and position the RollerCoaster
        ROLLERCOASTER.model.scale.set(8, 8, 8);
        ROLLERCOASTER.model.rotation.set( 0, 2 +Math.PI/-2, 0);
        ROLLERCOASTER.model.position.set(-520,100, -820);
        this.addObjectToGroup(ROLLERCOASTER.model);

        /**
         * Updates the RollerCoaster. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //RollerCoaster does not need to update.
        }
    }
}