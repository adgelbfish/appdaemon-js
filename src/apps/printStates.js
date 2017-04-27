export const app = appDaemon => {
  let { connection, api, config } = appDaemon.raw;
  api.subscribeEntities(connection, console.log);
};
