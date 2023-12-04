import { createFetch } from '@vueuse/core'
import { ApiError } from '~/Core/Models/Error'
import type { IUser } from '~/Core/Models/User'
import type { ILogInRequest } from '~/Core/Requests/Auth/LogInRequest'
import type { ILogInResponse } from '~/Core/Responses/Auth/LogInResponse'
import type { ILogOutResponse } from '~/Core/Responses/Auth/LogOutResponse'

export function useAuthClient() {
  const RuntimeConfig = useRuntimeConfig()

  const ApiFetcher = createFetch({
    baseUrl: RuntimeConfig.public.AUTH_API_URL as string,
    options: {
      updateDataOnError: false,
      onFetchError(ctx) {
        ctx.error = ctx.data

        return ctx
      },
    },
  })

  async function LogInAsync(req: ILogInRequest): Promise<ILogInResponse | ApiError> {
    const response = await Post<ILogInResponse>('/Auth/LogIn', {}, req)

    if (response instanceof ApiError)
      return response as ApiError

    if (response === undefined)
      return ApiError.UnknowError()

    return response as ILogInResponse
  }

  async function LogOutAsync(): Promise<ILogOutResponse | ApiError> {
    const response = await Post<ILogOutResponse>('Auth/LogOut')

    if (response instanceof ApiError)
      return response as ApiError

    return response as ILogOutResponse
  }

  async function GetCurrentUserAsync(): Promise<IUser | ApiError> {
    const response = await Get<IUser>('/Users/Me')

    if (response instanceof ApiError)
      return response

    if (response === undefined)
      return ApiError.UnknowError()

    return response as IUser
  }

  async function Get<T>(url: string, options?: RequestInit): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    options.credentials = 'include'

    const { data: r } = await ApiFetcher(url, options)
      .get()
      .json<T>()

    if (r.value !== null)
      return r.value

    return undefined
  }

  async function Post<T>(url: string, options?: RequestInit, body: any = undefined): Promise<T | ApiError | undefined> {
    if (options === undefined)
      options = {}

    options.credentials = 'include'

    if (body === undefined)
      body = {}

    const { data, error } = await ApiFetcher(url, options).post(body).json<T>()

    if (error.value != null)
      return ApiError.FromJson(error.value)

    if (data.value !== null)
      return data.value as T

    return undefined
  }

  return {
    LogInAsync,
    LogOutAsync,
    GetCurrentUserAsync,
  }
}
