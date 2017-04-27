export const app = appDaemon => {
  let { connection, util, config } = appDaemon;
  util.subscribeEntities(connection, console.log);
};
