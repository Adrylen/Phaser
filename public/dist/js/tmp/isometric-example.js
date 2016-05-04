var game=new Phaser.Game(800,400,Phaser.AUTO,"test",null,!0,!1),IsometricTest=function(e){};IsometricTest.prototype.init=function(){},IsometricTest.prototype.preload=function(){game.load.image("tile","../images/tile.png"),game.time.advancedTiming=!0,game.plugins.add(new Phaser.Plugin.Isometric(game)),game.iso.anchor.setTo(.5,.2)},IsometricTest.prototype.create=function(){isoGroup=game.add.group(),this.spawnTiles(),cursorPos=new Phaser.Plugin.Isometric.Point3},IsometricTest.prototype.update=function(){game.iso.unproject(game.input.activePointer.position,cursorPos),isoGroup.forEach(function(e){var t=e.isoBounds.containsXY(cursorPos.x,cursorPos.y);!e.selected&&t?(e.selected=!0,e.tint=8830938,game.add.tween(e).to({isoZ:4},200,Phaser.Easing.Quadratic.InOut,!0)):e.selected&&!t&&(e.selected=!1,e.tint=16777215,game.add.tween(e).to({isoZ:0},200,Phaser.Easing.Quadratic.InOut,!0))})},IsometricTest.prototype.render=function(){game.debug.text("Move your mouse around!",2,36,"#ffffff"),game.debug.text(game.time.fps||"--",2,14,"#a7aebe")},IsometricTest.prototype.spawnTiles=function(){for(var e,t=0;256>t;t+=38)for(var o=0;256>o;o+=38)e=game.add.isoSprite(t,o,0,"tile",0,isoGroup),e.anchor.set(.5,0)},game.state.add("isometricTest",IsometricTest),game.state.start("isometricTest");