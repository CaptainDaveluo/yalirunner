cc.Class({
    extends: cc.Component,
    properties: {
        // defaults, set visually when attaching this script to the Canvas
        starPreb:{
          default: null,
          type: cc.Prefab
        },
        lurkerPreb:{
          default: null,
          type: cc.Prefab
        },
        starCreateDuration:0,
        floor:{
          default: null,
          type: cc.Node
        },
        player:{
          default: null,
          type: cc.Node
        },
        scoreDisplay:{
          default: null,
          type: cc.Label
        },
        score:0,
        speed:5,
        gameStatus: "started",
        gameOverWindow:{
          default: null,
          type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
      var Queue = require('Queue');
      this.lurkers = new Queue();
      this.groundY = this.player.y;
      this.timer = 0;
      this.speed = 5;
      this.spanTrapezoidStar(10);
      this.gameStatus = "started";
      this.gameOverWindow.active = false;
    },

    
    ////TODO 此部分冗余代码需要重构
    //生成三角形的星星
    spanTrapezoidStar: function(number){
      this.restStar = 0;
      for(var i=0;i<5;i++){
        for(var j=i;j<number-i;j++){
          var newStar = cc.instantiate(this.starPreb);
          this.node.addChild(newStar);
          newStar.getComponent('Star').game = this;
          var starX = this.node.width/2 - 50 + j * 80;
          var starY = this.groundY + i * 45;
          newStar.setPosition(cc.p(starX,starY));
          this.restStar++;
        }
      }
    },
    //生成长方形的星星
    spanSquareStar: function(number){
      this.restStar = 0;
      for(var i=0;i<5;i++){
        for(var j=0;j<number;j++){
          var newStar = cc.instantiate(this.starPreb);
          this.node.addChild(newStar);
          newStar.getComponent('Star').game = this;
          var starX = this.node.width/2 - 50 + j * 80;
          var starY = this.groundY + i * 45;
          newStar.setPosition(cc.p(starX,starY));
          this.restStar++;
        }
      }
    },

    spawnNewStar: function(offsetY) {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPreb);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        newStar.getComponent('Star').game = this;
        if(offsetY!=undefined)
          newStar.setPosition(this.getNewStarPosition(offsetY));
        else
          newStar.setPosition(this.getNewStarPosition());
    },

    spawnNewLurker: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newLurker = cc.instantiate(this.lurkerPreb);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newLurker);
        newLurker.getComponent('Lurker').game = this;
        newLurker.setPosition(this.getNewLurkerPosition());
        this.lurkers.push(newLurker);
        this.lurkers.printf();
    },

    getNewLurkerPosition: function(){
      var starX = 0;
      var starY = this.groundY - 11;
      var maxX = this.node.width/2;
      starX = maxX-50;
      return cc.p(starX, starY);
    },

    getNewStarPosition: function (offsetY) {
        var starX = 0;
        var starY = 0;
        if(offsetY!=undefined)
          starY = this.groundY + 30 + offsetY;
        else
          starY = this.groundY + 30;
        var maxX = this.node.width/2;
        starX = maxX-50;
        // 返回星星坐标
        return cc.p(starX, starY);
    },

    btnClick(event, customEventData){
    },

    // called every frame
    update: function (dt) {
      if (this.timer > this.starCreateDuration && this.gameStatus == "started") {
          this.timer=0;
          //this.spawnNewStar();
          if(this.score%100==0){   //不断增加游戏速度
            this.speed +=1;
          }
          this.score += Math.ceil(dt*this.speed*2);
          this.scoreDisplay.string=""+this.score;
          if(this.restStar<=0){
            var randomEvent = (10 * cc.random0To1())>5?true:false;
            if(randomEvent)
              this.spanTrapezoidStar(10);
            else
              this.spanSquareStar(12);
          }else{
            var randomEvent = (10 * cc.random0To1())>9?true:false;
            if(randomEvent){
              this.spawnNewLurker();
            }
          }
          return;
      }
      this.timer += dt*5;
    },

    gameOver: function() {
      var playrAnim = this.player.getComponent(cc.Animation);
      playrAnim.pause();
      this.gameStatus = "stoped";
      this.gameOverWindow.active = true;
      var player = this.player.getComponent('Player');
      player.canJump = false;
      var gameOverWindow = this.gameOverWindow.getComponent('GameOverWindow');
      gameOverWindow.final_score = this.score;
    }
});
