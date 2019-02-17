/**
 * A basic character to be used as a reference
 * for scale objects in our world
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford
 * @date 17/02/2019
 * @version 1.0 - 17/02/2019
 */
class BasicCharacter extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * constructor for a Basic Character.
     * @param {THREE.Vector3} initialPosition - The initial position of the
     *                                          character.
     */
    constructor(initialPosition)
    {
        //Construct the superclass.
        super(initialPosition);

        //Load the character.
        const CHARACTER = ENGINE.ObjectLoader().loadModel(
            'basic_character',
            'glb'
        );

        //Scale the character.
        CHARACTER.model.scale.set(10, 10, 10);

        this.addObjectToGroup(CHARACTER.model);

        /**
         * Updates the character. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //Basic Character does not need to update.
        }
    }

}
