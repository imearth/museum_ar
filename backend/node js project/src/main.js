const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
const fs = require('fs');
const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0';
const app = express();
const path = 'D:/unity project/AR Framework/Assets/StreamingAssets/jsondata/';
const Axios = require('axios');
const fileupload = require('express-fileupload');
const zip = require('zip-local');
const morgan = require('morgan');
const depath = require('path');

const directory = "D:/unity project/AR Framework/Assets/StreamingAssets/Wikitude/";
app.use(fileupload());
app.use(CORS());
app.use(morgan('combined'));
//kae punha cors origin
// parse application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.post("/createTarget", async (req, res) => {
    req.setTimeout(900000);
    console.log("createTarget" + req.body.projectname)
    let access_token = "";
    if (req.body) {
        let filename = "Target.JSON"
        console.log(path + filename);
        console.log(req.body);
        await Axios.post('https://account.uipath.com/oauth/token', {
            "grant_type": "refresh_token",
            "client_id": "8DEv1AMNXczW3y4U15LL3jYf62jK93n5",
            "refresh_token": "g9nUulv3Z96vC4_lqpC-R6qhVTqBBTFdRuWH6vpOrWTTA"
        }, {
            headers: {
                'X-UIPATH-TenantName': 'KMITLDefaul1bf2133371',
                'Content-Type': "application/json"
            }
        }).then((response) => {
            access_token = "Bearer " + response.data.access_token;
            console.log(access_token);
        });
        fs.writeFileSync(path + filename, JSON.stringify(req.body, null, 2), function(err) {
            if (err) throw err;
        });
        await Axios.post('https://platform.uipath.com/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs', {
            "startInfo": {
                "ReleaseKey": "84dd0218-95b1-4044-9fdd-0d04cdfd5460",
                "Strategy": "Specific",
                "RobotIds": [271663],
                "NoOfRobots": 0
            }
        }, {
            headers: {
                'X-UIPATH-TenantName': 'KMITLDefaul1bf2133371',
                Authorization: access_token
            }
        });
        //เขียน method check file exits
        const filepath = 'D:/unity project/APK/appname.apk';
        while (!fs.existsSync(filepath)) {
            await console.log("searching...");
        }
        /*
        await res.download(filepath, function(err) {
            while (!fs.existsSync(filepath)) {
                console.log("searching...2");
            }
            res.download(filepath);
        });
        */
        /*
        await zip.zip(filepath, (err, zipped) => {
            if (!err) {
                zipped.compress();
                const buff = zipped.memory();
                zipped.save('D:/unity project/APK/appname.zip', (err) => {
                    if (!err) {
                        res.download('D:/unity project/APK/appname.zip');
                        console.log("saved");
                    }
                })
            }
        })
        */
        res.download('D:/unity project/APK/appname.apk');
        console.log("apk zip downloaded");
    }
})
app.get("/file", (req, res) => {
    res.download('D:/unity project/APK/appname.zip');
})
app.post("/createQuiz", (req, res) => {
	console.log(req.body.allRoundData[0].name);
    console.log("createQuiz " + req.body.allRoundData[0].name);
    if (req.body) {
        let filename = req.body.allRoundData[0].name + ".JSON"
        fs.writeFile(path + 'quizdata/' + filename, JSON.stringify(req.body, null, 2), function(err) {
            if (err) throw err;
            console.log('Saved!');
            res.json({message: 'saved'});
        });
    } else {
    	res.status(404).end();
    }
})
app.post("/uploadTarget", async (req, res) => {
    await fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(depath.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
    if (req.files) {
        console.log(req.files.file);
        var file = req.files.file,
            filename = file.name;
        file.mv("D:/unity project/AR Framework/Assets/StreamingAssets/Wikitude/" + filename, function(err) {
            if (err) {
                console.log(err)
                res.send("error occured");
            } else {
                res.send();
            }
        })
    }
});
app.post("/deleteold", (req, res) => {
    const path = 'D:/unity project/APK/'
    try {
        fs.unlinkSync(path + 'appname.zip')
        //file removed
    } catch (err) {
        console.error(err)
    }
    try {
        fs.unlinkSync(path + 'appname.apk')
        //file removed
    } catch (err) {
        console.error(err)
    }
    res.send("deleted")
});
app.post("/uploadVideo", (req, res) => {
    req.setTimeout(900000);
    console.log(req.body);
    if (req.files) {
        var file = req.files.file,
            filename = req.body.name;
        file.mv("D:/unity project/AR Framework/Assets/StreamingAssets/video/" + filename, function(err) {
            if (err) {
                console.log(err)
                res.send("error occured");
            } else {
                res.send();
            }
        })
    }
});
app.listen(PORT, HOST);