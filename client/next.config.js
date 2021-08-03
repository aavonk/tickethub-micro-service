module.exports = {
  webpackDevMiddleware: (config) => {
    // Helps with file changes being reflected inside of a docker container
    config.watchOptions.poll = 300;
    return config;
  },
};
