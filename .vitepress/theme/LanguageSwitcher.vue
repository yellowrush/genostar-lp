<script setup lang="ts">
import { ref, computed } from 'vue';
import { useData, withBase } from 'vitepress';

const { site, localeIndex } = useData();

const isOpen = ref(false);

// Define available locales
const locales = computed(() => {
  const siteLocales = site.value.locales;
  return Object.entries(siteLocales).map(([key, locale]) => ({
    key,
    label: locale.label,
    link: withBase(key === 'root' ? '/' : `/${key}/`),
  }));
});

// Get current locale label
const currentLabel = computed(() => {
  const current = locales.value.find(
    (l) => l.key === (localeIndex.value || 'root')
  );
  return current?.label || '日本語';
});

function toggle() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}
</script>

<template>
  <div class="lang-switcher" @mouseleave="closeMenu">
    <button class="lang-switcher-btn" @click="toggle" aria-label="Select Language">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lang-icon"
      >
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
      </svg>
      <span class="lang-label">{{ currentLabel }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="chevron-icon"
        :class="{ open: isOpen }"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
    <div v-show="isOpen" class="lang-dropdown">
      <a
        v-for="locale in locales"
        :key="locale.key"
        :href="locale.link"
        class="lang-option"
        :class="{ active: locale.label === currentLabel }"
        @click="closeMenu"
      >
        {{ locale.label }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
  margin-left: auto;
}

.lang-switcher-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--primary-dark);
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.lang-switcher-btn:hover {
  background: rgba(0, 89, 179, 0.08);
}

.lang-icon {
  flex-shrink: 0;
}

.lang-label {
  white-space: nowrap;
}

.chevron-icon {
  flex-shrink: 0;
  transition: transform 0.2s;
}

.chevron-icon.open {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  min-width: 120px;
  overflow: hidden;
  z-index: 10000;
}

.lang-option {
  display: block;
  padding: 10px 16px;
  text-decoration: none;
  color: var(--text-main);
  font-size: 14px;
  transition: background-color 0.2s;
}

.lang-option:hover {
  background: var(--bg-light);
}

.lang-option.active {
  color: var(--primary);
  font-weight: 600;
}
</style>
