<template>
<div>
    <div class="container">
       
        <div class="large-12 medium-12 small-12 cell">
            <label>video  {{objectname}}
                <br>
                <input type="file" id="video" ref="video" v-on:change="handleVideoUpload()" />
            </label>
            <button v-on:click="submitVideo()">Submit</button>
        </div>
    </div>
</div>
</template>

<script>
// Requiring fs module in which
// writeFile function is defined.

import axios from "axios";

export default {
    name: "TargetCreate",
    /* eslint-disable */
    components: {
    },
    /* eslint-enable */
    props: {
        msg: String,
        objectname:String
    },
    data() {
        return {
            video: ""
        };
    },
    methods: {
        submitVideo() {
            /*
                    Initialize the form data
                */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.video);
            formData.append('name', this.objectname);
            console.log(formData.name)
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
