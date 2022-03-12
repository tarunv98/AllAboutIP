const path = require('path')

const root = path.resolve(__dirname + '/../');
exports.ROOT = path.resolve(__dirname + '/../');

exports.LOG_FILE_PATH = path.resolve(root + '/logs/server.log.ndjson')
exports.LOGGER = path.resolve(root + '/lib/logger')
exports.UTILS = path.resolve(root + '/lib/utils')

// HTTP Server Conf
exports.HTTP_PORT = 9090

// Webpages
exports.OK_WEBPAGE = path.resolve(root + '/web/index.html')
exports.WEBDIR = path.resolve(root + '/web')

exports.headers = {
    html: {
        'Context-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
    },
    css: {
        'Context-Type': 'text/css',
        'Access-Control-Allow-Origin': '*'
    },
    js: {
        'Context-Type': '*/*',
        'Access-Control-Allow-Origin': '*'
    }
}