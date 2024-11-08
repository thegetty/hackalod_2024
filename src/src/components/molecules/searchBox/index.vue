<template>
  <div class="m-searchbox">
    <input class="m-searchbox__input" type="search" @input="handleSearch" />
    <GuiButton
      :aria-label="$t('aria-search-button-label')"
      ref="searchButton"
      name="searchButton"
      class="m-searchbox__button"
    >
      <Icon :name="'search'" />
    </GuiButton>
    <ul v-if="suggestions" class="m-searchbox__suggestions">
      <li
        v-for="suggestion of suggestions"
        :key="suggestion.postId"
        class="m-searchbox__suggestion"
        @click="handleClick($event, suggestion)"
      >
        <span class="m-searchbox__suggestion--artist">{{
          suggestion.item.art_authority
        }}</span>
        <span class="m-searchbox__suggestion--title">{{
          suggestion.item.title
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Fuse from "fuse.js";

import { GuiButton, Icon } from "@thegetty/getty-ui";
import knoedler from "@/data/knoedler-index.json";

export default {
  name: "SearchBox",
  components: {
    GuiButton,
    Icon,
  },
  emits: ["searchUpdate"],
  data() {
    return {
      documents: knoedler,
      index: undefined,
      fuseOptions: {
        threshold: 0.3,
        keys: ["title", "name", "art_authority"],
      },
      fuse: undefined,
      suggestions: undefined,
    };
  },
  mounted() {
    this.fuse = new Fuse(this.documents, this.fuseOptions);
  },
  methods: {
    handleSearch(e) {
      if (e.target.value) {
        this.suggestions = this.fuse.search(e.target.value);
      } else {
        this.suggestions = undefined;
      }
    },
    handleClick(e, suggestion) {
      this.$emit("searchUpdate", suggestion.item);
    },
  },
};
</script>

<style lang="scss">
@import "./index";
</style>
