cc.Class({
  extends: cc.Component,

  properties: {
    bullet: {
      default: null,
      type: cc.Prefab,
    },
    posX: 0,
    posY: 0,
  },

  onLoad() {
    this.node.on('mousedown', this.spawnBullets, this);
    let manager = cc.director.getCollisionManager();
    manager.enabled = true;
  },

  start() {},

  update(dt) {},

  spawnBullets(event) {
    let newBullet = cc.instantiate(this.bullet);
    newBullet.setPosition(
      this.node.getChildByName('soldier1').position.x,
      this.node.getChildByName('soldier1').position.y
    );
    this.node.addChild(newBullet);

    let mousePosition = event.getLocation();
    mousePosition = this.node.convertToNodeSpaceAR(mousePosition);

    this.posX = mousePosition.x;
    this.posY = mousePosition.y;

    let actionBy = cc.moveTo(0.2, cc.v2(this.posX, this.posY));
    let destruction = cc.callFunc(function () {
      newBullet.destroy();
    }, this);

    let sequence = cc.sequence(actionBy, destruction);
    newBullet.runAction(sequence);
  },
});
