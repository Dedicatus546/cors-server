# cors-server

这个项目主要解决国内的 `https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token` 接口被墙导致 `gitalk` 无法获取 `token` 问题。

借助 `vercel` 部署服务来进行接口转发。

我个人部署了服务，地址为：`cors-server-ecru.vercel.app` 。

如果不想折腾，只需把配置下的 `proxy` 改为 `https://cors-server-ecru.vercel.app/github_access_token` 即可，如下。

![](https://fastly.jsdelivr.net/gh/Dedicatus546/image@main/2022/07/26/202207261450438.avif)

如果不放心，可以 `fork` 该项目然后自己注册 `vercel` 进行部署。

相关帖子：[解决 Gitalk 无法获取 Github Token 问题](https://prohibitorum.top/7cc2c97a15b4.html) 。

使用技术 `koa + koa router + koa cors + koa bodyparser + axios` 。

## 2022-10-22

目前已支持 `netlify` ，详情请进上面的相关帖子查看即可。

目前我个人部署有两个可用接口：

- `vercel`: `https://vercel.prohibitorum.top/github_access_token` 
- `netlify`: `https://strong-caramel-969805.netlify.app/github_access_token`

## 2023-08-13

已支持 Docker 容器方式部署，不过这种方式适合你自己有服务器的情况。

感谢 [@Jorbenzhu](https://github.com/jorben) 提供的 Dockerfile 文件。

镜像已经提交到 DockerHub ，可以使用以下命令来拉取镜像。

```bash
docker pull dedicatus545/github-cors-server:1.0.0
```

然后使用以下命令启动镜像

```bash
docker run -d --name cors-server -p8080:9999 dedicatus545/github-cors-server:1.0.0
```

这里容器内部是 `9999` 端口，绑定主机的 `8080` 端口，这里可以根据你的服务器端口占用情况进行动态修改。
