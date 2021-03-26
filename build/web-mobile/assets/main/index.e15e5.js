window.__require=function e(i,o,t){function c(s,r){if(!o[s]){if(!i[s]){var h=s.split("/");if(h=h[h.length-1],!i[h]){var a="function"==typeof __require&&__require;if(!r&&a)return a(h,!0);if(n)return n(h,!0);throw new Error("Cannot find module '"+s+"'")}s=h}var d=o[s]={exports:{}};i[s][0].call(d.exports,function(e){return c(i[s][1][e]||e)},d,d.exports,e,i,o,t)}return o[s].exports}for(var n="function"==typeof __require&&__require,s=0;s<t.length;s++)c(t[s]);return c}({game:[function(e,i){"use strict";cc._RF.push(i,"13047eV1DRLxbbb282B6F9D","game"),cc.Class({extends:cc.Component,properties:{playerNode:cc.Node,enemyNode:cc.Node,boomNode:cc.Node,scoreLabel:cc.Label},onLoad:function(){this.score=0,this.placePlayer(),this.placeEnemy(),this.node.on("touchstart",this.fire,this)},onDestroy:function(){this.node.off("touchstart",this.fire,this)},update:function(){this.playerNode.position.sub(this.enemyNode.position).mag()<this.playerNode.width/2+this.enemyNode.width/2&&(this.enemyNode.active=!1,this.boom(this.enemyNode.position,this.enemyNode.color),this.enemyNode.stopAction(this.enemyAction),this.playerNode.stopAction(this.playerAction),this.scoreLabel.string=++this.score,this.placePlayer(),this.placeEnemy())},placePlayer:function(){var e=this;this.isFire=!1,this.playerNode.active=!0,this.playerNode.y=-cc.winSize.height/4;var i=cc.sequence(cc.moveTo(10,cc.v2(this.playerNode.x,-(cc.winSize.height/2-this.playerNode.height/2))),cc.callFunc(function(){e.die()}));this.playerAction=this.playerNode.runAction(i)},placeEnemy:function(){var e=cc.winSize.width/2-this.enemyNode.width/2,i=Math.random()*cc.winSize.height/4,o=.6+.5*Math.random();this.enemyNode.active=!0,this.enemyNode.x=0,this.enemyNode.y=cc.winSize.height/3-this.enemyNode.height/2;var t=cc.repeatForever(cc.sequence(cc.moveTo(o,-e,i),cc.moveTo(o,e,i)));this.enemyAction=this.enemyNode.runAction(t)},fire:function(){var e=this;if(!this.isFire){this.isFire=!0,console.log("\u5f00\u59cb\u53d1\u5c04");var i=cc.sequence(cc.moveTo(.6,cc.v2(0,cc.winSize.height/2)),cc.callFunc(function(){e.die()}));this.playerAction=this.playerNode.runAction(i)}},die:function(){console.log("\u6e38\u620f\u7ed3\u675f"),this.playerNode.active=!1,this.boom(this.playerNode.position,this.playerNode.color),setTimeout(function(){cc.director.loadScene("game")},1e3)},boom:function(e,i){console.log("pos",e),this.boomNode.setPosition(e);var o=this.boomNode.getComponent(cc.ParticleSystem);void 0!==i&&(o.startColor=o.endColor=i),o.resetSystem()}}),cc._RF.pop()},{}]},{},["game"]);