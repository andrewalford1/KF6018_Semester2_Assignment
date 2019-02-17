/**
 * A kinect object to track the player.
 * @extends ENGINE.OBJECTS.KinectObject
 * @author Andrew Alford
 * @date 17/02/2019
 * @version 1.0 - 17/02/2019
 */
class Player extends ENGINE.OBJECTS.KinectObject
{
    /**
     * Constructor for the player.
     */
    constructor()
    {
        //Construct the superclass.
        super();

        //Add the players joints.
        const BONE_RADIUS = 0.05;
        for(let i = 0; i <= 24; i++)
        {
            let joint = new THREE.Mesh(
                new THREE.SphereGeometry(BONE_RADIUS, 9, 9),
                new THREE.MeshPhongMaterial( { color: 0xFF0000 } )
            );
            this.addJoint(joint, i);
        }

        //Scale the player.
        this.getInstance().scale.set(15, 15, 15);

        //Public Methods...

        /**
         * Updates the object. (Overridden from the superclass).
         * Note: players do not need updating (yet).
         * @param {number} frameTime - The time taken to compute the previous
         *                             frame of animation.
         */
        this.update = function(frameTime) { }
    }
}
