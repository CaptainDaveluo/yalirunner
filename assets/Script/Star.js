// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        game:{
          default: null,
          serializable: false
        }
    },

    // LIFE-CYCLE CALLBACKS:
    getPlayerDistance: function () {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },
    onPicked: function() {
        this.game.restStar--;
        this.node.destroy();
    },
    // onLoad () {},
    start () {

    },
    meetLurkerPicked:function(pos){
      for(var i=0;i<this.game.lurkers.size();i++){
        var lurkerPos = this.game.lurkers.get(i).getPosition();
        var dist = cc.pDistance(pos, lurkerPos);
        if(dist<80){
          return true;
        }
      }
      return false;
    },
    update (dt) {
      if(this.game.gameStatus == "started"){
        this.node.x -= this.game.speed;
        if(this.getPlayerDistance() < this.pickRadius){
          this.onPicked();
          return;
        }
        if(this.game.lurkers.size()>0 && this.meetLurkerPicked(this.node.position)){
          this.onPicked();
        }
        if(this.node.x < this.game.player.x - 100){
          this.game.restStar--;
          this.node.destroy();
        }
      }
    },
});
