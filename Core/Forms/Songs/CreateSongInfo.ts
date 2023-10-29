import type { ILocalizedString } from '@/Core/Models/LocalizedString'
import type { CreateFileInfo } from '@/Core/Forms/CreateFileInfo'

export interface CreateSongInfo {
  Titles: ILocalizedString[]
  ReleaseDate: Date | null
  Singers: string[]
  Albums: string[]
  Tags: string[]
  ThumbnailFile: CreateFileInfo
  PreviewFile: CreateFileInfo
  VoiceFile: CreateFileInfo
  InstrumentalFile: CreateFileInfo
  Lyrics: ILocalizedString[]
  KaraokeFiles: CreateFileInfo[]
}
