// <-- constantes matter --> //
    const Engine = Matter.Engine;
    const World= Matter.World;
    const Bodies = Matter.Bodies;
    const Constraint = Matter.Constraint;
// <--               //               --> //
// <-- variaveis matter --> //
    var engine, world;
// <--               //               --> //

// <-- variaveis das imagens --> //

    var canvas;
    var soloimg;
    var platformimg;
    var Robimg;
    var Robimg2;
    var Robimg3;

// <--               //               --> //

// <-- variaveis dos personagens e objetos --> //

    var espinhos;
    var Rob;
    var platform;
    var solo;
    var moeda;
    var estadodeJogo=0;
    var obstaculo;
    var pontuacao;
    
// <--               //               --> //

// <-- preload --> //

    function preload(){


        // <-- preload imagens dos obstaculos --> //

            espinhos = loadImage("espinhos.png");

            acido = loadImage("acido1.png");

            barril= loadImage("barril.png");

            caixa = loadImage("caixa.png");

        // <--               //               --> //

        // <-- preload imagens do solo  --> //

            soloimg = loadImage("solo.png");
            platformimg = loadImage("obj15.png");

        // <--               //               --> //

        // <-- preload imagens do rob --> //

            Robimg = loadAnimation("parado1.png");
            Robimg2 = loadAnimation("correndo1.png","correndo2.png","correndo3.png","correndo4.png",
            "correndo5.png","correndo6.png","correndo7.png","correndo8.png");
            Robimg3 = loadAnimation("morrendo1.png","morrendo2.png","morrendo3.png","morrendo4.png",
            "morrendo5.png","morrendo6.png","morrendo7.png","morrendo8.png","morrendo9.png","morrendo10.png");

        // <--               //               --> //

    }
// <--               //               --> //

// <-- setup --> //

    function setup(){

        // <-- canvas --> //   

            canvas = createCanvas(windowWidth,windowHeight);
            imageMode(CORNER);

        // <--               //               --> //

        // <-- matter --> //

            engine = Engine.create();
            world = engine.world;

        // <--               //               --> //

        // <-- rob --> //

            Rob = createSprite(windowWidth/10,windowHeight/3,windowWidth/10,windowHeight/10);
            Rob.setCollider("rectangle",0,0,windowWidth/15,windowHeight/2.5);
            Rob.debug = false;
        
            Rob.addAnimation('parado',Robimg);
            Rob.addAnimation('correndo',Robimg2);
            Rob.addAnimation('morrendo',Robimg3);
          

        // <--               //               --> //

        // <-- grupo1 --> //

            grupo1 = new Group ();

        // <--               //               --> //
        Rob.scale = 0.5
        // <-- solo e plataforma --> //  

            platform = createSprite(windowWidth/10,windowHeight/2,windowWidth/10,windowHeight/7);
            platform.addImage(platformimg);


            solo =  createSprite(windowWidth/2,windowHeight/1.1,windowWidth,windowHeight/10)
            solo.addImage(soloimg)
            solo.scale=1.5
        
            solo2 =  createSprite(windowWidth/2,windowHeight/1.1,windowWidth,windowHeight/10)
            solo2.visible = false;

        // <--               //               --> // 

        // <-- pontuação--> //

            pontuacao = 0;

        // <--               //               --> //

    }

// <--               //               --> //

// <-- draw --> //
    function draw(){

        // <-- background e sprites --> //

            background("#828385");
            drawSprites();

        // <-- matter e funções --> //    
            Engine.update(engine);
            gerarObstaculos();
        // <--               //               --> //   

        // <-- reiniciar o solo --> //   

            if(solo.x<1000){

             solo.x = solo.width/1.35

            }

        // <--               //               --> //

        // <-- pular --> //       
            if(keyDown('space') && Rob.y >= windowHeight/1.1-windowHeight/6){

                 Rob.velocityY=Rob.velocityY-25
            
            }
        // <--               //               --> //

        // <-- tela inicial --> //   
            if(estadodeJogo===0){

                platform.visible = true;
                fill("yellow");
                stroke("red");
                strokeWeight(10);
                textStyle(ITALIC);
                textSize(90);
                text("ROB THE ROBOT",windowWidth/2,windowHeight/3);
                Rob.collide(platform);
                Rob.y = height/3.3;
                Rob.x = width/10;
                Rob.changeAnimation('parado');
                fill("red");
                strokeWeight(5);
                stroke("yellow");
                textStyle(BOLD);
                textSize(50);
                text("Press ENTER to start",windowWidth/2,windowHeight/2);
            
            }
        // <--               //               --> //

        // <-- iniciar --> //   

            if(estadodeJogo===1){
                fill("yellow");
                textStyle(ITALIC);
                textSize(30);
                strokeWeight(3);
                stroke("red");
                text("Pontuação: "+ pontuacao, windowWidth/1.3,windowHeight/20);
                Rob.changeAnimation('correndo');
                platform.visible = false;
                pontuacao = pontuacao + Math.round(frameRate()/60);
                solo.velocityX = -9;
                Rob.collide(solo2);
                if(grupo1.isTouching(Rob)){
            
                    estadodeJogo=2
                    
                }
            }
        // <--               //               --> //

        // <-- encerrar --> //    

            if(estadodeJogo===2){

                solo.velocityX = 0;
                Rob.changeAnimation('morrendo');
                grupo1.setVelocityXEach(0)
                grupo1.setLifetimeEach(-1)
                grupo1.destroyEach();

                Rob.collide(solo2);

                strokeWeight(10);
                stroke("red");
                fill("yellow");
                textStyle(ITALIC);
                textSize(90);
                text("ROB DIED",windowWidth/2,windowHeight/3);

                strokeWeight(5);
                stroke("yellow");
                fill("red");
                textStyle(BOLDITALIC);
                textSize(50);
                text("Press R to restart",windowWidth/2,windowHeight/2);

                strokeWeight(3);
                stroke("red");
                fill("yellow");
                textStyle(ITALIC);
                textSize(30);
                text("Pontuação: "+ pontuacao, windowWidth/1.3,windowHeight/20);

            }

        // <--               //               --> //

        // <-- gravidade --> //   

               Rob.velocityY=Rob.velocityY+0.5

        // <--               //               --> //
    }

// <--               //               --> //

// <-- gerar obstaculos --> //   

    function gerarObstaculos(){
        // <-- gerar obstaculos --> //   

        if (frameCount % 80=== 0&&estadodeJogo===1){

            // <-- criar a variavel do obstaculo e adicionar velocidade a ele --> // 

                var obstaculo = createSprite(windowWidth+windowWidth/8,windowHeight/1.3,windowWidth/20,windowHeight/14);
                obstaculo.velocityX = -9;
                obstaculo.debug = false;

            // <--               //               --> //

            // <-- gerar obstaculos aleatoriamente --> //  

                var rand = Math.round(random(1,3));
                switch(rand) {
                
                    case 1: obstaculo.addImage(caixa);
                            break;
                    case 2: obstaculo.addImage(espinhos);
                        obstaculo.setCollider("rectangle",0,0,windowWidth/12,height/20);
                
                            break;
                    case 3: obstaculo.addImage(barril);
                            break;
                
                    default: break;
                }

            // <--               //               --> //

            // <-- adicionar os obstaculos ao grupo e dar vida util--> //  

                grupo1.add(obstaculo);
                obstaculo.lifetime = width

            // <--               //               --> //
            
        }
        

    }

// <--               //               --> //
  
// <-- keypressed --> //   
    function keyPressed(){

            // <-- play --> //  

                if(keyCode===13&&estadodeJogo===0){

                estadodeJogo=1
                Rob.velocityY=12

                }

            // <--               //               --> //    

            // <-- reset --> //  

                if(keyCode===82 && estadodeJogo===2){

                estadodeJogo=0
                grupo1.destroyEach();
                pontuacao = 0;
                    
                }

            // <--               //               --> //    

    }
// <--               //               --> //    