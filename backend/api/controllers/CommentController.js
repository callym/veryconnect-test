/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * @param { Request } req
   * @param { Response } res
   */
  create: async function(req, res) {
    const comment = await Comment.create(req.body).fetch();

    return res.json(comment);
  },
};

