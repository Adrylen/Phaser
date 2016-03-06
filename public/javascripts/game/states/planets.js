var Planets = function(game) {};

var theta = 1;	// or whatever...

var planet = [];
//var values = [1.00, 0.84, 0.70, 0.55, 0.39, 0.23];
var demi_axes = [];
var nb_of_player = 6;
var path = '../images/planets/planet';

for(var i in solar_system.users){
	for(var j in solar_system.users[i].planets){
			//console.log(JSON.stringify(solar_system.users[i].planets[j], null, 4));
			demi_axes.push({a: solar_system.users[i].planets[j].a, b: solar_system.users[i].planets[j].b})
	}
}

console.log(JSON.stringify(solar_system,null, 4));	// you're no able to use the object solar_system

Planets.prototype.init = function () {
	var planets = null;
	var circle;
};

Planets.prototype.preload = function () {
	// Background
	game.load.image('galaxy', '../images/backgrounds/galaxy.jpg');

	// Planets
	game.load.image('sun', '../images/planets/sun.png');
	game.load.image('planet1', '../images/planets/planet1.png');
	game.load.image('planet2', '../images/planets/planet2.png');
	game.load.image('planet3', '../images/planets/planet3.png');
	game.load.image('planet4', '../images/planets/planet4.png');
	game.load.image('planet5', '../images/planets/planet5.png');
	game.load.image('planet6', '../images/planets/planet6.png');

	// Bars
	game.load.image('topBar', '../images/bars/top_bar.jpg');
	game.load.image('coin', '../images/planets/circle.png');
};

Planets.prototype.create = function () {
	game.add.image(0, 30, 'galaxy');

	sun = game.add.image(game.width/2-35, (game.height-30)/2-5, 'sun'); sun.width = 70; sun.height = 70;

	//*************************
	for (var i = 0; i < nb_of_player; i++) {
		var name = 'planet'.concat((i+1).toString());
		console.log(name);
		planet[i] = game.add.image(0, 0, name);
		planet[i].width = 32;
		planet[i].height = 32;
	}
	//*************************

	topBar = game.add.image(0, 0, 'topBar'); topBar.height = 30;
	coin = game.add.image(3, 2, 'coin'); coin.width = 26; coin.height = 26;
	text = game.add.text(32, 2, userForPhaser.ressources.kaga, {font: "bold 26px Arial", fill: "#ee0"});
};

Planets.prototype.update = function () {
	theta += 0.05; //	vitesse radian/frame
	//	demi grand axe de l'ellipse
	var a = 470, b = 220; //	demi grand axe de l'ellipse

	//*************************
	for (var i = 0; i < planet.length; i++) {
		planet[i].x = this.moveX(planet[i].width, a*values[i], (theta+1)*values[5-i]);
		planet[i].y = this.moveY(planet[i].height, b*values[i], (theta+1)*values[5-i]);
	}
	//*************************

};

Planets.prototype.render = function () {

};

Planets.prototype.moveX = function (width, a, theta) {
	return game.width/2 - width/2 + a*Math.cos(theta);
};

Planets.prototype.moveY = function (height, b, theta) {
	return (game.height + 30)/2 - height/2 + b*Math.sin(theta);
};
