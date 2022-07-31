import { toast } from "react-toastify"
import { promisify } from "util"
import fs from "fs"
import { useState } from "react"
import { allTextBoxesHaveValues } from "../utils"
import { useDraftEditorState } from "./useDraftEditorState"
import { useSession } from "next-auth/react"
import { uploadMediaFile } from "src/lib/media"
import convert from "heic-convert"

// const convertHeicToJpeg = async (file: File) => {
//   const inputBuffer = promisify(fs.readFile)(file)
//   const outputBuffer = await convert({
//     buffer: inputBuffer, // the HEIC file buffer
//     format: 'JPEG',      // output format
//     quality: 1           // the jpeg compression quality, between 0 and 1
//   });

//   await promisify(fs.writeFile)('./result.jpg', outputBuffer)
// }

export const useDraftEditorFunctions = () => {
  const [loading, setLoading] = useState(false)
  const [twitterIsLoading, setTwitterIsLoading] = useState(false)
  const [tweetSent, setTweetSent] = useState(false)
  const { data: session } = useSession()
  const { sections, setHighlightedTextBoxes, focusOnTextBox, addAttachment } =
    useDraftEditorState()

  const handleSendDraftsAsTweet = async (id: string) => {
    const textBoxes = allTextBoxesHaveValues(sections)
    if (textBoxes.emptyTextboxIds) {
      setHighlightedTextBoxes(textBoxes.emptyTextboxIds)
      toast.error("Please fill in or remove empty text boxes.")
      return
    }
    if (textBoxes.allHaveValues) {
      try {
        setTwitterIsLoading(true)
        const response = await fetch(`/api/drafts/${id}/tweet`, {
          method: "POST",
          body: JSON.stringify({
            sections
          })
        })
        const { success, message } = await response.json()
        if (!success) {
          toast.error(message)
          return
        }

        setHighlightedTextBoxes([])
        toast.success("Tweet sent!")
        setTweetSent(true)
      } catch (error) {
        console.log(error.message)
        toast.error("Something went wrong. Please try again.")
      } finally {
        setTwitterIsLoading(false)
      }
    }
  }

  const focusOnNewTextBox = (id: number) => {
    focusOnTextBox(id)
    const textBoxes = document.querySelectorAll("textarea")
    textBoxes[id].focus()
  }

  const uploadMedia = async (
    file: File,
    draftId: string,
    draftSectionId: number
  ) => {
    if (!file.type.includes("image")) {
      toast.error("File type must be an image.")
      return
    }
    if (file.size > 5000000) {
      toast.error("Image is too large. 5MB max.")
      return
    }
    // if file extension is HEIC, convert to JPEG
    // if (file.name.includes(".HEIC")) {
    //   const convertedFile = await convertHeicToJpeg(file)
    //   if (!convertedFile) {
    //     toast.error("Something went wrong. Please try again.")
    //     return
    //   }
    //   file = convertedFile
    // }
    if (!file.name.endsWith(".jpg") && !file.name.endsWith(".png")) {
      toast.error("File type must be jpg or png.")
      return
    }

    setLoading(true)
    if (session?.user) {
      try {
        //@ts-ignore
        const url = await uploadMediaFile(
          file,
          draftId,
          session?.user?.uid as string
        )

        addAttachment(draftSectionId, await url)
      } catch (e) {
        console.log(e.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const saveDraft = async (id?: string) => {
    setLoading(true)
    const url = `/api/drafts/save`
    const data = {
      id: id || null,
      sections
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ ...data })
      })
      const json = await res.json()
      return json
    } catch (e) {
      console.log(e.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    handleSendDraftsAsTweet,
    focusOnNewTextBox,
    uploadMedia,
    saveDraft,
    loading,
    twitterIsLoading,
    tweetSent
  }
}
