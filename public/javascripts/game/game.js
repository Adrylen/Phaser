var game = new Phaser.Game(1350, 650, Phaser.AUTO, 'Game');
game.state.add('menu', menu);
game.state.add('start', start);
game.state.add('options', options);
game.state.add('help', help);
game.state.start('menu');
