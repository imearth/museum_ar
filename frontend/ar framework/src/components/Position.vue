<template>
<v-container>
    <v-row align="center" justify="center">
        <v-col cols="9">

            <Chart @valueChange="valueChange"></Chart>
        </v-col>
        <v-col cols="3" >
            <!--  
            <v-text-field label="position x input" v-model="p_x"></v-text-field>
            <v-text-field label="position y input" v-model="p_y"></v-text-field>
            <v-text-field label="position z input" v-model="p_z"></v-text-field>
        -->
            <v-slider v-model="p_z" min="-10" max="10" label="ความสูงขอบวัตถุ" color="green lighten-1" track-color="green lighten-1" thumb-color="green lighten-1" vertical></v-slider>

            <v-row>
                <v-col>
                    <!--  
            <v-text-field label="rotation x input" v-model="r_x"></v-text-field>
            <v-text-field label="rotation y input" v-model="r_y"></v-text-field>
            <v-text-field label="rotation z input" v-model="r_z"></v-text-field>
        -->
                    <v-slider v-model="r_x" min="-10" max="10" label="หมุนในแกนนอน" color="green lighten-1" track-color="green lighten-1" thumb-color="green lighten-1"></v-slider>
                    <v-slider v-model="r_y" min="-10" max="10" label="หมุนในแกนตั้ง" color="green lighten-1" track-color="green lighten-1" thumb-color="green lighten-1"></v-slider>
                    <v-slider v-model="r_z" min="-10" max="10" label="หมุนในแกน z" color="green lighten-1" track-color="green lighten-1" thumb-color="green lighten-1"></v-slider>
                    <v-btn color="success" @click="emitToParent" >set</v-btn>
                </v-col>
                
            </v-row>
        </v-col>
    </v-row>

    
</v-container>
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
            pr_data: {}
        };
    },
    /* eslint-disable */
    watch: {},
    /* eslint-enable */
    /* eslint-disable */
    methods: {
        emitToParent(event) {
            this.pr_data = {
                position_x: this.p_x,
                position_y: this.p_y,
                position_z: this.p_z,
                rotation_x: this.r_x,
                rotation_y: this.r_y,
                rotation_z: this.r_z
            };

            console.log(this.pr_data);
            this.$emit("childToParent", this.pr_data);
            this.$emit("IndexchildToParent", this.index);
        },
        valueChange(value) {
          console.log(value);
          this.p_x = value.x;
          this.p_y = value.y;
        }
    }
    /* eslint-enable */
};
</script>
