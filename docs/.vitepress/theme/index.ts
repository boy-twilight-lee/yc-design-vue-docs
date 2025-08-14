import DefaultTheme from 'vitepress/theme';
import { App } from 'vue';
import YcDesignVue from 'yc-design-vue';
import 'yc-design-vue/es/style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(YcDesignVue);
  },
};
