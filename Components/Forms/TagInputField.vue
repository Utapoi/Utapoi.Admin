<script setup lang="ts">
/**
 * Represents an option in the select
 */
export interface TagInputFieldOptions {
  value: string
  text: string
}

/**
 * The props for the select input field
 */
export interface TagInputFieldProps {
  createOption?: boolean
  closeOnSelect?: boolean
  label: string
  minSearchLength?: number
  name: string
  options?: Array<TagInputFieldOptions>
  placeholder?: string
  search?: (query: string) => Promise<Array<TagInputFieldOptions>>
  searchable?: boolean
  showLabel?: boolean
  values?: Array<TagInputFieldOptions>
}

// Properties
const props = withDefaults(defineProps<TagInputFieldProps>(), {
  createOption: false,
  closeOnSelect: true,
  minSearchLength: 3,
  options: () => Array<TagInputFieldOptions>(),
  placeholder: 'Select an option',
  searchable: false,
  showLabel: true,
})

// Events
const events = defineEmits<{
  (e: 'update:modelValue', value: Array<string>): void
  (e: 'onSearch', value: string): void
}>()

/**
 * The HTML element of the select
 */
const SelectRef = ref<HTMLElement | null>(null)

/**
 * The value of the search input
 */
const SearchValue = ref<string>('')

/**
 * The options for the select
 */
const Options = ref<Array<TagInputFieldOptions>>(props.options)

/**
 * The selected option from the select
 */
const Selected = ref<Array<TagInputFieldOptions>>(props.values ?? Array<TagInputFieldOptions>())

/**
 * The state of the select
 */
const IsOpen = ref<boolean>(false)

/**
 * Function called when the input changes
 */
function OnInputChanged(e: TagInputFieldOptions) {
  Selected.value.push(e)
  events('update:modelValue', Selected.value.map(x => x.value))

  IsOpen.value = props.closeOnSelect
  SearchValue.value = ''
  Options.value = []
}

function OnRemoveSelected(e: TagInputFieldOptions) {
  const index = Selected.value.indexOf(e)

  if (index > -1) {
    Selected.value.splice(index, 1)
    events('update:modelValue', Selected.value.map(x => x.value))
  }
}

async function OnEnterPressed() {
  const value = SearchValue.value

  if (value.length === 0)
    return

  if (props.createOption) {
    Selected.value.push({ value, text: value })
    SearchValue.value = ''
    events('update:modelValue', Selected.value.map(x => x.value))
  }
}

async function OnSearchChanged(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value

  if (value.length < props.minSearchLength) {
    Options.value = []
    return
  }

  if (!props.search)
    return

  const results = await props.search(value)

  Options.value = results
  IsOpen.value = true
}
</script>

<template>
  <div ref="SelectRef" class="my-1 inline-flex flex-col">
    <div v-if="showLabel" :for="name" class="mb-2 text-sm font-semibold text-latte-text dark:text-mocha-text">
      {{ label }}
    </div>
    <div
      class="rounded-full bg-latte-crust px-4 py-2 text-latte-text ring-2 transition-all duration-150 dark:bg-mocha-crust dark:text-mocha-text focus:outline-none"
      :class="{
        'ring-latte-lavender dark:ring-mocha-lavender': IsOpen,
        'ring-latte-overlay0 dark:ring-mocha-overlay0': !IsOpen,
      }"
      @click="IsOpen = !IsOpen"
    >
      <div class="w-full flex items-center justify-between gap-4 hover:cursor-pointer">
        <div class="flex gap-2">
          <div v-if="Selected.length > 0 || searchable" class="flex flex-wrap gap-2">
            <div v-for="selected in Selected" :key="selected.value" class="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-latte-surface2 px-2 dark:bg-mocha-surface2">
              {{ selected.text }} <div class="i-fluent:delete-12-filled" @click.prevent="OnRemoveSelected(selected)" />
            </div>
            <div v-if="searchable" class="min-w-24">
              <input
                v-model="SearchValue"
                class="w-full appearance-none bg-transparent text-latte-text dark:text-mocha-text placeholder:text-latte-subtext0 focus:outline-none"
                type="text"
                :name="name"
                autocomplete="false"
                :placeholder="placeholder"
                @input="OnSearchChanged"
                @keypress.enter.prevent="OnEnterPressed"
              >
            </div>
          </div>
          <div
            v-if="!searchable && Selected.length === 0"
            class="w-32 text-latte-subtext0 dark:text-mocha-subtext0"
          >
            {{ placeholder }}
          </div>
        </div>
        <div class="mt-1 w-4 inline-flex items-center text-xs text-latte-text dark:text-mocha-text">
          <div v-if="IsOpen" class="i-fluent:chevron-up-16-filled" />
          <div v-else class="i-fluent:chevron-down-16-filled" />
        </div>
      </div>
    </div>
    <Teleport v-if="IsOpen && SelectRef" to="body">
      <div
        class="absolute w-full rounded-xl bg-latte-surface1 shadow dark:bg-mocha-surface1" :style="{
          left: `${SelectRef.getBoundingClientRect().left}px`,
          top: `${SelectRef.getBoundingClientRect().bottom + useWindowScroll().y.value ?? 0 + 20}px`,
          width: `${SelectRef.getBoundingClientRect().width}px`,
        }"
        @mouseleave="IsOpen = !closeOnSelect"
      >
        <div v-if="Options.length > 0" class="flex flex-col justify-between p-2 text-latte-text dark:text-mocha-text">
          <div v-for="option in Options" :key="option.value" class="h-full w-full text-ellipsis whitespace-nowrap rounded-2xl px-3 py-1 transition-all duration-150 hover:cursor-pointer hover:bg-latte-surface2 hover:dark:bg-mocha-surface2" @click="OnInputChanged(option)">
            <div>
              {{ option.text }}
            </div>
          </div>
        </div>
        <div v-else class="text-ellipsis whitespace-nowrap rounded-2xl px-5 py-2 text-latte-text dark:text-mocha-text">
          No options found
        </div>
      </div>
    </Teleport>
  </div>
</template>
