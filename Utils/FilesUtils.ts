export async function ToBase64(file: File): Promise<ArrayBuffer | string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (reader.result === null)
        return resolve(null)

      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '')
      if ((encoded.length % 4) > 0)
        encoded += '='.repeat(4 - (encoded.length % 4))

      resolve(encoded)
    }
    reader.onerror = error => reject(error)
  })
}
