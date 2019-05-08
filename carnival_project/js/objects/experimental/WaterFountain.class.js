/**
 * A class representing a Helicopter.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoë Irwin
 * @date 06/03/2019
 * @version 1.0 - 06/03/2019
 */
class WaterFountain extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for the Helicopter.
     * @param {THREE.Vector3} position - Where the helicopter is located.
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

        //Add the Helicopter model.
        const WATERFOUNTAIN = ENGINE.ObjectLoader().loadModel(
            'waterfountain',
            'glb'
        );


        //Scale and position the Helicopter
        WATERFOUNTAIN.model.scale.set(1.5,1,0.5);
        WATERFOUNTAIN.model.rotation.set(Math.PI, 0, 0);
        WATERFOUNTAIN.model.position.set(-250, 0, -730);
        this.addObjectToGroup(WATERFOUNTAIN.model);

        //[onStart] Checks if this is the very first frame of animation.
        let onStart = true;

        //[mixer] Will manage the different animations of the  model.
        let mixer = new THREE.AnimationMixer(WATERFOUNTAIN.model);

        /**
         * Updates the Helicopter. (Overridden from the superclass).
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
        //[updateCount] Counts how many times this class has
        //been updated.
        let updateCount = 0;
        
        this.Rise = function(){
            
            //Initialise the object on the fist frame.
            if(onStart)
            {

                //If the Helicopter has animations, animate it.
                if(WATERFOUNTAIN.animations)
                {
                    //Initialise the animation.
                    mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            WATERFOUNTAIN.animations,
                            WATERFOUNTAIN.animations[0].name
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
        this.update = function(frameTime)
{
        if(m_player && !(m_player.gestures === undefined)) {
                if(m_player.gestures.LFootToRKnee()) {
                    //Send FireBall
                    this.Rise(); 
                }

    }
    }
}
}
