var Planets = function(game) {};

/*
Une planète suit une orbite fermée autour du Soleil
(une éclipse mais très peu aplatie : en gros, un cercle centré sur le Soleil)
 parce qu'elle est en équilibre entre deux forces antagonistes : l'attraction
gravitationnelle solaire qui tend à la faire tomber vers le Soleil,
 et la force centrifuge qui tend à l'en écarter
(la force centrifuge est celle que l'on ressent, par exemple,
sur un manège ou dans une voiture qui vire ; elle tend vous éloigner de l'axe de rotation).

L'intensité de la force gravitationnelle est proportionnelle à l'inverse
 du carré de la distance D entre la planète et le Soleil.
L'intensité de la force centrifuge est proportionnelle au rapport entre
 le carré de la vitesse de la planète et la distance D.
A chaque instant, ces forces sont opposées en direction et égale en intensité
(leur somme est bien nulle). Du coup, la vitesse de la planète est proportionnelle
 à l'inverse de la racine carrée de D : plus la planète est loin du Soleil,
 moins elle va vite ; 4 fois plus loin, 2 fois moins vite.
Cette relation se traduit aussi par la fameuse troisième
 loi de Kepler qui stipule que le rapport entre le cube de la distance
 et le carré de la période est une constante, indépendante de la planète
*/

var theta = 1;

//*************************
var planet = [];
var values = [1.00, 0.84, 0.70, 0.55, 0.39, 0.23];
var nb_of_player = 6;
//*************************

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

	/*
	planet1 = game.add.image(0, 0, 'planet1'); planet1.width = 32; planet1.height = 32;
	planet2 = game.add.image(0, 0, 'planet2'); planet2.width = 32; planet2.height = 32;
	planet3 = game.add.image(0, 0, 'planet3'); planet3.width = 32; planet3.height = 32;
	planet4 = game.add.image(0, 0, 'planet4'); planet4.width = 32; planet4.height = 32;
	planet5 = game.add.image(0, 0, 'planet5'); planet5.width = 32; planet5.height = 32;
	planet6 = game.add.image(0, 0, 'planet6'); planet6.width = 32; planet6.height = 32;
	*/

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
	//	vitesse
	theta += 0.05;
	//	demi grand axe de l'ellipse
	var a = 470, b = 220;
	//	vient de l'équation d'une ellipse
	/*
	planet1.x = this.moveX(planet1.width, a*1.00, (theta+1)*0.23); planet1.y = this.moveY(planet1.height, b*1.00, (theta+1)*0.23);
	planet2.x = this.moveX(planet2.width, a*0.84, (theta-1.3)*0.39); planet2.y = this.moveY(planet2.height, b*0.84, (theta-1.3)*0.39);
	planet3.x = this.moveX(planet3.width, a*0.70, (theta+1.6)*0.55); planet3.y = this.moveY(planet3.height, b*0.70, (theta+1.6)*0.55);
	planet4.x = this.moveX(planet4.width, a*0.55, (theta-1.9)*0.70); planet4.y = this.moveY(planet4.height, b*0.55, (theta-1.9)*0.70);
	planet5.x = this.moveX(planet5.width, a*0.39, (theta+2.2)*0.84); planet5.y = this.moveY(planet5.height, b*0.39, (theta+2.2)*0.84);
	planet6.x = this.moveX(planet6.width, a*0.23, (theta-2.5)*1.00); planet6.y = this.moveY(planet6.height, b*0.23, (theta-2.5)*1.00);
	*/

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
