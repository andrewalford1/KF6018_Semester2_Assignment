/**
 * Banner to follow Helicopter
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoe Irwin
 * @date 03/05/2019
 * @version 1.0 - 03/05/2019
 */
class Banner extends ENGINE.OBJECTS.ClassicObject {
	/**
	 * constructor for a Basic Character.
	 * @param {THREE.Vector3} initialPosition - The initial position of the
	 *                                          character.
	 */
	constructor(position) {
		// create the video element
		var video = document.createElement('video');
		 video.loop = true;
		// video.id = 'video';
		// video.type = ' video/ogg; codecs="theora, vorbis" ';
		video.src = "js/zoesProposed/test2.mp4";
		video.load(); // must call after setting/changing source
		video.play();
		var videoImage = document.createElement('canvas');
		videoImage.width = 1280;
		videoImage.height = 610;
		videoImage.loop = true;
		var videoImageContext = videoImage.getContext('2d');
		// background color if no video present
		videoImageContext.fillStyle = '#000000';
		videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);
		var videoTexture = new THREE.Texture(videoImage);
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;
		//Construct the superclass.
		super(position);

		function wave(geometry, cycle, height, frmOffset) {
			for (var i = 0; i < geometry.vertices.length; i++) {
				const width = geometry.parameters.width / 2;
				const xPos = (((geometry.vertices[i].x + frmOffset) * cycle) / width) * (Math.PI);
				// compute z-posusing sine function
				var zPos = Math.sin(xPos) * height;
				geometry.vertices[i].z = zPos;
			}
			geometry.verticesNeedUpdate = true;
			geometry.computeVertexNormals();
		}
		var rectGeom = new THREE.PlaneGeometry(7.5, 2, 7.5, 2);
		// create the sphere's material
		var sphereMaterial = new THREE.MeshBasicMaterial({
			map: videoTexture,
			overdraw: true,
			side: THREE.DoubleSide
		});
		// create a new mesh with sphere geometry -
		var rect = new THREE.Mesh(rectGeom, sphereMaterial);
		// add the sphere to the scene
		this.addObjectToGroup(rect);
		wave(rectGeom, 0.75, 0.2);
		var startX = -1000,
			endX = 1000,
			startY = 0,
			endY = 0;

		function interpolateCurve(u) {
			if (u > 1) u = 1;
			if (u < 0) u = 0;
			var x = u * (endX - startX) + startX;
			var y = (Math.cos(u * 30) * 30) + startY;
			return [x, y];
		}
		var curStep = 0;
		// get G
		var G = [];
		var sampleNum = 100;
		G[0] = 0;
		for (var i = 1; i <= sampleNum; i++) {
			var pos1 = interpolateCurve((i - 1) * 1 / sampleNum);
			var pos2 = interpolateCurve(i * 1 / sampleNum);
			// distance between the current point and the previous point
			var distance = Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
			G[i] = distance + G[i - 1];
		}
		// normalize arc length
		for (var i = 1; i <= sampleNum; i++) {
			G[i] /= G[sampleNum];
			//console.log(G[i]);
		}

		function getUbyArcLen(arcLen) {
			for (var i = 0; i <= sampleNum; i++) {
				if (G[i] > arcLen) {
					return (i - 1) * 1 / sampleNum + (arcLen - G[i - 1]) / (G[i] - G[i - 1]) * 1 / sampleNum;
				}
			}
			return 1;
		}

		function getFrenetFrame(t) {
			var stepSize = 0.01;
			u = getUbyArcLen(t);
			pos2 = interpolateCurve(u);
			var pos0 = [0, 0]; // init
			if (t >= stepSize * 2) {
				u = getUbyArcLen(t - stepSize * 2);
				pos0 = interpolateCurve(u);
			} else pos0 = pos2;
			var pos1 = [0, 0]; // init
			if (t >= stepSize) {
				u = getUbyArcLen(t - stepSize);
				pos1 = interpolateCurve(u);
			} else pos1 = pos0;
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
			var w = new THREE.Vector3(posd1[0], posd1[1], 0); // w vector
			var b = new THREE.Vector3(0, 1, 0);
			var u = new THREE.Vector3(); // u vector
			u.crossVectors(w, b);
			// find v : v = u X w
			var v = new THREE.Vector3(); // v (up) vector
			v.crossVectors(u, w);
			w.normalize();
			u.normalize();
			v.normalize();
			return [w, v, u];
		}

		function updateRotbyFrenetFrame(abc, w, v, u) {
			// update orientation of obj		
			// prepare global tranformation of obj by the Frenet frame
			var mat = new THREE.Matrix4();
			mat.set(w.x, v.x, u.x, 0, w.y, v.y, u.y, 0, w.z, v.z, u.z, 0, 0, 0, 0, 1);
			rect.rotation.setFromRotationMatrix(mat);
		}
		//Scale and position the Helicopter
		rect.scale.set(10, 10, 10);
		rect.rotation.set(0, 0, 0);
		rect.position.set(-200, 400, -650);
		var iFrame = 0;
		var ratio = 20;
		this.update = function(frameTime) {
		    
			if (video.readyState === video.HAVE_ENOUGH_DATA) {
				videoImageContext.drawImage(video, 0, 0);
				if (videoTexture) 
				{
				    videoTexture.needsUpdate = true;
				}
			}


			var steps = 1000;
			var u = iFrame / steps;
			if (u > 1) {
				iFrame = 0;
			}
			// update rect orientation
			let vec = getFrenetFrame(getUbyArcLen(u));
			updateRotbyFrenetFrame(rect, vec[0], vec[1], vec[2]);
			// update rect position 
			var pos = interpolateCurve(getUbyArcLen(u));
			rect.position.x = pos[0] + 5;
			rect.position.y = pos[1] + 180;
			iFrame++;
			var frmOffset = iFrame % (rectGeom.parameters.width * ratio);
			if (rect != null) {
				wave(rectGeom, 1,2, frmOffset / ratio);
			}
		}
	}
}
