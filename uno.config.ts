import {
  labels as ctpLabels,
  variants as ctpVariants,
} from '@catppuccin/palette'

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

function extendCatppuccin() {
  const coloursObject: any = {}

  for (const variant of Object.keys(ctpVariants)) {
    for (const label of Object.keys(ctpLabels)) {
      const key = `${variant}-${label}`

      coloursObject[key] = (ctpVariants as any)[variant][label].hex
    }
  }

  return coloursObject
}

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Quicksand',
        serif: 'Lato',
        mono: 'DM Mono',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: {
    'max-w-8xl': 'max-w-85rem',
    'max-w-9xl': 'max-w-90rem',
    'max-w-10xl': 'max-w-95rem',
  },
  theme: {
    colors: extendCatppuccin(),
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      '5xl': '3840px',
    },
  },
})
