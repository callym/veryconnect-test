const sails = require('sails');
const supertest = require('supertest');

describe('CommentController', () => {
  describe('#create()', () => {
    it('should require authorization', (done) => {
      supertest(sails.hooks.http.app)
        .post('/comment')
        .send({ text: 'Not logged in', user: 2, post: 1 })
        .expect(401)
        .end(done);
    });

    it('should create a comment', (done) => {
      supertest(sails.hooks.http.app)
        .post('/comment')
        .send({ text: 'Hello from a comment!', user: 2, post: 1 })
        .set('Authorization', 'yes')
        .expect(200)
        .expect((res) => {
          const comment = res.body;
          if (comment.text !== 'Hello from a comment!') {
            throw new Error('Wrong comment returned');
          }
        })
        .end(done);
    });
  });
});
