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
        let leftPost2 = new THREE.MeshPhongMaterial( { color: 0x2f8341 } );
        let leftPost = new THREE.Mesh(leftPost1, leftPost2);
        leftPost.position.y = 13;
       
       //Right goal post
        let rightPost1 = new THREE.CylinderGeometry( 2.5, 2.5, 35, 32 );
        let rightPost2 = new THREE.MeshPhongMaterial( { color: 0x2f8341 } );
        let rightPost = new THREE.Mesh(rightPost1, rightPost2);
        rightPost.position.y = 13;
        rightPost.position.x = 50;

        //Top goal post
        let topPost1 = new THREE.CylinderGeometry( 2.5, 2.5, 55, 32 );
        let topPost2 = new THREE.MeshPhongMaterial( { color: 0x2f8341 } );
        let topPost = new THREE.Mesh(topPost1, topPost2);
        topPost.position.y = 30;
        topPost.position.x = 25;
        topPost.rotation.z = Math.PI/2;
        
        //back pane
        let backPane1 = new THREE.PlaneGeometry( 54, 32, 31 );
        //let grassTexture = new THREE.TextureLoader().load( 'res/textures/whackAMole/grass.jpg' );
        // immediately use the texture for material creation
        //let tableBase2 = new THREE.MeshBasicMaterial( { map: grassTexture } );
        let backPane2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        let backPane = new THREE.Mesh(backPane1, backPane2);
        backPane.position.x = 25;
        backPane.position.y = 11.5;

        //back wall
        let backWall1 = new THREE.PlaneGeometry( 85, 45, 31 );
        //let grassTexture = new THREE.TextureLoader().load( 'res/textures/whackAMole/grass.jpg' );
        // immediately use the texture for material creation
        //let tableBase2 = new THREE.MeshBasicMaterial( { map: grassTexture } );
        let backWall2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        let backWall = new THREE.Mesh(backWall1, backWall2);
        backWall.position.x = 25;
        backWall.position.y = 17;
        backWall.position.z = -3;

        //left wall
        let leftWall1 = new THREE.PlaneGeometry( 85, 45, 31 );
        //let grassTexture = new THREE.TextureLoader().load( 'res/textures/whackAMole/grass.jpg' );
        // immediately use the texture for material creation
        //let tableBase2 = new THREE.MeshBasicMaterial( { map: grassTexture } );
        let leftWall2 = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        let leftWall = new THREE.Mesh(leftWall1, leftWall2);
        leftWall.position.x = 25;
        leftWall.position.y = 17;
        leftWall.position.z = -3;
        leftWall.rotation.y = Math.PI/2;
        

        //Add object to group
        this.addObjectToGroup(leftPost);
        this.addObjectToGroup(rightPost);
        this.addObjectToGroup(topPost);
        this.addObjectToGroup(backPane);
        this.addObjectToGroup(backWall);

        //Scale and position the game.
        this.getInstance().scale.set(0.75, 0.75, 0.75);
        this.getInstance().position.set(70, 3, 0);
        
        this.update = function(frameTime)
        {
            //Goal does not need to update.
        }
    }

}
