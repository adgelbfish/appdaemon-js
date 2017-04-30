const config = {
  appDaemon: {
    haUrl: "localhost",
    haKey: "",
    encryption: false,
    port: 8123
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
      entities: ["light.some_light"], //array of entities to listen for
      minutes: 60 //how many minutes until shutting them off
    }
  }
};

module.exports.default = config;
