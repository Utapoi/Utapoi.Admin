import type { IEditSingerInfo } from '@/Core/Forms/Singers/EditSingerInfo'
import type { ILocalizedFile } from '@/Core/Models/LocalizedFile'
import type { ILocalizedString } from '@/Core/Models/LocalizedString'

export interface IEditSingerRequest {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]
  Birthday: Date | null
  BloodType: string | null
  Height: number
  Nationality: string | null

  // Note(Mikyan): null means no change, otherwise this is a new file.
  ProfilePictureFile: ILocalizedFile | null
  CoverFile: ILocalizedFile | null
}

export class EditSingerRequest implements IEditSingerRequest {
  Names: ILocalizedString[] = []
  Nicknames: ILocalizedString[] = []
  Descriptions: ILocalizedString[] = []
  Activities: ILocalizedString[] = []
  Birthday: Date | null = null
  BloodType: string | null = null
  Height = 0
  Nationality: string | null = null
  ProfilePictureFile: ILocalizedFile | null = null
  CoverFile: ILocalizedFile | null = null

  constructor(request: IEditSingerRequest) {
    this.Names = request.Names
    this.Nicknames = request.Nicknames
    this.Descriptions = request.Descriptions
    this.Activities = request.Activities
    this.Birthday = request.Birthday
    this.BloodType = request.BloodType
    this.Height = request.Height
    this.Nationality = request.Nationality
    this.ProfilePictureFile = request.ProfilePictureFile
    this.CoverFile = request.CoverFile
  }

  public static async FromInfoAsync(info: IEditSingerInfo): Promise<IEditSingerRequest> {
    return new EditSingerRequest({
      Names: info.Names,
      Nicknames: info.Nicknames,
      Descriptions: info.Descriptions,
      Activities: info.Activities,
      Birthday: new Date(info.BirthdayYear, info.BirthdayMonth, info.BirthdayDay),
      BloodType: info.BloodType,
      Height: info.Height,
      Nationality: info.Nationality,
      ProfilePictureFile: info.ProfilePictureFile !== null
        ? {
            File: await ToBase64(info.ProfilePictureFile),
            FileType: info.ProfilePictureFile!.type ?? 'image/png',
            Language: '', // We don't need language for profile picture
            FileName: info.ProfilePictureFile!.name,
          }
        : null,
      CoverFile: info.CoverFile !== null
        ? {
            File: await ToBase64(info.CoverFile),
            FileType: info.CoverFile!.type ?? 'image/png',
            Language: '', // We don't need language for cover
            FileName: info.CoverFile!.name,
          }
        : null,
    })
  }
}
