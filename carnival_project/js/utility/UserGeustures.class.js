/**
 * A class representing the users's geustures.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Ana-Sabina Irimia & Andrew Alford
 * @date    30/03/2019
 * @version 2.2 - 03/05/2019
 */
class UserGeustures { 
    
    /**
     * Sets up User Guestures.
     * @param {playerFactory} player - The player who's guestures
     *                                 are being tracked. 
     */
    constructor(player) {

        //[m_player] A reference to the player who's
        //geustures are being tracked.
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
                leftHandAboveHead: m_player.leftHandAboveHead(),
                rightHandAboveHead: m_player.rightHandAboveHead(),
                leftHandTouchingHead: m_player.leftHandTouchingHead(),
                rightHandTouchingHead: m_player.rightHandTouchingHead(),
                armsSpread: m_player.armsSpread(),
                leftHandAboveShoulder: m_player.leftHandAboveShoulder(),
                rightHandAboveShoulder: m_player.rightHandAboveShoulder(),
                upsideDown: m_player.isUpsideDown()
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

        this.rotateRight = function() {
            return m_positions[0].rightHandAboveHead && !m_positions[0].rightHandState.open &&
            !m_positions[0].leftHandAboveShoulder; 
        }

        this.rotateLeft = function() {
            return m_positions[0].leftHandAboveHead && !m_positions[0].leftHandState.open &&
            !m_positions[0].rightHandAboveShoulder;
        }


        this.BigClap = function(){

        }

        this.Salute = function(){

            let stageOne = !(m_positions[1].leftHandAboveShoulder) && 
                           !(m_positions[1].rightHandAboveShoulder);
            
            //The playerhas their left hand on the right sholder and the right hand on the left sholder
            let stageTwo = m_positions[0].rightHandOnLeftShoulder &&
                           m_positions[0].leftHandOnRightShoulder;

            return stageOne && stageTwo; 
        }
        
        /**
         * Updates the players geustures.
         */
        this.update = function() { 
            m_positions.unshift(getPlayerPositions());
            m_positions.pop();

            if(this.IsSmashingHammer()) {
                console.log(`Hammer Smash!`);
            }
            else if(this.MoonIsMooning()) {
                console.log(`Oh my Gluten!!`);
            }
            if (this.Salute()) {
                console.log(`Heil Hydra!`);
            }

            if(this.rotateLeft()) {
                console.log('Rotate Left');
            }
            if(this.rotateRight()) {
                console.log('Rotate Right');
            }
        }

    }//End of constructor.
}