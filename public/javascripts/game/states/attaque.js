var Attaque = function(game) {};

Attaque.prototype.init = function () {
	var texte = null;
	var unite = null;
	var image0 = null;
	var image1 = null;
	var image2 = null;


	var fantassin = null;
	var blinder = null;
	var vaisseau = null;

	var button = null;
	var retour = null;

	var data = null;
};



Attaque.prototype.preload = function () {
	// Background
	game.load.image('background', '../images/backgrounds/attaque.png')
	game.load.image('barre', '../images/backgrounds/aideAttaque.png')
	// Bars
	game.load.image('topBar', '../images/bars/top_bar.jpg');
	// Boutons
	game.load.spritesheet('attaque', '../images/buttons/attackButton.jpg',204,160);
	game.load.spritesheet('retour', '../images/buttons/backButton.png',204,160);
};

Attaque.prototype.create = function () {
	var background = game.add.image(0, 0, 'background');
	background.width = 1089;
	background.height = 680;
	background.alpha = 0.95;

	var image0 = game.add.image( 50, 270, "barre");
	image0.width = 1070;
	image0.height = 50;
	image0.alpha = 0.7;

	var image1 = game.add.image( 50, 370, "barre");
	image1.width = 1070;
	image1.height = 50;
	image1.alpha = 0.7;

	var image2 = game.add.image( 50, 470, "barre");
	image2.width = 1070;
	image2.height = 50;
	image2.alpha = 0.7;

	title = game.add.text(0, 0, "Attack", {font: "bold 75px Purisa", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
	title.setTextBounds(game.world.centerX-75, 50, 150, 50);

	fantassin = this.groupes('soldier', 50, 270);
	blinder = this.groupes('tank', 50, 370);
	vaisseau = this.groupes('ship', 50, 470);

	button = game.add.button(700, 550, 'attaque',this.attaque(data) , this, 2, 0, 1);
	button.width = 150;
	button.height = 100;

	retour = game.add.button(928,550, 'retour',this.retour,this, 2,0,1);
	retour.width = 150;
	retour.height = 100;

	data = {
		attacker_id: player._id,
		attacked_id: player_the_second._id
	};

};

Attaque.prototype.update = function () {

};

Attaque.prototype.render = function () {

};

Attaque.prototype.groupes = function (name, positionX, positionY){
	console.log(player.forces);
	var group = game.add.group();
	texte = game.add.text(positionX , positionY, name, {font: "38px Purisa ",fill: "#FFFFFF"});
	if (name == 'soldier'){
		unite = game.add.text(positionX + 300 , positionY + 12, player.forces.soldier, {fill:"#FFFFFF"} ); // attente du serveur
	}
	if (name == 'ship'){
		unite = game.add.text(positionX + 300 , positionY + 12, player.forces.ship, {fill:"#FFFFFF"} ); // attente du serveur
	}
	if (name == 'tank'){
		unite = game.add.text(positionX + 300 , positionY + 12, player.forces.tank, {fill:"#FFFFFF"} ); // attente du serveur
	}


	group.add(texte);
	group.add(unite);
	return group
};

/**
 * fonction devant être appelée pour attaquer une planete
 * data est un objet de la forme: data = { attacker_id : attacker_id, attacked_id: aattacked_id }
 */
Attaque.prototype.attaque = function (data){
  if(data.attacker_id !== null && data.attacked_id !== null){
		socket.emit('attack', data);
	}
};

Attaque.prototype.retour = function (){
	start('planets');
};


/*
	{Text  Qté		Img}
	{Text  Qté		Img}
	{Text  Qté		Img}
*/
