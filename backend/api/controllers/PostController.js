/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * @param { Request } req
   * @param { Response } res
   */
  get_all: async function(req, res) {
    let posts = await Post.find({
      sort: 'updatedAt DESC',
    }).populate('user');

    posts = await Promise.all(posts.map(async post => {
      const comments = await Comment.find({
        where: { post: post.id },
        sort: 'updatedAt',
      }).populate('user');
      post.comments = comments;
      return post;
    }));

    return res.json(posts);
  },
};

