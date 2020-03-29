<template>
  <div>
    <div>
      <hr />
      <br />
      <label for="n_x-input">position_x input:</label>
      <input id="position_x-input" type="text" name="_msg" v-model="p_x " />
      <br />
      <label for="position_y-input">position_y input:</label>
      <input id="position_y-input" type="text" name="msg" v-model="p_y " />
      <br />
      <label for="position_z-input">position_z input:</label>
      <input id="positio_z-input" type="text" name="msg" v-model="p_z" />
      <br />
      <label for="r_x-input">rotation_x input:</label>
      <input id="rotation_x-input" type="text" name="msg" v-model="r_x " />
      <br />
      <label for="rotation_y-input">rotation_y input:</label>
      <input id="rotation_y-input" type="text" name="msg" v-model="r_y " />
      <br />
      <label for="rotation_z-input">rotation_z input:</label>
      <input id="rotation_z-input" type="text" name="msg" v-model="r_z" />
      <br />
      <hr />
      <button type="button" name="button" v-on:click="emitToParent">Click me to increment!</button>
    </div>
  </div>
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
