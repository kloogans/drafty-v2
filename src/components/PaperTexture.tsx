const PaperTexture = () => {
  return (
    <>
      <svg width="0" height="0" className="absolute">
        <filter id="paper-texture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.04"
            numOctaves="5"
            result="turbulence"
          />
          <feDiffuseLighting
            surfaceScale="2"
            lightingColor="#ffffff"
            in="turbulence"
            result="diffuseLighting"
          >
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
        </filter>
      </svg>
      <div className="fixed top-0 left-0 w-full h-full paper-texture mix-blend-multiply pointer-events-none" />
    </>
  )
}

export default PaperTexture
