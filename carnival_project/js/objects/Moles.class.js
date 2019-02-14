/**
 * The class creates the moles for the Whack-A-Mole game.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Ana-Sabina Irimia
 * @date 13/02/2019
 * @version 1.0 - 13/02/2019
 */
 class Mole extends ENGINE.OBJECTS.ClassicObject
 {
     /**
      * Constructor for the moles.
      */
      constructor(position)
      {
          //Construct the superclass.
          super(position);
          
          //Colors for the model
          const DARK_BLUE = 0x110A31;
          const LIGHT_BROWN = 0xB46E3A;
          const LIGHT_SKIN_COLOR = 0xF5C8AA;

          //Variable for the jumping speed of the mole
          let moleJumpingSpeed;
          //Varible for the frequency of apperance of the mole
          let moleJumpingFrequency;
            
          //Holds the position of the mole's head
          let moleHeadPositionY = 0.12;
          //Holds the width of the head and upper body of the mole
          let moleHeadWidth = 0.1;
          //Holds the width of the lower body of the mole
          let moleBodyWidth = 0.12;
          //Holds the height of the body of the mole
          let moleHeight = 0.25;
          //Holds the number of width segments for the geometry
          let widthSegments = 18;
          //Holds the number of height segments for the geometry
          let heightSegments = 18;
      
          // Variables/arrays for the head of the mole
          let moleHeadGeometry = new THREE.SphereGeometry(moleHeadWidth, widthSegments, heightSegments);
          //Create material for the mole
          let moleMaterial = new THREE.MeshPhysicalMaterial({ color: DARK_BLUE, metalness: 0.0, 
                                                          roughness: 0.8, reflectivity: 0.2, side: THREE.DoubleSide });
          let moleHeadMesh = new THREE.Mesh(moleHeadGeometry, moleMaterial);
          moleHeadMesh.castShadow = true;
          moleHeadMesh.receiveShadow = true;
          moleHeadMesh.position.set(0.0, moleHeadPositionY, 0.0);

          // Variables/arrays for the body of the mole
          let moleBodyGeometry = new THREE.CylinderGeometry(moleHeadWidth, moleBodyWidth, 
                                                            moleHeight, widthSegments);
          let moleBodyMesh = new THREE.Mesh(moleBodyGeometry, moleMaterial);
          moleBodyMesh.castShadow = true;
          moleBodyMesh.receiveShadow = true;
          moleBodyMesh.position.set(0.0, 0.0, 0.0);

          // Create the nose of the mole
          let moleNoseGeometry = new THREE.SphereGeometry(0.05, 9, 2, 0.0, 6.3, 2.0, 3.1);
          let moleNoseMaterial = new THREE.MeshPhysicalMaterial({ color: LIGHT_SKIN_COLOR, roughness:0.5, metalness:0.0 });
          let moleNoseMesh = new THREE.Mesh(moleNoseGeometry, moleNoseMaterial);
          moleNoseMesh.rotation.set(1.0, 0.0, 0.0);
          moleNoseMesh.castShadow = true;
          moleNoseMesh.receiveShadow = true;
          moleNoseMesh.position.set(0.0, 0.2, 0.12);

          //Create the left paws of the mole
            let moleLeftPawGeometry = new THREE.TorusGeometry( 0.02, 0.03, widthSegments, heightSegments, 3.2);
            let moleLeftPawMesh = new THREE.Mesh(moleLeftPawGeometry, moleMaterial);
            moleLeftPawMesh.rotation.set(0.0, 0.7, 0.0);
            moleLeftPawMesh.castShadow = true;
            moleLeftPawMesh.receiveShadow = true;
            moleLeftPawMesh.position.set(0.07, 0.07, 0.06);

            //Create the right paw of the mole
            let moleRightPawGeometry = moleLeftPawGeometry;
            let moleRightPawMesh = new THREE.Mesh(moleRightPawGeometry, moleMaterial);
            moleRightPawMesh.rotation.set(0.0, -0.7, 0.0);
            moleRightPawMesh.castShadow = true;
            moleRightPawMesh.receiveShadow = true;
            moleRightPawMesh.position.set(-0.07, 0.07, 0.06);

            //Create the fingers for the paws of the mole
            let moleFingerGeometry = new THREE.CylinderGeometry(0.012, 0.006, 0.05, widthSegments, heightSegments, false, 0, 6.3);//3.0
            let moleFingerMaterial = new THREE.MeshPhysicalMaterial({ color: LIGHT_SKIN_COLOR, metalness: 0.0, 
                                                                      roughness: 0.6, reflectivity: 0.2, side: THREE.DoubleSide });
            let moleFingerMesh = new THREE.Mesh(moleFingerGeometry, moleFingerMaterial);
            moleFingerMesh.rotation.set(0.0, 0.0, 0.2);
            moleFingerMesh.castShadow = true;
            moleFingerMesh.receiveShadow = true;
            moleFingerMesh.position.set(0.06, 0.045, 0.09);

            // Create group for the paws of the mole
            let molePawGroup = new THREE.Group();
            molePawGroup.add(moleLeftPawMesh);
            molePawGroup.add(moleRightPawMesh);
            molePawGroup.add(moleFingerMesh);

          //Create a group for the whole body of the mole 
          let moleBodyPartsGroup = new THREE.Group();
          moleBodyPartsGroup.add(moleHeadMesh);
          moleBodyPartsGroup.add(moleBodyMesh);
          moleBodyPartsGroup.add(moleNoseMesh);
          moleBodyPartsGroup.add(molePawGroup);

          //Add the sphere to the object group.
          this.addObjectToGroup(moleBodyPartsGroup);

          /**
           * 
           * @param {number} jumpingSpeed - 
           *
          */
          this.setMoleSpeed = function(jumpingSpeed){

          }

          /**
           * 
           * @param {number} jumpingFrequency -
           *
          */
          this.setMoleFrequency = function(jumpingFrequency){
                
          }

          /**
           * Updates the mole once every frame.
           * (Abstract class which must be overridden from the superclass.)
           * @param {number} frameTime - The time taken to compute the previous
           *                             frame of animation. (This is way
           *                             cooler than 'iFrame' as it is
           *                             independant of the user's computer
           *                             performance.
           */
           this.update = function(frameTime)
           {
               if(moleJumpingFrequency%frameTime ===0 ){
                  // change frameTime/10 to change the speed
                  moleBodyPartsGroup.position.y = Math.cos(moleJumpingSpeed - 5.0) * 0.15;
               }
           }//end of this.update
      }//end of constructor
 }//end of class Mole 
