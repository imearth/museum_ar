<template>
<v-container justify="center" center>
    <v-card class="mx-auto " max-width="1000" outlined center style=" padding-top: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 30px;">
        <v-card>
            <v-container>
                <h1>Create Tourist Guide Application With Augmented Reality</h1>
                <v-row class="align-center">
                    <v-col cols="6">
                        <br />
                        <v-text-field label="Application name" v-model="projectname" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>

                    <v-col cols="5">
                        <v-file-input messages="* กรุณาอัปโหลด .wtc file จากเว็บไซต์ wikitude" label="File" v-model="file"></v-file-input>
                    </v-col>
                    <v-col>
                        <v-btn :disabled="!Boolean(file)" v-on:click="submitFile">Upload </v-btn>
                    </v-col>

                </v-row>
            </v-container>
        </v-card>
        <br />
        <v-card>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-text-field label="จำนวน Target:" type="number" min="0" v-model="num" outlined></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-row>
            <v-col cols="6" md="6" sm="12" v-for="(item, i) in targetdata" :key="i">
                <v-card>
                    <v-container>
                        <v-subheader class="pl-3 md-6">Target {{i+1}}: {{item.targetname}} </v-subheader>

                        <v-text-field label="Target name" v-model="item.targetname" outlined></v-text-field>

                        <v-select label="Target Type" :items="targetType" v-model="item.type" @change="check3DObject"></v-select>

                        <template v-if="item.type === 'Quiz'">
                            <v-text-field label="Quiz name" v-model="item.scriptname" outlined></v-text-field>
                            <CreateQuiz :objectname="item.scriptname" :checkboolq="checkbool" />
                        </template>

                        <template v-if="item.type === 'Video'">
                            <v-text-field label="Video name" v-model="item.scriptname" outlined></v-text-field>
                            <div>
                                <v-btn :disabled="!Boolean(item.scriptname)" rounded block @click="show(`upload-${i}`)">upload video</v-btn>
                                <modal :name="`upload-${i}`">
                                    <VideoUpload :objectname="item.scriptname" />
                                </modal>
                            </div>
                        </template>

                        <template v-if="item.type === '3DObject'">
                            <v-text-field label="3D Model Name" v-model="item.scriptname" outlined></v-text-field>
                            <v-alert type="warning">***ถ้าใช้งาน 3D จะไม่สามารถสร้าง APK แบบอัตโนมัติได้***</v-alert>
                        </template>

                        <v-card-actions>
                            <Position :index="i" @positionSet="onPositionSet"></Position>
                        </v-card-actions>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>

        <template v-if="checkbool">
            <v-row>
                <v-col>
                    <template v-if="loading">
                        <v-subheader class="pl-3 md-6">กำลังสร้างแอปพลิเคชัน กรุณารอ </v-subheader>
                        <v-progress-linear v-model="load.percent" :indeterminate="load.indeterminate"></v-progress-linear>
                    </template>
                    <template v-else>
                        <v-btn color="success" @click="createAPK">สร้างแอปอัติโนมัติ</v-btn>
                    </template>
                </v-col>
            </v-row>
        </template>

        <v-row>
            <v-col>
                <v-btn color="success" @click="writeFile">ดาวน์โหลดไฟล์ JSON สำหรับทำแบบ manual</v-btn>
            </v-col>
        </v-row>
    </v-card>
</v-container>
</template>

<script>
// Requiring fs module in which
// writeFile function is defined.
import VideoUpload from "../components/VideoUpload.vue";
import Position from "../components/Position.vue";
import CreateQuiz from "../components/QuizCreate.vue";
import axios from "axios";

export default {
    name: "TargetCreate",
    /* eslint-disable */
    components: {
        Position,
        CreateQuiz,
        VideoUpload
    },
    /* eslint-enable */
    props: {
        msg: String
    },
    created() {
        this.num = 1;
    },

    data() {
        return {
            file: null,
            projectname: null,
            num: 0,
            targetdata: [],
            targetjson: null,
            fromChild: "", // This value is set to the value emitted by the child
            indexFromChild: "",
            modalVisible: false,
            modalData: null,
            showModal: false,
            video: "",
            checkbool: true,
            targetType: ["Video", "Quiz", "3DObject"],
            loading: false,
            load: {
                percent: 5,
                indeterminate: false,
                interval: 0
            }
        };
    },
    /* eslint-disable */
    watch: {
        // whenever num changes, this function will run
        num: function (newValue) {
            this.targetdata = [];
            for (let i = 0; i < newValue; i++) {
                this.targetdata.push({
                    targetname: "",
                    scriptname: "",
                    type: "Video",
                    position_x: "0",
                    position_y: "0",
                    position_z: "0",
                    rotation_x: "0",
                    rotation_y: "0",
                    rotation_z: "0"
                });
            }
        }
    },
    /* eslint-enable */
    methods: {
        writeFile: function (event) {
            // `event` is the native DOM event
            if (event) {
                this.targetjson = {
                    projectname: this.projectname,
                    targets: this.targetdata
                };
                /*
                        axios.post("http://localhost:3000/createTarget", this.targetjson).then(res => {
                            FileDownload(res.data, 'appname.zip');

                        }).catch(console.error());
                        */
                console.log("press eiei");
                this.targetjson = {
                    projectname: this.projectname,
                    targets: this.targetdata
                };
                var FileSaver = require("file-saver");
                var blob = new Blob([JSON.stringify(this.targetjson, null, 2)], {
                    type: "text/plain;charset=utf-8"
                });
                FileSaver.saveAs(blob, "Target.JSON");

                //ใช้ then รอรับไฟล์ จาก node js
            }
        },
        createAPK: function (event) {
            // `event` is the native DOM event
            if (event) {
                this.targetjson = {
                    projectname: this.projectname,
                    targets: this.targetdata
                };
                /*
                        axios.post("http://localhost:3000/createTarget", this.targetjson).then(res => {
                            FileDownload(res.data, 'appname.zip');

                        }).catch(console.error());
                        */
                console.log("press eiei");
                this.loading = true;
                this.loadingBar(true);
                axios({
                    url: "http://localhost:3000/createTarget",
                    timeout: 900000,
                    data: this.targetjson,
                    method: "POST",
                    responseType: "blob" // important
                }).then(response => {
                    setTimeout(() => {
                        this.load.percent = 100;
                    }, 1500)
                    
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "appname.zip");
                    document.body.appendChild(link);
                    link.click();
                    axios.post("http://localhost:3000/deleteold");
                    setTimeout(() => {
                        this.loading = false;
                        this.loadingBar(false);
                    }, 3000)

                });

                /*
                        this.targetjson = {
                            projectname: this.projectname,
                            targets: this.targetdata
                        };
                        var FileSaver = require("file-saver");
                        var blob = new Blob([JSON.stringify(this.targetjson, null, 2)], {
                            type: "text/plain;charset=utf-8"
                        });
                        FileSaver.saveAs(blob, "Target.JSON");
                        */
                //ใช้ then รอรับไฟล์ จาก node js
            }
        },
        openModal(data) {
            this.modalData = data;
            this.modalVisible = true;
        },
        show(modalName) {
            console.log(`show modal ${modalName}`);
            this.$modal.show(modalName);
        },
        hide(modalName) {
            this.$modal.hide(modalName);
        },
        onPositionSet(data) {
            console.log("[positionSet] " + JSON.stringify(data));
            const index = data.index;
            const pr_data = data.pr_data;

            this.targetdata[index].position_x = pr_data.position_x;
            this.targetdata[index].position_y = pr_data.position_y;
            this.targetdata[index].position_z = pr_data.position_z;
            this.targetdata[index].rotation_x = pr_data.rotation_x;
            this.targetdata[index].rotation_y = pr_data.rotation_y;
            this.targetdata[index].rotation_z = pr_data.rotation_z;
        },
        submitFile() {
            /*
                          Initialize the form data
                      */
            let formData = new FormData();

            /*
                      Add the form data we need to submit
                  */
            formData.append("file", this.file);

            /*
                    Make the request to the POST /single-file URL
                  */
            console.log("target uploading");
            axios
                .post("http://localhost:3000/uploadTarget", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(function () {
                    console.log("SUCCESS!!");
                })
                .catch(function () {
                    console.log("FAILURE!!");
                });
        },
        submitVideo() {
            /*
                          Initialize the form data
                      */
            let formData = new FormData();

            /*
                      Add the form data we need to submit
                  */
            formData.append("file", this.video);

            /*
                    Make the request to the POST /single-file URL
                  */
            console.log("video uploading");
            axios
                .post("http://localhost:3000/uploadVideo", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(function () {
                    console.log("SUCCESS!!");
                })
                .catch(function () {
                    console.log("FAILURE!!");
                });
        },
        check3DObject() {
            var x;
            this.checkbool = true;
            for (x of this.targetdata) {
                if (x.type == "3DObject") {
                    this.checkbool = false;
                }
            }
        },
        loadingBar(isLoading) {
            if (isLoading) {
                this.load.indeterminate = true
                this.load.percent = 0

                setTimeout(() => {
                    this.load.indeterminate = false
                    this.load.interval = setInterval(() => {
                        if (this.load.percent > 93) {
                            clearInterval(this.load.interval);
                        }
                        this.load.percent += 0.4;
                    }, 2000)
                }, 2500)
            } else {
                clearInterval(this.load.interval);
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
