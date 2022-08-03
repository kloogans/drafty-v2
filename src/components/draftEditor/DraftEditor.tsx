// TODO: make textboxes sortable with the first being static
// TODO: image uploads (max size, max number of files for child tweets)
import { Suspense, useEffect, useLayoutEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { PrimaryButton } from "src/components/buttons"
import "react-circular-progressbar/dist/styles.css"
import { allTextBoxesHaveValues } from "./utils"
import { useDraftEditorState } from "./hooks/useDraftEditorState"
import { DraftEditorProps } from "./types"
import { useDraftEditorFunctions } from "./hooks/useDraftEditorFunctions"
import { DraftSectionAttachments } from "./DraftSectionAttachments"
import { useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { toast } from "react-toastify"
import LogoIcon from "../logo/LogoIcon"
import { useReward } from "react-rewards"
import Icon from "../icon/Icon"
import PrimaryHeading from "../headings/PrimaryHeading"
import Tenor from "react-tenor"
import "react-tenor/dist/styles.css"
const DraftSectionControls = dynamic(() => import("./DraftSectionControls"))
const DraftSectionTextBox = dynamic(() => import("./DraftSectionTextBox"), {
  suspense: true
})
const MAX_CHARACTERS = 280

const DraftEditor: React.FC<DraftEditorProps> = ({
  id,
  data,
  isNew = true
}) => {
  const { sections, highlightedTextBoxes, setSections } = useDraftEditorState()
  const router = useRouter()
  const {
    handleSendDraftsAsTweet,
    saveDraft,
    loading,
    twitterIsLoading,
    tweetSent
  } = useDraftEditorFunctions()

  const { reward } = useReward("success", "balloons", {
    spread: 90,
    angle: 90,
    lifetime: 180
  })

  const lastTextBoxIsEmpty = sections[sections.length - 1].text.length < 1
  const { allHaveValues } = allTextBoxesHaveValues(sections)
  const atleastOneTextBoxHasAValue = sections.some(
    (textBox) => textBox.text.length > 0
  )

  useEffect(() => {
    tweetSent && reward()
  }, [tweetSent])

  useEffect(() => {
    if (data) {
      setSections(data)
    }
  }, [data])

  const handleSaveDraft = async () => {
    try {
      const response = await saveDraft(id)
      if (response.success && router.pathname === "/new") {
        router.push(`${response.draftUrl}`, undefined, { shallow: true })
      }
      toast.success("Draft saved")
    } catch (e) {
      toast.error(e.message)
      console.log(e.message)
    }
  }

  return (
    <Suspense
      fallback={
        <Skeleton
          height={188}
          baseColor={"#6366f1"}
          highlightColor={"#a5b4fc"}
          borderRadius={"1rem"}
        />
      }
    >
      <div className={` w-full relative `}>
        <div
          className={`${
            twitterIsLoading ? "scale-100" : "scale-0"
          } w-full h-full flex flex-col items-center justify-center transition duration-200 ease-in-out absolute top-0 left-0 min-h-[70vh] animate-fade-in`}
        >
          {/* <LogoIcon className="w-20 h-20" animated showDebris /> */}

          <div className="max-w-sm w-full flex flex-col items-center">
            <Icon
              url="/assets/icons/hashtag2.svg"
              className="w-28 h-28 bg-indigo-300 origin-bottom twitter-loading-animation "
            />
          </div>

          <p className="title-font text-lg text-indigo-300 leading-none mt-2 mb-4 max-w-xs">
            Tweeting...
          </p>
        </div>

        <span
          id="success"
          className="block absolute top-1/2 left-1/2 overflow-hidden z-20"
        />
        <div
          className={`${
            tweetSent ? "scale-100" : "scale-0"
          } w-full h-full flex flex-col items-center justify-center transition duration-200 ease-in-out absolute z-10 top-0 left-0 min-h-[70vh] animate-fade-in`}
        >
          {/* <LogoIcon className="w-20 h-20" animated showDebris /> */}

          <div className="max-w-sm w-full flex flex-col items-center">
            <Icon
              url="/assets/icons/check.svg"
              className="w-28 h-28 bg-indigo-300 origin-bottom"
            />
          </div>

          <p className="title-font text-2xl text-indigo-300 leading-none mt-1 mb-2 max-w-xs">
            Sent!
          </p>
          <p className="text-md text-indigo-100 leading-none mb-4 max-w-xs">
            Would you like to delete or save this draft?
          </p>
          <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
            <PrimaryButton
              handleClick={() => console.log("delete this draft")}
              title="Delete draft"
            >
              Delete
            </PrimaryButton>
            <PrimaryButton
              handleClick={() => !loading && handleSaveDraft()}
              title="Save draft"
            >
              {loading ? "Saving..." : "Save"}
            </PrimaryButton>
          </div>
        </div>

        <div
          className={`w-full pb-20 ${
            twitterIsLoading || tweetSent ? "opacity-0" : "opacity-100"
          } transition duration-200 ease-in-out`}
        >
          <PrimaryHeading
            className={`mb-4 text-center ${
              router.pathname === "/new" ? "" : "hidden"
            }`}
          >
            Create a new <strong>draft</strong>
          </PrimaryHeading>
          <form className="w-full h-full px-2 md:px-0 max-w-full md:max-w-xl mx-auto flex flex-col items-center justify-center mb-4">
            {sections.map((value, index) => {
              const isFirstTextBox = index === 0
              const isLastTextBox = index === sections.length - 1
              const remainingLength = MAX_CHARACTERS - value.text.length
              const percentageOfRemainingLength = Math.ceil(
                ((MAX_CHARACTERS - value.text.length) / MAX_CHARACTERS) * 100
              )

              let radius = "rounded-2xl"
              if (sections.length > 1 && isFirstTextBox) {
                radius = "rounded-2xl rounded-bl-none"
              }

              if (sections.length > 1 && !isFirstTextBox && !isLastTextBox) {
                radius = "rounded-2xl rounded-l-none"
              }

              if (sections.length > 1 && isLastTextBox) {
                radius = "rounded-2xl rounded-tl-none"
              }

              return (
                <div className="relative w-full" key={value.id}>
                  <div
                    className={`${
                      isFirstTextBox ? "hidden" : ""
                    } h-6 border-r-2 w-0 border-white/30 border-dashed mr-auto`}
                  />
                  <DraftSectionTextBox
                    key={value.id}
                    id={value.id}
                    draftId={id as string}
                    value={value.text}
                    focused={value.focused}
                    radius={radius}
                    attachments={value.attachments}
                  >
                    <DraftSectionAttachments
                      sectionId={value.id}
                      isFirstTextBox={isFirstTextBox}
                      isLastTextBox={isLastTextBox}
                      sectionIsFocused={value.focused}
                    />
                  </DraftSectionTextBox>
                  <DraftSectionControls
                    show={value.focused}
                    id={value.id}
                    draftId={id as string}
                    lastTextBoxIsEmpty={lastTextBoxIsEmpty}
                    isFirstTextBox={isFirstTextBox}
                    isLastTextBox={isLastTextBox}
                    remainingLength={remainingLength}
                    progressPercentage={percentageOfRemainingLength}
                    numberOfAssets={value.attachments.length}
                  />
                </div>
              )
            })}
          </form>
          <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
            <PrimaryButton
              handleClick={() =>
                !twitterIsLoading && handleSendDraftsAsTweet(id as string)
              }
              title="Tweet draft"
              disabled={
                highlightedTextBoxes.length > 0 ||
                !allHaveValues ||
                twitterIsLoading
              }
            >
              {twitterIsLoading ? "Tweeting..." : "Tweet"}
            </PrimaryButton>
            <PrimaryButton
              disabled={!atleastOneTextBoxHasAValue || loading}
              handleClick={() => !loading && handleSaveDraft()}
              title="Save draft"
            >
              {loading ? "Saving..." : "Save"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default DraftEditor
