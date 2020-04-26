<template>
  <v-dialog width="50%" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn :disabled="!Boolean(objectname)" rounded block v-on="on">สร้าง Quiz</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field label="Quiz name" v-model="objectname" outlined readonly></v-text-field>
            <v-text-field label="TimeLimit" v-model="timeLimitInSeconds" type="number"></v-text-field>
            <v-text-field label="จำนวนคำถาม" v-model="num" type="number" min="1"></v-text-field>
          </v-col>
        </v-row>
        <v-row v-for="(item, i) in questions" :key="i">
          <v-col>
            <v-text-field outlined :label="`คำถามที่ ${i+1}`" v-model="item.questionText"></v-text-field>

            <div v-for="i in 4" :key="i">
              <v-row>
                <v-col>
                  <v-text-field :label="`Answer ${i}`" v-model="item.answers[i-1].answerText"></v-text-field>
                </v-col>
                <v-col>
                  <v-switch
                    v-model="item.answers[i-1].isCorrect"
                    :label="`is correct ${item.answers[i-1].isCorrect}`"
                  ></v-switch>
                </v-col>
              </v-row>
            </div>
            <v-divider></v-divider>

            <!-- 
            <br />
        <label>Answer 1</label>
        <input type="text" v-model="item.answers[0].answerText" />
        <input type="checkbox" id="checkbox" v-model="item.answers[0].isCorrect" />
        <label for="checkbox">{{ item.answers[0].isCorrect }}</label>
        <br />

        <label>Answer 2</label>
        <input type="text" v-model="item.answers[1].answerText" />
        <input type="checkbox" id="checkbox" v-model="item.answers[1].isCorrect" />
        <label for="checkbox">{{ item.answers[1].isCorrect }}</label>
        <br />

        <label>Answer 3</label>
        <input type="text" v-model="item.answers[2].answerText" />
        <input type="checkbox" id="checkbox" v-model="item.answers[2].isCorrect" />
        <label for="checkbox">{{ item.answers[2].isCorrect }}</label>
        <br />

        <label>Answer 4</label>
        <input type="text" v-model="item.answers[3].answerText" />
        <input type="checkbox" id="checkbox" v-model="item.answers[3].isCorrect" />
        <label for="checkbox">{{ item.answers[3].isCorrect }}</label>
        <br />
        <hr /> 
            -->
          </v-col>
        </v-row>
      
        <v-row>
          <v-col v-if="checkboolq">
            <div>
              <v-btn @click="createQuizfile">สร้าง quiz</v-btn>
            </div>
          </v-col>
          <v-col>
            <v-btn @click="writeFile">ดาวน์โหลดไฟล์ JSON สำหรับทำแบบ manual</v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn @click="dialog=false" color="#EF9A9A">ปิด</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
// Requiring fs module in which
// writeFile function is defined.
import axios from "axios";
export default {
  //   name: "QuizCreate",
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
      dialog: false,
      num: 0
    };
  },
  /* eslint-disable */
  watch: {
    // whenever num changes, this function will run
    num: function(newValue, oldValue) {
      this.questions = [];
      for (let i = 0; i < newValue; i++) {
        this.questions.push({
          questionText: "",
          answers: [
            {
              isCorrect: false
            },
            {
              isCorrect: false
            },
            {
              isCorrect: false
            },
            {
              isCorrect: false
            }
          ]
        });
      }
    }
  },
  /* eslint-enable */
  methods: {
    writeFile: function(event) {
      // `event` is the native DOM event
      if (event) {
        let filename = this.objectname + ".JSON";
        this.targetjson = {
          allRoundData: [
            {
              name: this.objectname,
              timeLimitInSeconds: this.timeLimitInSeconds,
              questions: this.questions
            }
          ]
        };
        var FileSaver = require("file-saver");
        var blob = new Blob([JSON.stringify(this.targetjson, null, 2)], {
          type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(blob, filename);
      }
    },
    createQuizfile: function(event) {
      // `event` is the native DOM event
      if (event) {
      console.log('create quiz file');
        let allRoundData = [
          {
            name: this.objectname,
            timeLimitInSeconds: this.timeLimitInSeconds,
            questions: this.questions
          }
        ];
        axios
          .post("http://localhost:3000/createQuiz", {
            allRoundData
          })
          .then(res => {
            console.log(res);
          })
          .catch((err)=> {
            console.error(err);
          });
      }
    }
  }
};
</script>
