/**
 * A class representing the GUI that controls the lighting.
 * @author  Ana-Sabina Irimia
 * @date    02/05/2019
 * @version 1.0 - 02/05/2019
 */
class LightGUI extends ENGINE.OBJECTS.ClassicObject { 

    constructor() {

        const GUI = new dat.GUI();
        let streetLumps = {

            "Street Lamp 1": 0,
            "Street Lamp 2": 1,
            "Street Lamp 3": 2,
            "Street Lamp 4": 3,
            "Street Lamp 5": 4,
            "Street Lamp 6": 5,
            "Street Lamp 7": 6,
            "Street Lamp 8": 7,
        }

        let params = {

            streetLamp: Object.keys( streetLumps )[ 0 ],
            exposure: 0.68 
        }

        this.displayGUI = function(){
            
            GUI.add(params, 'Street lamp', Object.keys( streetLumps ) );
            GUI.add(params, 'Exposure',0,1);
            GUI.open();

        }//end displayGUI()

        /**
         * Updates the GUI.
         * @param {number} frameTime - The time taken to compute the
         *                             previous frame of animation.
         */
         this.update = function(frametime){

         }//end update()

    }//end constructor()
}//end LightGui