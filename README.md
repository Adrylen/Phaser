# Erkma

## Structure de donnée utilisée:

* Sous forme d'exemple:
```json
{{
    "_id": "56daf8b044fb46dc2865cb36",
    "__v": 1,
    "name": "oJt 5178",
    "users": [
        {
            "_id": "56daf8a244fb46dc2865cb34",
            "username": "poop",
            "password": "",
            "solar_system": "56daf8b044fb46dc2865cb36",
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
                "56daf8b044fb46dc2865cb37"
            ]
        },
        {
            "_id": "56daf8ad44fb46dc2865cb35",
            "username": "pee",
            "password": "",
            "solar_system": "56daf8b044fb46dc2865cb36",
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
                "56daf8b044fb46dc2865cb3a"
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
