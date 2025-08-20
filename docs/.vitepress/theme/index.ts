import Theme from 'vitepress/theme';
import { App, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import 'yc-design-vue/es/style.css';
import '@arco-design/web-vue/dist/arco.css';
import '../style/custom.less';

export default {
  extends: Theme,
  enhanceApp: async ({ app }: { app: App }) => {
    if (typeof window === 'undefined') return;
    const YcDesign = await import('yc-design-vue');
    const ArcoIcon = await import('@arco-design/web-vue/es/icon');
    app.use(YcDesign.default);
    app.use(ArcoIcon.default);
  },
  setup() {
    const route = useRoute();
    watch(
      () => route.path,
      async () => {
        await nextTick();
        if (typeof document === 'undefined') return;
        document?.querySelectorAll('details')?.forEach((details) => {
          const summary = details.querySelector('summary');
          if (!summary) {
            return;
          }
          summary.onclick = () => {
            if (details.hasAttribute('open')) {
              details.removeAttribute('open');
            } else {
              details.setAttribute('open', 'true');
            }
          };
        });
      },
      {
        immediate: true,
      }
    );
  },
};
