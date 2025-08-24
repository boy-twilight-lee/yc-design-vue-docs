import Theme from 'vitepress/theme';
import {
  ref,
  provide,
  watch,
  nextTick,
  h,
  onMounted,
  onBeforeUnmount,
} from 'vue';
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
    // 处理暗色主题
    let observer: MutationObserver | null = null;
    const isDark = ref(false);
    provide('isDark', isDark);
    onMounted(() => {
      const htmlElement = document.documentElement;
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName !== 'class') return;
          if ((mutation.target as HTMLElement).classList.contains('dark')) {
            document.body.setAttribute('arco-theme', 'dark');
            isDark.value = true;
          } else {
            document.body.removeAttribute('arco-theme');
            isDark.value = false;
          }
        });
      });
      observer.observe(htmlElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    });
    // 在组件卸载前执行，这是非常重要的一步！
    onBeforeUnmount(() => {
      observer?.disconnect();
    });
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
