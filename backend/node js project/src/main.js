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
    if (req.body) {
        let filename = "Target.JSON"
        console.log(path + filename);
        console.log(req.body);
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
                Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJUTkVOMEl5T1RWQk1UZEVRVEEzUlRZNE16UkJPVU00UVRRM016TXlSalUzUmpnMk4wSTBPQSJ9.eyJodHRwczovL3VpcGF0aC9lbWFpbCI6ImltZWFydGhnZ3dwQGdtYWlsLmNvbSIsImh0dHBzOi8vdWlwYXRoL2VtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2FjY291bnQudWlwYXRoLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNjY4MTUzNDYxODk0NDQ4MjE0NCIsImF1ZCI6WyJodHRwczovL29yY2hlc3RyYXRvci5jbG91ZC51aXBhdGguY29tIiwiaHR0cHM6Ly91aXBhdGguZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU4NDYxMjQyOCwiZXhwIjoxNTg0Njk4ODI4LCJhenAiOiI4REV2MUFNTlhjelczeTRVMTVMTDNqWWY2MmpLOTNuNSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MifQ.J3CuppoOQkXFmLHT1cl7aV-7KS0nvQow5gdf5Qhn0ObOMhIYJNGBH0FW5yMG3h-O03IoAzQQti00MjlPExN0314McB0cdx0I8PpGHoydou6pinruHu48wkACQSa-ACWsBwsgxxP0QlXJc-_iPyah-sw69hZTPg2WDWfKHONfbvryhncCV_Ig2c23jfBSqi4S17Mrlcw3GYyQeE9nqOVIykkS2Kt5A1lQZ-Ml8suAxYDWjUOcceuDLCjedbGyzOPJxH3Ja89ILyZfoU6yxOM_Sb_ZGFXIWCGJ5iM2ulWZsW1dj_DO29oPqN6Ac1OmN-ZQCLz8aQCRbQT2N5SZFXTjtQ"
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
        console.log("apk zip downloaded");
    }
})
app.get("/file", (req, res) => {
    res.download('D:/unity project/APK/appname.zip');
})
app.post("/createQuiz", (req, res) => {
    console.log("createQuiz" + req.body.allRoundData[0].name)
    if (req.body) {
        let filename = req.body.allRoundData[0].name + ".JSON"
        fs.writeFile(path + 'quizdata/' + filename, JSON.stringify(req.body, null, 2), function(err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
})
app.post("/uploadTarget", (req, res) => {
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
        fs.unlinkSync(path+'appname.zip')
        //file removed
    } catch (err) {
        console.error(err)
    }
    try {
        fs.unlinkSync(path+'appname.apk')
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
            filename = req.body.name+'.mp4';
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