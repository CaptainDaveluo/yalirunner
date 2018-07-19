cc.Class({
    extends: cc.Component,

    properties: {
        // defaults, set visually when attaching this script to the Canvas
        starPreb:{
          default: null,
          type: cc.Prefab
        },
        monsterPreb:{
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
        }
    },

    // use this for initialization
    onLoad: function () {
      this.groundY = this.player.y;
      this.timer = 0;
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPreb);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        newStar.getComponent('Star').game = this;
        newStar.setPosition(this.getNewStarPosition());
    },
    spawnNewMonster: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newMonster = cc.instantiate(this.monsterPreb);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newMonster);
        newMonster.getComponent('Monster').game = this;
        newMonster.setPosition(this.getNewMonsterPosition());
    },
    getNewMonsterPosition: function(){
      var starX = 0;
      var starY = this.groundY - 5;
      var maxX = this.node.width/2;
      starX = maxX-50;
      console.log(starX + " "+starY);
      // 返回星星坐标
      return cc.p(starX, starY);
    },

    getNewStarPosition: function () {
        var starX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var starY = this.groundY + 30;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        starX = maxX-50;
        console.log(starX + " "+starY);
        // 返回星星坐标
        return cc.p(starX, starY);
    },

    btnClick(event, customEventData){
     console.log("按下按钮");
    },

    // called every frame
    update: function (dt) {
      if (this.timer > this.starCreateDuration) {
          this.timer=0;
          this.spawnNewStar();
          return;
      }
      this.timer += dt*5;
    },
});
