import { ApiError } from '~/Core/Models/Error'
import type { ISinger } from '~/Core/Models/Singer'
import { Singer } from '~/Core/Models/Singer'
import type { ISong } from '~/Core/Models/Song'
import { Song } from '~/Core/Models/Song'
import type { CreateSingerRequest } from '~/Core/Requests/Singers/CreateSingerRequest'
import type { EditSingerRequest } from '~/Core/Requests/Singers/EditSingerRequest'
import type { PaginatedResponse } from '~/Core/Responses/PaginatedResponse'
import type { GetSingersResponse } from '~/Core/Responses/Singers/GetSingersResponse'

/**
 * Provides a service for managing singers.
 * @returns The singers service.
 */
export function useSingersService() {
  const Client = useHttpClient()

  /**
   * Create a new singer.
   * @param request The request to create a singer.
   * @returns The created singer.
   */
  async function CreateAsync(request: CreateSingerRequest): Promise<Singer | ApiError | undefined> {
    const response = await Client.Post<ISinger>('/Admin/Singers', {}, {
      ...request,
    })

    if (response === undefined)
      return undefined

    if (response instanceof ApiError)
      return response

    return Singer.FromResponse(response)
  }

  /**
   * Delete a singer.
   * @param id The id of the singer.
   */
  async function DeleteAsync(id: string): Promise<void> {
    await Client.Delete(`/Admin/Singers/${id}`)
  }

  /**
   * Edit a singer.
   * @param id The id of the singer.
   * @param request The request to edit a singer.
   * @returns The edited singer.
   */
  async function EditAsync(id: string, request: EditSingerRequest): Promise<Singer | undefined> {
    const response = await Client.Patch<ISinger>(`/Admin/Singers/${id}`, {}, {
      ...request,
    })

    if (response === undefined)
      return undefined

    return Singer.FromResponse(response)
  }

  /**
   * Get a singer by id.
   * @param id The id of the singer.
   * @returns The singer.
   */
  async function GetAsync(id: string): Promise<Singer | undefined> {
    const response = await Client.Get<ISinger>(`/Singers/${id}`)

    if (response === undefined)
      return undefined

    return Singer.FromResponse(response)
  }

  /**
   * Get a paginated list of songs for a singer.
   * @param id The id of the singer.
   * @returns A list of songs.
   */
  async function GetSongsAsync(id: string, skip = 0, take = 15): Promise<Song[] | undefined> {
    const response = await Client.Get<PaginatedResponse<ISong>>(`/Singers/${id}/Songs?skip=${skip}&take=${take}`)

    if (response === undefined)
      return undefined

    return response.Items.map(song => Song.FromResponse(song))
  }

  /**
   * Get a paginated list of singers.
   * @param skip The number of items to skip.
   * @param take The number of items to take.
   * @returns A list of singers.
   */
  async function GetSingersAsync(skip = 0, take = 10): Promise<Singer[]> {
    const response = await Client.Get<GetSingersResponse>(`/Singers?skip=${skip}&take=${take}`)

    if (response === undefined)
      return []

    return response.Items.map(singer => Singer.FromResponse(singer))
  }

  /**
   * Get a paginated list of singers for the admin panel.
   * @param skip The number of items to skip.
   * @param take The number of items to take.
   * @returns A list of singers.
   */
  async function GetSingersForAdminAsync(skip = 0, take = 10): Promise<Singer[]> {
    const response = await Client.Get<PaginatedResponse<ISinger>>(`/Admin/Singers?skip=${skip}&take=${take}`)

    if (response === undefined)
      return []

    return response.Items.map(singer => Singer.FromResponse(singer))
  }

  /**
   * Search for singers.
   * @param query The query to search for.
   * @returns A list of singers.
   */
  async function SearchAsync(query: string): Promise<Singer[]> {
    try {
      const response = await Client.Post<ISinger[]>(`/Singers/Search?input=${query}`)

      if (response === undefined || response instanceof ApiError)
        return []

      return response.map((singer: ISinger) => Singer.FromResponse(singer))
    }
    catch (error: any) {
      return []
    }
  }

  return {
    CreateAsync,
    DeleteAsync,
    EditAsync,
    GetAsync,
    GetSongsAsync,
    GetSingersAsync,
    GetSingersForAdminAsync,
    SearchAsync,
  }
}
