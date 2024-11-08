<template>
  <div id="app">
    <Ribbon v-if="bannerText != undefined" :text="bannerText" />
    <router-view />
  </div>
</template>

<script>
import { Ribbon } from "@thegetty/getty-ui";
import * as configHelper from "@/helpers/configHelper";

export default {
  name: "App",
  components: {
    Ribbon,
  },
  props: {},
  computed: {
    /**
     * The Path that the App runs at
     */
    path() {
      return configHelper.getConfigValue("BASE_PATH", "/");
    },
    /**
     * The status Banner text
     */
    bannerText() {
      return configHelper.getConfigValue("LOCATION_MESSAGE");
    },
  },
};
</script>

<style></style>
