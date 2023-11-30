cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    this.action = this.moveToPlayer();
    this.node.runAction(this.action);
  },

  start() {},

  update(dt) {},

  moveToPlayer() {
    let player = this.node.parent.getChildByName('soldier1');
    let moveAction = cc.moveTo(3, player.position.x, player.position.y);
    return moveAction;
  },
});
