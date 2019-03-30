/**
 * A class representing the Moon.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Ana-Sabina Irimia
 * @date 30/03/2019
 * @version 5.0 - 30/03/2019
 */
class Moon extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the Moon is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //ADD LIGHTING... (I have not figured out a good way to do lighting yet).
        let moonLight = new THREE.HemisphereLight(0x375D9C, 0x444444, 1);//0xFFFFFF, 0x444444
        moonLight.position.set(0.0, 20.0, 0.0);
        moonLight.castShadow = true;


        this.addObjectToGroup(moonLight);

        /**
         * Updates the Moon. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Moon does not need to update.
        }
    }
}
