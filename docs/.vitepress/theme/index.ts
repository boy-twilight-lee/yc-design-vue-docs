import DefaultTheme from 'vitepress/theme';
import { App } from 'vue';
import YcDesignVue from 'yc-design-vue';
import 'yc-design-vue/es/style.css';
import ArcoIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import '../style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(YcDesignVue);
    app.use(ArcoIcon);
  },
};
