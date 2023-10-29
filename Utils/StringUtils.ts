export function IsNullOrWhiteSpace(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === ''
}

export function IsNullOrEmpty(value: string | null | undefined): boolean {
  return value === null || value === undefined || value === ''
}
