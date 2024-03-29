import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as echarts from "echarts";
import store from "@/store/index.js";
import { mapState } from "vuex";
import MagnifierHb from "magnifier-hb";
import "magnifier-hb/lib/hb.css";
import Pagination from "ant-design-vue/lib/pagination";
import PaginationHb from "pagination-hb";
import "pagination-hb/lib/hb.css";

import VMdEditor from "@kangc/v-md-editor/lib/codemirror-editor";
import "@kangc/v-md-editor/lib/style/codemirror-editor.css";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// highlightjs
import hljs from "highlight.js";

// codemirror 编辑器的相关资源
import Codemirror from "codemirror";
// mode
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/vue/vue";
// edit
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
// placeholder
import "codemirror/addon/display/placeholder";
// active-line
import "codemirror/addon/selection/active-line";
// scrollbar
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/scroll/simplescrollbars.css";
// style
import "codemirror/lib/codemirror.css";

VMdEditor.Codemirror = Codemirror;

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
const app = createApp(App);
app
  .use(VMdEditor)
  .use(VMdPreview)
  .use(MagnifierHb)
  .use(PaginationHb)
  .use(router)
  .use(store)
  .component("Pagination", Pagination)
  .mount("#app");
app.provide("echarts", echarts);
router.beforeEach((to, from, next) => {
  const islogin = store.state.login.islogin;

  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  if (to.path.includes("/backgarden") && !islogin && !from.path.includes("/login")) {
    // 如果未登录跳转到登录
    router.replace("/login");
    return;
  }
  next();
});
