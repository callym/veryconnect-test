/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 * @param { Request } req
 * @param { Response } res
 */
module.exports = async function (req, res, proceed) {
  if (req.headers['authorization'] != null) {
    return proceed();
  }

  //--•
  // Otherwise, this request did not come from a logged-in user.
  res.status(401);
  return res.send('Unauthorized');
};
