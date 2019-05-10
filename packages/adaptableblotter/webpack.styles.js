var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  plugins: [
    new CopyWebpackPlugin([
      { from: 'App_Scripts/Styles/stylesheets', to: 'App_Scripts/Styles/stylesheets' },
    ]),
    new CopyWebpackPlugin([
      { from: 'App_Scripts/Styles/themes', to: 'App_Scripts/Styles/themes', ignore: ['*.ts'] },
    ]),
  ],
};
