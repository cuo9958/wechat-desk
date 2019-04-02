/**
 * 
 */
const { override, fixBabelImports } = require('customize-cra');

function hotConfig(config, env) {
    console.log(config, env)
    config.output.publicPath = __dirname + "/";
    return config;
}

module.exports = override(
    fixBabelImports('import', { libraryName: 'antd', libraryDirectory: 'es', style: true }),
    hotConfig
);

