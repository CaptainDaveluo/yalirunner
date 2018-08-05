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
        upSpeed:0,
        awordSpeed:0,   //前进速度
        accel:0,        //加速度
        baseLine:237,   //初始位置
        jumpCount:0     //跳跃计数
    },

    // LIFE-CYCLE CALLBACKS:

   onLoad () {
     var anim = this.getComponent(cc.Animation);
     anim.play('player_run');
   },

    start () {
    },

    pause(){
      var anim = this.getComponent(cc.Animation);
      anim.pause();
    },


    jump:function(){
      var node = this.node;
      if(this.jumpCount<2){
        this.upSpeed = 10;
        this.accel=-25;
        this.jumpCount++;
        node.y++;
      }
      //console.log("y:"+node.y+" upSpeed:"+this.upSpeed+" accel:"+this.accel+" baseLine:"+this.baseLine);
    },
    update (dt) {
      var node = this.node;
      if(node.y>this.baseLine){
        node.y+=this.upSpeed;
        this.upSpeed +=this.accel*dt;
      }else{
        node.y = this.baseLine;
        this.jumpCount = 0;
      }
    },
});
