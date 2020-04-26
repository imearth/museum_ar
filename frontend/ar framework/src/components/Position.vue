<template>
<v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
        <v-btn color="primary" block v-on="on">set position</v-btn>
    </template>

    <v-card>

        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="9">
                    <Chart @valueChange="valueChange"></Chart>
                </v-col>
                <v-col cols="3">
                    <!--  
            <v-text-field label="position x input" v-model="p_x"></v-text-field>
            <v-text-field label="position y input" v-model="p_y"></v-text-field>
            <v-text-field label="position z input" v-model="p_z"></v-text-field>
            -->
                    <v-subheader class="pl-0">ตำแหน่งในแนวนอน {{this.p_x}} </v-subheader>
                    <br />
                    <v-subheader class="pl-0">คำแหน่งในแนวตั้ง {{this.p_y}}</v-subheader>
                    <hr />
                    <v-subheader class="pl-0">ระดับความสูง-ลึกของวัตถุที่แสดง</v-subheader>
                    <v-slider v-model="p_z" class="align-center" min="-10" max="10" thumb-label="always" color="green lighten-1" track-color="green lighten-1" thumb-color="green lighten-1" vertical>

                    </v-slider>

                    <v-row>
                        <v-col>
                            <!--  
            <v-text-field label="rotation x input" v-model="r_x"></v-text-field>
            <v-text-field label="rotation y input" v-model="r_y"></v-text-field>
            <v-text-field label="rotation z input" v-model="r_z"></v-text-field>
                -->
                            <v-subheader class="pl-0">หมุนไปด้านข้าง</v-subheader>
                            <br />
                            <v-slider v-model="r_x" min="0" max="360" thumb-label="always" color="green lighten-1" track-color="green lighten-1" thumb-color="green lighten-1"></v-slider>
                            <v-subheader class="pl-0">หมุนในแนวตั้ง</v-subheader>
                            <br />
                            <v-slider v-model="r_y" min="0" max="360" thumb-label="always" color="green lighten-1" track-color="green lighten-1" thumb-color="green lighten-1"></v-slider>
                            <v-subheader class="pl-0">หมุนในด้านหน้า</v-subheader>
                            <br />
                            <v-slider v-model="r_z" min="0" max="360" thumb-label="always" color="green lighten-1" track-color="green lighten-1" thumb-color="green lighten-1"></v-slider>
                            <v-btn color="success" @click="emitToParent">set</v-btn>
                        </v-col>
                    </v-row>
                </v-col>

                <div>
            <h1>Change background image</h1>
            <input id="input" type="file" name="photo" ref="bgfile" @change="setBG">
        </div>
            </v-row>
        </v-container>
    </v-card>
</v-dialog>
</template>

<script>
// Requiring fs module in which
// writeFile function is defined.
import Chart from "../components/Chart.vue";
export default {
    name: "Position",
    components: {
        Chart
    },
    props: {
        msg: String,
        index: Number
    },

    created() {},
    data() {
        return {
            counter: 0,
            p_x: 0,
            p_y: 0,
            p_z: 0,
            r_x: 0,
            r_y: 0,
            r_z: 0,
            pr_data: {},
            dialog: false
        };
    },
    /* eslint-disable */
    watch: {},
    /* eslint-enable */
    /* eslint-disable */
    methods: {
        emitToParent(event) {
            this.pr_data = {
                position_x: `${this.p_x}`,
                position_y: `${this.p_y}`,
                position_z: `${this.p_z}`,
                rotation_x: `${this.r_x}`,
                rotation_y: `${this.r_y}`,
                rotation_z: `${this.r_z}`
            };

            this.$emit("positionSet", {
                index: this.index,
                pr_data: this.pr_data
            });
            this.dialog = false;
        },
        valueChange(value) {
            this.p_x = value.x;
            this.p_y = value.y;
        },
        setBG(evt) {
            const img = evt.target.files[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                document.getElementById("ChartCnvs").style.backgroundImage = `url(${
          reader.result
        })`;
            });

            reader.readAsDataURL(img); // get file url
        }
    }
    /* eslint-enable */
};
</script>
