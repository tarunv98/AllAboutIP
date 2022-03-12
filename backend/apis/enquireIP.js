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

    });

    child.stdin.end();

}

exports.work = async (ip) => {

    // let ip = req.socket.remoteAddress

    let d1, d2, d3, d4, str 

    await exec('shell', ip, (str) => {

            let spawn = require("child_process").spawn, child;
        
            let data
        
            child = spawn("sh",[`/home/tarunvasagiri/Documents/SIH_GIT/AllAboutIP/backend/apis/assets/${file}.sh`, `${ip}`]);
        
            child.stdout.on("data",function(response){
                data = data + response;
            });
         d1 = str.split('::')[0]
         d2 = str.split('::')[1]
         d3 = str.split('::')[2]
         d4 = str.split('::')[3]
        
        console.log(d1, d2, d3, d4)

        return
    })

}

exports.work('187.217.54.84')