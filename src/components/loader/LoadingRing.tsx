const LoadingRing: React.FC<{ size: number }> = ({ size = 6 }) => (
  <svg
    className={`loading w-${size.toString()} h-${size.toString()}`}
    version="1.1"
    viewBox="0 0 72 72"
  >
    <circle
      className="loading-ring"
      cx="-36"
      cy="36"
      fillOpacity="0"
      r="33.5"
      stroke="#fbbf24"
      strokeDasharray="211"
      strokeDashoffset="-211"
      strokeWidth="6"
      transform="rotate(-90)"
    ></circle>
  </svg>
)

export default LoadingRing
