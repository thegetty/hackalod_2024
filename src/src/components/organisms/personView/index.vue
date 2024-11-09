<template>
  <div class="p-person databox">
    <div class="databox_header">Buyer</div>
    <h3>{{ buyerName }}</h3>
    <img v-if="buyerImage" :src="buyerImage" />
    <p>{{ ulanBio }}</p>
    <hr />
    <p class="subhead">Provenance Notes</p>
    <p class="longtext">{{ bio }}</p>
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
    personURI: { type: String },
    buyerImage: { type: String },
  },
  watch: {
    personURI: {
      immediate: true,
      handler: async function (newURL) {
        if (!newURL) return;
        const response = await fetch(newURL);
        this.lod = await response.json();
      },
    },
    ulan: {
      immediate: true,
      handler: async function (newUlan) {
        if (!newUlan) return;
        const uri = `http://vocab.getty.edu/sparql.json?query=select%20%3Fbio%20%7Bulan%3A${newUlan}%20foaf%3Afocus%2Fgvp%3AbiographyPreferred%2Fschema%3Adescription%20%3Fbio%20.%7D`;
        console.log("ru", uri);
        const response = await fetch(uri);
        let data = await response.json();
        this.ulanBio = data?.results?.bindings?.at(0)?.bio?.value;
      },
    },
    //
  },

  data() {
    return { lod: {}, ulanBio: undefined };
  },
  computed: {
    buyerName: function () {
      return getPrimaryName(this.lod);
    },
    ulan: function () {
      return this.lod["skos:exactMatch"]?.id.split("/").at(-1);
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
