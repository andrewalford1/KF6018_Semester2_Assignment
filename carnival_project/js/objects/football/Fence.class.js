/**
 * Football goal
 * for scale objects in our world
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Luke Rose
 * @date 15/03/2019
 * @version 1.0 - 21/02/2019
 */
class Fence extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * constructor for a Basic Character.
     * @param {THREE.Vector3} initialPosition - The initial position of the
     *                                          character.
     */
    constructor(position)
    {
         //Construct the superclass.
        super(position);
        
        //Left Fences
            //Add the Fence model.
                const FENCE = ENGINE.ObjectLoader().loadModel(
                    'Fence',
                    'gltf'
                );
                //Scale and position the Fence
                FENCE.model.scale.set(0.1, 0.1, 0.1);
                FENCE.model.rotation.set(0, 0, 0);
                FENCE.model.position.set(-5, 0, -120);
                this.addObjectToGroup(FENCE.model);

            //Add the Fence model.
                const FENCE2 = ENGINE.ObjectLoader().loadModel(
                    'Fence',
                    'gltf'
                );
                //Scale and position the Fence
                FENCE2.model.scale.set(0.1, 0.1, 0.1);
                FENCE2.model.rotation.set(0, 0, 0);
                FENCE2.model.position.set(-25, 0, -120);
                this.addObjectToGroup(FENCE2.model);

            //Add the Fence model.
                const FENCE3 = ENGINE.ObjectLoader().loadModel(
                    'Fence',
                    'gltf'
                );
                //Scale and position the Fence
                FENCE3.model.scale.set(0.1, 0.1, 0.1);
                FENCE3.model.rotation.set(0, 0, 0);
                FENCE3.model.position.set(-45, 0, -120);
                this.addObjectToGroup(FENCE3.model);

            //Add the dart model.
                const FENCE4 = ENGINE.ObjectLoader().loadModel(
                    'Fence',
                    'gltf'
                );

                //Scale and position the Fence
                FENCE4.model.scale.set(0.1, 0.1, 0.1);
                FENCE4.model.rotation.set(0, 0, 0);
                FENCE4.model.position.set(-65, 0, -120);
                this.addObjectToGroup(FENCE4.model);

            //Add the Fence model.
                const FENCE5 = ENGINE.ObjectLoader().loadModel(
                    'Fence',
                    'gltf'
                );

                //Scale and position the Fence
                FENCE5.model.scale.set(0.1, 0.1, 0.1);
                FENCE5.model.rotation.set(0, 0, 0);
                FENCE5.model.position.set(-85, 0, -120);
                this.addObjectToGroup(FENCE5.model);
        
        //Right Fences
            //Add the Fence model.
                    const FENCEr = ENGINE.ObjectLoader().loadModel(
                        'Fence',
                        'gltf'
                    );
                    //Scale and position the Fence
                    FENCEr.model.scale.set(0.1, 0.1, 0.1);
                    FENCEr.model.rotation.set(0, 0, 0);
                    FENCEr.model.position.set(-5, 0, -200);
                    this.addObjectToGroup(FENCEr.model);

                //Add the Fence model.
                    const FENCE2r = ENGINE.ObjectLoader().loadModel(
                        'Fence',
                        'gltf'
                    );
                    //Scale and position the Fence
                    FENCE2r.model.scale.set(0.1, 0.1, 0.1);
                    FENCE2r.model.rotation.set(0, 0, 0);
                    FENCE2r.model.position.set(-25, 0, -200);
                    this.addObjectToGroup(FENCE2r.model);

                //Add the Fence model.
                    const FENCE3r = ENGINE.ObjectLoader().loadModel(
                        'Fence',
                        'gltf'
                    );
                    //Scale and position the Fence
                    FENCE3r.model.scale.set(0.1, 0.1, 0.1);
                    FENCE3r.model.rotation.set(0, 0, 0);
                    FENCE3r.model.position.set(-45, 0, -200);
                    this.addObjectToGroup(FENCE3r.model);

                //Add the dart model.
                    const FENCE4r = ENGINE.ObjectLoader().loadModel(
                        'Fence',
                        'gltf'
                    );

                    //Scale and position the Fence
                    FENCE4r.model.scale.set(0.1, 0.1, 0.1);
                    FENCE4r.model.rotation.set(0, 0, 0);
                    FENCE4r.model.position.set(-65, 0, -200);
                    this.addObjectToGroup(FENCE4r.model);

                //Add the Fence model.
                    const FENCE5r = ENGINE.ObjectLoader().loadModel(
                        'Fence',
                        'gltf'
                    );

                    //Scale and position the Fence
                    FENCE5r.model.scale.set(0.1, 0.1, 0.1);
                    FENCE5r.model.rotation.set(0, 0, 0);
                    FENCE5r.model.position.set(-85, 0, -200);
                    this.addObjectToGroup(FENCE5r.model);
        
        //Back Fences
            //Add the Fence model.
                    const FENCEb = ENGINE.ObjectLoader().loadModel(
                        'Fence',
                        'gltf'
                    );
                    //Scale and position the Fence
                    FENCEb.model.scale.set(0.1, 0.1, 0.1);
                    FENCEb.model.rotation.y = Math.PI/2;
                    FENCEb.model.position.set(-95, 0, -130);
                    this.addObjectToGroup(FENCEb.model);

                //Add the Fence model.
                    const FENCE2b = ENGINE.ObjectLoader().loadModel(
                        'Fence',
                        'gltf'
                    );
                    //Scale and position the Fence
                    FENCE2b.model.scale.set(0.1, 0.1, 0.1);
                    FENCE2b.model.rotation.y = Math.PI/2;
                    FENCE2b.model.position.set(-95, 0, -150);
                    this.addObjectToGroup(FENCE2b.model);

                //Add the Fence model.
                    const FENCE3b = ENGINE.ObjectLoader().loadModel(
                        'Fence',
                        'gltf'
                    );
                    //Scale and position the Fence
                    FENCE3b.model.scale.set(0.1, 0.1, 0.1);
                    FENCE3b.model.rotation.y = Math.PI/2;
                    FENCE3b.model.position.set(-95, 0, -170);
                    this.addObjectToGroup(FENCE3b.model);

                //Add the dart model.
                    const FENCE4b = ENGINE.ObjectLoader().loadModel(
                        'Fence',
                        'gltf'
                    );

                    //Scale and position the Fence
                    FENCE4b.model.scale.set(0.1, 0.1, 0.1);
                    FENCE4b.model.rotation.y = Math.PI/2;
                    FENCE4b.model.position.set(-95, 0, -190);
                    this.addObjectToGroup(FENCE4b.model);
        
        this.update = function(frameTime)
        {
            //Fence does not need to update.
        }
    }

}
