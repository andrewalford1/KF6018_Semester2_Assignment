"use strict";

/**
 * Class representing whack-a-mole table.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author  Zoe Irwin
 * @date    11/02/2019
 * @version 1.3 - 30/03/2019
 */
class WhackAMole extends ENGINE.OBJECTS.ClassicObject {
    
    /**
     * Whack-a-mole constructor.
     */
    constructor(position) {
        //Construct the superclass.
        super(position);

        //Tracks the user playing the game.
        let m_player = {
            leftHand  : null,
            rightHand : null
            
        };

        //[m_moles] Tracks all the moles in the game.
        let m_moles = [];
        //The number of moles in the game
        let numberOfMoles = 5;
        //Variable that will hold the mole that changes its position
        let mole;
        //Variable that holds the last mole that changed its position
        let lastMole;

        //Define Materials...
        const BLACK_MAT = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const TABLE_MAT = new THREE.MeshPhongMaterial({ color: 0xA54F20 });

        //[Table Base].
        let tableBase = new THREE.Mesh(
            new THREE.BoxGeometry(15, 10, 20), 
            new THREE.MeshPhongMaterial({ color: 0x2f8341 })
        );
        tableBase.castShadow = true;
        tableBase.receiveShadow = true;

        //[Table Base Outline]. 
        let tableBaseOutline = new THREE.LineSegments(
            new THREE.EdgesGeometry( 
                new THREE.BoxGeometry(15, 10, 20) 
            ), 
            new THREE.LineBasicMaterial({ color: 0x14401d })
        );

        //[Table Back].
        let tableBack = new THREE.Mesh(
            new THREE.PlaneGeometry(15, 11, 1), 
            new THREE.MeshBasicMaterial({ 
                map: ENGINE.TextureLoader().loadTexture('whackAMole/mole.jpg'), 
                side: THREE.BackSide 
            })
        );
        tableBack.position.set(0, 9.8, -9.55);
        tableBack.rotation.x = 180 * (Math.PI / 180);
        tableBack.castShadow = true;
        tableBack.receiveShadow = true;

        //[Table MoleBack].
        let tableMoleBack = new THREE.Mesh(
            new THREE.BoxGeometry(15, 11, 0.1), 
            new THREE.MeshPhongMaterial({ color: 0x2f8341 })
        );
        tableMoleBack.position.z = -9.95;
        tableMoleBack.position.y = 9.8;
        tableMoleBack.castShadow = true;
        tableMoleBack.receiveShadow = true;

        //[Table border].
        let tableBorder = new THREE.Mesh(
            new THREE.BoxGeometry(15, 1, 1), 
            TABLE_MAT
        );
        tableBorder.position.z = -9.55;
        tableBorder.position.y = 15.75;
        tableBorder.castShadow = true;
        tableBorder.receiveShadow = true;

        //[Table border RightBack].
        let tableBorderRightBack = new THREE.Mesh(
            new THREE.BoxGeometry(1, 11.2, 1), 
            TABLE_MAT
        );
        tableBorderRightBack.position.set(7.95, 10.65, -9.55);
        tableBorderRightBack.castShadow = true;
        tableBorderRightBack.receiveShadow = true;

        //[Table border LeftBack].
        let tableBorderLeftBack = new THREE.Mesh(
            new THREE.BoxGeometry(1, 11.2, 1), 
            TABLE_MAT
        );
        tableBorderLeftBack.position.set(-7.95, 10.65, -9.55);
        tableBorderLeftBack.castShadow = true;
        tableBorderLeftBack.receiveShadow = true;

        //[Table border Right].
        let tableBorderRight = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 20.05), 
            TABLE_MAT
        );
        tableBorderRight.position.x = 7.95;
        tableBorderRight.position.y = 5;
        tableBorderRight.castShadow = true;
        tableBorderRight.receiveShadow = true;

        //[Table border Left].
        let tableBorderLeft = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 20.05), 
            TABLE_MAT
        );
        tableBorderLeft.position.x = -7.95;
        tableBorderLeft.position.y = 5;
        tableBorderLeft.castShadow = true;
        tableBorderLeft.receiveShadow = true;

        //[Table border RightFront].
        let tableBorderRightFront = new THREE.Mesh(
            new THREE.BoxGeometry(1, 10, 1), 
            TABLE_MAT
        );
        tableBorderRightFront.position.set(7.95, 0, 9.5);
        tableBorderRightFront.castShadow = true;
        tableBorderRightFront.receiveShadow = true;
        
        //[Table border LeftFront].
        let tableBorderLeftFront = new THREE.Mesh(
            new THREE.BoxGeometry(1, 10, 1), 
            TABLE_MAT
        );
        tableBorderLeftFront.position.set(-7.95, 0, 9.5);
        tableBorderLeftFront.castShadow = true;
        tableBorderLeftFront.receiveShadow = true;

        //[Score].
        let score = new THREE.Mesh(
            new THREE.BoxGeometry(4, 2, 0.1), 
            BLACK_MAT
        );
        score.position.z = -9.5;
        score.position.y = 9.5;
        score.receiveShadow = true;

        //[BlackSquare].
        let blackSquare = new THREE.Mesh(
            new THREE.BoxGeometry(7, 7, 0.1), 
            BLACK_MAT
        );
        blackSquare.position.z = 10;
        blackSquare.position.y = 0.0;
        blackSquare.receiveShadow = true;

        //[insertMoneyArea].
        let insertMoneyArea = new THREE.Mesh(
            new THREE.BoxGeometry(3, 4, 0.1), 
            new THREE.MeshPhongMaterial({ color: 0x242121 })
        );
        insertMoneyArea.position.set(-1.4, 0.9, 10.1);
        insertMoneyArea.receiveShadow = true;

        //[insertMoney].
        let insertMoney = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.5, 0.2), 
            BLACK_MAT
        );
        insertMoney.position.set(-0.7, 1.3, 10.3);
        insertMoney.receiveShadow = true;

        //[go].
        let go = new THREE.Mesh(
            new THREE.TorusBufferGeometry(0.05, 0.5, 20, 100), 
            new THREE.MeshPhongMaterial({ color: 0x00f034 })
        );
        go.position.set(-2, 2, 10.1);
        go.receiveShadow = true;

        //[goArea].
        let goArea = new THREE.Mesh(
            new THREE.TorusBufferGeometry(0.5, 0.1, 16, 100), 
            BLACK_MAT
        );
        goArea.position.set(-2, 2, 10.2);
        goArea.receiveShadow = true;

        //[eject].
        let eject = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.01), 
            new THREE.MeshPhongMaterial({ color: 0xff0000 })
        );
        eject.position.set(-1.7, 0.7, 10.3);
        eject.receiveShadow = true;

        //immediately use the texture for material creation.
        let mudTexture = ENGINE.TextureLoader().loadTexture('whackAMole/mud.jpg');

        //[Mud Ring back].
        let mudRingBack = new THREE.Mesh(
            new THREE.TorusBufferGeometry( 10, 3, 16, 100 ), 
            new THREE.MeshPhongMaterial({ color: 0x40261d })
        );
        mudRingBack.position.z = -10;
        mudRingBack.position.y = 8.0;
        mudRingBack.castShadow = true;
        mudRingBack.receiveShadow = true;

        //[hole front left].
        let holeFrontLeft = new THREE.Mesh(
            new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 ), 
            BLACK_MAT
        );
        holeFrontLeft.position.set(-3.5, 5, 6);

        //[Mud Ring front Left].
        let mudRingFrontLeft = new THREE.Mesh(
            new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 ), 
            new THREE.MeshBasicMaterial({ map: mudTexture })
        );
        mudRingFrontLeft.position.set(-3.5, 5, 6);
        mudRingFrontLeft.rotation.x = Math.PI/2;
        mudRingFrontLeft.castShadow = true;
        mudRingFrontLeft.receiveShadow = true;


        //[hole front right].
        let holeFrontRight = new THREE.Mesh(
            new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 ), 
            BLACK_MAT
        );
        holeFrontRight.position.set(3.5, 5, 6);

        //[Mud Ring front right].
        let mudRingFrontRight = new THREE.Mesh(
            new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 ), 
            new THREE.MeshBasicMaterial({ map: mudTexture })
        );
        mudRingFrontRight.position.set(3.5, 5, 6);
        mudRingFrontRight.rotation.x = Math.PI/2;
        mudRingFrontRight.castShadow = true;
        mudRingFrontRight.receiveShadow = true;

        //[hole centre].
        let holeCentre = new THREE.Mesh(
            new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 ), 
            BLACK_MAT
        );
        holeCentre.position.z = 0.7;
        holeCentre.position.y = 5;

        //[Mud Ring Centre].
        let mudRingCentre = new THREE.Mesh(
            new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 ), 
            new THREE.MeshBasicMaterial({ map: mudTexture })
        );
        mudRingCentre.position.z = 0.7;
        mudRingCentre.position.y = 5;
        mudRingCentre.rotation.x = Math.PI/2;
        mudRingCentre.castShadow = true;
        mudRingCentre.receiveShadow = true;

        //[hole back left].
        let holeBackLeft = new THREE.Mesh(
            new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 ), 
            BLACK_MAT
        );
        holeBackLeft.position.set(-3.5, 5, -4);

        //[Mud Ring back Left].
        let mudRingBackLeft = new THREE.Mesh(
            new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 ), 
            new THREE.MeshBasicMaterial({ map: mudTexture })
        );
        mudRingBackLeft.position.set(-3.5, 5, -4);
        mudRingBackLeft.rotation.x = Math.PI/2;
        mudRingBackLeft.castShadow = true;
        mudRingBackLeft.receiveShadow = true;

        //[hole back right].
        let holeBackRight = new THREE.Mesh(
            new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 ), 
            BLACK_MAT
        );
        holeBackRight.position.set(3.5, 5, -4);

        //[Mud Ring back right].
        let mudRingBackRight = new THREE.Mesh(
            new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 ), 
            new THREE.MeshBasicMaterial({ map: mudTexture })
        );
        mudRingBackRight.position.set(3.5, 5, -4);
        mudRingBackRight.rotation.x = Math.PI/2;
        mudRingBackRight.castShadow = true;
        mudRingBackRight.receiveShadow = true;

        //Position of the moles
        let moleCenter      = new Mole(new THREE.Vector3( 0.0, 5.0,  0.7));
        let moleUpperLeft   = new Mole(new THREE.Vector3(-3.5, 5.0, -4.0));
        let moleUpperRight  = new Mole(new THREE.Vector3( 3.5, 5.0, -4.0));
        let moleLowerRight  = new Mole(new THREE.Vector3( 3.5, 5.0,  6.0));
        let moleLowerLeft   = new Mole(new THREE.Vector3(-3.5, 5.0,  6.0));

        //Instansiate the moles.
        m_moles.push(moleCenter, 
            moleUpperLeft, moleUpperRight, 
            moleLowerLeft, moleLowerRight
        );
        m_moles.forEach(mole => {
            mole.setActive(true);
            this.addObjectToGroup(mole.getInstance());
        });
        

        //Add to the object group.
        this.addObjectsToGroup([
            tableBase, tableBaseOutline, tableBack, 
            tableMoleBack, tableBorder, tableBorderRightBack,
            tableBorderLeftBack, tableBorderRightFront, 
            tableBorderLeftFront, tableBorderRight,
            tableBorderLeft, score, blackSquare, 
            insertMoneyArea,
            go, goArea, eject, insertMoney, 
            mudRingFrontLeft,
            holeFrontLeft, 
            mudRingFrontRight, holeFrontRight,
            mudRingCentre, holeCentre,
            mudRingBackLeft, holeBackLeft,
            mudRingBackRight, holeBackRight
        ]);

        //Scale and position the game.
        this.getInstance().scale.set(0.75, 0.75, 0.75);
        this.getInstance().position.set(0, 3, 15);

        //Public Methods...

        /**
         * @brief Assigned a player to the game.
         * @param {Player} player - Who is playing the game?
         */
        this.allocatePlayer = function(player) {
            m_player.leftHand = player.joints[player.jointIndexes.HAND_LEFT].collider;
            m_player.rightHand = player.joints[player.jointIndexes.HAND_RIGHT].collider;
            console.table(m_player);
        }

        this.updateMolePosition = function(){
            
           const maxRandomNumber = Math.round(Math.random()* (numberOfMoles-1));
           const moleArrayIndex = Math.round(Math.random()* 4);
           const moleIndex  = Math.floor(Math.random()*numberOfMoles);
           mole = m_moles[moleArrayIndex];

           let moleIsUp = true;
           if(moleArrayIndex == moleIndex){
                   if(mole == lastMole){
                              console.log("This mole jumped before.")
                              const secondMoleIndex  = Math.floor(Math.random()*numberOfMoles);
                              mole = m_moles[secondMoleIndex];
                              //console.log(mole);
                   }
                   else if(mole != lastMole){
                          if(moleIsUp){
                             mole.molePosition();
                             if(mole.molePosition()){
                                 moleIsUp = false;
                             }
                          }
                  }
           }
        }//end of updateMolePosition()
        
        /**
         * Updates once every frame.
         * (Abstract class which must be overridden from the superclass.)
         * @param {number} frameTime - The time taken to compute the previous
         *                             frame of animation.
         */
        this.update = function(frameTime)
        {
            let speed = frameTime / 5000;

            //Update all the games moles.
            m_moles.forEach(mole => {
                mole.update(frameTime);
                if(m_player.leftHand && m_player.rightHand) {
                    mole.getCollider().checkCollisions([
                        m_player.leftHand,
                        m_player.rightHand
                    ]);
                }
            });
            this.updateMolePosition();
        }
    }
}
