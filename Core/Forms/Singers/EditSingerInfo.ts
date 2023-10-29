import { nanoid } from 'nanoid'
import type { ILocalizedString } from '@/Core/Models/LocalizedString'
import type { ISinger } from '@/Core/Models/Singer'

export interface IEditSingerInfo {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  BirthdayYear: number
  BirthdayMonth: number
  BirthdayDay: number
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]
  BloodType: string | null
  Height: number
  Nationality: string | null

  // Note(Mikyan): null means no change, otherwise this is a new profile picture.
  ProfilePictureFile: File | null
  CoverFile: File | null
}

export function EmptyIEditSingerInfo(): IEditSingerInfo {
  return {
    Names: [],
    Nicknames: [],
    BirthdayYear: 0,
    BirthdayMonth: 0,
    BirthdayDay: 0,
    Descriptions: [],
    Activities: [],
    BloodType: null,
    Height: 0,
    Nationality: null,
    ProfilePictureFile: null,
    CoverFile: null,
  }
}

export function IEditSingerInfoFromSinger(singer: ISinger): IEditSingerInfo {
  const bday = new Date(singer.Birthday ?? '')

  return {
    Names: singer.Names.length > 0
      ? singer.Names
      : [{
          Id: nanoid(),
          Text: '',
          Language: 'Japanese',
        }],
    Nicknames: singer.Nicknames.length > 0
      ? singer.Nicknames
      : [{
          Id: nanoid(),
          Text: '',
          Language: 'Japanese',
        }],
    BirthdayYear: bday.getFullYear() ?? 0,
    BirthdayMonth: bday.getMonth() ?? 0,
    BirthdayDay: bday.getDate() ?? 0,
    Descriptions: singer.Descriptions.length > 0
      ? singer.Descriptions
      : [{
          Id: nanoid(),
          Text: '',
          Language: 'Japanese',
        }],
    Activities: singer.Activities.length > 0
      ? singer.Activities
      : [{
          Id: nanoid(),
          Text: '',
          Language: 'Japanese',
        }],
    BloodType: singer.BloodType ?? null,
    Height: singer.Height ?? 0,
    Nationality: singer.Nationality ?? null,
    ProfilePictureFile: null,
    CoverFile: null,
  }
}
