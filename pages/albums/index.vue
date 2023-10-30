<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'
import { useAlbumsService } from '~/Composables/Services/AlbumsService'
import type { Album } from '~/Core/Models/Album'

// Composables
const AlbumsService = useAlbumsService()
const Confirm = useConfirm()

// Refs
const Albums = ref<Album[]>([])
const SearchQuery = ref<string>('')

Albums.value = await AlbumsService.GetAlbumsForAdminAsync(0, 15)

// Debounced methods
const DebouncedSearchAlbums = useDebounceFn(SearchAlbumsInternal, 500, {
  maxWait: 750,
})

// Methods
async function SearchAlbumsInternal() {
  if (SearchQuery.value.length < 2)
    return

  Albums.value = await AlbumsService.SearchAsync(SearchQuery.value)
}

function OnAlbumDeleteRequested(event: Event, albumId: string) {
  Confirm.require({
    target: event.currentTarget as HTMLElement,
    message: 'Are you sure you want to delete this album?',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger p-button-sm',
    accept: async () => {
      await DeleteAlbumAsync(albumId)
    },
  })
}

async function DeleteAlbumAsync(albumId: string) {
  try {
    await AlbumsService.DeleteAsync(albumId)
    Albums.value = Albums.value.filter((album: Album) => album.Id !== albumId)
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
          <span class="text-sm text-latte-text dark:text-mocha-text">{{ Albums.length }} albums</span>
          <div class="mx-2 h-9 w-0.25 bg-latte-surface2 dark:bg-mocha-surface2" />

          <div class="border border-latte-overlay0 rounded-full dark:border-mocha-overlay0">
            <div class="w-64 inline-flex items-center justify-between gap-6 px-4 py-1.5 text-latte-subtext1 dark:text-mocha-subtext1">
              <PrimeInputText
                v-model="SearchQuery"
                placeholder="Search for albums"
                class="w-full border-none bg-transparent focus:outline-none"
                @change="DebouncedSearchAlbums"
              />
              <span class="i-fluent:search-20-filled cursor-pointer text-lg" @click.prevent="DebouncedSearchAlbums" />
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
          <NuxtLink to="/albums/add" class="ml-4">
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
        v-if="Albums.length > 0"
        :value="Albums"
      >
        <template #loading>
          <div class="text-center text-latte-text dark:text-mocha-text">
            Loading albums...
          </div>
        </template>
        <PrimeColumn header="Title" field="Title">
          <template #body="{ data }">
            {{ (data as Album).GetTitle() }}
          </template>
        </PrimeColumn>
        <PrimeColumn>
          <template #body="{ data }">
            <div class="flex items-center gap-1">
              <NuxtLink :to="`/albums/${data.Id}`" class="font-medium text-latte-green dark:text-mocha-green" title="Details">
                <div class="i-carbon:view" />
              </NuxtLink>
              <NuxtLink :to="`/albums/${data.Id}/edit`" class="font-medium text-latte-lavender dark:text-mocha-lavender" title="Edit">
                <div class="i-carbon:pen" />
              </NuxtLink>
              <PrimeButton icon="i-fluent:delete-32-regular" @click.prevent="(e: Event) => OnAlbumDeleteRequested(e, data.Id)" />
            </div>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>
  </div>
</template>
