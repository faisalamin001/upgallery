import { useEffect, useRef, useState } from "react"
import { FileDataDTO } from "../types"
import classNames from "classnames"

type Props = {
  files: FileDataDTO[]
  loadingFileNames: string[]
  loading: boolean
  onDelete: (file: FileDataDTO) => void
}
const dummyFile: FileDataDTO = {
  filename: "Loading...",
  modified: "",
  url: "",
  id: "",
}
export default function FileList({
  files,
  onDelete,
  loading,
  loadingFileNames,
}: Props) {
  return (
    <div className="">
      <div className="pt-2 md:pt-12  sm:py-6 sm:px-6 lg:px-8">
        <h2 id="files-heading" className="sr-only">
          Files
        </h2>

        <div className={"masonry-wrapper w-full"}>
          {loadingFileNames &&
            loadingFileNames.map((filename) => (
              <FileComponent
                key={filename}
                file={{ ...dummyFile, filename, modified: "Just now" }}
                loading
              />
            ))}
          {loading && (
            <>
              <FileComponent file={dummyFile} loading />
              <FileComponent file={dummyFile} loading />
              <FileComponent file={dummyFile} loading />
            </>
          )}
          {files.map((file) => (
            <FileComponent
              key={file.id}
              file={file}
              onDelete={() => onDelete(file)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const FileComponent = ({
  file,
  onDelete,
  loading,
}: {
  file: FileDataDTO
  loading?: boolean
  onDelete?: () => void
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    setShowMenu(false)
  }, [])

  const handleDownload = async (url: string, filename: string) => {
    const image = await fetch(url)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement("a")
    link.href = imageURL
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setShowMenu(false)
  }

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url || "")
    setShowMenu(false)
  }

  return (
    <div
      onMouseLeave={() => setShowMenu(false)}
      key={file.id}
      className={classNames("masonry w-full ", { "animate-pulse": loading })}
    >
      <div className={"group block relative"}>
        {file.url && !loading && (
          <img
            onClick={() => setShowMenu(!showMenu)}
            alt="menu"
            className=" absolute top-2 right-1 z-10 cursor-pointer hover:bg-gray-300 rounded  md:opacity-0 group-hover:opacity-100  w-6 "
            src="./menuIcon2.png"
          />
        )}

        {showMenu && (
          <div className=" z-20  absolute top-4 right-5 bg-white  rounded shadow w-28 dark:bg-gray-700">
            <ul className=" text-sm text-gray-700 dark:text-gray-200">
              <li onClick={() => handleCopy(file.url)}>
                <a
                  href="#"
                  className="flex items-center justify-center py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                  <span>Copy Link</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleDownload(file.url, file.filename)}
                  className=" w-full  py-2 hover:bg-gray-100 dark:hover:bg-gray-600 border dark:hover:text-white flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span className="">Download</span>
                </button>
              </li>
              {/* Delete */}
              <li className="text-red-600">
                <button
                  onClick={onDelete}
                  className=" w-full  py-2 hover:bg-gray-100 dark:hover:bg-gray-600 border dark:hover:text-white flex items-center justify-around"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>

                  <span className="">Delete</span>
                </button>
              </li>
            </ul>
          </div>
        )}

        <div
          onClick={() => setShowMenu(false)}
          className={classNames("w-full rounded-lg overflow-hidden", {
            "h-96 bg-gray-300": !file.url,
          })}
        >
          {file.url && (
            <img
              src={file.url}
              alt="img"
              className="w-full h-full object-center object-cover hover:opacity-50"
            />
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-col justify-between text-base font-medium text-gray-900">
        <h3
          className={classNames("mb-1", {
            "animate-pulse": loading,
            "hover:underline": !loading,
          })}
        >
          {/* {file.url && <a href={file.url}>{file.filename}</a>} */}
          {/* {!file.url && <span>{file.filename}</span>} */}
        </h3>
        <div className={"flex w-full justify-between"}>
          <span className={"text-gray-500 text-xs block"}>
            {/* {formatDateString(file.modified)} */}
          </span>
          {onDelete && (
            <button
              onClick={onDelete}
              className="mt-1 text-xs italic text-red-500 hover:text-red-800 hover:underline"
            >
              {/* delete */}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const formatDateString = (dateString: string) => {
  if (!dateString) {
    return ""
  }
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return dateString
  }
  return date.toISOString().substring(0, 10)
}
