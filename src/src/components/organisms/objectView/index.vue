<template>
  <div class="p-object databox">
    <h3>Object</h3>
    <img :src="artistImage" />
    <dd>
      <dl>
        <dt>Accession Number</dt>
        <dd>{{ accessionNumber }}</dd>
        <dt>Stock Number</dt>
        <dd>{{ stockNumber }}</dd>
        <dt>LOD</dt>
        <dd><a :href="lodURL" target="_blank">LOD Data</a></dd>
      </dl>
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
  name: "ObjectView",
  components: {},
  props: {
    lodURL: { type: String },
    artistImage: { type: String },
  },
  watch: {
    lodURL: {
      immediate: true,
      handler: async function (newURL) {
        if (!newURL) return;
        const response = await fetch(newURL);
        this.lod = await response.json();
      },
    },
  },

  data() {
    return { lod: {} };
  },
  computed: {
    accessionNumber: function () {
      return getAccessionNumbers(this.lod).join(", ");
    },
    stockNumber: function () {
      return getClassifiedAs(
        this.lod.identified_by,
        "http://vocab.getty.edu/aat/300412177"
      )?.at(0)?.content;
    },
  },
};
</script>
<style lang="scss">
@import "./index";
</style>
