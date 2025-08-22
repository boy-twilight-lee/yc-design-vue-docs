import Theme from 'vitepress/theme';
import { watch, nextTick, h } from 'vue';
import { useRoute } from 'vitepress';
import vitepressNprogress from 'vitepress-plugin-nprogress';
import 'vitepress-plugin-nprogress/lib/css/index.css';
import 'yc-design-vue/es/style.css';
import '@arco-design/web-vue/dist/arco.css';
import '../style/custom.less';
import '../style/global.less';
import { HeroImage } from '../components/hero-image';
import { FieldTable } from '../components/field-table';

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
  enhanceApp: async (ctx) => {
    vitepressNprogress(ctx);
    const { app } = ctx;
    if (isServerRendering) return;
    const YcDesign = await import('yc-design-vue');
    const ArcoIcon = await import('@arco-design/web-vue/es/icon');
    app.use(YcDesign.default);
    app.use(ArcoIcon.default);
    app.component('FieldTable', FieldTable);
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
