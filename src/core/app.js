import WebSocket from "ws";
global.WebSocket = WebSocket;
import * as haWs from "home-assistant-js-websocket";

import config from "../config/config";

import * as apps from "../apps/index";

const getWsUrl = haUrl => `ws://${haUrl}/api/websocket`;

haWs.createConnection(getWsUrl(config.appDaemon.haUrl), {authToken: config.appDaemon.haKey}).then(conn => {
  let appDaemon = {
    api: haWs,
    connection: conn,
    config: config
  };
  Object.entries(apps).forEach(([key, app]) => {
    app.app(appDaemon);
  });
});
