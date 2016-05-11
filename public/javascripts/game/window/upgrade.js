var Upgrade = function(game) {
	var cadre = null;
	var cross = null;
	var background = null;

	var kaga_upgrade = null;

	var popUp = null;
};

Upgrade.prototype = {
	// Display
	preload: function() {
		game.load.image('quit', '../images/buttons/quit.png');
		game.load.image('coin', '../images/assets/coin.png');
		game.load.image('cadre', '../images/assets/cadre.png');
	},

	create: function() {
		/* Quit Cross */
		cross = game.add.sprite(1000, 45, 'quit');
		cross.inputEnabled=true;
		cross.events.onInputDown.add(function () {
			kaga_upgrade.visible = false;
			popUp = false;
		}, this);

		/* Pop Up */
		background = game.add.graphics(45, 25);

		background.beginFill(0x061452, 0.7);
		background.moveTo(0,25);
		background.lineTo(1000,25);
		background.lineTo(1000,600);
		background.lineTo(0,600);
		background.lineTo(0,25);
		background.endFill();

		/* Upgrade Kaga */

		upgrade_coin = game.add.sprite(102, 102, 'coin');
		upgrade_coin.inputEnabled=true;
		upgrade_coin.events.onInputDown.add(function() {
			var building;
			for (i in player.planets[0].buildings) {
				if (player.planets[0].buildings[i].type = 'factory') {
					building = player.planets[0].buildings[i]._id;
					break;
				}
			}
			var data = { user_id: player._id, planet_id: player.planets[0]._id, building_id: building };
			this.upgrade(data);
		}, this);

		kaga_upgrade = game.add.group();
		kaga_upgrade.add(background);
		kaga_upgrade.add(cross);
		kaga_upgrade.create(100, 100, 'cadre');
		kaga_upgrade.add(upgrade_coin);
		kaga_upgrade.visible = false;

		popUp = false;
	},

	display: function() {
		kaga_upgrade.visible = true;
		popUp = true;
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
		socket.emit('buildingUpgrade', data);
	}
};

var upgrade = new Upgrade(game);
