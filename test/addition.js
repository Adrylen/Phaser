'use strict';

/*
describe('addition', function () {
  it('should add 1+1 correctly', function (done) {
    var onePlusOne = 1 + 1;
    onePlusOne.should.equal(2);
    done();
  });
});
*/

var request = require('superagent');
var user1 = request.agent();

var users = [
  {username: "Arthur", password: "Arthur"},
  {username: "Gaetane", password: "Gaetane"},
  {username: "Adrien", password: "Adrien"},
  {username: "Kenneth", password: "Kenneth"},
  {username: "Toto", password: "Toto"},
  {username: "Popei", password: "Popei"}
];


for(var k in users){
  user1
    .post('http://localhost:3000/users/add')
    .send(users[k])
    .end(function(err, res) {
      if(err) throw err;
    });
}
