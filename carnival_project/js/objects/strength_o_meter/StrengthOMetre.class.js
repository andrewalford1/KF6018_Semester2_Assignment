 /**
 * Class representing strength o'Metre.
 * @extends ENGINE.OBJECTS.ClassicObject
 * @author Zoe Irwin
 * @date 21/02/2019
 * @version 2.0 - 31/03/2019
 */
 class StrengthOMetre extends ENGINE.OBJECTS.ClassicObject
 {
     /**
      * Constructor for a strength o'Metre.
      */
      constructor(position)
      {
          //Construct the superclass.
          super(position);

          //Tracks the user playing the game.
        let m_player = {
            leftHand  : null,
            rightHand : null,
            leftHandVelocity: null,
            rightHandVelocity : null
            
        };
        let collideVel = false;
        
           //[ Base].
            let Base1= new THREE.BoxGeometry(15, 1, 25);
            let Base2= new THREE.MeshPhongMaterial( { color: 0xFF7133 } );
            //let grassTexture = new THREE.TextureLoader().load( 'res/textures/strengthOMetre/grass.jpg' );
            //let Base2= new THREE.MeshBasicMaterial( { map: grassTexture } );
            let Base = new THREE.Mesh(Base1, Base2);
            Base.castShadow = true;
            Base.receiveShadow = true;

            //[ BaseHitArea].
            let BaseHitArea1= new THREE.BoxGeometry(8, 4, 8);
            let BaseHitArea2= new THREE.MeshPhongMaterial( { color: 0x7400B7 } );
            //let woodTexture = new THREE.TextureLoader().load( 'res/textures/strengthOMetre/wood.jpg' );
            //let BaseHitArea2 = new THREE.MeshBasicMaterial( { map: woodTexture } );
            let BaseHitArea = new THREE.Mesh(BaseHitArea1, BaseHitArea2);
            BaseHitArea.position.y = 2;
            BaseHitArea.position.z = 7;
            BaseHitArea.castShadow = true;
            BaseHitArea.receiveShadow = true;

           //[hitAreaFirst].
            let hitAreaFirst1= new THREE.TorusBufferGeometry(2.5, 1, 20, 100);
            let hitAreaFirst2= new THREE.MeshPhongMaterial( { color: 0x00f034 } );
            let hitAreaFirst = new THREE.Mesh(hitAreaFirst1, hitAreaFirst2);
            hitAreaFirst.position.y = 5;
            hitAreaFirst.rotation.x = Math.PI/2;
            hitAreaFirst.position.z = 7;
            hitAreaFirst.castShadow = true;
            hitAreaFirst.receiveShadow = true;

            //[hitAreaSecond].
            let hitAreaSecond1= new THREE.TorusBufferGeometry(2, 1, 20, 100);
            let hitAreaSecond2= new THREE.MeshPhongMaterial( { color: 0xFFFF00 } );
            let hitAreaSecond = new THREE.Mesh(hitAreaSecond1, hitAreaSecond2);
            hitAreaSecond.position.y = 6;
            hitAreaSecond.rotation.x = Math.PI/2;
            hitAreaSecond.position.z = 7;
            hitAreaSecond.castShadow = true;
            hitAreaSecond.receiveShadow = true;

            //[hitAreaThird].
            let hitAreaThird1= new THREE.TorusBufferGeometry(1, 1, 20, 100);
            let hitAreaThird2= new THREE.MeshPhongMaterial( { color: 0x0000FF } );
            let hitAreaThird = new THREE.Mesh(hitAreaThird1, hitAreaThird2);
            hitAreaThird.position.y = 7;
            hitAreaThird.rotation.x = Math.PI/2;
            hitAreaThird.position.z = 7;
            hitAreaThird.castShadow = true;
            hitAreaThird.receiveShadow = true;

            //[hitArea].
            let hitArea1= new THREE.TorusBufferGeometry(0.2, 1, 20, 100);
            let hitArea2= new THREE.MeshPhongMaterial( { color: 0xFF0000 } );
            let hitArea = new THREE.Mesh(hitArea1, hitArea2);
            hitArea.position.y = 8;
            hitArea.rotation.x = Math.PI/2;
            hitArea.position.z = 7;
            hitArea.castShadow = true;
            hitArea.receiveShadow = true;

             //[ poleBackground].
            let poleBackground1= new THREE.BoxGeometry(8, 36, 4);
            let poleBackground2= new THREE.MeshPhongMaterial( { color: 0xFFFF00 } );
            let poleBackground = new THREE.Mesh(poleBackground1, poleBackground2);
            poleBackground.position.y = 18;
            poleBackground.position.z = -7;
            poleBackground.castShadow = true;
            poleBackground.receiveShadow = true;
            
            //[ pole].
            let pole1= new THREE.PlaneGeometry(4.5, 34);
            let pole2= new THREE.MeshPhongMaterial( { color: 0xff0000 } );
            let pole = new THREE.Mesh(pole1, pole2);
            pole.position.y = 17;
            pole.position.z = -4.94;
            pole.castShadow = true;
            pole.receiveShadow = true;

             //[blackLine].
            let blackLine1= new THREE.PlaneGeometry(0.5, 34,);
            let blackLine2= new THREE.MeshPhongMaterial( { color: 0x000000 } );
            let blackLine = new THREE.Mesh(blackLine1, blackLine2);
            blackLine.position.y = 17;
            blackLine.position.z = -4.87;
            blackLine.castShadow = true;
            blackLine.receiveShadow = true;


            //[ score].
            let score1= new THREE.PlaneGeometry(0.5, 4);
            let score2= new THREE.MeshPhongMaterial( { color: 0xffffff } );
            let score = new THREE.Mesh(score1, score2);
            score.position.y = 2;
            score.position.z = -4.83;
            score.castShadow = true;
            score.receiveShadow = true;

             //[ circleBack].
            let circleBack1= new THREE.CircleBufferGeometry( 5, 32, );
            let clownTexture = new THREE.TextureLoader().load( 'res/textures/strengthOMetre/clownFace.png' );
            //let circleBack2= new THREE.MeshPhongMaterial( { color: 0xff0000 } );
            let circleBack2= new THREE.MeshBasicMaterial( { map: clownTexture } );
            let circleBack = new THREE.Mesh(circleBack1, circleBack2);
            circleBack.position.y = 35;
            circleBack.position.z = -4.92;
            circleBack.castShadow = true;
            circleBack.receiveShadow = true;

            //[nose].
            let intensity = 1;
            let nose1= new THREE.TorusBufferGeometry(0.1, 0.6, 20, 100);
            let nose2 = new THREE.MeshStandardMaterial( {color:  0xCA0000} );
            let nose = new THREE.Mesh(nose1, nose2)
            nose.position.set(0, 34.5, -4.8);
         


          //Add to the object group.
           this.addObjectToGroup(Base);
           this.addObjectToGroup(BaseHitArea);
           this.addObjectToGroup(hitAreaFirst);
           this.addObjectToGroup(hitAreaSecond);
           this.addObjectToGroup(hitAreaThird);
           this.addObjectToGroup(hitArea);
           this.addObjectToGroup(poleBackground);
           this.addObjectToGroup(pole);
           this.addObjectToGroup(score);
           this.addObjectToGroup(circleBack);
           this.addObjectToGroup(blackLine);
           this.addObjectToGroup(nose);
           //Scale and position the game.
           this.getInstance().scale.set(0.9, 0.9, 0.9);
           this.getInstance().position.set(-19, 0.15, -310);
           this.getInstance().rotation.set(0, Math.PI/2, 0);

 

        this.allocatePlayer = function(player) {
            m_player.leftHand = player.bones.HAND_LEFT.collider;
            m_player.rightHand = player.bones.HAND_RIGHT.collider;
            m_player.leftHandVelocity = player.bones.HAND_LEFT.velocity;
            m_player.rightHandVelocity = player.bones.HAND_RIGHT.velocity;
        }
       
        //[collider] Tracks collision.
        let collider = setUpCollider();

        //Private Methods...

        /**
         * @returns a collider created from the hit area.
         */
        function setUpCollider()
        {
            return collisionFactory(
                hitArea, 
                new THREE.Matrix4().setPosition(
                    new THREE.Vector3(0, -8, -7)
                ), 
                true,
                0x0000FF
            );
        }

        /**
         * Updates all colliders.
         */
        function updateCollider()
        {
            collider.update();
            if(collider.collided) {
                hitArea.material.color.setHex(0xFFFFFF);
                nose.material.color.setHex(0xFF0000);
                collideVel = true; 
            } else {
                hitArea.material.color.setHex(0xFF0000);
                nose.material.color.setHex(0xCA0000);
                collideVel = false;
            }
        }

        /**
         * @returns The hitArea collison box.
         */
        this.getCollider = function()
        {
            return collider;
        }

          /**
           * Updates once every frame.
           * (Abstract class which must be overridden from the superclass.)
           * @param {number} frameTime - The time taken to compute the previous
           *                             frame of animation. (This is way
           *                             cooler than 'iFrame' as it is
           *                             independant of the user's computer
           *                             performance.
           */
           this.update = function(frameTime)
           {
               if(m_player.leftHand && m_player.rightHand) {
                    collider.checkCollisions([
                        m_player.leftHand,
                        m_player.rightHand
                    ]);
                }
                updateCollider();

                if(collideVel){
                    score.position.y += m_player.leftHandVelocity;    
                }
           }
      }
 }
