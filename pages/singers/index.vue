<script setup lang="ts">
import { useSingersService } from '~/Composables/Services/SingersService'
import type { Singer } from '~/Core/Models/Singer'

const SingersService = useSingersService()

// Refs
const Singers = ref<Singer[]>([])

Singers.value = await SingersService.GetSingersForAdminAsync(0, 15)
</script>

<template>
  <div class="mx-auto max-w-10xl w-full w-full flex flex-col gap-2">
    <div class="w-full">
      <div class="w-full rounded-xl bg-latte-surface0 p-3 shadow dark:bg-mocha-surface0">
        <div class="flex items-center gap-2">
          <span class="text-sm text-latte-text dark:text-mocha-text">{{ Singers.length }} artists</span>
          <div class="mx-2 h-9 w-0.25 bg-latte-surface2 dark:bg-mocha-surface2" />

          <div class="border border-latte-overlay0 rounded-full dark:border-mocha-overlay0">
            <div class="w-64 inline-flex items-center justify-between gap-6 px-4 py-1.5 text-latte-subtext1 dark:text-mocha-subtext1">
              <span>Search an artist...</span>
              <span class="i-fluent:search-20-filled text-lg" />
            </div>
          </div>
          <div
            border="~ dark:mocha-olverlay0 latte-overlay0"
            flex="inline items-center justify-start gap-1"
            hover="bg-mocha-overlay2 bg-latte-overlay2 text-latte-base dark:text-mocha-base"
            text="dark:mocha-subtext1 latte-subtext1 lg"
            class="rounded-full px-4 py-0.95 transition-all duration-200 hover:cursor-pointer"
          >
            <span class="i-fluent:filter-12-filled" />
            <span>Filter</span>
          </div>
          <NuxtLink to="/singers/add" class="ml-4">
            <div
              border="~ dark:mocha-red latte-red"
              hover="dark:bg-mocha-red bg-latte-red text-latte-text dark:text-mocha-text cursor-pointer"
              text="dark:mocha-red latte-red lg"
              flex="inline items-center justify-start gap-1"
              class="rounded-full px-4 py-0.95 transition-all duration-200"
            >
              <span class="i-fluent:add-circle-12-filled" />
              <span>Add</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="border-rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0">
      <PrimeDataTable
        v-if="Singers.length > 0"
        :value="Singers"
      >
        <template #loading>
          <div class="text-center text-latte-text dark:text-mocha-text">
            Loading singers...
          </div>
        </template>
        <PrimeColumn header="Name" field="Name">
          <template #body="{ data }">
            {{ (data as Singer).GetName() }}
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>
  </div>
</template>
