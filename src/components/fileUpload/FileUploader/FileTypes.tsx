type FileTypesProps = {
  types?: Array<string>
  minSize?: number
  maxSize?: number
}

export default function FileTypes({
  types,
  minSize,
  maxSize
}: FileTypesProps): null | JSX.Element {
  if (types) {
    const stringTypes = types.toString()
    let size = ""
    if (maxSize) size += `size >= ${maxSize}, `
    if (minSize) size += `size <= ${minSize}, `
    return (
      <span title={`${size}types: ${stringTypes}`} className="file-types">
        {stringTypes}
      </span>
    )
  }
  return null
}
