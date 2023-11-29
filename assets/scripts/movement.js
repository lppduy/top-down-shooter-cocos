cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    this.node.parent.on('mousemove', this.positionXY, this);
  },

  start() {},

  update(dt) {},

  positionXY(event) {
    let playerPosition = cc.v2(this.node.position.x, this.node.position.y);
    console.log(playerPosition);
    let mousePosition = event.getLocation();
    mousePosition = this.node.parent.convertToNodeSpaceAR(mousePosition);
    let angle = mousePosition.signAngle(playerPosition);
    let angleD = cc.misc.radiansToDegrees(angle);
    angleD = angleD * -1 - 45;

    this.node.angle = angleD;
  },
});
