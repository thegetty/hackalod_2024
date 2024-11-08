<template>
  <div class="p-person">
    <h3>Person</h3>
    <dd>
      <dl></dl>
    </dd>
  </div>
</template>

<script>
import {
  getClassifiedAs,
  getAccessionNumbers,
  getPrimaryName,
} from "@thegetty/linkedart.js";
export default {
  name: "PersonView",
  components: {},
  props: {
    personURI: {
      type: String,
    },
  },
  watch: {
    personURI: {
      immediate: true,
      handler: async function (newURL) {
        if (!newURL) return;
        const response = await fetch(newURL);
        this.lod = await response.json();
        console.log(this.lod);
      },
    },
  },

  data() {
    return { lod: {} };
  },
  computed: {},
};
</script>
<style lang="scss">
@import "./index";
</style>
