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
	var background = game.add.image(0, 30, 'background');
	background.width = 1079;
	background.height = 620;
	background.alpha = 0.95;

	var image0 = game.add.image( 50, 270, "barre");
	image0.width = 1079;
	image0.height = 50;
	image0.alpha = 0.7;

	var image1 = game.add.image( 50, 370, "barre");
	image1.width = 1079;
	image1.height = 50;
	image1.alpha = 0.7;

	var image2 = game.add.image( 50, 470, "barre");
	image2.width = 1079;
	image2.height = 50;
	image2.alpha = 0.7;

	title = game.add.text(0, 0, "Attack", {font: "bold 45px Century Schoolbook L", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
	title.setTextBounds(game.world.centerX-75, 33, 150, 50);

	fantassin = this.groupes('Fantassins', 50, 270);
	blinder = this.groupes('Blinder', 50, 370);
	vaisseau = this.groupes('Vaisseau', 50, 470);

	button = game.add.button(700, 550, 'attaque',this.attaque , this, 2, 0, 1);
	button.width = 150;
	button.height = 100;

	retour = game.add.button(928,550, 'retour',this.retour,this, 2,0,1);
	retour.width = 150;
	retour.height = 100;
};

Attaque.prototype.update = function () {

};

Attaque.prototype.render = function () {

};

Attaque.prototype.groupes = function (name, positionX, positionY){
	var group = game.add.group();
	texte = game.add.text(positionX , positionY, name, {font: "38px Purisa ",fill: "#FFFFFF"});
	unite = game.add.text(positionX + 300 , positionY + 12, "12", {fill:"#FFFFFF"} ); // attente du serveur


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
