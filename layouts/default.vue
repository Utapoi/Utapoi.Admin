<script setup lang="ts">

const route = useRoute();

</script>
<template>
  <div class="min-w-screen min-h-screen flex">
    <div class="w-20 min-h-full flex gap-1 flex-col items-center dark:text-mocha-text p-3">
      <!-- Home -->
      <NuxtLink
        to="/"
        class="hover:dark:bg-mocha-overlay0/25 hover:bg-latte-overlay0/25 border-rounded-xl p-3"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path === '/',
        }"
      >
        <div class="i-fluent:home-32-regular text-xl"></div>
      </NuxtLink>

      <!-- Stats -->
      <NuxtLink
        to="/stats"
        class="hover:dark:bg-mocha-overlay0/25 hover:bg-latte-overlay0/25 border-rounded-xl p-3"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path === '/stats',
        }"
      >
        <div class="i-fluent:chart-multiple-24-regular text-xl"></div>
      </NuxtLink>

      <!-- Users -->
      <NuxtLink
        to="/users"
        class="hover:dark:bg-mocha-overlay0/25 hover:bg-latte-overlay0/25 border-rounded-xl p-3"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path === '/users',
        }"
      >
        <div class="i-fluent:person-32-regular text-xl"></div>
      </NuxtLink>

      <!-- Singers -->
      <NuxtLink
        to="/singers"
        class="hover:dark:bg-mocha-overlay0/25 hover:bg-latte-overlay0/25 border-rounded-xl p-3"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path === '/singers',
        }"
      >
        <div class="i-fluent:mic-32-regular text-xl"></div>
      </NuxtLink>

      <!-- Songs -->
      <NuxtLink
        to="/songs"
        class="hover:dark:bg-mocha-overlay0/25 hover:bg-latte-overlay0/25 border-rounded-xl p-3"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path === '/songs',
        }"
      >
        <div class="i-fluent:music-note-2-24-regular text-xl"></div>
      </NuxtLink>

      <!-- Settings -->
      <NuxtLink
        to="/settings"
        class="hover:dark:bg-mocha-overlay0/25 hover:bg-latte-overlay0/25 border-rounded-xl p-3"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path === '/settings',
        }"
      >
        <div class="i-fluent:settings-32-regular text-xl"></div>
      </NuxtLink>
    </div>
    <div class="pr-5 py-5 w-full h-full">
      <div class="w-full h-full border-rounded-xl text-latte-text dark:text-mocha-text p-3">
        <slot />
      </div>
    </div>
  </div>
</template>
