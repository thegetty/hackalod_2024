import { shallowMount, createLocalVue } from "@vue/test-utils";
import Home from "./index.vue";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
import { messages } from "@/locales/index.js";

localVue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

describe("Home", () => {
  const wrapper = shallowMount(Home, {
    propsData: {
      path: "/",
    },
    localVue,
    i18n,
  });

  it("Is a vue component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
