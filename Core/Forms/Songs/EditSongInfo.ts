import { nanoid } from 'nanoid'
import type { ILocalizedString } from '~/Core/Models/LocalizedString'
import type { ISong } from '~/Core/Models/Song'

export interface IEditSongInfo {
  Id: string
  Titles: ILocalizedString[]
  Singers: string[]
  Albums: string[]
  Tags: string[]
  ThumbnailFile: File | null
  PreviewFile: File | null
  VoiceFile: File | null
  InstrumentalFile: File | null
  Lyrics: ILocalizedString[]
}

export function EmptyIEditSingerInfo(): IEditSongInfo {
  return {
    Id: '',
    Titles: [],
    Singers: [],
    Albums: [],
    Tags: [],
    ThumbnailFile: null,
    PreviewFile: null,
    VoiceFile: null,
    InstrumentalFile: null,
    Lyrics: [],
  }
}

export function IEditSongInfoFromSong(song: ISong): IEditSongInfo {
  return {
    Id: song.Id,
    Titles: song.Titles,
    Singers: song.Singers?.map(singer => singer.Id),
    Albums: song.Albums?.map(album => album.Id),
    Tags: song.Tags?.map(tag => tag.Name),
    ThumbnailFile: null,
    PreviewFile: null,
    VoiceFile: null,
    InstrumentalFile: null,
    Lyrics: song.Lyrics ?? [{
      Id: nanoid(),
      Text: '',
      Language: 'Japanese',
    }],
  }
}
