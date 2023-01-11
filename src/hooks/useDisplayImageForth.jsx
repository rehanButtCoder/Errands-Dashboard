import { useState } from "react"

function useDisplayImageForth() {
  const [resultForth, setResultForth] = useState("")

  function uploaderForth(e) {
    const imageFile = e.target.files[0]

    const reader = new FileReader()
    reader.addEventListener("load", (e) => {
      setResultForth(e.target.result)
    })

    reader.readAsDataURL(imageFile)
  }

  return { resultForth, uploaderForth, setResultForth }
}

export default useDisplayImageForth
