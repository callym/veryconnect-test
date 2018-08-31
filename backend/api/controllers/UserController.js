/**
 * UserController
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
    const users = await User.find({
      sort: 'name',
    });

    return res.json(users);
  },

  /**
   * @param { Request } req
   * @param { Response } res
   */
  get: async function(req, res) {
    const user = await User.findOne({
      id: req.params.id,
    });

    if (user == null) {
      res.status(404);
      return res.send('Not Found');
    }

    return res.json(user);
  },
};

