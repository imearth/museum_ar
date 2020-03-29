<template>
<div>
    <label>Quiz name</label>
    <input type="text" v-model="name" readonly/>
    <br />
    <label>TimeLimit</label>
    <input type="number" v-model="timeLimitInSeconds" />
    <br />
    <label>จำนวนคำถาม </label>
    <input type="number" min="1" v-model="num" />
    <hr />
    {{questions}}

    <div v-for="(item, i) in questions" :key="i">
        <label>Question Text</label>
        <input type="text" v-model="item.questionText" />
        <br />
        <label>Answer 1</label>
        <input type="text" v-model="item.answers[0].answerText" />
        <input type="checkbox" id="checkbox" v-model="item.answers[0].isCorrect">
        <label for="checkbox">{{ item.answers[0].isCorrect }}</label>
        <br>

        <label>Answer 2</label>
        <input type="text" v-model="item.answers[1].answerText" />
        <input type="checkbox" id="checkbox" v-model="item.answers[1].isCorrect">
        <label for="checkbox">{{ item.answers[1].isCorrect }}</label>
        <br>

        <label>Answer 3</label>
        <input type="text" v-model="item.answers[2].answerText" />
        <input type="checkbox" id="checkbox" v-model="item.answers[2].isCorrect">
        <label for="checkbox">{{ item.answers[2].isCorrect }}</label>
        <br>

        <label>Answer 4</label>
        <input type="text" v-model="item.answers[3].answerText" />
        <input type="checkbox" id="checkbox" v-model="item.answers[3].isCorrect">
        <label for="checkbox">{{ item.answers[3].isCorrect }}</label>
        <br>
        <hr />
    </div>
    <br />
    <div v-if="this.checkboolq===true">
        <button @click="createQuizfile">สร้าง quiz</button>
    </div>
    <button @click="writeFile">ดาวน์โหลดไฟล์ JSON สำหรับทำแบบ manual</button>
</div>
</template>

<script>
// Requiring fs module in which
// writeFile function is defined.
import axios from "axios";
export default {
    name: "QuizCreate",
    /* eslint-disable */
    components: {},
    /* eslint-enable */
    props: {
        msg: String,
        objectname: String,
        checkboolq: Boolean

    },
    data() {
        return {
            allRoundData: [],
            name: this.objectname,
            timeLimitInSeconds: 15,
            pointsAddedForCorrectAnswer: 1,
            questions: [],
            num: 0
        };
    },
    /* eslint-disable */
    watch: {
        // whenever num changes, this function will run
        num: function (newValue, oldValue) {
            this.questions = [];
            for (let i = 0; i < newValue; i++) {
                this.questions.push({
                    questionText: "",
                    answers: [{
                        isCorrect: false
                    }, {
                        isCorrect: false
                    }, {
                        isCorrect: false
                    }, {
                        isCorrect: false
                    }]
                });
            }
        }

    },
    /* eslint-enable */
    methods: {
        writeFile: function (event) {
            // `event` is the native DOM event
            if (event) {

                let filename = this.name + ".JSON"
                this.targetjson = {
                    allRoundData: [{
                        name: this.name,
                        timeLimitInSeconds: this.timeLimitInSeconds,
                        questions: this.questions
                    }]
                };
                var FileSaver = require("file-saver");
                var blob = new Blob([JSON.stringify(this.targetjson, null, 2)], {
                    type: "text/plain;charset=utf-8"
                });
                FileSaver.saveAs(blob, filename);
                
            }
        },
        createQuizfile: function (event) {
            // `event` is the native DOM event
            if (event) {
                let allRoundData = [{
                    name: this.name,
                    timeLimitInSeconds: this.timeLimitInSeconds,
                    questions: this.questions
                }]
                axios.post("http://localhost:3000/createQuiz", {
                    allRoundData
                }).then(res => {
                    console.log(res)
                }).catch(console.error());
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
