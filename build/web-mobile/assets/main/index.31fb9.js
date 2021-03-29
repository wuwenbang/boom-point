window.__require=function e(t,i,o){function n(s,r){if(!i[s]){if(!t[s]){var h=s.split("/");if(h=h[h.length-1],!t[h]){var a="function"==typeof __require&&__require;if(!r&&a)return a(h,!0);if(c)return c(h,!0);throw new Error("Cannot find module '"+s+"'")}s=h}var d=i[s]={exports:{}};t[s][0].call(d.exports,function(e){return n(t[s][1][e]||e)},d,d.exports,e,t,i,o)}return i[s].exports}for(var c="function"==typeof __require&&__require,s=0;s<o.length;s++)n(o[s]);return n}({game:[function(e,t){"use strict";cc._RF.push(t,"13047eV1DRLxbbb282B6F9D","game"),cc.Class({extends:cc.Component,properties:{playerNode:cc.Node,enemyNode:cc.Node,boomNode:cc.Node,scoreLabel:cc.Label,button:cc.Button,duration:1},onLoad:function(){this.button.node.on("click",this.restart,this),this.score=0,this.placePlayer(),this.placeEnemy(),this.node.on("touchstart",this.fire,this),this.button.node.active=!1},onDestroy:function(){this.node.off("touchstart",this.fire,this)},update:function(){this.playerNode.position.sub(this.enemyNode.position).mag()<this.playerNode.width/2+this.enemyNode.width/2&&(this.enemyNode.active=!1,this.boom(this.enemyNode.position,this.enemyNode.color),this.enemyNode.stopAction(this.enemyAction),this.playerNode.stopAction(this.playerAction),this.scoreLabel.string=++this.score,this.placePlayer(),this.placeEnemy(),this.duration=this.duration>.5?this.duration-.025:.5)},restart:function(){cc.director.loadScene("game")},placePlayer:function(){var e=this;this.isFire=!1,this.playerNode.active=!0,this.playerNode.y=-cc.winSize.height/4;var t=10*this.duration;console.log("dua",t);var i=cc.sequence(cc.moveTo(t,cc.v2(this.playerNode.x,-(cc.winSize.height/2-this.playerNode.height/2))),cc.callFunc(function(){e.die()}));this.playerAction=this.playerNode.runAction(i)},placeEnemy:function(){var e=cc.winSize.width/2-this.enemyNode.width/2,t=Math.random()*cc.winSize.height/4,i=this.duration+.5*Math.random();this.enemyNode.active=!0,this.enemyNode.x=0,this.enemyNode.y=cc.winSize.height/3-this.enemyNode.height/2;var o=cc.repeatForever(cc.sequence(cc.moveTo(i,-e,t),cc.moveTo(i,e,t)));this.enemyAction=this.enemyNode.runAction(o)},fire:function(){var e=this;if(!this.isFire){this.isFire=!0,console.log("\u5f00\u59cb\u53d1\u5c04");var t=cc.sequence(cc.moveTo(.6,cc.v2(0,cc.winSize.height/2)),cc.callFunc(function(){e.die()}));this.playerNode.stopAction(this.playerAction),this.playerAction=this.playerNode.runAction(t)}},die:function(){console.log("\u6e38\u620f\u7ed3\u675f"),this.playerNode.active=!1,this.boom(this.playerNode.position,this.playerNode.color),this.button.node.active=!0},boom:function(e,t){this.boomNode.setPosition(e);var i=this.boomNode.getComponent(cc.ParticleSystem);void 0!==t&&(i.startColor=i.endColor=t),i.resetSystem()}}),cc._RF.pop()},{}]},{},["game"]);