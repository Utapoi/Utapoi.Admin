<script setup lang="ts">
import { nanoid } from 'nanoid'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useSingersService } from '~/Composables/Services/SingersService'
import type { ILocalizedString } from '~/Core/Models/LocalizedString'
import { CreateSingerRequest } from '~/Core/Requests/Singers/CreateSingerRequest'
import type { ICreateSingerInfo } from '~/Core/Forms/Singers/CreateSingerInfo'
import LanguageOptions from '~/Core/Forms/Options/LanguageOptions'
import BloodTypeOptions from '~/Core/Forms/Options/BloodTypeOptions'
import { ApiError } from '~/Core/Models/Error'

const SingersService = useSingersService()

const Info = ref<ICreateSingerInfo>({
  Names: [{
    Id: nanoid(),
    Text: '',
    Language: 'Japanese',
  }],
  Nicknames: [{
    Id: nanoid(),
    Text: '',
    Language: 'Japanese',
  }],
  Descriptions: [{
    Id: nanoid(),
    Text: '',
    Language: 'Japanese',
  }],
  Activities: [{
    Id: nanoid(),
    Text: '',
    Language: 'Japanese',
  }],
  BirthdayYear: 0,
  BirthdayMonth: 0,
  BirthdayDay: 0,
  Height: 0,
  BloodType: '',
  Nationality: '',
  ProfilePictureFile: null,
  CoverFile: null,
})

/**
 * The error that occurred when creating the singer.
 * Can be undefined if no error occurred.
 */
const CreateSingerError = ref<ApiError | undefined>(undefined)

const v = useVuelidate()

const IsSubmitting = ref<boolean>(false)
const IsDisabled = computed(() => IsSubmitting.value || !v.value.$anyDirty || v.value.$invalid)

/**
 * Function called when the user adds a new name
 */
function OnAddName(): void {
  Info.value.Names.push(
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
function OnRemoveName(id: string): void {
  const n = Info.value.Names
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  if (idx === -1)
    return

  n.splice(idx, 1)

  Info.value.Names = n
}

/**
 * Function called when the user adds a new nickname
 */
function OnAddNickname(): void {
  Info.value.Nicknames.push(
    {
      Text: '',
      Language: '',
    } as ILocalizedString)
}

/**
 * Function called when the user removes a nickname
 * @param id The id of the nickname to remove
 */
function OnRemoveNickname(id: string): void {
  const n = Info.value.Nicknames
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  if (idx === -1)
    return

  n.splice(idx, 1)

  Info.value.Nicknames = n
}

/**
 * Function called when the user adds a new description
 */
function OnAddDescription(): void {
  Info.value.Descriptions.push(
    {
      Id: nanoid(),
      Text: '',
      Language: '',
    } as ILocalizedString)
}

/**
 * Function called when the user removes a description
 * @param id The id of the description to remove
 */
function OnRemoveDescription(id: string): void {
  const n = Info.value.Descriptions
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  if (idx === -1)
    return

  n.splice(idx, 1)

  Info.value.Descriptions = n
}

/**
 * Function called when the user adds a new activity
 */
function OnAddActivity(): void {
  Info.value.Activities.push(
    {
      Id: nanoid(),
      Text: '',
      Language: '',
    } as ILocalizedString)
}

/**
 * Function called when the user removes an activity
 * @param id The id of the activity to remove
 */
function OnRemoveActivity(id: string): void {
  const n = Info.value.Activities
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  if (idx === -1)
    return

  n.splice(idx, 1)

  Info.value.Activities = n
}

/**
 * Function called when the user submits the form
 */
async function OnSubmit() {
  if (IsDisabled)
    return

  CreateSingerError.value = undefined
  IsSubmitting.value = true

  const request = await CreateSingerRequest.FromInfoAsync(Info.value)
  const response = await SingersService.CreateAsync(request)

  if (response instanceof ApiError)
    CreateSingerError.value = response

  IsSubmitting.value = false
}
</script>

<template>
  <div class="mx-auto h-full max-w-6xl px-12 container">
    <div class="mb-8 flex flex-col">
      <div class="flex items-center gap-4">
        <div class="h-0.75 w-14 rounded-full bg-mocha-surface2 dark:bg-latte-surface2" />

        <h2 class="text-2xl font-semibold text-latte-text dark:text-mocha-text">
          Create Singer
        </h2>
      </div>
      <div class="mb-4 mt-2 text-sm text-latte-subtext1 dark:text-mocha-subtext1">
        Add a new singer to the catalog of Utapoi.
      </div>
    </div>

    <div
      v-if="CreateSingerError"
      class="p-5 text-latte-red dark:text-mocha-red"
    >
      <div
        v-for="(error, idx) in CreateSingerError.GetErrors()"
        :key="idx"
        class="w-full flex border border-latte-surface0 rounded-xl p-3 shadow dark:border-mocha-surface0 dark:shadow-none"
      >
        <p>{{ error }}</p>
      </div>
    </div>
    <form
      class="w-full flex flex-col items-start justify-start gap-2"
      @submit.prevent="OnSubmit"
    >
      <!-- Names -->
      <div class="w-full flex rounded-xl bg-latte-surface0 p-5 shadow dark:bg-mocha-surface0 dark:shadow-none">
        <div class="w-full flex flex-col gap-2">
          <div v-for="(name, idx) in Info.Names" :key="name.Id" class="w-full flex items-center justify-start gap-2">
            <TextInputField
              v-model="name.Text"
              class="w-1/2"
              label="Name"
              placeholder="Singer name"
              :name="`singer-name-${name.Id}`"
              :show-label="idx === 0"
              :rules="{ required }"
            />

            <SelectInputField
              v-model="name.Language"
              label="Language"
              placeholder="Select language"
              :name="`singer-name-language-${idx}`"
              :show-label="idx === 0"
              :options="LanguageOptions"
              :rules="{ required }"
            />

            <div
              class="h-full flex items-center justify-center gap-3"
              :class="{
                'mt-3': idx === 0, // Note(Mikyan): Workaround for the first element
                'mb-3': idx > 0,
              }"
            >
              <div v-if="idx > 0" class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red" @click="() => OnRemoveName(name.Id)">
                <div class="i-fluent:delete-16-filled" />
              </div>
              <div v-if="idx === Info.Names.length - 1" class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green" @click="OnAddName">
                <div class="i-fluent:add-16-filled" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
        <div class="flex items-start gap-2">
          <SelectInputField
            label="Nationality"
            placeholder="Select the nationality"
            name="singer-nationality"
            :options="LanguageOptions"
            :rules="{ required }"
            @update:model-value="(v: string) => Info.Nationality = v"
          />
          <TextInputField
            v-model="Info.Height"
            class="w-28"
            label="Height"
            placeholder="150"
            name="singer-height"
          />
          <SelectInputField
            label="Blood Type"
            placeholder="Select a blood type"
            name="singer-bloodtype"
            :options="BloodTypeOptions"
            @update:model-value="(v: string) => Info.BloodType = v"
          />
        </div>
        <!-- Birthday -->
        <div class="flex gap-2">
          <TextInputField
            class="w-28"
            label="Year"
            placeholder="2000"
            name="singer-birthday-year"
            @update:model-value="(v: string) => Info.BirthdayYear = Number(v)"
          />
          <TextInputField
            class="w-28"
            label="Month"
            placeholder="01"
            name="singer-birthday-month"
            @update:model-value="(v: string) => Info.BirthdayMonth = Number(v) - 1"
          />
          <TextInputField
            class="w-28"
            label="Day"
            placeholder="01"
            name="singer-birthday-day"
            @update:model-value="(v: string) => Info.BirthdayDay = Number(v)"
          />
        </div>
      </div>

      <!-- Nicknames -->
      <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
        <div class="w-full flex flex-col gap-2">
          <div v-for="(nickname, idx) in Info.Nicknames" :key="nickname.Id" v-motion-pop class="w-full flex items-center justify-start gap-2">
            <TextInputField
              v-model="nickname.Text"
              class="w-1/2"
              label="Nickname"
              placeholder="Singer nickname"
              :name="`singer-nickname-${nickname.Id}`"
              :show-label="idx === 0"
            />

            <SelectInputField
              v-model="nickname.Language"
              label="Language"
              placeholder="Select language"
              :name="`singer-nickname-language-${idx}`"
              :show-label="idx === 0"
              :options="LanguageOptions"
            />

            <div
              class="h-full flex items-center justify-center gap-3"
              :class="{
                'mt-3': idx === 0, // Note(Mikyan): Workaround for the first element
                'mb-3': idx > 0,
              }"
            >
              <div v-if="idx > 0" class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red" @click="OnRemoveNickname(nickname.Id)">
                <div class="i-fluent:delete-16-filled" />
              </div>
              <div v-if="idx === Info.Nicknames.length - 1" class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green" @click="OnAddNickname()">
                <div class="i-fluent:add-16-filled" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activities -->
      <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
        <div class="w-full flex flex-col gap-2">
          <div
            v-for="(activity, idx) in Info.Activities"
            :key="activity.Id"
            v-motion-pop
            class="w-full flex items-center justify-start gap-2"
          >
            <TextInputField
              v-model="activity.Text"
              class="w-1/2"
              label="Activity"
              placeholder="Singer, Voice Actress, etc..."
              :name="`singer-activity-${activity.Id}`"
              :show-label="idx === 0"
              :rules="{ required }"
            />

            <SelectInputField
              v-model="activity.Language"
              label="Language"
              placeholder="Select language"
              :name="`singer-activity-language-${idx}`"
              :show-label="idx === 0"
              :options="LanguageOptions"
              :rules="{ required }"
            />

            <div
              class="h-full flex items-center justify-center gap-3"
              :class="{
                'mt-3': idx === 0, // Note(Mikyan): Workaround for the first element
                'mt-1': idx > 0,
              }"
            >
              <div
                v-if="idx > 0"
                class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red"
                @click="OnRemoveActivity(activity.Id)"
              >
                <div class="i-fluent:delete-16-filled" />
              </div>
              <div
                v-if="idx === Info.Activities.length - 1"
                class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green"
                @click="OnAddActivity()"
              >
                <div class="i-fluent:add-16-filled" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Descriptions -->
      <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
        <div class="w-full flex flex-col gap-2">
          <div v-for="(description, idx) in Info.Descriptions" :key="description.Id" v-motion-pop class="w-full flex items-start justify-start gap-2">
            <TextAreaInputField
              v-model="description.Text"
              class="w-1/2"
              label="Description"
              placeholder="About the singer"
              :name="`singer-description-${description.Id}`"
              :show-label="idx === 0"
            />

            <SelectInputField
              v-model="description.Language"
              label="Language"
              placeholder="Select language"
              :name="`singer-description-language-${idx}`"
              :show-label="idx === 0"
              :options="LanguageOptions"
            />

            <div
              class="h-full flex items-center justify-center gap-3"
              :class="{
                'mt-10.5': idx === 0, // Should fix this one day.
                'mt-1': idx > 0,
              }"
            >
              <div
                v-if="idx > 0"
                class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red"
                @click="OnRemoveDescription(description.Id)"
              >
                <div class="i-fluent:delete-16-filled" />
              </div>
              <div
                v-if="idx === Info.Descriptions.length - 1"
                class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green"
                @click="OnAddDescription()"
              >
                <div class="i-fluent:add-16-filled" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Picture / Cover -->
      <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
        <FileInputField
          class="w-1/2"
          label="Profile Picture"
          name="singer-profile-picture-file"
          :rules="{ required }"
          @update:model-value="(v: Array<File>) => {
            Info.ProfilePictureFile = v[0]
          }"
        />
        <FileInputField
          class="w-1/2"
          label="Cover"
          name="singer-cover-file"
          :rules="{ required }"
          @update:model-value="(v: Array<File>) => {
            Info.CoverFile = v[0]
          }"
        />
      </div>

      <div class="mt-4 w-full inline-flex justify-between">
        <NuxtLink
          to="/singers"
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
</template>

<style scoped lang="css">
.spin {
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
</style>
