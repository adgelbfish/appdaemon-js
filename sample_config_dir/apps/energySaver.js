module.exports.app = appDaemon => {
  let { connection, util, config } = appDaemon;

  const onEvent = evt => {
    console.log("triggered");

    if (
      evt.event_type === "state_changed" &&
      evt.data.new_state.state === "on" &&
      config.customApps.energySaver.entities.indexOf(evt.data.entity_id) > -1
    ) {
      console.log("condition matched");

      setTimeout(() => {
        console.log("service call firing");

        connection.callService("homeassistant", "turn_off", {
          entity_id: evt.data.entity_id
        });
      }, config.customApps.energySaver.minutes * 60 * 1000);
    }
  };

  connection.subscribeEvents(onEvent);
};
