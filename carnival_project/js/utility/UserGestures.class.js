/**
 * A class representing the users's gestures.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Ana-Sabina Irimia & Andrew Alford
 * @date    30/03/2019
 * @version 2.2 - 03/05/2019
 */
class UserGestures { 
    
    /**
     * Sets up User gestures.
     * @param {playerFactory} player - The player who's gestures
     *                                 are being tracked. 
     */
    constructor(player) {

        //[m_player] A reference to the player who's
        //gestures are being tracked.
        let m_player = player;

        //[m_positions] Holds information about the
        //player's current and previous positions.
        let m_positions = [];

        //[PREVIOUS_POSITIONS_TRACKED] The number  
        //of positions that will be tracked.
        const PREVIOUS_POSITIONS_TRACKED = 10;

        //Populate previous positions.
        for(let i = 0; i < PREVIOUS_POSITIONS_TRACKED; i++) {
            m_positions.push(getPlayerPositions());
        }

        //Private Functions...
        
        /**
         * @returns information about the player's current position.
         */
        function getPlayerPositions() {
            return {
                leftHandState: m_player.getLeftHandState(),
                rightHandState: m_player.getLeftHandState(),
                handsTogether: m_player.handsTogether(),
                feetTogether: m_player.feetTogether(),
                leftHandAboveHead: m_player.leftHandAboveHead(),
                rightHandAboveHead: m_player.rightHandAboveHead(),
                leftHandTouchingHead: m_player.leftHandTouchingHead(),
                rightHandTouchingHead: m_player.rightHandTouchingHead(),
                rightFootTouchingLeftKnee: m_player.rightFootTouchingLeftKnee(),
                leftFootTouchingRightKnee: m_player.leftFootTouchingRightKnee(),
                armsSpread: m_player.armsSpread(),
                rightHandTouchingRightKnee: m_player.rightHandTouchingRightKnee(),
                leftHandTouchingLeftKnee: m_player.leftHandTouchingLeftKnee(),
                leftHandAboveShoulder: m_player.leftHandAboveShoulder(),
                rightHandAboveShoulder: m_player.rightHandAboveShoulder()
            };
        }

        //Public Functions...

        this.IsSmashingHammer = function() {

            //The player has their hands together and above their shoulders.
            let stageOne = 
                m_positions[1].handsTogether && 
                m_positions[1].leftHandAboveShoulder && 
                m_positions[1].rightHandAboveShoulder;

            //The player has their hands together and below their shoulders.
            let stageTwo = 
                m_positions[0].handsTogether && 
                !(m_positions[0].leftHandAboveShoulder && 
                    m_positions[0].rightHandAboveShoulder
            );

            return stageOne && stageTwo;
        }

        this.MoonIsMooning = function() {      
            //Both hands are touching the player's head.
            return  m_positions[0].leftHandTouchingHead &&
                    m_positions[0].rightHandTouchingHead; 
        }

        this.RFootToLKnee = function() {      
            //right foot touching left knee
            return  m_positions[0].rightFootTouchingLeftKnee &&
                    m_positions[0].rightFootTouchingLeftKnee; 
        }
        this.LFootToRKnee = function() {      
            //right foot touching left knee
            return  m_positions[0].leftFootTouchingRightKnee &&
                    m_positions[0].leftFootTouchingRightKnee; 
        }

        this.MoonIsSpying = function(){
                //The hands are colliding with each other
                return m_positions[0].handsTogether;
        }

        this.KameHameHa = function(){
                let stageTwo = m_positions[1].handsTogether &&
                               m_positions[1].leftHandTouchingMidSpine &&
                               m_positions[1].rightHandTouchingMidSpine;

                let stageOne = m_positions[0].handsTogether &&
                               !m_positions[0].leftHandTouchingMidSpine &&
                               !m_positions[0].leftHandTouchingMidSpine;

                return stageOne && stageTwo;
        }
        this.Pray = function(){
                return m_positions[0].leftFootTouchingRightKnee &&
                       m_positions[0].handsTogether;
        }
        this.FeetTogether = function(){
                let stageOne = m_positions[0].feetTogether && m_positions[0].armsSpread;

                return stageOne ;
        }
          this.handsOnKnees = function() {
            return m_positions[0].leftHandTouchingLeftKnee && m_positions[0].rightHandTouchingRightKnee;
        }

        this.PointAtTheMoon = function(){
                //The hand has o be above the sholders , pointing, and a leg has to be behind
                let stageTwo = m_positions[1].leftHandAboveShoulder && 
                           m_positions[1].rightHandAboveShoulder
            //The playerhas their left hand on the right sholder and the right hand on the left sholder
            let stageOne = m_positions[0].leftHandTouchingLeftSholder &&
                           m_positions[0].rightHandTouchingRightSholder;
        }

        this.Salute = function(){
            let stageTwo = !m_positions[1].leftHandAboveShoulder && 
                           !m_positions[1].rightHandAboveShoulder
            //The playerhas their left hand on the right sholder and the right hand on the left sholder
            let stageOne = m_positions[0].leftHandTouchingLeftSholder &&
                           m_positions[0].rightHandTouchingRightSholder;

            return stageOne && stageTwo; 
        }
        
        this.HandsInAir = function() {
        //The player has their hands above their shoulders
            let stageOne = 
                m_positions[0].leftHandAboveShoulder && 
                m_positions[0].rightHandAboveShoulder;

            return stageOne;
        }
        
        /**
         * Updates the players gestures.
         */
        this.update = function() { 
            if(ENGINE.isLoaded()) {
                m_positions.unshift(getPlayerPositions());
                m_positions.pop();
                if(this.IsSmashingHammer()) {console.log('Its hammer time ya\'ll');}
                if(this.Pray()){console.log('Shhhhhhhh, the prayer is in session.');}
                if(this.handsOnKnees()) {console.log('Hands on your knees');}
            }
        }

    }//End of constructor.
}
