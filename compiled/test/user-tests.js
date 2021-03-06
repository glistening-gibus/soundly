'use strict';

// user-tests.js
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var assert = chai.assert;
chai.use(chaiAsPromised);
var should = chai.should();
var expect = chai.expect;
var users = require('../server/routes/users.js');
var userSchema = require('../server/models/User.js');

describe('can register and signin users', function () {

  beforeEach(function (done) {
    //runs before all tests in this block
    users.doSignup('register', 'registerpw').should.be.fulfilled.then(function (user) {
      done();
    });
  });

  afterEach(function (done) {
    userSchema.remove({ username: 'register' }).then(function () {
      userSchema.remove({ username: 'testusername' }).then(function () {
        done();
      });
    });
  });

  it('it should successfully generate a room id', function (done) {
    users.generateRoomId('testusername').should.be.fulfilled.then(function (roomid) {
      expect(roomid).to.be.a('string');
    }).should.notify(done);
  });

  it('it should generate a token', function (done) {
    expect(users.generateToken('string')).to.be.a('string');
    done();
  });

  it('it should register a new user', function (done) {
    users.doSignup('testusername', 'testpassword').should.be.fulfilled.then(function (user) {
      expect(user).to.have.property('username');
    }).should.notify(done);
  });

  it('it should signin', function (done) {
    users.doSignin('register', 'registerpw').should.be.fulfilled.then(function (signin) {
      expect(signin).to.have.property('username');
    }).should.notify(done);
  });

  it('it should fail with a non-existent user', function (done) {
    users.doSignin('baduser', 'registerpw').should.be.rejected.and.notify(done);
  });
  it('it should fail with a bad password', function (done) {
    users.doSignin('register', 'badpassword').should.be.rejected.and.notify(done);
  });
});
//# sourceMappingURL=data:application/json;base64,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QUN0RCxVQUFNLFFBQU4sQ0FBZSxVQUFmLEVBQTJCLGFBQTNCLEVBQTBDLE1BQTFDLENBQWlELEVBQWpELENBQW9ELFFBQXBELENBQTZELEdBQTdELENBQWlFLE1BQWpFLENBQXdFLElBQXhFO0FBQ0QsR0FGRDtBQUtELENBaEREIiwiZmlsZSI6InVzZXItdGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1c2VyLXRlc3RzLmpzXG52YXIgY2hhaSA9IHJlcXVpcmUoJ2NoYWknKTtcbnZhciBjaGFpQXNQcm9taXNlZCA9IHJlcXVpcmUoXCJjaGFpLWFzLXByb21pc2VkXCIpO1xudmFyIGFzc2VydCA9IGNoYWkuYXNzZXJ0O1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xudmFyIHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG52YXIgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XG52YXIgdXNlcnMgPSByZXF1aXJlKCcuLi9zZXJ2ZXIvcm91dGVzL3VzZXJzLmpzJyk7XG52YXIgdXNlclNjaGVtYSA9IHJlcXVpcmUoJy4uL3NlcnZlci9tb2RlbHMvVXNlci5qcycpO1xuXG5kZXNjcmliZSgnY2FuIHJlZ2lzdGVyIGFuZCBzaWduaW4gdXNlcnMnLCBmdW5jdGlvbigpIHtcblxuICBiZWZvcmVFYWNoKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAvL3J1bnMgYmVmb3JlIGFsbCB0ZXN0cyBpbiB0aGlzIGJsb2NrXG4gICAgdXNlcnMuZG9TaWdudXAoJ3JlZ2lzdGVyJywgJ3JlZ2lzdGVycHcnKS5zaG91bGQuYmUuZnVsZmlsbGVkLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBhZnRlckVhY2goZnVuY3Rpb24oZG9uZSkge1xuICAgIHVzZXJTY2hlbWEucmVtb3ZlKHt1c2VybmFtZToncmVnaXN0ZXInfSkudGhlbihmdW5jdGlvbigpe1xuICAgICAgdXNlclNjaGVtYS5yZW1vdmUoe3VzZXJuYW1lOid0ZXN0dXNlcm5hbWUnfSkudGhlbihmdW5jdGlvbigpe1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ2l0IHNob3VsZCBzdWNjZXNzZnVsbHkgZ2VuZXJhdGUgYSByb29tIGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIHVzZXJzLmdlbmVyYXRlUm9vbUlkKCd0ZXN0dXNlcm5hbWUnKS5zaG91bGQuYmUuZnVsZmlsbGVkLnRoZW4oZnVuY3Rpb24ocm9vbWlkKSB7XG4gICAgICBleHBlY3Qocm9vbWlkKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICB9KS5zaG91bGQubm90aWZ5KGRvbmUpO1xuICB9KTtcblxuICBpdCgnaXQgc2hvdWxkIGdlbmVyYXRlIGEgdG9rZW4nLCBmdW5jdGlvbihkb25lKSB7XG4gICAgZXhwZWN0KHVzZXJzLmdlbmVyYXRlVG9rZW4oJ3N0cmluZycpKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICBkb25lKCk7XG4gIH0pO1xuXG4gIGl0KCdpdCBzaG91bGQgcmVnaXN0ZXIgYSBuZXcgdXNlcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICB1c2Vycy5kb1NpZ251cCgndGVzdHVzZXJuYW1lJywgJ3Rlc3RwYXNzd29yZCcpLnNob3VsZC5iZS5mdWxmaWxsZWQudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICBleHBlY3QodXNlcikudG8uaGF2ZS5wcm9wZXJ0eSgndXNlcm5hbWUnKTtcbiAgICB9KS5zaG91bGQubm90aWZ5KGRvbmUpO1xuICB9KTtcblxuICBpdCgnaXQgc2hvdWxkIHNpZ25pbicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICB1c2Vycy5kb1NpZ25pbigncmVnaXN0ZXInLCAncmVnaXN0ZXJwdycpLnNob3VsZC5iZS5mdWxmaWxsZWQudGhlbihmdW5jdGlvbihzaWduaW4pIHtcbiAgICAgIGV4cGVjdChzaWduaW4pLnRvLmhhdmUucHJvcGVydHkoJ3VzZXJuYW1lJyk7XG4gICAgfSkuc2hvdWxkLm5vdGlmeShkb25lKTtcbiAgfSk7XG5cbiAgaXQoJ2l0IHNob3VsZCBmYWlsIHdpdGggYSBub24tZXhpc3RlbnQgdXNlcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICB1c2Vycy5kb1NpZ25pbignYmFkdXNlcicsICdyZWdpc3RlcnB3Jykuc2hvdWxkLmJlLnJlamVjdGVkLmFuZC5ub3RpZnkoZG9uZSk7XG4gIH0pO1xuICBpdCgnaXQgc2hvdWxkIGZhaWwgd2l0aCBhIGJhZCBwYXNzd29yZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICB1c2Vycy5kb1NpZ25pbigncmVnaXN0ZXInLCAnYmFkcGFzc3dvcmQnKS5zaG91bGQuYmUucmVqZWN0ZWQuYW5kLm5vdGlmeShkb25lKTtcbiAgfSk7XG5cblxufSk7Il19