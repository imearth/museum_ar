<template>
<div>
    <h1>This is a Target Create Page</h1>
    <p>This is a form.</p>
    <label>Application name</label>
    <input type="text" v-model="projectname" />
    <br />

    <div class="container">
        <div class="large-12 medium-12 small-12 cell">
            <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
            </label>
            <button v-on:click="submitFile()">Submit</button>
        </div>
    </div>
    <div>
        <label>จำนวน Target:</label>
        <input type="number" min="0" v-model="num" />
        <hr />
        <div v-for="(item, i) in targetdata" :key="i">
            <br />
            <label>target name</label>
            <input type="text" v-model="item.targetname" />
            <br />
            <label>Target Type</label>
            <select v-model="item.type" @change="check3DObject()">
                <option disabled value>Please select one</option>
                <option>3DObject</option>
                <option>Video</option>
                <option>Quiz</option>
            </select>
            <br />
            <div v-if="item.type === 'Quiz'">
                <label>Quiz name</label>
                <input type="text" v-model="item.scriptname" />
            </div>
            <div v-if="item.type === 'Video'">
                <label>Video name</label>
                <input type="text" v-model="item.scriptname" />
            </div>
            <div v-if="item.type === '3DObject'">
                <label>3D Model Name</label>
                
                <input type="text" v-model="item.scriptname" />
                <br />
                <label>***ถ้าใช้งาน 3D จะไม่สามารถสร้าง APK แบบอัตโนมัติได้***</label>
            </div>
            <br />
            <div v-if="item.type === 'Quiz'">
                <button id="show-modal" @click="$modal.show('modal-createquiz')">สร้าง Quiz</button>
                <!-- use the modal component, pass in the prop -->
                <modal name="modal-createquiz" v-if="true" @close="showModal = false">
                    <CreateQuiz :objectname="item.scriptname" :checkboolq="checkbool" />
                </modal>
            </div>

            <div v-if="item.type === 'Video'">
                <div>
                    <button @click="show(`upload-${i}`)">upload video</button>
                    <modal :name="`upload-${i}`">
                        <VideoUpload :objectname="item.scriptname" />
                    </modal>
                </div>
            </div>
            <br />
            <div>
                <button @click="show(`modal-${i}`)">set position</button>
                <modal :name="`modal-${i}`">
                    <Position :index="i" v-on:childToParent="onChildClick" v-on:IndexchildToParent="onIndexChildClick" />
                </modal>
            </div>
            <hr />
        </div>
        <div v-if="this.checkbool === true">
            <button @click="createAPK">สร้างแอปอัติโนมัติ</button>
        </div>
        <button @click="writeFile">ดาวน์โหลดไฟล์ JSON สำหรับทำแบบ manual</button>

    </div>
    <pre>{{targetdata}}</pre>
</div>
</template>

<script>
// Requiring fs module in which
// writeFile function is defined.
import VideoUpload from "../components/VideoUpload.vue"
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
            file: '',
            projectname: null,
            num: 0,
            targetdata: [{}],
            targetjson: null,
            fromChild: "", // This value is set to the value emitted by the child
            indexFromChild: "",
            modalVisible: false,
            modalData: null,
            showModal: false,
            video: "",
            checkbool: true
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
                    type: "",
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
                console.log("press eiei")
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
                console.log("press eiei")
                axios({
                    url: 'http://localhost:3000/createTarget',
                    timeout: 900000,
                    data: this.targetjson,
                    method: 'POST',
                    responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'appname.zip');
                    document.body.appendChild(link);
                    link.click();
                    axios.post("http://localhost:3000/deleteold")
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
        onChildClick(value) {
            console.log(`[TargetCreate.vue]:[onChildClick] ${JSON.stringify(value)}`);
            this.fromChild = value;
        },
        onIndexChildClick(index) {
            // console.log(`[TargetCreate.vue]:[onIndexChildClick] index=${index}`);
            // console.log(`fromChild: ` + JSON.stringify(this.fromChild));

            this.targetdata[index] = {
                ...this.targetdata[index],
                ...this.fromChild
            };
            //   this.targetdata[index].position_x = this.fromChild.p_x;
            //   this.targetdata[index].position_y = this.fromChild.p_y;
            //   this.targetdata[index].position_z = this.fromChild.p_z;
            //   this.targetdata[index].rotation_x = this.fromChild.r_x;
            //   this.targetdata[index].rotation_y = this.fromChild.r_y;
            //   this.targetdata[index].rotation_z = this.fromChild.r_z;
            console.log(this.fromChild);
            this.hide(`modal-${index}`);
        },
        submitFile() {
            /*
                    Initialize the form data
                */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);

            /*
              Make the request to the POST /single-file URL
            */
            console.log('target uploading');
            axios.post("http://localhost:3000/uploadTarget",
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function () {
                    console.log('SUCCESS!!');
                })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },

        /*
          Handles a change on the file upload
        */
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        submitVideo() {
            /*
                    Initialize the form data
                */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.video);

            /*
              Make the request to the POST /single-file URL
            */
            console.log('video uploading');
            axios.post("http://localhost:3000/uploadVideo",
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function () {
                    console.log('SUCCESS!!');
                })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },

        /*
          Handles a change on the file upload
        */
        handleVideoUpload() {
            this.video = this.$refs.video.files[0];
        },
        check3DObject() {
            var x;
            this.checkbool = true;
            for (x of this.targetdata) {
                if (x.type == '3DObject'){
                    this.checkbool = false;
                }
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
