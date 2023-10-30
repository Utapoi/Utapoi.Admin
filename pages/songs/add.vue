<script setup lang="ts">
import { nanoid } from 'nanoid'
import useVuelidate from '@vuelidate/core'
import { useAlbumsService } from '~/Composables/Services/AlbumsService'
import { useSingersService } from '~/Composables/Services/SingersService'
import { useSongsService } from '~/Composables/Services/SongsService'
import type { CreateSongInfo } from '~/Core/Forms/Songs/CreateSongInfo'
import { CreateSongRequest } from '~/Core/Requests/Songs/CreateSongRequest'
import type { TagInputFieldOptions } from '~/Components/Forms/TagInputField.vue'
import LanguageOptions from '~/Core/Forms/Options/LanguageOptions'
import type { ILocalizedString } from '~/Core/Models/LocalizedString'

const AlbumsService = useAlbumsService()
const SingersService = useSingersService()
const SongsService = useSongsService()

const Info = ref<CreateSongInfo>({
  Titles: [{
    Id: nanoid(),
    Text: '',
    Language: 'Japanese',
  }],
  ReleaseDate: null,
  ThumbnailFile: {
    Id: nanoid(),
    File: null,
    Language: 'Japanese',
  },
  SongFile: {
    Id: nanoid(),
    File: null,
    Language: 'Japanese',
  },
  Tags: [],
  Singers: [],
  Albums: [],
})

const v = useVuelidate()

const IsSubmitting = ref<boolean>(false)
const IsDisabled = computed(() => IsSubmitting.value || !v.value.$anyDirty || v.value.$invalid)

/**
 * Function called when the user adds a new title
 */
function OnAddTitle() {
  Info.value.Titles.push(
    {
      Id: nanoid(),
      Text: '',
      Language: '',
    } as ILocalizedString)
}

/**
 * Function called when the user removes a title
 * @param id The id of the title to remove
 */
function OnRemoveTitle(id: string) {
  const n = Info.value.Titles
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  n.splice(idx, 1)

  Info.value.Titles = n
}

async function SearchSingersAsync(query: string): Promise<Array<TagInputFieldOptions>> {
  const response = await SingersService.SearchAsync(query)

  return response.map(singer => ({
    text: `${singer.GetName('English')}`,
    value: singer.Id,
  }))
}

async function SearchAlbumsAsync(query: string): Promise<Array<TagInputFieldOptions>> {
  const response = await AlbumsService.SearchAsync(query)

  return response.map(album => ({
    text: `${album.GetTitle('English')}`,
    value: album.Id,
  }))
}

async function OnSubmit(): Promise<void> {
  const r = await CreateSongRequest.FromInfoAsync(Info.value)

  await SongsService.CreateAsync(r)
}
</script>

<template>
  <div class="mx-auto h-full max-w-6xl px-12 py-8 container">
    <div class="mb-8">
      <div class="inline-flex items-center gap-4">
        <div class="h-0.75 w-14 rounded-full bg-mocha-surface2 dark:bg-latte-surface2" />

        <h2 class="text-2xl font-semibold text-latte-text dark:text-mocha-text">
          Create Song
        </h2>
      </div>
      <div class="mb-4 mt-2 text-sm text-latte-subtext1 dark:text-mocha-subtext1">
        Add a new song to the catalog of Utapoi Karaoke.<br>
        <span class="font-semibold text-latte-red dark:text-mocha-red">Don't forget to create a new singer and a new album before if necessary.</span>
      </div>
    </div>
    <div>
      <div>
        <form
          class="w-full flex flex-col items-start justify-start gap-2"
          @submit.prevent="OnSubmit"
        >
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-1/2 flex flex-col gap-2">
              <div v-for="(title, idx) in Info.Titles" :key="title.Id" v-motion-pop class="w-full flex items-center justify-start gap-2">
                <TextInputField
                  v-model="title.Text"
                  label="Title"
                  placeholder="Song title"
                  :name="`song-title-${title.Id}`"
                  :show-label="idx === 0"
                  :value="title.Text"
                />

                <SelectInputField
                  v-model="title.Language"
                  label="Language"
                  placeholder="Select language"
                  :name="`song-title-language-${idx}`"
                  :show-label="idx === 0"
                  :options="LanguageOptions"
                />

                <div
                  class="h-full flex items-center justify-center gap-3" :class="{
                    'mt-7': idx === 0,
                    'mt-1': idx > 0,
                  }"
                >
                  <div v-if="idx > 0" class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red" @click="() => OnRemoveTitle(title.Id)">
                    <div class="i-fluent:delete-16-filled" />
                  </div>
                  <div class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green" @click="OnAddTitle">
                    <div class="i-fluent:add-16-filled" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-1/2 flex justify-end gap-2">
              <TextInputField
                class="w-28"
                label="Year"
                name="song-release-date-year"
                placeholder="2000"
                :value="Info.ReleaseDate?.getFullYear().toString()"
                @update:model-value="(v: string) => Info.ReleaseDate !== null ? Info.ReleaseDate.setFullYear(Number(v)) : Info.ReleaseDate = new Date(Number(v), 0, 1)"
              />
              <TextInputField
                class="w-28"
                label="Month"
                name="song-release-date-year"
                placeholder="01"
                :value="(!Info.ReleaseDate ? '' : Info.ReleaseDate.getMonth() + 1).toString()"
                @update:model-value="(v: string) => Info.ReleaseDate !== null ? Info.ReleaseDate.setMonth(Number(v) - 1) : Info.ReleaseDate = new Date(0, Number(v) - 1, 1)"
              />
              <TextInputField
                class="w-28"
                label="Day"
                name="song-release-date-year"
                placeholder="01"
                :value="Info.ReleaseDate?.getDate().toString()"
                @update:model-value="(v: string) => Info.ReleaseDate !== null ? Info.ReleaseDate.setDate(Number(v)) : Info.ReleaseDate = new Date(0, 0, Number(v))"
              />
            </div>
          </div>

          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <TagInputField
              class="w-1/2"
              label="Singers"
              name="song-singers"
              placeholder="Search singers..."
              :searchable="true"
              :search="async (v: string) => await SearchSingersAsync(v)"
              @update:model-value="(v: Array<string>) => Info.Singers = v"
            />
            <TagInputField
              class="w-1/2"
              label="Albums"
              name="song-albums"
              placeholder="Search albums..."
              :searchable="true"
              :search="async (v: string) => await SearchAlbumsAsync(v)"
              @update:model-value="(v: Array<string>) => Info.Albums = v"
            />
          </div>

          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <TagInputField
              class="w-full"
              label="Tags"
              name="song-tags"
              placeholder="Add a tag"
              :searchable="true"
              :create-option="true"
              @update:model-value="(v: Array<string>) => Info.Tags = v"
            />
          </div>

          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-full flex gap-2">
              <FileInputField
                class="w-1/2"
                label="Thumbnail Image"
                name="song-thumbnail-file"
                @update:model-value="(v: Array<File>) => Info.ThumbnailFile.File = v[0]"
              />
              <FileInputField
                class="w-1/2"
                label="Song Preview File"
                name="song-preview-file"
                @update:model-value="(v: Array<File>) => Info.SongFile.File = v[0]"
              />
            </div>
          </div>

          <div class="mt-4 w-full inline-flex justify-between">
            <NuxtLink
              to="/songs"
              class="h-min cursor-pointer rounded-full px-4 py-2 font-semibold uppercase text-latte-text ring-2 ring-latte-green transition-all duration-150 hover:bg-latte-green dark:text-mocha-text hover:text-latte-base hover:ring-0 dark:ring-mocha-green hover:dark:bg-mocha-green hover:dark:text-mocha-base"
            >
              Back
            </NuxtLink>
            <button
              type="submit"
              class="flex items-center gap-2 rounded-full px-4 py-2 font-semibold uppercase text-latte-base dark:text-mocha-base"
              :disabled="IsDisabled"
              :class="{
                'bg-latte-green/25 dark:bg-mocha-green/25 cursor-not-allowed': IsDisabled,
                'bg-latte-green dark:bg-mocha-green cursor-pointer': !IsDisabled,
              }"
            >
              <div v-if="IsSubmitting" class="spin i-fluent:spinner-ios-16-filled" />
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
