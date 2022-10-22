/**
 *
 * @param {Request} request
 * @param {*} context
 */
module.exports = async function (request) {
  console.log(request);
  return {
    code: 500,
    msg: "netlify proxy error",
  };
};
