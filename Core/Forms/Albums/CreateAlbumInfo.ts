import type { ILocalizedString } from '@/Core/Models/LocalizedString'

export interface CreateAlbumInfo {
  Titles: ILocalizedString[]
  ReleaseDateYear: number
  ReleaseDateMonth: number
  ReleaseDateDay: number
  Singers: string[]
  CoverFile: File | null
}
