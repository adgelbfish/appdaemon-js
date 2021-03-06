#!/usr/bin/env node
import WebSocket from "ws";
global.WebSocket = WebSocket;
import * as haWs from "home-assistant-js-websocket";
import path from "path";
import os from "os";
import fse from "fs-extra";

let args = process.argv.slice(2);

let CONFIG_DIR = args[0] || path.join(os.homedir(), ".appdaemon-js");

let CUSTOM_APP_DIR = path.join(CONFIG_DIR, "apps");

let CONFIG_FILE_PATH =
  process.env.APPDAEMONJS_CONFIG_FILE_PATH ||
  path.join(CONFIG_DIR, "config.js");

const copyOptions = {
  overwrite: false,
  errorOnExist: false
};

if (!fse.existsSync(CONFIG_FILE_PATH)) {
  [CONFIG_DIR, CUSTOM_APP_DIR].forEach(path => fse.ensureDirSync(path));
  fse.copySync(
    path.join(__dirname, "../../sample_config_dir/apps/energySaver.js"),
    path.join(CUSTOM_APP_DIR, "energySaver.js"),
    copyOptions
  );
  fse.copySync(
    path.resolve(__dirname, "../../sample_config_dir/config.js"),
    CONFIG_FILE_PATH,
    copyOptions
  );
  console.log(
    "Congratulations! You have successfully installed and run appdaemon-js."
  );
  console.log(
    "Please set up your config in "+ CONFIG_FILE_PATH + " and run appdaemon-js again."
  );
  process.exit();
}

const config = require(CONFIG_FILE_PATH).default;

let customApps;

try {
  customApps = fse.readdirSync(CUSTOM_APP_DIR).map(file => {
    return {
      name: file.slice(0, -3),
      app: require(path.join(CUSTOM_APP_DIR, file)).app
    };
  });
} catch (err) {
  console.error(err);
}

import * as apps from "../apps/index";

export const getWsUrl = (haUrl, port, encrypted) =>
  `ws${encrypted ? "s" : ""}://${haUrl}${port ? ":" + port : ""}/api/websocket`;

haWs
  .createConnection(
    getWsUrl(
      config.appDaemon.haUrl,
      config.appDaemon.port,
      config.appDaemon.encryption || false
    ),
    {
      authToken: config.appDaemon.haKey
    }
  )
  .then(conn => {
    let appDaemon = {
      util: haWs,
      connection: conn,
      config: config
    };

    Object.entries(apps).forEach(([key, app]) => {
      let enabled = config.builtInApps[key] && config.builtInApps[key].enable;
      if (enabled) app.app(appDaemon);
    });

    customApps.forEach(app => {
      let enabled =
        config.customApps[app.name] && config.customApps[app.name].enable;
      if (enabled) app.app(appDaemon);
      console.log(app.name + " enabled: " + enabled);
    });
  }, console.error);
