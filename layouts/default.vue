<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="mb-3 w-full w-screen">
    <div class="flex justify-between gap-1 px-3 pt-3">
      <div class="flex justify-start gap-1">
        <h1 class="text-xl font-semibold text-latte-red dark:text-mocha-red">
          Utapoi
        </h1>
        <h2 class="text-xs text-latte-text dark:text-mocha-text">
          Admin
        </h2>
      </div>
      <DarkToggle />
    </div>
  </div>
  <div class="flex">
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

      <!-- Albums -->
      <NuxtLink
        to="/albums"
        class="border-rounded-xl p-3 hover:bg-latte-overlay0/25 hover:dark:bg-mocha-overlay0/25"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path.includes('/albums'),
        }"
      >
        <div class="i-solar:album-linear text-xl" />
      </NuxtLink>

      <!-- Songs -->
      <NuxtLink
        to="/songs"
        class="border-rounded-xl p-3 hover:bg-latte-overlay0/25 hover:dark:bg-mocha-overlay0/25"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path.includes('/songs'),
        }"
      >
        <div class="i-solar:music-library-2-outline text-xl" />
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

      <!-- Stats - Redirect to metrics.utapoi.com -->
      <NuxtLink
        to="/stats"
        class="border-rounded-xl p-3 hover:bg-latte-overlay0/25 hover:dark:bg-mocha-overlay0/25"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path.includes('/stats'),
        }"
      >
        <div class="i-solar:chart-2-line-duotone text-xl" />
      </NuxtLink>

      <div class="h-0.3 w-full bg-latte-surface1 dark:bg-mocha-surface1" />

      <!-- Rooms / Servers - mq.utapoi.com -->
      <NuxtLink
        to="/mq-servers"
        class="border-rounded-xl p-3 hover:bg-latte-overlay0/25 hover:dark:bg-mocha-overlay0/25"
        :class="{
          'bg-latte-overlay0/25 dark:bg-mocha-overlay0/25': route.path.includes('/mq-servers'),
        }"
      >
        <div v-tooltip="'MQ Servers'" class="i-carbon:bare-metal-server text-xl" />
      </NuxtLink>

      <div class="h-0.3 w-full bg-latte-surface1 dark:bg-mocha-surface1" />
    </div>
    <div class="h-full w-full pr-5">
      <div class="h-full w-full border-rounded-xl p-3 text-latte-text dark:text-mocha-text">
        <slot />
      </div>
    </div>
  </div>
</template>
