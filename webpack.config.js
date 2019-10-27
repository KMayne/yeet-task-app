if (require('./package.json').name !== 'yeet-task-app') process.chdir('./web-app');
module.exports = require('@vue/cli-service/webpack.config.js');
