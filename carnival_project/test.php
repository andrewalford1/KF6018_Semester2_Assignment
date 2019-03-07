<?php
private $loadingScreen = '
';
private $body = '
<body>
    <!-- Loading Screen Tags -->
    <div class="screen loading_screen">
        <div class="loader loading_screen"></div>
        <!--What is being loaded...-->
        <div id="loading_area">
            <div id="loading_info" class="loading_screen"></div>
            <div id="loading_bar" class="loading_screen">
                <div id="loading_progress" class="loading_screen"></div>
            </div>
        </div>
    </div>

    <!--KINECT-->
    <script src="https://itp.nyu.edu/kinectron/kinectron.bundle.js" type="text/javascript"></script>

    <!-- THREE JS -->
    <script src="https://threejs.org/build/three.js"></script>

    <!-- ENGINE -->
    <script src="http://unn-w16006135.newnumyspace.co.uk/ThreeJS_Engine/src/engine_build.js"></script>

    <!-- PROJECT CODE -->
    <!--Objects: Characters--------------------------------------------------->
    <script src="js/objects/characters/BasicCharacter.class.js">      </script>
    <script src="js/objects/characters/Player.class.js">              </script>
    <script src="js/objects/characters/Boy.class.js">                 </script>
    <!--Objects: Darts Game--------------------------------------------------->
    <script src="js/objects/darts/DartsGame.class.js">                </script>
    <script src="js/objects/darts/Dart.class.js">                    </script>
    <!--Objects: Environment-------------------------------------------------->
    <script src="js/objects/environment/BasicFloor.class.js">         </script>
    <script src="js/objects/environment/Terrain.class.js">            </script>
    <script src="js/objects/environment/FerrisWheel.class.js">        </script>
    <script src="js/objects/environment/CircusTent.class.js">         </script>
    <script src="js/objects/environment/Teacup.class.js">             </script>
    <script src="js/objects/environment/HotAirBalloon.class.js">      </script>
    <script src="js/objects/environment/Helicopter.class.js">         </script>
    <script src="js/objects/environment/Jack.class.js">               </script>
    <script src="js/objects/environment/Bear.class.js">               </script>
    <script src="js/objects/environment/BalloonArch.class.js">        </script>
    <script src="js/objects/environment/MoreBalloons.class.js">       </script>
    <script src="js/objects/environment/Welcome.class.js">            </script>
    <script src="js/objects/environment/GirlSitting.class.js">        </script>
    <script src="js/objects/environment/StreetLamp.class.js">         </script>
    <script src="js/objects/environment/RollerCoaster.class.js">      </script>
    <script src="js/objects/environment/SmallTent.class.js">          </script>
    <script src="js/objects/environment/Carousel.class.js">           </script>
    <!--Objects: Football Game------------------------------------------------>
    <script src="js/objects/football/Goal.class.js">                  </script>
    <script src="js/objects/football/Football.class.js">              </script>
    <!--Objects: Strenght-o-meter Game---------------------------------------->
    <script src="js/objects/strength_o_meter/StrengthOMetre.class.js"></script>
    <!--Objects: Whack-a-mole Game-------------------------------------------->
    <script src="js/objects/whack_a_mole/Mole.class.js">              </script>
    <script src="js/objects/whack_a_mole/WhackAMole.class.js">        </script>
    <!--Main------------------------------------------------------------------>
    <script src="js/main.js">                                         </script>

    <embed src="res/audio/carnival.mp3">
</body>
';
echo '
<!doctype html>
<html lang="en">
<head>
    <title>KF6018 Semester 2 Assignment</title>
    <meta charset="utf-8"/>
    <link rel="stylesheet" content="text/css" href="style/fullscreen.css">
    <link rel="stylesheet" content="text/css" href="style/loading_screen.css">

    <!-- favicon from: https://www.favicon.cc/?action=icon&file_id=315161-->
    <link href="res/icons/circus_tent.ico" rel="icon" type="image/x-icon"/>
</head>

';
?>