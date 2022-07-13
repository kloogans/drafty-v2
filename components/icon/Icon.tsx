import { IconProps } from "./types"

const Icon: React.FC<IconProps> = ({ url, className }) => {
  return (
    <>
      <span
        aria-label={url.replace(".svg", "")}
        role="img"
        className={`block icon-mask ${className || ""}`}
      />
      <style jsx>{`
        .icon-mask {
          mask: url(${url}) no-repeat center;
          mask-size: contain;
          animation-fill-mode: forwards;
        }
      `}</style>
    </>
  )
}

export default Icon
