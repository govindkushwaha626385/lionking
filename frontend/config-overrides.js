module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,  // Disable polyfill for crypto
    };
    return config;
  };
  