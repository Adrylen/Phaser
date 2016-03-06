var Planets = function(game) {};


var theta = 1;

//*************************
var planet = [];
//var demi_axes = [1.00, 0.84];
//var nb_of_planet = 2;
var demi_axes = [];
var nb_of_planet = 0;
//*************************

console.log(JSON.stringify(solar_system,null, 4));	// you're no able to use the object solar_system

Planets.prototype.init = function () {
	var planets = null;
	var circle;
};

Planets.prototype.preload = function () {
	// Background
	game.load.image('galaxy', '../images/backgrounds/galaxy.jpg');

	var path = '../images/planets/';

	// Planets
	game.load.image('sun', '../images/planets/sun.png');
	var name;
	for(var i in solar_system.users){
		for(var j in solar_system.users[i].planets){
				//console.log(JSON.stringify(solar_system.users[i].planets[j], null, 4));
				demi_axes.push(solar_system.users[i].planets[j].coeff);
				name = 'planet' + solar_system.users[i].planets[j].img;
				console.log(demi_axes);
				game.load.image(name, path + name + '.png');
				nb_of_planet++;
		}
	}
	console.log(nb_of_planet);

	// Bars
	game.load.image('topBar', '../images/bars/top_bar.jpg');
	game.load.image('coin', '../images/planets/circle.png');
};

Planets.prototype.create = function () {
	game.add.image(0, 30, 'galaxy');

	sun = game.add.image(game.width/2-35, (game.height-30)/2-5, 'sun'); sun.width = 70; sun.height = 70;

	//*************************
	for (var i = 0; i < nb_of_planet; i++) {
		var name = 'planet'.concat((i+1).toString());
		planet[i] = game.add.image(0, 0, name);
		planet[i].width = 32;
		planet[i].height = 32;
	}
	//console.log(game);
	//*************************

	topBar = game.add.image(0, 0, 'topBar'); topBar.height = 30;
	coin = game.add.image(3, 2, 'coin'); coin.width = 26; coin.height = 26;
	//text = game.add.text(32, 2, userForPhaser.ressources.kaga, {font: "bold 26px Arial", fill: "#ee0"});
};

Planets.prototype.update = function () {
	theta += 0.05; //	vitesse radian/frame
	var a = 470, b = 220; //	demi grand axe de l'ellipse

	//*************************
	for (var i = 0; i < planet.length; i++) {
		planet[i].x = this.moveX(planet[i].width, a*demi_axes[i], (theta+1)*demi_axes[5-i]);
		planet[i].y = this.moveY(planet[i].height, b*demi_axes[i], (theta+1)*demi_axes[5-i]);
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
