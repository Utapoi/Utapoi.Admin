import { LocalizedString } from './LocalizedString'
import type { ILocalizedString } from './LocalizedString'
import { Singer } from './Singer'
import type { ISinger } from './Singer'
import { Song } from './Song'
import type { ISong } from './Song'
import { Tag } from './Tag'
import type { TagInterface } from './Tag'

export interface AlbumInterface {
  Id: string
  Titles: ILocalizedString[]
  Singers: ISinger[]
  Cover: string
  ReleaseDate: Date | null
  Songs: ISong[]
  Tags: TagInterface[]
}

export class Album {
  Id: string
  Titles: LocalizedString[] = []
  Singers: Singer[] = []
  Cover: string
  ReleaseDate: Date | null
  Songs: Song[] = []
  Tags: Tag[] = []

  constructor(album: AlbumInterface) {
    this.Id = album.Id
    this.Titles = album.Titles?.map((title: ILocalizedString) => LocalizedString.FromResponse(title))
    this.Singers = album.Singers?.map((singer: ISinger) => Singer.FromResponse(singer))
    this.Cover = album.Cover
    this.ReleaseDate = album.ReleaseDate
    this.Songs = album.Songs?.map((song: ISong) => Song.FromResponse(song))
    this.Tags = album.Tags?.map((tag: TagInterface) => Tag.FromResponse(tag)) ?? []
  }

  public GetTitle(language = 'English'): string {
    const title = this.Titles.find((title: LocalizedString) => title.Language === language)

    if (title)
      return title.Text

    return this.Titles[0].Text
  }

  public static Empty(): Album {
    return new Album({
      Id: '',
      Titles: [],
      Singers: [],
      Cover: '',
      ReleaseDate: null,
      Songs: [],
      Tags: [],
    })
  }

  public static FromResponse(info: AlbumInterface | null): Album {
    if (info === null)
      return Album.Empty()

    return new Album(info)
  }
}
