<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="position x input" v-model="p_x"></v-text-field>
        <v-text-field label="position y input" v-model="p_y"></v-text-field>
        <v-text-field label="position z input" v-model="p_z"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="rotation x input" v-model="r_x"></v-text-field>
        <v-text-field label="rotation y input" v-model="r_y"></v-text-field>
        <v-text-field label="rotation z input" v-model="r_z"></v-text-field>
      </v-col>
    </v-row>
    <v-btn color="success" @click="emitToParent">set</v-btn>
  </v-container>
</template>

<script>
// Requiring fs module in which
// writeFile function is defined.
export default {
  name: "Position",
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
    }
  }
  /* eslint-enable */
};
</script>
