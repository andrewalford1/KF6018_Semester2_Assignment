/**
 * A kinect object to track the player.
 * @extends ENGINE.OBJECTS.KinectObject
 * @author Andrew Alford
 * @date 17/02/2019
 * @version 2.0 - 10/03/2019
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

            //Do not render anything for the head.
            if(i == 3)
            {
                joint = new THREE.Object3D();
            }
            
            this.addJoint(joint, i);
        }

        //Scale and position the player.
        this.getInstance().scale.set(11, 11, 11);
        this.getInstance().position.set(0, 11, 0);

        //Public Methods...

        /**
         * Attaches a camera to a given joint.
         * @param {number} jointIndex - The index of the joint the
         *                              camera is being attached to.
         * @param {THREE.Camera} - The camera being attached.
         */
        this.attachCamera = function(jointIndex, camera)
        {
            if(ENGINE.DEBUGGER.isThreeCamera(camera))
            {
                //[joint] Stores the joint being allocated
                //to the camera.
                let joint = this.getJoint(jointIndex);

                if(joint)
                {
                    joint.add(camera);
                }
            }
        }

        const M_COLLIDERS = [];

        this.attachCollider = function(jointIndex)
        {
            let joint = this.getJoint(jointIndex);
            if(joint) {
                let collision = collisionFactory(
                    joint,
                    null,
                    true,
                    0x00FFFF
                );
                M_COLLIDERS.push(collision);
                joint = collision.object;
            }
        }

        this.getColliders = function()
        {
            return M_COLLIDERS;
        }

        /**
         * Updates the object. (Overridden from the superclass).
         * Note: players do not need updating (yet).
         * @param {number} frameTime - The time taken to compute the previous
         *                             frame of animation.
         */
        this.update = function(frameTime) { }
    }
}
