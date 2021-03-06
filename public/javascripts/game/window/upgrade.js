var Upgrade = function(game) {
	var cross = null;
	var background = null;
	var backgroundCadre = null;
	var groupUpgrades = null;

	var popUp = null;
};

Upgrade.prototype = {
	// Display
	preload: function() {
		game.load.image('backgroundCadre', '../images/backgrounds/backgroundCadre.png');
		game.load.image('quit', '../images/buttons/quit.png');

		game.load.image('cadre', '../images/assets/cadre.png');

		game.load.image('kaga', '../images/assets/more.png');
		game.load.image('iron', '../images/assets/iron.png');
		game.load.image('watt', '../images/assets/power.png');
		game.load.image('food', '../images/assets/food.png');
		game.load.image('water', '../images/assets/water.png');
		game.load.image('tool', '../images/assets/tool.png');
		game.load.image('lumber', '../images/assets/lumber.png');
	},

	create: function() {
		/* Quit Cross */
		cross = game.add.sprite(1000, 45, 'quit');
		cross.inputEnabled=true;
		cross.events.onInputDown.add(function () {
			groupUpgrades.visible = false;
			popUp = false;
		}, this);

		/* Pop Up */
		backgroundCadre = game.add.sprite(45, 50, 'backgroundCadre');
		backgroundCadre.width = 1000;
		backgroundCadre.height = 575;

		background = game.add.graphics(120, 113);
		background.beginFill(0x000000, 0.7);
		background.lineTo(852,0);
		background.lineTo(852,451);
		background.lineTo(0,451);
		background.lineTo(0,0);
		background.endFill();

		/* Group PopUp Declaration */
		groupUpgrades = game.add.group();

		groupUpgrades.add(backgroundCadre);
		groupUpgrades.add(background);
		groupUpgrades.add(cross);

		groupUpgrades.add(this.newGroup(0, "Increase by 1 your COIN production", 'kaga', 'ambassade'));					// Upgrade Kaga
		groupUpgrades.add(this.newGroup(1, "Increase by 1 your IRON production", 'iron', 'mine'));						// Upgrade Iron
		groupUpgrades.add(this.newGroup(2, "Increase by 1 your ENERGY generator", 'watt', 'generator'));				// Upgrade Energy
		groupUpgrades.add(this.newGroup(3, "Increase by 1 your FOOD production", 'food', 'farm'));						// Upgrade Water
		groupUpgrades.add(this.newGroup(4, "Increase by 1 your WATER extraction", 'water', 'pump'));						// Upgrade Water
		groupUpgrades.add(this.newGroup(5, "Increase by 1 your TOOLS production", 'tool', 'factory'));					// Upgrade Tool
		groupUpgrades.add(this.newGroup(6, "Increase by 1 your LUMBER production", 'lumber', 'lumberjack'));	// Upgrade Lumber

		groupUpgrades.visible = false;

		popUp = false;
	},

	display: function() {
		groupUpgrades.visible = true;
		popUp = true;
	},

	newGroup: function(nb, text, resource, building) {
		var group = game.add.group();
		group.create(130, 130 + nb*40, 'cadre');

		group.add(game.add.text(200, 132 + nb*40, text, {font: "17px Purisa", fill: "#ffffff"}));

		var newUpgrade = game.add.sprite(132, 132 + nb*40, resource);
		newUpgrade.width = 30;
		newUpgrade.height = 30;
		newUpgrade.inputEnabled=true;
		newUpgrade.events.onInputDown.add(function() {
			var dbBuilding;
			for (i in player.planets[0].buildings) {
				if (player.planets[0].buildings[i].type == building) {
					dbBuilding = player.planets[0].buildings[i]._id; break; }
			}
			var data = { user_id: player._id, planet_id: player.planets[0]._id, building_id: dbBuilding };
			console.log(building + ' : ' + dbBuilding);
			this.upgrade(data);
		}, this);
		group.add(newUpgrade);

		return group;
	},

	popUp: function() { return popUp; },

	//Update server
	update: function(user_id, building_id) {
		/* ARTHUR */
		var data = {user_id: user_id, building_id: building_id};
		socket.emit('AskCommerce', data);
	},
	//data = { user_id, planet_id, building_id }
	upgrade: function(data) {
		//console.log('buildingUpgrade');
		socket.emit('buildingUpgrade', data);
	}
};

var upgrade = new Upgrade(game);
