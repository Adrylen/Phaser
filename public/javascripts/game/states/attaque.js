var Attaque = function(game) {};

Attaque.prototype.init = function () {

};

Attaque.prototype.preload = function () {
	// Background
	game.load.image('galaxy', '../images/backgrounds/galaxy.jpg');
	// Bars
	game.load.image('topBar', '../images/bars/top_bar.jpg');
	game.load.image('coin', '../images/assets/coin.png');
};

Attaque.prototype.create = function () {
	var galaxy = game.add.image(0, 30, 'galaxy');
	galaxy.width = 1087;
	galaxy.height = 620;
	topBar = game.add.image(0, 0, 'topBar'); topBar.height = 30;
	coin = game.add.image(3, 2, 'coin'); coin.width = 26; coin.height = 26;
	text = game.add.text(32, 0, kaga, {font: "bold 26px Century Schoolbook L", fill: "#f19010"});
	text.height = 33;

};

Attaque.prototype.update = function () {

};

Attaque.prototype.render = function () {

};
