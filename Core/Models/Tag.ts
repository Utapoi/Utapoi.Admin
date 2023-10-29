export interface TagInterface {
  Id: string
  Name: string
}

export class Tag {
  Id: string
  Name: string

  constructor(tag: TagInterface) {
    this.Id = tag.Id
    this.Name = tag.Name
  }

  public static FromResponse(info: TagInterface): Tag {
    return new Tag(info)
  }
}
