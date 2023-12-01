cc.Class({
  extends: cc.Component,

  properties: {
    bullet: {
      default: null,
      type: cc.Prefab,
    },
    badguy: {
      default: null,
      type: cc.Prefab,
    },
    scoreLabel: {
      default: null,
      type: cc.Label,
    },
    gunSound: {
      default: null,
      type: cc.AudioClip,
    },
    posX: 0,
    posY: 0,
    score: 0,
  },

  onLoad() {
    this.node.on('mousedown', this.spawnBullets, this);
    this.schedule(this.createBad, 0.8, cc.macro.REPEAT_FOREVER, 3);
  },

  start() {},

  update(dt) {},

  addScore() {
    this.score += 10;
    this.scoreLabel.string = 'SCORE: ' + this.score.toString();
  },
  createBad() {
    let newBadGuy = cc.instantiate(this.badguy);
    let positions = [
      cc.v2(-778, 458),
      cc.v2(778, -458),
      cc.v2(779, 6),
      cc.v2(-700, 20),
      cc.v2(778, 700),
      cc.v2(-778, -758),
      cc.v2(779, 200),
      cc.v2(-700, 20),
      cc.v2(779, -200),
      cc.v2(-250, 0),
      cc.v2(-250, -150),
      cc.v2(-250, 100),
      cc.v2(-250, 500),
    ];
    let badGuyPosition = Math.floor(Math.random() * positions.length);
    newBadGuy.setPosition(positions[badGuyPosition]);
    this.node.addChild(newBadGuy);
  },

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
    cc.audioEngine.playEffect(this.gunSound, false);
  },
});
