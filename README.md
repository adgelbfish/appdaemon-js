AppDaemon JS
------

### Javascript apps for Home Assistant

-----

**This is pre-alpha software, intended for developer testing only**

_________

**See it in action:**

Run the following on a dev testing machine with Home Assistant:

`npm install -g app-daemon-js`

then you'll need a directory structure like this:
(placed in your home directory)

```
.appdaemon-js/
    config.js
    apps/
        customApp.js
```

alternatively, you can specify the config directory 
as a command line argument

then you'll need a config.js file structured like this:

```javascript
const config = {
  appDaemon: {
    haUrl: "localhost:8123",
    haKey: ""
  },
  builtInApps: {
    printEntities: {
      enable: false
    },
    helloWorld: {
      enable: false
    }
  },
  customApps: {
    customApp: {
      enable: true
    }
  }
};

module.exports.default = config;
```

then run:

`appdaemon-js`

---------

**Please Note:**

The API may change significantly in the first few minor versions (pre- 0.1)

