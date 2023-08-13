const fs = require("node:fs");
const childProcess = require("node:child_process");
const { EOL } = require("node:os");
const path = require("node:path");

const { version } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "package.json"))
);

const IMAGE_TAG = "github-cors-server";

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
    stream.write(`[cors-server] - [image build] - ${msg}` + EOL, callback);
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
    dockerProcess.stdout.on("error", (err) => {
      errorLog(err.message);
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
    const tag = `${IMAGE_TAG}:${version}`;
    infoLog("image tag: ", tag);
    const dockerProcess = childProcess.spawn("docker", [
      "build",
      "-t",
      tag,
      path.resolve(__dirname, ".."),
    ]);
    dockerProcess.stdout.on("data", (data) => {
      infoLog(data);
    });
    dockerProcess.stdout.on("error", (err) => {
      errorLog(err.message);
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
};

main().catch((err) => {
  errorLog("generate docker image failure. err: " + err);
});
