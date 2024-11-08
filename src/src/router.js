import Vue from "vue";
import Router from "vue-router";
import LayoutBase from "@/views/layout-base.vue";
import HomePage from "@/components/pages/home/index.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: import.meta.env.BASE_URL,
  //defining the scrolling behavior when navigating using Vue router
  //for more options check: https://router.vuejs.org/guide/advanced/scroll-behavior.html
  scrollBehavior(to) {
    if (!("tab" in to.query) && to.hash == "") {
      //scroll to the top of the page unless the URL contains a tab parameter
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      component: LayoutBase,
      children: [
        {
          path: "/",
          name: "home",
          component: HomePage,
        },
      ],
    },
  ],
});
