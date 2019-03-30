/**
 * A class representing the users's gestures.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Ana-Sabina Irimia
 * @date 30/03/2019
 * @version 1.0 - 30/03/2019
 */
class UserGestures extends ENGINE.OBJECTS.ClassicObject
{ 
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - 
     */
    constructor(position)
        {

            //Construct the superclass.
            super(position);





            
            /**
         * Updates the gesture. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
            this.update = function(frameTime)
            {
                //STREETLAMP does not need to update.
            }
        }
}