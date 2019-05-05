/**
 * A class representing a BalloonCover.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Zoë Irwin
 * @date    05/03/2019
 * @version 1.0 - 05/03/2019
 */
class BalloonCover extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the BalloonCover.
     * @param {THREE.Vector3} position - Where the BalloonCover is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the BalloonCover model.
        const BALLOONCOVER = ENGINE.ObjectLoader().loadModel(
            'balloonCover',
            'glb'
        );
        let once = true;
        //Scale and position the BalloonCover
        BALLOONCOVER.model.scale.set(16, 12, 12);
        BALLOONCOVER.model.rotation.set(0, Math.PI/ 2, 0);
        BALLOONCOVER.model.position.set(-20, 0, -270);
        BALLOONCOVER.model.castShadow = true;
        BALLOONCOVER.model.receiveShadow = true;
        this.addObjectToGroup(BALLOONCOVER.model);

        /**
         * Updates the BalloonCover. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            //BalloonCover does not need to update.
            if(once) {
                once = false;
                let scene = BALLOONCOVER.model.children[0];
                //Make the BALLOONCOVER receive and cast shadows 
                //from the other models in the environment.
                //Search though the object tree and change the material of every mesh.
                if(scene) {
                    let object = scene.children[0];
                    if(object) {
                        let object2 = object.children[0];
                        if(object2) {
                            let object3 = object2.children[0];
                            if(object3) {
                                let object4 = object3.children[0];
                                if(object4) {
                                    let object5 = object4.children[0];
                                    if(object5){
                                         let meshes = object5.children;
                                         //Change the material of every mesh.
                                         meshes.forEach(mesh => {
                                         mesh.castShadow = true;
                                         mesh.receiveShadow = true;
                                         });
                                    }
                                }
                             }
                        }
                    }
                }
            }//end of if(once)
        }
    }
}