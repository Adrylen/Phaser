var City = function (game) { };

City.prototype.init = function () {
	var isoGroup = null;
	var cursorPos = null;
	var cursor = null;
};

City.prototype.preload = function () {
	game.load.image('tile', '../images/backgrounds/grass.png');
	game.load.image('sideBar', '../images/bars/side_bar.jpg');
	// Bars
	game.load.image('topBar', '../images/bars/top_bar.jpg');
	game.load.image('coin', '../images/assets/coin.png');
	//Buildings
	game.load.image('war', '../images/building/guerre.png');

	game.time.advancedTiming = true;

	// Add and enable the plug-in.
	game.plugins.add(new Phaser.Plugin.Isometric(game));

	// Start the IsoArcade physics system.
	game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

	// This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
	// this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
	game.iso.anchor.setTo(0.5, -0.40);
};

City.prototype.create = function () {
    // Create a group for our tiles.
    isoGroup = game.add.group();

    // Let's make a load of tiles on a grid.
    this.spawnTiles();

		war = game.add.sprite(400, 200, 'war');
		war.width = 128;
		war.height = 110;
		war.angle = 5;
		war.inputEnabled = true;
		war.input.enableDrag(true);

    // Provide a 3D position for the cursor
    cursorPos = new Phaser.Plugin.Isometric.Point3();

	// Interface
	topBar = game.add.image(0, 0, 'topBar'); topBar.height = 30;
	coin = game.add.image(3, 2, 'coin'); coin.width = 26; coin.height = 26;
	text = game.add.text(32, 0, kaga, {font: "bold 26px Century Schoolbook L", fill: "#f19010"});
	text.height = 33;
};

City.prototype.update = function () {
    // Update the cursor position.
    // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
    // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
    game.iso.unproject(game.input.activePointer.position, cursorPos);

    // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
    isoGroup.forEach(function (tile) {
        var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
        // If it does, do a little animation and tint change.
        if (!tile.selected && inBounds) {
            tile.selected = true;
            tile.tint = 0x86bfda;
            game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
        }
        // If not, revert back to how it was.
        else if (tile.selected && !inBounds) {
            tile.selected = false;
            tile.tint = 0xffffff;
            game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
        }
    });
};

City.prototype.render = function () {
    //game.debug.text("Move your mouse around!", 2, 36, "#ffffff");
    //game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
};

City.prototype.spawnTiles = function () {
  var tile;
	var width = 17;
	var height = 20;
	var min = width, max = height;
	var size = width + height -1;

    for (var yy = 0; yy < size; yy++) {
		min = (yy >= width) ? min + 1 : min - 1;
		max = (yy >= height) ? max + 1 : max - 1;

        for (var xx = min; xx < size - max; xx++) {
            // Create a tile using the new game.add.isoSprite factory method at the specified position.
            // The last parameter is the group you want to add it to (just like game.add.sprite)
			tile = game.add.isoSprite(xx*38, yy*38, 0, 'tile', 0, isoGroup);
			tile.anchor.set(0.5, 0);
        }
    }
};
