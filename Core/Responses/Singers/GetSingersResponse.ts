import type { ISinger } from '~/Core/Models/Singer'
import type { PaginatedResponse } from '~/Core/Responses/PaginatedResponse'

export interface GetSingersResponse extends PaginatedResponse<ISinger> {}
