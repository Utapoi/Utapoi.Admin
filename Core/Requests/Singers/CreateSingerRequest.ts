import type { ILocalizedFile } from '@/Core/Models/LocalizedFile'
import type { ILocalizedString } from '@/Core/Models/LocalizedString'
import type { ICreateSingerInfo } from '@/Core/Forms/Singers/CreateSingerInfo'

export interface ICreateSingerRequest {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]
  Birthday: Date | null
  BloodType: string | null
  Height: number
  Nationality: string | null
  ProfilePictureFile: ILocalizedFile | null
  CoverFile: ILocalizedFile | null
}

export class CreateSingerRequest implements ICreateSingerRequest {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]
  Birthday: Date | null
  BloodType: string | null
  Height: number
  Nationality: string | null
  ProfilePictureFile: ILocalizedFile | null
  CoverFile: ILocalizedFile | null

  constructor(request: ICreateSingerRequest) {
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

  public static Empty(): CreateSingerRequest {
    return new CreateSingerRequest({
      Names: [],
      Nicknames: [],
      Descriptions: [],
      Activities: [],
      Birthday: null,
      BloodType: null,
      Height: 0,
      Nationality: null,
      ProfilePictureFile: null,
      CoverFile: null,
    })
  }

  public static async FromInfoAsync(info: ICreateSingerInfo): Promise<ICreateSingerRequest> {
    return {
      Names: info.Names,
      Nicknames: info.Nicknames,
      Descriptions: info.Descriptions,
      Activities: info.Activities,
      Birthday: new Date(info.BirthdayYear, info.BirthdayMonth, info.BirthdayDay),
      BloodType: info.BloodType,
      Height: info.Height,
      Nationality: info.Nationality,
      // Note(Mikyan): We only check if the file is null or undefined to avoid errors.
      // The back-end will check the file's validity.
      ProfilePictureFile: !IsNullOrUndefined(info.ProfilePictureFile)
        ? {
            File: await ToBase64(info.ProfilePictureFile as File),
            FileType: info.ProfilePictureFile!.type ?? 'image/png',
            Language: '', // We don't need language for profile picture
            FileName: info.ProfilePictureFile!.name,
          }
        : null,
      // Note(Mikyan): We only check if the file is null or undefined to avoid errors.
      // The back-end will check the file's validity.
      CoverFile: !IsNullOrUndefined(info.CoverFile)
        ? {
            File: await ToBase64(info.CoverFile as File),
            FileType: info.CoverFile!.type ?? 'image/png',
            Language: '', // We don't need language for cover
            FileName: info.CoverFile!.name,
          }
        : null,
    }
  }
}
