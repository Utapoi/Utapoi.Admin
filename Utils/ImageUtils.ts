export function GetUrl(relativePath: string) {
  const Config = useRuntimeConfig()

  return `${Config.public.API_URL}${relativePath}`
}
