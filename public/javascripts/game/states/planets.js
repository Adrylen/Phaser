var Planets = function(game) {};

var x = 0;
var speedX = 0;
var speedY = 9.6;

Planets.prototype.init = function () {
	var planets = null;
	var circle;
};

Planets.prototype.preload = function () {
	game.load.image('circle', '../images/circle.png')
};

Planets.prototype.create = function () {
	circle = game.add.image(50, 160, 'circle');
};

Planets.prototype.update = function () {
	var mul = 1;
	if(circle.x < 400)
	{
		speedX += 1 / mul;
		if(circle.y < 160)
		{
			speedY += 0.4 / mul;
			console.log('y+');
		}
		else
		{
			speedY -= 0.4 / mul;
			console.log('y-');
		}
		console.log('x+');
	}
	else
	{
		speedX -= 1 / mul;
		if(circle.y < 160)
		{
			speedY += 0.4 / mul;
			console.log('y+');
		}
		else
		{
			speedY -= 0.4 / mul;
			console.log('y-');
		}
		console.log('x-');
	}

	circle.x += speedX;
	circle.y += speedY;
};

Planets.prototype.render = function () {

};

Planets.prototype.move = function () {

};
