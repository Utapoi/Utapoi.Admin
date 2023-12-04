import type { IRoom } from '~/Core/Models/Room'
import type { IGetRoomsResponse } from '~/Core/Responses/Rooms/GetRoomsResponse'

export function useRoomsService() {
  const RuntimeConfig = useRuntimeConfig()
  const HttpClient = useHttpClient()

  async function GetRoomsAsync(): Promise<Array<IRoom>> {
    const response = await HttpClient.Get<IGetRoomsResponse>(`${RuntimeConfig.public.MQ_API_URL}/Rooms`)

    if (response === undefined)
      return []

    return response.Rooms
  }

  async function SearchAsync(query: string) {

  }

  return {
    GetRoomsAsync,
  }
}
