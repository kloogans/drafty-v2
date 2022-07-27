import Image from "next/image"

interface AvatarProps {
  url: string
  username: string
  size?: string
  className?: string
}

const UserAvatar: React.FC<AvatarProps> = ({
  url,
  username,
  className = "",
  size = "16"
}) => {
  return (
    <div
      className={`w-${size} h-${size} rounded-full overflow-hidden ${className} relative z-10`}
    >
      {url.length > 0 && (
        <Image
          loader={() => url}
          src={url}
          layout="fill"
          alt={`${username}'s avatar`}
          className="rounded-full"
        />
      )}
    </div>
  )
}

export default UserAvatar
