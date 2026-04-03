const {getDefaultConfig} = require('@react-native/metro-config');

/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/docs/configuration
 */
module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const {transformer, resolver} = config;

  config.transformer = {
    ...transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  };

  config.resolver = {
    ...resolver,
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          if (name === 'Buffer' || name === 'process') {
            return require.resolve('metro-react-native-babel-preset');
          }
          return path.join(__dirname, `node_modules/${name}`);
        },
      },
    ),
  };

  return config;
})();
