var Upgrade = function(game) {
    var cadre = null;
    var cross = null;
};

Upgrade.prototype = {
    // Display
    preload: function() {
        game.load.image('quit', '../images/buttons/quit.png');
    },

    create: function() {
        cross = game.add.sprite(1000, 45, 'quit');
        cross.inputEnabled=true;
        cross.events.onInputDown.add(function () {
            cadre.visible = false;
            cross.visible = false;
        }, this);
        cross.visible = false;

        cadre = game.add.graphics(45, 25);

        cadre.beginFill(0x061452, 0.7);

        cadre.moveTo(0,25);
        cadre.lineTo(1000,25);
        cadre.lineTo(1000,600);
        cadre.lineTo(0,600);
        cadre.lineTo(0,25);

        cadre.endFill();

        cadre.visible = false;
    },

    display: function() {
        cadre.visible = true;
        cross.visible = true;
    },

    //Update server
    update: function() {
        /* ARTHUR */
    }
};

var upgrade = new Upgrade(game);
