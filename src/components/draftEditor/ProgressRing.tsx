import { CircularProgressbar } from "react-circular-progressbar"

const ProgressRing: React.FC<{ percent: number }> = ({ percent }) => {
  return (
    <div className="w-6 h-6">
      <CircularProgressbar
        className="w-6 h-6"
        strokeWidth={10}
        value={percent}
        styles={{
          path: {
            stroke: percent < 20 ? "red" : "#818cf8"
          },
          text: {
            fill: percent < 20 ? "red" : "#818cf8"
          }
        }}
      />
    </div>
  )
}

export default ProgressRing
