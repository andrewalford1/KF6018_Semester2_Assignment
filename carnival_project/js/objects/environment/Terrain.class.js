/**
 * A class representing a football object.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Andrew Alford & Zoë Irwin
 * @date 26/02/2019
 * @version 1.0 - 26/02/2019
 */
class Terrain extends ENGINE.OBJECTS.ClassicObject
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
        const TERRAIN = ENGINE.ObjectLoader().loadModel(
            'terrain_obj',
            'glb'
        );
        console.log(TERRAIN);
        //Scale and position the dart
        TERRAIN.model.scale.set(30.5, 20.5, 30.5);
        TERRAIN.model.rotation.set(0, 0, 0);
        TERRAIN.model.position.set(0, -4, 0);
        this.addObjectToGroup(TERRAIN.model);

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