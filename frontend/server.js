const http = require('http')
const fs = require('fs')
const mime = require('mime')

const CONSTANTS = require('./lib/constants')
const LOG = require(CONSTANTS.LOGGER)

LOG._init_()

const handleRequest = (req, res, path) => {
    let ext = path.toString().split('.')[1]
    let full_path
    let isAPI = false;

    // Call this file with IP extension /ValidateIP/<IPExt>
    if (path.split('/')[1] && path.split('/')[1] == 'ValidateIP') {
        full_path = `${CONSTANTS.WEBDIR}/IPValidator.html`
        let ip = path.split('/')[2]
        let newIP = req.socket.remoteAddress
        newIP = newIP.toString().replace(':', '')
        newIP = newIP.toString().replace('.', '')
        let otherIP = ''

        if (ip.toString() == newIP.toString()) full_path = `${CONSTANTS.WEBDIR}/IPValidatorOK.html`
        else {
            LOG.log(`PROXY DETECTED ${ip} --- ${newIP}`)
            full_path = `${CONSTANTS.WEBDIR}/IPValidatorFAIL.html`
        }

        if (req.getHeader('X-Forwarded-For')) otherIP = req.getHeader('X-Forwarded-For')
        else if (req.getHeader('X-Client-IP')) otherIP = req.getHeader('X-Client-IP')

        otherIP = otherIP.toString().replace(':', '')
        otherIP = otherIP.toString().replace('.', '')

        if (ip.toString() == newIP.toString()) full_path = `${CONSTANTS.WEBDIR}/IPValidatorOK.html`
        else {
            LOG.log(`PROXY DETECTED ${ip} --- ${otherIP}`)
            full_path = `${CONSTANTS.WEBDIR}/IPValidatorFAIL.html`
        }

    } else if (path == '/') full_path = CONSTANTS.OK_WEBPAGE
    else full_path = `${CONSTANTS.WEBDIR}/${path}`

    fs.readFile(full_path, function (error, pgResp) {
        if (error) {
            LOG.error(error)
            res.writeHead(404)
            res.write('Contents you are looking are Not Found')
        } else {
            let headers = (path == '/') ? CONSTANTS.headers[`html`] : CONSTANTS.headers[`${ext}`]
            LOG.log(JSON.stringify(headers))
            res.setHeader("Content-Type", mime.getType(path));
            res.writeHead(200, 'OK', headers)
            res.write(pgResp)
        }
        res.end()
    })

    return;

}

const server = http.createServer((req, res) => {
    LOG.log(`New connection received from ${req.socket.remoteAddress}`)
    LOG.log(`Headers of ${req.socket.remoteAddress} are : ${JSON.stringify(req.headers)}`)

    req.on('data', (d) => {
        LOG.log(d.toString())
    })

    LOG.log(`Received request for ${req.url} from ${req.socket.remoteAddress}, serving them...`)
    handleRequest(req, res, req.url)
})

server.on('listening', () => {
    LOG.log('********** Server Started on port 9999 ************')
})

server.listen(CONSTANTS.HTTP_PORT)