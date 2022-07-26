# cors-server

这个项目主要解决国内的 `https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token` 接口被墙导致 `gitalk` 无法获取 `token` 问题

借助 `vercel` 部署服务来进行接口转发

我个人部署了服务，地址为：`cors-server-ecru.vercel.app`

如果不想折腾，只需把配置下的 `proxy` 改为 `https://cors-server-ecru.vercel.app/github_access_token` 即可，如下

![](https://fastly.jsdelivr.net/gh/Dedicatus546/image@main/202207261450438.avif)

如果不放心，可以 `fork` 该项目然后自己注册 `vercel` 进行部署

相关帖子：[解决 Gitalk 无法获取 Github Token 问题](https://prohibitorum.top/2022/07/26/%E8%A7%A3%E5%86%B3-Gitalk-%E6%97%A0%E6%B3%95%E8%8E%B7%E5%8F%96-Github-Token-%E9%97%AE%E9%A2%98/)

使用技术 `koa + koa router + koa cors + koa bodyparser + axios`
