/**
 * Example class representing a super cool sphere.
 * @extends ENGINE.OBJECTS.RootObject
 * @author Andrew Alford
 * @date 06/02/2019
 * @version 1.0 - 06/02/2019
 */
 class Sphere extends ENGINE.OBJECTS.RootObject
 {
     /**
      * Constructor for a sphere.
      */
      constructor(position)
      {
          //Construct the superclass.
          super(position);

          //[sphere] A sphere which will be part of this object.
          let sphere = new THREE.Points(
              new THREE.SphereBufferGeometry(200, 32, 32),
              new THREE.PointsMaterial({
                  color: 0xFF00FF,
                  size: 6
              })
          );

          //Add the sphere to the object group.
          this.addObjectToGroup(sphere);

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
               let speed = frameTime / 5000;

               sphere.rotation.x += speed * Math.PI;
               sphere.rotation.y += speed * Math.PI;
           }
      }
 }
