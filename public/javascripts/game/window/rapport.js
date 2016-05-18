var Rapport = function(game) {
	var cadre = null;
    var cross = null;

    var popUp = null;
};

Rapport.prototype = {
	preload: function() {
		game.load.image('cadre', '../images/background/backgroundCadre.png');
	},

	create: function() {
		cadre = game.add.sprite();
	},

	display: function() {

	},

	popUp: function() { return popUp; },

	update: function(user_id, building_id) {
		/* Serveur */
	},

	upgrade: function(data) {
		/* Serveur */
	}
};
