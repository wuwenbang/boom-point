cc.Class({
  extends: cc.Component,
  properties: {
    playerNode: cc.Node,
    enemyNode: cc.Node,
    boomNode: cc.Node,
    scoreLabel: cc.Label,
  },
  onLoad() {
    // let particle = this.boomNode.getComponent(cc.ParticleSystem)
    // particle.resetSystem()
    this.score = 0
    this.placePlayer()
    this.placeEnemy()
    this.node.on('touchstart', this.fire, this) //绑定点击事件
  },
  onDestroy() {
    this.node.off('touchstart', this.fire, this) //解绑点击事件
  },
  update(dt) {
    // 撞击敌人
    if (
      this.playerNode.position.sub(this.enemyNode.position).mag() <
      this.playerNode.width / 2 + this.enemyNode.width / 2
    ) {
      this.enemyNode.active = false
      this.boom(this.enemyNode.position, this.enemyNode.color)
      this.enemyNode.stopAction(this.enemyAction)
      this.playerNode.stopAction(this.playerAction)
      this.scoreLabel.string = ++this.score
      this.placePlayer()
      this.placeEnemy()
    }
  },
  // 放置玩家节点
  placePlayer() {
    this.isFire = false
    this.playerNode.active = true
    this.playerNode.y = -cc.winSize.height / 4
    let dua = 10
    let seq = cc.sequence(
      cc.moveTo(dua, cc.v2(this.playerNode.x, -(cc.winSize.height / 2 - this.playerNode.height / 2))),
      cc.callFunc(() => {
        this.die()
      })
    )
    this.playerAction = this.playerNode.runAction(seq)
  },
  // 放置敌人节点
  placeEnemy() {
    let x = cc.winSize.width / 2 - this.enemyNode.width / 2
    let y = (Math.random() * cc.winSize.height) / 4
    let dua = 1 + Math.random() * 0.5
    this.enemyNode.active = true
    this.enemyNode.x = 0
    this.enemyNode.y = cc.winSize.height / 3 - this.enemyNode.height / 2
    let seq = cc.repeatForever(cc.sequence(cc.moveTo(dua, -x, y), cc.moveTo(dua, x, y)))
    this.enemyAction = this.enemyNode.runAction(seq)
  },
  // 发射玩家
  fire() {
    if (this.isFire) return
    this.isFire = true
    console.log('开始发射')
    let dua = 0.6
    let seq = cc.sequence(
      cc.moveTo(dua, cc.v2(0, cc.winSize.height / 2)),
      cc.callFunc(() => {
        this.die()
      })
    )
    this.playerNode.stopAction(this.playerAction)
    this.playerAction = this.playerNode.runAction(seq)
  },

  // 游戏结束
  die() {
    console.log('游戏结束')
    this.playerNode.active = false
    this.boom(this.playerNode.position, this.playerNode.color)
    setTimeout(() => {
      cc.director.loadScene('game')
    }, 1000)
  },

  //爆炸
  boom(pos, color) {
    console.log('pos', pos)
    this.boomNode.setPosition(pos)
    let particle = this.boomNode.getComponent(cc.ParticleSystem)
    if (color !== undefined) {
      particle.startColor = particle.endColor = color
    }
    particle.resetSystem()
  },
})
