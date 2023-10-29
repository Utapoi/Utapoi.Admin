import type { ILocalizedString } from '@/Core/Models/LocalizedString'

export interface ICreateSingerInfo {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]
  BloodType: string | null
  Height: number
  Nationality: string | null
  BirthdayYear: number
  BirthdayMonth: number
  BirthdayDay: number
  ProfilePictureFile: File | null
  CoverFile: File | null
}
