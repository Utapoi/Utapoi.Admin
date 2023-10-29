export interface ILocalizedFile {
  File: string | ArrayBuffer | null
  Language: string
  FileType: string
  FileName: string
}

export const EmptyILocalizedFile: ILocalizedFile = {
  File: null,
  Language: '',
  FileType: '',
  FileName: '',
}
