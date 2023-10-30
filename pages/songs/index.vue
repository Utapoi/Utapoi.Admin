<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'
import { useSongsService } from '~/Composables/Services/SongsService'
import type { Song } from '~/Core/Models/Song'

const SongsService = useSongsService()
const Confirm = useConfirm()

const Songs = ref<Song[]>([])
const SearchQuery = ref<string>('')

Songs.value = await SongsService.GetSongsAsync(0, 15)

// Debounced methods
const DebouncedSearchSongs = useDebounceFn(SearchSongsInternal, 500, {
  maxWait: 750,
})

// Methods
async function SearchSongsInternal() {
  if (SearchQuery.value.length < 2)
    return

  Songs.value = await SongsService.SearchAsync(SearchQuery.value)
}

function OnSongDeleteRequested(event: Event, songId: string) {
  Confirm.require({
    target: event.currentTarget as HTMLElement,
    message: 'Are you sure you want to delete this song?',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger p-button-sm',
    accept: async () => {
      await DeleteSingerAsync(songId)
    },
  })
}

async function DeleteSingerAsync(songId: string) {
  try {
    await SongsService.DeleteAsync(songId)
    Songs.value = Songs.value.filter((song: Song) => song.Id !== songId)
  }
  catch (ex) {
    // TODO: Toast.
  }
}
</script>

<template>
  <div class="mx-auto max-w-10xl w-full w-full flex flex-col gap-2">
    <div class="w-full">
      <div class="w-full rounded-xl bg-latte-surface0 p-3 shadow dark:bg-mocha-surface0">
        <div class="flex items-center gap-2">
          <span class="text-sm text-latte-text dark:text-mocha-text">{{ Songs.length }} songs</span>
          <div class="mx-2 h-9 w-0.25 bg-latte-surface2 dark:bg-mocha-surface2" />

          <div class="border border-latte-overlay0 rounded-full dark:border-mocha-overlay0">
            <div class="w-64 inline-flex items-center justify-between gap-6 px-4 py-1.5 text-latte-subtext1 dark:text-mocha-subtext1">
              <PrimeInputText
                v-model="SearchQuery"
                placeholder="Search for songs"
                class="w-full border-none bg-transparent focus:outline-none"
                @change="DebouncedSearchSongs"
              />
              <span class="i-fluent:search-20-filled cursor-pointer text-lg" @click.prevent="DebouncedSearchSongs" />
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
          <NuxtLink to="/songs/add" class="ml-4">
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
        v-if="Songs.length > 0"
        :value="Songs"
      >
        <template #loading>
          <div class="text-center text-latte-text dark:text-mocha-text">
            Loading songs...
          </div>
        </template>
        <PrimeColumn header="Title" field="Title">
          <template #body="{ data }">
            {{ (data as Song).GetTitle() }}
          </template>
        </PrimeColumn>
        <PrimeColumn>
          <template #body="{ data }">
            <div class="flex items-center gap-1">
              <NuxtLink :to="`/songs/${data.Id}`" class="font-medium text-latte-green dark:text-mocha-green" title="Details">
                <div class="i-carbon:view" />
              </NuxtLink>
              <NuxtLink :to="`/songs/${data.Id}/edit`" class="font-medium text-latte-lavender dark:text-mocha-lavender" title="Edit">
                <div class="i-carbon:pen" />
              </NuxtLink>
              <PrimeButton icon="i-fluent:delete-32-regular" @click.prevent="(e: Event) => OnSongDeleteRequested(e, data.Id)" />
            </div>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>
  </div>
</template>
