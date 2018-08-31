const sails = require('sails');
const supertest = require('supertest');

describe('CommentController', () => {
  describe('#get_all()', () => {
    it('should return posts sorted by date', (done) => {
      supertest(sails.hooks.http.app)
        .get('/post')
        .expect(200)
        .expect((res) => {
          const posts = res.body;
          for (let i = 1; i < posts.length; i++) {
            const p0 = posts[i - 1];
            const p1 = posts[i];

            if (p0.updatedAt < p1.updatedAt) {
              throw new Error('Posts not sorted');
            }
          }
        })
        .end(done);
    });
  });
});
