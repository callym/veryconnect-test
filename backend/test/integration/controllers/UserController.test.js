const sails = require('sails');
const supertest = require('supertest');

describe('UserController', () => {
  describe('#get_all()', () => {
    it('should return users sorted by name', (done) => {
      supertest(sails.hooks.http.app)
        .get('/user')
        .expect(200)
        .expect((res) => {
          const users = res.body;
          for (let i = 1; i < users.length; i++) {
            const u0 = users[i - 1];
            const u1 = users[i];

            if (u0.name > u1.name) {
              throw new Error('Users not sorted');
            }
          }
        })
        .end(done);
    });
  });

  describe('#get()', () => {
    it('should get a user', (done) => {
      supertest(sails.hooks.http.app)
        .get('/user/1')
        .expect(200)
        .expect((res) => {
          const user = res.body;
          if (user.name !== 'John Smith') {
            throw new Error('Wrong user returned');
          }
        })
        .end(done);
    });

    it('should not get a user', (done) => {
      supertest(sails.hooks.http.app)
        .get('/user/1000')
        .expect(404)
        .end(done);
    });
  });
});
