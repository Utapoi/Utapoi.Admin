import type { ISong } from '~/Core/Models/Song'
import { Song } from '~/Core/Models/Song'
import type { CreateSongRequest } from '~/Core/Requests/Songs/CreateSongRequest'
import type { GetSongsResponse } from '~/Core/Responses/Songs/GetSongsResponse'

/**
 * Provides a service for managing songs.
 * @returns The songs service.
 */
export function useSongsService() {
  const Client = useHttpClient()

  /**
   * Create a new song.
   * @param request The request to create a song.
   * @returns The created song.
   */
  async function CreateAsync(request: CreateSongRequest): Promise<Song | undefined> {
    const response = await Client.Post<Song>('/Songs', {}, {
      ...request,
    })

    if (response === undefined)
      return undefined

    return Song.FromResponse(response)
  }

  async function DeleteAsync(id: string): Promise<void> {
    await Client.Delete(`/Admin/Songs/${id}`)
  }

  /**
   * Get a song by id.
   * @param id The id of the song.
   * @returns The song.
   */
  async function GetAsync(id: string): Promise<Song | undefined> {
    const response = await Client.Get<ISong>(`/Songs/${id}`)

    if (response === undefined)
      return undefined

    return Song.FromResponse(response)
  }

  /**
   * Get a song by id for editing.
   * @param id The id of the song.
   * @returns The song.
   */
  async function GetForEditAsync(id: string): Promise<Song | undefined> {
    const response = await Client.Get<ISong>(`/Admin/Songs/${id}`)

    if (response === undefined)
      return undefined

    return Song.FromResponse(response)
  }

  /**
   * Get a list of songs.
   * @param skip The number of songs to skip.
   * @param take The number of songs to take.
   * @returns The list of songs.
   */
  async function GetSongsAsync(skip = 0, take = 10): Promise<Song[]> {
    const response = await Client.Get<GetSongsResponse>(`/Admin/Songs?skip=${skip}&take=${take}`)

    if (response === undefined)
      return []

    return response.Items.map(s => Song.FromResponse(s))
  }

  /**
   * Search for songs.
   * @param query The query to search for.
   * @returns The list of songs.
   */
  async function SearchAsync(query: string): Promise<Song[]> {
    const response = await Client.Get<ISong[]>(`/Songs/Search?query=${query}`)

    if (response === undefined)
      return []

    return response.map(s => Song.FromResponse(s))
  }

  return {
    CreateAsync,
    DeleteAsync,
    GetAsync,
    GetForEditAsync,
    GetSongsAsync,
    SearchAsync,
  }
}
