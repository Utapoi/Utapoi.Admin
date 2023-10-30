<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="min-h-screen min-w-screen flex">
    <div class="min-h-full w-20 flex flex-col items-center gap-1 p-3 dark:text-mocha-text">
      <!-- Home -->
      <NuxtLink
        to="/"
        class="border-rounded-xl p-3 hover:bg-latte-overlay0/25 hover:dark:bg-mocha-overlay0/25"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path === '/',
        }"
      >
        <div class="i-fluent:home-32-regular text-xl" />
      </NuxtLink>

      <!-- Users -->
      <NuxtLink
        to="/users"
        class="border-rounded-xl p-3 hover:bg-latte-overlay0/25 hover:dark:bg-mocha-overlay0/25"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path.includes('/users'),
        }"
      >
        <div class="i-fluent:person-32-regular text-xl" />
      </NuxtLink>

      <!-- Singers -->
      <NuxtLink
        to="/singers"
        class="border-rounded-xl p-3 hover:bg-latte-overlay0/25 hover:dark:bg-mocha-overlay0/25"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path.includes('/singers'),
        }"
      >
        <div class="i-fluent:mic-32-regular text-xl" />
      </NuxtLink>

      <!-- Songs -->
      <NuxtLink
        to="/songs"
        class="border-rounded-xl p-3 hover:bg-latte-overlay0/25 hover:dark:bg-mocha-overlay0/25"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path.includes('/songs'),
        }"
      >
        <div class="i-fluent:music-note-2-24-regular text-xl" />
      </NuxtLink>

      <!-- Settings -->
      <NuxtLink
        to="/settings"
        class="border-rounded-xl p-3 hover:bg-latte-overlay0/25 hover:dark:bg-mocha-overlay0/25"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path.includes('/settings'),
        }"
      >
        <div class="i-fluent:settings-32-regular text-xl" />
      </NuxtLink>
    </div>
    <div class="h-full w-full py-5 pr-5">
      <div class="h-full w-full border-rounded-xl p-3 text-latte-text dark:text-mocha-text">
        <slot />
      </div>
    </div>
  </div>
</template>
