class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h2");
  
    
  }
  setPosition(){
    this.titleImg.position(200,100)
    this.input.position(width/2 - 130, height/2 -100)
    this.playButton.position(width/2 - 110, height/2);
    this.greeting.position(600,height/2)
 

  }
  setStyle(){
    this.titleImg.class("gameTitle")
    this.input.class("customInput")
    this.playButton.class("customButton")
    this.greeting.class("greeting")
  
  }
  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  
  pressed(){
    this.playButton.mousePressed(()=>{
      this.input.hide();
      this.playButton.hide();
      var message =  `Hello ${this.input.value()} </br> Wait for another player to join... `;
    
      this.greeting.html(message);
      playerCount += 1;
  
      player.name= this.input.value();
      player.index= playerCount;
      player.addPlayer();
      player.updatePlayerCount(playerCount)
    })
  }
 

  
  


  display(){
    this.setPosition()
    this.setStyle();
    this.pressed();

  }
}
