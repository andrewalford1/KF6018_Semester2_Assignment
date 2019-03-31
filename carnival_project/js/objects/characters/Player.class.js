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

        //[leftHand] Tracks the state of the left hand.
        let leftHand = {
            open: {writeable: true, value: null},
            lasso: {writeable: true, value: null}
        };
        //[rightHand] Tracks the state of the right hand.
        let rightHand = {
            open: {writeable: true, value: null},
            lasso: {writeable: true, value: null}
        }; 

        let closedColour    = 0xFF0000;
        let openColour      = 0x00FF00;
        let lassoColour     = 0x0000FF;

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

        //Private Methods...

        this. updateHandColours = function() {
            if(leftHand.open) {
                this.getJoint(7).material.color.setHex(openColour);
            } else {
                this.getJoint(7).material.color.setHex(closedColour);
            }
            if(rightHand.open) {
                this.getJoint(11).material.color.setHex(openColour);
            } else {
                this.getJoint(11).material.color.setHex(closedColour);
            }

            if(leftHand.lasso) {
                this.getJoint(7).material.color.setHex(lassoColour);
            }
            if(rightHand.lasso) {
                this.getJoint(11).material.color.setHex(lassoColour);
            }
        }

        //Public Methods...

        /**
         * Attaches a camera to a given joint.
         * @param {number} jointIndex - The index of the joint the
         *                              camera is being attached to.
         * @param {THREE.Camera} - The camera being attached.
         */
        this.attachCamera = function(jointIndex, camera) {
            ENGINE.DEBUGGER.isThreeCamera(camera)
            
            //[joint] Stores the joint being allocated
            //to the camera.
            let joint = this.getJoint(jointIndex);
            if(joint) { joint.add(camera); }
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
         * Checks the state of the players hands.
         * @param {number} state - The state of the hand.
         * @param {left} left - 'true' if the left hand is being updated.
         *                      'false' if the right hand is being updated.
         */
        this.updateHand = function(state, left)
        {
            let open = false;
            let lasso = false;
            //Check the state of the hand.
            switch(state) {
                case(0 | 1): //Not tracked or unknown.
                    break;
                case(2): //Open
                    open = true;
                    break;
                case(4): //Lasso
                    lasso = true;
                    break;
            };

            //Update hands.
            if(left) {
                leftHand.open = open;
                leftHand.lasso = lasso;
            } else {
                rightHand.open = open;
                rightHand.lasso = lasso;
            }

            this.updateHandColours();
        }

        /**
         * Updates the object. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the previous
         *                             frame of animation.
         */
        this.update = function(frameTime) { 
            M_COLLIDERS.forEach(collider => {
                collider.update();
            });
        }
    }
}
