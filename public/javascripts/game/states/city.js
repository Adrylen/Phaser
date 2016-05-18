var City = function (game) { };

City.prototype.init = function () {
	var isoGroup = null;	// Isometric group for map
	var cursorPos = null;	// Position of the cursor

	/* Buildings */
	var war = null;
	var townHome = null;
	var factory = null;

	/* Information */
	var info = null;
};

/* Loading of images */
City.prototype.preload = function () {
	/* General interface */
	game.load.image('topBar', '../images/bars/top_bar.jpg');
	game.load.image('coin', '../images/assets/coin.png');

	/* Map */
	game.load.image('tile', '../images/backgrounds/grass.png');
	game.load.image('grass', '../images/backgrounds/herbe.png');
	game.load.image('road', '../images/backgrounds/road.png');
	game.load.image('roadN', '../images/backgrounds/roadN.png');
	game.load.image('roadW', '../images/backgrounds/roadW.png');
	game.load.image('roadE', '../images/backgrounds/roadE.png');
	game.load.image('roadS', '../images/backgrounds/roadS.png');

	//Buildings
	game.load.image('factory', '../images/building/factory.png');
	game.load.image('townHome', '../images/building/mairie.png');
	game.load.image('war', '../images/building/guerre.png');

	// Add and enable the plug-in.
	game.plugins.add(new Phaser.Plugin.Isometric(game));

	// Start the physics system.
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

	// This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
	// this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
	game.iso.anchor.setTo(0.5, -0.40);

	formation.preload();
	upgrade.preload();
};

City.prototype.create = function () {
    // Create a group for our tiles.
    isoGroup = game.add.group();

    // Load of tiles on a grid.
    this.spawnTiles();

	/* Building display */
	war = this.addBuilding(825, 65, 186, 155, 0, 'war');
	war.events.onInputDown.add(function () { formation.display(); }, this);

	townHome = this.addBuilding(500, 170, 220, 350, 0, 'townHome');
	townHome.events.onInputDown.add(function () { rapport.display(); }, this);

	factory = this.addBuilding(277, 90, 140, 190, 0, 'factory');
	factory.events.onInputDown.add(function () { upgrade.display(); }, this);

    // Provide a 3D position for the cursor
    cursorPos = new Phaser.Plugin.Isometric.Point3();

	// Interface
	topBar = game.add.image(0, 0, 'topBar'); topBar.height = 30;
	coin = game.add.image(3, 2, 'coin'); coin.width = 26; coin.height = 26;
	text = game.add.text(32, 0, player.ressources.kaga, {font: "bold 26px Century Schoolbook L", fill: "#f19010"});
	text.height = 33;

	/* Pop-Up */
	formation.create();
	upgrade.create();

	/* Information */
	info = game.add.graphics(0, 0);
	info.beginFill(0x000, 0.7);
	info.lineTo(100,0);
	info.lineTo(100,100);
	info.lineTo(0,100);
	info.lineTo(0,0);
	info.endFill();
	info.visible = false;
};

City.prototype.update = function () {
	/* Update ressources */
	text.text = player.ressources.kaga;

	/* Information */
	if(upgrade.popUp() == true || formation.popUp() == true)
		info.visible = false;
	if (info.visible) {
		info.x = game.input.activePointer.x;
		info.y = game.input.activePointer.y;
	}
};

City.prototype.render = function () {
};

City.prototype.addBuilding = function (x, y, width, height, angle, name) {
	var building = game.add.sprite(x, y, name);

	building.width = width;
	building.height = height;
	building.alpha = 0.75;
	building.angle = angle;

	building.inputEnabled = true;
	building.events.onInputOver.add(function () { if(!(upgrade.popUp() || formation.popUp())) building.alpha = 1; info.visible = true; }, this);
	building.events.onInputOut.add(function () { building.alpha = 0.75; info.visible = false; }, this);

	game.physics.arcade.enable(building);

	return building;
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
			if(map[yy][xx] == 0) tile = game.add.isoSprite(xx*38, yy*38, 0, 'tile', 0, isoGroup);
			if(map[yy][xx] == 1) { tile = game.add.isoSprite(xx*38, yy*38, 0, 'tile', 0, isoGroup); tile.tint = 0x86bfda; }
			if(map[yy][xx] == 2) tile = game.add.isoSprite(xx*38, yy*38, 0, 'road', 0, isoGroup);
			if(map[yy][xx] == 3) tile = game.add.isoSprite(xx*38, yy*38, 0, 'roadN', 0, isoGroup);
			if(map[yy][xx] == 4) tile = game.add.isoSprite(xx*38, yy*38, 0, 'roadW', 0, isoGroup);
			if(map[yy][xx] == 5) tile = game.add.isoSprite(xx*38, yy*38, 0, 'roadE', 0, isoGroup);
			if(map[yy][xx] == 6) tile = game.add.isoSprite(xx*38, yy*38, 0, 'roadS', 0, isoGroup);
			if(map[yy][xx] == 7) { tile = game.add.isoSprite(xx*38, yy*38, 0, 'tile', 0, isoGroup); herbe = game.add.isoSprite((xx-1)*38, (yy-1)*38, 0, 'grass', 0, isoGroup); }

			tile.anchor.set(0.5, 0);
		}
	}
};
