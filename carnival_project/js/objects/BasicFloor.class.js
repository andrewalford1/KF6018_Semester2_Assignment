/**
 * A floor made out of three js panes.
 * @author Andrew Alford
 * @date 03/02/2019
 * @version 2.0 - 14/02/2019
 */
 class BasicFloor extends ENGINE.OBJECTS.ClassicObject
 {
     constructor(width)
     {
         //Construct the superclass.
         super(new THREE.Vector3(0, 0, 0))

         let floorMesh = new THREE.Mesh(
             new THREE.PlaneBufferGeometry(width, width),
             new THREE.MeshPhongMaterial({
                 color: 0xEEEEEE,
                 depthWrite: false
             })
         )
         floorMesh.rotation.x = -Math.PI / 2;

         let grid = new THREE.GridHelper(width, width / 100, 0xFF0000, 0xCCCCCC);
         grid.material.opacity = 0.2;
         grid.material.transparent = true

         //Add objects to the group.
         this.addObjectToGroup(floorMesh);
         this.addObjectToGroup(grid);


         /**
          * Updates the object. (Overridden from the superclass).
          * Note: The floor does not need updating.
          * @param {number} frameTime - The time taken to compute the previous
          *                             frame of animation.
          */
         this.update = function(frameTime) { }
     }
 }