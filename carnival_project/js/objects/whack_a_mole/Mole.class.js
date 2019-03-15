/**
 * The class creates the moles for the Whack-A-Mole game.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Ana-Sabina Irimia
 * @date 13/02/2019
 * @version 1.6 - 15/03/2019
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
        const DARK_BLUE = 0x180E44;
        //const LIGHT_BROWN = 0xB46E3A;
        const LIGHT_SKIN_COLOR = 0xF5C8AA;

        //Variable for the jumping speed of the mole
        let moleJumpingSpeed;
        //Varible for the frequency of apperance of the mole
        let moleJumpingFrequency;
        let iFrame = 0;

        // Variables for the head of the mole
        let moleHeadGeometry = new THREE.SphereGeometry(1.0, 18, 18);
        //Create material for the mole
        let moleMaterial = new THREE.MeshPhysicalMaterial({ 
            color: DARK_BLUE, 
            metalness: 0.0,
            roughness: 0.8, 
            reflectivity: 0.2, 
            side: THREE.DoubleSide 
        });
        let moleHeadMesh = new THREE.Mesh(moleHeadGeometry, moleMaterial);
        moleHeadMesh.castShadow = true;
        moleHeadMesh.receiveShadow = true;
        moleHeadMesh.position.set(0.0, 1.22, 0.0);

        // Variables/arrays for the body of the mole
        let moleBodyGeometry = new THREE.CylinderGeometry(1.0,1.2, 2.5, 18);
        let moleBodyMesh = new THREE.Mesh(moleBodyGeometry, moleMaterial);
        moleBodyMesh.castShadow = true;
        moleBodyMesh.receiveShadow = true;
        moleBodyMesh.position.set(0.0, 0.0, 0.0);

        // Create the nose of the mole
        let moleNoseGeometry = new THREE.SphereGeometry(
            0.5, 9, 2, 0.0, 6.3, 2.0, 3.2);
        let moleNoseMaterial = new THREE.MeshPhysicalMaterial({
            color: LIGHT_SKIN_COLOR, 
            roughness:0.5, 
            metalness:0.0 
        });
        let moleNoseMesh = new THREE.Mesh(moleNoseGeometry, moleNoseMaterial);
        moleNoseMesh.rotation.set(1.0, 0.0, 0.0);
        moleNoseMesh.castShadow = true;
        moleNoseMesh.receiveShadow = true;
        moleNoseMesh.position.set(0.0, 2.0, 1.195);

        //Create the left paws of the mole
        let moleLeftPawGeometry = new THREE.TorusGeometry( 0.2, 0.3, 18, 18, 3.2);
        let moleLeftPawMesh = new THREE.Mesh(moleLeftPawGeometry, moleMaterial);
        moleLeftPawMesh.rotation.set(0.0, 0.7, 0.0);
        moleLeftPawMesh.castShadow = true;
        moleLeftPawMesh.receiveShadow = true;
        moleLeftPawMesh.position.set(0.7, 0.7, 0.6);

        //Create the right paw of the mole
        let moleRightPawGeometry = moleLeftPawGeometry;
        let moleRightPawMesh = new THREE.Mesh(moleRightPawGeometry, moleMaterial);
        moleRightPawMesh.rotation.set(0.0, -0.7, 0.0);
        moleRightPawMesh.castShadow = true;
        moleRightPawMesh.receiveShadow = true;
        moleRightPawMesh.position.set(-0.7, 0.7, 0.6);

        // Create group for the left paw of the mole
        let moleLeftPawGroup = new THREE.Group();
        moleLeftPawGroup.add(moleLeftPawMesh);

        // Create group for the right paw of the mole
        let moleRightPawGroup = new THREE.Group();
        moleRightPawGroup.add(moleRightPawMesh);

//------------------------------------------------------------
        //Create the fingers for the paws of the mole
        let moleFingerGeometry = [];
        let moleFingerMaterial = [];
        let moleFingerMesh = [];
        let moleFingerNumber = 10;
        for (let i=0; i<moleFingerNumber; i++)
        {
            moleFingerGeometry.push(new THREE.CylinderGeometry(
                0.12, 0.06, 0.5, 18, 18, false, 0, 6.3));//3.0
            moleFingerMaterial.push(new THREE.MeshPhysicalMaterial({
                color: LIGHT_SKIN_COLOR, 
                metalness: 0.5,
                roughness: 0.6, 
                reflectivity: 0.2, 
                side: THREE.DoubleSide 
            }));
            moleFingerMesh.push(new THREE.Mesh(moleFingerGeometry[i], moleFingerMaterial[i]));
            moleFingerMesh[i].castShadow = true;
            moleFingerMesh[i].receiveShadow = true;

            if(i <= 4)
            {
                moleLeftPawGroup.add(moleFingerMesh[i]);
            }
            else if( i => 5)
            {
                moleRightPawGroup.add(moleFingerMesh[i]);
            }
        }
        //Position each finger of the paws
        //Fingers for the left paw
        moleFingerMesh[0].position.set(0.6, 0.45, 0.91);
        moleFingerMesh[0].rotation.set(-0.03, 0.0, 0.2);
        moleFingerMesh[1].position.set(0.72, 0.45, 0.81);
        moleFingerMesh[1].rotation.set(-0.03, 0.0, 0.1);
        moleFingerMesh[2].position.set(0.82, 0.45, 0.7);
        moleFingerMesh[2].rotation.set(-0.09, 0.0, 0.08);
        moleFingerMesh[3].position.set(0.92, 0.45, 0.61);
        moleFingerMesh[3].rotation.set(-0.03, 0.0, 0.0);
        moleFingerMesh[4].position.set(1.01, 0.45, 0.50);
        moleFingerMesh[4].rotation.set(-0.02, 0.0, -0.02);
        //Fingers for the right paw
        moleFingerMesh[5].position.set(-0.6, 0.45, 0.91);
        moleFingerMesh[5].rotation.set(-0.03, 0.0, -0.2);
        moleFingerMesh[6].position.set(-0.72, 0.45, 0.81);
        moleFingerMesh[6].rotation.set(-0.03, 0.0, -0.1);
        moleFingerMesh[7].position.set(-0.82, 0.45, 0.7);
        moleFingerMesh[7].rotation.set(-0.09, 0.0, -0.08);
        moleFingerMesh[8].position.set(-0.92, 0.45, 0.61);
        moleFingerMesh[8].rotation.set(-0.03, 0.0, -0.0);
        moleFingerMesh[9].position.set(-1.01, 0.45, 0.50);
        moleFingerMesh[9].rotation.set(-0.03, 0.0, 0.02);

        //Create a group for the whole body of the mole
        let moleBodyPartsGroup = new THREE.Group();
        moleBodyPartsGroup.add(moleHeadMesh);
        moleBodyPartsGroup.add(moleBodyMesh);
        moleBodyPartsGroup.add(moleNoseMesh);
        moleBodyPartsGroup.add(moleLeftPawGroup);
        moleBodyPartsGroup.add(moleRightPawGroup);
        //Add the sphere to the object group.
        this.addObjectToGroup(moleBodyPartsGroup);

        //Test collision cube for testing
        let collisionCube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhysicalMaterial({
                color: 0xFF0000, 
            })
        );
        let offset = new THREE.Vector3(0, 2, 0);
        collisionCube.position.add(offset);
        this.addObjectToGroup(collisionCube);

        //[colliders] An array to store all the 
        //colliders of this object.
        let colliders = [];
        colliders.push({
            object : moleHeadMesh,
            box : setUpCollider(
                moleHeadMesh, 
                new THREE.Matrix4().setPosition(
                    new THREE.Vector3(0, -1.25, 0)
                ), 
                true
            ),
        });
        colliders.push({
            object : collisionCube,
            box : setUpCollider(
                collisionCube,
                new THREE.Matrix4().setPosition(
                    offset.multiplyScalar(-1)
                ),
                true
            )
        })
        
        //Private Methods...

        /**
         * Sets up a collider
         * @param {THREE.Object3D} object - The object the collider tracks.
         * @param {THREE.Matrix4} offset - Relative to the object.
         * @param {boolean} visible - Show a pink outline of the box.
         */
        function setUpCollider(object, offset, visible)
        {
            let collisionBox = new THREE.Box3();
            if(object)
            {
                collisionBox.setFromObject(object);
            }
            if(offset)
            {
                collisionBox.applyMatrix4(offset);
            }
            if(visible)
            {
                let visual = new THREE.Box3Helper(collisionBox, 0xFF00FF);
                visual.updateMatrixWorld(true);
                object.add(visual);
            }

            return collisionBox;
        }

        /**
         * Updates an array of colliders.
         * @param {array} colliders The colliders to be updated.
         */
        function updateCollisions(colliders)
        {
            colliders.forEach(collider => {
                collider.box = new THREE.Box3();
                collider.box.setFromObject(collider.object);            
            });
        }
    
        //Public Methods...

        /**
         *
         * @param {number} jumpingSpeed -
         *
         */
        this.setMoleSpeed = function(jumpingSpeed)
        {

        }

        /**
         *
         * @param {number} jumpingFrequency -
         *
         */
        this.setMoleFrequency = function(jumpingFrequency)
        {

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
            // if(moleJumpingFrequency%frameTime ===0 )
            // {
                // change frameTime/10 to change the speed
                moleBodyPartsGroup.position.y = Math.cos(iFrame/20 - 5) * 1.2 -1.3;
                iFrame++;
            // }

            updateCollisions(colliders);
            if(colliders[0].box.intersectsBox(colliders[1].box))
            {
                //console.log(`ouch! ${iFrame}`);
            }

        }//end of this.update
      }//end of constructor
 }//end of class Mole
