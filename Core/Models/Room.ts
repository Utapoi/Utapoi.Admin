import { RoomType } from '../Enums/RoomType'
import type { IRoomSettings } from './RoomSettings'
import type { IPlayer } from './Player'

export interface IRoom {
  Id: string
  Name: string
  Type: RoomType
  Players: Record<string, IPlayer>
  Settings: IRoomSettings
}

export class Room implements IRoom {
  public Id: string
  public Name: string
  public Type: RoomType
  public Players: Record<string, IPlayer>
  public Settings: IRoomSettings

  constructor() {
    this.Id = ''
    this.Name = ''
    this.Type = RoomType.SinglePlayer
    this.Players = {}
    this.Settings = {} as IRoomSettings
  }

  public static FromResponse(data: IRoom): Room {
    const room = new Room()

    room.Id = data.Id
    room.Name = data.Name
    room.Type = data.Type
    room.Players = data.Players

    return room
  }
}
