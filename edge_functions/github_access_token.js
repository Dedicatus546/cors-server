/**
 *
 * @param {Request} request
 * @param {*} context
 */
export default async function (request) {
  if (request.method === "OPTIONS") {
    const resp = new Response();
    resp.headers.set("Access-Control-Allow-Origin", "*");
    resp.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    return;
  }
  if (request.method === "POST") {
    try {
      const reqBody = request.body;
      const res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        body: reqBody,
      });
      const params = new URLSearchParams(await res.text());
      const resp = new Response(
        JSON.stringify(
          Array.from(params.entries()).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {})
        )
      );
      resp.headers.set("");
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return new Response("a cors proxy by netlify!");
}
