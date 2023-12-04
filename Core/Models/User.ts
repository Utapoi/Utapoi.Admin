export interface IUser {
  Id: string
  Username: string
}

export class User implements IUser {
  Id: string
  Username: string

  constructor(model: IUser) {
    this.Id = model.Id
    this.Username = model.Username
  }

  public static FromResponse(response: IUser): User {
    return new User(response)
  }
}
