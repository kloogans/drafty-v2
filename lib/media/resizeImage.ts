import Resizer from "react-image-file-resizer"
import { fileToBase64 } from "./fileToBase64"

export const resizeImage = async (file: File): Promise<string> => {
  const fileSizeInMb = file.size / (1024 * 1024)

  if (fileSizeInMb > 1) {
    const fileExtension = file.name.split(".").pop() || "jpg"
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        fileExtension,
        75,
        0,
        (uri) => {
          resolve(uri as string)
        },
        "base64"
      )
    })
  }

  return (await fileToBase64(file)) as string
}
