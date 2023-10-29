import type { CreateAlbumInfo } from '@/Core/Forms/Albums/CreateAlbumInfo'
import type { ILocalizedFile } from '@/Core/Models/LocalizedFile'
import type { ILocalizedString } from '@/Core/Models/LocalizedString'

export interface CreateAlbumRequestInterface {
  Titles: ILocalizedString[]
  ReleaseDate: Date | null
  Singers: string[]
  CoverFile: ILocalizedFile | null
}

export class CreateAlbumRequest implements CreateAlbumRequestInterface {
  Titles: ILocalizedString[]
  ReleaseDate: Date | null
  Singers: string[]
  CoverFile: ILocalizedFile | null

  constructor(request: CreateAlbumRequestInterface) {
    this.Titles = request.Titles
    this.ReleaseDate = request.ReleaseDate
    this.Singers = request.Singers
    this.CoverFile = request.CoverFile
  }

  public static Empty(): CreateAlbumRequest {
    return new CreateAlbumRequest({
      Titles: [],
      ReleaseDate: null,
      Singers: [],
      CoverFile: null,
    })
  }

  public static async FromInfoAsync(form: CreateAlbumInfo): Promise<CreateAlbumRequestInterface> {
    return {
      Titles: form.Titles,
      ReleaseDate: new Date(form.ReleaseDateYear, form.ReleaseDateMonth, form.ReleaseDateDay),
      Singers: form.Singers,
      CoverFile: {
        File: await ToBase64(form.CoverFile as File),
        FileType: form.CoverFile!.type ?? 'image/png',
        Language: '', // We don't need language for cover
        FileName: form.CoverFile!.name,
      },
    }
  }
}
