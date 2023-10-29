import type { PaginatedResponse } from '../PaginatedResponse'
import type { ISong } from '~/Core/Models/Song'

export interface GetSongsResponse extends PaginatedResponse<ISong> {}
