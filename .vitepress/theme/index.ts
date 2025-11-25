// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue';
import type { Theme } from 'vitepress';
import { defineComponent } from 'vue';
import './style.css';
import LanguageSwitcher from './LanguageSwitcher.vue';

const Empty = defineComponent({
  name: 'VpEmpty',
  setup() {
    return () => null;
  },
});

export default {
  Layout,
  enhanceApp({ app }) {
    // Register no-op components to override common theme color-mode/toggle components
    // This removes the dark-mode button without relying on CSS.
    const names = [
      'ColorMode',
      'VPColorMode',
      'ThemeToggle',
      'VPThemeToggle',
      'ThemeMode',
      'VPThemeMode',
      'VpColorMode',
    ];
    names.forEach((n) => app.component(n, Empty));

    // Register the language switcher component
    app.component('LanguageSwitcher', LanguageSwitcher);
  },
} satisfies Theme;
