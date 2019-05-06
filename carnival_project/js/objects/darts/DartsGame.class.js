/**
 * Class representing darts game.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Zoe Irwin
 * @date    23/02/2019
 * @version 2.0 - 05/05/2019
 */
class DartsGame extends ENGINE.OBJECTS.ClassicObject {
    /**
     * Constructor for a darts game.
     */
    constructor(position) {
        //Construct the superclass.
        super(position);

        //[ Base].
        let Base1= new THREE.BoxGeometry(35, 10, 10);
        let Base2 = new THREE.MeshBasicMaterial({ 
            map: ENGINE.TextureLoader().loadTexture( 'dartsGame/stripes.jpeg' ) 
        });
    
        let Base = new THREE.Mesh(Base1, Base2);
        Base.castShadow = true;
        Base.receiveShadow = true;
           
        //[ tabletop].
        let tabletop1= new THREE.BoxGeometry(35, 1.5, 11);
        let tabletop2= new THREE.MeshPhongMaterial( { color: 0x654321 } );
        let tabletop = new THREE.Mesh(tabletop1, tabletop2);
        tabletop.castShadow = true;
        tabletop.receiveShadow = true;
        tabletop.position.y = 5.7;
        tabletop.position.z = 0.2;
           
        //back pane
        let backPane1 = new THREE.PlaneGeometry( 35, 18 );
        let backPane2= new THREE.MeshBasicMaterial({ 
            map: ENGINE.TextureLoader().loadTexture( 'dartsGame/sign.jpg' ),
            side: THREE.FrontSide,
            flatShading: THREE.FlatShading
        });
        let backPane = new THREE.Mesh(backPane1, backPane2);
        backPane.castShadow = true;
        backPane.receiveShadow = true;
        backPane.position.z = -4.8;
        backPane.position.y = 15;

        //backBorder
        let backBorder1 = new THREE.BoxGeometry( 38, 30, 0.5 );
        let backBorder2 = new THREE.MeshPhongMaterial( { color: 0x654321} );
        let backBorder = new THREE.Mesh(backBorder1, backBorder2);
        backBorder.castShadow = true;
        backBorder.receiveShadow = true;
        backBorder.position.z = -5.2;
        backBorder.position.y = 10;

        //[balloon1].
        let balloon11= new THREE.TorusBufferGeometry(0.2, 1, 20, 100);
        let balloon12= new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        let balloon1 = new THREE.Mesh(balloon11, balloon12);
        balloon1.castShadow = true;
        balloon1.receiveShadow = true;
        balloon1.position.y = 21.5;
        balloon1.position.z = -4.2;
        balloon1.position.x = -5; 

        //[balloon2].
        let balloon21= new THREE.TorusBufferGeometry(0.2, 1, 20, 100);
        let balloon22= new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        let balloon2 = new THREE.Mesh(balloon21, balloon22);
        balloon2.castShadow = true;
        balloon2.receiveShadow = true;
        balloon2.position.y = 21.5;
        balloon2.position.z = -4.2;
        balloon2.position.x = 5; 
                        
        //[balloon3].
        let balloon31= new THREE.TorusBufferGeometry(0.2, 1, 20, 100);
        let balloon32= new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        let balloon3 = new THREE.Mesh(balloon31, balloon32);
        balloon3.castShadow = true;
        balloon3.receiveShadow = true;
        balloon3.position.y = 19;
        balloon3.position.z = -4.2;
        balloon3.position.x = 12; 
            
        //[balloon4].
        let balloon41= new THREE.TorusBufferGeometry(0.2, 1, 20, 100);
        let balloon42= new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        let balloon4 = new THREE.Mesh(balloon41, balloon42);
        balloon4.castShadow = true;
        balloon4.receiveShadow = true;
        balloon4.position.y = 11;
        balloon4.position.z = -4.2;
        balloon4.position.x = 12; 
        
        //[balloon5].
        let balloon51= new THREE.TorusBufferGeometry(0.2, 1, 20, 100);
        let balloon52= new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        let balloon5 = new THREE.Mesh(balloon51, balloon52);
        balloon5.castShadow = true;
        balloon5.receiveShadow = true;
        balloon5.position.y = 9;
        balloon5.position.z = -4.2;
        balloon5.position.x = 5; 
            
        //[balloon6].
        let balloon61= new THREE.TorusBufferGeometry(0.2, 1, 20, 100);
        let balloon62= new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        let balloon6 = new THREE.Mesh(balloon61, balloon62);
        balloon6.castShadow = true;
        balloon6.receiveShadow = true;
        balloon6.position.y = 9;
        balloon6.position.z = -4.2;
        balloon6.position.x = -5; 
            
        //[balloon7].
        let balloon71= new THREE.TorusBufferGeometry(0.2, 1, 20, 100);
        let balloon72= new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        let balloon7 = new THREE.Mesh(balloon71, balloon72);
        balloon7.castShadow = true;
        balloon7.receiveShadow = true;
        balloon7.position.y = 11;
        balloon7.position.z = -4.2;
        balloon7.position.x = -12; 
            
        //[balloon8].
        let balloon81= new THREE.TorusBufferGeometry(0.2, 1, 20, 100);
        let balloon82= new THREE.MeshPhongMaterial( { color: 0xffff00 } );
        let balloon8 = new THREE.Mesh(balloon81, balloon82);
        balloon8.castShadow = true;
        balloon8.receiveShadow = true;
        balloon8.position.y = 19;
        balloon8.position.z = -4.2;
        balloon8.position.x = -12;

        //Add to the object group.
        this.addObjectToGroup(Base);
        this.addObjectToGroup(tabletop);
        this.addObjectToGroup(backPane);
        this.addObjectToGroup(backBorder);
        this.addObjectToGroup(balloon1);
        this.addObjectToGroup(balloon2);
        this.addObjectToGroup(balloon3);
        this.addObjectToGroup(balloon4);
        this.addObjectToGroup(balloon5);
        this.addObjectToGroup(balloon6);
        this.addObjectToGroup(balloon7);
        this.addObjectToGroup(balloon8);

        //Scale and position the game.
        this.getInstance().scale.set(0.75, 0.75, 0.75);
        this.getInstance().position.set(-20, 2.8, -350);
        this.getInstance().rotation.set(0,Math.PI/2,0);


        /**
         * Updates once every frame.
         * (Abstract class which must be overridden from the superclass.)
         * @param {number} frameTime - The time taken to compute the previous
         *                             frame of animation. 
         */
        this.update = function(frameTime) { }
      }
 }
