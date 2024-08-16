class Game {
  constructor() {
    this.resetButton = createButton("")
    this.resetTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.board = createElement("h2");
    this.moving = false
  }
  
  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount= player.getPlayerCount();

    car1 = createSprite(width *0.6666, height-100)
    car1.addImage("car1",cIMG1)
    car1.scale=0.07


    car2 = createSprite(width *0.3333, height-100)
    car2.addImage("car2",cIMG2)
    car2.scale=0.07

    cars=[car1,car2];
    fuelGroup = new Group();
    coinGroup = new Group()
    obsGroup = new Group()

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obs1Img },
      { x: width / 2 - 150, y: height - 1300, image: obs1Img },
      { x: width / 2 + 250, y: height - 1800, image: obs1Img },
      { x: width / 2 - 180, y: height - 2300, image: obs2Img },
      { x: width / 2, y: height - 2800, image: obs2Img },
      { x: width / 2 - 180, y: height - 3300, image: obs1Img },
      { x: width / 2 + 180, y: height - 3300, image: obs2Img },
      { x: width / 2 + 250, y: height - 3800, image: obs2Img },
      { x: width / 2 - 150, y: height - 4300, image: obs1Img },
      { x: width / 2 + 250, y: height - 4800, image: obs2Img },
      { x: width / 2, y: height - 5300, image: obs1Img },
      { x: width / 2 - 180, y: height - 5500, image: obs2Img }
    ];

    this.makeSprite(fuelGroup, 4, fImg, 0.02)
    this.makeSprite(coinGroup, 18, cImg, 0.09)
    this.makeSprite(obsGroup, obstaclesPositions.length ,obs2Img, 0.04, obstaclesPositions)
    
  }

  //.on is like a watchman waitig for changes in database
  getGameState(){
    database.ref("gameState").on("value", data =>{
      gameState = data.val();
    })
  }

  updateGameState(state){
    database.ref("/").update({
      gameState : state
    })
    
  }

  handleElements(){
    form.hide()
    form.titleImg.position(40, 40)
    form.titleImg.class("gameTitleAfterEffect")

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.board.html("leaderboard")
    this.board.class("resetText")
    this.board.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
    


  }

  play(){
   
   
    this.handleElements()
    this.handleResetButton()
    Player.getPlayersInfo()
    player.getCarsAtEnd()

    if(allPlayers != undefined){
      image(tIMG,0,-height * 5, width, height * 6);
      drawSprites()
      this.showLeaderboard()
      
      this.fuelBar()
      

      var index=0;
      for(var plr in allPlayers){
        index = index+ 1
        var x = allPlayers[plr].positionX
        var y = height-allPlayers[plr].positionY;


        cars[index-1].position.x = x
        cars[index-1].position.y = y

        var finishLine = height*6 - 100
        if (player.positionY > finishLine){
          gameState = 2;
          player.rank += 1;
          player.rank = player.rank/2
          Player.updateCarsAtEnd(player.rank)
          player.update()
          this.showRank()

        }
        

        if(player.index == index){
          camera.position.y = cars[index-1].position.y;
          this.handleCoin(index)
          this.handleFuel(index)
        
         
        }

        fill ("red")
        textSize(20)
        text(player.name, x,y+80)
      }
      this.move()
      
    }
    
    
  }

 

  showLeaderboard(){
    var leader1, leader2
    var players = Object.values(allPlayers);
    if ((players[0].rank == 0 && players[1].rank == 0)|| players[0].rank==1){
      leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score ;
      leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score ;
    }
    if(players[1].rank == 1){
      leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score ;
      leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score ;
    }
    this.leader1.html(leader1)
    this.leader2.html(leader2)
  }

  move(){
    console.log(player.fuel)
    if (keyIsDown(UP_ARROW)){
      
      player.positionY += 10;
      player.update()
      this.moving = true
    
      
    }
    else{
      this.moving=false
    }
    if (keyIsDown(LEFT_ARROW) && player.positionX >= width/3-70 ){
      player.positionX -= 10
      player.update()
    }
    if (keyIsDown(RIGHT_ARROW) && player.positionX <= width/2 + 350){
      player.positionX += 10
      player.update()
    }
  }

  handleResetButton(){
    this.resetButton.mousePressed(()=> {
      database.ref("/").set({
        gameState : 0,
        playerCount : 0,
        players :{},
        number_of_cars:0
      })
      window.location.reload()
    })

  }

  makeSprite(spriteGroup, numberOfSprites, spriteImage, scale, positions = []){
    var x,y;
    for(var i= 0;  i < numberOfSprites; i++){
      if (positions.length > 0){
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image

      }
      
      else{
        x = random(width / 2 + 150, width / 2 - 150);
        y = random(-height * 4.5, height - 400)
      }
     
      var sprite = createSprite(x, y);
      sprite.addImage("sprite",spriteImage)
      sprite.scale = scale
      spriteGroup.add(sprite)
    }
   
  }

  handleFuel(index){
    cars[index-1].overlap(fuelGroup, function(collector, collected){
        player.fuel = 185
        collected.remove()
        player.update()
    })

    if (player.fuel > 0 && this.moving == true ){
      player.fuel -= 0.5;
    }

    if(player.fuel <= 0){
      gameState = 2
      this.gameOver()
    }
  }

  handleCoin(index){  
    cars[index-1].overlap(coinGroup, function(collector, collected){
      player.score += 10;
      collected.remove()
      player.update()
      
    })
  }

  fuelBar(){
    push()
    image(fImg, width / 2 - 130, height - player.positionY - 350, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 350, player.fuel, 20);
    noStroke();
    pop()
  }
  gameOver(){
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "HHHHHHHHHHHHHAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!"
    })
  }

  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "YOU ARE STILL A LOSER!!!!!"
    });
  }

 
}
