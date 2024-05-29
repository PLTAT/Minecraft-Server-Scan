
/*
JavaScript

*/

// script.js

/*
Go
*/


// the html load done
window.onload = function () {
    // add a 'keydown' type "listener event" for 'ServerInput' | 'scan' is script name
    document.getElementById('ServerInput').addEventListener('keydown', function (scan) {
        // 'Enter' key or 'NumpadEnter' key
        if (scan.key === 'Enter' || scan.key === 'NumpadEnter') {
            // ban Default do
            scan.preventDefault();
            // run 'ScanServer' script
            ScanServer();
        }
    });
}


// the html load done
window.onload = function () {
    // add a 'keydown' type "listener event" for 'ServerInput' | 'scan' is script name
    document.addEventListener("keydown", function (focus) {
        // special key and "f"
        if (focus.ctrlKey && focus.key === "f") {
            // ban Default do
            focus.preventDefault();
            // focus "ServerInput" input
            document.getElementById("ServerInput").focus();
        }
    });
}


// scan script
function ScanServer() {
    // set "InputData" is "ServerInput" type
    const InputData = document.getElementById("ServerInput").value;
    // set "ApiUrl" is `https://mcapi.us/server/status?ip=${InputData}` this `` is use for script
    const ApiUrl = `https://mcapi.us/server/status?ip=${InputData}`;

    fetch(ApiUrl)
        // get thing set json
        .then(response => response.json())
        // json data do what
        .then(data => {
            // set "ServerAddress" text is `Server Address : ${InputData}` end; if text use "text" here is script so use `script` bcause ${}
            document.getElementById("ServerAddress").textContent = `Server Address : ${InputData}`;

            document.getElementById("status").textContent = `Status : ${data.status}`;
            document.getElementById("online").textContent = `Online : ${data.online}`;
            //


            // if "data.favicon" back base64 url data
            if (data.favicon) {
                // self tell | create new "img" name is "faviconimg"
                const faviconimg = document.createElement("img");
                // "faviconImg" 'src' is "data.favicon" back base64 url data
                faviconimg.src = data.favicon;

                // if have 'img' remove first | because not just add 'img'
                // all tell | "existingImg" = "faviconImg" have 'img'
                var imgcheck = document.getElementById("faviconback").querySelector('img');
                // if "existingImg"
                if (imgcheck) {
                    // do "existingImg" remove | only 'img'
                    imgcheck.remove();
                }

                // add "faviconimg" to "faviconback"
                document.getElementById("faviconback").appendChild(faviconimg);

                // change "favicon" text
                document.getElementById("favicon").textContent = "Favicon : Show Now";
            }
            else {
                // if "data.favicon" not back base64 url data show default
                document.getElementById("favicon").textContent = `Favicon : ${data.favicon}`;
            }


            //
            document.getElementById("error").textContent = `Error : ${data.error}`;

            document.getElementById("players-max").textContent = `Players Max : ${data.players.max}`;
            document.getElementById("players-now").textContent = `Players Now : ${data.players.now}`;

            document.getElementById("server-name").textContent = `Server Name : ${data.server.name}`;
            document.getElementById("server-protocol").textContent = `Server Protocol : ${data.server.protocol}`;

            document.getElementById("last_updated").textContent = `Last Updated : ${new Date(parseInt(data.last_updated) * 1000)}`;
            // time is ms
            const ms = data.duration;
            const s = ms / 1000;
            const m = s / 60;
            const h = m / 60;
            const d = h / 24;
            const M = d / 30;
            const y = M / 12;
            // get
            const ry = Math.floor(y);
            const rM = Math.floor((y - ry) * 12);
            const rd = Math.floor((M - Math.floor(M)) * 30);
            const rh = Math.floor((d - Math.floor(d)) * 24);
            const rm = Math.floor((h - Math.floor(h)) * 60);
            const rs = Math.floor((m - Math.floor(m)) * 60);
            const rms = Math.floor(s % 60);

            document.getElementById("duration").textContent = `Duration : ${ry}/${rM}/${rd} ${rh}:${rm}:${rs}_${rms}`;
        })
}

function CopyAddress() {
    const InputData = document.getElementById("ServerInput").value;
    navigator.clipboard.writeText(InputData);
}

/*
End
*/
