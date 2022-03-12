const exec = async (file, ip, cb) => {
    let spawn = require("child_process").spawn, child;

    let data

    child = spawn("sh",[`/home/tarunvasagiri/Documents/SIH_GIT/AllAboutIP/backend/apis/assets/${file}.sh`, `${ip}`]);

    child.stdout.on("data",function(response){
        data = data + response;
    });

    child.stderr.on("data",function(data){
        console.log("Powershell Errors: " + data);
    });

    child.on("exit",function(){

        cb(data)

        // let resp = {'inetnum': '', 'country': '', 'owner': '', 'organisation': ''}

        // (data.toString().split('inetnum')[1].split(':')[0]) ? resp.inetnum = data.toString().split('inetnum')[1].split(':')[0] : resp.inetnum = ''
        // (data.toString().split('country')[1].split(':')[0]) ? resp.country = data.toString().split('country')[1].split(':')[0] : resp.country = ''
        // (data.toString().split('owner')[1].split(':')[0]) ? resp.irt = data.toString().split('owner')[1].split(':')[0] : resp.irt = ''
        // (data.toString().split('organisation')[1].split(':')[0]) ? resp.organisation = data.toString().split('organisation')[1].split(':')[0] : resp.organisation = ''
    
        // console.log("Powershell Script finished");
    });

    child.stdin.end();

    // return data

}

exports.work = async (req) => {

    let ip = req.socket.remoteAddress

    let d1, d2, d3, d4, str 

    await exec('shell', ip, (str) => {
        d1 = str.split('::')[0]
        d2 = str.split('::')[1]
        d2 = str.split('::')[2]
        d2 = str.split('::')[3]
        
        console.log(d1, d2, d3, d4)
    })

    // let getData = async (ip, cb) => {
    //     exec('whois', ip, (d) => {
    //         d1 = d
    //         exec('nmap', ip, (d) => {
    //             d2 = d
    //             exec('trace', ip, (d) => {
    //                 d3 = d
    //                 exec('ba', ip, (d) => {
    //                     d4 = d
    //                     cb()
    //                 })
    //             })
    //         })
    //     })
        // d2 = exec('nmap', ip)
        // d3 = exec('trace', ip)
        // d4 = exec('ba', ip)

}

// exports.work('187.217.54.84')