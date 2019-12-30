const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [__dirname, path.resolve(__dirname, '../../packages')],
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          babelrc: false,
          "presets": [
            "@babel/react",
            "@babel/env",
            "@babel/preset-typescript"
          ],
          "plugins": [
              "@babel/plugin-proposal-class-properties",
              "@babel/proposal-object-rest-spread"
          ]
        }
      },
      ...(process.env.NODE_ENV === 'production' || process.env.STORYBOOK_WITHINFO === '1')
        ? [{ loader: require.resolve('react-docgen-typescript-loader') }]
        : [],
    ]
  });

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    include: [__dirname, path.resolve(__dirname, '../../packages')],
    exclude: /node_modules/,
    use: [{
      "loader": require.resolve('@storybook/addon-storysource/loader'),
      "options": {parser: "typescript"}
    }]
  });

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
