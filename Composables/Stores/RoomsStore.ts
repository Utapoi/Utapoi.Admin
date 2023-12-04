import { useRoomsService } from '~/Composables/Services/RoomsService'
import type { Room } from '~/Core/Models/Room'

export const useRoomsStore = defineStore('rooms', () => {
  const Rooms = ref<Room[]>([])
  const RoomsService = useRoomsService()

  async function GetRooms() {
    Rooms.value = await RoomsService.GetRoomsAsync()

    return Rooms.value
  }

  return {
    GetRooms,
    Rooms,
  }
})
