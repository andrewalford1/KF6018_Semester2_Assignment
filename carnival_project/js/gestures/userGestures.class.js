/**
 * A class representing the users's gestures.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Ana-Sabina Irimia
 * @date    30/03/2019
 * @version 2.0 - 06/04/2019
 */
class UserGestures { 
    
    /**
     * Sets up User Guestures.
     * @param {playerFactory} player - The player who's guestures
     *                                 are being tracked. 
     */
    constructor(player) {
        let m_player = player;
        // let spineBaseMesh = player.getJoint(0);
        // let spineMiddleMesh = player.getJoint(1);
        // let headMesh = player.getJoint(3);
        // let leftSholderMesh = player.getJoint(4);
        // let leftHandMesh = player.getJoint(7);
        // let rightSholderMesh = player.getJoint(8);
        // let rightHandMesh = player.getJoint(11);
        // let spineSholderMesh = player.getJoint(20);
        // //----------------------------------------------------
        // let fDistanceBetweenLHAndRH = Math.sqrt(
        //     (leftHandMesh.position.x - rightHandMesh.position.x)*
        //     (leftHandMesh.position.x - rightHandMesh.position.x)+
        //     (leftHandMesh.position.y - rightHandMesh.position.y)*
        //     (leftHandMesh.position.y - rightHandMesh.position.y)+
        //     (leftHandMesh.position.z - rightHandMesh.position.z)*
        //     (leftHandMesh.position.z - rightHandMesh.position.z)
        // );
        
        // let fSumOfRadius = 0.1;
        // let bcollideLHandRH = fDistanceBetweenLHAndRH < fSumOfRadius;
        
        // //------------------------------------------------------
        // let fDistanceBetweenHeadAndLH = Math.sqrt(
        //     (leftHandMesh.position.x - headMesh.position.x)*
        //     (leftHandMesh.position.x - headMesh.position.x)+
        //     (leftHandMesh.position.y - headMesh.position.y)*
        //     (leftHandMesh.position.y - headMesh.position.y)+
        //     (leftHandMesh.position.z - headMesh.position.z)*
        //     (leftHandMesh.position.z - headMesh.position.z)
        // );
        
        // let bcollideHeadandLH = fDistanceBetweenHeadAndLH < fSumOfRadius;
        
        // //------------------------------------------------------
        
        // let fDistanceBetweenHeadAndRH = Math.sqrt(
        //     (rightHandMesh.position.x - headMesh.position.x)*
        //     (rightHandMesh.position.x - headMesh.position.x)+
        //     (rightHandMesh.position.y - headMesh.position.y)*
        //     (rightHandMesh.position.y - headMesh.position.y)+
        //     (rightHandMesh.position.z - headMesh.position.z)*
        //     (rightHandMesh.position.z - headMesh.position.z)
        // );
        
        // let bcollideHeadandRH = fDistanceBetweenHeadAndRH < fSumOfRadius;
            
        
        /**
         * Creates the function handsAboveSholder
         * After the function is defined in the UserGestures class you have to define it in kinect.js as well
         */
        this.handAboveSholder = function() {
            if(
                leftHandMesh.position.y > leftSholderMesh.position.y || 
                rightHandMesh.position.y > rightSholderMesh.position.y
            ) {
                console.log("I want to touch the sky.");
                return true;
            }
            return false
        }//end of the handAboveSholder class

        /**
         * Creates the function kameHameHa
         * After the function is defined in the UserGestures class you have to define it in kinect.js as well
         */
        this.kameHameHa = function() {
            if(
                (leftHandMesh.position.y < spineSholderMesh.position.y && 
                    leftHandMesh.position.y > spineBaseMesh.position.y) &&
                (rightSholderMesh.position.y < spineSholderMesh.position.y &&
                    rightSholderMesh.position.y > spineBaseMesh.position.y)
            ) {
                console.log("AHHHHHHHHH...KAME HAME HAAAAAAAAAAA.");
                return true;
            }
            return false
        }//end of kameHameHa class

        /**
         * Creates the function handOnHead
         * After the function is defined in the UserGestures class you have to define it in kinect.js as well
         * player.BONE_RADIUS == 0.05
         */
        this.handOnHead = function() {
            //if one of the hands or both collide with the head print ....
            //Collisoin detection between the left hand and the right hand
            if( bcollideHeadandLH || bcollideHeadandRH) {
                console.log("Ohh...My...Gluten.., the moon has a butt.");
                return true;
            }
            return false
        }//end of the handOnHead class

        /**
         * Creates the function leftHandCollideRightHand
         * After the function is defined in the UserGestures class you have to define it in kinect.js as well
         * player.BONE_RADIUS == 0.05
         */
        this.leftHandCollideRightHand = function() {
            //if one of the hands or both collide print ....
            //Collisoin detection between the left hand and the right hand
            if(bcollideLHandRH && bcollideHeadandLH && bcollideHeadandRH) {
                console.log("Oh, Buddha, give us the aid of your strength and your wisdom...");
                return true;
            }
            return false
        }//end of the leftHandCollideRightHand class

        this.update = function() { }
    }//End of constructor.
}