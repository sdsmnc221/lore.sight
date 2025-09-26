<template>
  <div
    class="menu-container w-[320px] h-[160px] fixed bottom-[-32vw] left-1/2 translate-x-[-50%]"
  >
    <div class="menu-wrapper" ref="menuRef">
      <menu>
        <li
          v-for="(item, index) in menuItems"
          :key="item.id"
          :style="{ '--index': index }"
        >
          <button
            :class="{ active: item.id === activeMarker }"
            @click="selectItem(item)"
          >
            {{ item.label }}
          </button>
        </li>
      </menu>
      <LiquidRainbowButton
        class="menu-button w-[160px] h-[160px] flex top-[-10%] scale-[0.72] md:scale-[1]"
        @click="revolve()"
      >
        <MorphingText
          :texts="['Lores Browser', 'Turn the Orb']"
          className="text-2xl md:text-5xl text-white cursor-pointer absolute top-12"
          :morphTime="3.2"
          :cooldownTime="1.5"
        />
      </LiquidRainbowButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import LiquidRainbowButton from "./LiquidRainbowButton.vue";
import MorphingText from "./MorphingText.vue";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

defineProps<{
  activeMarker?: string;
}>();

const emit = defineEmits<{
  selectMarker: [markerId: string];
}>();

const menuRef = ref<HTMLElement>();
const isRevolved = ref(false);

const menuItems: MenuItem[] = [
  { id: "train-ticket-en", label: "🚂 Train EN", icon: "🚂" },
  { id: "train-ticket-vn", label: "🚄 Train VN", icon: "🚄" },
  { id: "sky-ticket-a", label: "☁️ Sky A", icon: "☁️" },
  { id: "sky-ticket-b", label: "🌤️ Sky B", icon: "🌤️" },
  { id: "capybara", label: "🦫 Capybara", icon: "🦫" },
  { id: "starburst", label: "✨ Ugly Starbust", icon: "✨" },
];

const revolve = () => {
  if (!menuRef.value) return;

  const menuItems = menuRef.value.querySelectorAll("li");
  const animationName = isRevolved.value ? "rev2" : "rev1";

  menuItems.forEach((li) => {
    (li as HTMLElement).style.animationName = animationName;
  });

  isRevolved.value = !isRevolved.value;

  console.log(menuRef.value);
};

const selectItem = (item: MenuItem) => {
  emit("selectMarker", item.id);
};

onMounted(() => {
  // Set up intersection observer for accessibility
  if (menuRef.value) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          (entry.target as HTMLElement).style.visibility = !entry.isIntersecting
            ? "hidden"
            : "visible";
        }),
      { root: menuRef.value.closest("main"), threshold: 0.5 }
    );

    const menuItems = menuRef.value.querySelectorAll("li");
    menuItems.forEach((li) => observer.observe(li));
  }
});
</script>

<style lang="scss" scoped>
li {
  offset: padding-box 0deg;
  offset-distance: calc((sibling-index() - 1) * var(--gap));
  animation: 1s forwards;
  animation-composition: add;
}

/* other styles */

.menu-wrapper {
  display: grid;
  place-items: center;
  transform: translateY(-59px);
  menu,
  .menu-button {
    grid-area: 1 / 1;
    border-radius: 50%;
  }
  .menu-button {
    color: white;
    transition: --angle 0.2s;
  }
  menu {
    padding: 40px 80px;
    --gap: calc(100% / 6); /* increased gap between menu items */
    li {
      width: max-content;

      button {
        appearance: none;
        border: none;
        font: inherit;
        cursor: pointer;
        overflow: clip;
        background: linear-gradient(
          135deg,
          rgba(5, 150, 105, 0.9),
          rgba(16, 185, 129, 0.7)
        );
        color: #f0fdf4;
        font-family: "Kalam", cursive;
        font-size: 10px;
        font-weight: 500;
        padding: 8px 12px;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;

        &:hover {
          transform: scale(1.1);
          background: linear-gradient(
            135deg,
            rgba(16, 185, 129, 1),
            rgba(251, 191, 36, 0.8)
          );
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
          color: #064e3b;
        }

        &.active {
          background: linear-gradient(
            135deg,
            rgba(251, 191, 36, 0.9),
            rgba(245, 158, 11, 0.8)
          );
          color: #064e3b;
          font-weight: 700;
          box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
        }
      }
    }
  }
}

header {
  text-align: center;
  h1 {
    font-size: 16px;
    margin-bottom: 0;
  }
  p {
    margin-top: 0;
  }
}
main {
  height: 260px;
  aspect-ratio: 1;
  contain: strict;
  border: 10px solid;
  overflow: clip;
}

@supports not (order: sibling-index()) {
  li:nth-of-type(2) {
    offset-distance: calc(1 * var(--gap));
  }
  li:nth-of-type(3) {
    offset-distance: calc(2 * var(--gap));
  }
  li:nth-of-type(4) {
    offset-distance: calc(3 * var(--gap));
  }
  li:nth-of-type(5) {
    offset-distance: calc(4 * var(--gap));
  }
  li:nth-of-type(6) {
    offset-distance: calc(5 * var(--gap));
  }
}
@layer reset {
  button {
    appearance: none;
    border: unset;
    font: unset;
    cursor: pointer;
    overflow: clip;
    background: none;
  }
  menu {
    list-style-type: none;
  }
}
body {
  margin: 0;
  height: 100vh;
  display: grid;
  font: 12px poppins;
  place-content: center;
  user-select: none;
  -webkit-user-select: none;
  cursor: default;
}
</style>
