<template>
  <div class="p-person databox">
    <div class="databox_header">Buyer Information</div>
    <h3>{{ buyerName }}</h3>
    <img v-if="buyerImage" :src="buyerImage" />
    <p class="short_bio">{{ ulanBio }}</p>
    <div v-if="ulanNote">
      <hr />
      <p class="subhead">ULAN Notes</p>
      <p class="longtext">{{ ulanNote }}</p>
    </div>
    <div v-if="bio">
      <hr />
      <p class="subhead">Provenance Notes</p>
      <p class="longtext">{{ bio }}</p>
    </div>
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
    personURI: { type: String, default: undefined },
    buyerImage: { type: String, default: undefined },
  },

  data() {
    return { lod: {}, ulanBio: undefined, ulanNote: undefined };
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
    // accessionNumber: function () {
    //   return getAccessionNumbers(this.objectLOD).join(", ");
    // },
    // stockNumber: function () {
    //   return getClassifiedAs(
    //     this.objectLOD.identified_by,
    //     "http://vocab.getty.edu/aat/300412177"
    //   )?.at(0)?.content;
    // },
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
        const bioQuery = `https://vocab.getty.edu/sparql.json?query=select%20%3Fbio%20%7Bulan%3A${newUlan}%20foaf%3Afocus%2Fgvp%3AbiographyPreferred%2Fschema%3Adescription%20%3Fbio%20.%7D`;
        let response = await fetch(bioQuery);
        let data = await response.json();
        this.ulanBio = data?.results?.bindings?.at(0)?.bio?.value;

        const noteQuery = `https://vocab.getty.edu/sparql.json?query=select%20%3Fnote%20%7Bulan%3A${newUlan}%20skos%3AscopeNote%2Frdf%3Avalue%20%3Fnote%20.%7D`;
        response = await fetch(noteQuery);
        data = await response.json();
        this.ulanNote = data?.results?.bindings?.at(0)?.note?.value;
      },
    },
  },
};
</script>
<style lang="scss">
@import "./index";
</style>
