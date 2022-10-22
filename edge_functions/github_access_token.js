/**
 *
 * @param {Request} request
 * @param {*} context
 */
export default async function (request) {
  if (request.method === "OPTIONS") {
    // 预检请求
    const resp = new Response(null, {
      status: 204,
    });
    resp.headers.set("Access-Control-Allow-Origin", "*");
    resp.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    resp.headers.set("Access-Control-Allow-Headers", "Content-Type");
    resp.headers.set("Access-Control-Max-Age", `${86400 * 30}`);
    return resp;
  }
  if (request.method === "POST") {
    try {
      const reqBody = await request.text();
      console.log("request body: ", reqBody);
      const res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        body: reqBody,
        headers: {
          "Content-type": "application/json",
        },
      });
      const text = await res.text();
      console.log("github api res: ", text);
      const params = new URLSearchParams(text);
      const resp = new Response(
        JSON.stringify(
          Array.from(params.entries()).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {})
        ),
        {
          status: 200,
        }
      );
      resp.headers.set("Access-Control-Allow-Origin", "*");
      resp.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      resp.headers.set("Access-Control-Allow-Headers", "Content-Type");
      resp.headers.set("Access-Control-Max-Age", `${86400 * 30}`);
      return resp;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return new Response("a cors proxy by netlify!");
}
