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
        let skyColor = 0x4F8AD9;
        let groundColor = 0x444444;
        let intensity = 1;

        let hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        /**
        let light = {

            "SkyColor": 0x4F8AD9,
            "GroundColor": 0x444444,
            "Intensity": 2
        }
        //-----------------------------------
        
        let hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        this.addObjectToGroup(hemiLight);
        //-----------------------------------*/
        let params = {

            SkyColor: hemiLight.color.getHex(),
            GroundColor: hemiLight.groundColor.getHex(),
            Intensity: hemiLight.intensity
        }

/**
        this.paramGUI = function(){
            
            this.SkyColor = "#4F8AD9";
            this.GroundColor = "#444444";
            this.Intensity = 0;   
        }
        */

        this.displayGUI = function(){
            //let params = new this.paramGUI();
            let colorFolder = GUI.addFolder('Light Colors');

            colorFolder.addColor(params, 'SkyColor').onChange(function(value){
                hemiLight.color.setHex(value);
                console.log(value);
                console.log(hemiLight.color);
            });

            colorFolder.addColor(params, 'GroundColor').onChange(function(value){
                hemiLight.groundColor.setHex(value);
            });
            GUI.add(params, 'Intensity',-1,4).onChange(function(value){
                hemiLight.intensity= value;
            });
            colorFolder.open();
            GUI.open();
            GUI.remember(params);
        }//end displayGUI()
        this.displayGUI();
        
         this.renderLight = function(){
            hemiLight.color.getHex() = params.SkyColor;
            hemiLight.groundColor.getHex() = params.GroundColor;
            hemiLight.intensity = params.Intensity;
        }

        //
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