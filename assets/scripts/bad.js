cc.Class({
  extends: cc.Component,

  properties: {},
  onCollisionEnter(other, self) {
    if (other.tag == 2) this.node.destroy();
    if (other.tag == 1) cc.director.loadScene('Game');
  },
  onLoad() {
    let manager = cc.director.getCollisionManager();
    manager.enabled = true;
    manager.enabledDebugDraw = true;
    cc.director.preloadScene('Game');

    this.action = this.moveToPlayer();
    console.log('ok');
    this.node.runAction(this.action);
  },

  start() {},

  update(dt) {},

  moveToPlayer() {
    let moveAction = cc.moveTo(
      3,
      this.node.parent.getChildByName('soldier1').position.x,
      this.node.parent.getChildByName('soldier1').position.y
    );
    return moveAction;
  },
});
