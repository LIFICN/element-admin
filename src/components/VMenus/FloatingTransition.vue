<template>
  <Transition name="floating-transition">
    <slot />
  </Transition>
</template>

<script setup></script>

<style lang="scss" scoped>
.floating-transition {
  will-change: transform, opacity;
}

.floating-transition-enter-active,
.floating-transition-leave-active {
  opacity: 1;
  transform: scale(1, 1);
  transition: 0.3s transform, 0.3s opacity;
  transform-origin: top left;
}

.floating-transition-enter-from,
.floating-transition-leave-active {
  opacity: 0;
  transform: scale(0.45, 0.45);
}
</style>
