#!/usr/bin/env node
import WebSocket from "ws";
global.WebSocket = WebSocket;
import * as haWs from "home-assistant-js-websocket";

let CONFIG_FILE_PATH =
  process.env.APPDAEMONJS_CONFIG_FILE_PATH || "../config/config.js";

const config = require(CONFIG_FILE_PATH).default;

import * as apps from "../apps/index";

const getWsUrl = haUrl => `ws://${haUrl}/api/websocket`;

haWs
  .createConnection(getWsUrl(config.appDaemon.haUrl), {
    authToken: config.appDaemon.haKey
  })
  .then(conn => {
    let appDaemon = {
      raw: {
        api: haWs,
        connection: conn,
        config: config
      }
    };
    Object.entries(apps).forEach(([key, app]) => {
      let enabled = config[key] && config[key].enable;
      console.log(enabled);
      if (enabled) app.app(appDaemon);
    });
  }, console.log);
