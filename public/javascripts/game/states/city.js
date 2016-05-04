var City = function (game) { };

City.prototype.init = function () {
	var isoGroup = null;	// Isometric group for map
	var cursorPos = null;	// Position of the cursor

	/* Buildings */
	var war = null;
	var townHome = null;
	var house = null;
	var factory = null;

	/* Hitboxes */
	//var warHitbox = null;
	//var factoryHitbox = null;
};

/* Loading of images */
City.prototype.preload = function () {
	/* General interface */
	game.load.image('tile', '../images/backgrounds/grass.png');
	game.load.image('topBar', '../images/bars/top_bar.jpg');
	game.load.image('coin', '../images/assets/coin.png');

	//Buildings
	game.load.image('factory', '../images/building/factory.png');
	game.load.image('house', '../images/building/maison.png');
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

	upgrade.preload();
};

City.prototype.create = function () {
    // Create a group for our tiles.
    isoGroup = game.add.group();

    // Load of tiles on a grid.
    this.spawnTiles();

	/* Building display */
	war = this.addBuilding(825, 65, 186, 155, 0, 'war');
		////warHitbox = false;
		//war.inputEnabled=true;
		//war.events.onInputOver.add(function () { warHitbox = true; }, this);
		//war.events.onInputOut.add(function () { warHitbox = false; }, this);
		//game.physics.arcade.enable(war);

	mairie = this.addBuilding(500, 170, 220, 350, 0, 'townHome');

	//house = this.addBuilding(400, 200, 128, 190, 0, 'house');

	factory = this.addBuilding(277, 90, 140, 190, 0, 'factory');
		//factory.inputEnabled=true;
		//factory.events.onInputOver.add(function () { factoryHitbox = true; }, this);
		//factory.events.onInputOut.add(function () { factoryHitbox = false; }, this);
		//factory.events.onInputDown.add(function () { factoryHitbox = false; upgrade.display(); }, this);
		//factoryHitbox = false;
		//game.physics.arcade.enable(factory);

    // Provide a 3D position for the cursor
    cursorPos = new Phaser.Plugin.Isometric.Point3();

	// Interface
	topBar = game.add.image(0, 0, 'topBar'); topBar.height = 30;
	coin = game.add.image(3, 2, 'coin'); coin.width = 26; coin.height = 26;
	text = game.add.text(32, 0, player.ressources.kaga, {font: "bold 26px Century Schoolbook L", fill: "#f19010"});
	text.height = 33;

	/* Pop-Up */
	upgrade.create();
};

City.prototype.update = function () {
	/* Update ressources */
	text.text = player.ressources.kaga;
};

City.prototype.render = function () {
	/* Display Pop-Up */
	if(upgrade.popUp() == false) {
		if(war.hitbox == true)
			game.debug.body(war, "rgba(255, 0, 0, 1)", false);
		else
			game.debug.body(war, "rgba(0, 0, 0, 0)", false);

		if(factory.hitbox == true)
			game.debug.body(factory, "rgba(255, 0, 0, 1)", false);
		else
			game.debug.body(factory, "rgba(0, 0, 0, 0)", false);
	}
	else {
		game.debug.body(war, "rgba(0, 0, 0, 0)", false);
		game.debug.body(factory, "rgba(0, 0, 0, 0)", false);
	}
};

City.prototype.addBuilding = function (x, y, width, height, angle, name) {
	var building = game.add.sprite(x, y, name);

	building.width = width;
	building.height = height;
	building.angle = angle;
	building.hitbox = false;

	building.inputEnabled = true;
	building.event.onInputOver.add(function () { building.hitbox = true; }, this);
	building.event.onInputOut.add(function () { building.hitbox = false; }, this);

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
			tile = game.add.isoSprite(xx*38, yy*38, 0, 'tile', 0, isoGroup);
			tile.anchor.set(0.5, 0);
			if(map[yy][xx] == 1) {
				tile.tint = 0x86bfda;
			}
        }
    }
};
