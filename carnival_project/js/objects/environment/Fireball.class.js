/**
 * A class representing the Fireball.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Zoe Irwin
 * @date    30/03/2019
 * @version 5.1 - 04/04/2019
 */
class Fireball extends ENGINE.OBJECTS.ClassicObject {
    
    /**
     * Constructor for the Fireball.
     * @param {THREE.Vector3} position - Where the Fireball is located.
     */
    constructor(position) {
        //Construct the superclass.
        super(position);


        //[m_player] The player who controls the cannon.
        let m_player = null;
        
        this.allocatePlayer = function(player) {
            m_player = player;
        }
        

            // create the video element
		var video = document.createElement('video');
		 video.loop = true;
		// video.id = 'video';
		// video.type = ' video/ogg; codecs="theora, vorbis" ';
		video.src = "js/zoesProposed/fire.mp4";
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

            this.addObjectToGroup(new THREE.Mesh(
            new THREE.SphereGeometry(3, 10, 10),
            new THREE.MeshPhongMaterial({
                map: videoTexture,
               overdraw: true,
			side: THREE.DoubleSide
            })
        ));
        this.getInstance().position.set(85, 12, -402 );

        this.Initialise = function(){
            this.getInstance().position.set(85, 12, -402 );
        }

        this.videoFireball = function(){
			if (video.readyState === video.HAVE_ENOUGH_DATA) {
				videoImageContext.drawImage(video, 0, 0);
				if (videoTexture) 
				{
				    videoTexture.needsUpdate = true;
				}
			}
        }
        this.ShootFireball = function(){
             this.getInstance().position.x -= 1;
             this.getInstance().position.z -= 0.1;
             if (this.getInstance().position.x < -30)
             {
                 this.Initialise();

             }
        }
        /**
         * Updates the Fireball. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        this.update = function(frameTime) 
        {
        if(m_player.geustures.MoonIsMooning()) {
                //Send FireBall
                this.videoFireball(); 
                this.ShootFireball();   
                }
               else{
                   this.videoFireball(); 
                   this.Initialise();
               }
        }
    }
}