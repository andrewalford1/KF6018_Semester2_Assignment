/**
 * A class representing a Helicopter.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class Whale extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Whale.
     * @param {THREE.Vector3} position - Where the whale is located.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);
     
      //[m_player] The player who controls the cannon.
        let m_player = null;
        
        this.allocatePlayer = function(player) {
            m_player = player;
        }
        //Add the Whale model.
        const WHALE = ENGINE.ObjectLoader().loadModel(
            'whale',
            'glb'
        );

//positions for the starting and ending of whale movement
var startX = -250, endX = -240, startY = 0, endY = 0;

	//create the interpolate curve
	function interpolateCurve(u) {
		if (u > 1)	u = 1;
		if (u < 0)	u = 0;
		
		var x = u * (endX - startX) + startX;
		var y = (Math.cos(u* 60)*60) + startY;
		return [x, y];
	}

	var curStep = 0;

	// get G
	var G = [];
	var sampleNum = 1;
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
		// update orientation of the whale		
		// prepare global tranformation of obj by the Frenet frame
		var mat = new THREE.Matrix4();
		mat.set( w.x, v.x, u.x, 0, w.y, v.y, u.y, 0, w.z, v.z, u.z, 0, 0, 0, 0, 1 );
		WHALE.model.rotation.setFromRotationMatrix(mat);
	}
        //Scale and position the whale
        WHALE.model.scale.set(0.1,0.1,0.1);
        WHALE.model.rotation.set(0,0, Math.PI/2);
        WHALE.model.position.set(-250, -100,-750);
        this.addObjectToGroup(WHALE.model);

        //this is the funciton for the whale to jump out of the pond
        this.WhaleJump = function(){
   	    var steps = 1000;
	   var u = updateCount/steps;
	   if (u > 1) {
       updateCount= 0;
        }
	   //this is for the animation of the whale
	   var vec = getFrenetFrame(getUbyArcLen(u));
	   updateRotbyFrenetFrame(WHALE.model, vec[0], vec[1], vec[2]);

	   // update rect position 
	   var pos = interpolateCurve(getUbyArcLen(u));
	   WHALE.model.position.x = pos[0] ;
	   WHALE.model.position.y = pos[1]+10;
	

	   updateCount ++;
        }
        //this initialises the position of the whale when not jumping out of the pond 
    this.Initialise = function(){
   	           WHALE.model.position.set(-250, -100,-750);
        }

        /**
         * Updates the Whale. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        //[updateCount] Counts how many times this class has
        //been updated.
        let updateCount = 0;

        this.update = function(frameTime){
     if(m_player && !(m_player.gestures === undefined)) 
     {
             if(m_player.gestures.handsOnKnees()) 
      {
                    //this calls the whale function so it  jumps out of the pond
                 this.WhaleJump(); 
       }
              else
         {
                 //this callls the iniialise function to position the whale when not jumping
               this.Initialise(); 
        }


   }
    
}
}
}