import type { AlbumInterface } from '~/Core/Models/Album'
import type { PaginatedResponse } from '~/Core/Responses/PaginatedResponse'

export interface GetAlbumsResponse extends PaginatedResponse<AlbumInterface> {}
