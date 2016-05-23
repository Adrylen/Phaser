var Rapport = function(game) {
	var cadre = null;
	var background = null;

	var leftButton = null;
	var rightButton = null;
};

Rapport.prototype = {
	preload: function() {
		game.load.image('cadre', '../images/backgrounds/backgroundCadre.png');
		game.load.image('button', '../images/buttons/blankButton.png');
	},

	create: function() {
		cadre = game.add.sprite(0, 0, 'cadre');
		cadre.width = 250;
		cadre.height = 250;

		background = game.add.graphics(0, 0);
		background.beginFill("#000", 0.9);
		background.lineTo(250, 0);
		background.lineTo(250, 250);
		background.lineTo(0, 250);
		background.lineTo(0, 0);
		background.endFill();

		//leftButton
		leftButton = game.add.group();
		leftButton.x = 23;
		leftButton.y = 190;
		var leftButtonImage = game.add.sprite(0, 0, 'button');
		leftButtonImage.width = 100;
		leftButtonImage.height = 30;
		leftButton.add(leftButtonImage);
		leftButton.add(game.add.text(3, 3, "Left", {font: "12px Purisa", fill: "#222"}));

		//rightButton
		rightButton = game.add.group();
		rightButton.x = 128;
		rightButton.y = 190;
		var rightButtonImage = game.add.sprite(0, 0, 'button');
		rightButtonImage.width = 100;
		rightButtonImage.height = 30;
		rightButton.add(rightButtonImage);
		rightButton.add(game.add.text(3, 3, "Right", {font: "12px Purisa", fill: "#222"}));

		main = game.add.group();
		main.x = 30;
		main.y = 400;
		main.add(background);
		main.add(cadre);
		main.add(leftButton);
		main.add(rightButton);
	},

	close: function() {

	},
};
