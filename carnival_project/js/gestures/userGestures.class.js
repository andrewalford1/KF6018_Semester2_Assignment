/**
 * A class representing the users's gestures.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Ana-Sabina Irimia
 * @date 30/03/2019
 * @version 1.0 - 30/03/2019
 */
class UserGestures 
{ 
    /**
     * Constructor for the tent.
     * @param {THREE.Vector3} position - 
     */
    constructor(player)
        {
            let spineMiddle = player.getJoint(1);
            let leftSholderMesh = player.getJoint(4);
            let leftHandMesh = player.getJoint(7);
            let rightSholderMesh = player.getJoint(8);
            let rightHandMesh = player.getJoint(11);
            let spineSholder = player.getJoint(20);

            this.handAboveSholder = function() {
                if(leftHandMesh.position.y > leftSholderMesh.position.y ||  rightHandMesh.position.y > rightSholderMesh.position.y ) {
                    console.log("I want to touch the sky.");
                    return true;
                }
                return false
            }
            /**
             * Creates the function kameHameHa
             * After the function is defined in the UserGestures class you have to define it in kinect.js as well
            */
            this.kameHameHa = function() {
                if( leftHandMesh.position.y < spineSholder.position.y &&
                    rightSholderMesh.position.y < spineSholder.position.y &&
                    leftHandMesh.position.y >= spineMiddle.position.y &&
                    rightSholderMesh.position.y >= spineMiddle.position.y){
                    console.log("The sky is the limit.");
                    return true;
                }
                return false
            }
        }
}