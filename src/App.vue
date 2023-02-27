<template>
  <router-view v-slot="{ Component, route }">
    
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
</template>

<script>

</script>

<style>
.fade-enter-active{
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>