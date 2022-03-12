const fs = require('fs')

const CONSTANTS = require('./constants')
const UTILS = require(CONSTANTS.UTILS)

const createLog = (type, m) => (`[${UTILS.getTimestamp()}]--->[${type}]{ ${m} }\n`)

exports._init_ = () => {
    console.log('Initialising Logger...\n')
    fs.appendFileSync(CONSTANTS.LOG_FILE_PATH, '*********************************************************\n')
    fs.appendFileSync(CONSTANTS.LOG_FILE_PATH, '*********************************************************\n')
}

exports.log = (msg) => fs.appendFileSync(CONSTANTS.LOG_FILE_PATH, createLog('info', msg))
exports.error = (err) => fs.appendFileSync(CONSTANTS.LOG_FILE_PATH, createLog('error', err))
