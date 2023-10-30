<script setup lang="ts">
import { nanoid } from 'nanoid'
import { useSongsService } from '~/Composables/Services/SongsService'
import type { IEditSongInfo } from '~/Core/Forms/Songs/EditSongInfo'
import { IEditSongInfoFromSong } from '~/Core/Forms/Songs/EditSongInfo'
import type { Song } from '~/Core/Models/Song'
import LanguageOptions from '~/Core/Forms/Options/LanguageOptions'
import type { ILocalizedString } from '~/Core/Models/LocalizedString'
import type { TagInputFieldOptions } from '~/Components/Forms/TagInputField.vue'

const Config = useRuntimeConfig()
const Route = useRoute()
const Router = useRouter()

const SongsService = useSongsService()

const SongId = ref<string>(Route.params.id.toString())

// TODO: GetSongForEditAsync
const CurrentSong = ref<Song | undefined>(await SongsService.GetForEditAsync(SongId.value))

if (CurrentSong.value === undefined)
  await Router.push('/admin/songs')

const EditSongInfo = ref<IEditSongInfo>(IEditSongInfoFromSong(CurrentSong.value!))

/**
 * Function called when the user adds a new name
 */
function OnAddTitle(): void {
  EditSongInfo.value.Titles.push(
    {
      Id: nanoid(),
      Text: '',
      Language: '',
    } as ILocalizedString)
}

/**
 * Function called when the user removes a name
 * @param id The id of the name to remove
 */
function OnRemoveTitle(id: string): void {
  const n = EditSongInfo.value.Titles
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  n.splice(idx, 1)

  EditSongInfo.value.Titles = n
}

async function SearchSingersAsync(query: string): Promise<Array<TagInputFieldOptions>> {
  return []
}

async function SearchAlbumsAsync(query: string): Promise<Array<TagInputFieldOptions>> {
  return []
}

async function OnSubmit() {

}

useHead({
  title: `${CurrentSong.value!.GetTitle()} | Utapoi`,
})
</script>

<template>
  <div v-if="CurrentSong" class="mx-auto h-full max-w-6xl px-12 py-8 container">
    <!-- Title / Header -->
    <div class="mb-8">
      <div class="inline-flex items-center gap-4">
        <div class="h-0.75 w-14 rounded-full bg-mocha-surface2 dark:bg-latte-surface2" />

        <h2 class="text-2xl font-semibold text-latte-text dark:text-mocha-text">
          Edit {{ CurrentSong.GetTitle() }}
        </h2>
      </div>
      <div class="mb-4 mt-2 text-sm text-latte-subtext1 dark:text-mocha-subtext1">
        Edit information about {{ CurrentSong.GetTitle() }}.
      </div>
    </div>

    <!-- Form  -->
    <div>
      <div class="p-5">
        <form class="w-full flex flex-col items-start justify-start gap-2" @submit.prevent="OnSubmit">
          <!-- Titles -->
          <div class="w-full flex rounded-xl bg-latte-surface0 p-5 shadow dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-full flex flex-col gap-2">
              <div v-for="(title, idx) in EditSongInfo.Titles" :key="title.Id" v-motion-pop class="w-full flex items-center justify-start gap-2">
                <TextInputField
                  v-model="title.Text"
                  :value="title.Text"
                  class="w-1/2"
                  label="Title"
                  placeholder="Song title"
                  :name="`song-title-${title.Id}`"
                  :show-label="idx === 0"
                />

                <SelectInputField
                  v-model="title.Language"
                  :value="LanguageOptions.find((x) => x.value === title.Language)?.value ?? ''"
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
                  <div v-if="idx === EditSongInfo.Titles.length - 1" class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green" @click="OnAddTitle">
                    <div class="i-fluent:add-16-filled" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Singers / Albums -->
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <TagInputField
              class="w-1/2"
              label="Singers"
              name="song-singers"
              placeholder="Search singers..."
              :searchable="true"
              :search="async (v: string) => await SearchSingersAsync(v)"
              :values="CurrentSong.Singers.map(x => { return { value: x.Id, text: x.GetName() } })"
              @update:model-value="(v: Array<string>) => EditSongInfo.Singers = v"
            />
            <TagInputField
              class="w-1/2"
              label="Albums"
              name="song-albums"
              placeholder="Search albums..."
              :searchable="true"
              :search="async (v: string) => await SearchAlbumsAsync(v)"
              :values="CurrentSong.Albums?.map(x => { return { value: x.Id, text: x.GetTitle() } })"
              @update:model-value="(v: Array<string>) => EditSongInfo.Albums = v"
            />
          </div>

          <!-- Tags -->
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <TagInputField
              class="w-full"
              label="Tags"
              name="song-tags"
              placeholder="Add a tag"
              :searchable="true"
              :create-option="true"
              :values="CurrentSong.Tags?.map(x => { return { value: x.Name, text: x.Name } })"
              @update:model-value="(v: Array<string>) => EditSongInfo.Tags = v"
            />
          </div>

          <!-- Thumbnail / Song -->
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-full flex gap-2">
              <FileInputField
                class="w-1/2"
                label="Thumbnail Image"
                name="song-thumbnail-file"
                @update:model-value="(v: Array<File>) => EditSongInfo.ThumbnailFile = v[0]"
              />
              <FileInputField
                class="w-1/2"
                label="Song File"
                name="song-file"
                @update:model-value="(v: Array<File>) => EditSongInfo.SongFile = v[0]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
