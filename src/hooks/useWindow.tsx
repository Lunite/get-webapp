import { useState } from "react"

const useWindow = () => {
  const [windowYo, setWindow] = useState(
    typeof window !== "undefined" ? window : {}
  )

  return [windowYo, setWindow, checkWindow]
}

const checkWindow = () => typeof window !== "undefined"

export { useWindow, checkWindow }
