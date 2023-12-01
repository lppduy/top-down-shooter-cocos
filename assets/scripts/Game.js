cc.Class({
  extends: cc.Component,

  properties: {
    bullet: {
      default: null,
      type: cc.Prefab,
    },
    posX: {
      default: 0,
      type: cc.Float,
    },
    posY: {
      default: 0,
      type: cc.Float,
    },
  },

  onLoad() {
    this.node.on('mousedown', this.spawnBullets, this);
  },

  start() {},

  update(dt) {},

  spawnBullets(event) {
    let player = this.node.getChildByName('soldier1');

    let newBullet = cc.instantiate(this.bullet);
    newBullet.setPosition(player.position.x, player.position.y);
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
