<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>video {{videoName}}</h2>
        <v-file-input label="Select video" v-model="video" @change="handleVideoUpload"></v-file-input>
        <v-btn :disabled="!Boolean(video)" :loading="isUpload" v-on:click="submitVideo()">Upload</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Requiring fs module in which
// writeFile function is defined.

import axios from "axios";

export default {
  name: "TargetCreate",
  /* eslint-disable */
  components: {},
  /* eslint-enable */
  props: {
    msg: String,
    objectname: String
  },
  data() {
    return {
      video: null,
      isUpload: false,
      canUpload: false,
      videoName: this.name
    };
  },
  created() {
    this.videoName = this.objectname;
  },
  methods: {
    async submitVideo() {
      /*
        Initialize the form data
      */
      let formData = new FormData();

      /*
        Add the form data we need to submit
       */
      formData.append("file", this.video);
      formData.append("name", this.videoName);
      console.log(this.video);
      /*
        Make the request to the POST /single-file URL
      */
      console.log("video uploading");
      this.isUpload = true;
      try {
        await axios.post("http://localhost:3000/uploadVideo", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        this.isUpload = false;
        console.log("SUCCESS!!");
      } catch (error) {
        this.isUpload = false;
        console.log("FAILURE!!");
      }
      // axios
      //   .post("http://localhost:3000/uploadVideo", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   })
      //   .then(function() {
      //     this.isUpload = false;
      //     console.log("SUCCESS!!");
      //   })
      //   .catch(function() {
      //     this.isUpload = false;
      //     console.log("FAILURE!!");
      //   });
    },

    /*
          Handles a change on the file upload
        */
    handleVideoUpload() {
      // this.video = this.$refs.video.files[0];
      this.videoName = `${this.videoName.split(".")[0]}.${this.video.name
        .split(".")
        .pop()}`;
    }
  }
};
</script>
