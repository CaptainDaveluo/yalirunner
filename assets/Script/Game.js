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
        }
    },

    // use this for initialization
    onLoad: function () {
      this.groundY = this.player.y;
      this.timer = 0;
      this.generateStarGroup();
    },

    //生成一组星星
    generateStarGroup:function(){
      var starNum = 10 + cc.random0To1()*5;
      this.restStar = Math.floor(starNum);
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
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
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
      if (this.timer > this.starCreateDuration) {
          this.timer=0;
          //this.spawnNewStar();
          if(this.restStar>0){
            this.spawnNewStar();
            this.restStar -- ;
          }else{
            this.spawnNewLurker();
            this.spawnNewStar(35);
            var willNextBeLurker = (10 * cc.random0To1())>3?true:false;
            if(willNextBeLurker){
              this.generateStarGroup();
            }
          }
          return;
      }
      this.timer += dt*5;
    },
});
