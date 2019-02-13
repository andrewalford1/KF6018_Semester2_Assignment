/**
 * The class creates the moles for the Whack-A-Mole game.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Ana-Sabina Irimia
 * @date 13/02/2019
 * @version 1.0 - 13/02/2019
 */
 class Moles extends ENGINE.OBJECTS.ClassicObject
 {
     /**
      * Constructor for the moles.
      */
      constructor(position)
      {
          //Construct the superclass.
          super(position);
      
        // Variables/arrays for the head of the mole
        var moleHeadGeometry = [];
        var moleMaterial = [];
        var moleHeadMesh = [];
        // Variables/arrays for the body of the mole
        var moleBodyGeometry = [];
        var moleBodyMesh = [];
        var moleBodyPartsGroup = [];
        var moleNumber = 9;
        var rowNumber = 3;
        var rowPos= 0;
        for (var i=0; i<moleNumber; i=i+3){
            for(var j=0; j<rowNumber; j++){
                moleHeadGeometry.push(new THREE.SphereGeometry(0.08, 18, 18));
                moleMaterial.push(new THREE.MeshPhongMaterial({ color: 0x110A31 }));
                moleHeadMesh.push(new THREE.Mesh(moleHeadGeometry[i+j], moleMaterial[i+j]));
                moleHeadMesh[i+j].castShadow = true;
                moleHeadMesh[i+j].receiveShadow = true;
                moleHeadMesh[i+j].position.set(j, 1.0, rowPos);
                //scene.add(moleHeadMesh[i+j]); 

                moleBodyGeometry.push(new THREE.CylinderGeometry(0.08,0.1, 0.2, 18));
                moleBodyMesh.push(new THREE.Mesh(moleBodyGeometry[i+j], moleMaterial[i+j]));
                moleBodyMesh[i+j].castShadow = true;
                moleBodyMesh[i+j].receiveShadow = true;
                moleBodyMesh[i+j].position.set(j, 0.9, rowPos);
                //scene.add(moleBodyMesh[i+j]); 

                moleBodyPartsGroup.push(new THREE.Group());
                moleBodyPartsGroup[i+j].add(moleHeadMesh[i+j]);
                moleBodyPartsGroup[i+j].add(moleBodyMesh[i+j]);
                this.addObjectToGroup(moleBodyPartsGroup[i+j]);
            }
            rowPos++;
        }

          //Add the sphere to the object group.
          //this.addObjectToGroup(sphere);

          /**
           * Updates the sphere once every frame.
           * (Abstract class which must be overridden from the superclass.)
           * @param {number} frameTime - The time taken to compute the previous
           *                             frame of animation. (This is way
           *                             cooler than 'iFrame' as it is
           *                             independant of the user's computer
           *                             performance.
           */
           this.update = function(frameTime)
           {
               // change frameTime/10 to change the speed
               moleBodyPartsGroup[0].position.y = Math.cos(frameTime/10 - 5.0) * 0.15;
           }
      }
 }
