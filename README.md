# Erkma

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

* Enfin, on lance le serveur nodejs
```bash
npm start
```

* On se rend a l'adresse:  http://localhost:3000/
