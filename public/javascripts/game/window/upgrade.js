var Upgrade = function(game) {
	var cadre = null;
	var cross = null;

	var popUp = null;
};

Upgrade.prototype = {
	// Display
	preload: function() {
		game.load.image('quit', '../images/buttons/quit.png');
		game.load.image('upgrade_coin', '../images/assets/coin.png');
	},

	create: function() {
		/* Quit Cross */
		cross = game.add.sprite(1000, 45, 'quit');
		cross.inputEnabled=true;
		cross.events.onInputDown.add(function () {
			cadre.visible = false;
			cross.visible = false;
			upgrade_coin.visible = false;
			popUp = false;
		}, this);
		cross.visible = false;

		/* Pop Up */
		cadre = game.add.graphics(45, 25);
		cadre.visible = false;

		cadre.beginFill(0x061452, 0.7);
		cadre.moveTo(0,25);
		cadre.lineTo(1000,25);
		cadre.lineTo(1000,600);
		cadre.lineTo(0,600);
		cadre.lineTo(0,25);
		cadre.endFill();

		/* Upgrade Kaga */
		upgrade_coin = game.add.sprite(100, 100, 'upgrade_coin');
		upgrade_coin.inputEnabled=true;
		upgrade_coin.visible = false;
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

		popUp = false;
	},

	display: function() {
		cadre.visible = true;
		cross.visible = true;
		upgrade_coin.visible = true;
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
		console.log('buildingUpgrade');
		socket.emit('buildingUpgrade', data);
	}
};

var upgrade = new Upgrade(game);
