export interface IError {
  type: string
  title: string
  status: number
  traceId: string
  errors: Record<string, Array<string>>
}

export class ApiError {
  Type: string = ''
  Title: string = ''
  Status: number = 0
  TraceId: string = ''
  Errors: Record<string, Array<string>> = {}

  constructor(error: IError) {
    this.Type = error.type
    this.Title = error.title
    this.Status = error.status
    this.TraceId = error.traceId
    this.Errors = error.errors
  }

  static FromJson(json: IError): ApiError {
    return new ApiError(json)
  }

  GetErrors(): Array<string> {
    let errors: string[] = []

    for (const key in this.Errors)
      errors = errors.concat(this.Errors[key])

    return errors
  }
}
