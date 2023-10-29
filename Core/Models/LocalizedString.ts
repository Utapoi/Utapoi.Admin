export interface ILocalizedString {
  Id: string
  Text: string
  Language: string
}

export class LocalizedString {
  Id: string
  Text: string
  Language: string

  constructor(localizedString: ILocalizedString) {
    this.Id = localizedString.Id
    this.Text = localizedString.Text
    this.Language = localizedString.Language
  }

  public static FromResponse(info: ILocalizedString): LocalizedString {
    return new LocalizedString(info)
  }
}
