import Head from "next/head"
import { FileDrop } from "../components/FileDrop"
import { useCallback, useMemo, useState } from "react"
import { File } from "../components/File"
import FileList from "../components/FileList"
import { deleteFile, uploadFile, useFiles } from "../utils/api"
import { FileDataDTO } from "../types"

export default function Home() {
  const { data: existingFiles, loading, mutate } = useFiles()
  const [loadingFileNames, setLoadingFileNames] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<FileDataDTO[]>([])

  const files = useMemo(() => {
    const existingFileIds = existingFiles.map((f) => f.id)
    const nonDuplicateUploadedFiles = uploadedFiles.filter(
      (f) => !existingFileIds.includes(f.id)
    )
    return nonDuplicateUploadedFiles.reverse().concat(existingFiles)
  }, [uploadedFiles, existingFiles])

  const onDeleteFile = useCallback(
    async (file: FileDataDTO) => {
      deleteFile(file)
      setUploadedFiles((existing) => existing.filter((e) => e.id !== file.id))
      mutate(existingFiles.filter((e) => e.id !== file.id))
    },
    [existingFiles, mutate]
  )

  const onDrop = useCallback(async (toUpload: File[]) => {
    await Promise.all(
      toUpload.map(async (file) => {
        setLoadingFileNames((names) => [file.name].concat(names))
        const data = await uploadFile(file)
        setLoadingFileNames((names) =>
          names.filter((name) => name !== file.name)
        )
        setUploadedFiles((files) => files.concat([data]))
      })
    )
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-">
      <Head>
        <title>UpGallery</title>
        <meta
          name="description"
          content="Example NextJS app with file upload to AWS S3"
        />
        <link rel="icon" href="/logo3.png" />
        <script src="../node_modules/flowbite/dist/flowbite.min.js"></script>
      </Head>

      {/*       Upload component */}
      <main className="items-center justify-center w-full flex-1 px-2 md:px-10 mt-4">
        <div className="flex items-center justify-between sm:px-6  mb-3 ">
          <div className="flex items-center justify-center">
            <img src="./logo2.png" alt="logo" width="70px" />
            <p className="font-bold text-xl text-[#3c4652]">
              {" "}
              <span className="text-[#2b7abd]">Up</span>Gallery
            </p>
          </div>
          <FileDrop onDrop={onDrop} />
        </div>
        {/* Gallery */}
        <div className="  ">
          <FileList
            files={files}
            onDelete={onDeleteFile}
            loading={loading}
            loadingFileNames={loadingFileNames}
          />
        </div>
      </main>
    </div>
  )
}
