var Attaque = function(game) {};

Attaque.prototype.init = function () {
	var texte = null;
	var unite = null;
	var image = null;

	var fantassin = null;
	var blinder = null;
	var vaisseau = null;

	var button = null;
	var retour = null;
};

Attaque.prototype.preload = function () {
	// Background
	game.load.image('background', '../images/backgrounds/attaque.png')
	// Bars
	game.load.image('topBar', '../images/bars/top_bar.jpg');
	game.load.image('coin', '../images/assets/coin.png');
	// Armee
	game.load.image('Fantassins', '../images/characters/fantassin.jpg');
	game.load.image('Blinder', '../images/characters/blinder.jpg');
	game.load.image('Vaisseau', '../images/building/fusee.png');
	// Boutons
	game.load.spritesheet('attaque', '../images/buttons/attackButton.jpg',204,160);
	game.load.spritesheet('retour', '../images/buttons/backButton.png',204,160);
};

Attaque.prototype.create = function () {
	var background = game.add.image(0, 30, 'background');
	background.width = 1079;
	background.height = 620;

	fantassin = this.groupes('Fantassins', 50, 200);
	blinder = this.groupes('Blinder', 50, 300);
	vaisseau = this.groupes('Vaisseau', 50, 400);

	button = game.add.button(700, 200, 'attaque',this.attaque , this, 2, 0, 1);
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
	texte = game.add.text(positionX , positionY, name, {font: "34px Purisa"});
	unite = game.add.text(positionX + 200 , positionY + 12, "12" ); // attente du serveur
	image = game.add.image( positionX + 300, positionY - 25, name);
	image.width = 150;
	image.height = 100;

	group.add(texte);
	group.add(unite);
	group.add(image);
	return group
};

Attaque.prototype.attaque = function (){

};

Attaque.prototype.retour = function (){
	start('planets');
};


/*
	{Text  Qté		Img}
	{Text  Qté		Img}
	{Text  Qté		Img}
*/
