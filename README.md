# Erkma

## Todo List

* Kenneth
  Se dépecher de commencer à coder

* Gaëtane
Faire les textures 

* Adrien
Musique / Phaser   

* Arthur
-Refactoriser la bdd et les models [doc](http://stackoverflow.com/questions/15413630/what-is-the-proper-pattern-for-nested-schemas-in-mongoose-mongodb)
[doc](http://mongoosejs.com/docs/populate.html)
-Mettre le site sur IBM Bluemix

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
