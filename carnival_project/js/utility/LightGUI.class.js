/**
 * A class representing the GUI that controls the lighting.
 * @author  Ana-Sabina Irimia
 * @date    02/05/2019
 * @version 1.0 - 02/05/2019
 */
class LightGUI extends ENGINE.OBJECTS.ClassicObject { 

    constructor() {

        super();

        let GUI = new dat.GUI({ load: this.rememberDefaultJSON, preset: 'Mushrooms' });
        let skyColor = 0x4F8AD9;
        let groundColor = 0x444444;
        let intensity = 0;

        let hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);

        let params = {
            SkyColor: hemiLight.color.getHex(),
            GroundColor: hemiLight.groundColor.getHex(),
            Intensity: hemiLight.intensity
        }

        this.displayGUI = function(){
            let colorFolder = GUI.addFolder('Light Colors');
            GUI.remember(params);
            colorFolder.addColor(params, 'SkyColor').onChange(function(value){
                hemiLight.color.setHex(value);
            });

            colorFolder.addColor(params, 'GroundColor').onChange(function(value){
                hemiLight.groundColor.setHex(value);
            });
            GUI.add(params, 'Intensity',-1,4).onChange(function(value){
                hemiLight.intensity= value;
            });
            colorFolder.close();
            GUI.close();
            //GUI.remember(params);
        }//end displayGUI()

        this.displayGUI();

        this.rememberDefaultJSON = function(){
             return{
                "preset": "Default",
                "remembered": {
                        "Default":{
                              "0":{
                                   "SkyColor": 5212889,
                                   "GroundColor": 4473924,
                                   "Intensity": 0
                              } 
                        },
                        "Mushrooms":{
                              "0":{
                                   "SkyColor": 2166775,
                                   "GroundColor": 982550,
                                   "Intensity": 3
                              } 
                        },
                        "closed": false,
                        "folders": {
                            "Light Colors": {
                              "preset": "Default",
                              "closed": false,
                              "folders": {}
                            }
                         }
                }
             };
        }

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
