<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h1>This is a Target Create Page</h1>
        <p>This is a form.</p>

        <v-text-field label="Application name" v-model="projectname" outlined></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5">
        <!-- <label>
          File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
        </label>-->

        <v-file-input label="File" v-model="file"></v-file-input>
      </v-col>
      <v-col>
        <v-btn :disabled="!Boolean(file)" v-on:click="submitFile">Upload</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <p>จำนวน Target</p>
        <v-text-field label="จำนวน Target:" type="number" min="0" v-model="num" outlined></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" md="6" sm="12" v-for="(item, i) in targetdata" :key="i">
        <v-card>
          <v-card-title>Target {{i+1}}: {{item.targetname}}</v-card-title>
          <v-container>
            <v-text-field label="Target name" v-model="item.targetname" outlined></v-text-field>

            <v-select
              label="Target Type"
              :items="targetType"
              v-model="item.type"
              @change="check3DObject"
            ></v-select>

            <template v-if="item.type === 'Quiz'">
              <v-text-field label="Quiz name" v-model="item.scriptname" outlined></v-text-field>
              <CreateQuiz :objectname="item.scriptname" :checkboolq="checkbool" />
            </template>

            <template v-if="item.type === 'Video'">
              <v-text-field label="Video name" v-model="item.scriptname" outlined></v-text-field>
              <div>
                <v-btn
                  :disabled="!Boolean(item.scriptname)"
                  rounded
                  block
                  @click="show(`upload-${i}`)"
                >upload video</v-btn>
                <modal :name="`upload-${i}`">
                  <VideoUpload :objectname="item.scriptname" />
                </modal>
              </div>
            </template>

            <template v-if="item.type === '3DObject'">
              <v-text-field label="3D Model Name" v-model="item.scriptname" outlined></v-text-field>
              <v-alert type="warning">***ถ้าใช้งาน 3D จะไม่สามารถสร้าง APK แบบอัตโนมัติได้***</v-alert>
            </template>

            <template v-if="item.type === 'Quiz'">
              <!-- <v-btn
                rounded
                block
                id="show-modal"
                @click="$modal.show('modal-createquiz')"
              >สร้าง Quiz</v-btn>-->

              <!-- use the modal component, pass in the prop -->
              <!-- <modal name="modal-createquiz" v-if="true" @close="showModal = false"> -->
              <!-- <CreateQuiz :objectname="item.scriptname" :checkboolq="checkbool" /> -->
              <!-- </modal> -->
            </template>

            <v-card-actions>
              <v-btn block @click="show(`modal-${i}`)" color="primary">set position</v-btn>
              <modal :name="`modal-${i}`">
                <Position
                  :index="i"
                  v-on:childToParent="onChildClick"
                  v-on:IndexchildToParent="onIndexChildClick"
                />
              </modal>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <template v-if="checkbool">
      <v-row>
        <v-col>
          <v-btn color="success" @click="createAPK">สร้างแอปอัติโนมัติ</v-btn>
        </v-col>
      </v-row>
    </template>

    <v-row>
      <v-col>
        <v-btn color="success" @click="writeFile">ดาวน์โหลดไฟล์ JSON สำหรับทำแบบ manual</v-btn>
      </v-col>
    </v-row>

    <pre>{{targetdata}}</pre>
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
      targetdata: [{}],
      targetjson: null,
      fromChild: "", // This value is set to the value emitted by the child
      indexFromChild: "",
      modalVisible: false,
      modalData: null,
      showModal: false,
      video: "",
      checkbool: true,
      targetType: ["3DObject", "Video", "Quiz"]
    };
  },
  /* eslint-disable */
  watch: {
    // whenever num changes, this function will run
    num: function(newValue) {
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
    writeFile: function(event) {
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
    createAPK: function(event) {
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
        axios({
          url: "http://localhost:3000/createTarget",
          timeout: 900000,
          data: this.targetjson,
          method: "POST",
          responseType: "blob" // important
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "appname.zip");
          document.body.appendChild(link);
          link.click();
          axios.post("http://localhost:3000/deleteold");
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
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
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
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
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
        if (x.type == "3DObject") {
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
