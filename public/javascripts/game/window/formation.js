var Formation = function(game) {
	var cadre = null;
    var cross = null;

    var popUp = null;
};

Formation.prototype = {
	preload: function() {
		game.load.image('quit', '../images/buttons/quit.png');
	},

	create: function() {
		/* Quit Cross */
		cross = game.add.sprite(1000, 45, 'quit');
		cross.inputEnabled=true;
		cross.events.onInputDown.add(function () {
			cadre.visible = false;
			cross.visible = false;
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
	},

	display: function() {
		cadre.visible = true;
		cross.visible = true;
		popUp = true;
	},

	popUp: function() { return popUp; },

	update: function(user_id, building_id) {
		/* Serveur */
	},

	upgrade: function(data) {
		/* Serveur */
	}
};

var formation = new Formation(game);
