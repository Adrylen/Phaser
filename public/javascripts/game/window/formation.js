var Formation = function(game) {
	var background = null;
	var backgroundCadre = null;
    var cross = null;

	var displayManager =  null;

    var popUp = null;
};

Formation.prototype = {
	preload: function() {
		game.load.image('quit', '../images/buttons/quit.png');
		game.load.image('backgroundCadre', '../images/backgrounds/backgroundCadre.png');
	},

	create: function() {
		/* Quit Cross */
		cross = game.add.sprite(1000, 45, 'quit');
		cross.inputEnabled=true;
		cross.events.onInputDown.add(function () {
			this.displayManager.visible = false;
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

		this.displayManager = game.add.group();
		this.displayManager.add(background);
		this.displayManager.add(backgroundCadre);
		this.displayManager.add(cross);
		this.displayManager.visible = false;

		popUp = false;
	},

	display: function() {
		this.displayManager.visible = true;
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
