var Planets = function(game) {};

var theta = [];
var a = 520, b = 290; //	demi grand axe de l'ellipse

//*************************
var planet = [];
var demi_axes = [1.00, 0.84];
var demi_axes = [];
var sens = [];
var planet_list = [];
var player_by_planet = [];
var planet_text;
//*************************

// var global

/*
attaquer :
planete attaquante
planete attaquée
confirmer	reset
*/


//console.log(JSON.stringify(solar_system,null, 4));	// you're no able to use the object solar_system

Planets.prototype.init = function () {
	var planets = null;
	var circle;

	var nb_of_planet = null;
	var planet_selected = null;
	// ressources
};

Planets.prototype.preload = function () {
	planet = [];
	demi_axes = [];
	sens = [];

	nb_of_planet = 0;
	planet_selected = -1;

	planet_list = [];
	planet_text = 0;
	player_by_planet = [];

	planet_the_first = null;
	player_the_second = null;


	// Background
	game.load.image('galaxy', '../images/backgrounds/galaxy.jpg');

	// Planets
	game.load.image('sun', '../images/planets/sun.png');
	for(var i in solar_system.users){
		for(var j in solar_system.users[i].planets){
			demi_axes.push(solar_system.users[i].planets[j].coeff);
			var name = 'planet' + solar_system.users[i].planets[j].img;
			game.load.image(name, '../images/planets/' + name + '.png');
			if(solar_system.users[i].planets[j].direction === true)
				sens.push(1);
			else
				sens.push(-1);
			planet_list.push(solar_system.users[i].planets[j]);
			player_by_planet.push(solar_system.users[i]);
			nb_of_planet++;
		}
	}

	// Bars
	game.load.image('topBar', '../images/bars/top_bar.jpg');
	game.load.image('coin', '../images/assets/coin.png');

	// Selection
	game.load.image('selection', '../images/assets/planetSelected.png');
};

Planets.prototype.create = function () {
	var galaxy = game.add.image(0, 30, 'galaxy');
	galaxy.width = 1087;
	galaxy.height = 620;

	sun = game.add.image(game.width/2-70, (game.height-30)/2-19, 'sun'); sun.width = 110; sun.height = 110;

	//*************************
	for (var i = 0; i < nb_of_planet; i++) {
		var name = 'planet'.concat((i+1).toString());

	//	if(player.planets == ) {
	//		planet[i] = game.add.sprite(0, 0, name).arc(0,0, 42,0 ,Math.PI *2).addColorStop(0, '#1791a7').addColorStop(1, 'white');
	//	}
	//	else {
			planet[i] = game.add.sprite(0, 0, name);
	//	}

		planet[i].width = 38;
		planet[i].height = 38;
		theta.push(Math.random() * 2.0 * Math.PI);
		for (var j = 0; j < nb_of_planet; j++) {
			if (planet_list[j].img == i+1) {
				var temp = planet_list[j];
				planet_list[j] = planet_list[i];
				planet_list[i] = temp;
			}
		}

	}
	//*************************

	topBar = game.add.image(0, 0, 'topBar'); topBar.height = 30;
	coin = game.add.image(3, 2, 'coin'); coin.width = 26; coin.height = 26;
	text = game.add.text(32, 0, player.ressources.kaga, {font: "bold 26px Century Schoolbook L", fill: "#f19010"});
	text.height = 33;

	for (i = 0; i < nb_of_planet; i++) {
		planet[i].inputEnabled = true;
		planet[i].events.onInputDown.add(this.listener, {'i': i} );
	}

	//game.input.onTap.add(this.listener);

	selection = game.add.image(0, 0, 'selection');
	selection.width = 38;
	selection.height = 38;
	selection.visible = false;
	//console.log(selection.width);
	planet_text = game.add.text(0, 0, '', { fill: '#ffffff' });
};

Planets.prototype.listener = function () {
	planet_selected = this.i;
	planet_text.text = planet_list[this.i].name;
	planet_the_first = planet_list[this.i];
	player_the_second = player_by_planet[this.i];

	if(player_the_second===null || player._id == player_the_second._id)
		document.getElementById('commerce').style.visibility = "hidden";
	else
		document.getElementById('commerce').style.visibility = "visible";


	if(planet_the_first===null){
		document.getElementById('attaque').style.visibility = "hidden";
		document.getElementById('city').style.visibility = "hidden";
	}else{
		var is_mine = false;
		for (var j in player.planets){
			if (player.planets[j]._id == planet_the_first._id)
				is_mine =true;
		}

		if(is_mine){
			document.getElementById('attaque').style.visibility = "hidden";
			document.getElementById('city').style.visibility = "visible";
		}else{
			document.getElementById('attaque').style.visibility = "visible";
			document.getElementById('city').style.visibility = "hidden";
		}
	}
};

Planets.prototype.update = function () {
	//*************************
	for (var i = 0; i < planet.length; i++) {
		//console.log(sens[i]);
		theta[i] += 0.01; //	vitesse radian/frame
		planet[i].x = this.moveX(planet[i].width, a*demi_axes[i], sens[i] * (theta[i]+1)*demi_axes[5-i]);
		planet[i].y = this.moveY(planet[i].height, b*demi_axes[i], sens[i] * (theta[i]+1)*demi_axes[5-i]);
	}
	//*************************

	if (planet_selected != -1) {
		selection.visible = true;
		planet_text.visible = true;
		selection.x = planet[planet_selected].x;
		selection.y = planet[planet_selected].y;
		planet_text.x = planet[planet_selected].x;
		planet_text.y = planet[planet_selected].y -38;
	}
	else {
		selection.visible = false;
		planet_text.visible = false;
	}

	//console.log(player.ressources.kaga);
	text.text = player.ressources.kaga;
};

Planets.prototype.render = function () {

};

Planets.prototype.moveX = function (width, a, theta) {
	return game.width/2 - width/2 + a*Math.cos(theta);
};

Planets.prototype.moveY = function (height, b, theta) {
	return (game.height + 30)/2 - height/2 + b*Math.sin(theta);
};
