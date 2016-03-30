var Upgrade = function(game) {
    // Constructor
};

Upgrade.prototype = {
    // Display
    display: function() {
        alert("Ok");
    },

    //Update server
    update: function(user_id, building_id) {
        /* ARTHUR */
        var data = {user_id: user_id, building_id: building_id};
        socket.emit('AskCommerce', data);
    }
};

var upgrade = new Upgrade(game);
