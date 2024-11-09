<template>
  <div class="p-person databox">
    <h3>Buyer</h3>
    <dl>
      <dt>name</dt>
      <dd>{{ buyerName }}</dd>

      <dt>Star Bio</dt>
      <dd>{{ bio }}</dd>
      <dt>URI</dt>
      <dd><a :href="personURI" target="_blank">LOD Data</a></dd>
      <dt>ULAN URI</dt>
      <dd>
        <a :href="ulan" target="_blank">ULAN Record</a>
      </dd>
    </dl>
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
        console.log("person", JSON.stringify(this.lod));
      },
    },
  },

  data() {
    return { lod: {} };
  },
  computed: {
    ulan: function () {
      return this.lod["skos:exactMatch"]?.id;
    },
    buyerName: function () {
      return getPrimaryName(this.lod);
    },
    bio: function () {
      return getClassifiedAs(
        this.lod?.referred_to_by,
        "http://vocab.getty.edu/aat/300435422"
      )
        ?.map((x) => x.content)
        .join("; ");
    },
  },
};
</script>
<style lang="scss">
@import "./index";
</style>
