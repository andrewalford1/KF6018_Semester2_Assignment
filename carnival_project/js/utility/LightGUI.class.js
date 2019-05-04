/**
 * A class representing the GUI that controls the lighting.
 * @author  Ana-Sabina Irimia
 * @date    02/05/2019
 * @version 1.0 - 02/05/2019
 */
class LightGUI extends ENGINE.OBJECTS.ClassicObject { 

    constructor() {

        super();
        //Values of the HemisphereLight
        let skyColor = 0x4F8AD9;
        let groundColor = 0x444444;
        let intensity = 0;
        //Creates the HemisphereLight
        let hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        //Saves the values of the HemisphereLight
        let params = {
            SkyColor: hemiLight.color.getHex(),
            GroundColor: hemiLight.groundColor.getHex(),
            Intensity: hemiLight.intensity
        }
        //Creates the GUI
        this.displayGUI = function(){
            //Creates a new GUI variable
            let GUI = new dat.GUI();
            //GUI.remember(params);
            //Creates a folder called Light Colors for the GUI
            let colorFolder = GUI.addFolder('Light Colors');
            //Adds the first color to the folder
            //Lets the player change the color of the sky
            colorFolder.addColor(params, 'SkyColor').onChange(function(value){
                hemiLight.color.setHex(value);
            });
            //Adds the second color to the folder
            //Lets the player change the color of the ground 
            colorFolder.addColor(params, 'GroundColor').onChange(function(value){
                hemiLight.groundColor.setHex(value);
            });
            //Adds the intensity of the light to the GUI
            //Lets the player change the intensity of the light
            GUI.add(params, 'Intensity',-1,4).onChange(function(value){
                hemiLight.intensity= value;
            });
            //Closes the folder when the window is loaded
            colorFolder.close();
            //Closes the GUI when the window is loaded
            GUI.close();
        }//end displayGUI()

        //Cals the displayGUI() function
        this.displayGUI();

        //Adds the HemisphereLight to the scene
        this.addObjectToGroup(hemiLight);
        
        /**
         * Updates the GUI.
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
         this.update = function(frametime){
             
         }//end update()

    }//end constructor()
}//end LightGui
