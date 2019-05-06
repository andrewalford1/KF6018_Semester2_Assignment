/**
 * A test object to show off physics.
 * @extends ENGINE.OBJECT
 * @author Andrew Alford
 * @date 23/03/2019
 * @version 1.0 - 23/03/2019
 */
class Cans extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Test Object.
     * @param {THREE.Vector3} initialPosition - The initial position 
     *                                          the Cube.
     */
    constructor(initialPosition)
    {
        //Construct the superclass.
        super(initialPosition);

        //[m_player] The player who controls the cannon.
        let m_player = null;
        
        this.allocatePlayer = function(player) {
            m_player = player;
        }

// set up the sphere vars
var radius = 2, height = 2, segments = 5, rings = 30;

// create a new mesh with sphere geometry -
var box1 = new THREE.Mesh(
   new THREE.SphereGeometry(radius, rings,rings ),
   new THREE.MeshPhongMaterial( {color: 0xffff00 	})
   );
box1.castShadow = true;
box1.receiveShadow = true;
this.addObjectToGroup(box1);

// create a new mesh with sphere geometry -
var box2 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    map: ENGINE.TextureLoader().loadTexture( 'dartsGame/stripes.jpeg' ) 	})
   );
box2.castShadow = true;
box2.receiveShadow = true;
this.addObjectToGroup(box2);

// create a new mesh with sphere geometry -
var box3 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box3.castShadow = true;
box3.receiveShadow = true;
this.addObjectToGroup(box3);

// create a new mesh with sphere geometry -
var box4 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box4.castShadow = true;
box4.receiveShadow = true;
this.addObjectToGroup(box4);

// create a new mesh with sphere geometry -
var box5 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    map: ENGINE.TextureLoader().loadTexture( 'dartsGame/stripes.jpeg' ) 	})
   );
box5.castShadow = true;
box5.receiveShadow = true;
this.addObjectToGroup(box5);

// create a new mesh with sphere geometry -
var box6 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box6.castShadow = true;
box6.receiveShadow = true;
this.addObjectToGroup(box6);

// create a new mesh with sphere geometry -
var box7 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    map: ENGINE.TextureLoader().loadTexture( 'dartsGame/stripes.jpeg' ) 	})
   );
box7.castShadow = true;
box7.receiveShadow = true;
this.addObjectToGroup(box7);

// create a new mesh with sphere geometry -
var box8 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box8.castShadow = true;
box8.receiveShadow = true;
this.addObjectToGroup(box8);

// create a new mesh with sphere geometry -
var box9 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box9.castShadow = true;
box9.receiveShadow = true;
this.addObjectToGroup(box9);

// create a new mesh with sphere geometry -
var box10 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {   map: ENGINE.TextureLoader().loadTexture( 'dartsGame/stripes.jpeg' ) 	})
   );
box10.castShadow = true;
box10.receiveShadow = true;
this.addObjectToGroup(box10);

// create a new mesh with sphere geometry -
var box11 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box11.castShadow = true;
box11.receiveShadow = true;
this.addObjectToGroup(box11);

// create a new mesh with sphere geometry -
var box12 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    map: ENGINE.TextureLoader().loadTexture( 'dartsGame/stripes.jpeg' ) 	})
   );
box12.castShadow = true;
box12.receiveShadow = true;
this.addObjectToGroup(box12);

// create a new mesh with sphere geometry -
var box13 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box13.castShadow = true;
box13.receiveShadow = true;
this.addObjectToGroup(box13);

// create a new mesh with sphere geometry -
var box14 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box14.castShadow = true;
box14.receiveShadow = true;
this.addObjectToGroup(box14);

// create a new mesh with sphere geometry -
var box15 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box15.castShadow = true;
box15.receiveShadow = true;
this.addObjectToGroup(box15);

// create a new mesh with sphere geometry -
var box16 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box16.castShadow = true;
box16.receiveShadow = true;
this.addObjectToGroup(box16);

// create a new mesh with sphere geometry -
var box17 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    map: ENGINE.TextureLoader().loadTexture( 'dartsGame/stripes.jpeg' ) 	})
   );
box17.castShadow = true;
box17.receiveShadow = true;
this.addObjectToGroup(box17);

// create a new mesh with sphere geometry -
var box18 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {    color: 0xCC0000	})
   );
box18.castShadow = true;
box18.receiveShadow = true;
this.addObjectToGroup(box18);

// create a new mesh with sphere geometry -
var box19 = new THREE.Mesh(
 new THREE.CylinderGeometry(radius,height, segments, rings),
   new THREE.MeshPhongMaterial( {   map: ENGINE.TextureLoader().loadTexture( 'dartsGame/stripes.jpeg' ) 		})
   );
box19.castShadow = true;
box19.receiveShadow = true;
this.addObjectToGroup(box19);

// Cannon
var world = new CANNON.World();
world.gravity.set(0,-9.82,0);   // set gravity in negative y direction

world.solver.iterations = 20; // Increase solver iterations (default is 10)
world.solver.tolerance = 0.01;   // Force solver to use all iterations

// a simple one is available in the library
world.broadphase = new CANNON.NaiveBroadphase();

// a simple one is available in the library
var mass = 10, radius = 5;
var mat = new CANNON.Material();
var boxShape = new CANNON.Box(new CANNON.Vec3(2.5,2.5,2.5));    // Step 1
var boxBody = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody.addShape(boxShape);
boxBody.position.set(24,4,50);
world.add(boxBody);                          // Step 3

var boxBody2 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody2.addShape(boxShape);
boxBody2.position.set(4,3,4);
world.add(boxBody2);                          // Step 3

var boxBody3 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody3.addShape(boxShape);
boxBody3.position.set(9,3,4);
world.add(boxBody3);                          // Step 4

var boxBody4 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody4.addShape(boxShape);
boxBody4.position.set(14,3,4);
world.add(boxBody4);                          // Step 4

var boxBody5 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody5.addShape(boxShape);
boxBody5.position.set(11.5,10,4);
world.add(boxBody5);

var boxBody6 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody6.addShape(boxShape);
boxBody6.position.set(6.5,10,4);
world.add(boxBody6);

var boxBody7 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody7.addShape(boxShape);
boxBody7.position.set(9,17,4);
world.add(boxBody7);

var boxBody8 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody8.addShape(boxShape);
boxBody8.position.set(-8,3,4);
world.add(boxBody8);                          // Step 3

var boxBody9 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody9.addShape(boxShape);
boxBody9.position.set(-13,3,4);
world.add(boxBody9);                          // Step 4

var boxBody10 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody10.addShape(boxShape);
boxBody10.position.set(-18,3,4)
world.add(boxBody10);                          // Step 4

var boxBody11 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody11.addShape(boxShape);
boxBody11.position.set(-15.5,10,4);
world.add(boxBody11);

var boxBody12 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody12.addShape(boxShape);
boxBody12.position.set(-10.5,10,4);
world.add(boxBody12);

var boxBody13 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody13.addShape(boxShape);
boxBody13.position.set(-12.9,17.5,4);;
world.add(boxBody13);

var boxBody14 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody14.addShape(boxShape);
boxBody14.position.set(24,3,4);
world.add(boxBody14);                          // Step 3

var boxBody15 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody15.addShape(boxShape);
boxBody15.position.set(29,3,4);
world.add(boxBody15);                          // Step 4

var boxBody16 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody16.addShape(boxShape);
boxBody16.position.set(34,3,4);
world.add(boxBody16);                          // Step 4

var boxBody17 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody17.addShape(boxShape);
boxBody17.position.set(31.5,10,4);
world.add(boxBody17);

var boxBody18 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody18.addShape(boxShape);
boxBody18.position.set(26.5,10,4);
world.add(boxBody18);

var boxBody19 = new CANNON.Body({mass: mass, material: mat}); // Step 2
boxBody19.addShape(boxShape);
boxBody19.position.set(28.9,17.5,4);
world.add(boxBody19);


var plane = new CANNON.Plane();
var groundBody = new CANNON.Body({ mass: 0, material: mat });
groundBody.addShape(plane);
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
world.add(groundBody);

// Create contact material behaviour
var mat_mat = new CANNON.ContactMaterial(mat, mat, { friction: 0.5, restitution: 0.7 });
world.addContactMaterial(mat_mat);


this.getInstance().position.set(-50, 0, -265);
this.getInstance().rotation.set(0, Math.PI/ 2, 0);
this.getInstance().scale.set(0.6, 0.8, 1);


var postionChosen = null;
       this.Initialise = function(){
            boxBody.position.set(32,4,50);
        }

        this.ChosePosition = function(){   
            boxBody.position.x -= 0.5;
                if (boxBody.position.x > 32)
                {
                    this.Initialise();
                   postionChosen = boxBody.position.x 


                }
               else if (boxBody.position.x < -20)
                {
                    this.Initialise();
                    postionChosen = boxBody.position.x 
                }
        }

            this.Fire = function()
            {  
                postionChosen = boxBody.position.x 
                boxBody.position.z -= 1;
                if (boxBody.position.z < -50)
                {
                    this.Initialise();

                }
            }


        /**
         * Updates the object. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute
         *                              the previous frame of 
         *                              animation.
         */
         var timeStep = 1.0 / 60.0;   // seconds
        this.update = function(frameTime) { 
           world.step(timeStep);
   box1.position.x = boxBody.position.x;
   box1.position.y = boxBody.position.y;
   box1.position.z = boxBody.position.z;
   box1.quaternion.x = boxBody.quaternion.x;
   box1.quaternion.y = boxBody.quaternion.y;
   box1.quaternion.z = boxBody.quaternion.z;
   box1.quaternion.w = boxBody.quaternion.w;

   box2.position.x = boxBody2.position.x;
   box2.position.y = boxBody2.position.y;
   box2.position.z = boxBody2.position.z;
   box2.quaternion.x = boxBody2.quaternion.x;
   box2.quaternion.y = boxBody2.quaternion.y;
   box2.quaternion.z = boxBody2.quaternion.z;
   box2.quaternion.w = boxBody2.quaternion.w;

   box3.position.x = boxBody3.position.x;
   box3.position.y = boxBody3.position.y;
   box3.position.z = boxBody3.position.z;
   box3.quaternion.x = boxBody3.quaternion.x;
   box3.quaternion.y = boxBody3.quaternion.y;
   box3.quaternion.z = boxBody3.quaternion.z;
   box3.quaternion.w = boxBody3.quaternion.w;
      
   box4.position.x = boxBody4.position.x;
   box4.position.y = boxBody4.position.y;
   box4.position.z = boxBody4.position.z;
   box4.quaternion.x = boxBody4.quaternion.x;
   box4.quaternion.y = boxBody4.quaternion.y;
   box4.quaternion.z = boxBody4.quaternion.z;
   box4.quaternion.w = boxBody4.quaternion.w;

   box5.position.x = boxBody5.position.x;
   box5.position.y = boxBody5.position.y;
   box5.position.z = boxBody5.position.z;
   box5.quaternion.x = boxBody5.quaternion.x;
   box5.quaternion.y = boxBody5.quaternion.y;
   box5.quaternion.z = boxBody5.quaternion.z;
   box5.quaternion.w = boxBody5.quaternion.w;

   box6.position.x = boxBody6.position.x;
   box6.position.y = boxBody6.position.y;
   box6.position.z = boxBody6.position.z;
   box6.quaternion.x = boxBody6.quaternion.x;
   box6.quaternion.y = boxBody6.quaternion.y;
   box6.quaternion.z = boxBody6.quaternion.z;
   box6.quaternion.w = boxBody6.quaternion.w;

   box7.position.x = boxBody7.position.x;
   box7.position.y = boxBody7.position.y;
   box7.position.z = boxBody7.position.z;
   box7.quaternion.x = boxBody7.quaternion.x;
   box7.quaternion.y = boxBody7.quaternion.y;
   box7.quaternion.z = boxBody7.quaternion.z;
   box7.quaternion.w = boxBody7.quaternion.w;

   box8.position.x = boxBody8.position.x;
   box8.position.y = boxBody8.position.y;
   box8.position.z = boxBody8.position.z;
   box8.quaternion.x = boxBody8.quaternion.x;
   box8.quaternion.y = boxBody8.quaternion.y;
   box8.quaternion.z = boxBody8.quaternion.z;
   box8.quaternion.w = boxBody8.quaternion.w;

   box9.position.x = boxBody9.position.x;
   box9.position.y = boxBody9.position.y;
   box9.position.z = boxBody9.position.z;
   box9.quaternion.x = boxBody9.quaternion.x;
   box9.quaternion.y = boxBody9.quaternion.y;
   box9.quaternion.z = boxBody9.quaternion.z;
   box9.quaternion.w = boxBody9.quaternion.w;
      
   box10.position.x = boxBody10.position.x;
   box10.position.y = boxBody10.position.y;
   box10.position.z = boxBody10.position.z;
   box10.quaternion.x = boxBody10.quaternion.x;
   box10.quaternion.y = boxBody10.quaternion.y;
   box10.quaternion.z = boxBody10.quaternion.z;
   box10.quaternion.w = boxBody10.quaternion.w;
  
   box11.position.x = boxBody11.position.x;
   box11.position.y = boxBody11.position.y;
   box11.position.z = boxBody11.position.z;
   box11.quaternion.x = boxBody11.quaternion.x;
   box11.quaternion.y = boxBody11.quaternion.y;
   box11.quaternion.z = boxBody11.quaternion.z;
   box11.quaternion.w = boxBody11.quaternion.w;
     
   box12.position.x = boxBody12.position.x;
   box12.position.y = boxBody12.position.y;
   box12.position.z = boxBody12.position.z;
   box12.quaternion.x = boxBody12.quaternion.x;
   box12.quaternion.y = boxBody12.quaternion.y;
   box12.quaternion.z = boxBody12.quaternion.z;
   box12.quaternion.w = boxBody12.quaternion.w;
   
   box13.position.x = boxBody13.position.x;
   box13.position.y = boxBody13.position.y;
   box13.position.z = boxBody13.position.z;
   box13.quaternion.x = boxBody13.quaternion.x;
   box13.quaternion.y = boxBody13.quaternion.y;
   box13.quaternion.z = boxBody13.quaternion.z;
   box13.quaternion.w = boxBody13.quaternion.w;

   box14.position.x = boxBody14.position.x;
   box14.position.y = boxBody14.position.y;
   box14.position.z = boxBody14.position.z;
   box14.quaternion.x = boxBody14.quaternion.x;
   box14.quaternion.y = boxBody14.quaternion.y;
   box14.quaternion.z = boxBody14.quaternion.z;
   box14.quaternion.w = boxBody14.quaternion.w;

   box15.position.x = boxBody15.position.x;
   box15.position.y = boxBody15.position.y;
   box15.position.z = boxBody15.position.z;
   box15.quaternion.x = boxBody15.quaternion.x;
   box15.quaternion.y = boxBody15.quaternion.y;
   box15.quaternion.z = boxBody15.quaternion.z;
   box15.quaternion.w = boxBody15.quaternion.w;
      
   box16.position.x = boxBody16.position.x;
   box16.position.y = boxBody16.position.y;
   box16.position.z = boxBody16.position.z;
   box16.quaternion.x = boxBody16.quaternion.x;
   box16.quaternion.y = boxBody16.quaternion.y;
   box16.quaternion.z = boxBody16.quaternion.z;
   box16.quaternion.w = boxBody16.quaternion.w;
  
   box17.position.x = boxBody17.position.x;
   box17.position.y = boxBody17.position.y;
   box17.position.z = boxBody17.position.z;
   box17.quaternion.x = boxBody17.quaternion.x;
   box17.quaternion.y = boxBody17.quaternion.y;
   box17.quaternion.z = boxBody17.quaternion.z;
   box17.quaternion.w = boxBody17.quaternion.w;
     
   box18.position.x = boxBody18.position.x;
   box18.position.y = boxBody18.position.y;
   box18.position.z = boxBody18.position.z;
   box18.quaternion.x = boxBody18.quaternion.x;
   box18.quaternion.y = boxBody18.quaternion.y;
   box18.quaternion.z = boxBody18.quaternion.z;
   box18.quaternion.w = boxBody18.quaternion.w;
     
   box19.position.x = boxBody19.position.x;
   box19.position.y = boxBody19.position.y;
   box19.position.z = boxBody19.position.z;
   box19.quaternion.x = boxBody19.quaternion.x;
   box19.quaternion.y = boxBody19.quaternion.y;
   box19.quaternion.z = boxBody19.quaternion.z;
   box19.quaternion.w = boxBody19.quaternion.w;
        
        
         
            //Choose Position
         this.ChosePosition(); 
         if(m_player && !(m_player.geustures === undefined)) {
            if(m_player.geustures.MoonIsMooning()) { 
               this.Fire();
            }
            else {
               this.ChosePosition(); 
            }
         }
      }        
   }
}