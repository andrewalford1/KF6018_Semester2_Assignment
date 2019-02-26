/**
 * Football goal for kicking game
 * for scale objects in our world
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Luke Rose
 * @date 21/02/2019
 * @version 1.0 - 21/02/2019
 */
class Goal extends ENGINE.OBJECTS.ClassicObject
{
    /**
     * constructor for a Basic Character.
     * @param {THREE.Vector3} initialPosition - The initial position of the
     *                                          character.
     */
    constructor(position)
    {
        //Construct the superclass.
        super(position);

        //Left goal post
        let leftPost1 = new THREE.CylinderGeometry( 2.5, 2.5, 35, 32 );
        let leftPost2 = new THREE.MeshPhongMaterial( { color: 0xc6c6c6 } );
        let leftPost = new THREE.Mesh(leftPost1, leftPost2);
        leftPost.position.y = 10;
       
       //Right goal post
        let rightPost1 = new THREE.CylinderGeometry( 2.5, 2.5, 35, 32 );
        let rightPost2 = new THREE.MeshPhongMaterial( { color: 0xc6c6c6 } );
        let rightPost = new THREE.Mesh(rightPost1, rightPost2);
        rightPost.position.y = 10;
        rightPost.position.x = 50;

        //Top goal post
        let topPost1 = new THREE.CylinderGeometry( 2.5, 2.5, 55, 32 );
        let topPost2 = new THREE.MeshPhongMaterial( { color: 0xc6c6c6 } );
        let topPost = new THREE.Mesh(topPost1, topPost2);
        topPost.position.y = 28;
        topPost.position.x = 25;
        topPost.rotation.z = Math.PI/2;
        
        //back pane
        let backPane1 = new THREE.PlaneGeometry( 54, 34, 31 );
        //let grassTexture = new THREE.TextureLoader().load( 'res/textures/whackAMole/grass.jpg' );
        // immediately use the texture for material creation
        //let tableBase2 = new THREE.MeshBasicMaterial( { map: grassTexture } );
        let backPane2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        let backPane = new THREE.Mesh(backPane1, backPane2);
        backPane.position.x = 25;
        backPane.position.y = 10;

        //back wall
        let backWall1 = new THREE.PlaneGeometry( 85, 45, 31 );
        //let grassTexture = new THREE.TextureLoader().load( 'res/textures/whackAMole/grass.jpg' );
        // immediately use the texture for material creation
        //let tableBase2 = new THREE.MeshBasicMaterial( { map: grassTexture } );
        let backWall2 = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        let backWall = new THREE.Mesh(backWall1, backWall2);
        backWall.position.x = 25;
        backWall.position.y = 15;
        backWall.position.z = -3;

        //left wall
        let leftWall1 = new THREE.PlaneGeometry( 85, 45, 31 );
        //let grassTexture = new THREE.TextureLoader().load( 'res/textures/whackAMole/grass.jpg' );
        // immediately use the texture for material creation
        //let tableBase2 = new THREE.MeshBasicMaterial( { map: grassTexture } );
        let leftWall2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        let leftWall = new THREE.Mesh(leftWall1, leftWall2);
        leftWall.position.x = -17.5;
        leftWall.position.y = 15;
        leftWall.position.z = 39;
        leftWall.rotation.y = Math.PI/2;

        //right wall
        let rightWall1 = new THREE.PlaneGeometry( 85, 45, 31 );
        //let grassTexture = new THREE.TextureLoader().load( 'res/textures/whackAMole/grass.jpg' );
        // immediately use the texture for material creation
        //let tableBase2 = new THREE.MeshBasicMaterial( { map: grassTexture } );
        let rightWall2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        let rightWall = new THREE.Mesh(rightWall1, rightWall2);
        rightWall.position.x = 67.5;
        rightWall.position.y = 15;
        rightWall.position.z = 39;
        rightWall.rotation.y = Math.PI/-2;

        //Left entrance post
        let leftEntrancePost1 = new THREE.CylinderGeometry( 4, 4, 20, 32 );
        let leftEntrancePost2 = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        let leftEntrancePost = new THREE.Mesh(leftEntrancePost1, leftEntrancePost2);
        leftEntrancePost.position.x = -17.5;
        leftEntrancePost.position.y = 0;
        leftEntrancePost.position.z = 80;
        
        //Right entrance post
        let rightEntrancePost1 = new THREE.CylinderGeometry( 4, 4, 20, 32 );
        let rightEntrancePost2 = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        let rightEntrancePost = new THREE.Mesh(rightEntrancePost1, rightEntrancePost2);
        rightEntrancePost.position.x = 67.5;
        rightEntrancePost.position.y = 0;
        rightEntrancePost.position.z = 80;

        //Top entrance torus
        let topEntranceTorus1 = new THREE.TorusGeometry( 42.5, 3, 16, 100, 3.15);
        let topEntranceTorus2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        let topEntranceTorus = new THREE.Mesh(topEntranceTorus1, topEntranceTorus2);
        topEntranceTorus.position.x = 25;
        topEntranceTorus.position.y = 10;
        topEntranceTorus.position.z = 80;

        //Add object to group
        this.addObjectToGroup(leftPost);
        this.addObjectToGroup(rightPost);
        this.addObjectToGroup(topPost);
        this.addObjectToGroup(backPane);
        this.addObjectToGroup(backWall);
        this.addObjectToGroup(leftWall);
        this.addObjectToGroup(rightWall);
        this.addObjectToGroup(leftEntrancePost);
        this.addObjectToGroup(rightEntrancePost);
        this.addObjectToGroup(topEntranceTorus);

        //Scale and position the game.
        this.getInstance().scale.set(0.75, 0.75, 0.75);
        this.getInstance().position.set(70, 3, 0);
        
        this.update = function(frameTime)
        {
            //Goal does not need to update.
        }
    }

}
