import React from "react"
import { useDropzone } from "react-dropzone"
import classNames from "classnames"

type Props = {
  title?: string
  onDrop: (files: File[]) => void
  mimeTypes?: string[]
  isLoading?: boolean
  className?: string
}
export const FileDrop = ({
  title = "Upload",
  onDrop,
  isLoading,
  mimeTypes = [],
  className,
}: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <button
      {...getRootProps()}
      type="button"
      className={classNames(
        className,
        {
          "opacity-100 bg-blue-200 ": isDragActive,
          loading: isLoading,
        },
        "flex items-center justify-between relative   rounded-lg px-4 py-2 text-center  focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#5B6674] hover:bg-[#3C4652] focus:ring-[#6C7886]"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 mr-2 fill-white hover:fill-[#2b7abd] hover:text-[#2b7abd] inline"
        viewBox="0 0 32 32"
      >
        <path
          d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
          data-original="#000000"
        />
        <path
          d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
          data-original="#000000"
        />
      </svg>
      <input {...getInputProps()} accept={mimeTypes.join(",")} />
      <span className=" block text-sm font-medium text-white">
        {isLoading ? "Uploading..." : title}
      </span>
    </button>
  )
}
