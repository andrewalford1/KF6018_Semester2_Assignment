/**
 * A class representing a Helicopter.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class Helicopter extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Helicopter.
     * @param {THREE.Vector3} position - Where the tent is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Add the Helicopter model.
        const HELICOPTER = ENGINE.ObjectLoader().loadModel(
            'helicopter',
            'glb'
        );

var startX = -1000, endX = 1000, startY = 0, endY = 0;


	function interpolateCurve(u) {
		if (u > 1)	u = 1;
		if (u < 0)	u = 0;
		
		var x = u * (endX - startX) + startX;
		var y = (Math.cos(u* 30)*30) + startY;
		return [x, y];
	}

	var curStep = 0;

	// get G
	var G = [];
	var sampleNum = 100;
	G[0] = 0;
	for (var i=1;i<=sampleNum;i++) {
		var pos1 = interpolateCurve((i-1)*1/sampleNum);
	    var	pos2 = interpolateCurve(i*1/sampleNum);

		// distance between the current point and the previous point
		var distance = Math.sqrt(Math.pow(pos1[0]-pos2[0],2) + Math.pow(pos1[1]-pos2[1],2));
		G[i] = distance + G[i-1];
	}

	// normalize arc length
	for (var i=1;i<=sampleNum;i++) {
		G[i] /= G[sampleNum]; 

		//console.log(G[i]);
	}

	function getUbyArcLen(arcLen) {
		for (var i=0;i<=sampleNum;i++) {
			if (G[i] > arcLen) {
				return (i-1)*1/sampleNum + (arcLen - G[i-1]) / (G[i] - G[i-1])*1/sampleNum;
			}
		}
		
		return 1;
	}
	function getFrenetFrame(t) {
		var stepSize = 0.01;
			
		u = getUbyArcLen(t);
		pos2 = interpolateCurve(u);

		var pos0 = [0,0];		// init
		if (t>=stepSize*2) {
			u = getUbyArcLen(t-stepSize*2);
			pos0 = interpolateCurve(u);
		} else
			pos0 = pos2;
			

		var pos1 = [0,0];		// init
		if (t>=stepSize) {
			u = getUbyArcLen(t-stepSize);
			pos1 = interpolateCurve(u);
		} else
			pos1 = pos0;
		
		var pos = [];
		var posd0 = [];
		var posd1 = [];
		
		// first derivative - w vector
		posd1[0] = pos2[0] - pos1[0];
		posd1[1] = pos2[1] - pos1[1];
		
		posd0[0] = pos1[0] - pos0[0];
		posd0[1] = pos1[1] - pos0[1];
		
		// second derivative - w vector
		pos[0] = posd1[0] - posd0[0];
		pos[1] = posd1[1] - posd0[1];


		// find u : u = w X (0,1,0)
		var w = new THREE.Vector3( posd1[0], posd1[1], 0 );		// w vector
		var b = new THREE.Vector3( 0, 1, 0 );

		var u = new THREE.Vector3();		// u vector
		u.crossVectors( w, b );

		// find v : v = u X w
		var v = new THREE.Vector3();		// v (up) vector
		v.crossVectors( u, w );

		w.normalize();
		u.normalize();
		v.normalize();
		
		return [ w, v, u ];
	}
			
	function updateRotbyFrenetFrame(abc, w, v, u) {
		// update orientation of obj		
		// prepare global tranformation of obj by the Frenet frame
		var mat = new THREE.Matrix4();
		mat.set( w.x, v.x, u.x, 0, w.y, v.y, u.y, 0, w.z, v.z, u.z, 0, 0, 0, 0, 1 );
		HELICOPTER.model.rotation.setFromRotationMatrix(mat);
	}
        //Scale and position the Helicopter
        HELICOPTER.model.scale.set(15,15,15);
        HELICOPTER.model.rotation.set(0, 0, 0);
        HELICOPTER.model.position.set(-150, 400, -650);
        this.addObjectToGroup(HELICOPTER.model);

        //[onStart] Checks if this is the very first frame of animation.
        let onStart = true;

        //[mixer] Will manage the different animations of the  model.
        let mixer = new THREE.AnimationMixer(HELICOPTER.model);

        /**
         * Updates the Helicopter. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        //[updateCount] Counts how many times this class has
        //been updated.
        let updateCount = 0;

        this.update = function(frameTime)
{
	var steps = 1000;
    var u = updateCount/steps;
	if (u > 1) {
       updateCount= 0;
    }
	//this is for the animation of the train
	var vec = getFrenetFrame(getUbyArcLen(u));
	updateRotbyFrenetFrame(HELICOPTER.model, vec[0], vec[1], vec[2]);

	// update rect position 
	var pos = interpolateCurve(getUbyArcLen(u));
	HELICOPTER.model.position.x = pos[0] ;
	HELICOPTER.model.position.y = pos[1]+200;
	

	updateCount ++;

            //Initialise the object on the fist frame.
            if(onStart)
            {

                //If the Helicopter has animations, animate it.
                if(HELICOPTER.animations)
                {
                    //Initialise the animation.
                    mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            HELICOPTER.animations,
                            HELICOPTER.animations[0].name
                        )).play();
                }
                //Prevent further access to this code.
                onStart = false;
            }

            //Update the animation.
            if(mixer)
            {
                mixer.update(frameTime / 2000);
            }

    }
    }
}