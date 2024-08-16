class Player {
  constructor() {
    this.name = null;
    this.index= null;
    this.positionX= 0;
    this.positionY = 0;
    this.rank = 0
    this.score = 0
    this.fuel =185;
    
  }

  getPlayerCount(){
    database.ref("playerCount").on("value", data => {
      playerCount = data.val();
      console.log(playerCount);
    })
  }

  updatePlayerCount(players){
    database.ref("/").update({
      playerCount: players
    })
  }
  
  update(){
    var playerI = "players/player"+this.index;
    database.ref(playerI).update({
      positionX:this.positionX,
      positionY:this.positionY,
      rank: this.rank,
      score:this.score,
      fuel:this.fuel
    })
  }

  addPlayer(){
    var playerI = "players/player"+this.index;
    if(this.index == 1){
      this.positionX = width * 0.6666;
    }
    else{
      this.positionX = width * 0.3333;
    }
    database.ref(playerI).set({
      name: this.name,
      positionX: this.positionX,
      positionY:this.positionY,
      rank: this.rank,
      score:this.score
    })
  }

 
  static getPlayersInfo(){
    var playIR = database.ref("players");
    playIR.on("value", data => {
      allPlayers = data.val();
      
    })
  }


  getCarsAtEnd(){
    database.ref("number_of_cars").on("value", data =>{
      this.rank = data.val()
    })
  }


  static updateCarsAtEnd(rank){
    database.ref("/").update({
      number_of_cars:rank
    })
  }
    
  
}
