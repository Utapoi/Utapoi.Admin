<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import type { ValidationArgs } from '@vuelidate/core'
import type { SelectInputFieldOptions } from '~/Core/Forms/Options/SelectInputFieldOptions'
import { IsNullOrUndefined } from '~/Utils/TypeUtils'

/**
 * The props for the select input field
 */
export interface SelectInputFieldProps {
  name: string
  label: string
  value?: string
  showLabel?: boolean
  placeholder?: string
  options: Array<SelectInputFieldOptions>
  rules?: ValidationArgs
}

interface IValidationType {
  value: string
}

// Properties
const Props = withDefaults(defineProps<SelectInputFieldProps>(), {
  showLabel: true,
  placeholder: 'Select an option',
})

// Events
const Events = defineEmits<{
  'update:modelValue': [value: string]
}>()

/**
 * The validation rules for the select input field
 */
const Rules = {
  value: {},
}

/**
 * The state of the select input field
 */
const State = reactive({
  value: '',
})

if (!IsNullOrUndefined(Props.value)) {
  // @ts-expect-error TypeScript is dumb and doesn't understand that this is a valid value since we check for it above
  State.value = Props.value
}

if (!IsNullOrUndefined(Props.rules)) {
  // @ts-expect-error TypeScript is dumb and doesn't understand that this is a valid value since we check for it above
  Rules.value = Props.rules
}

/**
  * Vuelidate validation
  */
const v = useVuelidate<IValidationType>(Rules, State)

/**
 * The HTML element of the select
 */
const SelectRef = ref<HTMLElement | null>(null)

/**
 * The state of the select
 */
const IsOpen = ref<boolean>(false)

/**
 * Function called when the input changes
 */
function OnInputChanged(e: SelectInputFieldOptions) {
  const value = e.value

  v.value.value.$model = value
  Events('update:modelValue', v.value.value.$model)

  IsOpen.value = false
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
        'ring-latte-red dark:ring-mocha-red': v.$invalid,
      }"
      @click="IsOpen = !IsOpen"
    >
      <div class="flex items-center justify-between gap-4 hover:cursor-pointer">
        <div
          class="w-32 overflow-hidden text-ellipsis whitespace-nowrap"
          :class="{
            'text-latte-subtext0 dark:text-mocha-subtext0': v.value.$model === '',
            'text-latte-text dark:text-mocha-text': v.value.$model !== '',
          }"
        >
          {{ v.value.$model !== '' ? v.value.$model : placeholder }}
        </div>
        <div class="mt-1 text-xs text-latte-text dark:text-mocha-text">
          <div v-if="IsOpen" class="i-fluent:chevron-up-16-filled" />
          <div v-else class="i-fluent:chevron-down-16-filled" />
        </div>
      </div>
    </div>
    <div class="h-4">
      <span
        v-if="v.$invalid && v.$silentErrors"
        class="ml-2 mt-1 text-xs text-red-400"
      >
        {{ v.$silentErrors.at(0)?.$message }}.
      </span>
    </div>
    <Teleport v-if="IsOpen && SelectRef" to="body" class="relative">
      <div
        class="absolute top-2 w-full rounded-xl bg-latte-surface1 shadow dark:bg-mocha-surface1" :style="{
          left: `${SelectRef.getBoundingClientRect().left}px`,
          top: `${SelectRef.getBoundingClientRect().bottom + useWindowScroll().y.value ?? 0 + 50}px`,
          width: `${SelectRef.getBoundingClientRect().width}px`,
        }"
        @mouseleave="IsOpen = false"
      >
        <div class="flex flex-col justify-between p-2 text-latte-text dark:text-mocha-text">
          <div v-for="option in options" :key="option.value" class="w-full text-ellipsis whitespace-nowrap rounded-2xl px-3 py-1 transition-all duration-150 hover:cursor-pointer hover:bg-latte-surface2 hover:dark:bg-mocha-surface2" @click.prevent="OnInputChanged(option)">
            <div>
              {{ option.text }}
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
