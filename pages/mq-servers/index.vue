<script setup lang="ts">
import { useRoomsService } from '~/Composables/Services/RoomsService'
import { RoomType } from '~/Core/Enums/RoomType'
import type { IRoom } from '~/Core/Models/Room'

// Composables
const RoomsService = useRoomsService()

// Refs
const Rooms = ref<IRoom[]>([])
const SearchQuery = ref<string>('')

// TODO: Add pagination
Rooms.value = await RoomsService.GetRoomsAsync()

// Debounced methods
const DebouncedSearchRooms = useDebounceFn(SearchRoomsInternal, 500, {
  maxWait: 750,
})

// Methods
async function SearchRoomsInternal() {
  if (SearchQuery.value.length < 2)
    return

  // Rooms.value = await RoomsService.SearchAsync(SearchQuery.value)
}
</script>

<template>
  <div class="mx-auto max-w-10xl w-full w-full flex flex-col gap-2">
    <div class="w-full">
      <div class="w-full rounded-xl bg-latte-surface0 p-3 shadow dark:bg-mocha-surface0">
        <div class="flex items-center gap-2">
          <span class="text-sm text-latte-text dark:text-mocha-text">{{ Rooms.length ?? 0 }} {{ Rooms.length > 1 ? 'rooms' : 'room' }}</span>
          <div class="mx-2 h-9 w-0.25 bg-latte-surface2 dark:bg-mocha-surface2" />

          <div class="border border-latte-overlay0 rounded-full dark:border-mocha-overlay0">
            <div class="w-64 inline-flex items-center justify-between gap-6 px-4 py-1.5 text-latte-subtext1 dark:text-mocha-subtext1">
              <PrimeInputText
                v-model="SearchQuery"
                placeholder="Search for rooms"
                class="w-full border-none bg-transparent focus:outline-none"
                @change="DebouncedSearchRooms"
              />
              <span class="i-fluent:search-20-filled cursor-pointer text-lg" @click.prevent="DebouncedSearchRooms" />
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
        </div>
      </div>
    </div>
    <div class="border-rounded-xl bg-latte-surface0 p-3 dark:bg-mocha-surface0">
      <PrimeDataTable
        v-if="Rooms.length > 0"
        :value="Rooms"
        striped-rows
        class="w-full"
      >
        <template #loading>
          <div class="text-center text-latte-text dark:text-mocha-text">
            Loading rooms...
          </div>
        </template>
        <PrimeColumn header="Name" field="Name" class="text-left">
          <template #body="{ data }">
            {{ (data as IRoom).Name }}
          </template>
        </PrimeColumn>
        <PrimeColumn header="Type" field="Type" class="text-left">
          <template #body="{ data }">
            {{ RoomType[(data as IRoom).Type] }}
          </template>
        </PrimeColumn>

        <PrimeColumn header="Players" field="Players" class="text-left">
          <template #body="{ data }">
            {{ Object.keys((data as IRoom).Players).length }} / {{ (data as IRoom).Settings.MaxPlayers }}
          </template>
        </PrimeColumn>
        <PrimeColumn header="Rounds" field="Rounds" class="text-left">
          <!-- TODO: Add CurrentRound -->
          <template #body="{ data }">
            {{ (data as IRoom).Settings.Rounds }}
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>
  </div>
</template>
