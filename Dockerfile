FROM node:18-alpine
WORKDIR /root/app
COPY ["package.json", "pnpm-lock.yaml", ".npmrc", "index.js", "./"]
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
  && apk add --no-cache git \
  && npm i -g pnpm \
  && pnpm install

EXPOSE 9999

CMD node index.js