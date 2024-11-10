<template>
  <div class="p-object databox">
    <div class="databox_header">Artist Information</div>
    <h3 class="p-object__artist-name">{{ artistName.toLowerCase() }}</h3>
    <img :src="artistImage" />
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
  name: "ArtistView",
  components: {},
  props: {
    lodURL: { type: String, default: undefined },
    artistImage: { type: String, default: undefined },
  },

  data() {
    return {
      objectLOD: {},
      artistLOD: {},
      ulanBio: undefined,
      ulanNote: undefined,
    };
  },
  computed: {
    artistName: function () {
      return getPrimaryName(this.artistLOD);
    },
    ulan: function () {
      return this.artistLOD["skos:exactMatch"]?.id.split("/").at(-1);
    },
    bio: function () {
      return getClassifiedAs(
        this.artistLOD?.referred_to_by,
        "http://vocab.getty.edu/aat/300435422"
      )
        ?.map((x) => x.content)
        .join("; ");
    },
  },
  watch: {
    lodURL: {
      immediate: true,
      handler: async function (newURL) {
        if (!newURL) return;
        let response = await fetch(newURL);
        this.objectLOD = await response.json();
        let artistURL =
          this.objectLOD?.produced_by?.part?.carried_out_by?.at(0)?.id;
        console.log("artistURL", artistURL);
        if (artistURL) {
          let response = await fetch(artistURL);
          this.artistLOD = await response.json();
        }
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
