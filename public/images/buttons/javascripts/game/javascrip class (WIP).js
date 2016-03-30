// http://www.phpied.com/3-ways-to-define-a-javascript-class/

/*
function Apple (type) {
    this.type = type;
    this.color = "red";
}

Apple.prototype.getInfo = function() {
    return this.color + ' ' + this.type + ' apple';
};

var apple = {
    type: "macintosh",
    color: "red",
    getInfo: function () {
        return this.color + ' ' + this.type + ' apple';
    }
}
*/




function Cout (ressource_1_id,ressource_2_id) {
	this.ressource1 = ressource_1_id;
	this.cout1 = 100;
	this.ressource2 = ressource_2_id;
	this.cout2 = 100;
	this.cout_kaga = 20;
}

function Ressource(nom, ressource_1_id, ressource_2_id) {
	this.lv = 1;
	this.prod = 10;
	this.stock = 0;
	this.stock_max = 500;
	this.cout = Cout(ressource_1_id,ressource_2_id);
	string.nom = nom;
}

function Vaisseau(nom, at, def, at_pop) {
	this.degats_vaisseau = at;
	this.defence = def;
	this.degats_pop = at_pop;
	this.nom = nom;
	this.nb = 0;
	this.nb_dispo = 0;
	this.lv = 1;
	this.cout_construct = Cout(0,1);
	this.cout_amelio = Cout(0,1);
}



function Planete(nom, ressource_voulue_id, pop, joueur_id) {
	this.joueur_id = joueur_id;
	this.nom = nom;
	this.pop = pop;
	this.ressource_voulue_id = ressource_voulue_id;
	this.ressources =
	[Ressource("acier", 3, 4),
	Ressource("energie", 2, 5),
	Ressource("nourriture", 5, 3),
	Ressource("outils", 0, 4),
  	Ressource("bois", 2, 3),
	Ressource("eau", 1, 2)];
	this.vaisseaux =
	[Vaisseau("chasseur",10,10,2),
	Vaisseau("bombardier", 2, 15, 10),
	Vaisseau("fregate", 20, 30, 20)];
	this.ameliorer_ressource = function(ressource_id) {

	};
	this.ameliorer_vaisseau = function(vaisseau_id) {

	};
	this.construire_vaisseau = function(vaisseau_id) {

	};
}

function Joueur(nom, nb_joueurs) {
	this.nom = nom;
	this.kaga = 100;
	this.relations = new Array(nb_joueurs);
	for (var i = 0; i < this.relations.length; i++) {
		this.relations[i] = 0;
	}
}


function Map(joueurs) { //joueurs est un tableau contenant les noms des joueurs
	this.joueurs = new Array(joueurs.length);
	for (var k = 0; k < this.joueurs.length; k++) {
		this.joueurs[k] = Joueur(joueurs[k], joueurs.length);
	}
	this.planetes = new Array(joueurs.length + 2);
	for (var i = 0; i < this.planetes.length - 2; i++) {
		this.planetes[i] = Planete(i, Math.floor((Math.random() * 6)), 100, i);
	}
	var j = this.planetes.length - 2;
	this.planetes[j] = Planete(j, Math.floor((Math.random() * 6)), 0, -1);
	j++;
	this.planetes[j] = Planete(j, Math.floor((Math.random() * 6)), 0, -1);

	//pop de la planete = 0 ou relation du joueur avec le proprio de la planete >1000
	this.conquerir = function (joueur_id, planete_id) {

	};

	//resource 1 et 2 sont des int compris entre 0 et 5
	//quantite doit etre inferieur ou egale au stock de ressource 1 de planete 1 et de ressource 2 de planete 2
	this.commerce = function (planete_1_id, ressource_1_id, quantite, planete_2_id, ressource_2_id) {

	};

	//vaisseaux est un Array contenant le nombre de vaisseaux pour chaque type de vaisseaux envoye par planete 1
	this.attaquer = function (planete_1_id, joueur, planete_2_id, vaisseaux) {

	};
}
