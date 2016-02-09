var game = new Phaser.Game(1300, 570, Phaser.AUTO, 'Game', null, true, false);
game.state.add('menu', menu);
game.state.add('start', start);
game.state.add('options', options);
game.state.add('help', help);
game.state.start('menu');
