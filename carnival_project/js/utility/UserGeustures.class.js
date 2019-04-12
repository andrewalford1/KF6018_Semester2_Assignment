/**
 * A class representing the users's geustures.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Ana-Sabina Irimia
 * @date    30/03/2019
 * @version 2.1 - 12/04/2019
 */
class UserGeustures { 
    
    /**
     * Sets up User Guestures.
     * @param {playerFactory} player - The player who's guestures
     *                                 are being tracked. 
     */
    constructor(player) {
        let m_player = player;
        

        /**
         * Updates the players geustures.
         */
        this.update = function() { 
            if(player.handsTogether()) {
                console.log('hands together');
            };

            if(player.leftHandAboveHead()) {
                console.log('left hand Above head');
            }

            if(player.rightHandAboveHead()) {
                console.log('right hand above head');
            }

            if(player.leftHandTouchingHead()) {
                console.log('left hand touching head');
            }

            if(player.rightHandTouchingHead()) {
                console.log('right hand touching head');
            }

            if(player.armsSpread()) {
                console.log('T-Pose');
            }

            if(player.leftHandAboveShoulder()) {
                console.log('Left hand above shoulder');
            }

            if(player.rightHandAboveShoulder()) {
                console.log('Right hand above shoulder');
            }
        }

    }//End of constructor.
}