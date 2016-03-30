var Upgrade = function(game) {
    // Constructor
};

Upgrade.prototype = {
    // Display
    display: function() {
        alert("Ok");
    },

    //Update server
    update: function(building_id) {
        /* ARTHUR */
        var data = building_id;
        socket.emit('AskCommerce', data);
    }
};

var upgrade = new Upgrade(game);
