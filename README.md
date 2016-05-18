# Erkma

## TODOLIST

* A faire:
  * URGENT
    * Attaquer
    * Commerce
  * bonus


* Fait:
  * Envoyer un objet solar au client
  * Affichage d'une topBar et des Kagas du joueur
  * Demi axe ellipse chargés depuis la bdd
  * Sens rotation  des planetes chargés depuis la bdd
  * Graphisme bâtiments, planète, accesoires ( boutons, pièce etc ...)
  * Ajouter la top barre
  * Update des ressources en temps réel
  * ajouter infos sur le joueur dans la sidebar
  * Planete dynamique

* Qui travaille sur quoi:

  * Kenneth
	* Réflechir ce qu'il doit faire :p

  * Gaëtane


  * Adrien
	  * Switch entre planètes/cités avec envoi de données
	  * Ajouter des patches définitifs (musiques et bruitages)
    * gestionnaire de message

  * Arthur
  	* message coté serveur
  	* tester commerce coté serveur
    * attaquer coté serveur
    * Acheter vaisseau


## Structure de donnée utilisée:

* Exemple de solar_system envoyé au client:
```json
{
    "_id": "56daffaaf771fc972c761a90",
    "__v": 1,
    "name": "USz 5662",
    "users": [
        {
            "_id": "56daff9df771fc972c761a8e",
            "username": "poop",
            "password": "",
            "solar_system": "56daffaaf771fc972c761a90",
            "__v": 1,
            "ressources": {
                "kaga": 100,
                "iron": 100,
                "watt": 100,
                "food": 100,
                "water": 100,
                "tool": 100,
                "lumber": 100
            },
            "planets": [
                {
                    "_id": "56daffaaf771fc972c761a91",
                    "name": "Almania",
                    "pop": 1000,
                    "a": 200,
                    "b": 100,
                    "direction": false,
                    "img": 1,
                    "owner": "56daff9df771fc972c761a8e",
                    "__v": 0,
                    "spaceships": [
                        {
                            "spaceship_dammage": 0,
                            "human_dammage": 0,
                            "defence": 100,
                            "cost": 1000,
                            "name": "space cruiser 1",
                            "_id": "56daffaaf771fc972c761a92"
                        }
                    ],
                    "buildings": [
                        {
                            "type": "ambassade",
                            "_id": "56daffaaf771fc972c761a93"
                        }
                    ]
                }
            ]
        },
        {
            "_id": "56daffa7f771fc972c761a8f",
            "username": "pee",
            "password": "",
            "solar_system": "56daffaaf771fc972c761a90",
            "__v": 1,
            "ressources": {
                "kaga": 100,
                "iron": 100,
                "watt": 100,
                "food": 100,
                "water": 100,
                "tool": 100,
                "lumber": 100
            },
            "planets": [
                {
                    "_id": "56daffaaf771fc972c761a94",
                    "name": "Klatooine",
                    "pop": 1000,
                    "a": 250,
                    "b": 125,
                    "direction": true,
                    "img": 2,
                    "owner": "56daffa7f771fc972c761a8f",
                    "__v": 0,
                    "spaceships": [
                        {
                            "spaceship_dammage": 0,
                            "human_dammage": 0,
                            "defence": 100,
                            "cost": 1000,
                            "name": "space cruiser 1",
                            "_id": "56daffaaf771fc972c761a95"
                        }
                    ],
                    "buildings": [
                        {
                            "type": "ambassade",
                            "_id": "56daffaaf771fc972c761a96"
                        }
                    ]
                }
            ]
        }
    ]
}
```

## Installation

Je peux vous installer le projet, ou alors vous pouvez essayer par vous meme en suivant ce petit guide.

 * Installation de Node.js, pour creer notre serveur

```bash
sudo yum install nodejs
```

pour plus d'info, suivre ce [lien](https://docs.npmjs.com/getting-started/installing-node)  

* Installation de mongodb, notre base de donnee

suivre ce [lien](http://www.liquidweb.com/kb/how-to-install-mongodb-on-fedora-20/)

* Ajouter le depo

On clone de depo:
```bash
git clone https://github.com/Adrylen/Phaser.git
```

* On installe les middlewares du package.json
```bash
npm install
```

* On active le serveur mongodb
```bash
sudo systemctl start mongod
```

* On cree une bdd appelee 'erkma'
```bash
mongo
use erkma
```

* On cree un repertoir "data" dans la racine du projet, pour que mongodb sauvegarde ses fichiers
```bash
mkdir data
```

* Enfin, on lance le serveur nodejs
```bash
npm start
```

* On se rend a l'adresse:  http://localhost:3000/
