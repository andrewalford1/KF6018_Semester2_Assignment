/**
 * A class representing the GUI that controls the lighting.
 * @author  Ana-Sabina Irimia
 * @date    02/05/2019
 * @version 1.0 - 02/05/2019
 */
class LightGUI extends ENGINE.OBJECTS.ClassicObject { 

    constructor() {

        super();

        const GUI = new dat.GUI({ load: JSON });
        /**
        let light = {

            "SkyColor": 0x4F8AD9,
            "GroundColor": 0x444444,
            "Intensity": 2
        }
        //-----------------------------------
        
        let hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        this.addObjectToGroup(hemiLight);
        //-----------------------------------
        let params = {

            SkyColor: Object.keys( light )[ 0 ],
            GroundColor: Object.keys( light )[ 1 ],
            Intensity: Object.keys( light )[ 2 ]
        }
*/
        this.paramGUI = function(){
            
            this.SkyColor = "#4F8AD9";
            this.GroundColor = "#444444";
            this.Intensity = 2;   
        }
    
        let colorFolder = GUI.addFolder('Light Colors');

        this.displayGUI = function(){
            let params = new this.paramGUI();
            colorFolder.addColor(params, 'SkyColor');
            colorFolder.addColor(params, 'GroundColor');
            GUI.add(params, 'Intensity',-1,4);
            colorFolder.open();
            GUI.open();

            //GUI.remember(params);

        }//end displayGUI()
        this.displayGUI();
        /**
         * Updates the GUI.
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
         this.update = function(frametime){
            //this.displayGUI();
         }//end update()

    }//end constructor()
}//end LightGui