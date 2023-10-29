<script setup lang="ts">
import type { ValidationArgs } from '@vuelidate/core'
import useVuelidate from '@vuelidate/core'

/**
 * The props for the text input field
 */
export interface TextInputFieldProps {
  name: string
  label: string
  value?: string | null
  placeholder: string
  showLabel?: boolean
  type?: string
  rules?: ValidationArgs
}

interface IValidationType {
  value: string
}

// Properties
const Props = withDefaults(defineProps<TextInputFieldProps>(), {
  placeholder: 'Enter text here',
  showLabel: true,
  type: 'text',
})

// Events
const Events = defineEmits<{
  'update:modelValue': [value: Array<File>]
}>()

const Rules = {
  value: {},
}

const State = reactive<IValidationType>({
  value: '',
})

if (Props.value !== undefined && Props.value !== null)
  State.value = Props.value!

if (Props.rules !== undefined && Props.rules !== null)
  Rules.value = Props.rules

const v = useVuelidate<IValidationType>(Rules, State)

/**
 * Function called when the input changes
 */
function OnInputChanged() {
  Events('update:modelValue', v.value.value.$model)
}
</script>

<template>
  <div class="my-1 inline-flex flex-col">
    <label v-if="showLabel" :for="name" class="mb-2 text-sm font-semibold text-latte-text dark:text-mocha-text">{{ label }}</label>
    <input
      v-model="v.value.$model"
      class="w-full transform-gpu appearance-none rounded-full bg-latte-crust px-4 py-2 text-latte-text ring-1.5 transition-all duration-150 dark:bg-mocha-crust dark:text-mocha-text placeholder:text-latte-subtext0 focus:outline-none focus:ring-latte-lavender placeholder:dark:text-mocha-subtext0 focus:dark:ring-mocha-lavender"
      :class="{
        'ring-latte-overlay0 dark:ring-mocha-overlay0': !v.$invalid,
        'ring-latte-red dark:ring-mocha-red': v.$invalid,
      }"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="OnInputChanged"
    >
    <div class="h-4">
      <span
        v-if="v.$invalid && v.$silentErrors"
        class="ml-2 mt-1 text-xs text-red-400"
      >
        {{ v.$silentErrors.at(0)?.$message }}.
      </span>
    </div>
  </div>
</template>
