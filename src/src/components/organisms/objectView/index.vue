<template>
  <div class="p-object">
    <dd>
      <dl>
        <dt>title</dt>
        <dd>{{ title }}</dd>
        <dt>Accession Number</dt>
        <dd>{{ accessionNumber }}</dd>
        <dt>Stock Number</dt>
        <dd>{{ stockNumber }}</dd>
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
    lodURL: {
      type: String,
    },
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
    title: function () {
      return getPrimaryName(this.lod, {
        requestedClassifications: "http://vocab.getty.edu/aat/300417193",
      });
    },
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
