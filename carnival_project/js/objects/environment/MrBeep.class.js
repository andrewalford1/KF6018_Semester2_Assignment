/**
 * A class representing a HotAirBalloon
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class MrBeep extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - Where the HotAirBalloon is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the HotAirBalloon model.
        const MRBEEP = ENGINE.ObjectLoader().loadModel(
            'mrbeep',
            'glb'
        );
        let once = true;

        //Scale and position the HotAirBalloon
        MRBEEP.model.scale.set(0.4, 0.4, 0.4);
        MRBEEP.model.rotation.set(Math.PI/-2, 0, 0);
        MRBEEP.model.position.set(-50, 0, -750);
        MRBEEP.model.castShadow = true;
        MRBEEP.model.receiveShadow = true;
        this.addObjectToGroup(MRBEEP.model);

  // Create a sine-like wave
var curve = new THREE.CubicBezierCurve3( 
	new THREE.Vector3( -100, 0, -1000 ),
	new THREE.Vector3( -70, 0, -750 ),
	new THREE.Vector3( 120, 0,-650 ),
	new THREE.Vector3( 40, 0, -550 ),
);


    // for visualization
    var points = curve.getPoints( 100 );	// sample 100 points
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.LineBasicMaterial( { color : 0x000000 } );

    // Create the final object to add to the scene
    var splineObject = new THREE.Line( geometry, material );
    this.addObjectToGroup(splineObject);
       
        //[updateCount] Counts how many times this class has
        //been updated.
        let updateCount = 0;
        /**
         * Updates the HotAirBalloon. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime)
        {
            var steps = 1000;
    var u = updateCount/steps;
	if (u > 1) {
       updateCount= 0;
    }
        var point = curve.getPoint(u);		// curve function!
	   MRBEEP.model.position.set(point.x, point.y, point.z);
	 
        updateCount ++;
    }
}
}