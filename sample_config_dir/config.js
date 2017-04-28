const config = {
  appDaemon: {
    haUrl: "localhost:8123",
    haKey: ""
  },
  builtInApps: {
    printEntities: {
      enable: false //enable to log entities to the stdout
    },
    helloWorld: {
      enable: false //enable to log "hello world" to the stdout
    }
  },
  customApps: {
    energySaver: {
      enable: true,
      entities: ["light.storage_room"], //array of entities to listen for
      minutes: 60 //how many minutes until shutting them off
    }
  }
};

export default config;
