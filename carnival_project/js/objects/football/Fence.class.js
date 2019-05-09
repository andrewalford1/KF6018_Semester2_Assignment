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

        let numberOfFences = 14;
        let Fence = [];
        let once = true;

        for(let i=0; i<numberOfFences; i++){
                //Add the Fence model.
                Fence.push(ENGINE.ObjectLoader().loadModel(
                              'Fence',
                              'gltf'
                           ));
                Fence[i].model.scale.set(0.1, 0.1, 0.1);
                Fence[i].model.castShadow = true;
                Fence[i].model.receiveShadow = true;
                this.addObjectToGroup(Fence[i].model);
        }
        
                //Left Fences
                //Add the position and the rotation of the fence 1
                Fence[0].model.position.set(-5, 0, -120);
                Fence[0].model.rotation.set(0, 0, 0);

                //Add the position and the rotation of the fence 2
                Fence[1].model.position.set(-25, 0, -120);
                Fence[1].model.rotation.set(0, 0, 0);

                //Add the position and the rotation of the fence 3
                Fence[2].model.position.set(-45, 0, -120);
                Fence[2].model.rotation.set(0, 0, 0);


                //Add the position and the rotation of the fence 4
                Fence[3].model.position.set(-65, 0, -120);
                Fence[3].model.rotation.set(0, 0, 0);


                //Add the position and the rotation of the fence 5
                Fence[4].model.position.set(-85, 0, -120);
                Fence[4].model.rotation.set(0, 0, 0);
        
                //Right Fences

                //Add the position and the rotation of the fence 6
                Fence[5].model.position.set(-5, 0, -200);
                Fence[5].model.rotation.set(0, 0, 0);


                //Add the position and the rotation of the fence 7 
                Fence[6].model.position.set(-25, 0, -200);
                Fence[6].model.rotation.set(0, 0, 0);

                //Add the position and the rotation of the fence 8
                Fence[7].model.position.set(-45, 0, -200);
                Fence[7].model.rotation.set(0, 0, 0);

                //Add the position and the rotation of the fence 9
                Fence[8].model.position.set(-65, 0, -200);
                Fence[8].model.rotation.set(0, 0, 0);

                //Add the position and the rotation of the fence 10
                Fence[9].model.position.set(-85, 0, -200)
                Fence[9].model.rotation.set(0, 0, 0);
        
                //Back Fences

                //Add the position and the rotation of the fence 11
                Fence[10].model.position.set(-95, 0, -130);
                Fence[10].model.rotation.y = Math.PI/2;

                //Add the position and the rotation of the fence 12
                Fence[11].model.position.set(-95, 0, -150);
                Fence[11].model.rotation.y = Math.PI/2;

                //Add the position and the rotation of the fence 13
                Fence[12].model.position.set(-95, 0, -170);
                Fence[12].model.rotation.y = Math.PI/2;

                //Add the position and the rotation of the fence 14
                Fence[13].model.position.set(-95, 0, -190);
                Fence[13].model.rotation.y = Math.PI/2;


        
        this.update = function(frameTime)
        {
            //Add shadows to the Fence.model
            if(once) {
                once = false;
                Fence.forEach(fence => {
                let scene = fence.model.children[0];
                //Make the Fence be able to receive and cast shadows 
                //from the other models in the environment.
                //Search though the object tree and change the material of every mesh.
                if(scene) {
                    let object = scene.children[0];
                    if(object) {
                        let object2 = object.children[0];
                        if(object2){
                              let object3 = object2.children[0];  
                              if(object3){
                                   let meshes = object3.children;
                                    //Change the material of every mesh.
                                    meshes.forEach(mesh => {
                                        mesh.castShadow = true;
                                        mesh.receiveShadow = true;
                                    });
                              }
                        }
                    }
                }
                });//each
            }//end of if(once) 
        }
    }

}
