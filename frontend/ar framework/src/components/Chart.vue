<template>
  <v-container>
    <canvas id="ChartCnvs" width="400" height="400"></canvas>
  </v-container>
</template>

<script>

// Requiring fs module in which
// writeFile function is defined.
import Chart from "chart.js";
Chart.defaults.global.legend.display = false;
export default {
  name: "Position",
  props: {},
  data() {
    return {
      globalChartRef: null
    };
  },
  created() {},
  mounted() {
    // let globalChartRef;

    // window.addEventListener(
    //   "DOMContentLoaded",
    //   function() {
    //     createGraph();

    //     document.getElementById("ChartCnvs").onmousedown = function(result) {
    //       ourClickHandler(result);
    //     };
    //   },
    //   false
    // );

    this.createGraph();
    document.getElementById("ChartCnvs").onmousedown = this.onMouseDown;

    // function randomColor(alpha) {
    //   return String(
    //     "rgba(" +
    //       Math.round(Math.random() * 255) +
    //       "," +
    //       Math.round(Math.random() * 255) +
    //       "," +
    //       Math.round(Math.random() * 255) +
    //       "," +
    //       alpha +
    //       ")"
    //   );
    // }

    // function ourClickHandler(element) {
    //   let scaleRef, valueX, valueY;

    //   for (var scaleKey in globalChartRef.scales) {
    //     scaleRef = globalChartRef.scales[scaleKey];
    //     if (scaleRef.isHorizontal() && scaleKey == "x-axis-1") {
    //       valueX = scaleRef.getValueForPixel(element.offsetX);
    //     } else if (scaleKey == "y-axis-1") {
    //       valueY = scaleRef.getValueForPixel(element.offsetY);
    //     }
    //   }

    //   if (
    //     valueX > globalChartRef.scales["x-axis-1"].min &&
    //     valueX < globalChartRef.scales["x-axis-1"].max &&
    //     valueY > globalChartRef.scales["y-axis-1"].min &&
    //     valueY < globalChartRef.scales["y-axis-1"].max
    //   ) {
    //     globalChartRef.data.datasets.forEach(dataset => {
    //       dataset.data = [];
    //       dataset.data.push({
    //         x: valueX,
    //         y: valueY,
    //         extraInfo: "info"
    //       });
    //       console.log(dataset.data);
    //     });
    //     globalChartRef.update();
    //   }
    // }

    // function createGraph() {
    //   var config = {
    //     type: "scatter",
    //     data: {
    //       datasets: [
    //         {
    //           label: "Dataset Made of Clicked Points",
    //           data: [],
    //           fill: false,
    //           showLine: true
    //         }
    //       ]
    //     },
    //     options: {
    //       title: {
    //         display: true,
    //         text: "Chart.js Interactive Points"
    //       },
    //       scales: {
    //         xAxes: [
    //           {
    //             type: "linear",
    //             display: true,
    //             scaleLabel: {
    //               display: true,
    //               labelString: "X-Axis"
    //             },
    //             ticks: {
    //               min: -10,
    //               suggestedMax: 10
    //             }
    //           }
    //         ],
    //         yAxes: [
    //           {
    //             display: true,
    //             scaleLabel: {
    //               display: true,
    //               labelString: "Y-Axis"
    //             },
    //             ticks: {
    //               min: -10,
    //               suggestedMax: 10
    //             }
    //           }
    //         ]
    //       },
    //       responsive: true,
    //       maintainAspectRatio: true
    //     }
    //   };

    //   config.data.datasets.forEach(function(dataset) {
    //     dataset.borderColor = randomColor(0.8);
    //     dataset.backgroundColor = randomColor(0.7);
    //     dataset.pointBorderColor = randomColor(1);
    //     dataset.pointBackgroundColor = randomColor(1);
    //     dataset.pointRadius = 7;
    //     dataset.pointBorderWidth = 2;
    //     dataset.pointHoverRadius = 8;
    //   });

    //   var ctx = document.getElementById("ChartCnvs").getContext("2d");
    //   globalChartRef = new Chart(ctx, config);
    // }
  },
  methods: {
    createGraph() {
      var config = {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "Dataset Made of Clicked Points",
              data: [],
              fill: false,
              showLine: true,
              borderColor: this.randomColor(0.8),
              backgroundColor: this.randomColor(0.7),
              pointBorderColor: this.randomColor(1),
              pointBackgroundColor: this.randomColor(1),
              pointRadius: 7,
              pointBorderWidth: 2,
              pointHoverRadius: 8
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Chart.js Interactive Points"
          },
          scales: {
            xAxes: [
              {
                type: "linear",
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "X-Axis"
                },
                ticks: {
                  min: -1,
                  suggestedMax: 1
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Y-Axis"
                },
                ticks: {
                  min: -1,
                  suggestedMax: 1
                }
              }
            ]
          },
          responsive: true,
          maintainAspectRatio: true
        }
      };

    //   for (let dataset of config.data.datasets) {
    //     dataset.borderColor = this.randomColor(0.8);
    //     dataset.backgroundColor = this.randomColor(0.7);
    //     dataset.pointBorderColor = this.randomColor(1);
    //     dataset.pointBackgroundColor = this.randomColor(1);
    //     dataset.pointRadius = 7;
    //     dataset.pointBorderWidth = 2;
    //     dataset.pointHoverRadius = 8;
    //   }

      var ctx = document.getElementById("ChartCnvs").getContext("2d");
      this.globalChartRef = new Chart(ctx, config);
    },
    ourClickHandler(element) {
      let scaleRef, valueX, valueY;

      for (var scaleKey in this.globalChartRef.scales) {
        scaleRef = this.globalChartRef.scales[scaleKey];
        if (scaleRef.isHorizontal() && scaleKey == "x-axis-1") {
          valueX = scaleRef.getValueForPixel(element.offsetX);
        } else if (scaleKey == "y-axis-1") {
          valueY = scaleRef.getValueForPixel(element.offsetY);
        }
      }

      if (
        valueX > this.globalChartRef.scales["x-axis-1"].min &&
        valueX < this.globalChartRef.scales["x-axis-1"].max &&
        valueY > this.globalChartRef.scales["y-axis-1"].min &&
        valueY < this.globalChartRef.scales["y-axis-1"].max
      ) {
        this.globalChartRef.data.datasets.forEach(dataset => {
          dataset.data = [];
          dataset.data.push({
            x: valueX,
            y: valueY,
            extraInfo: "info"
          });
        });
        this.globalChartRef.update();
      }

      this.emitValue(valueX, valueY);
    },
    randomColor(alpha) {
      return String(
        "rgba(" +
          Math.round(Math.random() * 255) +
          "," +
          Math.round(Math.random() * 255) +
          "," +
          Math.round(Math.random() * 255) +
          "," +
          alpha +
          ")"
      );
    },
    onMouseDown(result) {
      this.ourClickHandler(result);
    },
    emitValue(x, y) {
      this.$emit("valueChange", { x, y });
    }
  }

  /* eslint-enable */
};
</script>

<style scope>
#ChartCnvs {
  background-image: url(../assets/chartbg/targetbase.jpg);
  background-size: 395px 400px; 
  background-repeat:no-repeat;
  background-position: 53% 50%;
}
</style>