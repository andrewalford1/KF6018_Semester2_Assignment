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
            let leftSholderMesh = player.getJoint(4);
            let leftHandMesh = player.getJoint(7);
            let rightSholderMesh = player.getJoint(8);
            let rightHandMesh = player.getJoint(11);

            this.handAboveSholder = function() {
                if(leftHandMesh.position.y > leftSholderMesh.position.y ||  rightHandMesh.position.y > rightSholderMesh.position.y ) {
                    console.log("I want to touch the sky.");
                    return true;
                }
                return false
            }
        }
}