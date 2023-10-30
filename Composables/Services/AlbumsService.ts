import type { AlbumInterface } from '~/Core/Models/Album'
import { Album } from '~/Core/Models/Album'
import type { CreateAlbumRequest } from '~/Core/Requests/Albums/CreateAlbumRequest'
import type { GetAlbumsResponse } from '~/Core/Responses/Albums/GetAlbumsResponse'
import type { PaginatedResponse } from '~/Core/Responses/PaginatedResponse'

/**
 * Provides a service for managing albums.
 * @returns The albums service.
 */
export function useAlbumsService() {
  const Client = useHttpClient()

  /**
   * Create a new album.
   * @param request The request to create an album.
   * @returns The created album.
   */
  async function CreateAsync(request: CreateAlbumRequest): Promise<Album | undefined> {
    const response = await Client.Post<AlbumInterface>('/Albums', {}, {
      ...request,
    })

    if (response === undefined)
      return undefined

    return Album.FromResponse(response)
  }

  async function DeleteAsync(id: string): Promise<void> {
    await Client.Delete(`/Albums/${id}`)
  }

  /**
   * Get a paginated list of albums.
   * @param skip The number of items to skip.
   * @param take The number of items to take.
   * @returns A list of albums.
   */
  async function GetAlbumsAsync(skip = 0, take = 10): Promise<Album[]> {
    const response = await Client.Get<GetAlbumsResponse>(`/Albums?skip=${skip}&take=${take}`)

    if (response === undefined)
      return []

    return response.Items.map(album => Album.FromResponse(album))
  }

  /**
   * Get a paginated list of albums for the admin panel.
   * @param skip The number of items to skip.
   * @param take The number of items to take.
   * @returns A list of albums.
   */
  async function GetAlbumsForAdminAsync(skip = 0, take = 10): Promise<Album[]> {
    const response = await Client.Get<PaginatedResponse<AlbumInterface>>(`/Admin/Albums?skip=${skip}&take=${take}`)

    if (response === undefined)
      return []

    return response.Items.map(album => Album.FromResponse(album))
  }

  /**
   * Search for albums.
   * @param query The query to search for.
   * @returns A list of albums.
   */
  async function SearchAsync(query: string): Promise<Album[]> {
    const response = await Client.Post<AlbumInterface[]>(`/Albums/Search?query=${query}`)

    if (response === undefined)
      return []

    return response.map(album => Album.FromResponse(album))
  }

  return {
    CreateAsync,
    DeleteAsync,
    GetAlbumsAsync,
    GetAlbumsForAdminAsync,
    SearchAsync,
  }
}
