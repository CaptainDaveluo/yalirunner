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
      scoreDisplay:{
        default: null,
        type: cc.Label
      },
      final_score: 0,
      shown_score: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      this.shown_score=0;
    },

    update (dt) {  
      if(this.final_score > 0 && this.shown_score<this.final_score){
        this.shown_score++;
        this.scoreDisplay.string = ""+this.shown_score;
      }
    },
    onBackToMenu: function(event, customEventData){
      cc.director.loadScene("menu");
    },
});
