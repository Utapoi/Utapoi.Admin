import type { ILocalizedString } from '~/Core/Models/LocalizedString'
import type { ISong } from '~/Core/Models/Song'

export interface IEditSongInfo {
  Id: string
  Titles: ILocalizedString[]
  Singers: string[]
  Albums: string[]
  Tags: string[]
  ThumbnailFile: File | null
  SongFile: File | null
}

export function EmptyIEditSongInfo(): IEditSongInfo {
  return {
    Id: '',
    Titles: [],
    Singers: [],
    Albums: [],
    Tags: [],
    ThumbnailFile: null,
    SongFile: null,
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
    SongFile: null,
  }
}
