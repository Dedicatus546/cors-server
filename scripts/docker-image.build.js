/**
 * @author Par9uet
 * @description 本文件为 docker 镜像构建文件，如果需要自行构建，请修改相关的变量
 */

const fs = require("node:fs");
const childProcess = require("node:child_process");
const { EOL } = require("node:os");
const path = require("node:path");

const { version } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "package.json"))
);

// 如果需要推送自己构建的镜像，请修改为自己的用户名
const DOCKER_USERNAME = "dedicatus545";
const DOCKER_IMAGE_TAG = `${DOCKER_USERNAME}/github-cors-server:${version}`;

/**
 * @param {NodeJS.WriteStream} stream
 * @returns
 */
const log = (stream) => {
  /**
   * @param {string} msg
   * @param {((err: Error | null) => void) | undefined} callback
   */
  return (msg, callback) => {
    stream.write(`[build cors-server docker image] - ${msg}` + EOL, callback);
  };
};

const infoLog = log(process.stdout);
const errorLog = log(process.stderr);

const checkDocker = async () => {
  return new Promise((resolve, reject) => {
    const dockerProcess = childProcess.spawn("docker", ["-v"], {});
    infoLog("check docker command.");
    dockerProcess.stdout.on("data", (data) => {
      infoLog(data);
    });
    dockerProcess.stderr.on("data", (data) => {
      errorLog(data);
    });
    dockerProcess.on("error", (err) => {
      errorLog(err.message + EOL + err.stack);
      reject(err.message);
    });
    dockerProcess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

const generateDockerImage = async () => {
  return new Promise((resolve, reject) => {
    infoLog("generate image tag: " + DOCKER_IMAGE_TAG);
    const dockerProcess = childProcess.spawn("docker", [
      "build",
      "-t",
      DOCKER_IMAGE_TAG,
      path.resolve(__dirname, ".."),
    ]);
    dockerProcess.stdout.on("data", (data) => {
      infoLog(data);
    });
    dockerProcess.stderr.on("data", (data) => {
      errorLog(data);
    });
    dockerProcess.on("error", (err) => {
      errorLog(err.message + EOL + err.stack);
      reject(err.message);
    });
    dockerProcess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

const pushDockerImage = async () => {
  return new Promise((resolve, reject) => {
    infoLog("start to push image to DockerHub.");
    const dockerProcess = childProcess.spawn("docker", [
      "push",
      DOCKER_IMAGE_TAG,
    ]);
    dockerProcess.stdout.on("data", (data) => {
      infoLog(data);
    });
    dockerProcess.stderr.on("data", (err) => {
      errorLog(data);
    });
    dockerProcess.on("error", (err) => {
      errorLog(err.message + EOL + err.stack);
      reject(err.message);
    });
    dockerProcess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

const main = async () => {
  await checkDocker();
  await generateDockerImage();
  infoLog("generate docker image success.");
  await pushDockerImage();
  infoLog("push docker image success.");
};

main().catch((err) => {
  errorLog("generate or push docker image failure. err: " + err);
});
