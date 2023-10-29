import type { CreateFileInfo } from '@/Core/Forms/CreateFileInfo'
import type { CreateSongInfo } from '@/Core/Forms/Songs/CreateSongInfo'
import { EmptyILocalizedFile, type ILocalizedFile } from '@/Core/Models/LocalizedFile'
import type { ILocalizedString } from '@/Core/Models/LocalizedString'

export interface CreateSongRequestInterface {
  Titles: ILocalizedString[]
  ReleaseDate: Date
  Singers: string[]
  Albums: string[]
  Tags: string[]
  ThumbnailFile: ILocalizedFile
  PreviewFile: ILocalizedFile
  VoiceFile: ILocalizedFile
  InstrumentalFile: ILocalizedFile
  Lyrics: ILocalizedString[]
  KaraokeFiles: ILocalizedFile[]
}

export class CreateSongRequest implements CreateSongRequestInterface {
  Titles: ILocalizedString[]
  ReleaseDate: Date
  Singers: string[]
  Albums: string[]
  Tags: string[]
  ThumbnailFile: ILocalizedFile
  PreviewFile: ILocalizedFile
  VoiceFile: ILocalizedFile
  InstrumentalFile: ILocalizedFile
  Lyrics: ILocalizedString[]
  KaraokeFiles: ILocalizedFile[]

  constructor(request: CreateSongRequestInterface) {
    this.Titles = request.Titles
    this.ReleaseDate = request.ReleaseDate
    this.Singers = request.Singers
    this.Albums = request.Albums
    this.Tags = request.Tags
    this.ThumbnailFile = request.ThumbnailFile
    this.PreviewFile = request.PreviewFile
    this.VoiceFile = request.VoiceFile
    this.InstrumentalFile = request.InstrumentalFile
    this.Lyrics = request.Lyrics
    this.KaraokeFiles = request.KaraokeFiles
  }

  public static Empty(): CreateSongRequest {
    return new CreateSongRequest({
      Titles: [],
      ReleaseDate: new Date(),
      Singers: [],
      Albums: [],
      Tags: [],
      ThumbnailFile: EmptyILocalizedFile,
      PreviewFile: EmptyILocalizedFile,
      VoiceFile: EmptyILocalizedFile,
      InstrumentalFile: EmptyILocalizedFile,
      Lyrics: [],
      KaraokeFiles: [],
    })
  }

  public static async FromInfoAsync(info: CreateSongInfo): Promise<CreateSongRequestInterface> {
    const request = CreateSongRequest.Empty()

    request.Titles = info.Titles
    request.ReleaseDate = info.ReleaseDate ?? new Date()
    request.Singers = info.Singers // [string] of Ids
    request.Albums = info.Albums
    request.Tags = info.Tags

    if (info.ThumbnailFile.File !== null) {
      request.ThumbnailFile = {
        File: await ToBase64(info.ThumbnailFile.File as File),
        FileType: info.ThumbnailFile.File!.type ?? 'image/png',
        Language: '', // We don't need language for thumbnail
        FileName: info.ThumbnailFile.File!.name,
      }
    }
    else {
      request.ThumbnailFile = {
        File: '',
        FileType: 'image/png',
        Language: '',
        FileName: '',
      }
    }

    if (info.PreviewFile.File !== null) {
      // Note(Mikyan): This will never be null at this point.
      request.PreviewFile = {
        File: await ToBase64(info.PreviewFile.File as File),
        FileType: info.PreviewFile.File.type ?? 'audio/ogg',
        Language: '', // We don't need language for preview
        FileName: info.PreviewFile.File.name,
      }
    }
    else {
      request.PreviewFile = {
        File: '',
        FileType: 'audio/ogg',
        Language: '',
        FileName: '',
      }
    }

    if (info.VoiceFile.File !== null) {
      // Note(Mikyan): This will never be null at this point.
      request.VoiceFile = {
        File: await ToBase64(info.VoiceFile.File as File),
        FileType: info.VoiceFile.File!.type ?? 'audio/ogg',
        Language: '', // We don't need language for voice
        FileName: info.VoiceFile.File!.name,
      }
    }
    else {
      request.VoiceFile = {
        File: '',
        FileType: 'audio/ogg',
        Language: '',
        FileName: '',
      }
    }

    if (info.InstrumentalFile.File !== null) {
      // Note(Mikyan): This will never be null at this point.
      request.InstrumentalFile = {
        File: await ToBase64(info.InstrumentalFile.File as File),
        FileType: info.InstrumentalFile.File!.type ?? 'audio/ogg',
        Language: '',
        FileName: info.InstrumentalFile.File!.name,
      }
    }
    else {
      request.InstrumentalFile = {
        File: '',
        FileType: 'audio/ogg',
        Language: '',
        FileName: '',
      }
    }

    request.Lyrics = info.Lyrics

    // Note(Mikyan): This will never be null at this point.
    request.KaraokeFiles = (await Promise.allSettled(info.KaraokeFiles.map(async (f: CreateFileInfo) => {
      return {
        File: await ToBase64(f.File as File),
        FileType: f.File!.type ?? 'subtitles/ass',
        Language: f.Language,
        FileName: f.File!.name,
      }
    }))).map((e: any) => e.value as ILocalizedFile)

    return request
  }
}
