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
            let leftHandMesh = player.getJoint(7);
            let rightHandMesh = player.getJoint(11);
            let rightSholderMesh;

            this.handAboveSholder = function() {
                if(leftHandMesh.position.y > rightHandMesh.position.y) {
                    console.log("I am blue.");
                    return true;
                }
                return false
            }
        }
}