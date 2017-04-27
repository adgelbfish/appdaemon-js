import { getWsUrl } from "./app";
import validator from "validator";

test("getWsUrl() creates a valid websocket url with hassbian:8123 as the haUrl", () => {
  expect(
    validator.isURL(getWsUrl("hassbian:8123"), {
      protocols: ["ws"],
      require_tld: false,
      require_protocol: true,
      require_host: true,
      require_valid_protocol: true,
      allow_underscores: false,
      host_whitelist: false,
      host_blacklist: false,
      allow_trailing_dot: false,
      allow_protocol_relative_urls: false
    })
  ).toBe(true);
});
