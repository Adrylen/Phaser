window.onload = function()
			{
				var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

				var cursors;
				var platforms;
				var player;

				function preload ()
					{
						/* Images */
						game.load.image('ground', 'images/platform.png');
						game.load.image('sky', 'images/sky.png');
						game.load.image('star', 'images/star.png');
						game.load.spritesheet('dude', 'images/dude.png', 32, 48);
					}

				function create ()
				{
					/* Physics */
					game.physics.startSystem(Phaser.Physics.ARCADE);
					game.add.sprite(0, 0, 'sky');

					/* Platforms */
					platforms = game.add.group();
					platforms.enableBody = true;

					/* Ground */
					var ground = platforms.create(0, game.world.height - 64, 'ground');
					ground.scale.setTo(2, 2);
					ground.body.immovable = true;

					/* Ledge */
					var ledge = platforms.create(400, 400, 'ground');
					ledge.body.immovable = true;
					ledge = platforms.create(-150, 250, 'ground');
                    ledge.body.immovable = true;
                    ledge = platforms.create( 400, 100, 'ground');
                    ledge.scale.setTo(0.5, 1);
                    ledge.body.immovable = true;

										/* Player */
										player = game.add.sprite(32, game.world.height - 150, 'dude');
										game.physics.arcade.enable(player);
										player.body.bounce.y = 0.2;
										player.body.gravity.y = 300;
										player.body.collideWorldBounds = true;
										player.animations.add('left', [0, 1, 2, 3], 10, true);
										player.animations.add('right', [5, 6, 7, 8], 10, true);

										/* Cursor */
										cursors = game.input.keyboard.createCursorKeys();
				}

				function update ()
				{
					/* Collide platforms */
					game.physics.arcade.collide(player, platforms);

					/* Player velocity init */
					player.body.velocity.x = 0;

					/* Movements */
					if (cursors.left.isDown)
					{
						player.body.velocity.x = -150;
						player.animations.play('left');
					}
					else if (cursors.right.isDown)
					{
						player.body.velocity.x = 150;
						player.animations.play('right');
					}
					else
					{
						player.animations.stop();
						player.frame = 0;
					}

					/* Jump */
					if (cursors.up.isDown && player.body.touching.down)
					{
						player.body.velocity.y = -350;
					}
				}
			};
