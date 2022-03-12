const http = require('http')
const fs = require('fs')
const mime = require('mime')

const CONSTANTS = require('./lib/constants')
const LOG = require(CONSTANTS.LOGGER)

LOG._init_()

const handleRequest = async (req, res, path) => {
    let ext = path.toString().split('.')[1]
    let full_path
    let isAPI = false;

    (path.toString().split('/')[1] == 'apis') ? full_path =  `${CONSTANTS.APIS[path.toString().split('/')[2]]}` : LOG.error(`Invalid API Path ${path}`)

    // fs.readFile(full_path, function (error, pgResp) {
    //     if (error) {
    //         LOG.error(error)
    //         res.writeHead(404)
    //         res.write('Contents you are looking are Not Found')
    //     } else {
    //         let headers = (path =='/') ? CONSTANTS.headers[`html`] : CONSTANTS.headers[`${ext}`]
    //         LOG.log(JSON.stringify(headers))
    //         res.setHeader("Content-Type", mime.getType(path));
    //         res.writeHead(200, 'OK', headers)
    //         res.write(pgResp)
    //     }
    //     res.end()
    // })

    try {
        let headers = CONSTANTS.headers[`js`]
        let resp = await require(full_path).work(req)

        LOG.log(JSON.stringify(headers))
        res.setHeader("Content-Type", mime.getType(path));
        res.writeHead(200, 'OK', headers)

        console.log(resp)

        res.write(resp)
    } catch (e) {
        LOG.error(e)
        res.writeHead(404)
        res.write('Contents you are looking are Not Found')
    }

    res.end()
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