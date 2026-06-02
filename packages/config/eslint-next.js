const baseConfig = require("./eslint-base");

module.exports = {
  ...baseConfig,
  extends: [
    ...baseConfig.extends,
  ],
  rules: {
    ...baseConfig.rules,
  },
};
