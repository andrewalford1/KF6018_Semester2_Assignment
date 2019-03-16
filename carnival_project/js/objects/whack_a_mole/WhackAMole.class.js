/**
 * Class representing whack-a-mole table.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoe Irwin
 * @date 11/02/2019
 * @version 1.1 - 15/03/2019
 */
class WhackAMole extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * Constructor for a sphere.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //[Table Base].
        let tableBase1= new THREE.BoxGeometry(15, 10, 20);
        // immediately use the texture for material creation
        //let tableBase2 = new THREE.MeshBasicMaterial( { map: grassTexture } );
        let tableBase2= new THREE.MeshPhongMaterial( { color: 0x2f8341 } );
        let tableBase = new THREE.Mesh(tableBase1, tableBase2);

        //[Table Base Outline].
        let tableBaseOutline1= new THREE.BoxGeometry(15, 10, 20);
        let tableBaseOutline2 = new THREE.EdgesGeometry( tableBaseOutline1 );
        let tableBaseOutline = new THREE.LineSegments( tableBaseOutline2, new THREE.LineBasicMaterial( { color: 0x14401d} ) );

        //[Table Back].
        let tableBack1= new THREE.PlaneGeometry(15, 11, 1);
        //let tableBack2= new THREE.MeshPhongMaterial( { color: 0x19b44a } );
        //let tableBack2 = new THREE.MeshBasicMaterial( { map: grassTexture } );
        let tableBack2 = new THREE.MeshBasicMaterial({ 
            map: ENGINE.TextureLoader().loadTexture('whackAMole/mole.jpg'), 
            side: THREE.FrontSide 
        });
        let tableBack = new THREE.Mesh(tableBack1, tableBack2);
        tableBack.position.set(0, 9.8, -9.55);

        //[Table MoleBack].
        let tableMoleBack1= new THREE.BoxGeometry(15, 11, 0.1);
        let tableMoleBack2= new THREE.MeshPhongMaterial( { color: 0x2f8341 } );
        let tableMoleBack = new THREE.Mesh(tableMoleBack1, tableMoleBack2);
        tableMoleBack.position.z = -9.95;
        tableMoleBack.position.y = 9.8;

        //[Table border].
        let tableBorder1= new THREE.BoxGeometry(15, 1, 1);
        let tableBorder2= new THREE.MeshPhongMaterial( { color: 0xa54f20 } );
        let tableBorder = new THREE.Mesh(tableBorder1, tableBorder2);
        tableBorder.position.z = -9.55;
        tableBorder.position.y = 15.75;

        //[Table border RightBack].
        let tableBorderRightBack1= new THREE.BoxGeometry(1, 11.2, 1);
        let tableBorderRightBack2= new THREE.MeshPhongMaterial( { color: 0xa54f20 } );
        let tableBorderRightBack = new THREE.Mesh(tableBorderRightBack1, tableBorderRightBack2);
        tableBorderRightBack.position.z = -9.55;
        tableBorderRightBack.position.y = 10.65;
        tableBorderRightBack.position.x = 7.95;

        //[Table border LeftBack].
        let tableBorderLeftBack1= new THREE.BoxGeometry(1, 11.2, 1);
        let tableBorderLeftBack2= new THREE.MeshPhongMaterial( { color: 0xa54f20 } );
        let tableBorderLeftBack = new THREE.Mesh(tableBorderLeftBack1, tableBorderLeftBack2);
        tableBorderLeftBack.position.z = -9.55;
        tableBorderLeftBack.position.y = 10.65;
        tableBorderLeftBack.position.x = -7.95;

        //[Table border Right].
        let tableBorderRight1= new THREE.BoxGeometry(1, 1, 20.05);
        let tableBorderRight2= new THREE.MeshPhongMaterial( { color: 0xa54f20 } );
        let tableBorderRight = new THREE.Mesh(tableBorderRight1, tableBorderRight2);
        tableBorderRight.position.x = 7.95;
        tableBorderRight.position.y = 5;

        //[Table border Left].
        let tableBorderLeft1= new THREE.BoxGeometry(1, 1, 20.05);
        let tableBordreLeft2= new THREE.MeshPhongMaterial( { color: 0xa54f20 } );
        let tableBorderLeft = new THREE.Mesh(tableBorderLeft1, tableBordreLeft2);
        tableBorderLeft.position.x = -7.95;
        tableBorderLeft.position.y = 5;

        //[Table border RightFront].
        let tableBorderRightFront1= new THREE.BoxGeometry(1, 10, 1);
        let tableBorderRightFront2= new THREE.MeshPhongMaterial( { color: 0xa54f20 } );
        let tableBorderRightFront = new THREE.Mesh(tableBorderRightFront1, tableBorderRightFront2);
        tableBorderRightFront.position.z = 9.5;
        tableBorderRightFront.position.y = 0;
        tableBorderRightFront.position.x = 7.95;

        //[Table border LeftFront].
        let tableBorderLeftFront1= new THREE.BoxGeometry(1, 10, 1);
        let tableBorderLeftFront2= new THREE.MeshPhongMaterial( { color: 0xa54f20 } );
        let tableBorderLeftFront = new THREE.Mesh(tableBorderLeftFront1, tableBorderLeftFront2);
        tableBorderLeftFront.position.z = 9.5;
        tableBorderLeftFront.position.y = 0;
        tableBorderLeftFront.position.x = -7.95;

        //[Score].
        let score1= new THREE.BoxGeometry(4, 2, 0.1);
        let score2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
        let score = new THREE.Mesh(score1, score2);
        score.position.z = -9.5;
        score.position.y = 9.5;

        //[BlackSquare].
        let blackSquare1= new THREE.BoxGeometry(7, 7, 0.1);
        let blackSquare2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
        let blackSquare = new THREE.Mesh(blackSquare1, blackSquare2);
        blackSquare.position.z = 10;
        blackSquare.position.y = 0.0;

        //[insertMoneyArea].
        let insertMoneyArea1= new THREE.BoxGeometry(3, 4, 0.1);
        let insertMoneyArea2= new THREE.MeshPhongMaterial( { color: 0x242121 } );
        let insertMoneyArea = new THREE.Mesh(insertMoneyArea1, insertMoneyArea2);
        insertMoneyArea.position.z = 10.1;
        insertMoneyArea.position.y = 0.9;
        insertMoneyArea.position.x = -1.4;

        //[insertMoney].
        let insertMoney1= new THREE.BoxGeometry(0.1, 0.5, 0.2);
        let insertMoney2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
        let insertMoney = new THREE.Mesh(insertMoney1, insertMoney2);
        insertMoney.position.z = 10.3;
        insertMoney.position.y = 1.3;
        insertMoney.position.x = -0.7;

        //[go].
        let go1= new THREE.TorusBufferGeometry(0.05, 0.5, 20, 100);
        let go2= new THREE.MeshPhongMaterial( { color: 0x00f034 } );
        let go = new THREE.Mesh(go1, go2);
        go.position.z = 10.1;
        go.position.y = 2;
        go.position.x = -2;

        //[goArea].
        let goArea1= new THREE.TorusBufferGeometry(0.5, 0.1, 16, 100);
        let goArea2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
        let goArea = new THREE.Mesh(goArea1, goArea2);
        goArea.position.z = 10.2;
        goArea.position.y = 2;
        goArea.position.x = -2;

        //[eject].
        let eject1= new THREE.BoxGeometry(0.5, 0.5, 0.01);
        let eject2= new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        let eject = new THREE.Mesh(eject1, eject2);
        eject.position.z = 10.3;
        eject.position.y = 0.7;
        eject.position.x = -1.7;

        //[Mud Ring back].
        let mudRingBack1= new THREE.TorusBufferGeometry( 10, 3, 16, 100 );
        let mudTexture = ENGINE.TextureLoader().loadTexture('whackAMole/mud.jpg')
        let mudRingBack2 = new THREE.MeshPhongMaterial( { color: 0x40261d } );
        // immediately use the texture for material creation
        // let mudRingBack2 = new THREE.MeshBasicMaterial( { map: mudTexture } );
        let mudRingBack = new THREE.Mesh(mudRingBack1, mudRingBack2);
        mudRingBack.position.z = -10;
        mudRingBack.position.y = 8.0;

        //[hole front left].
        let holeFrontLeft1= new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 );
        let holeFrontLeft2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
        let holeFrontLeft = new THREE.Mesh(holeFrontLeft1, holeFrontLeft2);
        holeFrontLeft.position.z = 6;
        holeFrontLeft.position.y = 5;
        holeFrontLeft.position.x = -3.5;

        //[Mud Ring front Left].
        let mudRingFrontLeft1= new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 );
        let mudRingFrontLeft2= new THREE.MeshBasicMaterial( { map: mudTexture } );
        let mudRingFrontLeft = new THREE.Mesh(mudRingFrontLeft1, mudRingFrontLeft2);
        mudRingFrontLeft.position.z = 6;
        mudRingFrontLeft.position.y = 5;
        mudRingFrontLeft.position.x = -3.5;
        mudRingFrontLeft.rotation.x = Math.PI/2;


        //[hole front right].
        let holeFrontRight1= new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 );
        let holeFrontRight2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
        let holeFrontRight = new THREE.Mesh(holeFrontRight1, holeFrontRight2);
        holeFrontRight.position.z = 6;
        holeFrontRight.position.y = 5;
        holeFrontRight.position.x = 3.5;

        //[Mud Ring front right].
        let mudRingFrontRight1= new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 );
        let mudRingFrontRight2= new THREE.MeshBasicMaterial( { map: mudTexture } );
        let mudRingFrontRight = new THREE.Mesh(mudRingFrontRight1, mudRingFrontRight2);
        mudRingFrontRight.position.z = 6;
        mudRingFrontRight.position.y = 5;
        mudRingFrontRight.position.x = 3.5;
        mudRingFrontRight.rotation.x = Math.PI/2;

        //[hole centre].
        let holeCentre1= new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 );
        let holeCentre2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
        let holeCentre = new THREE.Mesh(holeCentre1, holeCentre2);
        holeCentre.position.z = 0.7;
        holeCentre.position.y = 5;

        //[Mud Ring Centre].
        let mudRingCentre1= new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 );
        let mudRingCentre2= new THREE.MeshBasicMaterial( { map: mudTexture } );
        let mudRingCentre = new THREE.Mesh(mudRingCentre1, mudRingCentre2);
        mudRingCentre.position.z = 0.7;
        mudRingCentre.position.y = 5;
        mudRingCentre.rotation.x = Math.PI/2;

        //[hole back left].
        let holeBackLeft1= new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 );
        let holeBackLeft2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
        let holeBackLeft = new THREE.Mesh(holeBackLeft1, holeBackLeft2);
        holeBackLeft.position.z = -4;
        holeBackLeft.position.y = 5;
        holeBackLeft.position.x = -3.5;


        //[Mud Ring back Left].
        let mudRingBackLeft1= new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 );
        let mudRingBackLeft2= new THREE.MeshBasicMaterial( { map: mudTexture } );
        let mudRingBackLeft = new THREE.Mesh(mudRingBackLeft1, mudRingBackLeft2);
        mudRingBackLeft.position.z = -4;
        mudRingBackLeft.position.y = 5;
        mudRingBackLeft.position.x = -3.5;
        mudRingBackLeft.rotation.x = Math.PI/2;

        //[hole back right].
        let holeBackRight1= new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 );
        let holeBackRight2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
        let holeBackRight = new THREE.Mesh(holeBackRight1, holeBackRight2);
        holeBackRight.position.z = -4;
        holeBackRight.position.y = 5;
        holeBackRight.position.x = 3.5;

        //[Mud Ring back right].
        let mudRingBackRight1= new THREE.TorusBufferGeometry( 1.5, 0.3, 10, 100 );
        let mudRingBackRight2= new THREE.MeshBasicMaterial( { map: mudTexture } );
        let mudRingBackRight = new THREE.Mesh(mudRingBackRight1, mudRingBackRight2);
        mudRingBackRight.position.z = -4;
        mudRingBackRight.position.y = 5;
        mudRingBackRight.position.x = 3.5;
        mudRingBackRight.rotation.x = Math.PI/2;

        //Position of the moles
        let moleCenter = new Mole(new THREE.Vector3(0, 5.0, 0.7));
        moleCenter.setActive(true);
        let moleUpperLeft = new Mole(new THREE.Vector3(-3.5, 5.0, -4));
        moleUpperLeft.setActive(true);
        let moleUpperRight = new Mole(new THREE.Vector3(3.5, 5.0, -4));
        moleUpperRight.setActive(true);
        let moleLowerRight = new Mole(new THREE.Vector3(3.5, 5.0, 6));
        moleUpperRight.setActive(true);
        let moleLowerLeft = new Mole(new THREE.Vector3(-3.5, 5.0, 6));
        moleUpperRight.setActive(true);

        //Add to the object group.
        this.addObjectToGroup(tableBase);
        this.addObjectToGroup(tableBaseOutline);
        this.addObjectToGroup(tableBack);
        this.addObjectToGroup(tableMoleBack);
        this.addObjectToGroup(tableBorder);
        this.addObjectToGroup(tableBorderRightBack);
        this.addObjectToGroup(tableBorderLeftBack);
        this.addObjectToGroup(tableBorderRightFront);
        this.addObjectToGroup(tableBorderLeftFront);
        this.addObjectToGroup(tableBorderRight);
        this.addObjectToGroup(tableBorderLeft);
        this.addObjectToGroup(score);
        this.addObjectToGroup(blackSquare);
        this.addObjectToGroup(insertMoneyArea);
        this.addObjectToGroup(go);
        this.addObjectToGroup(goArea);
        this.addObjectToGroup(eject);
        this.addObjectToGroup(insertMoney);
        //this.addObjectToGroup(mudRingBack);
        this.addObjectToGroup(mudRingFrontLeft);
        this.addObjectToGroup(holeFrontLeft);
        this.addObjectToGroup(mudRingFrontRight);
        this.addObjectToGroup(holeFrontRight);
        this.addObjectToGroup(mudRingCentre);
        this.addObjectToGroup(holeCentre);
        this.addObjectToGroup(mudRingBackLeft);
        this.addObjectToGroup(holeBackLeft);
        this.addObjectToGroup(mudRingBackRight);
        this.addObjectToGroup(holeBackRight);

        //Adds the moles to the addObjectToGroup
        this.addObjectToGroup(moleCenter.getInstance());
        this.addObjectToGroup(moleUpperLeft.getInstance());
        this.addObjectToGroup(moleUpperRight.getInstance());
        this.addObjectToGroup(moleLowerRight.getInstance());
        this.addObjectToGroup(moleLowerLeft.getInstance());

        //Adds the mallet to the group.

        let mallet = createMallet();
        mallet.object.position.y += 9;
        this.addObjectToGroup(mallet.object);

        //Scale and position the game.
        this.getInstance().scale.set(0.75, 0.75, 0.75);
        this.getInstance().position.set(0, 3, 15);

        //Private Methods...
        
        function createMallet()
        {
            let mallet = new THREE.Group();
            let material = new THREE.MeshPhongMaterial({
                color: 0xFF0000
            });

            let head = new THREE.Mesh(
                new THREE.BoxGeometry(2, 1, 1),
                material
            );
            let handle = new THREE.Mesh(
                new THREE.BoxGeometry(1, 5, 1),
                material
            );

            head.position.y += 2.5;

            mallet.add(head);
            mallet.add(handle);

            return collisionFactory(mallet, null, false);
        }

        //Public Methods...

        let player = null;
        let hands = null;

        this.allocatePlayer = function(player)
        {
            console.log("Allocating player");
            this.player = player;
            console.log(player);
            hands = player.getColliders();
            console.log(hands);
        }

        /**
         * Updates once every frame.
         * (Abstract class which must be overridden from the superclass.)
         * @param {number} frameTime - The time taken to compute the previous
         *                             frame of animation.
         */
        this.update = function(frameTime)
        {
            let speed = frameTime / 5000;
            // this.getInstance().scale.x = 30;
            // this.getInstance().scale.y = 30;
            // this.getInstance().scale.z = 30;
            //this.getInstance().rotation.x += speed * Math.PI;
            // this.getInstance().rotation.y += speed * Math.PI;
            // this.getInstance().position.z += 1;

            //Updates the position of the moles  
            moleCenter.update(frameTime);
            moleUpperLeft.update(frameTime);
            moleUpperRight.update(frameTime);
            moleLowerRight.update(frameTime);
            moleLowerLeft.update(frameTime);


            let moles = [
                moleCenter.getCollider(),
                moleUpperLeft.getCollider(),
                moleUpperRight.getCollider(),
                moleLowerRight.getCollider(),
                moleLowerLeft.getCollider()
            ];

            hands.forEach(hand => {
                hand.update();
            })

            moles.forEach(mole => {
                mole.update();
                mole.checkCollisions(hands);
                if(mole.collided)
                {
                    console.log("Hit mole");
                }
            });
            
            // mallet.object.rotation.y += speed;
            // mallet.update();
            // mallet.checkCollisions([

            // ]);
            // if(mallet.collided)
            // {
            //     console.log('mallet hit mole');
            // }
        }
    }
}
