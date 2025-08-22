import Theme from 'vitepress/theme';
import { App, watch, nextTick, h } from 'vue';
import { useRoute } from 'vitepress';
import 'yc-design-vue/es/style.css';
import '@arco-design/web-vue/dist/arco.css';
import '../style/custom.less';
import '../style/global.less';
import { HeroImage } from '../components/hero-image';
// 是否是服务端渲染
export const isServerRendering = (() => {
  try {
    return !(typeof window !== 'undefined' && document !== undefined);
  } catch (e) {
    return true;
  }
})();

export default {
  extends: Theme,
  enhanceApp: async ({ app }: { app: App }) => {
    if (isServerRendering) return;
    const YcDesign = await import('yc-design-vue');
    const ArcoIcon = await import('@arco-design/web-vue/es/icon');
    app.use(YcDesign.default);
    app.use(ArcoIcon.default);
  },
  Layout() {
    return h(Theme.Layout, null, {
      'home-hero-image': () => h(HeroImage),
    });
  },
  setup() {
    if (isServerRendering) return;
    // route信息
    const route = useRoute();
    watch(
      () => route.path,
      async () => {
        await nextTick();
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
