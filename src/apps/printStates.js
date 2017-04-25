export const app = (appDaemon) => {
  let {connection, api, config} = appDaemon
  api.subscribeEntities(connection, console.log)
};