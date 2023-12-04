import { useStorage } from '@vueuse/core'
import { useAuthClient } from '~/Composables/Clients/AuthClient'
import { ApiError } from '~/Core/Models/Error'
import { User } from '~/Core/Models/User'

export const useIdentityStore = defineStore('identity', () => {
  const CurrentUser = ref<User | undefined>(undefined)
  const AuthClient = useAuthClient()
  const AuthInfo = useStorage<string | undefined>('Auth', undefined, localStorage)

  async function LogInAsync(username: string, password: string): Promise<boolean> {
    const response = await AuthClient.LogInAsync({ Username: username, Password: password })

    if (response instanceof ApiError)
      return false

    return await GetCurrentUser()
  }

  async function LogOutAsync(): Promise<boolean> {
    const response = await AuthClient.LogOutAsync()

    if (response instanceof ApiError)
      return false

    CurrentUser.value = undefined
    AuthInfo.value = undefined

    return true
  }

  async function GetCurrentUser(): Promise<boolean> {
    if (IsAuthenticated()) {
      CurrentUser.value = JSON.parse(AuthInfo.value as string)
      return true
    }

    const response = await AuthClient.GetCurrentUserAsync()

    if (response instanceof ApiError)
      return false

    CurrentUser.value = User.FromResponse(response)
    AuthInfo.value = JSON.stringify(CurrentUser.value)

    return true
  }

  function IsAuthenticated(): boolean {
    return CurrentUser.value !== undefined || AuthInfo.value !== undefined
  }

  function GetUsername(): string {
    if (CurrentUser.value === undefined)
      return ''

    return CurrentUser.value.Username
  }

  function GetUserId(): string {
    if (CurrentUser.value === undefined)
      return ''

    return CurrentUser.value.Id
  }

  function HasAvatar(): boolean {
    return false
  }

  function GetAvatar(): string | undefined {
    return undefined
  }

  return {
    CurrentUser,
    LogInAsync,
    LogOutAsync,
    IsAuthenticated,
    GetCurrentUser,
    GetUsername,
    GetUserId,
    HasAvatar,
    GetAvatar,
  }
})
